import { Class } from "../class/class";
import { Expression } from "../expression/expression";
import { Node } from "../node/node";
import { Statement } from "./statement";

export class Field extends Statement {
    constructor(
        public mutable: boolean,
        public name: string,
        public type: string,
        public value: Expression<any> | null,
        public parent: Class
    ) {
        super(parent);
    }
}