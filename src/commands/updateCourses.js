import { SlashCommandBuilder } from '@discordjs/builders';
import { updateCourseColors } from '../lib/courseChannels.js';
import { logger } from '../logger.js';
import { messageEmbed } from '../lib/messageEmbed.js';

export default {
    body: new SlashCommandBuilder()
        .setName('update-courses')
        .setDescription('Updates the colors of the course roles in the server.')
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        console.log("COMMAND RUNS");
        await interaction.deferReply();
        try {
            await updateCourseColors(interaction.guild);
            interaction.editReply({ embeds: [messageEmbed(`Updated course colors.`, "GREEN")]});
            logger.info(`Updated course colors`);
        } catch (err) {
            interaction.editReply({ embeds: [messageEmbed(`Error updating course colors.`, "RED")]});
            logger.error(err);
        }
    },
};