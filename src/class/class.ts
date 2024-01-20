import { Node } from "../node/node";
import { Field } from "../statement/field";
import { Function } from "../node/function";
import { ClassDeclaration } from "../statement/classDeclaration";

export class Class extends Node {
    constructor(
        public name: string,
        public fields: Field[],
        public methods: Map<string, Function>,
        parent: ClassDeclaration
    ) {
        super(parent);
    }
}