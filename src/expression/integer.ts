import { Node } from "../node/node";
import { Expression } from "./expression";

export class Integer extends Expression {
    constructor(public value: number, parent: Node) {
        super(parent);
    }
}