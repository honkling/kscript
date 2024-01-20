import { Class } from "../class/class";
import { Constructor } from "../class/constructor";
import { Field } from "../statement/field";
import { Parameter } from "../class/parameter";
import { Boolean } from "../expression/boolean";
import { Character } from "../expression/character";
import { Expression } from "../expression/expression";
import { Float } from "../expression/float";
import { Integer } from "../expression/integer";
import { String } from "../expression/string";
import { TokenStream } from "../lexer/stream";
import { Token, TokenTypes } from "../lexer/token";
import { Node } from "../node/node";
import { Block } from "../statement/block";
import { ClassDeclaration } from "../statement/classDeclaration";
import { Function } from "../node/function";
import { Import } from "../statement/import";
import { Statement } from "../statement/statement";
import { FunctionDeclaration } from "../statement/functionDeclaration";
import { VariableDeclaration } from "../statement/variableDeclaration";

export class Parser {
    public imports = new Map<string, Import[]>();

    constructor(public stream: TokenStream) {}

    public parseStatement(parent?: Node): Statement {
        const token = this.stream.peek();

        switch (token.type) {
            case TokenTypes.KEYWORD_IMPORT:
            case TokenTypes.KEYWORD_FROM: {
                if (parent)
                    throw new Error("Imports are top-level only.");

                return this.parseImport();
            }
            case TokenTypes.KEYWORD_CLASS: {
                if (parent)
                    throw new Error("Class declarations are top-level only.");

                return this.parseClassDeclaration();
            }
            case TokenTypes.KEYWORD_FUNCTION: return this.parseFunction();
            case TokenTypes.KEYWORD_VALUE:
            default: throw new Error("Unexpected statement.");
        }
    }

    public parseFunction(parent?: Block): FunctionDeclaration {
        this.stream.consume().expectType(TokenTypes.KEYWORD_FUNCTION, "Expected function keyword, found {type}");

        const statement = new FunctionDeclaration(null, parent);
        const func = statement.func = new Function(null, [], null, null, statement);
        func.name = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected function name, found {type}").raw;

        this.stream.consume().expectType(TokenTypes.SYMBOL_OPEN_PAREN, "Expected opening parentheses for parameters, found {type}");

        while (this.stream.peek().type !== TokenTypes.SYMBOL_CLOSE_PAREN)
            func.parameters.push(this.parseParameter(func));

        this.stream.consume().expectType(TokenTypes.SYMBOL_CLOSE_PAREN, "Expected closing parentheses or comma for parameters, found {type}");

        if (this.stream.peek().type === TokenTypes.SYMBOL_COLON) {
            this.stream.consume();
            func.returnType = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected return type, found {type}").raw;
        }

        this.stream.peek().expectType(TokenTypes.SYMBOL_OPEN_BRACE, "Expected function body, found {type}");

        func.block = this.parseBlock(func);

        return statement;
    }

    public parseFieldOrParameter(parent: Class | Function): Field | Parameter {
        const token = this.stream.peek();

        if (token.type === TokenTypes.KEYWORD_VALUE || token.type === TokenTypes.KEYWORD_VARIABLE)
            return this.parseField(parent as Class);

        return this.parseParameter(parent as Function);
    }

    public parseParameter(parent: Function): Parameter {
        const name = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected parameter name, found {type}");
        this.stream.consume().expectType(TokenTypes.SYMBOL_COLON, "Expected colon delimiting parameter name & type, found {type}");
        const type = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected parameter type, found {type}");

        const parameter = new Parameter(name.raw, type.raw, null, parent);

        if (this.stream.peek().type === TokenTypes.SYMBOL_EQUALS) {
            this.stream.consume();
            parameter.value = this.parseExpression(parameter);
        }

        return parameter;
    }

    public parseClassDeclaration(): ClassDeclaration {
        this.stream.consume().expectType(TokenTypes.KEYWORD_CLASS, "Expected class keyword, found {type}");

        const statement = new ClassDeclaration(null);
        const clazz = statement.clazz = new Class(null, [], new Map(), statement);
        clazz.name = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected class name, found {type}").raw;

        // Parse constructor
        if (this.stream.peek().type === TokenTypes.SYMBOL_OPEN_PAREN) {
            const constructor = this.parseConstructor(clazz);
            clazz.methods.set("<init>", constructor);
            clazz.fields.push(...constructor.fields);
        }

        this.stream.peek().expectType(TokenTypes.SYMBOL_OPEN_BRACE, "Expected class body, found {type}");
        const block = this.parseBlock(clazz);

        for (const statement of block.statements) {
            if (statement instanceof FunctionDeclaration)
                clazz.methods[statement.func.name] = statement;
            else if (statement instanceof Field)
                clazz.fields.push(statement);
            else
                throw new Error("Only fields and methods can be declared in classes.");
        }

        return new ClassDeclaration(clazz);
    }

