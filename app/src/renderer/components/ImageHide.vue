<template>
  <div>
    <input type="file" name="image" ref="image" @change="fileHandle">
    <img :src="imageSrc" alt="">
    <br> 加密字符串：<input type="text" v-model="str"><br>
    加密方法：
    <select name="method" v-model="method" >
      <option value="header">头文件冗余加密</option>
      <option value="data">数据区改写</option>
      <option value="tail">图像尾部追加</option>
    </select>
    <br>
    <button @click="generater">生成</button>
    <br>
    <a :href="outputPath">下载</a>
    <br>
    解密文件:
    <input type="file" name="decode" ref="decode" @change="decodeFileHandle">
    <br>
    解密方法：
    <select name="method" v-model="de_method" >
      <option value="header">头文件冗余加密</option>
      <option value="data">数据区改写</option>
      <option value="tail">图像尾部追加</option>
    </select>
    <br>
    <button @click="decode">解密</button>
    {{decodeStr}}
  </div>
</template>
<script>
import hide from '@/lib/index.js';
import fs from 'fs';

export default {
  name: 'ImageHide',
  data () {
    return {
      str: '',
      method: 'data',
      imageSrc: '',
      outputPath: './static/new.bmp',
      decodePath: '',
      decodeStr: '',
      de_method: 'data',
    }
  },
  mounted () {
  },
  methods: {
    fileHandle () {
      const file = this.$refs.image.files[0];
      const imageSrc = `./static/${file.name}`;
      fs.readFile(file.path, (err, res) => {
        fs.writeFile(this.imageSrc, res, () => {
          this.imageSrc = imageSrc;
        })
      })
    },
    decodeFileHandle () {
      const file = this.$refs.decode.files[0];
      this.decodePath = file.path;
    },
    decode () {
      const { decodePath, de_method } = this;
      this.decodeStr = hide.decode(decodePath, 'data');
    },
    generater () {
      const { imageSrc, str, method, outputPath } = this;
      hide.encode(imageSrc, str, 'data', outputPath)
    }
  }
}
</script>
