<template>
	<div>
		<el-dialog title="改价日志" :visible.sync="dialogHintVisible" :append-to-body='true' width="84%">
			<div class= 'dialog_body_content'>
				<div class="dialog_header">
					<el-row :gutter="20">
						<span>{{headerData.goodsName}}</span>
						<span>{{headerData.goodsSpec}}</span>
						<span>{{headerData.goodsManufacturer}}</span>
						<span>{{headerData.goodsType}}</span>
					</el-row>
					<el-row :gutter="20">
						<span>公司标准价-省区： {{headerData.provinceStandardPrice}}</span>
						<span>公司标准价-地区： {{headerData.cityStandardPrice}}</span>
						<span>公司标准价-县区： {{headerData.countyStandardPrice}}</span>
						<span>公司定价-省区： {{headerData.provinceFixedPrice}}</span>
						<span>公司定价-地区： {{headerData.cityFixedPrice}}</span>
						<span>公司定价-县区： {{headerData.countyFixedPrice}}</span>
					</el-row>
					<el-row :gutter="20">
						<span>{{headerData.provinceName}}</span>
						<span>{{headerData.provinceManagerName}}</span>
						<span>{{headerData.provinceManagerPosition}}</span>
					</el-row>
				</div>
				<div class="table_wrap">
					<el-table :data="tableData" ref="tableData" border max-height="450">
						<el-table-column prop="createDate" label="申请时间"></el-table-column>
						<el-table-column prop="submitName" label="提交人"></el-table-column>
						<el-table-column prop="priceTypeStr" label="改价类型"></el-table-column>
						<el-table-column prop="changeReason" label="改价原因"></el-table-column>
						<el-table-column prop="oldPrice" label="改价前"></el-table-column>
						<el-table-column prop="newPrice" label="改价后"></el-table-column>
						<el-table-column prop="applicationStatus" label="审核状态"></el-table-column>
						<el-table-column prop="handleReason" label="原因"></el-table-column>
						<el-table-column prop="handleDate" label="审核时间"></el-table-column>
						<el-table-column prop="handleName" label="审核人"></el-table-column>
					</el-table>
				</div>
			</div>
		</el-dialog>	
	</div>
</template>

<script>
	export default {
	    data() {
	      	return {
	      		headerData:[],//药品内容
	      		tableData:[],//table数据
				dialogHintVisible: false
	      	};
	    },
	    props: ["changPriLogData"],
	    watch:{
	    	changPriLogData(val){
	    		this.headerData = val.headObj;
	    		this.tableData = val.list.dataList;
	    	}
	    },
	    created(){
	
	    },
	    methods: {
	    	//弹窗展示
	    	dialogShow(){
				this.dialogHintVisible=true;
			},
			//弹窗隐藏
			dialogHide(){
				this.dialogHintVisible=false;
			},
	    }
  	};
	
</script>

<style lang="scss" scoped="scoped">
	.dialog_header{
		padding:20px 36px;
		line-height: 30px;
		color:#333;
		span{
			padding-right:15px;	
		}
	}
	.table_wrap, .el-dialog__body{
		border-bottom:none !important;
		padding:20px 40px;
	}
</style>