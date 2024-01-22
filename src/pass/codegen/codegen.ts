import { Class } from "../../class/class";
import { Constructor } from "../../class/constructor";
import { Variable } from "../../expression/variable";
import { Function } from "../../node/function";
import { Node } from "../../node/node";
import { Block } from "../../statement/block";
import { ClassDeclaration } from "../../statement/classDeclaration";
import { FunctionCall } from "../../statement/functionCall";
import { Statement } from "../../statement/statement";
import { VariableAssignment } from "../../statement/variableAssignment";
import { VariableDeclaration } from "../../statement/variableDeclaration";
import { Pass } from "../pass";
import { SkriptNode } from "./node";

export class CodeGen extends Pass {
    private valueStack = [] as string[];

    public visit(node: Node) {
        if (node instanceof Statement)
            this.visitStatement(node);
    }

    public visitVariableAssignment(statement: VariableAssignment): void {
        this.visitVariable(statement.variable);
        const variable = this.valueStack.pop();

        this.visitExpression(statement.value);
        const expression = this.valueStack.pop();

        this.valueStack.push(SkriptNode.setVariable(variable, expression));
    }

    public visitVariable(variable: Variable): void {
        this.valueStack.push(SkriptNode.variable(variable.get()));
    }

    public visitVariableDeclaration(statement: VariableDeclaration): void {
        this.visitVariable(statement.variable);
        const variable = this.valueStack.pop();

        this.visitExpression(statement.value);
        const expression = this.valueStack.pop();

        this.valueStack.push(SkriptNode.setVariable(variable, expression));
    }

    public visitStatement(statement: Statement) {
        if (statement instanceof ClassDeclaration)
            this.visitClassDeclaration(statement);

        if (statement instanceof FunctionCall)
            this.visitFunctionCall
    }

    public visitClassDeclaration(statement: ClassDeclaration) {
        this.visitClass(statement.clazz);
    }

    public visitClass(clazz: Class) {
        const functions = [];

        for (const func of clazz.methods.values()) {
            this.visitFunction(func);
            functions.push(this.valueStack.pop());
        }

        this.valueStack.push(SkriptNode.class(functions));
    }

    public visitFunction(func: Function): void {
        this.visitFunctionHeader(func);
        const header = this.valueStack.pop();

        this.visitBlock(func.block);
        const block = this.valueStack.pop();

        this.valueStack.push(SkriptNode.function(header, block));
    }

    public visitFunctionHeader(func: Function): void {
        this.valueStack.push(SkriptNode.functionHeader(func));
    }

    public visitBlock(block: Block): void {
        const statements = [];

        for (const statement of block.statements) {
            this.visitStatement(statement);
            statements.push(this.valueStack.pop());
        }

        this.valueStack.push(SkriptNode.block(statements));
    }
}