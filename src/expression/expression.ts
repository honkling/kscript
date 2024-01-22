import { Node } from "../node/node";
import { Block } from "../statement/block";

export abstract class Expression<T> extends Node {
    constructor(public type: string, parent: Node) {
        super(parent);
    }

    public abstract get(block: Block): T
}