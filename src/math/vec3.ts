export class Vec3 {

    public static get zero(): Vec3 {
        return new Vec3(0, 0, 0);
    }

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public x: number;
    public y: number;
    public z: number;

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public get sqrLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    public normalize() {
        const inv = 1 / this.length;
        return new Vec3(this.x * inv, this.y * inv, this.z * inv);
    }

    public negate() {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    public add(v: Vec3) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public subtract(v: Vec3) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public dot(v: Vec3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vec3) {
        return new Vec3(-this.z * v.y + this.y * v.z, this.z * v.x - this.x * v.z, -this.y * v.x + this.x * v.y);
    }

    public modulate(v: Vec3) {
        return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    public multiply(n: number) {
        return new Vec3(this.x * n, this.y * n, this.z * n);
    }

    public divide(n: number) {
        const invf = 1 / n;
        return new Vec3(this.x * invf, this.y * invf, this.z * invf);
    }

}