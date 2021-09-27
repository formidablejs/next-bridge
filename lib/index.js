function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$nextφ = requireDefault$__(require('./Support/Helpers/next'/*$path$*/));
var _$NextActionφ = requireDefault$__(require('./Support/NextAction'/*$path$*/));
var _$NextjsServiceResolverφ = requireDefault$__(require('./NextjsServiceResolver'/*$path$*/));
var _$NextServiceφ = requireDefault$__(require('./Support/NextService'/*$path$*/));

exports.next = _$nextφ.default;
exports.NextAction = _$NextActionφ.default;
exports.NextjsServiceResolver = _$NextjsServiceResolverφ.default;
exports.NextService = _$NextServiceφ.default;
