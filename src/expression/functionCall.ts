import { Block } from "../statement/block";
import { Expression } from "./expression";

export class FunctionCall extends Expression<any> {
    constructor(public name: string, public parameters: Expression<any>[], parent?: Block) {
        super("object", parent);
    }

    public get(block: Block) {
        
    }
}