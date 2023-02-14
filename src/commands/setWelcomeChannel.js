import { SlashCommandBuilder, SlashCommandChannelOption } from '@discordjs/builders';
import { logger } from '../logger.js';
import { WelcomeChannel } from '../models/configuration_models/welcomeChannelSetting.js';

export default {
    body: new SlashCommandBuilder()
        .setName('set-welcome-channel')
        .setDescription('Set\'s the channel in which welcome messages will be sent to.')
        .addChannelOption(new SlashCommandChannelOption()
            .setName("welcome-channel")
            .setDescription("The channel in which welcome messages will be sent.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        const welcomeChannelSettings = await WelcomeChannel.findOne({ where: { guildId: interaction.guild.id } });
        if(!welcomeChannelSettings) {
            await WelcomeChannel.create({
                guildId: interaction.guild.id,
                channelId: interaction.options.getChannel("welcome-channel").id
            });
            logger.info("Welcome channel has been created.");
            return interaction.reply("Welcome channel has been set.");
        }
        await welcomeChannelSettings.update({
            channelId: interaction.options.getChannel("welcome-channel").id
        });
        logger.info("Welcome channel has been set.");
        interaction.reply("Welcome channel has been updated.");
    }
};