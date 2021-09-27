import { helpers, FastifyRequest, FastifyReply, FormRequest, ConfigRepository } from '@formidablejs/framework'
import type Kernel from '@formidablejs/framework'
import type NextAction from './Support/NextAction'

export default class Nextjs

	prop kernel\Kernel
	prop action\NextAction

	def constructor action\NextAction, kernel\Kernel
		self.kernel = kernel
		self.action = action

	def handle req\FastifyRequest, reply\FastifyReply, route\Object, config\ConfigRepository
		const request = await new FormRequest(req, route, reply, config)

		await self.kernel.resolveMiddleware(route, request, reply, config)

		request.props = do(data\Object = {})
			const old = helpers.isEmpty(request.request.raw.formidable) ? {} : (request.request.raw.formidable.props ?? {})

			request.request.raw.formidable = {
				props: Object.assign(old, data)
			}

		await self.action.callback(request)
