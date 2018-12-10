<!--总部：人员管理：人员申请单：详情编辑-->
<template>
  <div>
    <go-back title="查看人员申请单详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="20">
        <span>申请类型： {{goodsDetai.applyType == 1 ? '新增' : goodsDetai.applyType == 2 ? '修改' : goodsDetai.applyType == 3 ? '离职' : goodsDetai.applyType == 4 ?'解禁':''}}</span>
        <span>提交时间： {{goodsDetai.createDate}}</span>
        <span>申请单状态： {{goodsDetai.applyStatus == 2 ? '待审核' : goodsDetai.applyStatus == 3 ? '审核通过' : goodsDetai.applyStatus == 4 ? '审核不通过' : goodsDetai.applyStatus == 5 ? '审核暂缓' : goodsDetai.applyStatus == 6 ? '已撤回' : ''}}</span>
        <span v-if="goodsDetai.checkDate">审核时间： {{goodsDetai.checkDate}}</span>
      </el-row>
      <el-row :gutter="20">
        <span v-if="goodsDetai.reason">原因： {{goodsDetai.reason}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_content">
        <!--编辑区域begin-->
        <div class="addressBook_addPreson">
          <ul>
            <li>
						  <span class="addPreson_left">部门<i class="colorE02222">*</i><i>:</i></span>
              <i>
                <span class="deptBg"></span>
                <span v-model="goodsDetai.treeName">{{goodsDetai.treeName}}</span>
                <a href="javascript:;" class="change" @click='changeDeptName()'>修改</a>
              </i>
            </li>
            <li>
						  <span class="addPreson_left">姓名<i class="colorE02222">*</i><i>:</i></span>
              <el-input v-model="goodsDetai.applyInfoName" placeholder="请输入姓名"></el-input>
            </li>
            <li>
						  <span class="addPreson_left">性别<i class="colorE02222">*</i><i>:</i></span>
              <el-radio v-model="goodsDetai.sexStr" label="1" value=''>男</el-radio>
              <el-radio v-model="goodsDetai.sexStr" label="2" value=''>女</el-radio>
            </li>
            <li>
						  <span class="addPreson_left">手机<i class="colorE02222">*</i><i>:</i></span>
              <el-input v-model="goodsDetai.mobile" placeholder="请输入手机号"></el-input>
            </li>
            <li>
						  <span class="addPreson_left">身份证号<i class="colorE02222">*</i><i>:</i></span>
              <el-input v-model="goodsDetai.idCard" placeholder="请输入身份证号"></el-input>
            </li>
            <li>
						  <span class="addPreson_left">身份证扫描件<i class="colorE02222">*</i><i>:</i></span>
              <div class="div-inline uploadImg_box">
                <upload-img
                  :imgMenu="cardImgListSelf"
                  :isInvert="true"
                  :maxLimit="3" fileName="combo"
                  @uploadSuccess="uploadIdCardSuccess">
                </upload-img>
              </div>
              <span class="uploadImg_tip">请上传图片，最多上传3张</span>
            </li>
            <li>
              <span class="addPreson_left">职务<i class="colorE02222">*</i><i>:</i></span>
              <el-select v-model="goodsDetai.jobStr" placeholder="请选择">
                <el-option label="请选择" value=''></el-option>
                <el-option label="县区经理" value='3'></el-option>
                <el-option label="地区经理" value='4'></el-option>
                <el-option label="省区经理" value='5'></el-option>
                <el-option label="内勤" value='10'></el-option>
              </el-select>
            </li>
            <li>
						  <span class="addPreson_left">应聘登记表扫描件<i class="colorE02222">*</i><i>:</i></span>
              <div class="div-inline uploadImg_box">
                <upload-img :imgMenu="applicationImgSelf" :isInvert="true" :maxLimit="3" fileName="combo" @uploadSuccess="uploadApplicationImgSuccess"></upload-img>
              </div>
              <span class="uploadImg_tip">请上传图片，最多上传3张</span>
            </li>
            <li>
						<span class="addPreson_left">是否保证金人员<i class="colorE02222">*</i><i>:</i></span>
              <el-select v-model="goodsDetai.isDepositStr" placeholder="请选择">
                <el-option label="请选择" value=''></el-option>
                <el-option label="是" value='1'></el-option>
                <el-option label="否" value='2'></el-option>
              </el-select>
            </li>
            <li v-show="goodsDetai.isDepositStr=='1'">
						  <span class="addPreson_left">保证金金额<i class="colorE02222">*</i><i>:</i></span>
              <el-input v-model="goodsDetai.otherAmount" placeholder="请输入金额"></el-input>
            </li>
            <li v-show="goodsDetai.isDepositStr=='1'">
						  <span class="addPreson_left">保证金汇款证明扫描件<i class="colorE02222">*</i><i>:</i></span>
              <div class="div-inline uploadImg_box">
                <upload-img :imgMenu="depositImgSelf" :isInvert="true" :maxLimit="3" fileName="combo" @uploadSuccess="uploadDepositImgSuccess"></upload-img>
              </div>
              <span class="uploadImg_tip">请上传图片，最多上传3张</span>
            </li>
            <div class="addFooter">
              <button @click="btnSaveRegExp()" class='el-button-red'>保存</button>
              <!--<button @click="btnClose()" class='el-button-close'>取消</button>-->
            </div>
          </ul>

        </div>
        <!--编辑区域end-->
      </div>
    </div>
    <!--人员详情组件check-out-dialog-->
    <person-detail-dialog ref='checkOutLog' :changDeptBtnFlag='changDeptBtnFlag' v-on:checkOutsuccess="deptNameFromchild"></person-detail-dialog>
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {getdDetailPAData, userApplyInfoCheck, userApplyInfoEditSave} from 'src/api/headquarter_url/personManage';//调接口
  import {
    addressListTree, //通讯录列表
    addressDetail,
    insertOrgTree, //添加子部门
    deleteOrgTree, //删除部门
    deleteUserInfo, //人员删除
    getOrgUserLog,
    selectOrgTree,
    outputUserInfo,
    updateOrgTree,
    getCountByTreeId,
  } from 'src/api/headquarter_url/addressList';
  import AddressTree from 'src/headComponent/addressTree.vue'
  import AddressDialog from 'src/headComponent/addressDialog.vue'
  import PersonDetailDialog from 'src/headComponent/personDetailDialog.vue'
  import CheckDetail from 'src/headComponent/checkDetail.vue'
  import { getStore, setDepartment, } from 'src/config/cache'
  import departComponet from 'src/headComponent/departComponent'
  import elPagination from 'components/el-page';
  import uploadImg from 'components/aliossupload' //上传图片组件

  export default {

    data() {
      return {
        goodsImgs: '', //上传图片
        deptName: '基础医药中心', //部门名
        inputIdCard: '', //身份证信息
        inputTel: '', //身份证号
        isPosition: '', //添加人员职务
        isDeposit: '', //添加人员保证金人员是否
        inputName: '', //添加人员姓名
        radioSex: '1', //性别
        cardImgListSelf:[], //添加人员身份证
        applicationImgSelf: [], //应聘登记表扫描件
        ncCode: '', //nc编码
        amount: '1', //保证金金额
        otherAmount: '', //保证金其他金额
        departmentId: '', //事业部id
        depositImgSelf: [], //保证金汇款扫描件
        pageIndex: 1,
        pageSize: 10,
        totalRecords: 0, //总条数
        totalPageCnt: 0, //总页数
        pagin_show: true,
        tabS: ['人员', '部门'],
        isActive: 0,
        tableData: [], //表格
        handleDept: false, //修改名称,添加子部门，删除模块
        topDialogVisible: false, //修改名称,添加子部门，删除弹框
        dailogTitleType: '',
        delBtnShow: false, //删除按钮
        forbiddenBtnShow: false, //删除按钮
        multipleSelection: [], //列表选中信息
        addPresonFlag: false, //添加人员编辑人员
        serchList: false, //tree搜索列表
        checkOutVisible: false, //批量导出弹框
        changDeptBtnFlag: false, //修改弹框和导出弹框区分
        addressTreeShow: true, //左侧树
        inputSearch: '', //左侧搜索框绑定
        statusAll: '', //人员状态
        position: '', //职务
        nameSearch: '', //姓名
        departmentId: '', //事业部
        id: '0', //左侧选中树的id,不选中传1
        // userId: '',//row id
        pid: '', //父id
        lev: '', //树级别,添加子部门
        sendTreeName: '',
        sendTreeChildName: '',
        isLeafTree: false, //tree 有没有子节点  部门
        treeName: '基础医药中心',
        treeId: '1',
        deptNameChange: '', //头部修改部门名称
        checked: true, //
        streeId: '', //address子组件点击树id
        orgTreeList: '', //
        userInfoList: '', //
        dialogMsg: '', //删除弹框提示内容
        hintMsg: '', //详情子组件提示信息
        datailArr: [], //详情data
        datailEditArr: [], //详情编辑data
        sendId: '',
        personCount: [], //头部人员


        goodsDetai: {},//基本信息
        changeReason: '',//不通过/暂缓原因
        reasonTitle: '',//不通过/暂缓
        //checkType: '', /*checkType类型1通过 2不通过 3暂缓*/
        dialogReasonVisible: false,//不通过/暂缓弹窗
        applyId: this.$route.query.id,//人员申请单的id
        userId: this.$route.query.userId,//人员申请单的id
        newApplyStatus: "",//申请单审核之后的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        oldApplyStatus: ""//申请单未审核之前的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
      }
    },
    created() {

    },
    mounted() {
      this.initData();//初始化数据
    },
    components: {
      goBack,
      //
      AddressTree,
      AddressDialog,
      PersonDetailDialog,//修改部门
      CheckDetail,
      uploadImg,
      departComponet,
      elPagination
    },
    methods: {
      //初始化数据
      initData() {
        console.log(this.applyId);
        getdDetailPAData({applyId: this.applyId}).then(res => {
          console.log("调getdDetailPAData接口res.data.data:", res.data.data)
          this.goodsDetai = res.data.data;
          this.treeId = this.goodsDetai.treeId;
          this.cardImgListSelf=this.goodsDetai.cardImgList;//身份证扫描件
          this.applicationImgSelf=this.goodsDetai.applicationImgList;//应聘登记表扫描件
          this.depositImgSelf=this.goodsDetai.depositImgList;//保证金汇款证明扫描件
          console.log(this.goodsDetai);
          //应聘登记表扫描件图片回显数据处理
          let applicationImgMenu = [];
          this.applicationImgSelf.forEach((item, index, arr) => {
            let imgd = item.split("/");
            applicationImgMenu.push(imgd[imgd.length - 1])
          })
          this.goodsDetai.applicationImgList = applicationImgMenu;
          console.log("applicationImgMenu:",applicationImgMenu)
          //保证金汇款证明扫描件回显
          let depositImgMenu = [];
          this.depositImgSelf.forEach((item, index, arr) => {
            let imgd = item.split("/");
            depositImgMenu.push(imgd[imgd.length - 1])
          })
          this.goodsDetai.depositImgList = depositImgMenu;
          console.log("depositImgMenu:",depositImgMenu)
          //身份证扫描件回显
          let idCardImgMenu = [];
          this.cardImgListSelf.forEach((item, index, arr) => {
            let imgd = item.split("/");
            idCardImgMenu.push(imgd[imgd.length - 1])
          })
          this.goodsDetai.cardImgList = idCardImgMenu;
          console.log("idCardImgMenu:",idCardImgMenu)
        })
      },
      //身份证扫描件回显
      uploadIdCardSuccess($val) {
        console.log("身份证扫描件$val:",$val);
        this.goodsDetai.cardImgList = $val.fileName;
      },
      //应聘登记表扫描件图片回显数据处理
      uploadApplicationImgSuccess($val) {
        console.log("应聘登记表扫描件$val:",$val)
        this.goodsDetai.applicationImgList = $val.fileName;
      },
      //保证金汇款证明扫描件回显
      uploadDepositImgSuccess($val) {
        console.log("保证金汇款证明扫描件$val:",$val)
        this.goodsDetai.depositImgList = $val.fileName;
      },
      //添加人员编辑人员改变 部门
      deptNameFromchild(res1, res2, res3) {
        console.log("添加人员编辑人员改变 部门:",res1, res2, res3)
        this.treeId = res1.toString();
        this.checkOutVisible = res3;
        this.goodsDetai.treeName = res2.toString();
      },
      //添加人员修改
      changeDeptName() {
        this.$refs.checkOutLog.show();
        this.changDeptBtnFlag = true;
      },
      //保存
      btnSaveRegExp() {
        if(this.goodsDetai.applyInfoName == '') {
          this.$message.error('请输入姓名')
          return false;
        } else if(this.goodsDetai.mobile == '') {
          this.$message.error('请输入手机号')
          return false;
        } else if(!(/^1[34578]\d{9}$/.test(this.goodsDetai.mobile))) {
          this.$message.error("手机号码有误，请重填");
          return false;
        } else if(this.goodsDetai.idCardList == '') {
          this.$message.error('请输入身份证号')
          return false;
        } else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.goodsDetai.idCard))) {
          this.$message.error('身份证号填写有误');
          return false;
        } else if(this.goodsDetai.cardImgList == '') {
          this.$message.error("请上传身份证扫描件 ");
          return false;
        } else if(this.goodsDetai.jobStr == '') {
          this.$message.error("请选择职务 ");
          return false;
        } else if(this.goodsDetai.applicationImgList == '') {
          this.$message.error("请上传应聘登记表扫描件");
          return false;
        }else if(this.goodsDetai.jobStr !== "" && this.goodsDetai.isDepositStr == '1' || this.goodsDetai.isDepositStr == "是") {
          console.log("this.goodsDetai.depositImgList:",this.goodsDetai.depositImgList == '')
          console.log("this.goodsDetai.otherAmount == null:",this.goodsDetai.otherAmount == null)
          if(this.goodsDetai.otherAmount == ''||this.goodsDetai.otherAmount == null) {
            this.$message.error("请输入保证金金额");
            return false;
          }else if(this.goodsDetai.depositImgList == '') {
            this.$message.error("请上传保证金汇款扫描件");
            return false;
          }
        }
        let datalist={
        	'treeId':this.treeId,
          "applyId": this.applyId, // idtreeId
          "name": this.goodsDetai.applyInfoName, // 姓名
          "sex": this.goodsDetai.sexStr, // 1男 2女
          "position": this.goodsDetai.jobStr, // 5:省区经理 4: 地区经理 3县区经理  10 内勤
          "idCard": this.goodsDetai.idCard, // 身份证号
          "idCradImg":this.goodsDetai.cardImgList.join(','), // 身份证图片：以逗号分隔的图片路径传到前端
          "mobile": this.goodsDetai.mobile, // 编号
          "applicationImg": this.goodsDetai.applicationImgList.join(','), //应聘登记表：以逗号分隔的图片路径传到前端
          "isDeposit":this.goodsDetai.isDepositStr, // 1是2不是   保证金
          "otherAmount":this.goodsDetai.otherAmount, //保证金金额
          "depositImg":this.goodsDetai.depositImgList.join(','), //保证金回款证明扫描件：以逗号分隔的图片路径传到前端

//        "provinceCode":this.goodsDetai.provinceCode,//省区code  //null
//        "provinceName":this.goodsDetai.provinceName,//省区名字  // null
//        "cityCode":this.goodsDetai.cityCode,//地区code          // undefined
//        "cityName":this.goodsDetai.cityName,//地区名字     //undefined
//        "countyCode":this.goodsDetai.countyCode,//县区code //undefined
//        "countyName":this.goodsDetai.countyName,//县区名字  //undefined

          //"applyId":this.goodsDetai.depositImgList,
          "checkType":this.goodsDetai.checkType,//审核类型    类型1通过 2不通过 3暂缓  // undefined
          "applyType":this.goodsDetai.applyType,//申请单类型:1新增 2修改 3离职 4解禁
          "userId":this.userId // 用户id
        };
        console.log(datalist);
        userApplyInfoEditSave(datalist).then(res => {
          this.$message.success('编辑人员保存成功');
          this.$router.push({path:'/PersonnelApplicationZB'});//跳转到人员申请单列表页
        })
      },
      //添加人员取消
      /*btnClose() {
        this.addPresonFlag = false, //添加人员编辑人员
        this.serchList = false, //tree搜索列表
        this.$refs.delDialog.hide();
        this.changDeptBtnFlag = false //修改弹框和导出弹框区分
      },*/
    }
  }
