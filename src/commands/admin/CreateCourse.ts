import {CommandExecutor} from "../CommandExecutor";
import {CategoryChannel, Channel, Guild, Role, User} from "discord.js";
import {Checks} from "../../lib/checks/Checks";
import Course from "../../models/course/Course";

/**
 * Creates a new course that a user can subscribe to.
 */
export class CreateCourse implements CommandExecutor {
    public async onCommand(sender: User, channel: Channel, guild: Guild, args: Array<string>): Promise<void> {

        // Checks
        if (Checks.onFalse(args.length > 0)) return Promise.reject('Please pass at least one argument.');
        if (Checks.onFalse(guild.available)) return Promise.reject('The requested guild is not available at this time.');
        if (Checks.onFalse(args[0].length > 0)) return Promise.reject('Please specify a valid course name.');
        if (Checks.onUndefined(args[1])) { args[1] = 'WHITE' };

        // Go...
        try {

            //.. 1. Check if the role exists
            const roles = await guild.roles.fetch();
            let selected_role = roles.cache.find(role => role.name.toLowerCase() === args[0].toLowerCase());    // 1a. If exists, use that role.
            if (Checks.onUndefined(selected_role)) {                                                                // Otherwise, create a new role.
                selected_role = await guild.roles.create({
                    data: {
                        name: args[0].toUpperCase(),
                        color: args[1],
                    },
                    reason: `Role created as instructed by ${sender.username}.`
                });
            }

            //.. 2. Check if the channel exists
            const category = guild.channels.cache.get('string-of-channel-category');
            if (Checks.onUndefined(category)) return Promise.reject('Invalid category id.');
            if (Checks.onFalse(category?.type === 'category')) return Promise.reject('Invalid category id.');
            const fetchedCategory: CategoryChannel = await category?.fetch() as CategoryChannel;

            const channels = fetchedCategory.children;
            let selectedChannel = channels.find(selectedChannel => selectedChannel.name.toLowerCase() === args[0].toLowerCase());       // 2a. If exists, use that channel.
            if (Checks.onUndefined(channel)) {                                                                      // Otherwise, create the channel in the set category.
                selectedChannel = await guild.channels.create(args[0].toLowerCase(), {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                        {
                            id: (selected_role as Role),
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        }
                    ],
                    parent: fetchedCategory
                });
            }

            //.. 3. Create a database entry for the course
            const course = new Course({
                name: args[0].toLowerCase(),
                role_id: selected_role?.id,
                channel_id: selectedChannel?.id
            });
            const document = await course.save();

            console.log(document);

            //.. 4. Update the course selection catalog.

        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(undefined);
    }
}