<!--总部：人员管理：人员申请单：详情-->
<template>
  <div>
    <go-back title="查看人员申请单详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="20">
        <span>申请类型： {{goodsDetai.applyType==1?'新增':goodsDetai.applyType==2?'修改':goodsDetai.applyType==3?'离职':'解禁'}}</span>
        <span>提交时间： {{goodsDetai.createDate}}</span>
        <span>申请单状态： {{goodsDetai.applyStatus==2?'待审核':goodsDetai.applyStatus==3?'审核通过':goodsDetai.applyStatus==4?'审核不通过':goodsDetai.applyStatus==5?'审核暂缓':goodsDetai.applyStatus==6?'已撤回':''}}</span>
        <span v-if="goodsDetai.checkDate">审核时间： {{goodsDetai.checkDate}}</span>
        <!--<span class="withdraw" v-if="goodsDetai.applyStatus==2" @click="nopassFun">撤回</span>-->
      </el-row>
      <el-row :gutter="20">
        <span v-if="goodsDetai.reason">原因： {{goodsDetai.reason}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="12"><div class="grid-content bg-purple"><span>部门</span>：{{goodsDetai.treeName}}</div></el-col>
          <el-col :span="12" v-if="goodsDetai.applyType==2"><div class="grid-content bg-purple"><span>日志</span>：姓名由“{{userApplysDetai.oldData}}”改为“{{userApplysDetai.newData}}”</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>姓名</span>：{{goodsDetai.applyInfoName}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>性别</span>：{{goodsDetai.sexStr=='1'?'男':'女'}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>手机</span>：{{goodsDetai.mobile}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>身份证号</span>：{{goodsDetai.idCard}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>身份证扫描</span>：
              <viewer :images="goodsDetai.cardImgList">
                <img v-for="src in goodsDetai.cardImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>职务</span>：{{goodsDetai.jobStr=='5'?'省区经理':goodsDetai.jobStr=='4'?'地区经理':goodsDetai.jobStr=='3'?'县区经理':goodsDetai.jobStr=='10'?'内勤':''}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>应聘登记表扫描件</span>：
              <viewer :images="goodsDetai.applicationImgList">
                <img v-for="src in goodsDetai.applicationImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>是否保证金人员</span>：{{goodsDetai.isDepositStr=='1'?'是':goodsDetai.isDepositStr=='2'?'不是':''}}</div></el-col>
          <el-col :span="24" v-if="goodsDetai.isDepositStr=='1'"><div class="grid-content bg-purple"><span>保证金金额</span>：{{goodsDetai.otherAmount}}</div></el-col>
          <el-col :span="24" v-if="goodsDetai.isDepositStr=='1'">
            <div class="grid-content bg-purple">
              <span>保证金汇款证明扫描件</span>：
              <viewer :images="goodsDetai.depositImgList">
                <img v-for="src in goodsDetai.depositImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24">
            <el-button size="medium"  v-if="goodsDetai.applyStatus==2||goodsDetai.applyStatus==5" @click="passFun(1)">审核通过</el-button>
            <el-button size="medium" v-if="goodsDetai.applyStatus==2||goodsDetai.applyStatus==5" @click="nopassFun(2)">审核不通过</el-button>
            <el-button size="medium" v-if="goodsDetai.applyStatus==2" @click="nopassFun(3)">审核暂缓</el-button>
            <el-button size="medium" v-if="goodsDetai.applyStatus==2||goodsDetai.applyStatus==5" @click="editFun">编辑</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--不通过/暂缓原因弹窗begin-->
    <el-dialog title="提示" :visible.sync="dialogReasonVisible" :append-to-body='true' width="35%">
      <div class= 'dialog_body_content'>
        <div class="dialog_changePrice_reason">
          {{reasonTitle}}原因：
          <textarea class="checkReason" :placeholder='"请填写"+reasonTitle+"原因"' v-model="changeReason" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogReasonVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="sureFun">确定</span>
      </div>
    </el-dialog>
    <!--不通过/暂缓原因弹窗end-->
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {getdDetailPAData,userApplyInfoCheck,userApplyInfoEditSave} from 'src/api/headquarter_url/personManage';//调接口

  export default {

    data() {
      return {
        goodsDetai:{},//基本信息
        userApplysDetai:{},//日志信息
        changeReason: '',//不通过/暂缓原因
        reasonTitle:'',//不通过/暂缓
        checkType:'',/*checkType类型1通过 2不通过 3暂缓*/
        dialogReasonVisible: false,//不通过/暂缓弹窗
        applyId:this.$route.query.id,//人员申请单的id
        newApplyStatus:"",//申请单审核之后的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        oldApplyStatus:""//申请单未审核之前的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        // userId:''
      }
    },
    created(){
      this.initData();//初始化数据
    },
    mounted(){
    },
    components:{
      goBack,
    },
    methods: {
      initData(){
        console.log(3333);
        getdDetailPAData({applyId: this.applyId}).then(res => {
          this.goodsDetai = res.data.data;
          console.log(this.goodsDetai);
          if(this.goodsDetai.applyType==2){
            userApplyInfoLog({applyId: this.applyId}).then(res => {
              this.userApplysDetai = res.data.data;
            })
          }
        })
      },
      passFun(type){//审核通过
        /*checkType类型1通过 2不通过 3暂缓*/
        /*申请单审核之后的状态:2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回 */
        userApplyInfoCheck({applyId:this.applyId,newApplyStatus:3,oldApplyStatus:this.goodsDetai.applyStatus,checkType:type,applyType:this.goodsDetai.applyType}).then(res => {
          console.log("调userApplyInfoCheck接口res:",res);
          //点击后界面返回列表页
          this.$router.go(-1);
        })
      },
      editFun(){//编辑
        console.log(this.goodsDetai.userId);
        console.log(this.goodsDetai.sex);
        this.$router.push({path:'/viewDetailPAeditZB',query:{id:this.applyId,userId:this.goodsDetai.userId}});
      },
      nopassFun(type){//不通过/暂缓
        if(type==2){//审核不通过
          this.checkType=2;
          this.newApplyStatus=4;
          this.reasonTitle='不通过';
        }else if(type==3){//审核暂缓
          this.checkType=3;
          this.newApplyStatus=5;
          this.reasonTitle='暂缓';
        }
        this.dialogReasonVisible = true;
      },
      sureFun(){//不通过/暂缓确定按钮
        if(this.changeReason==""||this.changeReason.length==0){
          this.$message.error('请输入'+this.reasonTitle+'原因');
          return false;
        }else{
          userApplyInfoCheck({applyId:this.applyId,newApplyStatus:this.newApplyStatus,oldApplyStatus:this.goodsDetai.applyStatus,reason:this.changeReason,checkType:this.checkType}).then(res => {
            console.log("调userApplyInfoCheck接口res:",res);
//            this.newApplyStatus=res.data.data.newApplyStatus;
            this.initData();//撤回成功以后需要重新展示数据
            this.dialogReasonVisible = false;
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">

  @mixin wh($w,$h){
    width:$w;
    height:$h;
    line-height: $h;
  }
  .infoDetail{
    padding:20px 30px;
    border-bottom:1px solid #ddd;
    span{
      padding-right:15px;
      font-size:14px;
      color:#333;
      line-height:40px;
    }
    background:#fff;
  }
  .containInfo_wraper{
    margin:20px 30px;

    background:#ffff;
    border:1px solid #e6e6e6;
    .detail_title{
      padding:0 20px;
      line-height:50px;
      color:#1f5dbc;
      font-size:14px;
      .line_Icon{
        display: inline-block;
        @include wh(4px,14px);
        vertical-align: middle;
        margin-right:5px;
        border-radius:20%;
        background:#1f5dbc;
      }
      border-bottom:1px solid #e6e6e6;
    }
    .detail_content{
      padding: 0 29px;
      line-height:49px;
      font-size:14px;
      span{
        display:inline-block;
        width:145px;
        text-align:justify;
        text-align-last:justify;
        text-justify:inter-ideograph;/*IE*/
        text-align-last:inter-ideograph;
      }
      .viewRemark{
        color:#1f5dbc;
      }
      .imgWrap img{
        margin: 20px 20px 0 0;
      }
    }
    .table_wrap, .el-dialog__body {
      margin-top: 0;
      background: #fff;
      border: none;
      padding: 20px;
    }
    .table_wrap_bottom{
      padding-top: 15px;
      text-align: right;
      font-size: 14px;
      span{
        color: #ff4d51;
      }
      span:first-child{
        padding-right: 10px;
      }
    }
  }
  .dialog_changePrice_reason{
    padding:30px;
    .checkReason{
      border:1px solid #e6e6e6;
      border-radius:5px;
      width:80%;
      height:70px;
      vertical-align: middle;
      padding:10px;
      line-height:26px;
    }
  }
  .withdraw{
    width: 92px;
    height: 32px;
    border: 1px solid #e5e5e5;
    background: #eee;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    display: inline-block;
    line-height: 32px!important;
    text-align: center;
    padding-right: 0!important;
  }
</style>
