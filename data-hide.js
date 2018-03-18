const bmp = require('bmp-js')

const dataOffsetStart = 56
const offset = 8

function dataBlockHide (bmpData, info) {
  // 使用前两个字节存储数据长度
  const length = info.length;
  bmpData[dataOffsetStart] = length / 255;
  bmpData[dataOffsetStart + offset] = length % 255;

  for(let i = dataOffsetStart + offset * 2; i < bmpData.length; i += offset) {
    bmpData[i] = info.shift()
    if (info.length === 0 ) break;
  }
}

function dataBlockRead (bmpData) {
  let info = [];
  const start = dataOffsetStart;
  const length = bmpData[start] * 255 + bmpData[start + offset]
  const dataOffsetEnd = dataOffsetStart + (length + 2) * offset;

  for(let i = dataOffsetStart + offset * 2; i < dataOffsetEnd; i += offset) {
    info.push(bmpData[i]);
  } 
  return info;
}

module.exports = {
  data: {
    hide: dataBlockHide,
    read: dataBlockRead,
  }
}