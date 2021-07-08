import { NotImplementedError } from "common-errors";
import { Message, MessageEmbed } from "discord.js";
import { Controller } from "../../Controller";

export class Help extends Controller {
    execute(data: Map<string, any>): void {
        const message: Message = data.get('message');

        const response: MessageEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Harvey Help')
            .addField('Help Command', `${process.env.COMMAND_FLAG}help`, false)
            .addField('About Harvey', `${process.env.COMMAND_FLAG}about`, false)
            .addField('Version Information', `${process.env.COMMAND_FLAG}version`, false);

        message.channel.send(response);
    }
}