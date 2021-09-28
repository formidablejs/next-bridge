/**
@param {Function|undefined|null|[Function, string]} callback
*/
export default function next(callback?: Function | undefined | null | [Function, string]): NextAction | NextService;
import NextAction from "../NextAction";
import NextService from "../NextService";
