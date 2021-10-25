import { Illumination } from "../light/illumination";
import { Ray } from "../math/ray";
import { Vec3 } from "../math/vec3";
import { BaseMeterial } from "./base-material";

export class BlinnPhoneMaterial extends BaseMeterial {

    public constructor(diffuse: Vec3, specular: Vec3, p: number, ambient: Vec3) {
        super();
        this.diffuse = diffuse;
        this.specular = specular;
        this.p = p;
        this.ambient = ambient;
    }

    public readonly diffuse: Vec3;
    public readonly specular: Vec3;
    public readonly p: number;
    public readonly ambient: Vec3;

    public shade(ray: Ray, light: Illumination, position: Vec3, normal: Vec3): Vec3 {
        const NdotL = normal.normalize().dot(light.direction.negate());
        const diffuse = this.diffuse.multiply(Math.max(0, NdotL));

        const h = light.direction.add(ray.direction.normalize()).negate().normalize();
        const NdotH = normal.normalize().dot(h);
        const specular = this.specular.multiply(Math.pow(Math.max(0, NdotH), this.p));

        // return this.ambient;
        // return light.color.modulate(diffuse);
        // return light.color.modulate(specular);
        return this.ambient.add(light.color.modulate(diffuse.add(specular)));
    }

}