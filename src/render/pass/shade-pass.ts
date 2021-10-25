import { BaseGeometry } from "../../geometry/base-geometry";
import { BaseLight } from "../../light/base-light";
import { Ray } from "../../math/ray";
import { Vec3 } from "../../math/vec3";
import { IScene, IShadeOutput } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IntersectResult } from "../../utils/intersect-result";
import { MAX_REFLECT_TIME } from "../../utils/macros";
import { BasePass } from "../base-pass";

export class ShadePass extends BasePass<IScene, IShadeOutput> {

    public process() {
        const shaded = new FrameBuffer();
        const { camera, nodes, light } = this.input;
        const { width, height } = shaded;

        shaded.walk((x, y) => {
            const ray = camera.generateRay(x, y, width, height);
            return this.rayTrace(0, ray);
        });
        this._output = { shaded };
    }

    public rayTrace(reflectTime: number, ray: Ray): Vec3 {
        const { nodes, light } = this.input;
        const hitResult = BaseGeometry.hitMulti(ray, nodes);

        if (Object.is(hitResult, IntersectResult.NONE)) {
            return new Vec3(0.89, 0.882, 0.831);
        }

        const material = hitResult.target.meterial;
        const { normal, hitPoint } = hitResult;

        const color = material.shade(
            ray,
            light.at(hitPoint),
            hitPoint,
            normal.normalize()
        );

        if (reflectTime >= MAX_REFLECT_TIME) {
            return color;
        }
        const reflcetivity = hitResult.target.meterial.reflcetivity;
        if (!reflcetivity) {
            return color;
        }
        const reflectDir = hitResult.normal.multiply(
            -2 * hitResult.normal.dot(ray.direction)
        ).add(ray.direction);

        const reflectColor = this.rayTrace(reflectTime + 1, new Ray(hitResult.hitPoint, reflectDir));
        return color.multiply(1 - reflcetivity).add(reflectColor.multiply(reflcetivity));
    }

}