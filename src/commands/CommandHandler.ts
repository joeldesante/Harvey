//import { NotFoundError } from "common-errors";
import { Client, Message } from "discord.js";
import { CommandTree } from "./CommandTree";

export class CommandHandler {
    private registeredTrees: Array<CommandTree>;

    constructor(client: Client) {
        this.registeredTrees = new Array<CommandTree>();
        client.on('message', this.handleIncomingMessage);
    }

    public register(commandTree: CommandTree) {
        this.registeredTrees.push(commandTree);
        // TODO: Sort the tree's by priority
    }

    public fetchByHandle(handle: string): CommandTree {
        const tree = this.registeredTrees.find(tree => {
            return tree.getHandle == handle;
        });
        if (tree === undefined) { throw new Error('Sample'); }
        return tree;
    }

    private handleIncomingMessage(message: Message) {
        const messageText = message.content;
        if(message.author.bot) { return; }
        if(messageText.startsWith('*') === false) { return; }   // Ignore this interaction.
        message.reply('Hello.');
    }
}