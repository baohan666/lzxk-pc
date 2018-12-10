<template>
  <div class="edit_wraper">
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
      <div class="detail_content">
        <el-form :model="ruleForm" :inline="true" label-width="80px" ref="ruleForm" :rules="rules"
                 class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="物料名称" prop="goodsName">
                <el-input v-model="ruleForm.goodsName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="物料编码" prop="materialCode">
                <el-input v-model="ruleForm.materialCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="生产企业" prop="manufacturer">
                <el-select v-model="ruleForm.manufacturer">
                  <!--<el-option label="请选择生产企业" value='0'></el-option>-->
                  <el-option v-for="(item,key,index) in manufacturerMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="剂型" prop='drugType'>
                <el-select v-model="ruleForm.drugType">
                  <!--<el-option label="请选择剂型" value='0'></el-option>-->
                  <el-option v-for="(item,key,index) in drugTypeMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="规格" prop="specsMax">
                <el-input v-model="ruleForm.specsMax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="包装规格" prop="specsMin">
                <el-input v-model="ruleForm.specsMin"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="物料类别" prop="category">
                <el-select v-model="ruleForm.category">
                  <!--<el-option label="请选择物料类别" value='0'></el-option>-->
                  <el-option v-for="(item,key,index) in categoryMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="批准文号">
                <el-input v-model="ruleForm.licenseNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="单位" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="版本号">
                <el-input v-model="ruleForm.version"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="grid-content"><span class="text-justify goodsImg_title">商品图片</span></div>
            </el-col>
            <div class="div-inline uploadImg_box">
              <upload-img :isInvert="false" :maxLimit="5" fileName="goods" @uploadSuccess="uploadSuccess"></upload-img>
            </div>
            <span class="uploadImg_tip">请上传图片，最多上传5张</span>
          </el-row>
          <div class="operateWraper">
            <div class="div-inline el-button-red" @click="toSave('ruleForm')">保存</div>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogHintVisible" :append-to-body='true' width="35%">
      <div class='dialog_body_content'>
        <div class="prompText">恭喜您，商品上传成功!</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-sure-btn dialoperateBtn" @click="keepUploadImg('ruleForm')">继续上传</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getStore, setDepartment,} from 'src/config/cache'
  import uploadImg from 'components/aliossupload'//上传图片组件


  import {
    uploadGoods,
    getManufacturData,
    getCategoryListData,
    getdrugTypeData
  } from 'src/api/headquarter_url/goodsManage';

  export default {
    name: 'uploadGoods',
    data() {
      return {
        ruleForm: {
          goodsName: ''       //商品名称
          , materialCode: ''    //物料编码
          , manufacturer: ''    //生产厂家--选中
          , category: ''        //物料类别---选中
          , drugType: ''		 //剂型---选中
          , specsMin: ''         //包装规格
          , specsMax: ''         //规格
          , unit: ''              //单位
          , version: ''           //版本号
          , licenseNumber: ''    //批准文号
          , goodsImgs: ''       //商品图片
        }
        , manufacturerMenu: []  //生产厂家下拉数据
        , categoryMenu: []		//物料类别下拉数据
        , drugTypeMenu: []      //剂型下拉数据

        , dialogHintVisible: false
        , rules: {
          goodsName: [
            {required: true, message: '请输入物料名称', trigger: 'blur'}

          ],
          materialCode: [
            {required: true, message: '请输入物料编码', trigger: 'blur'}

          ],
          manufacturer: [
            {required: true, message: '请选择生产企业', trigger: 'change'}

          ],
          drugType: [
            {required: true, message: '请选择剂型', trigger: 'change'}
          ],
          specsMax: [
            {required: true, message: '请输入规格', trigger: 'blur'}

          ],
          specsMin: [
            {required: true, message: '请输入包装规格', trigger: 'blur'}

          ],
          category: [
            {required: true, message: '请选择物料类别', trigger: 'change'}
          ],
          unit: [
            {required: true, message: '请输入单位', trigger: 'blur'}
          ]
        }

      }
    },
    created() {
      this.init();
    },
    components: {
      uploadImg,

    },
    inject: ['reload'],//provide / inject组合解决--重新加载避免闪烁
    methods: {

      init() {
        //获取生产企业
        getManufacturData().then(res => {
          this.manufacturerMenu = res.data.data;
        });
        //获取物料类别
        getCategoryListData("").then(res => {
          this.categoryMenu = res.data.data;
        });
        //获取剂型
        getdrugTypeData("").then(res => {
          this.drugTypeMenu = res.data.data;
        });
      },

      uploadSuccess($val) {
        console.log($val.fileName);
        this.ruleForm.goodsImgs = $val.fileName.join(",");
        console.log(this.ruleForm.goodsImgs);
      },


      toSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            let datalist = this.ruleForm;
            console.log(datalist);
            if (datalist.goodsName.trim()==''){
              alert("商品名称不能为空");
              datalist.goodsName = '';
              return;
            }else if (datalist.materialCode.trim()==''){
              alert("物料编码不能为空");
              datalist.materialCode = '';
              return;
            } else if (datalist.specsMin.trim()==''){
              alert("包装规格不能为空");
              datalist.specsMin = '';
              return;
            } else if (datalist.specsMax.trim()==''){
              alert("规格不能为空");
              datalist.specsMax = '';
              return;
            } else if (datalist.unit.trim()==''){
              alert("单位不能为空");
              datalist.unit = '';
              return;
            }
            uploadGoods(datalist).then(res => {
              this.dialogHintVisible = true;
            })
          } else {
            return false;
          }
        });
      },
      keepUploadImg() {//重新加载页面---不刷新
        this.reload();
      }

    }
  }
</script>

<style lang='scss'>

  .grid-content, .el-row-content, .content-wrapper, .edit_wraper {
    height: 100%;
  }

  .el-form--inline .el-form-item__content {
    vertical-align: middle;
  }

  .el-form-item__label {
    /*		width:80px;*/
    color: #333;
    text-align: justify;
    text-align-last: justify;
    text-justify: inter-ideograph; /*IE*/
    text-align-last: inter-ideograph;
  }

</style>


<style lang="scss" scoped>
  .containInfo_wraper {
    margin: 20px 30px;
    /*height: calc(100% - 80px);*/
    background: #ffff;
    border: 1px solid #e6e6e6;
    /*overflow: hidden;*/
    .detail_title {
      padding: 0 20px;
      line-height: 50px;
      color: #1f5dbc;
      font-size: 14px;
      .line_Icon {
        display: inline-block;
        width: 4px;
        height: 14px;
        vertical-align: middle;
        margin-right: 5px;
        border-radius: 20%;
        background: #1f5dbc;
      }
      border-bottom: 1px solid #e6e6e6;
    }
    .detail_content {
      padding: 15px 29px;
      line-height: 49px;
      font-size: 14px;
      .operateWraper {
        margin: 50px;
        text-align: center;
        .el-button-red {
          padding: 0 0.5rem;
        }
      }
      .goodsImg_title {
        display: inline-block;
        width: 80px;

      }

    }
    .uploadImg_box {
      vertical-align: middle;
    }
    .uploadImg_tip {
      color: #e02222;
      font-size: 12px;
      padding-left: 20px;
    }

  }

  .dialog_body_content {
    .prompText {
      color: #333;
      text-align: center;
      line-height: 140px;
    }
  }
</style>
