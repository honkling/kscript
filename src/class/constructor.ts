import { Node } from "../node/node";
import { Block } from "../statement/block";
import { Function } from "../node/function";
import { Parameter } from "./parameter";
import { Field } from "../statement/field";
import { Class } from "./class";

export class Constructor extends Function {
    constructor(
        public fields: Field[],
        parameters: Parameter[],
        block: Block,
        parent: Class,
    ) {
        super("<init>", parameters, block, parent.name, parent);
    }
}