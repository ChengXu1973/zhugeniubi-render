import { IGrayInput, IHelloWorldFlowResult, IStrMap } from "../../../types";
import { BaseFlow } from "../base-flow";
import { GrayPass } from "../pass/gray-pass";
import { HelloWorldPass } from "../pass/hello-world-pass";

export class HelloWorldFlow extends BaseFlow<IHelloWorldFlowResult> {

    protected passes = [
        HelloWorldPass,
        GrayPass,
    ];

    protected convertInput(stage: number): IStrMap {
        if (stage === 1) {
            const input: IGrayInput = {
                grayInput: this.uniforms.helloWorld
            };
            return input;
        }
        return this.uniforms;
    }

}