import { IPreTestResult, IStrMap } from "../../types";
import { BaseFlow } from "../base-flow";
import { DepthPass } from "../pass/depth-pass";
import { NormalPass } from "../pass/normal-pass";

export class PreTestFlow extends BaseFlow<IPreTestResult> {

    protected passes = [
        DepthPass,
        NormalPass,
    ];

    protected convertInput(stage: number): IStrMap {
        return this.uniforms;
    }

}