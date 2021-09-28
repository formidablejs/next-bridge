function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$InvalidNextjsCallbackExceptionφ = requireDefault$__(require('../../Exceptions/InvalidNextjsCallbackException'/*$path$*/));
var _$NextActionφ = requireDefault$__(require('../NextAction'/*$path$*/));
var _$NextServiceφ = requireDefault$__(require('../NextService'/*$path$*/));

/**
@param {Function|[Function, string]} callback
*/
function isAction(callback){
	
	return _$frameworkφ.helpers.isArray(callback) && callback.length == 2 && _$frameworkφ.helpers.isClass(callback[0]) && _$frameworkφ.helpers.isString(callback[1]);
};

/**
@param {Function|undefined|null|[Function, string]} callback
*/
function next(callback = null){
	
	if (_$frameworkφ.helpers.isEmpty(callback)) { return new _$NextServiceφ.default };
	
	if (!((_$frameworkφ.helpers.isFunction(callback) || _$frameworkφ.helpers.isClass(callback) || isAction(callback)))) {
		
		throw new _$InvalidNextjsCallbackExceptionφ.default("Next.js callback is not valid.");
	};
	
	return new _$NextActionφ.default(callback);
};
exports.default = next;
