export default class Nextjs {
    /**
    @param {NextAction} action
    @param {Kernel} kernel
    */
    constructor(action: any, kernel: any);
    kernel: any;
    action: any;
    /**
    @param {FastifyRequest} req
    @param {FastifyReply} reply
    @param {Object} route
    @param {ConfigRepository} config
    */
    handle(req: FastifyRequest, reply: FastifyReply, route: any, config: ConfigRepository): Promise<any>;
    [Ψ__init__]($$?: any): void;
}
import { FastifyRequest } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
import { ConfigRepository } from "@formidablejs/framework";
declare const Ψ__init__: unique symbol;
export {};
