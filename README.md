# Zeew-Canvas
*Zeew-Canvas es un módulo de manipulación de imágenes para crear imágenes a tu antojo de forma mucho más fácil y ordenada a la vista comprensible por cualquier desarrollador que quiera introducirse en la manipulación de imágenes pudiendo crear cosas variadas de formas más sencilla*

## Instalación y uso
*Zeew-Canvas es una rama del paquete de [Zeew](https://www.npmjs.com/package/zeew).*
*Puedes instalarlo desde tu consola con la consola (teniendo previamente instalado [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) con el comando* **npm i zeew-canvas**

*Algunas de las funciones incluidas en el paquete funcionan de forma asyncrona por lo que debes de tener encuenta el uso de* **async/await**

# Estructura
```js
const Zeew = require('zeew-canvas')
const myImage = new Zeew(800, 800)//creamos nuestro lienzo de 800 por 800 píxeles
let filter = {}//los filtros que pongamos a las imágenes deben de ir dentro de un objeto

//Recuerda que va por capas, asi que no tapas una capa con otra si no es tu intención

await myImage.setBackground({imagen: './path/to/image.jpg', filter: filter})//añadimos un fondo y añadimos filtros (sin filtros puesto que no agregamos filtros dentro del objeto)

await myImage.addImage('https.example.com/picture.jpg', 125, 125)//colocamos la imágen en una posición

filter.rotate = 90//añadimos al filtro la propiedad rotate que hace rotar las imágenes. Los valores deben de expresarse en grados

await myImage.addImage('zeew/is/the/best/zeew-chan.png', 500, 500, {width: 100, height: 100, filter: filter})//le añadimos una imagen que esta en una posicion determinado y le ponemos una medidas y rotamos con los filtros 90 grados la imagen

myImage.addText('Zeew-Chan', 90, 90, {size: 50, color: '#000000'})//añadimos un poco de texto de color negro y con un tamañao de 50 píxeles en unas determinadas coordenadas.

myImage.addText('Zeew API | Best comunity', 800, 800, {size: 100, font: 'Fantasy', color: '#0000FF', rotate: 360})//añadimos texto rotado con color azul y con una de las fuentes registradas en nuestro ordenador en unas determinadas coordenadas del lienzo!

myImage.getImage()// => obtenemos un buffer
```

## Funciones

### Constructor
Crea un lienzo de forma sencilla 😋
|Propiedades||
|-----------|-------------------------------------------------------|
|height| Agrega el **largo** del lienzo sobre el que vas a trabajar|
|width| Agrega el **ancho** del lienzo sobre el que vas a trabajar|

Ejemplo:
```js
const Zeew = require('zeew-canvas')
let image = new Zeew(900, 900)//new Zeew(width, height)
let filter = {}
```

### .setBackground()
Agrega un fondo siendo una imagen o un color sólido 🥴
|Propiedades||
|---------|:---:
|Archivo/URL/Color| Añade un color hexadecimal, una URL o color solido como fondo. Está entre llaves: `{imagen: URL/PATH} - {color: '#ffffff'}`|
|filter|Añade un filtro. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{filter: filtros}`|

Ejemplo
```js
//color
await image.setBackground({color: '#0000FF', filter: filter})

//path
filter = {rotate: 360}
await image.setBackground({imagen: 'archive.png', filter: filter})

//url
await image.setBackground({imagen: 'https://example.com/picture.png'})
```

### .addImage()
Agrega imagenes sin límite 🤓
|Propiedades||
|-----------|-------------------------------------------------------|
|Archivo/URL| Añade la imagen desde una ruta de archivo o URL válida|
|X| Añade la coordenada X para colocar la imagen|
|Y| Añade la coordenada Y para colocar la imagen|
|width| Fija el ancho de tu imagen. Esta propiedad debe estar expresada dentro de un objeto (`{}`)
|height| Fija el alto de tu imagen. Esta propiedad debe estar expresada dentro de un objeto (`{}`)
|filter| Añade un filtro. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{filter: filtros}`|

Ejemplo:
```js
await image.addImage('https://example.com/picture.png', 450, 200, {width: 100, height: 100})//añadimos una imagen!
await image.addImage('picture.jpg', 200, 200, {filter: filter})//añadimos una imagen y la rotamos 360 grados
```

### .addText()
Agrega texto al lienzo de forma sencilla 🔤
|Propiedades||
|-----------|-------------------------------------------------------|
|Texto| Añade el texto que quieras añadirle a la imagen|
|X| Añade la coordenada X para colocar tu texto|
|Y| Añade la coordenada Y para colocar tu texto|
|size|Da un tamaño de fuente a tu texto. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{size: number}`
|color|Da un color a tu texto. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{color: hexadecimal}`
|font|Escoge entre las fuentes instaldas en tu pc una fuente para tu texto. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{font: string}`
|rotate|Rota el texto en **grados** 😎. Esta propiedad está dentro de las opciones opcionales. Está entre llaves: `{rotate: number}`

Ejemplo:
```js
image.addText('Hi!', 90, 90, {size: 90, font: 'Fantasy', color: '#FF0000', rotate: 90})//agregamos un texto en determinadas coordenadas del lienzo con tamaño 90, fuente "Fantasy", color rojo y una rotación de 90 grados.
```

### .getImage()
Obtén el buffer de tu imagen 🚀.

Ejemplo:
```js
image.getImage()// => buffer
```

#### Filtros
Los filtros son una propiedad (`{filter}`) que está solamente disponible en `<img>.setBackground()` y `<img>.addImage()`.
|Propiedades||
|-|-|
|rotate (deg)|Gira la imagen en grados

### Ejemplo simple:
```js
 const mycard = new Cards(1200, 800)
  let filter = {}

  await mycard.setBackground({color: 'FCE8AB', filter: filter})
  await mycard.addImage('./path/to/zeew.png', 400, 200, {width: 800, height: 600, filter: filter})
  mycard.addText('Zeew API', 925, 80, {size: 60, color: '#000000'})
  mycard.addText('Un rincón de aprendizaje', -20, 100, {size: 80, font: 'Fantasy', color: '#000000', rotate: 90})
```
![result](https://cdn.discordapp.com/attachments/888905126717313107/934550854076354580/test.gif)
