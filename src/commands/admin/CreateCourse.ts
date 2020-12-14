import {CommandExecutor} from "../CommandExecutor";
import {Channel, User} from "discord.js";
import {Checks} from "../../lib/checks/Checks";

/**
 * Creates a new course that a user can subscribe to.
 */
export class CreateCourse implements CommandExecutor {
    public onCommand(sender: User, channel: Channel, args: Array<string>): Promise<void> {

        // Checks
        if (Checks.onFalse(args.length > 0)) return Promise.reject('Please pass at least one argument.');


        return Promise.resolve(undefined);
    }
}