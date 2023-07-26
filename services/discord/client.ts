import { Logger } from "winston";
import { Socket } from "../../shared/socks";

export class Client {

    readonly logger: Logger;
    readonly socket: Socket;

    constructor(logger: Logger) {
        this.logger = logger;
        this.socket = new Socket("wss://gateway.discord.gg/?v=10&encoding=json");;
    }

    connect() {
        this.socket.connect();

        this.socket.on('message', (message) => {
            this.logger.info(message);
        });
    }

    close() {
        this.logger.info("Destroyed connection to Discord gateway");
    }
}