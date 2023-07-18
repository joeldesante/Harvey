import { Logger } from "winston";

export abstract class Service {

    readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    abstract run(): Promise<void>;
    abstract stop(): Promise<void>;
}