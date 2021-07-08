import { NotImplementedError } from "common-errors";
import { Message, MessageEmbed } from "discord.js";
import { Controller } from "../../Controller";

export class About extends Controller {
    execute(data: Map<string, any>): void {
        const message: Message = data.get('message');

        const response: MessageEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('About Harvey')
            .addField('About', 'Harvey is a modular discord bot designed to be expanded upon by the community that uses it.', false)

        message.channel.send(response);
    }
}