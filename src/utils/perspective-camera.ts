import { Ray } from "../math/ray";
import { Vec3 } from "../math/vec3";
import { IPerspectiveCameraParam } from "../types";
import { SAMPLES_PER_PIXEL } from "./macros";

export class PerspectiveCamera {

    public constructor(param: IPerspectiveCameraParam) {
        this.origin = param.origin;
        this.front = param.front.normalize();
        this.refUp = param.refUp.normalize();
        this.fovY = param.fovY;
        this.aspect = param.aspect;
        this.near = param.near;
        this.far = param.far;
        this._init();
    }

    public origin: Vec3;
    public front: Vec3;
    public refUp: Vec3;
    public fovX: number;
    public fovY: number;
    public aspect: number;
    public near: number;
    public far: number;

    public up: Vec3;
    public right: Vec3;

    private _h: number;
    private _w: number;

    private _init() {
        this.right = this.front.cross(this.refUp).normalize();
        this.up = this.right.cross(this.front).normalize();
        this.fovX = 2 * Math.atan(this.aspect * Math.tan(this.fovY / 2));

        this._h = 2 * Math.atan(this.fovY * 0.5 * Math.PI / 180) * this.near;
        this._w = this.aspect * this._h;
    }

    public generateRay(x: number, y: number, width: number, height: number) {
        const u = (x + 0.5) / width;
        const v = (y + 0.5) / height;
        return new Ray(this.origin, this.origin
            .add(this.front.multiply(this.near))
            .add(this.right.multiply(this._w * (u - 0.5)))
            .add(this.up.multiply(this._h * (v - 0.5))));
    }

    public generateMultiRay(x: number, y: number, width: number, height: number) {
        const rays: Ray[] = [];
        for (let i = 0; i < SAMPLES_PER_PIXEL; i++) {
            const u = (x + Math.random()) / width;
            const v = (y + Math.random()) / height;
            rays.push(
                new Ray(this.origin, this.origin
                    .add(this.front.multiply(this.near))
                    .add(this.right.multiply(this._w * (u - 0.5)))
                    .add(this.up.multiply(this._h * (v - 0.5))))
            );
        }
        return rays;
    }

}