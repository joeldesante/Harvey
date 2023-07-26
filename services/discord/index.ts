import { Logger } from "winston";
import { Service } from "../../shared/microservice/microservice";
import { Client } from "./client";
import colors from "colors";

export class HarveyDiscord extends Service {

    client: Client;

    constructor(logger: Logger) {
        super(logger);
        this.client = new Client(logger);
    }

    async run(): Promise<void> {
        this.client.connect();
        this.logger.info(colors.green.bold(`Discord is active`));
    }

    async stop(): Promise<void> {
        this.client.close();
    }
}