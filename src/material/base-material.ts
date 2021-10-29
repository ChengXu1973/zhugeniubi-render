import { Illumination } from "../light/illumination";
import { Ray } from "../math/ray";
import { Vec3 } from "../math/vec3";

export abstract class BaseMeterial {

    public abstract shade(ray: Ray, light: Illumination, position: Vec3, normal: Vec3): Vec3;

    public reflcetivity?: number;

    public roughness?: number;

}