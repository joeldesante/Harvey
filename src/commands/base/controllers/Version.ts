import { NotImplementedError } from "common-errors";
import { Message, MessageEmbed } from "discord.js";
import { Controller } from "../../Controller";

export class Version extends Controller {
    execute(data: Map<string, any>): void {
        const message: Message = data.get('message');

        const response: MessageEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Harvey Version')
            .addField('Version', '1.0.0alpha', false)

        message.channel.send(response);
    }
}