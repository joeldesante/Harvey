//import { NotFoundError } from "common-errors";
import { NotFoundError } from "common-errors";
import { Client, Message } from "discord.js";
import { stringify } from "querystring";
import { CommandTree } from "./CommandTree";

export class CommandHandler {
    private registeredTrees: Array<CommandTree>;

    constructor(client: Client) {
        this.registeredTrees = new Array<CommandTree>();
        client.on('message', message => this.handleIncomingMessage(message));
    }

    public register(commandTree: CommandTree) {
        this.registeredTrees.push(commandTree);
        // TODO: Sort the tree's by priority
    }

    public fetchTreeByHandle(handle: string): CommandTree {
        const tree = this.registeredTrees.find(tree => {
            return tree.getHandle.toLowerCase() === handle.toLowerCase();
        });
        if (tree === undefined) { throw new NotFoundError('Sample'); }
        return tree;
    }

    private handleIncomingMessage(message: Message) {
        const messageText = message.content;
        if(message.author.bot) { return; }
        if(messageText.startsWith('*') === false) { return; }   // Ignore this interaction.
        
        const explodedMessage = messageText.split(' ');
        const handle = explodedMessage[0].substring(1);

        try {
            const tree = this.fetchTreeByHandle(handle);
        } catch(error) {
            
            if(error instanceof NotFoundError) {
                console.warn(`Command Handle Not Found: ${handle}\n\t-> Executed by ${message.author.username}\n\t-> Sent at ${new Date(message.createdTimestamp).toUTCString()}`);
            }

            return;     // Silently fail.
        }
    
    }
}