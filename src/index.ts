import { HelloWorldFlow } from "./render/flow/hello-world-flow";
import { Canvas } from "./utils/canvas";
import { FrameBuffer } from "./utils/frame-buffer";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./utils/macros";

function main() {
    const helloWorld = new HelloWorldFlow();
    const result = helloWorld.render();
    renderImage(result.helloWorld);
    renderImage(result.grayOutput);
}

function renderImage(fb: FrameBuffer) {
    const canvas = new Canvas(IMAGE_WIDTH, IMAGE_HEIGHT);
    document.body.appendChild(canvas.canvas);
    canvas.render(fb.data);
}

main();