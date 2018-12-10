<!--省区：终端客户管理：详情-->
<template>
	<div>
		<go-back title="客户详情"></go-back>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>客户名称</span>：{{customDetai.clinicName}}</div></el-col>
          <!--0.顶级部门 1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部-->
				  <el-col :span="7"><div class="grid-content bg-purple"><span>事业部</span>：{{customDetai.departmentId==0?'顶级部门':customDetai.departmentId==1?'心脑事业部':customDetai.departmentId==2?'风湿及骨科事业部':customDetai.departmentId==3?'云事业部':customDetai.departmentId==4?'消化事业部':''}}</div></el-col>
          <!--1诊所 2乡镇卫生院 3村卫生室 4单体药房 5连锁药房 6民营医院 7专科医院 8综合医院 9军队医院-->
				  <el-col :span="7"><div class="grid-content bg-purple"><span>客户类型</span>：{{customDetai.customType==1?'诊所':customDetai.customType==2?'乡镇卫生院':customDetai.customType==3?'村卫生室':customDetai.customType==4?'单体药房':customDetai.customType==5?'连锁药房':customDetai.customType==6?'民营医院':customDetai.customType==7?'专科医院':customDetai.customType==8?'综合医院':customDetai.customType==9?'军队医院':''}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
          <!--1三级特等2三级甲等3三级乙等4三级丙等5二级甲等6二级乙等7二级丙等8一级甲等9一级乙等10一级丙等-->
				  <el-col :span="7"><div class="grid-content bg-purple"><span>等级</span>：{{customDetai.level==1?'三级特等':customDetai.level==2?'三级甲等':customDetai.level==3?'三级乙等':customDetai.level==4?'三级丙等':customDetai.level==5?'二级甲等':customDetai.level==6?'二级乙等':customDetai.level==7?'二级丙等':customDetai.level==8?'一级甲等':customDetai.level==9?'一级乙等':customDetai.level==10?'一级丙等':''}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>所属区域</span>：{{customDetai.belongsArea}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>详细地址</span>：{{customDetai.detail}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>法人</span>：{{customDetai.legalPerson}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>法人手机号</span>：{{customDetai.bossPhone}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>营业执照号</span>：{{customDetai.businessLicense}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>客户联系人</span>：{{customDetai.username}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>联系人电话</span>：{{customDetai.clinicPhone}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>门诊量</span>：{{customDetai.outpatientNum}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>医生人数</span>：{{customDetai.doctorNum}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>床位数</span>：{{customDetai.bedNum}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>药店店员数</span>：{{customDetai.clerkNum}}</div></el-col>
				 <el-col :span="7"><div class="grid-content bg-purple"><span>药店日客流量</span>：{{customDetai.patientNum}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>税务登记证号</span>：{{customDetai.taxRegistration}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>备注</span>：{{customDetai.remark}}</div></el-col>
				  <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>营业执照</span>：
              <viewer>
                <img :src="customDetai.businessLicenseImgName" :key="customDetai.businessLicenseImgName" width="200">
              </viewer>
            </div>
          </el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>创建人</span>：{{customDetai.createPerson}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>创建时间</span>：{{customDetai.createDate}}</div></el-col>
				</el-row>

			</div>

		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>营销信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple">负责人：{{customDetai.name}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple">负责人手机号：{{customDetai.mobile}}</div></el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import goBack from 'src/components/goBack';//返回
	import {viewTerCustom} from 'src/api/province_url/customerManage';//调接口;

  export default {

    data() {
      return {
       	customDetai:{},
      }
    },
    mounted(){
      this.initData();//初始化数据
    },
    components:{
      goBack,//返回
    },
    methods: {
      initData:function(){
        viewTerCustom({clinicId: this.$route.query.id}).then(res =>{
          console.log("调viewTerCustom接口res:",res)
          this.customDetai = res.data.data;
        })
      }
    }
  }
</script>
<style lang="scss">
	.el-col-group{
		.el-radio{
			display: block;
			margin-left:30px;
			line-height: 36px;
		}
	}
</style>

<style lang="scss" scoped="scoped">
	@mixin ft($dirc){
	float:$dirc;
}
@mixin wh($w,$h){
	width:$w;
	height:$h;
	line-height: $h;
}
.goBackWraper{
	span{
		@include ft(left);
		line-height:40px;
	}
	.backBtn{
		@include wh(90px,40px);
		@include ft(right);
	    text-align: center;
	    background: #fff;
	    font-size: 18px;
	    color: #e02222;
	    border-radius: 2px;
	}
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
			width:90px;
			text-align:justify;
			text-align-last:justify;
            text-justify:inter-ideograph;/*IE*/
           text-align-last:inter-ideograph;
		}
		.viewRemark{
			color:#1f5dbc;
		}

	}
}
.areaWraper{
	.el-col-group{
		height:400px;
		overflow:auto;
	}


}
</style>
