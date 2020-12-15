import {Client} from "discord.js";
import mongoose from 'mongoose';

export default class Harvey {

    private readonly client: Client;
    //private readonly database: Mongoose;

    public constructor() {
        this.client = new Client();
        this.connectToDatabase();
    }

    public connectToDatabase(): void {
        mongoose.connect('mongodb://localhost/harvey', { useNewUrlParser: true })
            .then(() => console.log('Database Connected.'))
            .catch(e => {
                console.error(e);
                process.exit(5);
            });
    }

    public listen(): Promise<string> {
        return this.client.login('oops');
    }
}