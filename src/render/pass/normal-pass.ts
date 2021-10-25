import { BaseGeometry } from "../../geometry/base-geometry";
import { Vec3 } from "../../math/vec3";
import { INormalOutput, IScene } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IntersectResult } from "../../utils/intersect-result";
import { BasePass } from "../base-pass";

export class NormalPass extends BasePass<IScene, INormalOutput> {

    public process() {
        const normal = new FrameBuffer();
        const { camera, nodes } = this.input;
        const { width, height } = normal;
        normal.walk((x, y) => {
            const ray = camera.generateRay(x, y, width, height);
            const hitResult = BaseGeometry.hitMulti(ray, nodes);

            if (Object.is(hitResult, IntersectResult.NONE)) {
                return new Vec3(1, 1, 1);
            } else {
                return hitResult.normal
                    .subtract(camera.front)
                    .add(new Vec3(1, 1, 1))
                    .multiply(0.5);
            }
        });
        this._output = { normal };
    }

}
