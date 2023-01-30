import { WelcomeChannel } from '../models/welcomeChannel.js';

export function registerWelcomeHandler(client) {
    client.on('guildMemberAdd', async (member) => {
        const welcomeChannelSettings = await WelcomeChannel.findOne({ where: { guildId: member.guild.id } });
        if(!welcomeChannelSettings) return;
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelSettings.channelId);
        if (!welcomeChannel) return;
        welcomeChannel.send({ files: ['src/assets/welcome-sticker.png'], content: 'Welcome to the server!' });
    });   
}