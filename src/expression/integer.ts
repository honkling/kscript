import { Node } from "../node/node";
import { Expression } from "./expression";

export class Integer extends Expression<number> {
    constructor(public value: number, parent: Node) {
        if (value % 1 !== 0)
            throw new Error("Non-integer value passed to expression.");

        super("integer", parent);
    }

    public get(): number {
        return this.value;
    }
}