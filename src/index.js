import 'dotenv/config';
import { logger } from "./logger.js";
import client from "./discordClient.js";

logger.info("Starting Harvey...");


const TOKEN = process.env.DISCORD_TOKEN || "";
if (TOKEN.toString().trim() === "") {
    throw new Error("Invalid Discord access token configured.");
}

logger.info("Registering discord client event listeners.");
client.on('messageReactionAdd', async reaction => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            logger.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

    logger.info(`${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`);
});

client.on('messageReactionRemove', async reaction => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            logger.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

    logger.info(`${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`);
});


client.login(TOKEN);