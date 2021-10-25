import { BaseGeometry } from "../../geometry/base-geometry";
import { Vec3 } from "../../math/vec3";
import { IDepthOutput, IScene } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IntersectResult } from "../../utils/intersect-result";
import { BasePass } from "../base-pass";

export class DepthPass extends BasePass<IScene, IDepthOutput> {

    public process() {
        const depth = new FrameBuffer();
        const { camera, nodes } = this.input;
        const { width, height } = depth;

        depth.walk((x, y) => {
            const ray = camera.generateRay(x, y, width, height);
            const hitResult = BaseGeometry.hitMulti(ray, nodes);

            if (Object.is(hitResult, IntersectResult.NONE)) {
                return new Vec3(0, 0, 0);
            }

            const { distance } = hitResult;

            const [min, max] = [camera.near, camera.far];

            if (distance > max) {
                return new Vec3(0, 0, 0);
            }
            if (distance < min) {
                return new Vec3(1, 1, 1);
            }
            const r = 1 - (distance - min) / (max - min);
            return new Vec3(r, r, r);
        });
        this._output = { depth };
    }

}
