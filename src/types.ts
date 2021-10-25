import { BaseGeometry } from "./geometry/base-geometry";
import { BaseLight } from "./light/base-light";
import type { Vec3 } from "./math/vec3";
import type { FrameBuffer } from "./utils/frame-buffer";
import type { PerspectiveCamera } from "./utils/perspective-camera";

export type IStrMap = Record<string, any>;

export interface IEmpty { };

export interface IScene {
    camera?: PerspectiveCamera;
    nodes?: BaseGeometry[];
    light?: BaseLight;
}

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

export interface IDepthOutput {
    depth: FrameBuffer;
};

export interface INormalOutput {
    normal: FrameBuffer;
};
export interface IShadeOutput {
    shaded: FrameBuffer;
}

export type IPreTestResult = IDepthOutput & INormalOutput & IShadeOutput;