export function getSkriptType(type: string): string {
    switch (type) {
        case "integer": return "integer";
        case "float": return "number";
        case "boolean": return "boolean";
        default: return "string";
    }
}