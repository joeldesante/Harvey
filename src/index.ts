/*
 *  Harvey
 *  Joel DeSante
 *  Copyright (c) Joel DeSante, 2021
 */

// Note: .env is loaded on startup. No need to include it here!

import {Client} from "discord.js";
//import mongoose from 'mongoose';

export default class Harvey {

    private readonly client: Client;
    //private readonly database: Mongoose;

    public constructor() {
        this.client = new Client();
    //  this.connectToDatabase();
    }

    /*public connectToDatabase(): void {
    //    mongoose.connect('mongodb://localhost/harvey', { useNewUrlParser: true })
    //        .then(() => console.log('Database Connected.'))
    //        .catch(e => {
    //            console.error(e);
                process.exit(5);
            });
    }*/

    public listen(): Promise<string> {
        return this.client.login(process.env.TOKEN);
    }
}

const bot = new Harvey();
bot.listen().then(r => {
});