/**
 * Heartbeat Handler
 * 
 * This handler is designed to be used for any task which needs to periodically be checked on a regular interval. 
 * The heartbeat runs at a speed of one iteration per minute.
 * 
 * Please do not add code which is fairly resource intensive as it will be executed fairly regularly.
 */

import { getRandomThreadTopic } from "../lib/threadOfTheDay";
import { logger } from "../logger";
import { ThreadOfTheDayChannelSetting } from "../models/configuration_models/threadOfTheDayChannelSetting";


async function heartbeat(client) {

    // Thread of the day
    const threadOfTheDayChannels = await ThreadOfTheDayChannelSetting.findAll()
    for (const channel of threadOfTheDayChannels) {


        const threadOfTheDayChannel = await client.channels.fetch(channel.channelId);
        if(threadOfTheDayChannel.type !== 'GUILD_TEXT') { continue; }

        const messages = await threadOfTheDayChannel.messages.fetch({ limit: 1 });
        const lastMessage = messages.first();    // Can be undefined

        if(lastMessage !== undefined) {
            const currentTime = new Date();
            if(lastMessage.createdAt.setUTCHours(0,0,0,0) === currentTime.setUTCHours(0,0,0,0)) {
                continue;
            }
        }

        // Okay, all clear. Clentch ur butt cheeks!
        const topic = await getRandomThreadTopic();
        await threadOfTheDayChannel.threads.create({
            name: topic[0],
            autoArchiveDuration: 1440,
            reason: "Thread of the day"
        });
    }
}

export function registerHeartbeatHandler(client) {
    const heartbeatInterval = setInterval(() => {
        heartbeat(client)
    }, 1000 * 60);
}