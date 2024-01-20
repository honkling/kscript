export class Token {
    constructor(
        public type: TokenType,
        public raw: string,
        public start: number
    ) {}

    public expectType(type: TokenType, message = "Expected {expectedType}, found {type}"): Token {
        if (this.type === type)
            return this

        throw new Error(message
            .replace("{expectedType}", type.toString())
            .replace("{type}", this.type.toString()));
    }
}

export class TokenType {
    public regex: RegExp;

    constructor(regex: RegExp) {
        this.regex = new RegExp(`^${regex.source}`);
    }

    public toString(): string {
        return Object.keys(TokenTypes)
            .find((k) => TokenTypes[k] === this);
    }
}

export const TokenTypes = {
    WHITESPACE: new TokenType(/\s+/),

    KEYWORD_ENUM: new TokenType(/enum/),
    KEYWORD_CLASS: new TokenType(/class/),
    KEYWORD_FUNCTION: new TokenType(/fun/),
    KEYWORD_VALUE: new TokenType(/val/),
    KEYWORD_VARIABLE: new TokenType(/var/),
    KEYWORD_FROM: new TokenType(/from/),
    KEYWORD_IMPORT: new TokenType(/import/),

    SYMBOL_OPEN_PAREN: new TokenType(/\(/),
    SYMBOL_CLOSE_PAREN: new TokenType(/\)/),
    SYMBOL_COLON: new TokenType(/:/),
    SYMBOL_COMMA: new TokenType(/,/),
    SYMBOL_PERIOD: new TokenType(/\./),
    SYMBOL_EQUALS: new TokenType(/=/),
    SYMBOL_HYPHEN: new TokenType(/-/),
    SYMBOL_GT: new TokenType(/>/),
    SYMBOL_LT: new TokenType(/</),
    SYMBOL_BANG: new TokenType(/!/),
    SYMBOL_OPEN_BRACE: new TokenType(/\{/),
    SYMBOL_CLOSE_BRACE: new TokenType(/\}/),
    SYMBOL_OPEN_BRACKET: new TokenType(/\[/),
    SYMBOL_CLOSE_BRACKET: new TokenType(/\]/),
    SYMBOL_AMPERSAND: new TokenType(/&/),
    SYMBOL_PIPE: new TokenType(/\|/),

    LITERAL_STRING: new TokenType(/"(\\"|[^"])*"/),
    LITERAL_CHARACTER: new TokenType(/'(\\'|\\?.)'/),
    LITERAL_INTEGER: new TokenType(/\d+/),
    LITERAL_FLOAT: new TokenType(/\d+\.\d+/),
    LITERAL_BOOLEAN: new TokenType(/(true|false)/),

    IDENTIFIER: new TokenType(/\w+/)
}