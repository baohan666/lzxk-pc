<!---->
<template>
	<div class="create_wraper">
    <go-back title="查看商业公司"></go-back>
		<el-form :model="ruleForm" :inline="true"  ref="ruleForm" class="demo-form-inline">

		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
					<el-row :gutter="20">
					  <el-col :span="7">
					  	<el-form-item label="客户编码：" class="is-required">{{ruleForm.bill.customerCode}}</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	<el-form-item label="商业公司名称：" class="is-required">{{ruleForm.bill.company}}</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	 <el-form-item label="客户基本分类：" class="is-required">
			        		{{ ruleForm.bill.customerType2 == 0 ? "GSP商业用户" : ruleForm.bill.customerType2 == 1 ? "自然人" : ruleForm.bill.customerType2 == 2 ? "非药品经营客户" : ruleForm.bill.customerType2 == 4 ? "医疗终端客户":""}}
					  	 </el-form-item>
					  </el-col>
					</el-row>
					<el-row :gutter="20">
				  <el-col :span="7">
				  	<el-form-item label="所在地区：" class="is-required">{{ruleForm.bill.provinceName}}   {{ruleForm.bill.cityName}}   {{ruleForm.bill.countyName}}</el-form-item>
				  </el-col>
				  <el-col :span="7">
				  	<el-form-item label="企业地址：" class="is-required">{{ruleForm.bill.companyAddress}}</el-form-item>
				  </el-col>
				  <el-col :span="7">
				  	<el-form-item label="纳税人登记号：" class="is-required">{{ruleForm.bill.taxpayerCode}}</el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7">
				  	<el-form-item label="法人代表：" class="is-required">{{ruleForm.bill.bossName}}</el-form-item>
				  </el-col>
				  <el-col :span="7">
				  	<el-form-item label="企业年报：" prop= "bill.annualReport">{{ruleForm.bill.annualReport}}</el-form-item>


				  </el-col>
				  <el-col :span="7">
				  	<el-form-item label="电话1：" class="is-required">{{ruleForm.bill.phoneOne}}</el-form-item>
				  </el-col>
				  <el-col :span="7">
				  	<el-form-item label="电话2：">{{ruleForm.bill.phoneTwo}}</el-form-item>
				  </el-col>
				</el-row>
			</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>账户信息：</div>

			<div class="detail_content" v-for = '(item,index) in ruleForm.bankAccount' :key="index">
				<div class="account_block_title">账户{{index+1}}</div>
					<el-row :gutter="20">
					  <el-col :span="7">
					  	<el-form-item label="账号：" class="is-required">{{item.accountNumber}}</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	<el-form-item label="户名：" class="is-required">{{item.accountName}}</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	<el-form-item label="开户银行：" class="is-required">{{item.depositBank}}</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	<el-form-item label="账户性质：" class="is-required" >
					  		{{item.accountType2 == 1? "公司" : "个人"}}
					  	</el-form-item>
					  </el-col>
					  <el-col :span="7">
					  	<el-form-item label="默认：" class="is-required">
						    <el-radio disabled  v-model="item.isDefault2" label="1">{{item.isDefault2=='1'?'是':'否'}}</el-radio>
						</el-form-item>
					  </el-col>
					</el-row>
			</div>
		</div>

		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>资质信息：</div>
			<div class="detail_content qualifiInfo_wraper">
				<div class='qualifiInfo_table'>
					<el-row align="middle">
					  	<el-col :span="4">资质名称</el-col>
					  	<el-col :span="4"><i class="requireStar">*</i>证照编码</el-col>
					  	<el-col :span="4">颁发机构</el-col>
					  	<el-col :span="4">颁发日期</el-col>
					  	<el-col :span="4"><i class="requireStar">*</i>有效期至</el-col>
					  	<el-col :span="4">经营范围</el-col>
					  	<!--<el-col :span="2">附件</el-col>-->
					</el-row>
					<el-row align="middle" v-for = '(item,index) in ruleForm.qualificationInfo' :key="index">
					  	<el-col :span="4">{{item.qualificationName}}</el-col>
					  	<el-col :span="4">{{item.licenseCode}}</el-col>
					  	<el-col :span="4">{{item.issueOrganization}}</el-col>
					  	<el-col :span="4">{{item.issueDate}}</el-col>
					  	<el-col :span="4">{{item.validDate}}</el-col>
					  	<el-col :span="4">
					  		<span class = "operateBtn" @click="viewRange(index,item.qualificationName)">查看</span>
					  	</el-col>
					  	<!--<el-col :span="2">-->
					  		<!--<span class = "operateBtn" @click="viewImg(index,item.qualificationName)">查看</span>-->
					  	<!--</el-col>-->
					</el-row>
				</div>
			</div>
		</div>
		</el-form>

		<el-dialog title="经营范围" :visible.sync="dialogAddVisible" :append-to-body='true'>
			<div class="dialog_body_title">
				<span class="textTip">{{qualificationNameTitle}}</span>
				<!--<span class="diolog_add_btn">新增</span>-->
			</div>
			<div class="dialog_body_content">
				<div class='qualifiInfo_table'>
					<el-row>
					  	<el-col :span="12">名称</el-col>
					  	<el-col :span="12">编码</el-col>
					</el-row>
					<!--<el-row v-if="rangList.length==0||rangList==''" v-for = '(item,index) in rangList' :key="index">
            <el-col :span="12">暂无数据</el-col>
            <el-col :span="12">暂无数据</el-col>
          </el-row>-->
					<el-row v-if="rangList.length>0" v-for = '(item,index) in rangList' :key="index">
					  	<el-col :span="12">{{item.typeName}}</el-col>
					  	<el-col :span="12">{{item.code}}</el-col>
					</el-row>
				</div>
			</div>

			<div slot="footer" class="dialog-footer">
				<span class="dialog-sure-btn dialoperateBtn" @click="dialogAddVisible = false">关闭</span>
			</div>
		</el-dialog>
		<el-dialog title="附件" :visible.sync="dialogUploadVisible" :append-to-body='true'>
			<div class= 'dialog_body_content'>
				<span class="tipInfo">{{qualificationNameTitle}}</span>
        <viewer :images="imgList">
          <img v-for= '(menu,index) in imgList' class="imgSize" :src="menu" alt="" :key="index"/>

        </viewer>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-sure-btn dialoperateBtn" @click="dialogUploadVisible = false">关闭</span>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {viewBusiCmpy} from 'src/api/headquarter_url/customerManage';
