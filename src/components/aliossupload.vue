<!--
图片上传
使用：<upload-img :imgMenu="depositImgSelf" :isInvert="true" :maxLimit="3" fileName="combo" @uploadSuccess="uploadDepositImgSuccess"></upload-img>
注意：（1）:imgMenu="depositImgSelf"中的depositImgSelf需要是父组件中自定义的变量，用来接后台返回的图片数组【不能直接将后台返回的数组图片放上去】
      （2）:isInvert="true",表示是否返现后台传过来的图片，一般用于编辑页面需要数据回显时
          调用接口成功以后回显时的数据处理：
          //保证金汇款证明扫描件回显
          let depositImgMenu = [];
          this.depositImgSelf.forEach((item, index, arr) => {
            let imgd = item.split("/");
            depositImgMenu.push(imgd[imgd.length - 1])
          })
          //this.goodsDetai.depositImgList中的depositImgList为后台返回的字段名
          this.goodsDetai.depositImgList = depositImgMenu;
          console.log("depositImgMenu:",depositImgMenu)
      （3）:maxLimit="3"限制上传多少张图片
      （4）fileName="combo"中的combo是根据后台返回的图片路径中的为准，例如http://img.yunzhenshi.com/lzxk/develop/combo/1541742647007.jpg中fileName为combo，而http://img.yunzhenshi.com/lzxk/develop/goods/1541402021731.jpg中的fileName为goods
      （5）@uploadSuccess中方法：
        uploadDepositImgSuccess($val) {
          console.log("保证金汇款证明扫描件$val:",$val)
          //this.goodsDetai.depositImgList中的depositImgList为后台返回的字段名
          this.goodsDetai.depositImgList = $val.fileName;
        }
-->
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
      :on-change="uploadImgChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed">
      <!--<el-button slot="trigger" size="small" type="primary"><i class="el-icon-plus"></i></el-button>-->
      <div class="uploadBtn" v-show="uploadDisabled"><i class="el-icon-plus"></i></div>
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
      },
      uploadImg_A: {//上传文件名----拼到上传路径
        type: Number
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
        uploadDisabled: true,//上传按钮是否显示，是否达到上传上限
        imglist: [],//展示图片集合
        imglistName: [],//需要传到后台图片名字集合
      };
    },
    created() {
      this.init()
    },
    computed: {},
    watch: {
      imgMenu(val) {
        if (this.$props.isInvert == true) {//是否需要反显，需要反显展示相关图片
          val.forEach((item, index, arr) => {
         // console.log("是否需要反显，需要反显展示相关图片:",item);
            this.imglist.push({url: item});
          });
        }
        if(val.length>=this.limit){
          this.uploadDisabled=false;
        }
      },
      uploadImg_A(){
        this.$refs.uploadImg.clearFiles();
      }

    },
    methods: {
      init() {
     console.log('上传凭证：',this.$props, getStore('AliOssUrlist'));
        if (getStore('AliOssUrlist')) {//获取缓存中的阿里上传凭证---获取不到重新向后台发送请求
          this.AliOssUrlist = JSON.parse(getStore('AliOssUrlist'));
          this.fileUrl = this.AliOssUrlist.aliOssDir + this.$props.fileName + '/';
        } else {
          this.AliOssUrlist = getAliOssUrl();
        }
      },
      funcUrlDel(url,paramKey){//删除上传图片成功以后图片url参数并返回不带参数的url
        if(url.indexOf("?")!="-1"){
          var urlParam = url.substr(url.indexOf("?")+1);
          var beforeUrl = url.substr(0,url.indexOf("?"));
          var nextUrl = "";

          var arr = new Array();
          if(urlParam!=""){
            var urlParamArr = urlParam.split("&");

            for(var i=0;i<urlParamArr.length;i++){
              var paramArr = urlParamArr[i].split("=");
              if(paramArr[0]!=paramKey){
                arr.push(urlParamArr[i]);
              }
            }
          }

          if(arr.length>0){
            nextUrl = "?"+arr.join("&");
          }
          url = beforeUrl+nextUrl;
          return url;
        }else{
          return url;
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
        client.multipartUpload(this.actionUrl, req.file).then(res => {});
      },
      uploadImgChange(file, fileList){//文件上传
        console.log('文件上传file',file);
        console.log('文件上传fileList',fileList);
        var imgtype = file.name.toLowerCase().split('.');

        let arr1=[];
        fileList.forEach(function(item){
          if(item.status=='success'){
            let path=item.url;
            let filename='';//从路径中截取图片名[包括后缀名]
            if(path.indexOf("/")>0){//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
              filename=path.substring(path.lastIndexOf("/")+1,path.length);
            }else{
              filename=path;
            }
            arr1.push(filename);
          }else{
            arr1.push(item.uid+'.'+imgtype[1]);
          }
        });
        if(fileList.length>=0){
          this.uploadDisabled=true;
        }
        if(fileList.length>=this.limit){
          this.uploadDisabled=false;
        }
        this.$emit('uploadSuccess', {fileName: arr1});
      },
      removeByValue(arr, val) {//删除数组中指定元素
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
        return arr;
      },
      handleRemove(file, fileList) {//删除图片
        console.log('删除图片file',file);
        console.log('删除图片fileList',fileList);
        let arr1=[];
        fileList.forEach(function(item,index){
          console.log("item.url:"+index+":",item.url)
          let path=item.url;
          let filename='';//从路径中截取图片名[包括后缀名]
          if(path.indexOf("/")>0){//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
            filename=path.substring(path.lastIndexOf("/")+1,path.length);
          }else{
            filename=path;
          }
          arr1.push(filename);
        });
        if(fileList.length>=0){
          this.uploadDisabled=true;
        }
        if(fileList.length>=this.limit){
          this.uploadDisabled=false;
        }
        this.$emit('uploadSuccess', {fileName: arr1});
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handlePictureCardPreview(file) {//放大图片
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisible = true;
      },

      beforeAvatarUpload(file) {// 图片长传-之前校验
        console.log("file:",file)
        this.showNoticeUploading = true
        let type = file.name.split('.')[1];
        this.actionUrl = this.fileUrl + file.uid + '.' + type;
        console.log(this.actionUrl);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        //   return
        // }
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

  .el-upload--picture-card {
    width: auto;
    height: auto;
    border: none;
  }
  .el-upload {
    /*display:none!important;*/

  }

  .uploadBtn{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
    cursor: pointer;
    outline: 0;
  }
</style>
