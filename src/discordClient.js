import { Client, GatewayIntentBits, Partials } from "discord.js";
import registeredCommands from "./commands/registeredCommands.js";
import { logger } from "./logger.js";

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ],
});

client.once('ready', async () =>  {
    logger.info("Harvey has logged in and is ready.");
    logger.info("Registering discord commands.");
    registeredCommands.forEach(async command => {
        await client.application.commands.create(command.body.toJSON(), process.env.GUILD);        // TODO: Make it so it will register globally when in production mode.
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
            const { commandName } = interaction;
            if (commandName === command.body.name) {
                await command.onTriggered(interaction);
            }
        });
    });
});

export default client;