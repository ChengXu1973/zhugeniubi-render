import { Vec3 } from "../math/vec3";
import { CHANNEL_COUNT, IMAGE_HEIGHT, IMAGE_WIDTH } from "./macros";

export class FrameBuffer {

    public constructor(width = IMAGE_WIDTH, height = IMAGE_HEIGHT) {
        this.width = width;
        this.height = height;
        this._data = new Float32Array(width * height * CHANNEL_COUNT);
    }

    private _data: Float32Array;
    public get data(): Float32Array {
        return this._data;
    }

    public readonly width: number;
    public readonly height: number;

    public walk(handler: (x: number, y: number) => Vec3) {
        let i = 0;
        for (let y = this.height - 1; y >= 0; y--) {
            for (let x = 0; x < this.width; x++) {
                const v = handler(x, y);

                this._data[i + 0] = v.x;
                this._data[i + 1] = v.y;
                this._data[i + 2] = v.z;
                this._data[i + 3] = 1;

                i += CHANNEL_COUNT;
            }
        }
    }

    public pixel(x: number, y: number): Vec3 {
        const i = CHANNEL_COUNT * (x + (this.height - 1 - y) * this.width);
        return new Vec3(
            this._data[i + 0],
            this._data[i + 1],
            this._data[i + 2],
        );
    }

}