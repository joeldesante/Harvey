/*
 *  Harvey
 *  Joel DeSante
 *  Copyright (c) Joel DeSante, 2021
 */

// Note: .env is loaded on startup. No need to include it here!

import { Client } from "discord.js";
import { About } from "./commands/base/controllers/About";
import { Help } from "./commands/base/controllers/Help";
import { Version } from "./commands/base/controllers/Version";
import { CommandHandler } from "./commands/CommandHandler";
import { CommandTree } from "./commands/CommandTree";
import { Logger } from "./lib/log/Log";
import { SampleService } from "./services/base/SampleService";
import { ServiceManager } from "./services/ServiceManager";

export default class Harvey {

    static readonly LOGGER: Logger = new Logger();

    private readonly client: Client;
    private commandHandler: CommandHandler;
    private serviceManager: ServiceManager;
    //private readonly database: Mongoose;

    public constructor() {
        this.client = new Client();

        this.commandHandler = new CommandHandler(this.client);
        this.serviceManager = new ServiceManager(this.client);

        Harvey.LOGGER.debug('Registering Services.')
        this.serviceManager.registerService(new SampleService());

        Harvey.LOGGER.debug('Registering Harvey\'s base command set.');  // Move this to the parser
        this.commandHandler.register(new CommandTree('base', 'help', -1, new Help()));
        this.commandHandler.register(new CommandTree('base', 'about', -1, new About()));
        this.commandHandler.register(new CommandTree('base', 'version', -1, new Version()));
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