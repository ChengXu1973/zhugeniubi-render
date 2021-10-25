import { BaseGeometry } from "../../geometry/base-geometry";
import { Vec3 } from "../../math/vec3";
import { IScene, IShadeOutput } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IntersectResult } from "../../utils/intersect-result";
import { BasePass } from "../base-pass";

export class ShadePass extends BasePass<IScene, IShadeOutput> {

    public process() {
        const shaded = new FrameBuffer();
        const { camera, nodes, light } = this.input;
        const { width, height } = shaded;

        shaded.walk((x, y) => {
            const ray = camera.generateRay(x, y, width, height);
            const hitResult = BaseGeometry.hitMulti(ray, nodes);

            if (Object.is(hitResult, IntersectResult.NONE)) {
                return new Vec3(0.89, 0.882, 0.831);
            }

            const material = hitResult.target.meterial;
            const { normal, hitPoint } = hitResult;

            return material.shade(
                ray,
                light.at(hitPoint),
                hitPoint,
                normal.normalize()
            );
        });
        this._output = { shaded };
    }

}