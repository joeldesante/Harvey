/**
 * This script boots all of the microservices which Harvey uses. It is the entry point of the entire application.
 */

import winston, { loggers } from "winston";
import colors from "colors";
import { HarveyAPI } from "../services/api";
import { HarveyDiscord } from "../services/discord";
import { HarveyMail } from "../services/mail";
import { HarveyReddit } from "../services/reddit";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ],
});

const api = new HarveyAPI(logger.child({ service: "api" }));
const discord = new HarveyDiscord(logger.child({ service: "discord" }));
const mail = new HarveyMail(logger.child({ service: "mail" }));
const reddit = new HarveyReddit(logger.child({ service: "reddit" }));

// Be fancy.
logger.info(`
${colors.green(`
\t██   ██  █████  ██████  ██    ██ ███████ ██    ██ 
\t██   ██ ██   ██ ██   ██ ██    ██ ██       ██  ██  
\t███████ ███████ ██████  ██    ██ █████     ████   
\t██   ██ ██   ██ ██   ██  ██  ██  ██         ██    
\t██   ██ ██   ██ ██   ██   ████   ███████    ██    
`)}
\t${colors.bold('An administrator\'s best friend!')}
\t${colors.italic(`Written and maintained by ${colors.green.bold("Joel DeSante")} and ${colors.green.bold("GitHub Contributors")}`)}\n
${colors.green.bold(`Version ${process.env.npm_package_version}`)}
${colors.gray(`🐞 Bugs & Support ${colors.white.underline('https://github.com/joeldesante/Harvey/issues')}`)}
${colors.gray(`💾 Source ${colors.white.underline('https://github.com/joeldesante/Harvey')}`)}
${colors.gray(`📖 Documentation ${colors.white.underline('https://harvey.desante.dev/docs')}`)}\n
${colors.gray(`Licensed under GPLv3`)}
`);

// Handle shutdowns gracefully!
function shutdown() {
    logger.info(colors.bold.bgRed(" Kill signal recieved. Shutting down. "));
    process.exit(0);
}

process.on('SIGINT', shutdown);  // CTRL+C
process.on('SIGQUIT', shutdown); // Keyboard quit
process.on('SIGTERM', shutdown); // `kill` command
// ref. https://stackoverflow.com/a/71543784/6150621

// Start the services.
Promise.all([
    api.run(),
    discord.run(),
    mail.run(),
    reddit.run(),
]);
