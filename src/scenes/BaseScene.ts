import { BaseGeometry } from "../geometry/base-geometry";
import { Sphere } from "../geometry/sphere";
import { Vec3 } from "../math/vec3";
import { IScene } from "../types";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "../utils/macros";
import { PerspectiveCamera } from "../utils/perspective-camera";

export class BaseScene implements IScene {

    public camera: PerspectiveCamera = new PerspectiveCamera({
        origin: new Vec3(0, 0, 0),
        front: new Vec3(0, 0, -1),
        refUp: new Vec3(0, 1, 0),
        fovY: 120,
        aspect: IMAGE_WIDTH / IMAGE_HEIGHT,
        near: 1,
        far: 20,
    });

    public nodes: BaseGeometry[] = [
        new Sphere(new Vec3(-3, 0, -5), 1),
        new Sphere(new Vec3(1, 0, -2.5), 1),
        new Sphere(new Vec3(0, -100, -5), 100 - 1),
    ];

}