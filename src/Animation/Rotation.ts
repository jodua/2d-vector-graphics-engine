import Entity from "../Entity/Entity";
import Point from "../Entity/Point";
import Animation from "./Animation";

class Rotation extends Animation<Entity> {
    // Animation rotation object
    // If set to active, rotates every object in the objects array
    // by rad radians around the point p

    public active: boolean = false;

    constructor(
        name: string,
        id: number,
        objects: Entity[],
        public p: Point,
        public rad: number,
    ) {
        super(name, id, objects);
    }

    public update(): void {
        if (this.active) {
            this.objects.forEach(o => o.rotate(this.p, this.rad));
        }
    }

    public start(): void {
        this.active = true;
    }

    public stop(): void {
        this.active = false;
    }
}

export default Rotation;