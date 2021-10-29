import { BaseGeometry } from "../../geometry/base-geometry";
import { Ray } from "../../math/ray";
import { Vec3 } from "../../math/vec3";
import { IScene, IShadeOutput } from "../../types";
import { FrameBuffer } from "../../utils/frame-buffer";
import { IntersectResult } from "../../utils/intersect-result";
import { DRT_RAYS_COUNT, MAX_DIFFUSE_RATE, MAX_REFLECT_TIME } from "../../utils/macros";
import { BasePass } from "../base-pass";

export class ShadePass extends BasePass<IScene, IShadeOutput> {

    public process() {
        const shaded = new FrameBuffer();
        const { camera } = this.input;
        const { width, height } = shaded;

        shaded.walk((x, y) => {
            const ray = camera.generateRay(x, y, width, height);
            return this.rayTrace(0, ray);
        });
        this._output = { shaded };
    }

    public rayTrace(reflectTime: number, ray: Ray): Vec3 {
        const { nodes, light } = this.input;
        const hitResult = BaseGeometry.hitMulti(ray, nodes);

        if (Object.is(hitResult, IntersectResult.NONE)) {
            return new Vec3(0.89, 0.882, 0.831);
        }

        const material = hitResult.target.meterial;
        const { normal, hitPoint } = hitResult;

        const color = material.shade(
            ray,
            this.getIllumination(hitPoint),
            hitPoint,
            normal.normalize()
        );

        if (reflectTime >= MAX_REFLECT_TIME) {
            return color;
        }
        const reflcetivity = hitResult.target.meterial.reflcetivity;
        if (!reflcetivity) {
            return color;
        }
        const reflectColor = this.getReflectColor(hitResult, ray, reflectTime + 1);
        return color.multiply(1 - reflcetivity).add(reflectColor.multiply(reflcetivity));
    }

    private getReflectColor(hitResult: IntersectResult, ray: Ray, reflectTime: number) {
        const roughness = hitResult.target.meterial.roughness;

        const reflectDir = hitResult.normal.multiply(
            -2 * hitResult.normal.dot(ray.direction)
        ).add(ray.direction);

        if (!roughness) {
            const reflectColor = this.rayTrace(reflectTime, new Ray(hitResult.hitPoint, reflectDir));
            return reflectColor;
        }

        const len = Math.random() * roughness * MAX_DIFFUSE_RATE;
        let color = Vec3.zero;
        for (let i = 0; i < DRT_RAYS_COUNT; i++) {
            const dir = reflectDir.add(new Vec3(
                Math.random() * len,
                Math.random() * len,
                Math.random() * len,
            ));
            color = color.add(this.rayTrace(reflectTime, new Ray(hitResult.hitPoint, dir)));
        }
        return color.divide(DRT_RAYS_COUNT);

    }

    public getIllumination(position: Vec3) {
        const { nodes } = this.input;
        const light = this.input.light;

        let lightCount = 0;
        for (let i = 0; i < DRT_RAYS_COUNT; i++) {
            const pos = light.sample();
            const ray = new Ray(position, pos.subtract(position));
            const hitResult = BaseGeometry.hitMulti(ray, nodes);
            if (Object.is(hitResult, IntersectResult.NONE)) {
                lightCount++;
                continue;
            }
            if (hitResult.distance >= pos.subtract(position).length) {
                lightCount++;
                continue;
            }
        }

        const illuminate = light.at(position);
        illuminate.color = illuminate.color.multiply(lightCount / DRT_RAYS_COUNT);

        return illuminate;
    }

}