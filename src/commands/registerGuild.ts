import { SlashCommandBuilder } from '@discordjs/builders';
import { logger } from '../logger';
import { messageEmbed } from '../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers this guild with the Harvey registry.')
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        interaction.reply({ embeds: [messageEmbed(`This guild is now registered with Harvey!`, "GREEN")]});
        logger.info(`Registered Guild.`);
    }   
};