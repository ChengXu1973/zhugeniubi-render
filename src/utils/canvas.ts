export class Canvas {
    public static readonly MIN_WIDTH: number = 400;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this._createElement();
    }

    public readonly width: number;
    public readonly height: number;

    private _canvas: HTMLCanvasElement;
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private _context: CanvasRenderingContext2D;
    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    public render(pixels: Float32Array) {
        pixels.forEach((v, i) => {
            this._image.data[i] = ~~(255.999 * v);
        });
        this.context.putImageData(this._image, 0, 0);
    }

    private _image: ImageData;

    private _createElement() {
        this._canvas = document.createElement("canvas");
        // 设置画布内容宽高
        this._canvas.setAttribute("width", this.width.toString());
        this._canvas.setAttribute("height", this.height.toString());
        // 设置画布显示宽高
        const minW = Math.max(Canvas.MIN_WIDTH, this.width);
        const ratio = minW / this.width;
        this._canvas.style.width = `${ratio * this.width}px`;
        this._canvas.style.height = `${ratio * this.height}px`;
        // 关闭抗锯齿
        this._canvas.style.imageRendering = "pixelated";
        // 获取绘图上下文
        this._context = this._canvas.getContext("2d");
        this._image = this._context.getImageData(0, 0, this.width, this.height);
    }
}