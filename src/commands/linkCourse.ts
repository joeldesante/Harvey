import { SlashCommandBuilder, SlashCommandChannelOption, SlashCommandRoleOption, SlashCommandStringOption } from '@discordjs/builders';
import { linkExistingCourseChannel } from '../lib/courseChannels';
import { messageEmbed } from '../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('link-course')
        .setDescription('Migrates the old channels to the new system.')
        .addChannelOption(new SlashCommandChannelOption()
            .setName("course-channel")
            .setDescription("The channel in which the role user will speak.")
            .setRequired(true)
        )
        .addRoleOption(
            new SlashCommandRoleOption()
                .setName("course-role")
                .setDescription("The role which is associated with the chat channel.")
                .setRequired(true)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName("course-message")
                .setDescription("The id of the message which is used to join this role.")
                .setRequired(true)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName("course-name")
                .setDescription("The name of the course.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        await linkExistingCourseChannel(
            interaction.options.getChannel("course-channel")?.id!,
            interaction.options.getString("course-message")!,
            interaction.options.getRole("course-role")?.id!,
            interaction.options.getString("course-name")!
        );
        interaction.reply({embeds: [messageEmbed("Linked role successfully", "GREEN")]});
    }   
};