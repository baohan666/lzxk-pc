<template>
  <div class="creatBusiCompany">
    <go-back title="编辑商业公司"></go-back>
    <el-form :model="ruleForm" :inline="true" ref="ruleForm" :rules="rules" class="demo-form-inline">
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
        <div class="detail_content">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="客户编码：" prop="bill.customerCode">
                <el-input v-model="ruleForm.bill.customerCode" placeholder="请输入客户编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="商业公司名称：" prop="bill.company">
                <el-input v-model="ruleForm.bill.company" placeholder="请输入商业公司名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户基本分类：" prop="bill.customerType2">
                <el-select v-model="ruleForm.bill.customerType2" placeholder="请选择客户分类">
                  <el-option label="GSP商业用户" value="1" key="1"></el-option>
                  <el-option label="自然人" value="2" key="2"></el-option>
                  <el-option label="非药品经营客户" value="3" key="3"></el-option>
                  <el-option label="医疗终端客户" value="4" key="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="所在地区：" class="is-required" prop='bill.drugType'>
                <address-plugin
                  :getProvince="getProvince"
                  :getCounty="getCounty"
                  :getCity="getCity"
                  @seleSuccess="seleSuccess"
                  required='false'></address-plugin>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="企业地址：" prop="bill.companyAddress">
                <el-input v-model="ruleForm.bill.companyAddress" placeholder="请输入企业地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="纳税人登记号：" prop="bill.taxpayerCode">
                <el-input v-model="ruleForm.bill.taxpayerCode" placeholder="请输入纳税人登记号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="法人代表：" prop="bill.bossName">
                <el-input v-model="ruleForm.bill.bossName" placeholder="请输入法人代表"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="企业年报：" prop="bill.annualReport">
                <el-input v-model="ruleForm.bill.annualReport" placeholder="请输入企业年报"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="电话1：" prop="bill.phoneOne">
                <el-input type="tel" v-model="ruleForm.bill.phoneOne" placeholder="请输入电话1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="电话2：">
                <el-input type="tel" v-model="ruleForm.bill.phoneTwo" placeholder="请输入电话2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <el-form :model="ruleForm" :inline="true" class="demo-form-inline">
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>账户信息：</div>

        <el-radio-group v-model="ruleForm.numberSign">
          <div class="detail_content" v-for='(item,index) in ruleForm.bankAccount' :key="index">
            <div class="account_block_title">
              账户{{index + 1}}
              <span class="marginL30" v-if="ruleForm.numberSign!=index+1">
								<el-button type="primary" plain size="mini" round @click="delAccount(index)">删除</el-button>
							</span>
            </div>
            <my-account ref="accountInfo" :datalist="item" :getIndex="index+1"></my-account>
          </div>
        </el-radio-group>
        <div class="el-button-blue" @click="toAddAccount()">+添加账户</div>
      </div>
    </el-form>

    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>资质信息：</div>
      <div class="detail_content qualifiInfo_wraper">
        <div class='qualifiInfo_table'>
          <el-row>
            <el-col :span="4">资质名称</el-col>
            <el-col :span="4"><i class="requireStar">*</i>证照编码</el-col>
            <el-col :span="4">颁发机构</el-col>
            <el-col :span="4">颁发日期</el-col>
            <el-col :span="4"><i class="requireStar">*</i>有效期至</el-col>
            <el-col :span="2">经营范围</el-col>
            <el-col :span="2">附件</el-col>
          </el-row>
          <el-row v-for='(item,index) in ruleForm.qualificationInfo' :key="index">
            <el-col :span="4">
              <i class="requireStar"
                 v-if="item.qualificationName=='营业执照' || item.qualificationName=='药品经营许可证' || item.qualificationName=='GSP认证证书'">*</i>
              {{item.qualificationName}}
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.licenseCode" placeholder="请输入证照编码" prop="infoList.licenseCode">
                <template slot="prepend"
                          v-if="item.qualificationName=='营业执照' || item.qualificationName=='药品经营许可证' || item.qualificationName=='GSP认证证书'">
                  *必填
                </template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.issueOrganization" placeholder="请输入颁发机构"></el-input>
            </el-col>
            <el-col :span="4">
              <datepicker value-format="yyyy-MM-dd" :starTim="item.issueDate" startIsShow="true" class="div-inline effectiveDate" @changeSelect="((item)=>{changeSelect(item, index, 'issueDate')})"></datepicker>
            </el-col>
            <el-col :span="4">
              <div class="el-input el-input-group"
                   :class="item.qualificationName=='营业执照' || item.qualificationName=='药品经营许可证' || item.qualificationName=='GSP认证证书'?'el-input-group--prepend':''">
                <div class="el-input-group__prepend"
                     v-if="item.qualificationName=='营业执照' || item.qualificationName=='药品经营许可证' || item.qualificationName=='GSP认证证书'">
                  *必填
                </div>
                <datepicker
                  value-format="yyyy-MM-dd"
                  :starTim="item.validDate"
                  startIsShow="true"
                  class="div-inline effectiveDate"
                  @changeSelect="((item)=>{changeSelect(item, index, 'validDate')})">

                </datepicker>
              </div>
            </el-col>
            <el-col :span="2">
              <i class="requireStar" v-if="item.qualificationName=='药品经营许可证'">*</i>
              <span v-if='!item.businessRange' class="operateBtn"
                    @click="dialogAddVisible = true;operate_index = index">添加</span>
              <span v-else='item.businessRange' class="operateBtn"
                    @click="dialogAddVisible = true;operate_index = index;dialogAddlist=item.list">编辑</span>
            </el-col>
            <el-col :span="2">
              <span v-if='!item.accessory' class="operateBtn" @click="dialogUploadVisible = true;operate_index = index">上传</span>
              <span v-else='item.accessory' class="operateBtn"
                    @click="dialogUploadVisible = true;operate_index = index;imgList=item.imgList">编辑</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="operateWraper">
      <div class="div-inline el-button-red" @click="toSave_addBC('ruleForm')">保存</div>
    </div>

    <el-dialog title="添加经营范围" :visible.sync="dialogAddVisible" :append-to-body='true'>
      <div class="dialog_body_title">
        <span class="textTip">药品经营许可证</span>
        <span class="diolog_add_btn" @click="add_btn">新增</span>
      </div>
      <div class="dialog_body_content">
        <div class='qualifiInfo_table'>
          <el-row>
            <el-col :span="9">名称</el-col>
            <el-col :span="9">编码</el-col>
            <el-col :span="6">操作</el-col>
          </el-row>
          <el-row v-for='(item,index) in dialogAddlist' :key="index">
            <el-col :span="9">
              <el-select v-model="item.typeName" filterable remote reserve-keyword placeholder="请输入药品关键词"
                         @change="((item)=>{currentSel(item, index)})"
                         :remote-method="((item)=>{remoteMethod(item, index)})"
                         :loading="loading">
                <el-option
                  v-for="(menu,index) in options[index]"
                  :key="index"
                  :label="menu.typeName"
                  :value="menu">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="9">{{item.code}}</el-col>
            <el-col :span="6">
              <span class="operateBtn" @click="delete_btn(index)">删除</span>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoPerateBtn" @click="dialogAddVisible = false">取消</span>
        <span class="dialog-sure-btn dialoPerateBtn" @click="add_sure">确定</span>
      </div>
    </el-dialog>
    <el-dialog title="附件上传" :visible.sync="dialogUploadVisible" :append-to-body='true'>
      <div class='dialog_body_content'>
        <span class="tipInfo">请上传图片，最多上传5张</span>
        <upload-img :maxLimit='5' :fileName="bill" :imgMenu="imgList" :isInvert="true"
                    @uploadSuccess="uploadSuccess"></upload-img>

      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoPerateBtn" @click="dialogUploadVisible = false">取消</span>
        <span class="dialog-sure-btn dialoPerateBtn" @click="upload_sure">确定</span>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import goBack from 'src/components/goBack';
  import datepicker from 'components/data-plugin';
  import addressPlugin from 'components/address';
  import myAccount from 'components/accountMoudle';
  import uploadImg from 'components/aliossupload'//上传图片组件
  import {
    checkBusiCmpyEdit,
    saveBusiCmpyDataEdit,
    getbusiRangeData,
    viewBusiCmpy
  } from 'src/api/headquarter_url/customerManage';//调接口

  export default {
    name: 'uploadGoods',
    data() {
      return {
        bill: "bill",//上传阿里文件路径
        getProvince: '',//获取省地县
        getCounty: '',//获取省地县
        getCity: '',//获取省地县
        ruleForm: {//保存请求数据
          address: {
            provinceCode: ''//省区code
            , cityCode: ''//市区code
            , countyCode: ''//县区code
            , provinceName: ''//省区
            , cityName: ''//市区
            , countyName: ''//县区
          },
          bill: {
            id:''//商业公司id
            ,company: ''  //商业公司名称
            , customerCode: '' //客户编码
            , customerType2: ''//客户类型 1GSP商业用户2自然人3非药品经营客户4医疗终端客户
            , taxpayerCode: ''//纳税人登记号
            , phoneOne: ""//电话1
            , phoneTwo: ""//电话2
            , bossName: ''//法人姓名
            , companyAddress: ''//企业地址
          },//账户信息
          bankAccount: [
            {
              accountNumber: ''//账号
              , accountName: ''//户名
              , depositBank: ''//开户银行
              , accountType: ''//账户性质
              , number: ''//zhanghao
            },
          ],
          qualificationInfo: [],	//资质信息
          numberSign: '1'//默认账号
        },
        rules: {//校验基本信息
          address: {
            countyCode: [{required: true, message: '请选择地区', trigger: 'blur'}],
          },
          bill: {
            companyAddress: [{required: true, message: '请输企业地址', trigger: 'change'}],
            company: [{required: true, message: '请输入商业公司名称', trigger: 'blur'}],
            customerCode: [{required: true, message: '请输入客户编码', trigger: 'blur'}],
            customerType2: [{required: true, message: '请选择客户基本分类', trigger: 'change'}],
            taxpayerCode: [{required: true, message: '请输入纳税人登记号', trigger: 'blur'}],
            bossName: [{required: true, message: '请输入法人代表', trigger: 'blur'}],
            phoneOne: [{required: true, message: "请输入电话1", trigger: 'blur'}],
            accountNumber: [{required: true, message: '请输入账号', trigger: 'blur'}],
            annualReport: [{required: true, message: '请输入企业年报', trigger: 'blur'}],
          }
        }
        , imgList: []
        , dialogAddVisible: false//添加编辑弹窗显示隐藏
        , dialogUploadVisible: false//上传编辑弹窗显示隐藏
        , operate_index: 0
        , dialogAddlist: [{code: '', id: '', typeName: ''},]
        , loading: false
        , options: [],

      }
    },
    mounted() {
      this.init();
    },
    components: {
      goBack,
      uploadImg,
      addressPlugin,
      myAccount,
      datepicker
    },
    methods: {
      //初始化数据据
      init: function () {
        if (this.$route.query.id) {
          viewBusiCmpy({billId: this.$route.query.id}).then(res => {
            let datas = res.data.data;
            this.ruleForm.address.companyName = datas.bill.companyAddress;
            this.ruleForm.bill = datas.bill;

            this.ruleForm.bankAccount = datas.bankAccount;
            for(let i=0;i<datas.bankAccount.length;i++){
              if(datas.bankAccount[i].isDefault2=='1'){
                this.ruleForm.numberSign = i+1;//编辑页初始化默认按钮
                break;
              }
            }
            this.ruleForm.qualificationInfo = datas.qualificationInfo;
            this.getAddress = datas.bill;
            this.getProvince = datas.bill.provinceCode;
            this.getCounty = datas.bill.countyCode;
            this.getCity = datas.bill.cityCode;


            this.ruleForm.address.provinceCode = datas.bill.provinceCode;
            this.ruleForm.address.cityCode = datas.bill.cityCode;
            this.ruleForm.address.countyCode = datas.bill.countyCode;
            this.ruleForm.address.provinceName = datas.bill.provinceName;
            this.ruleForm.address.cityName = datas.bill.cityName;
            this.ruleForm.address.countyName = datas.bill.countyName;

          });
          return false;

        }
      },

      //企业地址
      seleSuccess($val) {
        this.ruleForm.address.provinceCode = $val.provinceCode;
        this.ruleForm.address.cityCode = $val.cityCode;
        this.ruleForm.address.countyCode = $val.countyCode;
        this.ruleForm.address.provinceName = $val.provinceName;
        this.ruleForm.address.cityName = $val.cityName;
        this.ruleForm.address.countyName = $val.countyName;
      },

      //添加账户
      toAddAccount: function () {
        let BankAc = {
          accountNumber: ''//账号
          , accountName: ''//户名
          , depositBank: ''//开户银行
          , accountType2: ''//账户性质
          , isDefault: ''//是否默认
        };
        this.ruleForm.bankAccount.push(BankAc);
      },
      //删除账户
      delAccount(index){
        console.log("this.ruleForm.bankAccount:",this.ruleForm.bankAccount)
    		this.ruleForm.bankAccount.splice(index,1);
        this.ruleForm.numberSign = 1;//删除以后将第一个账号设置为默认账号
        console.log('删除账户:',index);
      },
      //编辑商业公司保存
      toSave_addBC(formName) {
        this.$refs.accountInfo.forEach((item, index, arr) => {
          this.$refs.accountInfo[index].toExamin();
        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let busiCompy = this.ruleForm.bill.company;
            let billId = this.ruleForm.bill.id;

            checkBusiCmpyEdit({companyName: busiCompy,billId:billId}).then(res => {
              if (res.data.code = 1) {
                let datalist = {'businessCompany': JSON.stringify(this.ruleForm)};
                saveBusiCmpyDataEdit(datalist).then((res)=>{
                  this.$router.go(-1);
                })
              }
            })
          } else {
            this.$message.success("请将必填项填写完整！")
            return false;
          }
        });
      },
      //有效期至
      changeSelect(val, index, type) {
        type == "validDate" ? this.ruleForm.qualificationInfo[index].validDate = val.data : this.ruleForm.qualificationInfo[index].issueDate = val.data;
      },

      //添加经营范围
      add_btn() {
        let jl = {code: '', id: '', typeName: ''};
        this.dialogAddlist.push(jl);
        this.options.push(jl);
      },
      //实施获取药品经营范围
      remoteMethod(query, index) {
        if (query !== '') {
          this.loading = true;
          getbusiRangeData({typeName: query}).then(res => {
            this.loading = false;
            this.options[index] = res.data.data;
          })
        } else {
          this.options[index] = {};
        }

      },
      //选中药品，显示对应code值
      currentSel(item, index) {
        this.dialogAddlist[index] = item;
      },
      //删除药品范围
      delete_btn(index) {
        if (this.dialogAddlist.length > 1) {
          this.dialogAddlist.splice(index, 1);
          this.options.splice(index, 1);
        }
      },
      //添加经营范围确定按钮
      add_sure() {
        this.dialogAddVisible = false;
        let ids = ''
        this.dialogAddlist.forEach((item, index, arr) => {
          if (item.id != '') {
            ids += item.id + ','
          }
        })

        this.ruleForm.qualificationInfo[this.operate_index].businessRange = ids;
      },
      //上传图片
      uploadSuccess($val) {
        this.ruleForm.qualificationInfo.customDetai += $val.fileName + ',';
      },
      //上传图片确定按钮
      upload_sure() {
        this.dialogUploadVisible = false;
      }
    }
  }
