import {Controller} from "./Controller";
import {Checks} from "../lib/checks/Checks";
import { ArgumentError, NotImplementedError, NotSupportedError } from "common-errors";

export enum NodeType {
    STANDARD,
    WILDCARD,
    USER_ARGUMENT,
    CHANNEL_ARGUMENT,
    NUMERIC_ARGUMENT
}

export class TreeNode {
    private type: NodeType;
    private treeNodes: Array<TreeNode>;
    private controller: Controller | undefined;
    private handle: string;

    constructor(type: NodeType, handle: string, controller: Controller | undefined = undefined) {
        this.type = type;
        this.handle = handle;
        this.treeNodes = new Array<TreeNode>();
        this.controller = controller;
    }

    public add(node: TreeNode): TreeNode {
        this.treeNodes.push(node);
        return this;
    }

    public get getHandle() {
        return this.handle;
    }

    public get getController() {
        return this.controller;
    }

    public find(path: Array<string>): TreeNode | undefined {
        const handle = path.shift();

        // Returns itself if there are no more items on the path.
        if(path.length < 0 || handle === undefined) { return this; }

        const node = this.treeNodes.find((node) => {
            return node.getHandle.toLowerCase() === handle.toLowerCase();
        });

        if(node) {
            return node.find(path);
        }

        return undefined;
    }

}

export class CommandTree {
    private name: string;
    private handle: string;
    private root: any;
    private priority: number;

    /**
     * 
     * @param name The name of the command tree. Best if set to the parent modules name. Intended to make debugging easier.
     * @param handle The string which the user sends to activate a command.
     * @param priority Determines the order in which the tree will be listed in the registry. Lower numbers will be overidden by tree's with higher numbers and the same handle.
     * @param rootController Set's the root controller.
     */
    constructor(name: string, handle: string, priority: number = 0, rootController: Controller | undefined = undefined) {
        this.root = new TreeNode(NodeType.STANDARD, handle, rootController);
        this.handle = handle;
        this.name = name;
        this.priority = priority;
    }

    public get getHandle() : string {
        return this.handle;
    }

    public get getName() {
        return this.name;
    }

    public routeToTreeNode(path: Array<string>): TreeNode | undefined {
        return this.root.find(path);
    }
    
}

export class TreeFactory {
    /**
     * Builds a Command Tree from given JSON data.
     * @param data 
     */
    static create(data: object): CommandTree {
        return new CommandTree('name', 'test');
    }
}