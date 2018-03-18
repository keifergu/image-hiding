const fs = require('fs')
const bmp = require('bmp-js')
const imageHide = require('./data-hide.js')

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

function headerInfoSave (bmpData, info) {
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

function headerInfoRead (bmpData) {
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
const dataBmpPath = 'dataImage.bmp'

const bmpFile = readBmp(bmpPath);
const data = [255,255,3,4,5,6,7,8,9,10,11,12,12,123,123,134,23,11,32]

function test (hide, read, path) {
  hide(bmpFile.data, data);
  writeBmp(path, bmpFile);
  const readData = read(readBmp(path).data);
  for (let i = 0; i < data.length; i++) {
    if (readData[i] !== data[i]) {
      console.log(false);
      return;
    } 
  }
  console.log(true);
}

test(imageHide.data.hide, imageHide.data.read, dataBmpPath)
/**
 * 将字符串转换为编码数组
 * @param {String} str 需要转换的字符串
 * @return 转换后的编码数组
 */
function stringToCodeList (str) {
  const codeList = str.split('').map(char => char.charCodeAt(0))
  return codeList;
}

/**
 * 将编码数组转换为字符串
 * @param {Array} codeList 转换好的编码数组
 */
function codeListToString (codeList) {
  return String.fromCharCode(...codeList);
}
