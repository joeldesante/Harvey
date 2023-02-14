import { SlashCommandBuilder, SlashCommandChannelOption } from '@discordjs/builders';
import { logger } from '../logger.js';
import { CourseRolesSetting } from '../models/configuration_models/courseRolesSetting.js';

export default {
    body: new SlashCommandBuilder()
        .setName('set-course-role-channel')
        .setDescription('Set\'s the channel which course roles will be added to.')
        .addChannelOption(new SlashCommandChannelOption()
            .setName("role-channel")
            .setDescription("The channel in which the role selection will exist.")
            .setRequired(true)
        )
        .addChannelOption(new SlashCommandChannelOption()
            .setName("parent-channel")
            .setDescription("The category in which the course chats will reside.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction) {
        const courseRoleSettings = await CourseRolesSetting.findOne({ where: { guildId: interaction.guildId } });
        if(courseRoleSettings === null) {
            await CourseRolesSetting.create({
                guildId: interaction.guildId,
                roleSelectionChannelId: interaction.options.getChannel("role-channel").id,
                courseChatCategoryId: interaction.options.getChannel("parent-channel").id
            });
            
            logger.info("Role selection channel has been created.");
            interaction.reply("Role selection channel has been set.");
            return;
        }

        courseRoleSettings.update({
            roleSelectionChannelId: interaction.options.getChannel("role-channel").id
        });

        logger.info("Role selection channel has been set.");
        interaction.reply("Role selection channel has been updated.");
    }   
};