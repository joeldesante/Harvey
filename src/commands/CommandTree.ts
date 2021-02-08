import {Controller} from "./Controller";
import {Checks} from "../lib/checks/Checks";

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

        if(controller !== undefined) {
            this.controller = controller;
        }
    }

    public add(node: TreeNode): TreeNode {
        this.treeNodes.push(node);
        return this;
    }

    public getHandle() {
        return this.handle;
    }

    public find(handle: string) {
        return this.treeNodes.find((node) => {
            return node.getHandle().toLowerCase() === handle.toLowerCase();
        });
    }

}

export class CommandTree {
    private name: string;
    private handle: string;
    private root: any;

    constructor(name: string, handle: string) {
        this.root = new TreeNode(NodeType.STANDARD, handle);
        this.handle = handle;
        this.name = name;
    }

    public get getHandle() : string {
        return this.handle;
    }

    public get getName() {
        return this.name;
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