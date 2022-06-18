import { Client, Intents } from "discord.js";
import { Logger } from "./logger.js";

const client = new Client({ intents: [ 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS 
]});

client.once('ready', () =>  {
    Logger.info("Harvey has logged in and is ready.");
});

export default client;