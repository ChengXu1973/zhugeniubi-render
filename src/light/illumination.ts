import { Vec3 } from "../math/vec3";

export class Illumination {

    public constructor(color: Vec3, direction: Vec3) {
        this.color = color.clone();
        this.direction = direction.normalize();
    }

    public color: Vec3;

    public direction: Vec3;
}