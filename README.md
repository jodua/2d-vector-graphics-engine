# 2D-vector-graphics-engine

## Description

Simple 2d graphics engine based on drawing vectors.

Written in [TypeScript](https://www.typescriptlang.org/).

Every object update is synchronized with the screen refresh rate.

## Installation

```bash
git clone https://github.com/jodua/2d-vector-graphics-engine.git
cd 2d-vector-graphics-engine

yarn install
yarn build && yarn start
```

## Usage

### Creating engine

Create endigne with custom renderer settings:

```js
const rendererSettings = {
    width: 100,
    height: 40,
    center: new Point("center", 1, 0, 0),
    fps: 60,
    outputType: "stdout",
    output: process.stdout,
};

const engine = new Engine(rendererSettings);
```

Center point contains coordinates of the center of the screen.

Currently **only** stdout output is supported.

### Adding objects

Add objects to the engine:

```js
const v1 = new Vector(
    `vector-name`,
    1,
    new Point("A", 1, 2, 3),
    new Point("B", 2, 7, 10),
    5
),

engine.getScene().addEntity(v1);
```

### Starting engine

```js
engine.start();
```

### Adding animations

In order to add object animation use:

```js
const rotation = new Rotation(
    `rotation-animation`,
    2,
    v1,
    new Point("center", 1, 0, 0),
    Math.PI / 8,
)

engine.getScene().addAnimation(cubeRotate);

engine.getScene().startAllAnimations();
```

### Creating custom objects

In order to create custom objects you need to create class that extends `Entity` class.

More about [Entity class](./docs/Entity.md).

### Creating custom animations

In order to create custom animations you need to create class that extends `Animation` class.

More about [Animation class](./docs/Animation.md).

## Issues

Fill issues through issues tab on github.

## License

[MIT](https://opensource.org/licenses/MIT) license