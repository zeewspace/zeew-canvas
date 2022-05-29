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
var CanvasUtils_1 = require("./Resources/CanvasUtils");
var ZeewCanvasError_1 = require("./Resources/ZeewCanvasError");
var canvas_1 = require("canvas");
var checkColor = /^#([0-9A-F]{3}){1,2}$/i;
/**
 * @Class Maneja la API de Canvas de una manera más sencilla
 */
var ZeewCanvas = /** @class */ (function () {
    /**
     *
     * @param width Ancho del lienzo
     * @param height Altura del lienzo
     */
    function ZeewCanvas(width, height) {
        if (!width || !height)
            throw new ZeewCanvasError_1["default"]("Te falta ingresar el valor del ".concat(width ? "largo" : "ancho", " del lienzo"));
        if (isNaN(width) || isNaN(height))
            throw new ZeewCanvasError_1["default"]("El valor del ".concat(isNaN(width) ? "largo" : "ancho", " del lienzo no es un valor num\u00E9rico"));
        this.canvas = (0, canvas_1.createCanvas)(width, height);
        this.ctx = this.canvas.getContext("2d");
    }
    /**
     * @param {string} path Ubicación de la fuente de letra.
     * @param {{ family: string, weight?: string, style?: string}} fontFace Opciones para la fuente de letra.
     */
    ZeewCanvas.prototype.registerFont = function (path, fontFace) {
        (0, canvas_1.registerFont)(path, fontFace);
        return this;
    };
    /**
     * @param {{
     *   image?: { path: string, opacity?: number, vertical?: boolean, horizontal?: boolean },
     *   color?: string | { x0: number, y0: number, x1: number, y1: number, opacity: number, data: { hex: string, position: number }[] },
     *   radial?: number | { tl: number, tr: number, br: number, bl: number }
     * }} opts Opciones para el fondo de tu lienzo.
     */
    ZeewCanvas.prototype.setBackground = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var radial, gradient, i, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!opts)
                            throw new ZeewCanvasError_1["default"]("No se ha ingresado ninguna opción para el fondo del lienzo");
                        this.ctx.save();
                        if (opts && typeof opts !== "object")
                            throw new ZeewCanvasError_1["default"]("Las opciones del fondo deben ser declarados en un objeto");
                        radial = opts.radial;
                        if (opts.radial) {
                            if (typeof opts.radial === "number")
                                radial = { tl: opts.radial, tr: opts.radial, br: opts.radial, bl: opts.radial };
                            else if (typeof opts.radial === "object") {
                                if (typeof opts.radial.tl !== "number" ||
                                    typeof opts.radial.tr !== "number" ||
                                    typeof opts.radial.br !== "number" ||
                                    typeof opts.radial.bl !== "number")
                                    throw new ZeewCanvasError_1["default"]("Una de las opciones del fondo radial no es un n\u00FAmero: tl = ".concat(opts.radial.tl, ", tr = ").concat(opts.radial.tr, ", br = ").concat(opts.radial.br, ", bl = ").concat(opts.radial.bl));
                                radial = opts.radial;
                            }
                            else
                                throw new ZeewCanvasError_1["default"]("La opci\u00F3n radial debe ser un n\u00FAmero o un objeto");
                        }
                        else
                            radial = 0;
                        if (opts.color) {
                            if (typeof opts.color === "string") {
                                if (!checkColor.test(opts.color))
                                    throw new ZeewCanvasError_1["default"]("El color debe ser un string hexadecimal");
                                this.ctx.fillStyle = opts.color;
                            }
                            else if (typeof opts.color === "object") {
                                this.ctx.globalAlpha = opts && opts.color.opacity ? opts.color.opacity : 1;
                                if (typeof opts.color.x0 !== "number" || typeof opts.color.y0 !== "number" || typeof opts.color.x1 !== "number" || typeof opts.color.y1 !== "number")
                                    throw new ZeewCanvasError_1["default"]("Una de las opciones del fondo de color no es un n\u00FAmero: x0 = ".concat(opts.color.x0, ", y0 = ").concat(opts.color.y0, ", x1 = ").concat(opts.color.x1, ", y1 = ").concat(opts.color.y1));
                                gradient = this.ctx.createLinearGradient(opts.color.x0, opts.color.y0, opts.color.x1, opts.color.y1);
                                for (i = 0; i < opts.color.data.length; i++) {
                                    if (typeof opts.color.data[i] !== "object")
                                        throw new ZeewCanvasError_1["default"]("La opci\u00F3n de color debe ser un objeto: data[".concat(i, "] = ").concat(opts.color.data[i]));
                                    if (!checkColor.test(opts.color.data[i].hex))
                                        throw new ZeewCanvasError_1["default"]("El color debe ser un string hexadecimal: data[".concat(i, "].hex = ").concat(opts.color.data[i].hex));
                                    if (opts.color.data[i].position < 0 || opts.color.data[i].position > 1)
                                        throw new ZeewCanvasError_1["default"]("La posici\u00F3n del color debe ser un n\u00FAmero entre 0 y 1: data[".concat(i, "].position = ").concat(opts.color.data[i].position));
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
                        if (!opts.image.path)
                            throw new ZeewCanvasError_1["default"]("La ubicación de la imagen debe ser obligatoria");
                        if (typeof opts.image.path !== "string")
                            throw new ZeewCanvasError_1["default"]("La ubicación de la imagen debe ser un string");
                        (0, CanvasUtils_1.fillRectangle)(this.ctx, 0, 0, this.canvas.width, this.canvas.height, radial);
                        this.ctx.clip();
                        if (opts.image.vertical) {
                            if (typeof opts.image.vertical !== "boolean")
                                throw new ZeewCanvasError_1["default"]("El valor de la imagen para vertical, tiene que ser un valor boolean");
                            this.ctx.scale(1, -1);
                        }
                        if (opts.image.horizontal) {
                            if (typeof opts.image.horizontal !== "boolean")
                                throw new ZeewCanvasError_1["default"]("El valor de la imagen para horizontal, tiene que ser un valor boolean");
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
    ZeewCanvas.prototype.addText = function (text, x, y, opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var _r = opts.size, size = _r === void 0 ? 60 : _r;
        this.ctx.save();
        if (x == null || y == null)
            throw new ZeewCanvasError_1["default"]("Falta el siguiente valor: ".concat(!x ? "X" : "Y"));
        if (opts.font && typeof opts.font !== "string")
            throw new ZeewCanvasError_1["default"]("La fuente debe de ser una string");
        if (isNaN(x) || isNaN(y))
            throw new ZeewCanvasError_1["default"]("Los valores X e Y deben de ser n\u00FAmeros.");
        if (opts.size && typeof opts.size !== "number")
            throw new ZeewCanvasError_1["default"]("El tama\u00F1o de fuente debe de ser un n\u00FAmero");
        if (opts.color && typeof opts.color !== "string")
            throw new ZeewCanvasError_1["default"]("El color de fuente debe de ser una string");
        if (opts.color && !checkColor.test(opts.color))
            throw new ZeewCanvasError_1["default"]("El color de la fuente debe de ser un color hexadecimal");
        if (opts.rotate && isNaN(opts.rotate))
            throw new ZeewCanvasError_1["default"]("El valor de la rotaci\u00F3n tiene que ser un n\u00FAmero.");
        this.ctx.font = "".concat(opts.size, "px ").concat((_a = opts.font) !== null && _a !== void 0 ? _a : "arial");
        this.ctx.fillStyle = "".concat(opts.color);
        if (opts.rotate) {
            if (opts.rotate < 0 || opts.rotate > 360)
                throw new ZeewCanvasError_1["default"]("La rotaci\u00F3n se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.");
            this.ctx.translate(x + 0.5 * size, y + 0.5 * opts.size);
            this.ctx.rotate((Math.PI / 180) * opts.rotate);
            this.ctx.translate(-(x + 0.5 * opts.size), -(y + 0.5 * opts.size));
        }
        if (opts === null || opts === void 0 ? void 0 : opts.linea) {
            if (opts.linea.widthLimit && typeof opts.linea.widthLimit !== "number")
                throw new ZeewCanvasError_1["default"]("El l\u00EDmite de lineas debe de ser un n\u00FAmero");
            if (opts.linea.height && typeof opts.linea.height !== "number")
                throw new ZeewCanvasError_1["default"]("La altura de linea debe de ser un n\u00FAmero");
            if (opts.linea.widthLimit && isNaN(opts.linea.widthLimit))
                throw new ZeewCanvasError_1["default"]("El l\u00EDmite de lineas tiene que ser un n\u00FAmero.");
            if (opts.linea.height && isNaN(opts.linea.height))
                throw new ZeewCanvasError_1["default"]("La altura de linea tiene que ser un n\u00FAmero.");
            if (opts.stroke) {
                if (typeof opts.stroke !== "object")
                    throw new ZeewCanvasError_1["default"]("El valor Stroke debe ser un objeto");
                this.ctx.font = "".concat(opts.size, "px ").concat((_b = opts.font) !== null && _b !== void 0 ? _b : "Arial");
                this.ctx.strokeStyle = (_c = opts.stroke.color) !== null && _c !== void 0 ? _c : "#000000";
                this.ctx.lineWidth = (_d = opts.stroke.width) !== null && _d !== void 0 ? _d : 5;
                (0, CanvasUtils_1.jumpStroke)(this.ctx, text, x, y, opts.linea.widthLimit, opts.linea.height, opts.maxWidth ? opts.maxWidth : undefined);
            }
            if (opts.shadow) {
                if (opts.shadow.color && typeof opts.shadow.color !== "string")
                    throw new ZeewCanvasError_1["default"]("El color de la sombra debe de ser una string");
                if (opts.shadow.blur && typeof opts.shadow.blur !== "number")
                    throw new ZeewCanvasError_1["default"]("El valor del blur debe de ser un n\u00FAmero");
                if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                    throw new ZeewCanvasError_1["default"]("El valor del offsetX debe de ser un n\u00FAmero");
                if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                    throw new ZeewCanvasError_1["default"]("El valor del offsetY debe de ser un n\u00FAmero");
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
                throw new ZeewCanvasError_1["default"]("El valor Stroke, no es un objeto");
            this.ctx.font = "".concat(opts.size, "px ").concat((_j = opts.font) !== null && _j !== void 0 ? _j : "Arial");
            this.ctx.strokeStyle = (_k = opts.stroke.color) !== null && _k !== void 0 ? _k : "#000000";
            this.ctx.lineWidth = (_l = opts.stroke.width) !== null && _l !== void 0 ? _l : 5;
            this.ctx.strokeText(text, x, y, opts.maxWidth ? opts.maxWidth : undefined);
        }
        if (opts.shadow) {
            if (opts.shadow.color && typeof opts.shadow.color !== "string")
                throw new ZeewCanvasError_1["default"]("El color de la sombra debe de ser una string");
            if (opts.shadow.blur && typeof opts.shadow.blur !== "number")
                throw new ZeewCanvasError_1["default"]("El valor del blur debe de ser un n\u00FAmero");
            if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                throw new ZeewCanvasError_1["default"]("El valor del offsetX debe de ser un n\u00FAmero");
            if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                throw new ZeewCanvasError_1["default"]("El valor del offsetY debe de ser un n\u00FAmero");
            this.ctx.shadowColor = (_m = opts.shadow.color) !== null && _m !== void 0 ? _m : "#000000";
            this.ctx.shadowBlur = (_o = opts.shadow.blur) !== null && _o !== void 0 ? _o : 0;
            this.ctx.shadowOffsetX = (_p = opts.shadow.offsetX) !== null && _p !== void 0 ? _p : 0;
            this.ctx.shadowOffsetY = (_q = opts.shadow.offsetY) !== null && _q !== void 0 ? _q : 0;
        }
        this.ctx.fillText(text, x, y, opts.maxWidth ? opts.maxWidth : undefined);
        this.ctx.restore();
        return this;
    };
    ZeewCanvas.prototype.addImage = function (path, x, y, width, height, opts) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var img, hayStroke, radialImg;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!path)
                            throw new ZeewCanvasError_1["default"]("La ubicaci\u00F3n de la imagen debe ser obligatoria");
                        if (typeof path !== "string")
                            throw new ZeewCanvasError_1["default"]("La ubicaci\u00F3n de la imagen debe ser un string");
                        if (!x || typeof x !== "number")
                            throw new ZeewCanvasError_1["default"]("La posici\u00F3n x debe ser obligatoria y debe ser un n\u00FAmero");
                        if (!y || typeof y !== "number")
                            throw new ZeewCanvasError_1["default"]("La posici\u00F3n y debe ser obligatoria y debe ser un n\u00FAmero");
                        if (!width || typeof width !== "number")
                            throw new ZeewCanvasError_1["default"]("El ancho de la imagen debe ser obligatorio y debe ser un n\u00FAmero");
                        if (!height || typeof height !== "number")
                            throw new ZeewCanvasError_1["default"]("El alto de la imagen debe ser obligatorio y debe ser un n\u00FAmero");
                        if ((opts === null || opts === void 0 ? void 0 : opts.radial) && typeof opts.radial !== "number" && typeof opts.radial !== "object")
                            throw new ZeewCanvasError_1["default"]("El valor radial debe ser un n\u00FAmero o un objeto");
                        if ((opts === null || opts === void 0 ? void 0 : opts.circle) && typeof opts.circle !== "boolean")
                            throw new ZeewCanvasError_1["default"]("El valor circle debe ser un boolean");
                        if ((opts === null || opts === void 0 ? void 0 : opts.rotate) && typeof opts.rotate !== "number")
                            throw new ZeewCanvasError_1["default"]("El valor rotate debe ser un n\u00FAmero");
                        if ((opts === null || opts === void 0 ? void 0 : opts.opacity) && typeof opts.opacity !== "number")
                            throw new ZeewCanvasError_1["default"]("El valor opacity debe ser un n\u00FAmero");
                        if ((opts === null || opts === void 0 ? void 0 : opts.horizontal) && typeof opts.horizontal !== "boolean")
                            throw new ZeewCanvasError_1["default"]("El valor horizontal debe ser un boolean");
                        if ((opts === null || opts === void 0 ? void 0 : opts.vertical) && typeof opts.vertical !== "boolean")
                            throw new ZeewCanvasError_1["default"]("El valor vertical debe ser un boolean");
                        if ((opts === null || opts === void 0 ? void 0 : opts.shadow) && typeof opts.shadow !== "object")
                            throw new ZeewCanvasError_1["default"]("El valor shadow debe ser un objeto");
                        if ((opts === null || opts === void 0 ? void 0 : opts.stroke) && typeof opts.stroke !== "object")
                            throw new ZeewCanvasError_1["default"]("El valor stroke debe ser un objeto");
                        this.ctx.save();
                        return [4 /*yield*/, (0, canvas_1.loadImage)(path)];
                    case 1:
                        img = _g.sent();
                        if (typeof (opts === null || opts === void 0 ? void 0 : opts.rotate) === "number") {
                            if (opts.rotate < 0 || opts.rotate > 360)
                                throw new ZeewCanvasError_1["default"]("La rotaci\u00F3n se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.");
                            this.ctx.translate(x + 0.5 * width, y + 0.5 * height);
                            this.ctx.rotate((Math.PI / 180) * opts.rotate);
                            this.ctx.translate(-(x + 0.5 * width), -(y + 0.5 * height));
                        }
                        if (opts === null || opts === void 0 ? void 0 : opts.opacity) {
                            this.ctx.globalAlpha = opts.opacity;
                        }
                        if (opts === null || opts === void 0 ? void 0 : opts.vertical) {
                            if (typeof opts.vertical !== "boolean")
                                throw new ZeewCanvasError_1["default"]("El valor de la imagen para vertical, tiene que ser un valor boolean");
                            this.ctx.scale(1, -1);
                        }
                        if (opts === null || opts === void 0 ? void 0 : opts.horizontal) {
                            if (typeof opts.horizontal !== "boolean")
                                throw new ZeewCanvasError_1["default"]("El valor de la imagen para horizontal, tiene que ser un valor boolean");
                            this.ctx.scale(-1, 1);
                        }
                        if (opts === null || opts === void 0 ? void 0 : opts.shadow) {
                            if (opts.shadow.color && typeof opts.shadow.color !== "string")
                                throw new ZeewCanvasError_1["default"]("El color de la sombra debe de ser un string");
                            if (opts.shadow.blur && typeof opts.shadow.blur !== "number")
                                throw new ZeewCanvasError_1["default"]("El valor del blur debe de ser un n\u00FAmero");
                            if (opts.shadow.offsetX && typeof opts.shadow.offsetX !== "number")
                                throw new ZeewCanvasError_1["default"]("El valor del offsetX debe de ser un n\u00FAmero");
                            if (opts.shadow.offsetY && typeof opts.shadow.offsetY !== "number")
                                throw new ZeewCanvasError_1["default"]("El valor del offsetY debe de ser un n\u00FAmero");
                            if (!checkColor.test(opts.shadow.color))
                                throw new ZeewCanvasError_1["default"]("El color de la sombra debe de ser un string hexadecimal");
                            this.ctx.shadowColor = (_a = opts.shadow.color) !== null && _a !== void 0 ? _a : "#000000";
                            this.ctx.shadowBlur = (_b = opts.shadow.blur) !== null && _b !== void 0 ? _b : 0;
                            this.ctx.shadowOffsetX = (_c = opts.shadow.offsetX) !== null && _c !== void 0 ? _c : 0;
                            this.ctx.shadowOffsetY = (_d = opts.shadow.offsetY) !== null && _d !== void 0 ? _d : 0;
                        }
                        hayStroke = false;
                        if (opts === null || opts === void 0 ? void 0 : opts.stroke) {
                            if (typeof opts.stroke.color !== "string")
                                throw new ZeewCanvasError_1["default"]("El color del stroke debe de ser un string");
                            if (typeof opts.stroke.width !== "number")
                                throw new ZeewCanvasError_1["default"]("El ancho del stroke debe de ser un n\u00FAmero");
                            if (!checkColor.test(opts.stroke.color))
                                throw new ZeewCanvasError_1["default"]("El color del stroke debe de ser un string hexadecimal");
                            this.ctx.strokeStyle = (_e = opts.stroke.color) !== null && _e !== void 0 ? _e : "#000000";
                            this.ctx.lineWidth = (_f = opts.stroke.width) !== null && _f !== void 0 ? _f : 5;
                            hayStroke = true;
                        }
                        if ((opts === null || opts === void 0 ? void 0 : opts.radial) && (opts === null || opts === void 0 ? void 0 : opts.circle))
                            throw new ZeewCanvasError_1["default"]("No puede haber un valor radial y un valor circle");
                        radialImg = opts.radial;
                        if (opts === null || opts === void 0 ? void 0 : opts.radial) {
                            if (typeof opts.radial === "number")
                                radialImg = { tl: opts.radial, tr: opts.radial, br: opts.radial, bl: opts.radial };
                            else if (typeof opts.radial === "object") {
                                if (typeof opts.radial.tl !== "number" ||
                                    typeof opts.radial.tr !== "number" ||
                                    typeof opts.radial.br !== "number" ||
                                    typeof opts.radial.bl !== "number")
                                    throw new ZeewCanvasError_1["default"]("Una de las opciones del fondo radial no es un n\u00FAmero: tl = ".concat(opts.radial.tl, ", tr = ").concat(opts.radial.tr, ", br = ").concat(opts.radial.br, ", bl = ").concat(opts.radial.bl));
                                radialImg = opts.radial;
                            }
                            else
                                throw new ZeewCanvasError_1["default"]("La opci\u00F3n radial debe ser un n\u00FAmero o un objeto");
                            (0, CanvasUtils_1.fillRectangle)(this.ctx, x, y, width, height, radialImg, true, hayStroke);
                            this.ctx.clip();
                            this.ctx.drawImage(img, opts.horizontal ? -this.canvas.width : 0, opts.vertical ? -this.canvas.height : 0, this.canvas.width, this.canvas.height);
                            this.ctx.restore();
                            return [2 /*return*/, this];
                        }
                        if (opts.circle) {
                            this.ctx.beginPath();
                            this.ctx.arc(x + 0.5 * width, y + 0.5 * height, 0.5 * width, 0, 2 * Math.PI);
                            this.ctx.clip();
                            this.ctx.drawImage(img, opts.horizontal ? -this.canvas.width : 0, opts.vertical ? -this.canvas.height : 0, this.canvas.width, this.canvas.height);
                            this.ctx.restore();
                            return [2 /*return*/, this];
                        }
                        this.ctx.drawImage(img, x, y, width, height);
                        this.ctx.restore();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ZeewCanvas.prototype.buildImage = function () {
        return this.canvas.toBuffer();
    };
    ZeewCanvas.prototype._getCanvasData = function () {
        return { canvas: this.canvas, ctx: this.ctx };
    };
    return ZeewCanvas;
}());
exports.ZeewCanvas = ZeewCanvas;
