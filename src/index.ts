import { PreTestFlow } from "./render/flow/pretest-flow";
import { BaseScene } from "./scenes/BaseScene";
import { Canvas } from "./utils/canvas";
import { FrameBuffer } from "./utils/frame-buffer";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./utils/macros";

function main() {
    const preTest = new PreTestFlow();
    const scene = new BaseScene();
    preTest.setUniforms(scene);
    const testResult = preTest.render();
    renderImage(testResult.depth);
    renderImage(testResult.normal);
}

function renderImage(fb: FrameBuffer) {
    const canvas = new Canvas(IMAGE_WIDTH, IMAGE_HEIGHT);
    document.body.appendChild(canvas.canvas);
    canvas.render(fb.data);
}

main();