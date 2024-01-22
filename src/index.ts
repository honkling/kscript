import { readFileSync } from "fs";
import { join } from "path";
import { Lexer } from "./lexer/lexer";
import { TokenStream } from "./lexer/stream";
import { TokenTypes } from "./lexer/token";
import { Parser } from "./parser/parser";
import { ClassDeclaration } from "./statement/classDeclaration";
import { FunctionDeclaration } from "./statement/functionDeclaration";

const input = readFileSync(join(__dirname, "../test/token.ks"), "utf8");

const lexer = new Lexer(input);
const tokens = lexer.lex().filter((t) => t.type !== TokenTypes.WHITESPACE);
const stream = new TokenStream(tokens);

const parser = new Parser(stream);
const statement = parser.parseStatement() as ClassDeclaration;
console.log((statement.clazz.methods.get("expect") as unknown as FunctionDeclaration));