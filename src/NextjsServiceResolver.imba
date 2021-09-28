import { Kernel, FastifyReply, FastifyRequest, helpers, Route, FastifyInstance, ServiceResolver } from '@formidablejs/framework'
import InvalidNextjsRequestMethodException from './Exceptions/InvalidNextjsRequestMethodException'
import NextAction from './Support/NextAction'
import Nextjs from './Nextjs'
import NextjsBuildMissingException from './Exceptions/NextjsBuildMissingException'
import NextService from './Support/NextService'
import type { NextServer } from 'next/dist/server/next'

export default class NextjsServiceResolver < ServiceResolver

	def boot
		self.app.register require('fastify-nextjs'), self.app.config.get('next', {
			dev: self.app.config.get('app.debug', false)
			dir: 'resources/js'
		}), do(error, instance\FastifyInstance)
			if error then throw error

			for own route\object in Route.all!
				if route.action instanceof NextService || route.action instanceof NextAction

					if route.method !== 'get'
						throw new InvalidNextjsRequestMethodException 'Next.js routes must be GET requests.'

					if helpers.isEmpty(instance.next)
						let nextDir\String = self.app.config.get('next.dir', 'resources/js')

						if !nextDir.startsWith('/')
							nextDir = path.join(process.cwd!, nextDir)

						throw new NextjsBuildMissingException "Could not find a Next.js production build in the {nextDir} directory. Try building your app with 'next build resources/js'"

					instance.next route.path, do(app, req\FastifyRequest, reply\FastifyReply)

						if route.action instanceof NextAction
							const kernel\Kernel = self.app.make(Kernel)
							const action\NextAction = route.action

							await (new Nextjs(action, kernel)).handle(req, reply, route, self.app.config)

						await self.handleCallback app, req, reply, route

		self

	def buildRoute path\String
		path.replace(/(\:\w+)/ig, '[$1]').replace(/\:/ig, '')

	def handleCallback app\NextServer, req\FastifyRequest, reply\FastifyReply, route\Object = {}
		for own key, [headerName\String, headerValue\String] of Object.entries(reply.getHeaders!)
			if headerName === 'content-length' && headerValue === undefined
				continue

			reply.raw.setHeader(headerName, headerValue)

		if helpers.isEmpty(req.raw.formidable)
			req.raw.formidable = {
				props: { }
			}

		let view = buildRoute(route.path)

		if !helpers.isEmpty(req.raw._view)
			view = req.raw._view

			delete req.raw._view

		if !helpers.isEmpty(req.raw._code)
			reply.status(req.raw._code)

			delete req.raw._code

		app.render(req.raw, reply.raw, view, req.url).then do
			reply.sent = true
