from token import Token

class Lexer(val input: string) {
    var index = 0

    fun lex(): Token[] {

    }

    fun getNextToken(): Token {
        val rest = input.substring(index)
        val char = rest[0]

        when (char) {
            '\n' -> Token(TokenType.NEWLINE, "\n", index)
            ' ' -> Token(TokenType.WHITESPACE, " ", index)
            else -> {
                val index = 0
                var raw = ""

                while (rest[index] != '\n' && rest[index]) {}
            }
        }
    }
}