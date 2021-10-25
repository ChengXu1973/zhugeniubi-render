import { BaseGeometry } from "../geometry/base-geometry";
import { Vec3 } from "../math/vec3";

export class IntersectResult {

    public target: BaseGeometry = null;
    public distance: number = 0;
    public hitPoint: Vec3 = Vec3.zero;
    public normal: Vec3 = Vec3.zero;

    public static readonly NONE = new IntersectResult();

}