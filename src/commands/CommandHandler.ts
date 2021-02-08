//import { NotFoundError } from "common-errors";
import { ArgumentError, InvalidOperationError, NotFoundError, NotImplementedError } from "common-errors";
import { Client, Message } from "discord.js";
import Harvey from "..";
import { CommandTree } from "./CommandTree";

export class CommandHandler {
    private registeredTrees: Array<CommandTree>;

    constructor(client: Client) {
        this.registeredTrees = new Array<CommandTree>();
        client.on('message', message => this.handleIncomingMessage(message));
    }

    public register(commandTree: CommandTree) {
        this.registeredTrees.push(commandTree);
        Harvey.LOGGER.debug(`Registered command tree "${commandTree.getName}" with handle "${commandTree.getHandle}".`);
        // TODO: Sort the tree's by priority
    }

    public fetchTreeByHandle(handle: string): CommandTree {
        const tree = this.registeredTrees.find(tree => {
            return tree.getHandle.toLowerCase() === handle.toLowerCase();
        });
        if (tree === undefined) { throw new NotFoundError('Tree handle'); }
        return tree;
    }

    private handleIncomingMessage(message: Message) {
        const messageText = message.content;
        if(message.author.bot) { return; }
        if(messageText.startsWith('*') === false) { return; }   // Ignore this interaction.
        
        const explodedMessage = messageText.split(' ');
        let preHandle = explodedMessage.shift();
        Harvey.LOGGER.debug(`Shifted exploded messages array. New length: ${explodedMessage.length}.`);

        if(explodedMessage.length < 0 || preHandle === undefined) {
            Harvey.LOGGER.debug(`Exploded message length: ${explodedMessage.length} (Should be greater than or equal to zero) / preHandle: ${preHandle} (Should NOT be undefined).`);
            throw new InvalidOperationError('The message does not have content.');
        }

        const handle = preHandle.substring(1);
        Harvey.LOGGER.info(`Recieved command "${handle}" with args [${explodedMessage.toString()}] <= ${message.author.username} ${message.author}`);

        try {
            const tree = this.fetchTreeByHandle(handle);
            const node = tree.routeToTreeNode(explodedMessage);
            Harvey.LOGGER.debug(`Routed to node - ${node}`);

            if(node === undefined) {
                throw new NotFoundError('Could not find the requested TreeNode.');
            }

            const treeNodeController = node.getController;
            if(treeNodeController === undefined) {
                throw new NotImplementedError('The node\'s controller is not implemented.');
            }

            // Note: Any errors thrown from within the controllers will have to be handled in the following catch clause.
            treeNodeController.execute(new Map<string, any>());

        } catch(err) {
            if(err instanceof NotFoundError) {
                Harvey.LOGGER.warn(`Command handle "${handle}" with from "${messageText}" not found. => ${message.author.username} ${message.author}`);
            } else if(err instanceof NotImplementedError) {
                Harvey.LOGGER.warn(`Command handle "${handle}" with from "${messageText}" is not yet implemented. => ${message.author.username} ${message.author}`), err;
            } else {
                Harvey.LOGGER.warn(`There was an unexpected error.`, err);
            }

            return;     // Silently fail.
        }
    }
}