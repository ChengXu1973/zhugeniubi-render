import { IPreTestResult, IStrMap } from "../../types";
import { BaseFlow } from "../base-flow";
import { SSAAPass } from "../pass/ssaa-pass";

export class PreTestFlow extends BaseFlow<IPreTestResult> {

    protected passes = [
        // DepthPass,
        // NormalPass,
        // ShadePass,
        SSAAPass,
    ];

    protected convertInput(stage: number): IStrMap {
        return this.uniforms;
    }

}