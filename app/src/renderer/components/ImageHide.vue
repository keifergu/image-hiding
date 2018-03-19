<template>
  <div class="con">
    <h1 style="text-align:center;">数据图像隐藏</h1>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-change="fileHandle">
      <img v-if="imageSrc" :src="imageSrc" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="de-str">
      <span>加密字符串：</span>
      <div style="width: 200px;"><el-input v-model="str" placeholder="请输入加密内容"></el-input></div>
    </div>
    <div class="de_method">
      <span>加密方法：</span>
      <el-select v-model="method" placeholder="请选择加密方法">
        <el-option value="header" label="头文件冗余加密" />
        <el-option value="data" label="数据区改写" />
        <el-option value="tail" label="图像尾部追加" />
      </el-select>
    </div>
    <div>
      <el-button type="primary" @click="generater">生成加密图像</el-button>
      <a :href="outputPath">下载加密图像</a>
    </div>
    <hr>
    <div>
      <div>解密文件:</div>
      <div>
        <input type="file" name="decode" ref="decode" @change="decodeFileHandle">
      </div>
    </div>
    <div>
      <div>
        解密方法：
      </div>
      <div>
        <el-select v-model="de_method" placeholder="请选择加密方法">
          <el-option value="header" label="头文件冗余加密" />
          <el-option value="data" label="数据区改写" />
          <el-option value="tail" label="图像尾部追加" />
        </el-select>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="decode">解密图像</el-button>
    </div>
    <div>解密结果:</div>
    <div>{{decodeStr}}</div>
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
    fileHandle (fileObj) {
      const file = fileObj.raw;
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
      hide.encode(imageSrc, str, 'data', outputPath);
      this.$message('加密成功，请点击下载');
    }
  }
}
</script>

<style>
  .con {
    margin: 20px;
  }

  div {
    margin-top: 5px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .de-str {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .de-method {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>

