import { SlashCommandBuilder, SlashCommandRoleOption } from '@discordjs/builders';
import { unlinkExistingCourseChannel } from '../lib/courseChannels';
import { messageEmbed } from '../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('unlink-course')
        .setDescription('Migrates the old channels to the new system.')
        .addRoleOption(
            new SlashCommandRoleOption()
                .setName("course-role")
                .setDescription("The role which is associated with the chat channel.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        await unlinkExistingCourseChannel(
            interaction.options.getRole("course-role")?.id!, interaction.guild!
        );
        interaction.reply({embeds: [messageEmbed("Unlinked role successfully", "GREEN")]});
    }   
};