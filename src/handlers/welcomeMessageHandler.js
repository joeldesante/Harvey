import { WelcomeChannel } from '../models/welcomeChannel.js';

export function registerWelcomeHandler(client) {
    client.on('guildMemberAdd', async (member) => {
        const welcomeChannelSettings = await WelcomeChannel.findOne({ where: { guildId: member.guild.id } });
        if(!welcomeChannelSettings) return;
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelSettings.channelId);
        if (!welcomeChannel) return;
        await welcomeChannel.send(`Welcome to the server, ${member}!\nhttps://media.discordapp.net/stickers/992818058525671454.png?size=160`);
    });   
}