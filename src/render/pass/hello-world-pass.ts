import { Vec3 } from "../../math/vec3";
import { IEmpty, IHelloWorldOutput } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "../../utils/macros";
import { BasePass } from "../base-pass";

export class HelloWorldPass extends BasePass<IEmpty, IHelloWorldOutput> {

    public process() {
        const helloWorld = new FrameBuffer(IMAGE_WIDTH, IMAGE_HEIGHT);
        helloWorld.walk((x: number, y: number) => {
            const r = x / IMAGE_WIDTH;
            const g = y / IMAGE_HEIGHT;
            const b = 0.5;
            return new Vec3(r, g, b);
        });
        this._output = { helloWorld };
    }

}