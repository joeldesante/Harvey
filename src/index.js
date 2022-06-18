import 'dotenv/config';
import { Logger } from "./logger.js";
import client from "./discordClient.js";

Logger.info("Starting Harvey...");

const TOKEN = process.env.DISCORD_TOKEN || "";
if(TOKEN.toString().trim() === "") {
    throw new Error("Invalid Discord access token configured.");
}

client.login(TOKEN);