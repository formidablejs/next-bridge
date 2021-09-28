import next from "./types/Support/Helpers/next";
import NextAction from "./types/Support/NextAction";
import NextjsServiceResolver from "./types/NextjsServiceResolver";
import NextService from "./types/Support/NextService";

export module "@formidablejs/framework" {
	export interface FormRequest {
		props(data: Object): FormRequest;
		view(view: String, data: ?Object = null): FormRequest;
		status(statusCode: Number): FormRequest;
	}
}

export module "http" {
	export interface IncomingMessage {
		formidable: Object;
	}
}

export {
	next,
	NextAction,
	NextjsServiceResolver,
	NextService
};