</script>

<style lang='scss'>
  .creatBusiCompany {
    .grid-content, .el-row-content, .content-wrapper, .edit_wraper {
      height: 100%;
    }
    .el-form--inline .el-form-item__content {
      vertical-align: middle;
    }
    .el-input--suffix .el-input__inner {
      padding-right: 15px;
    }
    .el-input-group__prepend {
      padding: 0 6px;
      color: #e02222;
    }
    .el-dialog__body {
      padding: 0 0 30px !important;
    }
    .el-date-editor.el-input {
      width: 100% !important;
    }
  }
</style>

<style lang="scss" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @mixin ft($dirc) {
    float: $dirc;
  }

  @mixin wh($w,$h) {
    width: $w;
    height: $h;
    line-height: $h;
  }

  .goBackWraper {
    span {
      @include ft(left);
      line-height: 40px;
    }
    .backBtn {
      @include wh(90px, 40px);
      @include ft(right);
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #e02222;
      border-radius: 2px;
    }
  }

  .creatBusiCompany {
    .containInfo_wraper {
      margin: 20px 30px;
      .qualifiInfo_table {
        border-top: 1px solid #eae2e0;
        border-left: 1px solid #eae2e0;
        .el-row:first-child {
          background: #ebeefb;
        }
        .requireStar {
          color: #e02222;
          padding-right: 4px;
        }
        .el-row {
          .el-col:first-child {
            background: #ebeefb;
          }
          .el-col {
            padding: 0 10px;
            text-align: center;
            border-bottom: 1px solid #eae2e0;
            border-right: 1px solid #eae2e0;
            .operateBtn {
              color: #1f5dbc !important;
              cursor: pointer;
            }
          }
        }
      }
      height: calc(100% - 80px);
      background: #ffff;
      border: 1px solid #e6e6e6;
      overflow: hidden;
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
        padding: 10px 29px 0;
        line-height: 49px;
        font-size: 14px;
        .account_block_title {
          line-height: 30px;
        }
      }
      .qualifiInfo_wraper {
        margin: 30px 0;

      }
    }
    .operateWraper {
      margin: 20px;
      text-align: center;
      .el-button-red {
        padding: 0 0.5rem;
      }

    }
    .effectiveDate {
      /*margin-left:-10px;*/
      width: 100%;
    }
  }

  .el-button-blue {
    margin: 0 0 20px 30px;
    color: #1f5dbc;
    font-size: 15px;
  }

  .dialog_body_title {
    padding: 6px 28px;
    border-bottom: 1px solid #e6e6e6;
    line-height: 36px;
    .diolog_add_btn {
      @include wh(100px, 36px);
      @include ft(right);
      text-align: center;
      background: #e02222;
      color: #fff;
      border: 1px solid #e02222;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .dialog_body_content {
    padding: 20px 28px;
    line-height: 38px;
    .qualifiInfo_table {
      border-top: 1px solid #eae2e0;
      border-left: 1px solid #eae2e0;
      .el-row:first-child {
        background: #ebeefb;
      }
      .el-row {
        .el-col {
          height: 50px;
          padding: 5px 10px;
          text-align: center;
          border-bottom: 1px solid #eae2e0;
          border-right: 1px solid #eae2e0;
          .operateBtn {
            color: #1f5dbc !important;
            cursor: pointer;
          }
        }
      }
    }
    .tipInfo {
      color: #e02222;
    }
  }


</style>
