import CubeRotation from "./Animation/CubeRotation";
import Engine from "./Engine/Engine";
import Cube from "./Entity/Cube";
import Point from "./Entity/Point";

const main = async () => {

    const rendererSettings = {
        width: 100,
        height: 40,
        center: new Point("center", 1, 0, 0),
        fps: 60,
        outputType: "stdout",
        output: process.stdout,
    };

    const engine = new Engine(rendererSettings);

    const cube = new Cube(
        "cube",
        1,
        new Point("cube-center", 1, -15, -15),
        20,
        11
    );

    const cubeRotate = new CubeRotation(
        "cube-rotate",
        1,
        [cube],
        0.05
    )


    engine.getScene().addEntity(cube);

    engine.getScene().addAnimation(cubeRotate);

    engine.getScene().startAllAnimations();

    engine.start();

    setTimeout(() => {
        engine.stop();
    }, 5000);
}

main();