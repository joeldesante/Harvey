import { MessageEmbed } from "discord.js";

/**
 * Makes a MessageEmbed with a simple function.
 * @param {string} text 
 * @param {string} color 
 */
export function messageEmbed(text, color) {
    return new MessageEmbed()
        .setDescription(text)
        .setColor(color);
}