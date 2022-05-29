// ZEEW.DEV
import { Canvas, CanvasRenderingContext2D} from "canvas";

export class ZeewCanvas {
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    constructor(width: number, height: number) 

    public registerFont(path: string, fontFace: { family: string, weight?: string, style?: string}): void;

    public setBackground(opts: {
        image?: {
            path: string,
            opacity?: number,
            vertical?: boolean,
            horizontal?: boolean
        },
        color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
        radial?: number | { tl: number, tr: number, br: number, bl: number }
    }) : Promise<void>;

    public addText(text: string, x: number, y: number, opts: {
        size?: number, 
        color?: string, 
        rotate?: number, 
        font?: string,
        align?: string, 
        maxWidth?: number,
        stroke?: { color: string, width?: number }, 
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number }, 
        linea?: { widthLimit: number, height: number }
    }): void;

    public addImage(path: string, x: number, y: number, width?: number, height?: number, opts?:{ 
        radial?: number | { tl: number, tr: number, br: number, bl: number },
        rotate?: number,
        opacity?: number,
        horizontal?: boolean,
        vertical?: boolean,
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number },
        stroke?: { color: string, width?: number }
    }): Promise<void>;

    public addImage(path: string, x: number, y: number, width?: number, height?: number, opts?:{ 
        circle?: boolean,
        rotate?: number,
        opacity?: number,
        horizontal?: boolean,
        vertical?: boolean,
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number },
        stroke?: { color: string, width?: number }
    }): Promise<void>;

    public fillRectangle(x: number, y: number, width: number, height: number, opts?: {
        color: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
        rotate?: number,
        opacity?: number,
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number },
        stroke?: { color: string, width: number },
        radial?: number | { tl: number, tr: number, br: number, bl: number }
    }): void;

    public buildImage(): Buffer;

    public _getCanvasData(): {canvas: Canvas, ctx: CanvasRenderingContext2D};
}