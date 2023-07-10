import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { logger } from "../logger";

export async function registerSMTPServerHandler() {
    const server = new SMTPServer({
        logger: true,
        authOptional: true,
        onMailFrom(address, session, callback) {
            logger.info(`Sent From: ${address.address}`);
            return callback();
        },
        onRcptTo(address, session, callback) {
            logger.info(`Sent To: ${address.address}`);
            return callback();
        },
        onData(stream, session, callback) {
            simpleParser(stream).then(parsed => {
                callback();
            }).catch(err => {
                throw new Error(err);
            })
            //stream.pipe(process.stdout); // print message to console
            //stream.on("end", callback);
        }
    });
    server.listen(25);
    logger.info("Mail Service Connected.");

}