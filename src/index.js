import 'dotenv/config';
import { Logger } from "./logger.js";
import client from "./discordClient.js";

Logger.info("Starting Harvey...");

const TOKEN = process.env.DISCORD_TOKEN || "";
if(TOKEN.toString().trim() === "") {
    throw new Error("Invalid Discord access token configured.");
}

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			Logger.error('Something went wrong when fetching the message:', error);
			return;
		}
	}

	Logger.info(`${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`);
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			Logger.error('Something went wrong when fetching the message:', error);
			return;
		}
	}

	Logger.info(`${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`);
});

client.login(TOKEN);