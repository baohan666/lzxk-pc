<!--省区：人员管理：人员申请单：详情-->
<template>
  <div>
    <go-back title="查看人员申请单详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="20">
        <span>申请类型： {{goodsDetai.applyType==1?'新增':goodsDetai.applyType==2?'修改':goodsDetai.applyType==3?'离职':'解禁'}}</span>
        <span>提交时间： {{goodsDetai.createDate}}</span>
        <span>申请单状态： {{goodsDetai.applyStatus==2?'待审核':goodsDetai.applyStatus==3?'审核通过':goodsDetai.applyStatus==4?'审核不通过':goodsDetai.applyStatus==5?'审核暂缓':'已撤回'}}</span>
        <span v-if="goodsDetai.checkDate">审核时间： {{goodsDetai.checkDate}}</span>
        <span class="withdraw" v-if="goodsDetai.applyStatus==2" @click="withdrawFun">撤回</span>
      </el-row>
      <el-row :gutter="20">
        <span v-if="goodsDetai.reason">原因： {{goodsDetai.reason}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="12"><div class="grid-content bg-purple"><span>部门</span>：{{goodsDetai.treeName}}</div></el-col>
          <el-col :span="12" v-if="goodsDetai.applyType==2"><div class="grid-content bg-purple"><span>日志</span>：姓名由“{{userApplysDetai.oldData}}”改为“{{userApplysDetai.newData}}”</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>姓名</span>：{{goodsDetai.applyInfoName}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>性别</span>：{{goodsDetai.sex==1?'男':'女'}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>手机</span>：{{goodsDetai.telephone}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>身份证号</span>：{{goodsDetai.idCard}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>身份证扫描</span>：
              <viewer :images="goodsDetai.cardImgList">
                <img v-for="src in goodsDetai.cardImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>职务</span>：{{goodsDetai.position==5?'省区经理':goodsDetai.position==4?'地区经理':goodsDetai.position==3?'县区经理':'内勤'}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>应聘登记表扫描件</span>：
              <viewer :images="goodsDetai.applicationImgList">
                <img v-for="src in goodsDetai.applicationImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>是否保证金人员</span>：{{goodsDetai.isDeposit==1?'是':'不是'}}</div></el-col>
          <el-col :span="24" v-if="goodsDetai.isDeposit==1"><div class="grid-content bg-purple"><span>保证金金额</span>：{{goodsDetai.amount}}</div></el-col>
          <el-col :span="24" v-if="goodsDetai.isDeposit==1">
            <div class="grid-content bg-purple">
              <span>保证金汇款证明扫描件</span>：
              <viewer :images="goodsDetai.depositImgList">
                <img v-for="src in goodsDetai.depositImgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--撤回弹窗begin-->
    <el-dialog title="撤回原因" :visible.sync="dialogReasonVisible" :append-to-body='true' width="35%">
      <div class= 'dialog_body_content'>
        <div class="dialog_changePrice_reason">
          撤回原因：
          <textarea class="checkReason" placeholder="请填写撤回原因" v-model="changeReason" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogReasonVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="withdraw_sure">确定</span>
      </div>
    </el-dialog>
    <!--撤回弹窗end-->
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {userApplyInfoIsRead,provinceUserApplyDetail,userApplyInfoLog,userApplyInfoCheck}  from 'src/api/province_url/personalManage';//调接口

  export default {

    data() {
      return {
        goodsDetai:{},//基本信息
        userApplysDetai:{},//日志信息
        changeReason: '',//撤回原因
        dialogReasonVisible: false,//撤回弹窗
        applyId:this.$route.query.id,//人员申请单的id
        newApplyStatus:"",//申请单审核之后的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        oldApplyStatus:""//申请单未审核之前的状态:1待提交 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
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
        provinceUserApplyDetail({applyId: this.applyId}).then(res => {
          console.log("调接口res:",res)
          this.goodsDetai = res.data.data;
          if(this.goodsDetai.applyType==2){
            userApplyInfoLog({applyId: this.applyId}).then(res => {
              this.userApplysDetai = res.data.data;
            })
          }
        })
      },
      withdrawFun(){//撤回
        this.oldApplyStatus=this.goodsDetai.applyStatus;
        this.dialogReasonVisible = true;
      },
      //撤回确定按钮
      withdraw_sure(){
        if(this.changeReason==""||this.changeReason.length==0){
          this.$message.error('请输入撤回原因');
          return false;
        }else{
          userApplyInfoCheck({applyId:this.applyId,newApplyStatus:6,oldApplyStatus:this.oldApplyStatus,reason:this.changeReason}).then(res => {
            console.log("调userApplyInfoCheck接口res:",res);
            //this.newApplyStatus=res.data.data.newApplyStatus;
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


