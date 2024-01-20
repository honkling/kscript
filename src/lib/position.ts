export class Position {
    constructor(
        public line: number,
        public column: number
    ) {}

    public toString() {
        return `(${this.line}:${this.column})`
    }
}

export function getPosition(input: string, index: number): Position {
    const before = input.substring(0, index);
    const line = before.split("\n").length;
    const column = index - before.lastIndexOf("\n") + 1;

    return new Position(line, column);
}