<!--省区：财务管理：省区回款：详情-->
<template>
  <div>
    <go-back title="回款详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="24">
        <span>订单状态： {{goodsDetai.checkStatus}}</span>
        <span>事业部： {{goodsDetai.deptName}}</span>
        <span>省区经理： {{goodsDetai.provinceManager}}</span>
      </el-row>
      <el-row :gutter="24" v-if="goodsDetai.status==2">
        <span>驳回原因： {{goodsDetai.collectionLog}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><span>回款方式</span>：{{goodsDetai.collectionWayStr}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>回款商业</span>：{{goodsDetai.billName}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>回款金额</span>：{{goodsDetai.actualCollectionPrice}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>回款类型</span>：{{goodsDetai.returnMoneyType}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>回款时间</span>：{{goodsDetai.createDate}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple imgWrap" id="galley">
              <span>打款凭证</span>：
              <viewer :images="goodsDetai.imgsList">
                <img v-for="src in goodsDetai.imgsList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>备注</span>：{{goodsDetai.remark}}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {getProCollectionLogData} from 'src/api/headquarter_url/financialManage';//调接口

  export default {

    data() {
      return {
        goodsDetai:{},//基本信息
        ordersCollectionId:this.$route.query.id,//这条记录的id
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
        getProCollectionLogData({ordersCollectionId: this.ordersCollectionId}).then(res => {
          console.log("调接口res:",res)
          this.goodsDetai = res.data.data;
        })
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
