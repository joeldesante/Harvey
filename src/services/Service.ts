import { Client } from "discord.js";

export abstract class Service {
    abstract start(client: Client): void;
    abstract stop(): void;
    abstract isServiceRunning(): boolean;
}