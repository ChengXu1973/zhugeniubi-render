
import { Vec3 } from "../math/vec3";
import { BaseLight } from "./base-light";
import { Illumination } from "./illumination";

export class PointLight extends BaseLight {

    public constructor(position: Vec3, color: Vec3, decay: (distance: number) => number, radius = 0) {
        super();
        this.position = position.clone();
        this.color = color.clone();
        this.decay = decay;
        this.radius = radius;
    }

    public position: Vec3;
    public color: Vec3;
    public radius: number;

    private decay: (distance: number) => number;

    public at(point: Vec3): Illumination {
        const dir = point.subtract(this.position);
        const decay = this.decay(dir.length);
        return new Illumination(this.color.multiply(decay), dir.normalize());
    }

    public sample(): Vec3 {
        return this.position.add(
            new Vec3(
                Math.random(),
                Math.random(),
                Math.random(),
            ).normalize().multiply(this.radius)
        );
    }
}