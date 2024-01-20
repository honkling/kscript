import { getPosition } from "../lib/position";
import { Token, TokenTypes } from "./token";

export class Lexer {
    private index = 0;

    constructor(public input: string) {}

    public lex(): Token[] {
        const tokens = [];

        while (!this.isEnd()) {
            const token = this.getNextToken();
            this.index += token.raw.length;
            tokens.push(token);
        }

        return tokens;
    }

    private getNextToken(): Token {
        const rest = this.input.substring(this.index);

        for (const type of Object.values(TokenTypes)) {
            const match = rest.match(type.regex);

            if (match)
                return new Token(type, match[0], this.index);
        }

        throw new Error(`Found unexpected token at ${getPosition(this.input, this.index)}`);
    }

    private isEnd(): boolean {
        return this.index >= this.input.length;
    }
}