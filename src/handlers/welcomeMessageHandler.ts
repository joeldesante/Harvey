import { WelcomeChannel } from "../models/configuration_models/welcomeChannelSetting";
import type { Client } from "discord.js";

export function registerWelcomeHandler(client: Client) {
    client.on('guildMemberAdd', async (member) => {
        const welcomeChannelSettings = await WelcomeChannel.findOne({ where: { guildId: member.guild.id } });
        if(!welcomeChannelSettings) return;
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelSettings.channelId);
        if (!welcomeChannel) return;
        const joinCoursesHere = member.guild.channels.cache.find(channel => channel.name === "join-courses-here");
        if (!joinCoursesHere) return;

        if (welcomeChannel.isText()) {
            await welcomeChannel.send({ files: ['src/assets/welcome-sticker.png'] });
            await welcomeChannel.send(`Welcome to the server, <@${member.id}>! Please go to <#${joinCoursesHere.id}> to join course chats.`);
        } else {
            throw new Error('Channel is not a text-based channel.');
        }
    });   
}