import { logger } from "../logger.js";
import { addUserToCourseChannel, removeUserFromCourseChannel } from "../lib/courseChannels.js";
import { Course } from "../models/course.js";

export function registerCourseChannelHandler(client) {
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

        await addUserToCourseChannel(reaction.message.guild, user, targetCourse);
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
    
        await removeUserFromCourseChannel(reaction.message.guild, user, targetCourse);
    });   
}