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

        // Execute code

        //.. 1. Check if the role exists
        //.. .. 1a. If exists, use that role.
        //.. .. ->  Otherwise, create a new role.
        //.. 2. Check if the channel exists
        //.. .. 2a. If exists, use that channel.
        //.. .. ->  Otherwise, create the channel in the set category.
        //.. 3. Create a database entry for the course
        //.. 4. Update the course selection catalog.

        return Promise.resolve(undefined);
    }
}