import { Expression } from "../expression/expression";
import { Variable } from "../expression/variable";
import { Block } from "./block";
import { Statement } from "./statement";

export class VariableAssignment extends Statement {
    constructor(
        public variable: Variable,
        public value: Expression<any> | null,
        parent?: Block
    ) {
        super(parent);
    }
}