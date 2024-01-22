import { Statement } from "./statement";
import { Node } from "../node/node";
import { SymbolTable } from "../lib/symbolTable";
import { Class } from "../class/class";

export class Block extends Node {
    public symbolTable = new SymbolTable();

    constructor(public statements: Statement[], parent?: Node) {
        super(parent);
    }

    public getSymbol(key: string): any | null {
        if (this.symbolTable.has(key))
            return this.symbolTable.get(key);

        if (this.parent instanceof Class) {
            return this.parent.methods.get(key)
                ?? this.parent.fields.find((f) => f.name === key);
        }

        if (this.parent instanceof Block) {
            return this.parent.getSymbol(key);
        }
    }
}