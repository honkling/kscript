class Token(
    val type: TokenType,
    val raw: string,
    val start: integer
) {
    fun expect(type: TokenType): Token {
        val a = 1
    }
}

enum TokenType {
    NEWLINE,
    WHITESPACE,
    IDENTIFIER
}