import { Vec3 } from "./vec3";

export class Ray {

    public constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin.clone();
        this.direction = direction.normalize();
    }

    public origin: Vec3;

    public direction: Vec3;

    public at(t: number): Vec3 {
        return this.origin.add(this.direction.multiply(t));
    }

    public clone(): Ray {
        return new Ray(this.origin, this.direction);
    }

}