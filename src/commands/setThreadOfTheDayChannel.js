import { SlashCommandBuilder, SlashCommandChannelOption } from '@discordjs/builders';
import { logger } from '../logger.js';
import { ThreadOfTheDayChannelSetting } from '../models/configuration_models/threadOfTheDayChannelSetting.js';

export default {
    body: new SlashCommandBuilder()
        .setName('set-totd-channel')
        .setDescription('Set\'s the channel in which thread of the day messages will be sent to.')
        .addChannelOption(new SlashCommandChannelOption()
            .setName("totd-channel")
            .setDescription("The channel in which topic messages will be sent.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        const totdChannelSettings = await ThreadOfTheDayChannelSetting.findOne({ where: { guildId: interaction.guild.id } });
        if(!totdChannelSettings) {
            await ThreadOfTheDayChannelSetting.create({
                guildId: interaction.guild.id,
                channelId: interaction.options.getChannel("totd-channel").id
            });
            logger.info("TOTD channel has been created.");
            return interaction.reply("TOTD channel has been set.");
        }
        await totdChannelSettings.update({
            channelId: interaction.options.getChannel("totd-channel").id
        });
        logger.info("TOTD channel has been set.");
        interaction.reply("TOTD channel has been updated.");
    }
};