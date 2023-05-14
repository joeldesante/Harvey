import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { createNetwork } from '../../lib/network';
import { logger } from '../../logger';
import { messageEmbed } from '../../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('create-network')
        .setDescription('Creates a course chat for a given course.')
        .addStringOption(new SlashCommandStringOption()
            .setName("name")
            .setDescription("The name of the network you'd like to create.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        const networkName = interaction.options.getString("name");
        if (!networkName) {
            throw new Error("Unable to obtain network name.");
        }
        await createNetwork(networkName);
        interaction.reply({ embeds: [messageEmbed(`Created network ${networkName}`, "GREEN")]});
        logger.info(`Created network ${networkName}`);
    }   
};