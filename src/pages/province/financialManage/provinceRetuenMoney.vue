<!--省区：财务管理：地县回款-->
<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
			  	<el-form-item label="区域经理：">
			    	<el-input v-model="areaManager" placeholder="请输入区域经理名称"></el-input>
			  	</el-form-item>
         <el-form-item>
           <el-select v-model="status" placeholder="请选择审核状态">
             <el-option label="请选择审核状态" value='-1'>请选择审核状态</el-option>
             <el-option v-for="(item,key,index) in checkStatusMenu" :label="item" :value="key" :key="index"></el-option>
           </el-select>
         </el-form-item>
			  	<el-form-item label="所属区域：">
			    	<el-input v-model="areaName" placeholder="请输入所属区域"></el-input>
			  	</el-form-item>
			  	<div class="div-inline el-form-item">
			  		<div class="div-inline">回款时间：</div>
				  	<datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="changeSelect"></datepicker>
			  	</div>
			    <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	</el-form>
		</div>
		<div class="table_wrap">
			<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
        <el-table-column prop="areaManager" label="区域经理"></el-table-column>
        <el-table-column prop="areaName" label="所属区域"></el-table-column>
        <el-table-column prop="createDate" label="回款时间"></el-table-column>
			    <el-table-column prop="mobile" label="联系电话"></el-table-column>
			    <el-table-column prop="orderTypeStr" label="回款方式"></el-table-column>
			    <el-table-column prop="actualCollectionPrice" label="回款金额"></el-table-column>
			    <el-table-column prop="needCollectionPrice" label="回款订单总金额"></el-table-column>
			    <el-table-column prop="orderNums" label="回款订单数"></el-table-column>
			    <el-table-column prop="checkStatus" label="状态"></el-table-column>
			    <el-table-column prop="address" label="操作" width="150">
			    	<template slot-scope="scope">
						<div class="operateBtn" @click="toCheck(scope.row.id)">查看</div>
				    </template>
			    </el-table-column>
		  	</el-table>
	  		<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
	 	</div>
	 	<promptDialog ref="reaRefuseDialog" :promptMsg="promptMsg"></promptDialog>

	 	<el-dialog title="提示" :visible.sync="dialogCheckVisible" :append-to-body='true' width="35%">
			<div class= 'dialog_body_content'>
				<div class="checkResult">
					审核结果：
					<el-radio-group v-model="radioActive" class="selectRadio">
						<el-radio :label="1">通过</el-radio>
		    			<el-radio :label="2">不通过</el-radio>
				    </el-radio-group>
				</div>
				<div class="checkFail" v-if="radioActive==2">
					审核原因：
					<textarea class="checkReason" v-model="checkReason" name="" id="" cols="30" rows="10"></textarea>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogPWDVisible = false">取消</span>
    			<el-button v-show="radioActive=='' || radioActive==2 && checkReason==''" type="danger" class="dialogDisaBtn" disabled>确定</el-button>
				<span v-show="radioActive==1 || radioActive==2 && checkReason!=''" class="dialog-sure-btn dialoperateBtn" @click="checkPass()">确定</span>
			</div>

		</el-dialog>

	</div>

</template>

<script>
	import datepicker from 'components/data-plugin'
	import addressPlugin from 'components/address';
	import elPagination from 'components/el-page';
	import promptDialog from 'components/promptDialog'
  import {getProCollectionData} from 'src/api/province_url/financialManage';//调接口

  export default {
    data() {
      return {
      	startDate: '',//开始日期
        endDate: '',//结束日期
        status: "",//审核状态
        checkStatusMenu:{"0":"待审核","1":"审核通过","2":"已驳回"},//审核下拉列表
        areaManager: '',//区域经理名称
        areaName: '',//区域名称


		    tableData:[],//table列表
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

      	promptMsg:'', //提示信息
      	rejectReason:'', //驳回原因

      	dialogCheckVisible: false,//审核
      	radioActive:'',//审核结果
      	checkReason:'',//审核原因
      	goodsId:''//商品id

      }
    },
 	  created(){
    	let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
      this.initData(datalist)
    },
	  components:{
        elPagination,
        addressPlugin,
        datepicker,
        promptDialog
    },
    methods: {
    	//页面初始化
	    initData(datalist){
	    	console.log(datalist);
			  //获取table数据列表和分页信息
        getProCollectionData(datalist).then(res => {
	        	const datas=res.data.data;
	        	if(datas.dataList.length>0){
	        		this.totalRecords=datas.totalRecords;
		        	this.totalPageCnt=datas.totalPageCnt;
		        	this.pageIndex=datas.pageIndex;
		        	this.tableData= datas.dataList;
              this.pagin_show= true;
	        	}else{
	        		this.tableData= [];
	        		this.pagin_show= false;
	        	}

    		})
    	},
    	//获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,startDate:this.startDate
          ,endDate:this.endDate
          ,areaManager: this.areaManager
          ,areaName: this.areaName
          ,status: this.status=="-1"?"":this.status
        };
        return datalist;
      },

		  //日期组件
			changeSelect(val){
				val.type == "startDate"?this.startDate = val.data : this.endDate = val.data;
			},
			//点击查询按钮
			toInquire(){
				let datalist=this.getsearchInfo(1,this.pageSize);
				this.initData(datalist);
			},

			//点击查看
			toCheck($id){
        this.$router.push({path:'/provinceRetuenMoneyDetailSQ',query:{id:$id}});
			},
			//审核通过
			checkPass(){
				let datalist = {
					flag: this.radioActive,//1通过 2驳回
					ordersCollectionId: this.goodsId,
					rejectReason:this.checkReason
				};
				saveCheckData(datalist).then( res => {
					this.$message.success('审核成功');
					this.dialogCheckVisible = false;
					let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
					this.initData(datalist)
				})
			},
			//驳回原因
			reasonRefuse($id){
				this.$refs.reaRefuseDialog.dialogShow();
				reasonRefuseData({ordersCollectionId: $id}).then(res => {
					this.promptMsg= res.data.data.rejectReason;
				})
			},

			//点击分页
			updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},


    }
  }
</script>
<style lang="scss">
	.search_wrap .province_city_county .el-form-item__content{
		width:auto;
	}
	.el-input__inner{
		padding:0 10px;
	}
</style>
<style lang='scss' scoped="scoped">

.bitchRemove{
	margin-bottom:20px;
}
.slideDown{
	display: none;
}
.spreadSlowlly{
	display: block;
}
.select-more{
	margin:0 30px;
	i{
		color:#9c9c9c;
	}
}
.el-button-red{
	margin-bottom: 20px;
}
.province_city_county{
	display: inline-block;
}
.dialog_body_content{
	padding:20px 30px;
}
.checkFail{
	margin-top:30px;
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
.returnProve{
	display: inline-block;
	width:30%;
	height:30%;
	img{
		width:100%;
		height:100%;
	}

}
.operateBtn{
  display: inline-block;
  color: #1f5dbc !important;
  margin-right: 8px;
  cursor: pointer;
}
</style>
