import { SlashCommandBuilder, SlashCommandChannelOption } from '@discordjs/builders';
import { logger } from '../logger.js';

export default {
    body: new SlashCommandBuilder()
        .setName('create-course')
        .setDescription('Creates a course chat for a given course.')
        .addChannelOption(
            new SlashCommandChannelOption()
                .setName("channel")
                .setDescription("The channel which users will be talking.")
        ),
    onTriggered: async function(interaction) {
        logger.info("Yoo hoo!");
        interaction.reply("Hoi!");
    }   
}