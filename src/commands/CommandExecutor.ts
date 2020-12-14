import {Channel, User} from "discord.js";

export interface CommandExecutor {
    onCommand(sender: User, channel: Channel, args: Array<string>): Promise<void>;
}