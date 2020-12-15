import {Channel, Guild, User} from "discord.js";

export interface CommandExecutor {
    onCommand(sender: User, channel: Channel, guild: Guild, args: Array<string>): Promise<void>;
}