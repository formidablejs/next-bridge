export default class NextjsServiceResolver extends ServiceResolver {
    /**
    @param {String} path
    */
    buildRoute(path: string): string;
    /**
    @param {NextServer} app
    @param {FastifyRequest} req
    @param {FastifyReply} reply
    @param {Object} route
    */
    handleCallback(app: any, req: FastifyRequest, reply: FastifyReply, route?: any): any;
}
import { ServiceResolver } from "@formidablejs/framework";
import { FastifyRequest } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
