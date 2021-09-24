import { Route, FastifyInstance, ServiceResolver } from '@formidablejs/framework'
import NextService from './NextService'
import querystring from 'querystring'

export default class NextjsServiceResolver < ServiceResolver

	def boot
		self.app.register require('fastify-nextjs'), self.app.config.get('next', {
			dev: self.app.config.get('app.debug', false)
			dir: 'resources/js'
		}), do(instance\FastifyInstance)
			def buildRoute path\String
				path.replace(/(\:\w+)/ig, '[$1]').replace(/\:/ig, '')

			for own route in Route.all!
				if route.action == NextService
					instance.next route.path, do(app, req, reply)
						await app.getRequestHandler()(req.raw, reply.raw)

						app.render(req.raw, reply.raw, buildRoute(route.path), querystring.parse(req.raw.url.split('?')[1]))

		self
