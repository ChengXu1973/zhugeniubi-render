import { BaseGeometry } from "../geometry/base-geometry";
import { Sphere } from "../geometry/sphere";
import { BaseLight } from "../light/base-light";
import { PointLight } from "../light/point-light";
import { UnlitMaterial } from "../material/unlit-material";
import { Vec3 } from "../math/vec3";
import { IScene } from "../types";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "../utils/macros";
import { PerspectiveCamera } from "../utils/perspective-camera";

export class BaseScene implements IScene {

    public constructor() {
        this.camera = new PerspectiveCamera({
            origin: new Vec3(0, 0, 0),
            front: new Vec3(0, 0, -1),
            refUp: new Vec3(0, 1, 0),
            fovY: 120,
            aspect: IMAGE_WIDTH / IMAGE_HEIGHT,
            near: 1,
            far: 20,
        });
        const ball1 = new Sphere(new Vec3(-3, 0, -5), 1);
        const ball2 = new Sphere(new Vec3(1, 0, -2.5), 1);
        const ball3 = new Sphere(new Vec3(0, -100, -5), 100 - 1);

        ball1.meterial = new UnlitMaterial(new Vec3(0.271, 0.22, 0.196));
        ball2.meterial = new UnlitMaterial(new Vec3(0.325, 0.369, 0.478));
        ball3.meterial = new UnlitMaterial(new Vec3(0.682, 0.498, 0.427));

        this.nodes = [ball1, ball2, ball3];

        this.light = new PointLight(
            new Vec3(-100, 100, 100),
            new Vec3(1, 1, 1),
            distance => 1,
        );
    }

    public camera: PerspectiveCamera;

    public nodes: BaseGeometry[];

    public light: BaseLight;
}