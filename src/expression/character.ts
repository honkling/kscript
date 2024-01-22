import { Node } from "../node/node";
import { Expression } from "./expression";

export class Character extends Expression<string> {
    constructor(public value: string, parent: Node) {
        if (value.length !== 1)
            throw new Error("Character expression contained more than one character");

        super("string", parent);
    }

    public get(): string {
        return this.value;
    }
}