import { SlashCommandBuilder, SlashCommandChannelOption } from '@discordjs/builders';
import { ChannelType } from "discord-api-types/v9";
import { logger } from '../logger';
import { CourseRolesSetting } from '../models/configuration_models/courseRolesSetting';
import { messageEmbed } from '../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';


export default {
    body: new SlashCommandBuilder()
        .setName('set-course-role-channel')
        .setDescription('Set\'s the channel which course roles will be added to.')
        .addChannelOption(new SlashCommandChannelOption()
            .setName("role-channel")
            .setDescription("The channel in which the role selection will exist.")
            .setRequired(true)
            // @ts-expect-error Poor typing from discord-api-types
            .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption(new SlashCommandChannelOption()
            .setName("parent-category")
            .setDescription("The category in which the course chats will reside.")
            .setRequired(true)
            // @ts-expect-error Poor typing from discord-api-types
            .addChannelTypes(ChannelType.GuildCategory)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        const courseRoleSettings = await CourseRolesSetting.findOne({ where: { guildId: interaction.guildId! } });
        if(courseRoleSettings === null) {
            await CourseRolesSetting.create({
                guildId: interaction.guildId!,
                roleSelectionChannelId: interaction.options.getChannel("role-channel")?.id!,
                courseChatCategoryId: interaction.options.getChannel("parent-channel")?.id!
            });
            
            logger.info("Role selection channel has been created.");
            interaction.reply({embeds: [messageEmbed("Role selection channel has been created.", "GREEN")]});
            return;
        }

        courseRoleSettings.update({
            roleSelectionChannelId: interaction.options.getChannel("role-channel")?.id
        });

        logger.info("Role selection channel has been set.");
        interaction.reply({embeds: [messageEmbed("Role selection channel has been updated.", "GREEN")]});
    }   
};