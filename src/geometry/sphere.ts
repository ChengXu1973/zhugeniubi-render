import { Ray } from "../math/ray";
import { Vec3 } from "../math/vec3";
import { IntersectResult } from "../utils/intersect-result";
import { BaseGeometry } from "./base-geometry";

export class Sphere extends BaseGeometry {

    public constructor(center: Vec3, radius: number) {
        super();
        this.center = center.clone();
        this.radius = radius;
    }

    public center: Vec3;

    public radius: number;

    public get sqrRadius() {
        return this.radius * this.radius;
    }

    public clone() {
        return new Sphere(this.center, this.radius);
    }

    public hit(ray: Ray): IntersectResult {
        const v = ray.origin.subtract(this.center);
        const a0 = v.sqrLength - this.sqrRadius;
        const DdotV = ray.direction.dot(v);

        if (DdotV <= 0) {
            const discr = DdotV * DdotV - a0;
            if (discr >= 0) {
                const result = new IntersectResult();
                result.target = this;
                result.distance = -DdotV - Math.sqrt(discr);
                result.hitPoint = ray.at(result.distance);
                result.normal = result.hitPoint.subtract(this.center).normalize();
                return result;
            }
        }

        return IntersectResult.NONE;
    }
}