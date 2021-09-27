function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$NextActionφ = requireDefault$__(require('../NextAction'/*$path$*/));
var _$NextServiceφ = requireDefault$__(require('../NextService'/*$path$*/));

/**
@param {Function|undefined|null} callback
*/
function next(callback = null){
	
	if (!(_$frameworkφ.helpers.isEmpty(callback)) && (_$frameworkφ.helpers.isFunction(callback) || _$frameworkφ.helpers.isClass(callback))) {
		
		const service = _$NextServiceφ.default;
		
		service._action = new _$NextActionφ.default(callback);
		
		return service;
	};
	
	return _$NextServiceφ.default;
};
exports.default = next;
