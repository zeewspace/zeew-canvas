//requires
const Canvas = require('canvas');
const fonts = require('font-list');
const path = require('path');
const isImageUrl = require('is-image-url');
const ZeewError = require('../utils/ZeewError.js')

//data
let checkUrl = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
let checkColor = /^#([0-9A-F]{3}){1,2}$/i

class Card {
  /**
  * @param {number} ancho - El ancho de tu lienzo 👈 👉
  * @param {number} alto - La altura de tu lienzo 👆 👇
  */
  constructor(ancho, alto) {

    if (!ancho || !alto) throw new ZeewError(`Falta añadir el ${!ancho ? 'ancho' : 'alto'}.`)
    if (isNaN(ancho) || isNaN(alto)) throw new ZeewError(`Los valores Ancho y Alto deben de ser números.`)

    this.canvas = Canvas.createCanvas(ancho, alto)
    this.ctx = this.canvas.getContext('2d')
    this.background = false
    this.filter = false
    this.getFonts = {
      fonts: function(number) {
          fonts.getFonts().then(e => console.log(number ? e[number] : e))
        },
      length: function() {fonts.getFonts().then(e => console.log(e.length-1))}
     }

  }

/**
* @param {string} args - El texto a añadir
* @param {number} x - La posición X donde quieras colocar el texto
* @param {number} y - La posición Y donde quieras colocar el texto
* @param {{size: Numer, color: String, rotate: Number,font: String }} [opts] - Opciones para el texto
*/
  addText(args, x, y, opts = {size: 20, color: '#000000', rotate: 0, font: 'Arial'}) {
    this.ctx.save()
    let {size, color, rotate, font} = opts;
    if (x == null || y == null) throw new ZeewError(`Falta el siguiente valor: ${!x ? 'X' : 'Y'}`)
    if (opts.font && typeof opts.font !== 'string') throw new ZeewError(`La fuente debe de ser una string`)
    if (isNaN(x) || isNaN(y)) throw new ZeewError(`Los valores X e Y deben de ser números.`)
    if (opts.size && typeof opts.size !== 'number') throw new ZeewError(`El tamaño de fuente debe de ser un número`)
    if (opts.color && typeof opts.color !== 'string') throw new ZeewError(`El color de fuente debe de ser una string`)
    if (opts.color && !checkColor.test(opts.color)) throw new ZeewError(`El color de la fuente debe de ser un color hexadecimal`)
    if (opts.rotate && isNaN(opts.rotate)) throw new ZeewError(`El valor de la rotación tiene que ser un número.`)

    this.ctx.font = `${opts.size}px ${opts.font ?? 'Arial'}`
    this.ctx.fillStyle = `${opts.color}`

    if (opts.rotate !== 0) {
      if (opts.rotate < 0 || opts.rotate > 360) throw new ZeewError(`La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`)

      this.ctx.translate(x+0.5*size, y+0.5*opts.size)
      this.ctx.rotate(Math.PI/180*opts.rotate)
      this.ctx.translate(-(x+0.5*opts.size), -(y+0.5*opts.size))
    }

    this.ctx.fillText(args, x, y)
    this.ctx.restore()
  }

  /**
   *
   * @param {string} file - La ruta de la imagen o la url de la imagen
   * @param {{solidColor: String, rotate: Number }} opts - Opciones para la imagen
   * @returns
   */
  async setBackground(file, opts = {filter: null}) {
    this.ctx.save()
    if (opts && typeof opts !== 'object') throw new ZeewError(`El filtro debe ser un objecto`)
    if (!file && opts?.solidColor) {
      if (!checkColor.test(opts?.solidColor)) throw new ZeewError(`El color del fondo debe de ser en hexadecimal`)

      this.ctx.fillStyle = opts?.solidColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
      return this.background = true
    }
    if (this.background) throw new ZeewError(`Solo puedes añadir un fondo`)
    if (!file) throw new ZeewError(`Debes de añadir una ruta o enlace`)
    if (isImageUrl(file) == false) throw new ZeewError(`El enlace o ruta proporcionado no es una imagen`)

    file = checkUrl.test(file) == true ? file : path.resolve(file)

    //filters
    if (typeof opts?.rotate == 'number') {
      if (opts?.rotate < 0 || opts?.rotate > 360) throw new ZeewError(`La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`)

      this.ctx.translate(0.5*this.canvas.width, 0.5*this.canvas.height)
      this.ctx.rotate(Math.PI/180*opts?.rotate)
      this.ctx.translate(-(0.5*this.canvas.width), -(0.5*this.canvas.height))
    }

    const image = await Canvas.loadImage(file);

    await this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
    this.background = true
    this.ctx.restore()
  }

  /**
   *
   * @param {*} file - La ruta de la imagen o la url de la imagen
   * @param {*} x - La posición X donde quieras colocar la imagen
   * @param {*} y - La posición Y donde quieras colocar la imagen
   * @param {{width: Number, height: Number, filter: { rotate: Number } }} opts - Opciones para la imagen
   */
  async addImage(file, x, y, opts = {filter: null, width: null, height: null}) {
    this.ctx.save()
    if (!file) throw new ZeewError(`Debes de añadir una ruta o enlace`)
    if (isImageUrl(file) == false) throw new ZeewError(`El enlace o ruta proporcionado no es una imagen`)
    if (x == null || y == null) throw new ZeewError(`Falta por añadir un valor: ${!x ? 'X' : 'Y'}`)
    if (opts.width && typeof opts.width !== 'number' || opts.height && typeof opts.height !== 'number') throw new ZeewError(`El ancho y alto de la imagen deben ser números`)

    const image = await Canvas.loadImage(file)
    opts.width = opts.width ? opts.width : image.width > this.canvas.width/2 ? image.width/2.5 : image.width
    opts.height = opts.height ? opts.height : image.height > this.canvas.height/2 ? image.height/2.5 : image.height

    if (opts.filter && typeof opts.filter !== 'object') throw new ZeewError(`El filtro debe ser un objecto`)
    //filters
    if (typeof opts.filter?.rotate == 'number') {
      if (opts.filter?.rotate < 0 || opts.filter?.rotate> 360) throw new ZeewError(`La rotación se mide en grados, no puede ser ni menor a 0 grados ni mayor a 360 grados.`)

      this.ctx.translate(x+0.5*opts.width, y+0.5*opts.height)
      this.ctx.rotate(Math.PI/180*opts.filter?.rotate)
      this.ctx.translate(-(x+0.5*opts.width), -(y+0.5*opts.height))
    }

    await this.ctx.drawImage(image, x, y, opts.width, opts.height)
    this.ctx.restore()
  }

  getImage() {
    return this.canvas.toBuffer()
  }
}

module.exports = Card
//De 167 para Zeew ️️️️❤️
