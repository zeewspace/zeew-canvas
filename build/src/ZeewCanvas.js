"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ZeewCanvas = void 0;
var CanvasUtils_1 = require("./lib/CanvasUtils");
var canvas_1 = require("canvas");
var checkColor = /^#([0-9A-F]{3}){1,2}$/i;
var ZeewCanvas = /** @class */ (function () {
    /**
     *
     * @param {number} width - Ancho del lienzo
     * @param {number} height - Altura del lienzo
     */
    function ZeewCanvas(width, height) {
        this.canvas = (0, canvas_1.createCanvas)(width, height);
        this.ctx = this.canvas.getContext("2d");
    }
    /**
     *
     * @param {string} path Ubicación de la fuente
     * @param {{
     *  family: string,
     *  weight?: string,
     *  style?: string,
     * }} [fontFace] Opciones de fuente
     */
    ZeewCanvas.prototype.registerFont = function (path, fontFace) {
        (0, canvas_1.registerFont)(path, fontFace);
        return this;
    };
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
    ZeewCanvas.prototype.setBackground = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var radial, gradient, i, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ctx.save();
                        if (opts && typeof opts !== "object") {
                            throw new Error("Las opciones del fondo deben ser declarados en un objeto");
                        }
                        radial = opts.radial;
                        if (opts.radial) {
                            if (typeof opts.radial === "number") {
                                radial = {
                                    tl: opts.radial,
                                    tr: opts.radial,
                                    br: opts.radial,
                                    bl: opts.radial
                                };
                            }
                            if (typeof opts.radial === "object") {
                                if (typeof opts.radial.tl !== "number" || typeof opts.radial.tr !== "number" || typeof opts.radial.br !== "number" || typeof opts.radial.bl !== "number") {
                                    throw new Error("Los valores de para el curveado deben ser valores numéricos");
                                }
                                radial = opts.radial;
                            }
                        }
                        else
                            radial = 0;
                        if (opts.color) {
                            if (typeof opts.color === "string") {
                                if (!checkColor.test(opts.color)) {
                                    throw new Error("El color debe ser un string hexadecimal");
                                }
                                this.ctx.fillStyle = opts.color;
                            }
                            else if (typeof opts.color === "object") {
                                this.ctx.globalAlpha = opts && opts.color.opacity ? opts.color.opacity : 1;
                                if (typeof opts.color.x0 !== "number" || typeof opts.color.y0 !== "number" || typeof opts.color.x1 !== "number" || typeof opts.color.y1 !== "number") {
                                    throw new Error("Una de las propiedades del color no es correcta");
                                }
                                gradient = this.ctx.createLinearGradient(opts.color.x0, opts.color.y0, opts.color.x1, opts.color.y1);
                                for (i = 0; i < opts.color.data.length; i++) {
                                    if (typeof opts.color.data[i] !== "object") {
                                        throw new Error("Uno de los colores ingresado, debe ser declarado en un objeto y debe tener los siguientes atributos: x0, y0, x1, y1, hex, position");
                                    }
                                    if (!checkColor.test(opts.color.data[i].hex)) {
                                        throw new Error("El color debe ser un string hexadecimal");
                                    }
                                    if (opts.color.data[i].position < 0 || opts.color.data[i].position > 1) {
                                        throw new Error("La posición del color debe estar entre 0 y 1");
                                    }
                                    gradient.addColorStop(opts.color.data[i].position, opts.color.data[i].hex);
                                }
                                this.ctx.fillStyle = gradient;
                            }
                            (0, CanvasUtils_1.fillRectangle)(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial, true, false);
                        }
                        if (!opts.image) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, canvas_1.loadImage)(opts.image.path)];
                    case 1:
                        img = _a.sent();
                        this.ctx.globalAlpha = opts && opts.image.opacity ? opts.image.opacity : 1;
                        if (!opts.image.path) {
                            throw new Error("La imagen es obligatoria");
                        }
                        if (typeof opts.image.path !== "string") {
                            throw new Error("El valor de la imagen debe ser un string");
                        }
                        (0, CanvasUtils_1.fillRectangle)(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial);
                        this.ctx.clip();
                        if (opts.image.vertical) {
                            if (typeof opts.image.vertical !== "boolean") {
                                throw new Error("El valor de vertical debe ser un booleano");
                            }
                            this.ctx.scale(1, -1);
                        }
                        if (opts.image.horizontal) {
                            if (typeof opts.image.horizontal !== "boolean") {
                                throw new Error("El valor de horizontal debe ser un booleano");
                            }
                            this.ctx.scale(-1, 1);
                        }
                        this.ctx.drawImage(img, opts.image.horizontal ? -this.canvas.width : 0, opts.image.vertical ? -this.canvas.height : 0, this.canvas.width, this.canvas.height);
                        this.ctx.globalAlpha = 1;
                        _a.label = 2;
                    case 2:
                        this.ctx.restore();
                        return [2 /*return*/, this];
                }
            });
        });
    };
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
    ZeewCanvas.prototype.addText = function (text, x, y, opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var _r = opts.size, size = _r === void 0 ? 60 : _r;
        this.ctx.save();
        if (x == null || y == null)
            throw new Error("Falta el siguiente valor: ".concat(!x ? "X" : "Y"));
        if (opts.font && typeof opts.font !== "string")
            throw new Error("La fuente debe de ser una string");
        if (isNaN(x) || isNaN(y))
            throw new Error("Los valores X e Y deben de ser n\u00FAmeros.");
        if (opts.size && typeof opts.size !== "number")
            throw new Error("El tama\u00F1o de fuente debe de ser un n\u00FAmero");
        if (opts.color && typeof opts.color !== "string")
            throw new Error("El color de fuente debe de ser una string");
        if (opts.color && !checkColor.test(opts.color))
            throw new Error("El color de la fuente debe de ser un color hexadecimal");
        if (opts.rotate && isNaN(opts.rotate))
            throw new Error("El valor de la rotaci\u00F3n tiene que ser un n\u00FAmero.");
        this.ctx.font = "".concat(opts.size, "px ").concat((_a = opts.font) !== null && _a !== void 0 ? _a : "arial");
        this.ctx.fillStyle = "".concat(opts.color);
        if (opts.rotate) {
            if (opts.rotate < 0 || opts.rotate > 360)
                throw new Error("La rotaci\u00F3n se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.");
            this.ctx.translate(x + 0.5 * size, y + 0.5 * opts.size);
            this.ctx.rotate((Math.PI / 180) * opts.rotate);
            this.ctx.translate(-(x + 0.5 * opts.size), -(y + 0.5 * opts.size));
        }
        if (opts === null || opts === void 0 ? void 0 : opts.linea) {
            if (opts.linea.widthLimit && typeof opts.linea.widthLimit !== "number")
                throw new Error("El l\u00EDmite de lineas debe de ser un n\u00FAmero");
            if (opts.linea.height && typeof opts.linea.height !== "number")
                throw new Error("La altura de linea debe de ser un n\u00FAmero");
            if (opts.linea.widthLimit && isNaN(opts.linea.widthLimit))
                throw new Error("El l\u00EDmite de lineas tiene que ser un n\u00FAmero.");
            if (opts.linea.height && isNaN(opts.linea.height))
                throw new Error("La altura de linea tiene que ser un n\u00FAmero.");
            if (opts.stroke) {
                if (typeof opts.stroke !== "object")
                    throw new Error("El valor Stroke, no es un objeto");
                this.ctx.font = "".concat(opts.size, "px ").concat((_b = opts.font) !== null && _b !== void 0 ? _b : "Arial");
                this.ctx.strokeStyle = (_c = opts.stroke.color) !== null && _c !== void 0 ? _c : "#000000";
                this.ctx.lineWidth = (_d = opts.stroke.width) !== null && _d !== void 0 ? _d : 5;
                (0, CanvasUtils_1.jumpStroke)(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth ? opts.maxWidth : undefined);
            }
            if (opts.shadow) {
                if (opts.shadow.color && typeof opts.shadow.color !== "string")
                    throw new Error("El color de la sombra debe de ser una string");
                if (opts.shadow.blur && typeof opts.shadow.blur !== "number")
                    throw new Error("El valor del blur debe de ser un n\u00FAmero");
                if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                    throw new Error("El valor del offsetX debe de ser un n\u00FAmero");
                if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                    throw new Error("El valor del offsetY debe de ser un n\u00FAmero");
                this.ctx.shadowColor = (_e = opts.shadow.color) !== null && _e !== void 0 ? _e : "#000000";
                this.ctx.shadowBlur = (_f = opts.shadow.blur) !== null && _f !== void 0 ? _f : 0;
                this.ctx.shadowOffsetX = (_g = opts.shadow.offsetX) !== null && _g !== void 0 ? _g : 0;
                this.ctx.shadowOffsetY = (_h = opts.shadow.offsetY) !== null && _h !== void 0 ? _h : 0;
            }
            (0, CanvasUtils_1.jumpText)(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth ? opts.maxWidth : undefined);
            this.ctx.restore();
            return this;
        }
        if (opts.stroke) {
            if (typeof opts.stroke !== "object")
                throw new Error("El valor Stroke, no es un objeto");
            this.ctx.font = "".concat(opts.size, "px ").concat((_j = opts.font) !== null && _j !== void 0 ? _j : "Arial");
            this.ctx.strokeStyle = (_k = opts.stroke.color) !== null && _k !== void 0 ? _k : "#000000";
            this.ctx.lineWidth = (_l = opts.stroke.width) !== null && _l !== void 0 ? _l : 5;
            this.ctx.strokeText(text, x, y, opts.maxWidth ? opts.maxWidth : undefined);
        }
        if (opts.shadow) {
            if (opts.shadow.color && typeof opts.shadow.color !== "string")
                throw new Error("El color de la sombra debe de ser una string");
            if (opts.shadow.blur && typeof opts.shadow.blur !== "number")
                throw new Error("El valor del blur debe de ser un n\u00FAmero");
            if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                throw new Error("El valor del offsetX debe de ser un n\u00FAmero");
            if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                throw new Error("El valor del offsetY debe de ser un n\u00FAmero");
            this.ctx.shadowColor = (_m = opts.shadow.color) !== null && _m !== void 0 ? _m : "#000000";
            this.ctx.shadowBlur = (_o = opts.shadow.blur) !== null && _o !== void 0 ? _o : 0;
            this.ctx.shadowOffsetX = (_p = opts.shadow.offsetX) !== null && _p !== void 0 ? _p : 0;
            this.ctx.shadowOffsetY = (_q = opts.shadow.offsetY) !== null && _q !== void 0 ? _q : 0;
        }
        this.ctx.fillText(text, x, y, opts.maxWidth ? opts.maxWidth : undefined);
        this.ctx.restore();
        return this;
    };
    ZeewCanvas.prototype.buildImage = function () {
        return this.canvas.toBuffer();
    };
    return ZeewCanvas;
}());
exports.ZeewCanvas = ZeewCanvas;
