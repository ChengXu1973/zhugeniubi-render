import { IStrMap } from "../types";

export class BasePass<T extends IStrMap, K extends IStrMap> {
    public constructor(param: T) {
        this.input = param;
    }

    protected _output: K;
    public get output(): K {
        return this._output;
    }

    public readonly input: T;

    public process() { }
}