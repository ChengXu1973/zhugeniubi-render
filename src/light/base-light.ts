import { Vec3 } from "../math/vec3";
import { Illumination } from "./illumination";

export abstract class BaseLight {

    public abstract at(position: Vec3): Illumination;

}