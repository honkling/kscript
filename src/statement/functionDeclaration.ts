import { Function } from "../node/function";
import { Node } from "../node/node";
import { Block } from "./block";
import { Statement } from "./statement";

export class FunctionDeclaration extends Statement {
    constructor(public func: Function, parent?: Block) {
        super(parent)
    }
}