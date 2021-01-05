import {CommandExecutor} from "../../CommandExecutor";
import {Checks} from "../../../lib/checks/Checks";
import {Channel, Guild, User} from "discord.js";

export class CreateRole implements CommandExecutor{
    public async onCommand(sender: User, channel: Channel, guild: Guild, args: Array<string>): Promise<void> {



        return Promise.resolve(undefined);
    }
}