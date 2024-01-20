import { Node } from "../node/node";
import { Expression } from "./expression";

export class Float extends Expression {
    constructor(public value: number, parent: Node) {
        super(parent);
    }
}