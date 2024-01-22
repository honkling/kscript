import { Node } from "../node/node";
import { Expression } from "./expression";

export class Variable extends Expression<string> {
    constructor(public value: string, parent?: Node) {
        super("string", parent);
    }

    public get(): string {
        return this.value;        
    }
}