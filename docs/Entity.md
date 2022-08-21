# Entity abstract class

## Entity class

```ts
abstract class Entity {
    abstract shift(x: number, y: number): void;
    abstract rotate(p: Point, rad: number): void;
    abstract getData(): EntityData;
    abstract isPresent(x: number, y: number): {
        present: boolean;
        zIndex: number
    }

    constructor(
        public readonly name: string,
        public readonly id: number,
        public zIndex: number
    ) { }
}
```

## Definition

```ts
shift(x: number, y: number): void
```

Shift the entity by x horizontally and y vertically.

```ts
rotate(p: Point, rad: number): void
```

Rotate the entity around the point p by rad radians.

```ts
getData(): EntityData
```

Get the data about entity:

- object name
- object id
- boundaries of object

```ts
isPresent(x: number, y: number): {
        present: boolean;
        zIndex: number
    }
```

Function that checks if object is present at given coordinates

If it is present, return **true** and object **zIndex**

Else, return **false** and **-1**