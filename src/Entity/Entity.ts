import Point from "./Point";

abstract class Entity {
    abstract shift(x: number, y: number): void;
    abstract rotate(p: Point, rad: number): void;
    abstract getData(): EntityData;
    abstract isPresent(x: number, y: number): {
        present: boolean;
        zIndex: number
    }

    constructor(
        public readonly name: string,
        public readonly id: number,
        public zIndex: number
    ) { }
}

interface EntityData {
    readonly name: string;
    readonly id: number;
    readonly boundary: Boundary;
}

interface Boundary {
    p1: { x: number, y: number };
    p2: { x: number, y: number };
}

interface FunctionCoefficients {
    A: number;
    B: number;
    C: number;
}


export default Entity;
export { Boundary, FunctionCoefficients, EntityData };