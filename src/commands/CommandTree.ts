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

        if(controller !== undefined) {
            this.controller = controller;
        }
    }

    public add(node: TreeNode): TreeNode {
        this.treeNodes.push(node);
        return this;
    }

    public get getHandle() {
        return this.handle;
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