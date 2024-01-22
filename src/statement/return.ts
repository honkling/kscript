import { Expression } from "../expression/expression";
import { Block } from "./block";
import { Statement } from "./statement";

export class Return extends Statement {
    constructor(public value: Expression<any>, parent: Block) {
        super(parent);
    }
}