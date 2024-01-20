import { Node } from "../node/node";
import { Expression } from "./expression";

export class Boolean extends Expression {
    constructor(public value: boolean, parent: Node) {
        super(parent);
    }
}