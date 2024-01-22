import { Function } from "../../node/function";
import { Block } from "../../statement/block";
import { Builder } from "./builder";
import { Keyword, Symbol } from "./entity";
import { getSkriptType } from "./type";

export class SkriptNode {
    public static class(functions: string[]): string {
        const builder = new Builder();

        for (const func of functions) {
            builder.add(func, false);
            builder.add(Symbol.NEWLINE, false);
            builder.add(Symbol.NEWLINE, false);
        }

        return builder.data;
    }

    public static setVariable(variable: string, value: string): string {
        return new Builder()
            .add(Keyword.SET)
            .add(variable)
            .add(Keyword.TO)
            .add(value, false)
            .data;
    }

    public static function(header: string, block: string): string {
        return new Builder()
            .add(header, false)
            .add(Symbol.NEWLINE, false)
            .add(block, false)
            .data;
    }

    public static functionHeader({ name, parameters, returnType }: Function): string {
        const builder = new Builder()
            .add(Keyword.FUNCTION)
            .add(name, false)
            .add(Symbol.OPEN_PAREN);

        for (let i = 0; i < parameters.length; i++) {
            const isLast = i + 1 >= parameters.length;
            const parameter = parameters[i];

            builder
                .add(parameter.name, false)
                .add(Symbol.COLON)
                .add(getSkriptType(parameter.type));

            if (!isLast)
                builder.add(Symbol.COMMA);
        }

        builder.add(Symbol.CLOSE_PAREN, false);

        if (returnType)
            builder
                .add(Symbol.SPACE, false)
                .add(Symbol.COLON, false)
                .add(Symbol.COLON)
                .add(getSkriptType(returnType), false);

        return builder
            .add(Symbol.COLON, false)
            .data;
    }

    public static block(statements: string[]): string {
        const builder = new Builder();

        for (const statement of statements)
            builder
                .add(Symbol.TAB, false)
                .add(statement);

        return builder.data;
    }

    // Expressions
    public static variable(name: string): string {
        return new Builder()
            .add(Symbol.OPEN_BRACE, false)
            .add(Symbol.UNDERLINE, false)
            .add(Symbol.CLOSE_BRACE, false)
            .data;
    }

    public static boolean(value: boolean): string {
        return new Builder()
            .add(value.toString(), false)
            .data;
    }

    public static string(value: string): string {
        return new Builder()
            .add(Symbol.DOUBLE_QUOTE, false)
            .add(value
                .replace(/"/g, "\"\"")
                .replace(/%/g, "%%")
                .replace(/\n/g, "%nl%"), false)
            .add(Symbol.DOUBLE_QUOTE, false)
            .data;
    }

    public static number(value: number): string {
        return new Builder()
            .add(value.toString(), false)
            .data;
    }

    public static functionCall(name: string, parameters: string[]): string {
        const builder = new Builder()
            .add(name, false)
            .add(Symbol.OPEN_PAREN, false);

        for (let i = 0; i < parameters.length; i++) {
            const isLast = i + 1 >= parameters.length;
            const parameter = parameters[i];

            builder.add(parameter, false);

            if (!isLast)
                builder.add(Symbol.COMMA);
        }

        return builder
            .add(Symbol.CLOSE_PAREN, false)
            .data;
    }
}