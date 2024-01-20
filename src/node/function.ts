import { Node } from "./node";
import { Block } from "../statement/block";
import { Parameter } from "../class/parameter";
import { FunctionDeclaration } from "../statement/functionDeclaration";
import { Class } from "../class/class";

export class Function extends Node {
    constructor(
        public name: string,
        public parameters: Parameter[],
        public block: Block,
        public returnType: string,
        parent: Class | FunctionDeclaration
    ) {
        super(parent);
    }
}