</script>

<style lang="scss" scoped="scoped">

  @mixin wh($w,$h) {
    width: $w;
    height: $h;
    line-height: $h;
  }

  .infoDetail {
    padding: 20px 30px;
    border-bottom: 1px solid #ddd;
    span {
      padding-right: 15px;
      font-size: 14px;
      color: #333;
      line-height: 40px;
    }
    background: #fff;
  }

  .containInfo_wraper {
    margin: 20px 30px;

    background: #ffff;
    border: 1px solid #e6e6e6;
    .detail_title {
      padding: 0 20px;
      line-height: 50px;
      color: #1f5dbc;
      font-size: 14px;
      .line_Icon {
        display: inline-block;
        @include wh(4px, 14px);
        vertical-align: middle;
        margin-right: 5px;
        border-radius: 20%;
        background: #1f5dbc;
      }
      border-bottom: 1px solid #e6e6e6;
    }
    .detail_content {
      padding: 0 29px;
      line-height: 49px;
      font-size: 14px;
      span {
        display: inline-block;
      }
      .viewRemark {
        color: #1f5dbc;
      }
      .imgWrap img {
        margin: 20px 20px 0 0;
      }
    }
    .table_wrap, .el-dialog__body {
      margin-top: 0;
      background: #fff;
      border: none;
      padding: 20px;
    }
    .table_wrap_bottom {
      padding-top: 15px;
      text-align: right;
      font-size: 14px;
      span {
        color: #ff4d51;
      }
      span:first-child {
        padding-right: 10px;
      }
    }
  }

  .dialog_changePrice_reason {
    padding: 30px;
    .checkReason {
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      width: 80%;
      height: 70px;
      vertical-align: middle;
      padding: 10px;
      line-height: 26px;
    }
  }

  /*--------*/

  .addressBook .addressBook_left .addressBook_search .el-input {
    width: 90%;
  }

  .addressBook .addressBook_left .addressBook_search .serchList {
    width: 100%;
    background: white;
    position: absolute;
    z-index: 999;
  }

  .addressBook .addressBook_left .addressBook_search .serchList .searchTitle {
    height: 34px;
    line-height: 34px;
    background: #fff;
    color: #1f5dbc;
    font-size: 16px;
    padding-left: 21px;
    margin-top: 20px;
  }

  .addressBook .addressBook_left .addressBook_search .serchList li {
    height: 34px;
    line-height: 34px;
    background: #fff;
    color: #666;
    font-size: 14px;
    padding-left: 54px;
    cursor: pointer;
  }

  .addressBook .addressBook_left .addressBook_tab {
    padding-top: 10px;
  }

  .addressBook .addressBook_left .addressBook_tab ul {
    display: flex;
  }

  .addressBook .addressBook_left .addressBook_tab ul li {
    flex: 1;
    display: flex;
    justify-content: center;
    line-height: 34px;
    cursor: pointer;
    font-size: 14px;
    color: #aaa;
    border-bottom: 1px solid #aaa;
  }

  .addressBook .addressBook_left .addressBook_tab ul .active {
    color: #fff;
    background: #e02222;
  }

  .addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel {
    float: left;
    height: 34px;
    cursor: pointer;
  }

  .addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel img {
    display: block;
    padding: 7px 0 0 14px;
  }

  .addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel .img_addLabel {
    display: none;
  }

  .addressBook .addressBook_left .addressBook_tab .addressBook_zTree {
    position: absolute;
    top: 149px;
    left: 20px;
    right: 0;
    bottom: 0;
  }

  .addressBook .addressBook_right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80%;
    overflow-y: auto;
    background: #fff;
    border-left: 1px solid #e5e5e5;
  }

  .addressBook .addressBook_right .addressPersonSituation {
    margin: 50px;
    display: block;
    font-size: 16px;
    color: #666;
  }

  .addressBook .addressBook_right .addressPersonSituation h4 {
    padding: 5px 10px;
  }

  .addressBook .addressBook_right .addressPersonSituation h3 {
    padding: 5px;
  }

  .addressBook .addressBook_right .addressHandleDept {
    width: 600px;
    display: flex;
    justify-content: space-around;
  }

  .addressBook .addressBook_right .addressHandleDept li {
    padding: 0 0.3rem;
    background: #e02222;
    border-radius: 3px;
    height: 36px;
    color: #fff;
    font-size: 14px;
    border: none;
    line-height: 36px;
    cursor: pointer;
    margin-right: 10px;
  }
  .addressBook_addPreson ul{
    width: auto;
  }
  .addressBook_addPreson ul .addFooter {
    padding: 20px 0 10px 80px;
  }

  .addressBook_addPreson ul .addFooter .el-button-close {
    padding: 0 0.3rem;
    background: #eee;
    border-radius: 3px;
    height: 36px;
    color: #666;
    font-size: 14px;
    border: none;
    line-height: 36px;
    cursor: pointer;
    margin-left: 20px;
  }

  .addressBook_addPreson ul li {
    padding: 10px;
    line-height: 24px;
    color: #666;
    font-size: 14px;
  }

  .addressBook_addPreson .el-input,
  .addressBook_addPreson .el-select {
    width: 190px;
    margin-right: 10px;
  }

  .addressBook_addPreson ul li .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .addressBook_addPreson ul li .addPreson_left {
    display: inline-block;
    float: left;
    width: 165px;
    color: #666;
    margin-right: 18px;
    line-height: 30px;
    text-align: right;
  }

  .addressBook_addPreson ul li .colorE02222 {
    color: #e02222;
  }

  .addressBook_addPreson ul li .change {
    padding: 0 10px;
    color: #2e68c0;
  }

  .addressBook_addPreson ul li .deptBg {
    line-height: 0;
    margin: 0;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-image: url(../../../assets/images/zTreeStandard.png);
    background-position: -110px -1px;
  }

  /*------*/

</style>
