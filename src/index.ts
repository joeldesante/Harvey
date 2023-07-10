import 'dotenv/config';
import { logger } from "./logger";
import { sequelize } from './models/index';
import client from './discordClient';

import { registerCourseChannelHandler } from './handlers/courseChannelHandler';
import { registerWelcomeHandler } from './handlers/welcomeMessageHandler';
import { registerHeartbeatHandler } from './handlers/heartbeatHandler';
import { registerSMTPServerHandler } from './handlers/smtpServerHandler';

logger.info(`Current working directory: ${process.cwd()}`);
logger.info("Syncing with the database.");
sequelize.sync({ force: (process.env.PROD === "true") ? false : true });

logger.info(`Bot Mode, PROD: ${process.env.PROD}, Database force update: ${(process.env.PROD === "true") ? false : true}`);

logger.info("Registering handlers.");
registerCourseChannelHandler(client);
registerWelcomeHandler(client);
registerHeartbeatHandler(client);
registerSMTPServerHandler();

logger.info("Logging into Discord.");
const TOKEN = process.env.DISCORD_TOKEN || "";
if (TOKEN.toString().trim() === "") {
    throw new Error("Invalid Discord access token configured.");
}

client.login(TOKEN);