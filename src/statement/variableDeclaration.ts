import { Expression } from "../expression/expression";
import { Block } from "./block";
import { Statement } from "./statement";

export class VariableDeclaration extends Statement {
    constructor(
        public isMutable: boolean,
        public name: string,
        public type: string,
        public value: Expression | null,
        parent?: Block
    ) {
        super(parent);
    }
}