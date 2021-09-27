function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$NextActionφ = requireDefault$__(require('./Support/NextAction'/*$path$*/));
var _$Nextjsφ = requireDefault$__(require('./Nextjs'/*$path$*/));
var _$NextServiceφ = requireDefault$__(require('./Support/NextService'/*$path$*/));
var _$querystringφ = requireDefault$__(require('querystring'/*$path$*/));

class NextjsServiceResolver extends _$frameworkφ.ServiceResolver {
	
	
	boot(){
		var self = this;
		
		self.app.register(require('fastify-nextjs'/*$path$*/),this.app.config.get('next',{
			dev: this.app.config.get('app.debug',false),
			dir: 'resources/js'
		}),function(/**@type {FastifyInstance}*/instance) {
			var resφ;
			
			/**
			@param {String} path
			*/
			function buildRoute(path){
				
				return path.replace(/(\:\w+)/ig,'[$1]').replace(/\:/ig,'');
			};
			
			resφ = [];
			for (let iφ = 0, itemsφ = iter$__(_$frameworkφ.Route.all()), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
				let route = itemsφ[iφ];
				resφ.push((route.action == _$NextServiceφ.default) && (
					
					instance.next(route.path,async function(app,req,reply) {
						
						if (!(_$frameworkφ.helpers.isEmpty(_$NextServiceφ.default._action)) && (_$NextServiceφ.default._action instanceof _$NextActionφ.default)) {
							
							const kernel = self.app.make(_$frameworkφ.Kernel);
							const action = _$NextServiceφ.default._action;
							
							await (new _$Nextjsφ.default(action,kernel)).handle(req,reply,route,self.app.config);
						};
						
						await app.getRequestHandler()(req.raw,reply.raw);
						
						return app.render(req.raw,reply.raw,buildRoute(route.path),_$querystringφ.default.parse(req.raw.url.split('?')[1]));
					})
				));
			};
			return resφ;
		});
		
		return self;
	}
};
exports.default = NextjsServiceResolver;
