import { Vec3 } from "./math/vec3";
import { Canvas } from "./utils/canvas";
import { FrameBuffer } from "./utils/frame-buffer";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./utils/macros";

const canvas = new Canvas(IMAGE_WIDTH, IMAGE_HEIGHT);
document.body.appendChild(canvas.canvas);

const image = new FrameBuffer(IMAGE_WIDTH, IMAGE_HEIGHT);

image.walk((x: number, y: number) => {
    const r = x / IMAGE_WIDTH;
    const g = y / IMAGE_HEIGHT;
    const b = 0.5;
    return new Vec3(r, g, b);
});

canvas.render(image.data);