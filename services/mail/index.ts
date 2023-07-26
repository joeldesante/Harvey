import { Logger } from "winston";
import { Service } from "../../shared/microservice/microservice";

import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import colors from "colors";
import { Parcel } from "../../shared/parcel";
import { ContentSource } from "../../shared/content_source";
import { ParcelContext, ParcelManager } from "../../shared/parcel/parcel_manager";

export class HarveyMail extends Service {

    readonly server: SMTPServer;
    readonly port = 25;

    constructor(logger: Logger) {
        super(logger);
        this.server = new SMTPServer({
            authOptional: true,
            onMailFrom(address, session, callback) {
                return callback();
            },
            onRcptTo(address, session, callback) {
                return callback();
            },
            onData(stream, session, callback) {
                simpleParser(stream).then(parsed => {

                    logger.debug("Processing incoming email");

                    console.log(parsed);
                    // 1. Determine the User who sent the message.
                    if(!parsed.from) { throw new Error("No \"FROM\" address was provided") }
                    const contentSource = ContentSource.resolveFromEmail(parsed.from?.text);

                    // 2. Build the parcel.
                    const parcel = new Parcel(
                        parsed.subject || "",
                        parsed.text || "",
                        contentSource,
                        []
                    );

                    // TODO: Identify FW: emails trim extranious data.

                    // 3. Add the parcel to the correct queue.
                    const parcelContext = new ParcelContext(parcel, contentSource)

                    const parcelManager = ParcelManager.getInstance();
                    parcelManager.send(parcelContext);

                    logger.info(`Email recieved from ${contentSource.source} (id: ${contentSource.id}) and added to approval queue`);
                    
                    callback();
                }).catch(err => {
                    logger.error(err.message);
                    callback();
                });
            }
        });
    }

    async run(): Promise<void> {
        this.server.listen(this.port);
        this.logger.info(colors.green.bold(`SMTP server listening on [::]:${this.port}`));
    }

    async stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}