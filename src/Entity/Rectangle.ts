import Entity, { Boundary, EntityData } from "./Entity";
import Point from "./Point";
import Vector from "./Vector";

class Rectangle extends Entity {

    public boundary: Boundary;
    private vectors: Vector[];

    constructor(
        name: string,
        id: number,
        public p: Point,
        public q: Point,
        zIndex: number
    ) {
        super(name, id, zIndex);
        this.vectors = this.calculateVectors();
        this.boundary = this.calculateBoundary();
    }

    public shift(x: number, y: number): void {
        // Shift all vectors that belong to this rectangle
        this.vectors.forEach(v => v.shift(x, y));

        // Recalculate boundary
        this.boundary = this.calculateBoundary();
    }

    public rotate(p: Point, rad: number): void {
        // Rotate all vectors that belong to this rectangle
        this.vectors.forEach(v => v.rotate(p, rad));

        // Recalculate boundary
        this.boundary = this.calculateBoundary();
    }

    public getData(): EntityData {
        return {
            name: this.name,
            id: this.id,
            boundary: this.boundary
        };
    }

    public isPresent(x: number, y: number): { present: boolean, zIndex: number } {
        // Check if the rectangle is present at the given point
        // Return true and vector zIndex if present

        // Reduce array of vectors by checking if the point
        // is present in any of the vectors
        // If present, return true and vector zIndex
        // If not, return false and -1
        const res = this.vectors.reduce((acc, v) => {
            if (v.isPresent(x, y).present) {
                return { present: true, zIndex: v.zIndex };
            }
            return acc;
        }, { present: false, zIndex: -1 });
        return res;
    }

    private calculateBoundary(): Boundary {
        // Calculate boundary of the rectangle

        // Get every vector boundaries
        const boundaries: Boundary[] = this.vectors.map(v => v.boundary);

        // In order to calculate the boundary of the rectangle
        // we need to find the smallest and largest x and y values
        // of all the boundaries
        return {
            p1: {
                x:
                    Math.min(
                        ...boundaries.map(b => b.p1.x),
                        ...boundaries.map(b => b.p2.x)
                    ),
                y:
                    Math.min(
                        ...boundaries.map(b => b.p1.y),
                        ...boundaries.map(b => b.p2.y)
                    )
            },
            p2: {
                x:
                    Math.max(
                        ...boundaries.map(b => b.p1.x),
                        ...boundaries.map(b => b.p2.x)
                    ),
                y:
                    Math.max(
                        ...boundaries.map(b => b.p1.y),
                        ...boundaries.map(b => b.p2.y)
                    )
            }
        };
    }

    private calculateVectors(): Vector[] {
        // Calculate vectors that define the rectangle

        // Get all 4 points based on p and q points
        const pAcoords = { x: this.p.x, y: this.p.y };
        const pBcoords = { x: this.q.x, y: this.p.y };
        const pCcoords = { x: this.q.x, y: this.q.y };
        const pDcoords = { x: this.p.x, y: this.q.y };

        // Create vectors for each rectangle side
        const vectors = [
            new Vector(
                `${this.name}-AB`,
                1,
                new Point("A", 1, pAcoords.x, pAcoords.y),
                new Point("B", 2, pBcoords.x, pBcoords.y),
                this.zIndex
            ),
            new Vector(
                `${this.name}-AD`,
                2,
                new Point("A", 1, pAcoords.x, pAcoords.y),
                new Point("D", 2, pDcoords.x, pDcoords.y),
                this.zIndex
            ),
            new Vector(
                `${this.name}-BC`,
                3,
                new Point("B", 2, pBcoords.x, pBcoords.y),
                new Point("C", 3, pCcoords.x, pCcoords.y),
                this.zIndex
            ),
            new Vector(
                `${this.name}-CD`,
                4,
                new Point("C", 3, pCcoords.x, pCcoords.y),
                new Point("D", 4, pDcoords.x, pDcoords.y),
                this.zIndex
            )
        ];
        return vectors;
    }
}

export default Rectangle;