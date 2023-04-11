import { SlashCommandBuilder, SlashCommandRoleOption } from '@discordjs/builders';
import { deleteCourseChannel } from '../lib/courseChannels';
import { messageEmbed } from '../lib/messageEmbed';
import { logger } from '../logger';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('delete-course')
        .setDescription('Deletes a course.')
        .addRoleOption(new SlashCommandRoleOption()
            .setName("course-role")
            .setDescription("The role which is associated with the course.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        const courseChannelRole = interaction.options.getRole("course-role");
        if (!courseChannelRole) {
            throw new Error("Unable to obtain course channel role.");
        }
        await deleteCourseChannel(courseChannelRole.id, interaction.guild!);
        interaction.reply({embeds: [messageEmbed(`Deleted course ${courseChannelRole.name}.`, "GREEN")]});
        logger.info(`Deleted course ${courseChannelRole.name}`);
    }   
};