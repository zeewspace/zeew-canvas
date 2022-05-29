const {ZeewCanvas} = require('../build/src/ZeewCanvas')
const fs = require('fs');
const path = require('path');

async function imagen() {
    console.time()
    const card = new ZeewCanvas(1020, 1020)
    card.setBackground({
        color: '#ffffff'
    })
    return card.buildImage()
}

imagen().then((buffer) => {
    console.log("[ CANVAS ]: imagen actualizada")
    fs.writeFileSync(path.join(__dirname, './image.png'), buffer);
    console.timeEnd()
})