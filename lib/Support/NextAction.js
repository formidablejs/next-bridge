const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class NextAction {
	[Ψ__init__]($$ = null){
		this.callback = $$ ? $$.callback : undefined;
		
	}
	/**
	@param {Function} callback
	*/
	constructor(callback){
		this[Ψ__init__]();
		this.callback = callback;
	}
};
exports.default = NextAction;
