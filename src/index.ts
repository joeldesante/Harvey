/*
 *  Harvey
 *  Joel DeSante
 *  Copyright (c) Joel DeSante, 2021
 */

// Note: .env is loaded on startup. No need to include it here!

import {Client} from "discord.js";

export default class Harvey {

    private readonly client: Client;
    //private readonly database: Mongoose;

    public constructor() {
        this.client = new Client();
    }

    public listen(): Promise<string> {
        return this.client.login(process.env.TOKEN);
    }
}

const bot = new Harvey();
bot.listen().then(r => {
});