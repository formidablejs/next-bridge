const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
class Nextjs {
	[Ψ__init__]($$ = null){
		this.kernel = $$ ? $$.kernel : undefined;
		this.action = $$ ? $$.action : undefined;
		
	}
	/**
	@param {NextAction} action
	@param {Kernel} kernel
	*/
	constructor(action,kernel){
		this[Ψ__init__]();
		this.kernel = kernel;
		this.action = action;
	}
	
	/**
	@param {FastifyRequest} req
	@param {FastifyReply} reply
	@param {Object} route
	@param {ConfigRepository} config
	*/
	async handle(req,reply,route,config){
		
		const request = await new _$frameworkφ.FormRequest(req,route,reply,config);
		
		await this.kernel.resolveMiddleware(route,request,reply,config);
		
		request.view = function(/**@type {String}*/view,/**@type {Object|null}*/data = null) {
			
			request.request.raw._view = view;
			
			return request.props(data);
		};
		
		request.status = function(/**@type {Number}*/statusCode) {
			
			request.request.raw._code = statusCode;
			
			return request;
		};
		
		request.props = function(/**@type {Object}*/data = {}) {
			var φ;
			
			const old = _$frameworkφ.helpers.isEmpty(request.request.raw.formidable) ? {} : ((((φ = request.request.raw.formidable.props) != null) ? (φ) : {}));
			
			request.request.raw.formidable = {
				props: Object.assign(old,data)
			};
			
			return request;
		};
		
		const callback = _$frameworkφ.helpers.isArray(this.action.callback) ? (new this.action.callback[0])[this.action.callback[1]] : this.action.callback;
		
		return await callback(request,reply);
	}
};
exports.default = Nextjs;
