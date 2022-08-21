# Animation abstract class

```ts
abstract class Animation<T extends Entity> {
    abstract start(): void;
    abstract stop(): void;
    abstract update(): void;

    constructor(
        public name: string,
        public id: number,
        public objects: T[]
    ) { }
}
```

## Definition

```ts
start(): void
```

Method that start the animation

```ts
stop(): void
```

Method that stop the animation

```ts
update(): void
```

Main animation method that will be run at every rerender.