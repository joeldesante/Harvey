import {Client} from "discord.js";

export class Harvey {

    private readonly client: Client;

    public constructor() {
        this.client = new Client();
    }

    public listen(): Promise<string> {
        return this.client.login('abcd');
    }
}