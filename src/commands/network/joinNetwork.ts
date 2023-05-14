import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { joinNetwork } from '../../lib/network';
import { logger } from '../../logger';
import { messageEmbed } from '../../lib/messageEmbed';
import type { CommandInteraction } from 'discord.js';

export default {
    body: new SlashCommandBuilder()
        .setName('join-network')
        .setDescription('Joins this server into a network of servers')
        .addStringOption(new SlashCommandStringOption()
            .setName("name")
            .setDescription("The exact name of the network you'd like to join.")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
    onTriggered: async function(interaction: CommandInteraction) {
        logger.info("dasd")
        const networkName = interaction.options.getString("name");
        if (!networkName) {
            throw new Error("Unable to obtain network name.");
        }

        const guildId = interaction.guildId;
        console.log("A")
        await joinNetwork(networkName, guildId);
        console.log("B")

        interaction.reply({ embeds: [messageEmbed(`Joined network ${networkName}`, "GREEN")]});
        logger.info(`Joined network ${networkName}`);
    }   
};