import { Node } from "../node/node";
import { Pass } from "./pass";

export class PassManager {
    private passes: Pass[];

    public register(pass: Pass) {
        this.passes.push(pass);
    }

    public accept(node: Node) {
        for (const pass of this.passes)
            pass.visit(node);
    }
}