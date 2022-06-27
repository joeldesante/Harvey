import { Client, Intents } from "discord.js";
import registeredCommands from "./commands/registeredCommands.js";
import { Logger } from "./logger.js";

const client = new Client({ 
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', async () =>  {
    Logger.info("Harvey has logged in and is ready.");

    Logger.info("Registering discord commands.");

    registeredCommands.forEach(async command => {
        await client.application.commands.create(command.body.toJSON(), "987851629162287204");        // TODO: Make it so it will register globally when in production mode.
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