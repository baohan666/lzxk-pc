<!--省区：会议管理详情-->
<template>
  <div>
    <go-back title="会议详情"></go-back>
    <div class="infoDetail">
      <el-row :gutter="24">
        <span>会议编号： {{goodsDetai.meetingNum}}</span>
        <span>提交人： {{goodsDetai.createName}}</span>
        <span>职位： {{goodsDetai.position}}</span>
        <span>提交时间： {{goodsDetai.createDate}}</span>
      </el-row>
    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议名称</span>：{{goodsDetai.title}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议类型</span>：{{goodsDetai.typeStr}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议时间</span>：{{goodsDetai.meetingDate}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议活动省份</span>：{{goodsDetai.meetingProvince}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议活动地点</span>：{{goodsDetai.meetingPlace}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>主讲人</span>：{{goodsDetai.mainSpeaker}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>参会人数</span>：{{goodsDetai.meetingPersonNum}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议内容</span>：{{goodsDetai.meetingContent}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>推广产品名称</span>：{{goodsDetai.goodsNames}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议申请理由</span>：{{goodsDetai.applicationReason}}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple"><span>会议总结概述</span>：{{goodsDetai.meetingSumup}}</div></el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple imgWrap">
              <span>签到表</span>：
              <viewer :images="goodsDetai.signImgsList">
                <div>
                </div>
                <img v-for="src in goodsDetai.signImgsList" :src='src' :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple imgWrap">
              <span>会场照片</span>：
              <viewer :images="goodsDetai.meetingImgsList">
                <img v-for="src in goodsDetai.meetingImgsList" :src='src' :key="src" width="200">
              </viewer>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple imgWrap" id="galley">
              <span>完整总结报告</span>：
              <viewer :images="goodsDetai.sumupImgsList">
                <img v-for="src in goodsDetai.sumupImgsList" :src='src' :key="src" width="200">
              </viewer>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import {promoPolyDetail} from 'src/api/headquarter_url/meetingManage';//调接口

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
        console.log({conferenceId: this.ordersCollectionId});
        promoPolyDetail({conferenceId: this.ordersCollectionId}).then(res => {
          this.goodsDetai = res.data.data.detailConference;
          console.log(this.goodsDetai)
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
    width:100px;
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
