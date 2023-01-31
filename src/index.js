import 'dotenv/config';
import { logger } from "./logger.js";
import { sequelize } from './models/index.js';
import client from './discordClient.js';

import { registerCourseChannelHandler } from './handlers/courseChannelHandler.js';
import { registerWelcomeHandler } from './handlers/welcomeMessageHandler.js';

logger.info("Syncing with the database.");
sequelize.sync({ force: (process.env.PROD === "true") ? false : true });

logger.info(`Bot Mode, PROD: ${process.env.PROD}, Database force update: ${(process.env.PROD === "true") ? false : true}`);

logger.info("Registering handlers.");
registerCourseChannelHandler(client);
registerWelcomeHandler(client);

logger.info("Logging into Discord.");
const TOKEN = process.env.DISCORD_TOKEN || "";
if (TOKEN.toString().trim() === "") {
    throw new Error("Invalid Discord access token configured.");
}

client.login(TOKEN);