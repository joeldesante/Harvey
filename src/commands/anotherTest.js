import { SlashCommandBuilder } from '@discordjs/builders';
import { Logger } from '../logger.js';

export default {
    body: new SlashCommandBuilder().setName('atest').setDescription('Replies with test!'),
    onTriggered: async function(interaction) {
        Logger.info("Yoo hoo!");
        interaction.reply("Test!");
    }   
}