import { Token } from "./token";

export class TokenStream {
    public index = 0;

    constructor(public tokens: Token[]) {}

    public peek(): Token {
        return this.tokens[this.index];
    }

    public consume(): Token {
        return this.tokens[this.index++];
    }

    public isEnd(): boolean {
        return this.index >= this.tokens.length;
    }
}