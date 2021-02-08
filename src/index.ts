/*
 *  Harvey
 *  Joel DeSante
 *  Copyright (c) Joel DeSante, 2021
 */

// Note: .env is loaded on startup. No need to include it here!

import { Client } from "discord.js";
import { CommandHandler } from "./commands/CommandHandler";
import { CommandTree } from "./commands/CommandTree";
import { Logger } from "./lib/checks/log/Log";

export default class Harvey {

    static readonly LOGGER: Logger = new Logger();

    private readonly client: Client;
    private commandHandler: CommandHandler;
    //private readonly database: Mongoose;

    public constructor() {
        this.client = new Client();

        // Initilize the command trees.
        this.commandHandler = new CommandHandler(this.client);
        this.commandHandler.register(new CommandTree('sample', 'test'));
        Harvey.LOGGER.debug('Registered command handlers.');
    }

    public listen(): Promise<string> {
        Harvey.LOGGER.debug('Preparing to start.');
        return this.client.login(process.env.TOKEN);
    }
}

const bot = new Harvey();
bot.listen().then(r => {
    Harvey.LOGGER.info(`Harvey is online.`);
});