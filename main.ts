import {fillRectangle, jumpText, jumpStroke} from "./Resources/CanvasUtils";
import ZeewCanvasError from "./Resources/ZeewCanvasError"
import { Canvas, createCanvas, loadImage, registerFont, CanvasRenderingContext2D} from "canvas"
const checkColor = /^#([0-9A-F]{3}){1,2}$/i;

/**
 * @Class Maneja la API de Canvas de una manera más sencilla
 */
export class ZeewCanvas {
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    /**
     * 
     * @param width Ancho del lienzo
     * @param height Altura del lienzo
     */
    constructor(width: number, height: number) {
        if(!width || !height) 
            throw new ZeewCanvasError(`Te falta ingresar el valor del ${width ? "largo" : "ancho"} del lienzo`);
        if(isNaN(width) || isNaN(height))
            throw new ZeewCanvasError(`El valor del ${isNaN(width) ? "largo" : "ancho"} del lienzo no es un valor numérico`);
            
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * @param {string} path Ubicación de la fuente de letra.
     * @param {{ family: string, weight?: string, style?: string}} fontFace Opciones para la fuente de letra.
     */
    public registerFont(path: string, fontFace: { family: string, weight?: string, style?: string}) {
        registerFont(path, fontFace);
        return;
    }

    /**
     * @param {{
     *   image?: { path: string, opacity?: number, vertical?: boolean, horizontal?: boolean },
     *   color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
     *   radial?: number | { tl: number, tr: number, br: number, bl: number }
     * }} opts Opciones para el fondo de tu lienzo.
     */
    public async setBackground(opts: {
        image?: { path: string, opacity?: number, vertical?: boolean, horizontal?: boolean },
        color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
        radial?: number | { tl: number, tr: number, br: number, bl: number }
    }) {
        if(!opts)
            throw new ZeewCanvasError("No se ha ingresado ninguna opción para el fondo del lienzo");
        this.ctx.save();
        if(opts && typeof opts !== "object")
            throw new ZeewCanvasError("Las opciones del fondo deben ser declarados en un objeto");
        
        let radial = opts?.radial;
        if(opts.radial) {
            if(typeof opts.radial === "number") radial = { tl: opts.radial, tr: opts.radial, br: opts.radial, bl: opts.radial };
            else if(typeof opts.radial === "object") {
                if(typeof opts.radial.tl !== "number" || 
                typeof opts.radial.tr !== "number" || 
                typeof opts.radial.br !== "number" || 
                typeof opts.radial.bl !== "number") 
                    throw new ZeewCanvasError(`Una de las opciones del fondo radial no es un número: tl = ${opts.radial.tl}, tr = ${opts.radial.tr}, br = ${opts.radial.br}, bl = ${opts.radial.bl}`);
               
                radial = opts.radial;
            } else throw new ZeewCanvasError(`La opción radial debe ser un número o un objeto`);
        } else radial = 0;

        if(opts.color) {
            if(typeof opts.color === "string") {
                if(!checkColor.test(opts.color)) 
                    throw new ZeewCanvasError("El color debe ser un string hexadecimal");
                    
                this.ctx.fillStyle = opts.color;
            }else if(typeof opts.color === "object") {

                this.ctx.globalAlpha = opts && opts.color.opacity ? opts.color.opacity : 1;

                if(typeof opts.color.x0 !== "number" || typeof opts.color.y0 !== "number" || typeof opts.color.x1 !== "number" || typeof opts.color.y1 !== "number") 
                    throw new ZeewCanvasError(`Una de las opciones del fondo de color no es un número: x0 = ${opts.color.x0}, y0 = ${opts.color.y0}, x1 = ${opts.color.x1}, y1 = ${opts.color.y1}`);
                
                let gradient = this.ctx.createLinearGradient(opts.color.x0, opts.color.y0, opts.color.x1, opts.color.y1);
                for(let i = 0; i < opts.color.data.length; i++) {
                    if(typeof opts.color.data[i] !== "object") 
                        throw new ZeewCanvasError(`La opción de color debe ser un objeto: data[${i}] = ${opts.color.data[i]}`);
                    
                    if(!checkColor.test(opts.color.data[i].hex)) 
                        throw new ZeewCanvasError(`El color debe ser un string hexadecimal: data[${i}].hex = ${opts.color.data[i].hex}`);
                    
                    if(opts.color.data[i].position < 0 || opts.color.data[i].position > 1) 
                        throw new ZeewCanvasError(`La posición del color debe ser un número entre 0 y 1: data[${i}].position = ${opts.color.data[i].position}`);
                    
                    gradient.addColorStop(opts.color.data[i].position, opts.color.data[i].hex);
                }
                this.ctx.fillStyle = gradient;
            }
            fillRectangle(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial, true, false);
        } 
        if(opts.image) {
            const img = await loadImage(opts.image.path);
            this.ctx.globalAlpha = opts && opts.image.opacity ? opts.image.opacity : 1;
            if(!opts.image.path)
                throw new ZeewCanvasError("La ubicación de la imagen debe ser obligatoria");

            if(typeof opts.image.path !== "string") 
                throw new ZeewCanvasError("La ubicación de la imagen debe ser un string");

            fillRectangle(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial);
            this.ctx.clip();
            if(opts.image.vertical) {
                if(typeof opts.image.vertical !== "boolean") 
                    throw new ZeewCanvasError("El valor de la imagen para vertical, tiene que ser un valor boolean");
                
                this.ctx.scale(1,-1);
            }
            if(opts.image.horizontal) {
                if(typeof opts.image.horizontal !== "boolean") 
                    throw new ZeewCanvasError("El valor de la imagen para horizontal, tiene que ser un valor boolean");
                
                this.ctx.scale(-1,1);
            }
            this.ctx.drawImage(img, 
            opts.image.horizontal? -this.canvas.width: 0, 
            opts.image.vertical? -this.canvas.height: 0,
            this.canvas.width, this.canvas.height
            );
            
            this.ctx.globalAlpha = 1;
        }

        this.ctx.restore();
        return this;
    }

    /**
     * @param {string} text El texto de su lienzo.
     * @param {number} x La posición X donde quieras colocar el texto.
     * @param {number} y La posición Y donde quieras colocar el texto.
     * @param {{ 
     * size?: number, color?: string, rotate?: number, font?: string, align?: string, 
     * stroke?: { color: string, width: number }, 
     * shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number }, 
     * linea?: { widthLimit: number, height: number }, 
     * maxWidth?: number }} opts Opciones para el texto.
    */
    public addText(text: string, x: number, y: number, opts?: { 
        size?: number, color?: string, rotate?: number, font?: string, align?: string, 
        stroke?: { color: string, width: number }, 
        shadow?: { color: string, blur?: number, offsetX?: number, offsetY?: number }, 
        linea?: { widthLimit: number, height: number }, 
        maxWidth?: number }
    ) {
        let { size = 60 } = opts;
        this.ctx.save();
        if (x == null || y == null)
            throw new ZeewCanvasError(`Falta el siguiente valor: ${!x ? "X" : "Y"}`);
        if (opts.font && typeof opts.font !== "string")
            throw new ZeewCanvasError(`La fuente debe de ser una string`);
        if (isNaN(x) || isNaN(y))
            throw new ZeewCanvasError(`Los valores X e Y deben de ser números.`);
        if (opts.size && typeof opts.size !== "number")
            throw new ZeewCanvasError(`El tamaño de fuente debe de ser un número`);
        if (opts.color && typeof opts.color !== "string")
            throw new ZeewCanvasError(`El color de fuente debe de ser una string`);
        if (opts.color && !checkColor.test(opts.color))
            throw new ZeewCanvasError(`El color de la fuente debe de ser un color hexadecimal`);
        if (opts.rotate && isNaN(opts.rotate))
            throw new ZeewCanvasError(`El valor de la rotación tiene que ser un número.`);

        this.ctx.font = `${opts.size}px ${opts.font ?? "arial"}`;
        this.ctx.fillStyle = `${opts.color}`;

        if (opts?.rotate) {
            if (opts.rotate < 0 || opts.rotate > 360)
                throw new ZeewCanvasError( `La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`);

            this.ctx.translate(x + 0.5 * size, y + 0.5 * opts.size);
            this.ctx.rotate((Math.PI / 180) * opts.rotate);
            this.ctx.translate(-(x + 0.5 * opts.size), -(y + 0.5 * opts.size));
        }
        
        if (opts?.linea) {
            if (opts.linea.widthLimit && typeof opts.linea.widthLimit !== "number")
                throw new ZeewCanvasError(`El límite de lineas debe de ser un número`);
            if (opts.linea.height && typeof opts.linea.height !== "number")
                throw new ZeewCanvasError(`La altura de linea debe de ser un número`);
            if (opts.linea.widthLimit && isNaN(opts.linea.widthLimit))
                throw new ZeewCanvasError(`El límite de lineas tiene que ser un número.`);
            if (opts.linea.height && isNaN(opts.linea.height))
                throw new ZeewCanvasError(`La altura de linea tiene que ser un número.`);
            if (opts.stroke) {
                if (typeof opts.stroke !== "object") 
                    throw new ZeewCanvasError(`El valor Stroke debe ser un objeto`);

                this.ctx.font = `${opts.size}px ${opts.font ?? "Arial"}`;
                this.ctx.strokeStyle = opts.stroke.color ?? "#000000";
                this.ctx.lineWidth = opts.stroke.width ?? 5;
                jumpStroke(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth? opts.maxWidth : undefined);
            }
            if (opts?.shadow) {
                if (opts.shadow.color && typeof opts.shadow.color !== "string") 
                    throw new ZeewCanvasError(`El color de la sombra debe de ser una string`);
                if (opts.shadow.blur && typeof opts.shadow.blur !== "number") 
                    throw new ZeewCanvasError(`El valor del blur debe de ser un número`);
                if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number") 
                    throw new ZeewCanvasError(`El valor del offsetX debe de ser un número`);
                if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                    throw new ZeewCanvasError(`El valor del offsetY debe de ser un número`);
    
                this.ctx.shadowColor = opts.shadow.color ?? "#000000";
                this.ctx.shadowBlur = opts.shadow.blur ?? 0;
                this.ctx.shadowOffsetX = opts.shadow.offsetX ?? 0;
                this.ctx.shadowOffsetY = opts.shadow.offsetY ?? 0;
            }
            jumpText(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth? opts.maxWidth : undefined);
            this.ctx.restore();
            return this;
        }

        if (opts.stroke) {
            if (typeof opts.stroke !== "object") 
                throw new ZeewCanvasError(`El valor Stroke, no es un objeto`);
            this.ctx.font = `${opts.size}px ${opts.font ?? "Arial"}`;
            this.ctx.strokeStyle = opts.stroke.color ?? "#000000";
            this.ctx.lineWidth = opts.stroke.width ?? 5;
            this.ctx.strokeText(text, x, y, opts.maxWidth? opts.maxWidth : undefined);
        }
        if (opts.shadow) {
            if (opts.shadow.color && typeof opts.shadow.color !== "string") 
                throw new ZeewCanvasError(`El color de la sombra debe de ser una string`);
            if (opts.shadow.blur && typeof opts.shadow.blur !== "number") 
                throw new ZeewCanvasError(`El valor del blur debe de ser un número`);
            if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number") 
                throw new ZeewCanvasError(`El valor del offsetX debe de ser un número`);
            if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number") 
                throw new ZeewCanvasError(`El valor del offsetY debe de ser un número`);
            this.ctx.shadowColor = opts.shadow.color ?? "#000000";
            this.ctx.shadowBlur = opts.shadow.blur ?? 0;
            this.ctx.shadowOffsetX = opts.shadow.offsetX ?? 0;
            this.ctx.shadowOffsetY = opts.shadow.offsetY ?? 0;
        }
        this.ctx.fillText(text, x, y, opts.maxWidth? opts.maxWidth : undefined);
        this.ctx.restore();
        return this;
    }

    public async addImage(path: string, x: number, y: number, width: number, height: number, opts?: {
        radial?: number | { tl: number, tr: number, br: number, bl: number },
        circle?: boolean,
        rotate?: number,
        opacity?: number,
        horizontal?: boolean,
        vertical?: boolean,
        shadow?: { color: string, blur: number, offsetX: number, offsetY: number },
        stroke?: { color: string, width: number }
    }) {
        if(!path) 
            throw new ZeewCanvasError(`La ubicación de la imagen debe ser obligatoria`);
        if(typeof path !== "string")
            throw new ZeewCanvasError(`La ubicación de la imagen debe ser un string`);
        if(!x || typeof x !== "number")
            throw new ZeewCanvasError(`La posición x debe ser obligatoria y debe ser un número`);
        if(!y || typeof y !== "number")
            throw new ZeewCanvasError(`La posición y debe ser obligatoria y debe ser un número`);
        if(!width || typeof width !== "number")
            throw new ZeewCanvasError(`El ancho de la imagen debe ser obligatorio y debe ser un número`);
        if(!height || typeof height !== "number")
            throw new ZeewCanvasError(`El alto de la imagen debe ser obligatorio y debe ser un número`);
        if(opts?.radial && typeof opts.radial !== "number" && typeof opts.radial !== "object")
            throw new ZeewCanvasError(`El valor radial debe ser un número o un objeto`);
        if(opts?.circle && typeof opts.circle !== "boolean")
            throw new ZeewCanvasError(`El valor circle debe ser un boolean`);
        if(opts?.rotate && typeof opts.rotate !== "number")
            throw new ZeewCanvasError(`El valor rotate debe ser un número`);
        if(opts?.opacity && typeof opts.opacity !== "number")
            throw new ZeewCanvasError(`El valor opacity debe ser un número`);
        if(opts?.horizontal && typeof opts.horizontal !== "boolean")
            throw new ZeewCanvasError(`El valor horizontal debe ser un boolean`);
        if(opts?.vertical && typeof opts.vertical !== "boolean")
            throw new ZeewCanvasError(`El valor vertical debe ser un boolean`);
        if(opts?.shadow && typeof opts.shadow !== "object")
            throw new ZeewCanvasError(`El valor shadow debe ser un objeto`);
        if(opts?.stroke && typeof opts.stroke !== "object")
            throw new ZeewCanvasError(`El valor stroke debe ser un objeto`);

        this.ctx.save();
        let img = await loadImage(path);
        if (typeof opts?.rotate === "number") {
            if (opts.rotate < 0 || opts.rotate > 360)
                throw new ZeewCanvasError(`La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`);
      
            this.ctx.translate(x + 0.5 * width, y + 0.5 * height);
            this.ctx.rotate((Math.PI / 180) * opts.rotate);
            this.ctx.translate(-(x + 0.5 * width), -(y + 0.5 * height));
        }

        if (opts?.opacity) {
            this.ctx.globalAlpha = opts.opacity;
        }

        if(opts?.vertical) {
            if(typeof opts.vertical !== "boolean") 
                throw new ZeewCanvasError("El valor de la imagen para vertical, tiene que ser un valor boolean");
            
            this.ctx.scale(1,-1);
        }
        if(opts?.horizontal) {
            if(typeof opts.horizontal !== "boolean") 
                throw new ZeewCanvasError("El valor de la imagen para horizontal, tiene que ser un valor boolean");
            
            this.ctx.scale(-1,1);
        }

        if(opts?.shadow) {
            if(opts.shadow.color && typeof opts.shadow.color !== "string")
                throw new ZeewCanvasError(`El color de la sombra debe de ser un string`);
            if(opts.shadow.blur && typeof opts.shadow.blur !== "number")
                throw new ZeewCanvasError(`El valor del blur debe de ser un número`);
            if(opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                throw new ZeewCanvasError(`El valor del offsetX debe de ser un número`);
            if(opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                throw new ZeewCanvasError(`El valor del offsetY debe de ser un número`);
            if(!checkColor.test(opts.shadow.color)) 
                throw new ZeewCanvasError(`El color de la sombra debe de ser un string hexadecimal`);

            this.ctx.shadowColor = opts.shadow.color ?? "#000000";
            this.ctx.shadowBlur = opts.shadow.blur ?? 0;
            this.ctx.shadowOffsetX = opts.shadow.offsetX ?? 0;
            this.ctx.shadowOffsetY = opts.shadow.offsetY ?? 0;
        }

        let hayStroke: boolean = false;
        if(opts?.stroke) {
            if(typeof opts.stroke.color !== "string")
                throw new ZeewCanvasError(`El color del stroke debe de ser un string`);
            if(typeof opts.stroke.width !== "number")
                throw new ZeewCanvasError(`El ancho del stroke debe de ser un número`);
            if(!checkColor.test(opts.stroke.color)) 
                throw new ZeewCanvasError(`El color del stroke debe de ser un string hexadecimal`);

            this.ctx.strokeStyle = opts.stroke.color ?? "#000000";
            this.ctx.lineWidth = opts.stroke.width ?? 5;
            hayStroke = true;
        }

        if(opts?.radial && opts?.circle) 
            throw new ZeewCanvasError(`No puede haber un valor radial y un valor circle`);
        if(opts?.radial) {
           let radialImg = opts.radial;
            if(typeof opts.radial === "number") radialImg = { tl: opts.radial, tr: opts.radial, br: opts.radial, bl: opts.radial };
            else if(typeof opts.radial === "object") {
                if(typeof opts.radial.tl !== "number" || 
                typeof opts.radial.tr !== "number" || 
                typeof opts.radial.br !== "number" || 
                typeof opts.radial.bl !== "number") 
                    throw new ZeewCanvasError(`Una de las opciones del fondo radial no es un número: tl = ${opts.radial.tl}, tr = ${opts.radial.tr}, br = ${opts.radial.br}, bl = ${opts.radial.bl}`);
               
                radialImg = opts.radial;
            } else throw new ZeewCanvasError(`La opción radial debe ser un número o un objeto`);

            fillRectangle(this.ctx, x, y, width, height, radialImg, false, hayStroke);
            this.ctx.clip();
            this.ctx.drawImage(img, 
                opts.horizontal? -width: x, 
                opts.vertical? -height: y,
                width, height
            );
            this.ctx.restore();
            return this;
        } 
        if(opts?.circle) {
            this.ctx.beginPath();
            this.ctx.arc(x + 0.5 * width, y + 0.5 * height, 0.5 * width, 0, 2 * Math.PI);
            this.ctx.clip();
            this.ctx.drawImage(img,
                opts.horizontal? -width: x,
                opts.vertical? -height: y,
                width, height
            );
            if(hayStroke) {
                this.ctx.arc(x + 0.5 * width, y + 0.5 * height, 0.5 * width, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            this.ctx.restore();
            return this;
        }

        fillRectangle(this.ctx, x, y, width, height, 0, true, hayStroke);
        this.ctx.clip();
        this.ctx.drawImage(img, x, y, width, height);
        this.ctx.restore();
        return this;
    }
    public buildImage() {
        return this.canvas.toBuffer();
    }
    
    public _getCanvasData() {
        return {canvas: this.canvas, ctx: this.ctx};
    }
}