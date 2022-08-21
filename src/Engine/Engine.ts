import Renderer, { RendererSettings } from "./Renderer";
import Scene from "./Scene";

class Engine {

    private scene: Scene;
    private renderer: Renderer;

    constructor(public rendererSettings: RendererSettings) {
        this.scene = new Scene("Default");
        this.renderer = new Renderer(this.scene, this.rendererSettings);
    }

    public start(): void {
        this.renderer.drawLoop();
    }

    public stop(): void {
        this.renderer.stop();
    }

    public getScene(): Scene {
        return this.scene;
    }

}

export default Engine;