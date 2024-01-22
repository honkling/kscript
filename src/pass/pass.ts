import { Class } from "../class/class";
import { Constructor } from "../class/constructor";
import { Parameter } from "../class/parameter";
import { Expression } from "../expression/expression";
import { FunctionCall } from "../expression/functionCall";
import { Variable } from "../expression/variable";
import { Function } from "../node/function";
import { Node } from "../node/node";
import { Block } from "../statement/block";
import { ClassDeclaration } from "../statement/classDeclaration";
import { Field } from "../statement/field";
import { FunctionDeclaration } from "../statement/functionDeclaration";
import { Statement } from "../statement/statement";
import { VariableAssignment } from "../statement/variableAssignment";
import { VariableDeclaration } from "../statement/variableDeclaration";

export class Pass {
    public visit(node: Node) {};
    public visitStatement(statement: Statement) {};

    public visitVariableDeclaration(statement: VariableDeclaration) {}
    public visitVariableAssignment(statement: VariableAssignment) {}
    public visitFunctionDeclaration(method: FunctionDeclaration) {}
    public visitClassDeclaration(statement: ClassDeclaration) {}
    public visitExpression(variable: Expression<any>) {}
    public visitFunctionCall(statement: FunctionCall) {}
    public visitParameter(parameter: Parameter) {}
    public visitFunctionHeader(func: Function) {}
    public visitVariable(variable: Variable) {}
    public visitFunction(func: Function) {}
    public visitBlock(block: Block) {}
    public visitClass(clazz: Class) {}
    public visitField(field: Field) {}
}