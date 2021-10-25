import { Illumination } from "../light/illumination";
import { Ray } from "../math/ray";
import { Vec3 } from "../math/vec3";
import { BaseMeterial } from "./base-material";

export class UnlitMaterial extends BaseMeterial {

    public constructor(color: Vec3) {
        super();
        this.color = color;
    }

    public readonly color: Vec3;

    public shade(ray: Ray, light: Illumination, position: Vec3, normal: Vec3): Vec3 {
        return this.color;
    }

}