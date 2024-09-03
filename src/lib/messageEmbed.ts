import { type ColorResolvable, MessageEmbed } from "discord.js";

/**
 * Makes a MessageEmbed with a simple function.
 * @param {string} text 
 * @param {ColorResolvable} color 
 */
export function messageEmbed(text: string, color: ColorResolvable) {
    return new MessageEmbed()
        .setDescription(text)
        .setColor(color);
}