const fs = require('fs')
const bmp = require('bmp-js')

function readBmp (filePath) {
  const bmpBuffer = fs.readFileSync(filePath)
  return bmp.decode(bmpBuffer)
}

function writeBmp (filePath, bmpData) {
  const newBmp = bmp.encode(bmpData)
  fs.writeFileSync(filePath, newBmp.data)
}

// 可以存取信息的文件头部偏移量
// 开始位置，可以存储的字节数
const fieldsOffset = [
  [36, 3],
  [40, 3],
  [44, 3],
  [48, 3],
  [52, 3],
];

function heaerInfoSave (bmpData, info) {
  if (info.length > 15) throw new Error('Info is too long.')
  let savedSize = 0;
  fieldsOffset.forEach(([startOffset, length]) => {
    const endOffset = startOffset + length;
    for (let i = startOffset; i < endOffset; i++) {
      bmpData[i] = info[savedSize]
      savedSize++
    }
  })
}

function heaerInfoRead (bmpData) {
  const info = [];

  let savedSize = 0;
  fieldsOffset.forEach(([startOffset, length]) => {
    const endOffset = startOffset + length;
    for (let i = startOffset; i < endOffset; i++) {
      info[savedSize] = bmpData[i];
      savedSize++;
    }
  })
  return info;
}

// 读取文件

const bmpPath = 'image.bmp';
const newBmpPath = 'newImage.bmp';

const bmpFile = readBmp(bmpPath);

// const info1 = heaerInfoRead(bmpFile.data);
// console.log(info1.slice(0, 5));

heaerInfoSave(bmpFile.data, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
writeBmp(newBmpPath, bmpFile);

const newBmp = readBmp(newBmpPath);
const info = heaerInfoRead(newBmp.data);
console.log(info);