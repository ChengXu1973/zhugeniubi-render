import { IGrayInput, IGrayOutput } from "../../../types";
import { Vec3 } from "../../math/vec3";
import { FrameBuffer } from "../../utils/frame-buffer";
import { BasePass } from "../base-pass";

export class GrayPass extends BasePass<IGrayInput, IGrayOutput> {

    public process() {
        const { grayInput } = this.input;
        const grayOutput = new FrameBuffer(grayInput.width, grayInput.height);

        grayOutput.walk((x, y) => {
            const pixel = grayInput.pixel(x, y);
            const gray = pixel.x * 0.3 + pixel.y * 0.59 + pixel.z * 0.11;
            return new Vec3(gray, gray, gray);
        })

        this._output = { grayOutput };
    }

}