import { IStrMap } from "../../types";
import { BasePass } from "./base-pass";

export abstract class BaseFlow<K extends IStrMap>{

    protected abstract passes: any[];

    protected abstract convertInput(stage: number): IStrMap;

    public uniforms: Partial<K>;

    public setUniforms(param: IStrMap) {
        this.uniforms = {
            ...(this.uniforms || {}),
            ...param,
        } as any;
    }

    public render(): K {
        let result: any = {};
        for (let i = 0; i < this.passes.length; i++) {
            const clazz = this.passes[i] as typeof BasePass;
            const input = this.convertInput(i);
            const stage = new clazz(input);
            stage.process();
            this.setUniforms(stage.output);
            result = {
                ...result,
                ...stage.output,
            }
        }
        return result;
    }
}