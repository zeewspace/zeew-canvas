"use strict";
exports.__esModule = true;
exports.jumpStroke = exports.jumpText = exports.fillRectangle = void 0;
function fillRectangle(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined")
        stroke = true;
    if (typeof radius === "undefined")
        radius = 5;
    if (typeof radius === "number")
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    if (fill)
        ctx.fill();
    if (stroke)
        ctx.stroke();
}
exports.fillRectangle = fillRectangle;
function jumpText(ctx, text, x, y, width, height, maxWidth) {
    var palabrasRy = text.split(" ");
    var lineaDeTexto = "";
    for (var i = 0; i < palabrasRy.length; i++) {
        var testTexto = lineaDeTexto + palabrasRy[i] + " ";
        var textWidth = ctx.measureText(testTexto).width;
        if (textWidth > width && i > 0) {
            ctx.fillText(lineaDeTexto, x, y, width);
            lineaDeTexto = palabrasRy[i] + " ";
            y += height;
        }
        else
            lineaDeTexto = testTexto;
    }
    ctx.fillText(lineaDeTexto, x, y, width);
}
exports.jumpText = jumpText;
function jumpStroke(ctx, text, x, y, widthLimit, height, maxWidth) {
    var palabrasRy = text.split(" ");
    var lineaDeTexto = "";
    for (var i = 0; i < palabrasRy.length; i++) {
        var testTexto = lineaDeTexto + palabrasRy[i] + " ";
        var textWidth = ctx.measureText(testTexto).width;
        if (textWidth > widthLimit && i > 0) {
            ctx.strokeText(lineaDeTexto, x, y, maxWidth);
            lineaDeTexto = palabrasRy[i] + " ";
            y += height;
        }
        else
            lineaDeTexto = testTexto;
    }
    ctx.strokeText(lineaDeTexto, x, y, maxWidth);
}
exports.jumpStroke = jumpStroke;
