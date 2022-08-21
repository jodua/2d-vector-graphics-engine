interface PointData {
    name: string;
    id: number;
    x: number;
    y: number;
}


class Point {

    constructor(
        public readonly name: string,
        public readonly id: number,
        public x: number,
        public y: number,
    ) {
    }

    public shift(x: number, y: number): void {
        // Shift point by x and y
        this.x += x;
        this.y += y;
    }

    public rotate(p: Point, rad: number): void {
        // Rotate point around point p by rad radians
        const x = this.x - p.x;
        const y = this.y - p.y;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        this.x = x * cos - y * sin + p.x;
        this.y = x * sin + y * cos + p.y;
    }

    public getData(): PointData {
        return {
            name: this.name,
            id: this.id,
            x: this.x,
            y: this.y,
        };
    }

}

export default Point;