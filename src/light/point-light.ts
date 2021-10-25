
import { Vec3 } from "../math/vec3";
import { BaseLight } from "./base-light";
import { Illumination } from "./illumination";

export class PointLight extends BaseLight {

    public constructor(position: Vec3, color: Vec3, decay: (distance: number) => number) {
        super();
        this.position = position.clone();
        this.color = color.clone();
        this.decay = decay;
    }

    public position: Vec3;
    public color: Vec3;

    private decay: (distance: number) => number;

    public at(point: Vec3): Illumination {
        const dir = point.subtract(this.position);
        const decay = this.decay(dir.length);
        return new Illumination(this.color.multiply(decay), dir.normalize());
    }
}