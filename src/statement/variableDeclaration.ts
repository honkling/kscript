import { Expression } from "../expression/expression";
import { Variable } from "../expression/variable";
import { Block } from "./block";
import { Statement } from "./statement";

export class VariableDeclaration extends Statement {
    constructor(
        public isMutable: boolean,
        public variable: Variable,
        public type: string,
        public value: Expression<any> | null,
        parent?: Block
    ) {
        super(parent);
    }
}