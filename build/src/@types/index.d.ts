export class ZeewCanvas {

    constructor(width: number, height: number) 

    public registerFont(path: string, fontFace: { family: string, weight?: string, style?: string}): this

    public setBackground(opts: {
        image?: {
            path: string,
            opacity?: number,
             vertical?: boolean,
            horizontal?: boolean
        },
        color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
        radial?: number | { tl: number, tr: number, br: number, bl: number }
    }) : Promise<this>
    public addText(text: string, x: number, y: number, opts: { 
        size?: number, color?: string, rotate?: number, font?: string, align?: string, 
        stroke?: { color: string, width: number }, 
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number }, 
        linea?: { widthLimit: number, height: number }, 
        maxWidth?: number }) : this
    public buildImage(): Buffer
}