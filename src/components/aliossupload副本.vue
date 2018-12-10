<template>
  <div>
    <el-upload
      ref="uploadImg"
      :action="actionUrl"
      list-type="picture-card"
      multiple
      :limit="limit"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      :http-request="upqiniu"
      :file-list="imglist"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :class="{disabled:uploadDisabled}">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {getStore, getAliOssUrl} from 'src/config/cache'

  export default {
    props: {
      imgMenu: {//反显图片集合
        type: Array
      },
      maxLimit: {//图片上传上限
        type: Number,
        default: 5
      },
      isInvert: {//是否反显
        type: Boolean
      },
      fileName: {//上传文件名----拼到上传路径
        type: String
      }

    },
    data() {
      return {
        limit: this.$props.maxLimit,//图片上传上限
        AliOssUrlist: [], //签名等上传凭证
        actionUrl: '',  //上传路径
        fileUrl: '',//
        dialogImageUrl: '', //图片放大路径
        dialogVisible: false,//图片放大	弹窗隐藏
        uploadDisabled: false,//是否达到上传上限
        imglist: [],//展示图片集合
        imglistName: []//需要传到后台图片名字集合
      };
    },
    created() {
      this.init()
    },
    computed: {},
    watch: {
      imgMenu(val) {
        console.log(val);
        if (this.$props.isInvert == true) {//是否需要反显，需要反显展示相关图片
          val.forEach((item, index, arr) => {
            console.log(item);
            this.imglist.push({url: item});
          });
        }
      }

    },
    methods: {
      init() {
        console.log(this.$props, getStore('AliOssUrlist'));
        if (getStore('AliOssUrlist')) {//获取缓存中的阿里上传凭证---获取不到重新向后台发送请求
          this.AliOssUrlist = JSON.parse(getStore('AliOssUrlist'));
          this.fileUrl = this.AliOssUrlist.aliOssDir + this.$props.fileName + '/';

        } else {
          this.AliOssUrlist = getAliOssUrl();
        }
      },
      upqiniu(req) {//上传到阿里----达到上限时隐藏上传弹窗；
        let OSS = require('ali-oss').Wrapper;
        let client = new OSS({
          region: this.AliOssUrlist.ossRegion,
          accessKeyId: this.AliOssUrlist.ossKey,
          accessKeySecret: this.AliOssUrlist.ossSecret,
          bucket: this.AliOssUrlist.ossBucket
        });
        client.multipartUpload(this.actionUrl, req.file).then(res => {
          console.log(res.res.requestUrls)
          this.imglist.push({url: res.res.requestUrls});
          const num = this.limit - 1;
          let name = res.name.split('/');
          name = name[name.length - 1];
          this.imglistName.push(name);
          this.imglist.length > num ? this.uploadDisabled = true : this.uploadDisabled = false;
          this.$emit('uploadSuccess', {fileName: this.imglistName});
        });
        console.log(this.fileUrl)
      },

      handleRemove(file, fileList) {//删除图片
        console.log(file);
        let name = file.url[0].split('/');
        console.log(name);
        name = name[name.length - 1];
        console.log(name)
        this.imglistName = this.imglistName.filter((item) => item != name);
        console.log("组件代码删除图片this.imglistName:",this.imglistName);
        if (this.imglist.length < this.limit && this.uploadDisabled == true) {//当图片小于最大值并且没有上传图片
          this.uploadDisabled = false;
        }else{
          this.uploadDisabled = true;
        }
        this.$emit('uploadSuccess', {fileName: this.imglistName});
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handlePictureCardPreview(file) {//放大图片
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisible = true;
      },

      beforeAvatarUpload(file) {// 图片长传-之前校验

        this.showNoticeUploading = true
        let type = file.name.split('.')[1];
        this.actionUrl = this.fileUrl + file.uid + '.' + type;
        console.log(this.actionUrl);
        console.log(this.actionUrl)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!')
          return
        }
      }

    }
  };
</script>
<style type="text/css">
  .oss_file {
    height: 100px;
    width: 100%;

  }

  .oss_file input {
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
