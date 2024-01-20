import { Node } from "../node/node";
import { Expression } from "./expression";

export class String extends Expression {
    constructor(public value: string, parent: Node) {
        super(parent);
    }
}