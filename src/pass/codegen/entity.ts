export enum Symbol {
    OPEN_PAREN = "(",
    CLOSE_PAREN = ")",
    OPEN_BRACE = "{",
    CLOSE_BRACE = "}",
    UNDERLINE = "_",
    DOUBLE_QUOTE = "\"",
    COLON = ":",
    COMMA = ",",
    SPACE = " ",
    NEWLINE = "\n",
    TAB = "\t"
}

export enum Keyword {
    SET = "set",
    FUNCTION = "function",
    TO = "to"
}

export type Entity = Keyword | Symbol | string;