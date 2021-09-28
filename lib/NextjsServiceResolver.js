function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$InvalidNextjsRequestMethodExceptionφ = requireDefault$__(require('./Exceptions/InvalidNextjsRequestMethodException'/*$path$*/));
var _$NextActionφ = requireDefault$__(require('./Support/NextAction'/*$path$*/));
var _$Nextjsφ = requireDefault$__(require('./Nextjs'/*$path$*/));
var _$NextjsBuildMissingExceptionφ = requireDefault$__(require('./Exceptions/NextjsBuildMissingException'/*$path$*/));
var _$NextServiceφ = requireDefault$__(require('./Support/NextService'/*$path$*/));
class NextjsServiceResolver extends _$frameworkφ.ServiceResolver {
	
	
	boot(){
		var self = this;
		
		self.app.register(require('fastify-nextjs'/*$path$*/),this.app.config.get('next',{
			dev: this.app.config.get('app.debug',false),
			dir: 'resources/js'
		}),function(error,/**@type {FastifyInstance}*/instance) {
			var resφ;
			
			if (error) { throw error };
			
			resφ = [];
			for (let iφ = 0, itemsφ = iter$__(_$frameworkφ.Route.all()), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
				let route = /**@type {object}*/(itemsφ[iφ]);
				if ((route.action instanceof _$NextServiceφ.default) || (route.action instanceof _$NextActionφ.default)) {
					
					
					if (route.method !== 'get') {
						
						throw new _$InvalidNextjsRequestMethodExceptionφ.default('Next.js routes must be GET requests.');
					};
					
					if (_$frameworkφ.helpers.isEmpty(instance.next)) {
						
						let nextDir = self.app.config.get('next.dir','resources/js');
						
						if (!(nextDir.startsWith('/'))) {
							
							nextDir = self.path.join(process.cwd(),nextDir);
						};
						
						throw new _$NextjsBuildMissingExceptionφ.default(("Could not find a Next.js production build in the " + nextDir + " directory. Try building your app with 'next build resources/js'"));
					};
					
					resφ.push(instance.next(route.path,async function(app,/**@type {FastifyRequest}*/req,/**@type {FastifyReply}*/reply) {
						
						
						if (route.action instanceof _$NextActionφ.default) {
							
							const kernel = self.app.make(_$frameworkφ.Kernel);
							const action = route.action;
							
							await (new _$Nextjsφ.default(action,kernel)).handle(req,reply,route,self.app.config);
						};
						
						return await self.handleCallback(app,req,reply,route);
					}));
				};
			};
			return resφ;
		});
		
		return self;
	}
	
	/**
	@param {String} path
	*/
	buildRoute(path){
		
		return path.replace(/(\:\w+)/ig,'[$1]').replace(/\:/ig,'');
	}
	
	/**
	@param {NextServer} app
	@param {FastifyRequest} req
	@param {FastifyReply} reply
	@param {Object} route
	*/
	handleCallback(app,req,reply,route = {}){
		var φ, φ2;
		
		for (let oφ = Object.entries(reply.getHeaders()), iφ2 = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, key; iφ2 < lφ; iφ2++){
			key = keysφ[iφ2];let [headerName,headerValue] = oφ[key];
			if (headerName === 'content-length' && headerValue === undefined) {
				
				continue;
			};
			
			reply.raw.setHeader(headerName,headerValue);
		};
		
		if (_$frameworkφ.helpers.isEmpty(req.raw.formidable)) {
			
			req.raw.formidable = {
				props: {}
			};
		};
		
		let view = this.buildRoute(route.path);
		
		if (!(_$frameworkφ.helpers.isEmpty(req.raw._view))) {
			
			view = req.raw._view;
			
			(((φ = req.raw._view),delete req.raw._view, φ));
		};
		
		if (!(_$frameworkφ.helpers.isEmpty(req.raw._code))) {
			
			reply.status(req.raw._code);
			
			(((φ2 = req.raw._code),delete req.raw._code, φ2));
		};
		
		return app.render(req.raw,reply.raw,view,req.url).then(function() {
			
			return reply.sent = true;
		});
	}
};
exports.default = NextjsServiceResolver;
