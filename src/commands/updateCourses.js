import { SlashCommandBuilder } from '@discordjs/builders';
import { updateCourseColors } from '../lib/courseChannels.js';
import { logger } from '../logger.js';
import { messageEmbed } from '../lib/messageEmbed.js';

export default {
    body: new SlashCommandBuilder()
        .setName('update-course')
        .setDescription('Updates the colors of the course roles in the server.')
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        updateCourseColors(interaction.guild).then(() => {
            interaction.reply({ embeds: [messageEmbed(`Updated course colors`, "GREEN")]});
            logger.info(`Updated course colors`);
        }).catch((err) => {
            interaction.reply({ embeds: [messageEmbed(`Error updating course colors: ${err}`, "RED")]});
            logger.error(`Error updating course colors: ${err}`);
        }
    }   
};