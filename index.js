const fs = require('fs')
const bmp = require('bmp-js')

const bmpBuffer = fs.readFileSync('image.bmp')
const bmpData =  bmp.decode(bmpBuffer)
console.log(bmpData);
