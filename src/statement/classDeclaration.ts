import { Class } from "../class/class";
import { Statement } from "./statement";

export class ClassDeclaration extends Statement {
    constructor(public clazz: Class) {
        super(null);
    }
}