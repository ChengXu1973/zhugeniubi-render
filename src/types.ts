import type { Vec3 } from "./math/vec3";
import type { FrameBuffer } from "./utils/frame-buffer";

export type IStrMap = Record<string, any>;

export interface IEmpty { };

export interface IPerspectiveCameraParam {
    origin: Vec3;
    front: Vec3;
    refUp: Vec3;
    fovY: number;
    aspect: number;
    near: number;
    far: number;
}

export interface IGrayInput {
    grayInput: FrameBuffer;
}

export interface IGrayOutput {
    grayOutput: FrameBuffer;
}

export interface IHelloWorldOutput {
    helloWorld: FrameBuffer;
}

export type IHelloWorldFlowResult = IHelloWorldOutput & IGrayOutput;