import { IPreTestResult, IStrMap } from "../../types";
import { BaseFlow } from "../base-flow";
import { DepthPass } from "../pass/depth-pass";
import { NormalPass } from "../pass/normal-pass";
import { SSAAPass } from "../pass/ssaa-pass";

export class PreTestFlow extends BaseFlow<IPreTestResult> {

    protected passes = [
        DepthPass,
        NormalPass,
        // ShadePass,
        SSAAPass,
    ];

    protected convertInput(stage: number): IStrMap {
        return this.uniforms;
    }

}