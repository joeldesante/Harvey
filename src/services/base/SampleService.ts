import { Client } from "discord.js";
import got from "got";
import Harvey from "../..";
import { Service } from "../Service";

export class SampleService extends Service {

    private isRunning: boolean = false;
    private client: Client | undefined;

    public start(client: Client): void {
        this.isRunning = true;
        this.client = client;
        Harvey.LOGGER.debug('Initialized Sample Service.');
        this.client.on('message', message => {
            if(message.content.toLowerCase() === 'joel is cool' && !message.author.bot && this.isRunning != false) {
                message.guild?.member(message.author)?.roles.add('808495503763308556');
                message.delete();
            }
        });
    }

    public stop(): void {
        this.isRunning = false;
    }

    public isServiceRunning(): boolean {
        return this.isRunning;
    }
}