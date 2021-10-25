import type { FrameBuffer } from "./src/utils/frame-buffer";

export type IStrMap = Record<string, any>;

export interface IEmpty { };

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