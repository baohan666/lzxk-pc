<!--省区：财务管理：地县回款：详情-->
<template>
  <div>
    <go-back title="回款详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="20">
        <span>订单状态： {{goodsDetai.status==0?'待审核':goodsDetai.status==1?'审核通过':goodsDetai.status==2?'审核不通过':''}}</span>
        <span>区域经理： {{goodsDetai.areaManager}}</span>
        <span>所属区域： {{goodsDetai.areaName}}</span>
        <span>结算方式： {{goodsDetai.orderTypeStr}}</span>
        <span>回款金额： {{goodsDetai.actualCollectionPrice}}</span>
      </el-row>
      <el-row :gutter="20" v-if="goodsDetai.status==2">
        <span>不通过原因： {{goodsDetai.collectionLog}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>回款证明：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple imgWrap">
            <viewer :images="goodsDetai.imgsList">
              <img v-for="src in goodsDetai.imgsList" :src="src" :key="src" width="200">
            </viewer>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple"><span>备注</span>：{{goodsDetai.remark}}</div></el-col>
        </el-row>
      </div>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>回款的订单</div>
      <div class="table_wrap">
        <el-table :data="tableData" border tooltip-effect="dark" >
          <el-table-column prop="createDate" label="提交订单时间"></el-table-column>
          <el-table-column prop="ordersTypeStr" label="订单类型"></el-table-column>
          <el-table-column prop="ordersStatusStr" label="订单状态"></el-table-column>
          <el-table-column prop="goodsType" label="产品数量"></el-table-column>
          <el-table-column prop="totalBalancePrice" label="与省区结算贷款金额"></el-table-column>
          <el-table-column prop="collectionTypeStr" label="结算方式"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <div class="operateBtn" @click="viewLog(scope.row.id)">查看销售订单</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_wrap_bottom">
          回款订单数：<span>{{goodsDetai.orderNums}}</span>
          回款订单金额统计：<span>￥{{goodsDetai.needCollectionPrice}}</span>
        </div>
      </div>
    </div>
    <div class="operateWraper">
      <div v-if="goodsDetai.status==0">
        <div class="div-inline el-button-red" @click = "checkApply(1)">审核通过</div>
        <div class="div-inline el-button-red" @click = "checkApply(2)">审核不通过</div>
      </div>
    </div>
    <!--不通过弹窗begin-->
    <el-dialog title="审核" :visible.sync="dialogReasonVisible" :append-to-body='true' width="35%">
      <div class= 'dialog_body_content'>
        <div class="dialog_changePrice_reason">
          不通过原因：
          <textarea class="checkReason" placeholder="请填写不通过原因" v-model="rejectReason" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogReasonVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="noPassSure">确定</span>
      </div>
    </el-dialog>
    <!--不通过弹窗end-->
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {getProCollectionLogData,collectionCheck,salesOrdersDetail} from 'src/api/province_url/financialManage';//调接口

  export default {

    data() {
      return {
        goodsDetai:{},//基本信息
        tableData:[],//table列表---需求明细
        dialogReasonVisible:false,//不通过弹窗
        flagType:"",//标识  1是审核   2是 驳回  驳回时需要写原因
        ordersCollectionId:this.$route.query.id,//这条记录的id
        rejectReason:'',//驳回原因
      }
    },
    created(){
      this.initData();//初始化数据
    },
    components:{
      goBack,
    },
    mounted(){

    },
    methods: {
      initData(){
        getProCollectionLogData({collectionId: this.ordersCollectionId}).then(res => {
          console.log("调接口res:",res)
          this.goodsDetai = res.data.data;
          this.tableData=res.data.data.orders;
        })
      },
      //查看销售订单
      viewLog($id){
        //跳转到订单管理下的某个页面
        salesOrdersDetail({id:$id}).then(res => {
          this.$router.push({path:'/saleOrderDetailSQ',query:{id:$id}});
        })
      },
      //审核通过或者不通过
      checkApply(type){
        /*this.dialogReasonVisible=true;
        this.dialogCheckStatus=type;
        this.dialogTitle='审核原因';
        this.changeReason=""*/

        /*collectionCheck,collectionReject*/
        if(type==1){//通过
          this.flagType=1;
          this.$confirm('您确定审核通过此回款单吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {//确定
            collectionCheck({flag:this.flagType,ordersCollectionId:this.ordersCollectionId}).then(res => {
              console.log("审核通过成功");
              this.$router.go(-1);
            })
          }).catch(() => {//取消
            console.log("取消");
          });
        }
        if(type==2){//不通过
          this.flagType=2;
          this.dialogReasonVisible=true;
        }
      },
      //不通过弹窗确定
      noPassSure(){
        if(this.rejectReason==""||this.rejectReason.length==0){
          this.$message.error('请输入不通过原因');
          return false;
        }else{
          collectionCheck({flag:this.flagType,ordersCollectionId:this.ordersCollectionId,rejectReason:this.rejectReason}).then(res => {
            console.log("不通过成功");
            this.$router.go(-1);
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
        width:70px;
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
  .operateWraper {
    margin: 20px;
    text-align: center;
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
</style>
