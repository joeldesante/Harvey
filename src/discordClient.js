import { Client, Intents } from "discord.js";
import registeredCommands from "./commands/registeredCommands.js";
import { logger } from "./logger.js";

const client = new Client({ 
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', async () =>  {
    logger.info("Harvey has logged in and is ready.");
    logger.info("Registering discord commands.");
    registeredCommands.forEach(async command => {
        await client.application.commands.create(command.body.toJSON(), "750034125464797216");        // TODO: Make it so it will register globally when in production mode.
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