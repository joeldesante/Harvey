import { CommandTree, TreeNode, NodeType } from "../src/commands/CommandTree";
import { expect } from 'chai';
import 'mocha';

describe('Command Tree', () => {

    const treeName = 'Test Tree';
    const treeHandleBad = 'harv command';
    const treeHandleGood = 'harv';

    it('should throw an error', () => {
        expect(new CommandTree(treeName, treeHandleBad), 'if the given handle includes a space.').to.throw(Error);
    });

    it('should create a new CommandTree object', () => {
        expect(new CommandTree(treeName, treeHandleGood), 'if all the parameters are valid.').to.be.ok;
    })

});