import { Expression } from "../expression/expression";
import { Function } from "../node/function";
import { Node } from "../node/node";

export class Parameter extends Node {
    constructor(
        public name: string,
        public type: string,
        public value: Expression<any> | null,
        parent: Function
    ) {
        super(parent);
    }
}