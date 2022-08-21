import Cube from "../Entity/Cube";
import Point from "../Entity/Point";
import Animation from "./Animation";

class CubeRotation extends Animation<Cube> {
    // Pseudo 3d cube rotation

    public active: boolean = false;

    constructor(
        name: string,
        id: number,
        objects: Cube[],
        public rad: number
    ) {
        super(name, id, objects);
    }

    public start(): void {
        this.active = true;
    }

    public stop(): void {
        this.active = false;
    }

    public update(): void {
        // The 3d effect is achieved by rotating rectangles around their center
        // and vectors around cube center but in order to maintain the orientation
        // of the vectors, vectors are also rotated by their "lower" point
        // with a negative angle

        if (this.active) {
            this.objects.forEach(cube => {
                const cubeCenter = new Point(
                    `${cube.name}-center`,
                    1,
                    cube.p.x + cube.size / 2,
                    cube.p.y + cube.size / 2
                );

                cube.vectors
                    .forEach(v => {
                        v.rotate(
                            cubeCenter,
                            this.rad
                        )

                        v.rotate(
                            v.p,
                            -this.rad
                        )
                    });

                cube.rectangles
                    .forEach(r => r.rotate(
                        new Point(
                            "rect-center",
                            0,
                            r.p.x + cube.size / 2,
                            r.p.y + cube.size / 2
                        ),
                        this.rad
                    ));

                // Update boundaries 
                cube.rotate(cube.p, 0)

            });
        }
    }
}

export default CubeRotation;