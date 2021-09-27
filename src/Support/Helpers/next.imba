import { helpers } from '@formidablejs/framework'
import NextAction from '../NextAction'
import NextService from '../NextService'

export default def next callback\Function|undefined|null = null
	if !helpers.isEmpty(callback) && (helpers.isFunction(callback) || helpers.isClass(callback))
		const service = NextService

		service._action = new NextAction(callback)

		return service

	NextService
