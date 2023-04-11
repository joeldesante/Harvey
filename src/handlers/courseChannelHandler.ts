import { logger } from "../logger";
import { addUserToCourseChannel, removeUserFromCourseChannel } from "../lib/courseChannels";
import { Course } from "../models/course";
import { Client, User } from "discord.js";

export function registerCourseChannelHandler(client: Client) {
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                logger.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        
        const targetCourse = await Course.findOne({ where: { messageId: reaction.message.id } });
        if (targetCourse === null) {
            return;
        }

        if(user.bot) {
            return;
        }

        if(reaction.emoji.name !== '👍') {
            return;
        }

        if (user instanceof User) {
            await addUserToCourseChannel(reaction.message.guild!, user, targetCourse);
        } else {
            throw new Error('Invalid user.')
        }

    });
    
    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                logger.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        const targetCourse = await Course.findOne({ where: { messageId: reaction.message.id } });
        if (targetCourse === null) {
            return;
        }

        if(user.bot) {
            return;
        }

        if(reaction.emoji.name !== '👍') {
            return;
        }
    
        if (user instanceof User) {
            await removeUserFromCourseChannel(reaction.message.guild!, user, targetCourse);
        } else {
            throw new Error('Invalid user.');
        }
    });   
}