import { Vec3 } from "../../math/vec3";
import { FrameBuffer } from "../../utils/frame-buffer";
import { SAMPLES_PER_PIXEL } from "../../utils/macros";
import { ShadePass } from "./shade-pass";

export class SSAAPass extends ShadePass {

    public process() {
        const shaded = new FrameBuffer();
        const { camera, nodes, light } = this.input;
        const { width, height } = shaded;

        shaded.walk((x, y) => {
            let color = Vec3.zero;

            const rays = camera.generateMultiRay(x, y, width, height);

            rays.forEach(ray => {
                color = color.add(this.rayTrace(0, ray));
            });

            return color.divide(SAMPLES_PER_PIXEL);
        });
        this._output = { shaded };
    }

}