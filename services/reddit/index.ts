import { Logger } from "winston";
import { Service } from "../../shared/microservice/microservice";

export class HarveyReddit extends Service {
    async run(): Promise<void> {
        this.logger.info("Narwhals and stuff I guess...")
    }

    async stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}