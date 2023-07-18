import { Logger } from "winston";
import { Service } from "../../shared/microservice/microservice";

export class HarveyDiscord extends Service {
    async run(): Promise<void> {
        this.logger.info("I too am here")
    }

    async stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}