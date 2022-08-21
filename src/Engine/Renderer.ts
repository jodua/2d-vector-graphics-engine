import Point from "../Entity/Point";
import Entity from "../Entity/Entity";
import Scene from "./Scene";

interface RendererSettings {
    readonly outputType: string;
    readonly output: any;
    readonly width: number;
    readonly height: number;
    readonly center: Point;
    readonly fps: number;
}

interface Output {
    write(text: string): void;
}

class Renderer {

    private output: Output;
    private currentFrame: number = 0;
    private plane: string[][] = [];
    private interval: NodeJS.Timeout | undefined;

    constructor(
        private readonly scene: Scene,
        private readonly settings: RendererSettings,
    ) {
        this.output = settings.output;
    }

    private draw(): void {
        // Check output type
        if (this.settings.outputType === "stdout") {
            // If stdout, draw to stdout

            // Send cursor to cursor home position
            this.output.write("\x1B[H");

            // Draw header
            this.drawStdoutHeader();

            // Draw scene
            this.drawToStdout();
        }
    }

    public drawLoop(): void {
        // Draw loop
        this.interval = setInterval(() => {
            this.scene.update();
            this.draw();
        }, 1000 / this.settings.fps);
    }

    public stop(): void {
        clearInterval(this.interval);
    }

    private drawToStdout(): void {
        // Draw to stdout

        // Get scene entities
        const sceneData: { entities: Entity[] } = this.scene.getData();

        // Calculate drawing offset based on center
        // x offset is divided by 4 because each drawn character is 2 characters wide
        const xOffset: number = this.settings.center.x - (this.settings.width / 4);
        const yOffset: number = this.settings.center.y - (this.settings.height / 2);

        // Fill plane with empty strings
        for (let i = 0; i < this.settings.height; i++) {
            this.plane[i] = [];
            for (let j = 0; j < this.settings.width / 2; j++) {
                this.plane[i][j] = "  ";
            }
        }

        // Sort entities by z-index in order to draw them in correct order
        const sortedEntities = sceneData.entities.sort(
            (a, b) => a.zIndex - b.zIndex
        );

        // Iterate through sorted entities and draw them to plane
        for (const entity of sortedEntities) {

            // Get entity data
            const entityData = entity.getData();

            // Iterate over points in entity boundary
            for (let i = entityData.boundary.p1.y; i <= entityData.boundary.p2.y; i++) {
                for (let j = entityData.boundary.p1.x; j <= entityData.boundary.p2.x; j++) {

                    // Check if given cooridnate is on screen
                    if (
                        i - yOffset >= 0
                        && i - yOffset < this.settings.height
                        && j - xOffset >= 0
                        && j - xOffset < this.settings.width / 2
                    ) {

                        // Check if entity is present at given coordinate
                        const isPresent = entity.isPresent(j, i);

                        if (isPresent.present) {
                            // Get fill sign based on z-index
                            const fillSign = this.getFillSign(isPresent.zIndex);

                            // Draw fill sign to plane
                            this.plane[i - yOffset][j - xOffset] = fillSign + fillSign;
                        }
                    }
                }
            }
        }

        // Draw center point
        this.plane[this.settings.height / 2][this.settings.width / 4] = "..";

        // Draw plane to stdout
        for (let i = this.settings.height - 1; i > 0; i--) {
            this.output.write(this.plane[i].join("") + "\n");
        }
    }

    private getFillSign(zIndex: number): string {
        // Get fill sign based on z-index
        const fillSigns: string[] = [".", ",", "-", "~", ":", ";", "=", "!", "*", "#", "$", "@"];
        if (zIndex < fillSigns.length) {
            return fillSigns[zIndex];
        } else {
            return fillSigns[fillSigns.length];
        }
    }

    private drawStdoutHeader(): void {
        this.output.write(
            `Width: ${this.settings.width} \
            Height: ${this.settings.height} \
            FPS: ${this.settings.fps} \
            Frame: ${this.currentFrame++}\n`
        );
    }

}

export default Renderer;
export { RendererSettings };