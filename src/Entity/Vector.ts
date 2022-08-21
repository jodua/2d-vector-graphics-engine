import Entity, { Boundary, EntityData, FunctionCoefficients } from "./Entity";
import Point from "./Point";

class Vector extends Entity {

    public boundary: Boundary;
    public vectorLength: number;
    private functionCoefficients: FunctionCoefficients;
    private equationTolerance: number;

    constructor(
        name: string,
        id: number,
        public p: Point,
        public q: Point,
        zIndex: number
    ) {
        super(name, id, zIndex);
        this.boundary = this.calculateBoundary();
        this.functionCoefficients = this.calculateFunctionCoefficients();
        this.vectorLength = this.calculateVectorLength();
        this.equationTolerance = this.vectorLength / 2 - 0.5;
    }

    public shift(x: number, y: number): void {
        // Shift point by x and y
        this.p.shift(x, y);
        this.q.shift(x, y);

        // Recalculate boundary and function coefficients
        this.boundary = this.calculateBoundary();
        this.functionCoefficients = this.calculateFunctionCoefficients();
    }

    public rotate(p: Point, rad: number): void {
        // Rotate point around point p by rad radians
        this.p.rotate(p, rad);
        this.q.rotate(p, rad);

        // Recalculate boundary and function coefficients
        this.boundary = this.calculateBoundary();
        this.functionCoefficients = this.calculateFunctionCoefficients();
    }

    public getData(): EntityData {
        return {
            name: this.name,
            id: this.id,
            boundary: this.boundary
        };
    }

    public isPresent(x: number, y: number): { present: boolean, zIndex: number } {
        // Check if point lies on the vector
        // If yes, return true and zIndex of the vector

        // Check if point is within the boundaries of the vector
        if (x < this.boundary.p1.x || x > this.boundary.p2.x) {
            return { present: false, zIndex: 0 };
        }
        if (y < this.boundary.p1.y || y > this.boundary.p2.y) {
            return { present: false, zIndex: 0 };
        }

        const cf = this.functionCoefficients;

        // Check if point lies on the vector using the equation of the vector
        // if equation result is within tolerance, return true and zIndex 
        // of the vector
        if (
            cf.A * x + cf.B * y + cf.C <= this.equationTolerance &&
            cf.A * x + cf.B * y + cf.C >= -this.equationTolerance
        ) {
            return { present: true, zIndex: this.zIndex };

        }
        return { present: false, zIndex: 0 };

    }

    private calculateBoundary(): Boundary {
        // Calculate the boundary of the vector by obtaining coordinates
        // of the two points that define smallest rectangle that contains
        // the vector

        // p1 is the bottom left corner of the rectangle
        // p2 is the top right corner of the rectangle

        return {
            p1: {
                x: Math.round(Math.min(this.p.x, this.q.x)),
                y: Math.round(Math.min(this.p.y, this.q.y))
            },
            p2: {
                x: Math.round(Math.max(this.p.x, this.q.x)),
                y: Math.round(Math.max(this.p.y, this.q.y))
            }
        };
    }

    private calculateFunctionCoefficients(): FunctionCoefficients {
        // Calculate the function coefficients of the line equation
        // based on the two points that define the vector

        return {
            A: this.q.y - this.p.y,
            B: this.p.x - this.q.x,
            C: this.q.x * this.p.y - this.p.x * this.q.y
        }
    }

    private calculateVectorLength(): number {
        // Calculate the length of the vector using pythagoras theorem
        return Math.sqrt(
            Math.pow(this.q.x - this.p.x, 2) + Math.pow(this.q.y - this.p.y, 2)
        );
    }
}

export default Vector;