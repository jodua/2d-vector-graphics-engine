import Entity from "../Entity/Entity";

abstract class Animation<T extends Entity> {
    abstract start(): void;
    abstract stop(): void;
    abstract update(): void;

    constructor(
        public name: string,
        public id: number,
        public objects: T[]
    ) { }
}

export default Animation;