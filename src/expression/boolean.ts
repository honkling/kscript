import { Node } from "../node/node";
import { Expression } from "./expression";

export class Boolean extends Expression<boolean> {
    constructor(public value: boolean, parent: Node) {
        super("boolean", parent);
    }

    public get(): boolean {
        return this.value;
    }
}