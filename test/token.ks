class Token(
    val type: TokenType,
    val raw: string,
    val start: integer
) {
    fun expect(type: TokenType): Token {
        if (this.type == type)
            return this

        throw("Expected ${this.type}, found $type")
    }
}

enum TokenType {
    NEWLINE,
    WHITESPACE,
    IDENTIFIER
}