import goBack from 'src/components/goBack';//返回
export default {

	data() {
		return {
      qualificationNameTitle:'',//资质名称
			ruleForm: {//保存请求数据
				bill: {
					company:''  //商业公司名称
	      			,customerCode:'' //客户编码
	      			,customerType2:''//客户类型 1GSP商业用户2自然人3非药品经营客户4医疗终端客户
	      			,addressData: ''//企业地址
	      			,taxpayerCode:''//纳税人登记号
	      			,phoneOne:""//电话1
	      			,phoneTwo:""//电话2
	      			,createDate:''//创建时间
	      			,bossName:''//法人姓名
	      			,companyAddress: ''//企业地址
	      		},//账户信息
            bankAccount: [
		      		{
		      			accountNumber:''//账号
		      			,accountName:''//户名
		      			,depositBank:''//开户银行
		      			,accountType:''//账户性质
		      			,idDefault:'1'//是否默认
		      		},
	      		],
            qualificationInfo: [],	//资质信息
	     }
			,rangList:''//经营范围
			,imgList:[]//附件---图片路径
		    ,dialogAddVisible: false//添加编辑弹窗显示隐藏
	       	,dialogUploadVisible: false//上传编辑弹窗显示隐藏
	       	,operate_index:0
	       	,dialogAddlist: [{code:'',id:'',typeName:''}, ]
	       	,loading: false
	       	,options: [],
		}
	},
	mounted() {
		this.init();
	},
  components:{
    goBack,//返回
  },
	methods: {
		//
		init: function() {
				viewBusiCmpy({billId : this.$route.query.id}).then(res =>{
					this.ruleForm = res.data.data;console.log(JSON.stringify(this.ruleForm));
				})
    	},
    	//查看经营范围
    	viewRange: function($index,$qualificationNameTitle){
    		this.dialogAddVisible = true;
    		this.rangList = this.ruleForm.qualificationInfo[$index].list;
    		this.qualificationNameTitle=$qualificationNameTitle;
    	},
    	//查看附件
    	viewImg: function($index,$qualificationNameTitle){
    		this.dialogUploadVisible = true;
        this.qualificationNameTitle=$qualificationNameTitle;
    		this.imgList = this.ruleForm.qualificationInfo[$index].imgList;
    	}

    }
  }
</script>

<style lang='scss'>

  	.el-form--inline .el-form-item__content {
	    vertical-align: middle;
	}

	.el-dialog__body{
		padding: 0 0 30px !important;
	}

</style>


<style lang="scss" scoped>
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
.create_wraper {
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
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -moz-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: center;
            -moz-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;


						padding: 0 10px;
						height:60px;
            line-height: 16px;
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
			border-bottom:1px solid #e6e6e6;
		}
		.detail_content {
			padding: 10px 29px 0;
			line-height: 49px;
			font-size: 14px;
			.account_block_title{
				line-height: 30px;
			}
		}
		.qualifiInfo_wraper {
			margin: 30px 0;
		}
	}
	.operateWraper {
		margin: 50px;
		text-align: center;
		.el-button-red {
			padding: 0 0.5rem;
		}

	}
}


.dialog_body_title{
	padding:6px 28px;
	border-bottom:1px solid #e6e6e6;
	line-height:36px;
	.diolog_add_btn{
		@include wh(100px,36px);
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
.dialog_body_content{
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
						height:50px;
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
}

.imgSize{
	max-width:150px;
	margin:15px 15px 0 0;
}
</style>
