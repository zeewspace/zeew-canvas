// ZEEW.DEV
import { Canvas, CanvasRenderingContext2D} from "canvas";

interface BACKGROUNDOPTS {
    image?: {
        path: string,
        opacity?: number,
        vertical?: boolean,
        horizontal?: boolean
    },
    color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
    radial?: number | { tl: number, tr: number, br: number, bl: number }
}

interface TEXTOPTS {
    size?: number, 
    color?: string, 
    rotate?: number, 
    font?: string,
    align?: string, 
    maxWidth?: number,
    stroke?: { color: string, width: number }, 
    shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number }, 
    linea?: { widthLimit: number, height: number }
}

interface IMAGEOPTS {
    radial?: number | { tl: number, tr: number, br: number, bl: number },
    circle?: boolean,
    rotate?: number,
    opacity?: number,
    horizontal?: boolean,
    vertical?: boolean,
    shadow?: { color: string, blur: number, offsetX: number, offsetY: number },
    stroke?: { color: string, width: number }
}
export class ZeewCanvas {
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    constructor(width: number, height: number) 

    public registerFont(path: string, fontFace: { family: string, weight?: string, style?: string}): void;

    public setBackground(opts: BACKGROUNDOPTS) : Promise<void>;

    public addText(text: string, x: number, y: number, opts: TEXTOPTS): void;

    public addImage(path: string, x: number, y: number, width?: number, height?: number, opts?: IMAGEOPTS): Promise<void>;

    public buildImage(): Buffer;

    public _getCanvasData(): {canvas: Canvas, ctx: CanvasRenderingContext2D};
}