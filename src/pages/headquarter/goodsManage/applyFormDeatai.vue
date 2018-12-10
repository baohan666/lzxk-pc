<template>
	<div>
		<go-back title="改价"></go-back>
		<div class="infoDetail">
			<el-row :gutter="20">
				<span>{{infoList.submitProvince}}</span>
				<span>{{infoList.submitName}}</span>
			</el-row>
			<el-row :gutter="20">
				<span>申请时间： {{infoList.createDate}}</span>
				<span>编号： {{infoList.applyNum}}</span>
				<span>改价原因： {{infoList.changeReason}}</span>
			</el-row>
			<el-row :gutter="20" v-if="infoList.appCheck">
				<span>审核状态： {{infoList.appCheck.type==1 ? "通过" : "不通过"}}</span>
				<span>审核时间： {{infoList.appCheck.createDateStr}}</span>
				<span>审核人： {{infoList.appCheck.handleName}}</span>
				<span>审核原因： {{infoList.appCheck.reason}}</span>
			</el-row>
			<el-row :gutter="20" v-if="infoList.appApprove">
				<span>审批状态： {{infoList.appApprove.type==1 ? "通过" : "不通过"}}</span>
				<span>审批时间： {{infoList.appApprove.createDateStr}}</span>
				<span>审批人： {{infoList.appApprove.handleName}}</span>
				<span>审批原因： {{infoList.appApprove.reason}}</span>
			</el-row>
		</div>
		<div class="table_wrap">
			<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
			    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
			    <el-table-column prop="specsMax" label="规格"></el-table-column>
			    <el-table-column prop="strmanufacturer" label="生产企业"></el-table-column>
			  	<el-table-column prop="strdrugType" label="剂型"></el-table-column>
			    <el-table-column prop="areaName" label="区域名"></el-table-column>
			    <el-table-column prop="userName" label="区域经理" width="120"></el-table-column>
			    <el-table-column prop="strposition" label="职务" width="120"></el-table-column>
			    <el-table-column prop="priceType1" label="改价类型"></el-table-column>
			    <el-table-column prop="companyStandardPrice" label="公司标准价" width="100"></el-table-column>
			    <el-table-column prop="fixedPrice" label="省区定价" width="100"></el-table-column>
			    <el-table-column prop="oldPrice" label="改价前" width="100"></el-table-column>
			    <el-table-column prop="newPrice" label="改价后" width="100"></el-table-column>
		  	</el-table>
		  	<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>

		</div>

		<div class="operateWraper">
			<div v-if="!infoList.appCheck">
				<div class="div-inline el-button-red" @click = "checkApply(1)">审核通过</div>
				<div class="div-inline el-button-red" @click = "checkApply(2)">审核不通过</div>
			</div>
			<div v-if="!infoList.appApprove && infoList.appCheck">
				<div class="div-inline el-button-red" @click = "approveApply(1)">审批通过</div>
				<div class="div-inline el-button-red" @click = "approveApply(2)">审批不通过</div>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogReasonVisible" :append-to-body='true' width="35%">
			<div class= 'dialog_body_content'>
				<div class="dialog_changePrice_reason">
					{{dialogTitle}}：
					<textarea class="checkReason" placeholder="请填写原因" v-model="changeReason" name="" id="" cols="30" rows="10"></textarea>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
    			<el-button v-show="changeReason==''" type="danger" class="dialogDisaBtn" disabled>确定</el-button>
				<span v-show="changeReason!=''" class="dialog-sure-btn dialoperateBtn" @click="checkSure()">确定</span>
			</div>
		</el-dialog>

	</div>

</template>
<script>
	import elPagination from 'components/el-page';
	import goBack from 'src/components/goBack';
	import {getStore} from 'src/config/cache'
  	import {getApplyFormDetailData, checkApplyPassData, approveApplyPassData} from 'src/api/headquarter_url/goodsManage';

  export default {
  	name : 'detailFeedbackZB',
    data() {
      	return {
       		infoList:[]  //对象
       		,tableData: []	//数据列表
       		,totalRecords: 0 //总条数
	      	,totalPageCnt: 0 //总页数
	      	,pageIndex: 1 //当前页
	      	,pageSize:10
	      	,pagin_show:true

       		,dialogReasonVisible: false
       		,changeReason:''//原因
       		,dialogTitle:"审核原因" //审核或审批
       		,dialogCheckStatus: 1 //1通过，2 不通过
      	}
    },
    created(){
		this.initData() // 页面初始化
	},
	components:{
		goBack,
	    elPagination
	},
    methods: {
        initData(){
	        getApplyFormDetailData({applyId: this.$route.query.applyId, pageSize: 10, pageIndex:1 }).then(res => {
            const datas=res.data.data;
            this.infoList=datas.headObj;
            this.tableData =datas.list.dataList;
	        	this.totalRecords=datas.totalRecords;
		        this.totalPageCnt=datas.totalPageCnt;
		        this.pageIndex=datas.pageIndex;
	        })
		},
		//确定按钮
		checkSure(){
			let datalist = {
				applyId: this.$route.query.applyId,
				isPass: this.dialogCheckStatus, //1通过 2不通过
				userId: getStore('accountId'),
				reason: this.changeReason
			}
			if(this.dialogTitle=='审核原因'){//审核
				checkApplyPassData(datalist).then( res => {
					this.$message.success("处理成功")
					this.dialogReasonVisible = false;
					this.$router.push({"path": "applicationFormZB"});
				})
			}else{//审批
				approveApplyPassData(datalist).then( res => {
					this.$message.success("处理成功")
					this.dialogReasonVisible = false;
					this.$router.push({"path": "applicationFormZB"});
				})
			}

		},
		//审核通过或者不通过
		checkApply(type){
			this.dialogReasonVisible=true;
			this.dialogCheckStatus=type;
			this.dialogTitle='审核原因';
			this.changeReason=""
		},
		//审批通过或者不通过
		approveApply(type){
			console.log(type);
			this.dialogReasonVisible=true;
			this.dialogCheckStatus=type;
			this.dialogTitle='审批原因';
			this.changeReason=""
		},
		//点击分页
			updataPage(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},

    },


}
</script>
<style lang="scss" scoped="scoped">

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
.table_wrap{
	margin:30px;
	padding:20px;
	background:#fff;
	color:#666;

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
