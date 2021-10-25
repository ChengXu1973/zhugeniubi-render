import { BaseMeterial } from "../material/base-material";
import { Ray } from "../math/ray";
import { IntersectResult } from "../utils/intersect-result";

export abstract class BaseGeometry {

    public static hitMulti(ray: Ray, objects: BaseGeometry[]) {
        const records = objects.map(n => n.hit(ray));
        const hits = records.filter(r => !Object.is(r, IntersectResult.NONE));
        if (hits.length === 0) {
            return IntersectResult.NONE;
        }
        return hits.sort((a, b) => {
            return a.distance - b.distance;
        })[0];
    }

    public abstract clone(): BaseGeometry;

    public abstract hit(ray: Ray): IntersectResult;

    public meterial: BaseMeterial;

}