import { Entity, Symbol } from "./entity";

export class Builder {
    public data = "";

    public add(entity: Entity, pad: boolean = true): Builder {
        this.data += entity;
        
        if (pad)
            this.data += Symbol.SPACE;

        return this;
    }
}