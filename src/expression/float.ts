import { Node } from "../node/node";
import { Expression } from "./expression";

export class Float extends Expression<number> {
    constructor(public value: number, parent: Node) {
        super("number", parent);
    }

    public get(): number {
        return this.value;
    }
}