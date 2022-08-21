import Entity, { Boundary, EntityData } from "./Entity";
import Point from "./Point";
import Rectangle from "./Rectangle";
import Vector from "./Vector";

class Cube extends Entity {

    public boundary: Boundary;
    public vectors: Vector[];
    public rectangles: Rectangle[];

    constructor(
        name: string,
        id: number,
        public p: Point,
        public size: number,
        zIndex: number
    ) {
        super(name, id, zIndex);
        this.rectangles = [
            new Rectangle(
                `${this.name}-front`,
                this.id + 10,
                new Point(`${this.name}-leftDownFront`, this.id + 10, this.p.x, this.p.y),
                new Point(`${this.name}-rightTopFront`, this.id + 11, this.p.x + size, this.p.y + size),
                this.zIndex
            ),
            new Rectangle(
                `${this.name}-back`,
                this.id + 20,
                new Point(`${this.name}-leftDownBack`, this.id + 20, this.p.x + size / 2, this.p.y + size / 2),
                new Point(`${this.name}-rightTopBack`, this.id + 21, this.p.x + size / 2 + size, this.p.y + size / 2 + size),
                this.zIndex
            )
        ];

        this.vectors = [
            new Vector(
                `${this.name}-lefTop`,
                this.id + 10,
                new Point(`${this.name}-leftTopFront`, this.id + 10, this.p.x, this.p.y + size),
                new Point(`${this.name}-leftTopBack`, this.id + 21, this.p.x + size / 2, this.p.y + size / 2 + size),
                Math.max(0, this.zIndex - 7)
            ),
            new Vector(
                `${this.name}-rightTop`,
                this.id + 20,
                new Point(`${this.name}-rightTopFront`, this.id + 11, this.p.x + size, this.p.y + size),
                new Point(`${this.name}-rightTopBack`, this.id + 20, this.p.x + size / 2 + size, this.p.y + size / 2 + size),
                Math.max(0, this.zIndex - 7)
            ),
            new Vector(
                `${this.name}-leftDown`,
                this.id + 30,
                new Point(`${this.name}-leftDownFront`, this.id + 10, this.p.x, this.p.y),
                new Point(`${this.name}-leftDownBack`, this.id + 20, this.p.x + size / 2, this.p.y + size / 2),
                Math.max(0, this.zIndex - 7)
            ),
            new Vector(
                `${this.name}-rightDown`,
                this.id + 40,
                new Point(`${this.name}-rightDownFront`, this.id + 11, this.p.x + size, this.p.y),
                new Point(`${this.name}-rightDownBack`, this.id + 20, this.p.x + size / 2 + size, this.p.y + size / 2),
                Math.max(0, this.zIndex - 7)
            )
        ];

        this.boundary = this.calculateBoundary();

    }

    public shift(x: number, y: number): void {
        // Shift cube by shifting all its vectors and rectangles
        [...this.vectors, ...this.rectangles].forEach(v => v.shift(x, y));

        // Recalculate boundary
        this.boundary = this.calculateBoundary();
    }

    public rotate(p: Point, rad: number): void {
        // Rotate cube by rotating all its vectors and rectangles
        [...this.vectors, ...this.rectangles].forEach(v => v.rotate(p, rad));

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
        // Check if point is present in any of the rectangles or vectors
        // by reducing them to a single value
        const res = [...this.vectors, ...this.rectangles].reduce((acc, v) => {
            if (v.isPresent(x, y).present) {
                // Only override if current zIndex is higher than the previous one
                if (v.zIndex >= acc.zIndex) {
                    return { present: true, zIndex: v.zIndex };
                }
            }
            return acc;
        }, { present: false, zIndex: 0 });
        return res;
    }

    private calculateBoundary(): Boundary {
        // Calculate boundary of the cube by finding the minimum and maximum x and y values of all its vectors and rectangles
        const boundaries: Boundary[] = this.vectors.map(v => v.boundary);

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
}

export default Cube;