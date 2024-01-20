import { Statement } from "./statement";
import { Node } from "../node/node";

export class Block extends Node {
    constructor(public statements: Statement[], parent?: Node) {
        super(parent);
    }
}