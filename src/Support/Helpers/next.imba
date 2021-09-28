import { helpers } from '@formidablejs/framework'
import InvalidNextjsCallbackException from '../../Exceptions/InvalidNextjsCallbackException'
import NextAction from '../NextAction'
import NextService from '../NextService'

def isAction callback\Function|[Function, string]
	helpers.isArray(callback) && callback.length == 2 && helpers.isClass(callback[0]) && helpers.isString(callback[1])

export default def next callback\Function|undefined|null|[Function, string] = null
	if helpers.isEmpty(callback) then return new NextService

	if !(helpers.isFunction(callback) || helpers.isClass(callback) || isAction(callback))
		throw new InvalidNextjsCallbackException "Next.js callback is not valid."

	new NextAction(callback)
