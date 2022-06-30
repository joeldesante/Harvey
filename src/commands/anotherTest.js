import { SlashCommandBuilder } from '@discordjs/builders';
import { logger } from '../logger.js';

export default {
    body: new SlashCommandBuilder().setName('atest').setDescription('Replies with test!'),
    onTriggered: async function(interaction) {
        logger.info("Yoo hoo!");
        interaction.reply("Test!");
    }   
}