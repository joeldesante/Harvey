import { Logger } from "winston";
import { Service } from "../../shared/microservice/microservice";
import { Server } from "http";
import Koa from "koa";
import Router from "@koa/router";
import colors from "colors";


export class HarveyAPI extends Service {

    server: Server | undefined;
    readonly api: Koa;
    readonly router: Router;
    readonly port = 8675;

    constructor(logger: Logger) {
        super(logger);
        this.api = new Koa();
        this.router = new Router();
    }

    private apiLogger(format: string = ':method ":url"') {
        const apiLogger = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
            await next();
            const message = format
                .replaceAll(':method', ctx.method)
                .replaceAll(':url', ctx.url)
                .replaceAll(':status', ctx.response.status.toString());
            this.logger.info(message);
        }

        return apiLogger;
    }

    async run(): Promise<void> {

        this.router.get('/', (ctx, next) => {
            ctx.body = {
                status: "Hello"
            }
        });

        this.api.use(this.apiLogger(
            `${colors.bold.bgBlue(" :method ")} ${colors.gray(":url")} ${colors.bold(":status")}`
        ));

        this.api.use(this.router.routes());
        this.api.use(this.router.allowedMethods());
        
        this.server = this.api.listen(this.port);
        this.logger.info(colors.green.bold(`API listening on [::]:${this.port}`));
    }

    async stop() {
        this.server?.close();
        this.logger.info("Closed server")
    }
}