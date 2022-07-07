import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { createCourseChannel } from '../lib/courseChannels.js';
import { logger } from '../logger.js';

export default {
    body: new SlashCommandBuilder()
        .setName('create-course')
        .setDescription('Creates a course chat for a given course.')
        .addStringOption(new SlashCommandStringOption()
            .setName("name")
            .setDescription("The name of the course channel and role which you want to create.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        const courseChannelName = interaction.options.getString("name");
        await createCourseChannel(courseChannelName, interaction.guild);
        interaction.reply(`Created course channel ${courseChannelName}`);
        logger.info(`Created course channel ${courseChannelName}`);
    }   
};