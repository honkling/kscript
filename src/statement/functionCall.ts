import { Expression } from "../expression/expression";
import { Block } from "./block";
import { Statement } from "./statement"

export class FunctionCall extends Statement {
    constructor(public name: string, public parameters: Expression<any>[], parent?: Block) {
        super(parent);
    }
}