    public parseBlock(parent: Class | Function): Block {
        this.stream.consume().expectType(TokenTypes.SYMBOL_OPEN_BRACE);
        const block = new Block([], parent);

        while (this.stream.peek().type !== TokenTypes.SYMBOL_CLOSE_BRACE) {
            const statement = this.parseStatement(block);
            block.statements.push(statement);
        }

        this.stream.consume().expectType(TokenTypes.SYMBOL_CLOSE_BRACE, "Expected closing brace for block, found {type}");
        return block;
    }

    public parseField(parent: Class): Field {
        const token = this.stream.consume();
        let isMutable = token.type === TokenTypes.KEYWORD_VARIABLE;

        if (!isMutable)
            token.expectType(TokenTypes.KEYWORD_VALUE, "Expected 'val' or 'var' keywords for field, found {type}");

        const name = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected field name, found {type}");
        this.stream.consume().expectType(TokenTypes.SYMBOL_COLON, "Expected colon delimiting name & type, found {type}");
        const type = this.stream.consume().expectType(TokenTypes.IDENTIFIER, "Expected field type, found {type}");

        const field = new Field(isMutable, name.raw, type.raw, null, parent);

        if (this.stream.peek().type === TokenTypes.SYMBOL_EQUALS) {
            this.stream.consume();
            field.value = this.parseExpression(field);
        }

        return field;
    }

    public parseConstructor(parent: Class): Constructor {
        this.stream.consume().expectType(TokenTypes.SYMBOL_OPEN_PAREN, "Expected opening parentheses for constructor, found {type}");

        const constructor = new Constructor([], [], null, parent);

        while (this.stream.peek().type !== TokenTypes.SYMBOL_CLOSE_PAREN) {
            const entry = this.parseFieldOrParameter(constructor);

            if (entry instanceof Field)
                constructor.fields.push(entry);
            else
                constructor.parameters.push(entry);

            if (this.stream.peek().type === TokenTypes.SYMBOL_COMMA)
                this.stream.consume();
        }

        this.stream.consume().expectType(TokenTypes.SYMBOL_CLOSE_PAREN, "Expected closing parentheses for constructor, found {type}");
        return constructor;
    }

    public parseExpression(parent: Node): Expression {
        const token = this.stream.peek();

        switch (token.type) {
            case TokenTypes.LITERAL_STRING: return this.parseString(parent);
            case TokenTypes.LITERAL_CHARACTER: return this.parseCharacter(parent);
            case TokenTypes.LITERAL_INTEGER: return this.parseInteger(parent);
            case TokenTypes.LITERAL_FLOAT: return this.parseFloat(parent);
            case TokenTypes.LITERAL_BOOLEAN: return this.parseBoolean(parent);
        }
    }

    public parseString(parent: Node): String {
        const token = this.stream.consume().expectType(TokenTypes.LITERAL_STRING);
        return new String(token.raw
            .substring(1, token.raw.length - 1)
            .replace(/\\(.)/g, "$1"), parent);
    }

    public parseCharacter(parent: Node): Character {
        const token = this.stream.consume().expectType(TokenTypes.LITERAL_CHARACTER);
        return new Character(token.raw
            .substring(1, token.raw.length - 1)
            .replace("\\n", "\n")
            .replace("\\t", "\t")
            .replace(/\\(.)/, "$1"), parent);
    }

    public parseInteger(parent: Node): Integer {
        const token = this.stream.consume().expectType(TokenTypes.LITERAL_INTEGER);
        return new Integer(parseInt(token.raw), parent);
    }

    public parseFloat(parent: Node): Float {
        const token = this.stream.consume().expectType(TokenTypes.LITERAL_FLOAT);
        return new Float(parseFloat(token.raw), parent);
    }

    public parseBoolean(parent: Node): Boolean {
        const token = this.stream.consume().expectType(TokenTypes.LITERAL_BOOLEAN);
        return new Boolean(token.raw === "true", parent);
    }

    public parseImport(): Import {
        const token = this.stream.peek();

        if (token.type === TokenTypes.KEYWORD_IMPORT) {
            this.stream.consume().expectType(TokenTypes.KEYWORD_IMPORT);
            const module = this.stream.consume().expectType(TokenTypes.IDENTIFIER);
            return new Import(module.raw);
        }

        this.stream.consume().expectType(TokenTypes.KEYWORD_FROM);
        const module = this.stream.consume().expectType(TokenTypes.IDENTIFIER);
        this.stream.consume().expectType(TokenTypes.KEYWORD_IMPORT);

        let name: Token;
        const imports = [];
        while (name = this.stream.consume().expectType(TokenTypes.IDENTIFIER)) {
            imports.push(name.raw);

            if (this.stream.peek().type !== TokenTypes.SYMBOL_COMMA)
                break;
        }

        return new Import(module.raw, imports);
    }
}