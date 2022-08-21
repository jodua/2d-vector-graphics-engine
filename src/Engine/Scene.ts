import Animation from "../Animation/Animation";
import Entity from "../Entity/Entity";

class Scene {

    public animations: Animation<Entity>[] = [];
    public entities: Entity[] = [];

    constructor(
        public name: string,
    ) {

    }

    public update(): void {
        this.animations.forEach(a => a.update());
    }

    public addEntity(entities: Entity | Entity[]): void {
        // Add entities to scene
        if (Array.isArray(entities)) {
            this.entities = this.entities.concat(entities);
        } else {
            this.entities.push(entities);
        }
    }

    public removeEntity(entityIds: number | number[]): void {
        // Remove entities from scene
        if (Array.isArray(entityIds)) {
            this.entities = this.entities.filter(a => !entityIds.includes(a.id));
        } else {
            this.entities = this.entities.filter(a => a.id !== entityIds);
        }
    }

    public addAnimation(animations: Animation<Entity> | Animation<Entity>[]): void {
        // Add animations to scene
        if (Array.isArray(animations)) {
            this.animations = this.animations.concat(animations);
        } else {
            this.animations.push(animations);
        }
    }

    public removeAnimation(animationIds: number | number[]): void {
        // Remove animations from scene
        if (Array.isArray(animationIds)) {
            this.animations = this.animations.filter(a => !animationIds.includes(a.id));
        } else {
            this.animations = this.animations.filter(a => a.id !== animationIds);
        }
    }

    public startAllAnimations(): void {
        // Start all animations in scene
        this.animations.forEach(a => a.start());
    }

    public startAnimation(animationIds: number | number[]): void {
        // Start animations in scene
        if (Array.isArray(animationIds)) {
            this.animations
                .filter(a => animationIds.includes(a.id))
                .forEach(a => a.start());
        } else {
            this.animations
                .filter(a => a.id === animationIds)
                .forEach(a => a.start());
        }
    }

    public getData(): { entities: Entity[] } {
        // Get scene data
        return {
            entities: this.entities
        };
    }
}

export default Scene;