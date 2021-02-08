import { CommandTree } from "./CommandTree";

export class CommandHandler {
    private registeredTrees: Array<CommandTree>;

    constructor() {
        this.registeredTrees = new Array<CommandTree>();
    }

    public register(commandTree: CommandTree) {
        this.registeredTrees.push(commandTree);
        // TODO: Sort the tree's by priority
    }
}