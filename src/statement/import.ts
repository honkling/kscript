import { Statement } from "./statement";

export class Import extends Statement {
    constructor(public module: string, public imports?: string[]) {
        super(null);
    }
}