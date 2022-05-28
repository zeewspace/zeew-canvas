const {Canvas, createCanvas, loadImage, registerFont} = require("canvas");
const {fillRectangle, jumpText, jumpStroke} = require("./lib/CanvasUtils");
const checkColor = /^#([0-9A-F]{3}){1,2}$/i;

module.exports = class ZeewCanvas {

    /**
     * 
     * @param {number} width - ancho del lienzo
     * @param {number} height - altura del lienzo
     */
    constructor(width, height) {
        if(!width || !height) {
            throw new Error("El ancho y la altura son valores obligatorios");
        }
        if(isNaN(width) || isNaN(height)) {
            throw new Error("El ancho y la altura deben ser valores numéricos");
        }

        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * 
     * @param {string} path Ubicación de la fuente
     * @param {{
     *  family: string,
     *  weight?: string,
     *  style?: string,
     * }} [opts] Opciones de fuente
     */
    registerFont(path, opts) {
        registerFont(path, opts);
        return this;
    }

    /**
     * 
     * @param {{
     * image?: {
     *  path: string,
     *  opacity?: number,
     *  vertical?: boolean,
     *  horizontal?: boolean
     * }, 
     * color?: string | {x0: number, y0: number, x1: number, y1: number, opacity: number, data: {hex: string, position: number}[]},
     * radial?: number | {tl: number, tr: number, br: number, bl: number}
     * }} opts - Opciones para el fondo de tu lienzo.
     */
    async setBackground(opts) {
        this.ctx.save();
        if(opts && typeof opts !== "object") {
            throw new Error("Las opciones del fondo deben ser declarados en un objeto");
        }
        let radial = opts.radial;
        if(opts.radial) {
            if(typeof opts.radial === "number") {
                radial = {
                    tl: opts.radial,
                    tr: opts.radial,
                    br: opts.radial,
                    bl: opts.radial
                }
            }
            if(typeof opts.radial === "object") {
                if(typeof opts.radial.tl !== "number" || typeof opts.radial.tr !== "number" || typeof opts.radial.br !== "number" || typeof opts.radial.bl !== "number") {
                    throw new Error("Los valores de para el curveado deben ser valores numéricos");
                }
                radial = opts.radial;
            }
        } else radial = 0;

        if(opts.color) {
            if(typeof opts.color === "string") {
                if(!checkColor.test(opts.color)) {
                    throw new Error("El color debe ser un string hexadecimal");
                }
                this.ctx.fillStyle = opts.color;
            }else if(typeof opts.color === "object") {
                this.ctx.globalAlpha = opts && opts.color.opacity ? opts.color.opacity : 1;
                if(typeof opts.color.x0 !== "number" || typeof opts.color.y0 !== "number" || typeof opts.color.x1 !== "number" || typeof opts.color.y1 !== "number") {
                    throw new Error("Una de las propiedades del color no es correcta");
                }
                let gradient = this.ctx.createLinearGradient(opts.color.x0, opts.color.y0, opts.color.x1, opts.color.y1);
                for(let i = 0; i < opts.color.data.length; i++) {
                    if(typeof opts.color.data[i] !== "object") {
                        throw new Error("Uno de los colores ingresado, debe ser declarado en un objeto y debe tener los siguientes atributos: x0, y0, x1, y1, hex, position");
                    }
                    
                    if(!checkColor.test(opts.color.data[i].hex)) {
                        throw new Error("El color debe ser un string hexadecimal");
                    }
                    if(opts.color.data[i].position < 0 || opts.color.data[i].position > 1) {
                        throw new Error("La posición del color debe estar entre 0 y 1");
                    }
                    gradient.addColorStop(opts.color.data[i].position, opts.color.data[i].hex);
                }
                this.ctx.fillStyle = gradient;
            }
            fillRectangle(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial, true, false);
        } 
        if(opts.image) {
            const img = await loadImage(opts.image.path);
            this.ctx.globalAlpha = opts && opts.image.opacity ? opts.image.opacity : 1;
            if(!opts.image.path) {
                throw new Error("La imagen es obligatoria");
            }
            if(typeof opts.image.path !== "string") {
                throw new Error("El valor de la imagen debe ser un string");
            }

            fillRectangle(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial);
            this.ctx.clip();
            if(opts.image.vertical) {
                if(typeof opts.image.vertical !== "boolean") {
                    throw new Error("El valor de vertical debe ser un booleano");
                }
                this.ctx.scale(1,-1);
            }
            if(opts.image.horizontal) {
                if(typeof opts.image.horizontal !== "boolean") {
                    throw new Error("El valor de horizontal debe ser un booleano");
                }
                this.ctx.scale(-1,1);
            }
            this.ctx.drawImage(img, 
                opts.image.horizontal? -this.canvas.width: 0, 
                opts.image.vertical? -this.canvas.height: 0,
                this.canvas.width, this.canvas.height);
            
            this.ctx.globalAlpha = 1;
        }

        this.ctx.restore();
        return this;
    }

    /**
   * @param {string} text El texto a añadir
   * @param {number} x La posición X donde quieras colocar el texto
   * @param {number} y La posición Y donde quieras colocar el texto
   * @param {{
   * size: number, 
   * color: string, 
   * rotate?: number, 
   * font?: string, 
   * align?: string,
   * stroke?: {
   *   color: string,
   *   width: number,
   * }, 
   * shadow?: {
   *   color: string,
   *   blur?: number,
   *   offsetX?: number,
   *   offsetY?: number
   * },
   * linea?: {widthLimit: 10, height: 20 }
   * maxWidth?: number
   * }
   * } [opts] - Opciones para el texto
   */
    addText(text, x, y, opts) {
        let { size = 60, color = "#000000" } = opts;
        this.ctx.save();
        if (x == null || y == null)
        throw new Error(`Falta el siguiente valor: ${!x ? "X" : "Y"}`);
        if (opts.font && typeof opts.font !== "string")
        throw new Error(`La fuente debe de ser una string`);
        if (isNaN(x) || isNaN(y))
        throw new Error(`Los valores X e Y deben de ser números.`);
        if (opts.size && typeof opts.size !== "number")
        throw new Error(`El tamaño de fuente debe de ser un número`);
        if (opts.color && typeof opts.color !== "string")
        throw new Error(`El color de fuente debe de ser una string`);
        if (opts.color && !checkColor.test(opts.color))
        throw new Error(
            `El color de la fuente debe de ser un color hexadecimal`
        );
        if (opts.rotate && isNaN(opts.rotate))
        throw new Error(`El valor de la rotación tiene que ser un número.`);

        this.ctx.font = `${opts.size}px ${opts.font ?? "arial"}`;
        this.ctx.fillStyle = `${opts.color}`;

        if (opts.rotate) {
            if (opts.rotate < 0 || opts.rotate > 360)
                throw new rror( `La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`);

            this.ctx.translate(x + 0.5 * size, y + 0.5 * opts.size);
            this.ctx.rotate((Math.PI / 180) * opts.rotate);
            this.ctx.translate(-(x + 0.5 * opts.size), -(y + 0.5 * opts.size));
        }
        
        if (opts?.linea) {
            if (opts.linea.widthLimit && typeof opts.linea.widthLimit !== "number")
                throw new Error(`El límite de lineas debe de ser un número`);
            if (opts.linea.height && typeof opts.linea.height !== "number")
                throw new Error(`La altura de linea debe de ser un número`);
            if (opts.linea.widthLimit && isNaN(opts.linea.widthLimit))
                throw new Error(`El límite de lineas tiene que ser un número.`);
            if (opts.linea.height && isNaN(opts.linea.height))
                throw new Error(`La altura de linea tiene que ser un número.`);
            if (opts.stroke) {
                if (typeof opts.stroke !== "object") throw new Error(`El valor Stroke, no es un objeto`);
                this.ctx.font = `${opts.size}px ${opts.font ?? "Arial"}`;
                this.ctx.strokeStyle = opts.stroke.color ?? "#000000";
                this.ctx.lineWidth = opts.strokeWidth ?? 5;
                jumpStroke(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth? opts.maxWidth : undefined);
            }
            if (opts.shadow) {
            
                if (opts.shadow.color && typeof opts.shadow.color !== "string") throw new Error(`El color de la sombra debe de ser una string`);
                if (opts.shadow.blur && typeof opts.shadow.blur !== "number") throw new Error(`El valor del blur debe de ser un número`);
                if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number") throw new Error(`El valor del offsetX debe de ser un número`);
                if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number") throw new Error(`El valor del offsetY debe de ser un número`);
    
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
            if (typeof opts.stroke !== "object") throw new Error(`El valor Stroke, no es un objeto`);
            this.ctx.font = `${opts.size}px ${opts.font ?? "Arial"}`;
            this.ctx.strokeStyle = opts.stroke.color ?? "#000000";
            this.ctx.lineWidth = opts.strokeWidth ?? 5;
            this.ctx.strokeText(text, x, y, opts.maxWidth? opts.maxWidth : undefined);
        }
        if (opts.shadow) {
            if (opts.shadow.color && typeof opts.shadow.color !== "string") throw new Error(`El color de la sombra debe de ser una string`);
            if (opts.shadow.blur && typeof opts.shadow.blur !== "number") throw new Error(`El valor del blur debe de ser un número`);
            if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number") throw new Error(`El valor del offsetX debe de ser un número`);
            if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number") throw new Error(`El valor del offsetY debe de ser un número`);

            this.ctx.shadowColor = opts.shadow.color ?? "#000000";
            this.ctx.shadowBlur = opts.shadow.blur ?? 0;
            this.ctx.shadowOffsetX = opts.shadow.offsetX ?? 0;
            this.ctx.shadowOffsetY = opts.shadow.offsetY ?? 0;
        }
        this.ctx.fillText(text, x, y, opts.maxWidth? opts.maxWidth : undefined);
        this.ctx.restore();
        return this;
    }
    buildImage() {
        return this.canvas.toBuffer();
    }
}