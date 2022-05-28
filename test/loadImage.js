const ZeewCanvas = require('../src/ZeewCanvas')
const fs = require('fs');
const path = require('path');

async function imagen() {
    console.time()
    const card = new ZeewCanvas(1220, 1220)
    await card.setBackground({
        color: '#000000',
    })
    card.addText("HEY", 300, 300, {    
        color: "#ffffff",
        align: 'center',
        size: 100,
    })
    return card.buildImage()
}

imagen().then((buffer) => {
    console.log("[ CANVAS ]: imagen actualizada")
    fs.writeFileSync(path.join(__dirname, './image.png'), buffer);
    console.timeEnd()
})