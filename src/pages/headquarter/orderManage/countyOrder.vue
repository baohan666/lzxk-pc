<!--
	总部 - 地县订单
-->

<template>
	<div class="accountManage">
		<div id="" v-show="!handleDetailShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="订单编号：">
						<el-input v-model="ordersNum" placeholder="请输入订单编号 " class="handle-input">
						</el-input>
					</el-form-item>
					<el-form-item label="提交人：">
						<el-input v-model="submitName" placeholder="请输入提交人 " class="handle-input">
						</el-input>
					</el-form-item>

					<div class="div-inline el-form-item">
						<depart-componet departMsg="事业部：" @selectSuccess="selectSuccess"></depart-componet>
					</div>
					<el-form-item label="订单状态：">
						<el-select v-model="ordersStatus" placeholder="请选择订单状态">
							<el-option label="请选择订单状态" value=''></el-option>
							<el-option v-for="(item,key,index) in ordersStatusList" :label="item" :value="key" :key="index"></el-option>
						</el-select>
					</el-form-item>

					<div class="div-inline select-more" @click="spreadCon()">
						更多筛选 <i class="el-icon-arrow-down"></i>
					</div>
					<button @click="searchQuery" class='el-button-red'>查询</button>
					<button @click="checkOutOrderInfo" class='el-button-red'>导出</button>

				</el-form>
				<el-form ref="form" :inline="true" class="demo-form-inline slideDown">

					<el-form-item label="所属省区：">
						<el-input v-model="provinceName" placeholder="请输入省区名称"></el-input>
					</el-form-item>
					<el-form-item label="省区经理：">
						<el-input v-model="managerName" placeholder="请输入省区经理"></el-input>
					</el-form-item>
					<div class="div-inline el-form-item">
						<div class="div-inline">创建时间：</div>
						<datepicker startIsShow="true" endIsShow="true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'creatData')"></datepicker>
					</div>
					<div class="div-inline el-form-item">
						<div class="div-inline">更新时间：</div>
						<datepicker startIsShow="true" endIsShow="true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'poliyData')"></datepicker>
					</div>
				</el-form>

			</div>
			<div class='table_wrap'>
				<el-table :data="tableData" border>
					<el-table-column prop="ordersNum" label="订单编号"  align='center'>
					</el-table-column>
					<el-table-column prop="deptName" label="事业部" align='center'>
					</el-table-column>
					<el-table-column prop="submitName" label="提交人" align='center'>
					</el-table-column>
					<el-table-column prop="position" label="职级" align='center'>
					</el-table-column>
					<el-table-column prop="provinceName" label="所属省区" align='center'>
					</el-table-column>
					<el-table-column prop="managerName" label="省区经理" align='center'>
					</el-table-column>
					<el-table-column prop="goodsType" label="产品种数" align='center'>
					</el-table-column>
					<el-table-column prop="totalBalancePrice" label="终端结算金额"  align='center'>
					</el-table-column>
					<el-table-column prop="totalBalancePrice" label="省区结算金额"  align='center'>
					</el-table-column>
					<el-table-column prop="ordersStatusStr" label="订单状态" align='center'>
					</el-table-column>
					<el-table-column prop="createDate" label="创建时间"  align='center'>
					</el-table-column>
					<el-table-column prop="modifyDate" label="更新时间"  align='center'>
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center' >
						<template slot-scope="scope">
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row )">查看订单</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>

		</div>

	</div>

</template>

<script>
	import {
		getOrdersList,
		checkOutOrderInfo,
		getCityOrdersStatus,
		getOrdersDetail
	} from 'src/api/headquarter_url/orderManage';
	import datepicker from 'components/data-plugin'
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				totalRecords: 0 //总条数
					,
				totalPageCnt: 0	//总页数
					,
				pagin_show: true
					,
				pageIndex: 1
					,
				pageSize: 10
					,
				ordersNum: '' //订单编号
					,
				submitName: '' //提交人
					,
				departmentId: '' //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
					,
				ordersStatus: '' //订单状态：1.待地总审核2.待省区财务审核3.待省总审核4.预采购单5.待资质审核6.待销管审核7.待财务审核8.待发货9.待收货10部分收货11.已收货12.已驳回13.已取消14.待确认15.省区财务驳回
					,
				provinceName: '' //省区名字
					,
				managerName: '' //省区经理名字
					,
				startCreateDate: '' //创建时间  开始--和结束时间必须同时选择
					,
				endCreateDate: '' //创建时间 结束
					,
				startModifyDate: '' //修改时间 开始
					,
				endModifyDate: '' //修改时间 结束--开始结束同时选择
					,
				tableData: [],
				ordersStatusList: [] //订单状态 后台接口
					,
				handleDetailShow:false,
			}
		},
		mounted: function() {

			this.getData(this.pageIndex, this.pageSize);
			this.getOrdersStatus();
		},
		components: {
			departComponet,
			datepicker,
			elPagination,
		},
		methods: {
			getData(pageIndex, pageSize, ordersNum, submitName, departmentId, ordersStatus, provinceName, managerName, startCreateDate, endCreateDate, startModifyDate, endModifyDate) {

				getOrdersList({
					'pageSize': pageSize //每页大小
						,
					'pageIndex': pageIndex
						,
					'ordersNum': ordersNum //订单编号
						,
					'submitName': submitName //提交人
						,
					'departmentId': departmentId //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
						,
					'ordersStatus': ordersStatus //订单状态：1.待地总审核2.待省区财务审核3.待省总审核4.预采购单5.待资质审核6.待销管审核7.待财务审核8.待发货9.待收货10部分收货11.已收货12.已驳回13.已取消14.待确认15.省区财务驳回
						,
					'provinceName': provinceName //省区名字
						,
					'managerName': managerName //省区经理名字
						,
					'startCreateDate': startCreateDate //创建时间  开始--和结束时间必须同时选择
						,
					'endCreateDate': endCreateDate //创建时间 结束
						,
					'startModifyDate': startModifyDate //修改时间 开始
						,
					'endModifyDate': endModifyDate //修改时间 结束--开始结束同时选择
				}).then(res => {
					console.log(res)
						const datas=res.data.data;
						if(Object.keys(datas.dataList).length>0){
		        		this.totalRecords=datas.totalRecords;
			        	this.totalPageCnt=datas.totalPageCnt;
			        	this.pageIndex=datas.pageIndex;
			        	this.tableData= datas.dataList;
			        	this.pagin_show = true;
			        	}else{
			        		this.tableData= [];
			        		this.pagin_show= false;
			        	}
				})
			},

			//查询
			searchQuery() {
				this.getData(1, this.pageSize, this.ordersNum, this.submitName, this.departmentId, this.ordersStatus, this.provinceName, this.managerName, this.startCreateDate, this.endCreateDate, this.startModifyDate, this.endModifyDate)
			},
				//点击分页
			updataPage(val){
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				this.getData(this.pageIndex, this.pageSize, this.ordersNum, this.submitName, this.departmentId, this.ordersStatus, this.provinceName, this.managerName, this.startCreateDate, this.endCreateDate, this.startModifyDate, this.endModifyDate)
			},
			//点击事业部
			selectSuccess(val) {
				this.departmentId = val;
				console.log(this.departmentId);
			},
			//获取订单状态
			getOrdersStatus(){
				getCityOrdersStatus().then(res=>{
					this.ordersStatusList = res.data.data
				})
			},
			//点击筛选更多==-
			spreadCon() {
				let myDiv = document.querySelector(".slideDown");
				if(myDiv.classList.contains('spreadSlowlly')) {
					myDiv.classList.remove("spreadSlowlly");
					return false;
				}
				myDiv.classList.add("spreadSlowlly");
			},
			//日期组件
			changeSelect(val, type) {
				console.log(val, type);
				if(type == "poliyData") {
					val.type == "startDate" ? this.startModifyDate = val.data : this.endModifyDate = val.data;
				} else {
					val.type == "startDate" ? this.startCreateDate = val.data : this.endCreateDate = val.data;
				}
			},

			//编辑返回按键
			backBtn() {
				this.handleEditShow = false;
				this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selStatus, this.selSole)

			},

			//导出
			checkOutOrderInfo() {

				checkOutOrderInfo({
					'ordersNum': this.ordersNum //订单编号
						,
					'submitName': this.submitName //提交人
						,
					'departmentId': this.departmentId //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
						,
					'ordersStatus': this.ordersStatus //订单状态：1.待地总审核2.待省区财务审核3.待省总审核4.预采购单5.待资质审核6.待销管审核7.待财务审核8.待发货9.待收货10部分收货11.已收货12.已驳回13.已取消14.待确认15.省区财务驳回
						,
					'provinceName': this.provinceName //省区名字
						,
					'managerName': this.managerName //省区经理名字
						,
					'startCreateDate': this.startCreateDate //创建时间  开始--和结束时间必须同时选择
						,
					'endCreateDate': this.endCreateDate //创建时间 结束
						,
					'startModifyDate': this.startModifyDate //修改时间 开始
						,
					'endModifyDate': this.endModifyDate //修改时间 结束--开始结束同时选择
				}).then(res => {
					console.log(res)
					let fileName = new Date().getTime() + '.xls';
					const blob = new Blob([res.data]);
					const elink = document.createElement('a');
					elink.download = fileName;
					elink.style.display = 'none';
					elink.href = URL.createObjectURL(blob);
					console.log(elink.href);
					document.body.appendChild(elink);
					elink.click();
					URL.revokeObjectURL(elink.href); // 释放URL 对象
					document.body.removeChild(elink);

				})
			},

			//查看订单详情
			handleCheck(index, row) {
				this.$router.push({path:'/countyOrderDetailZB',query:{id:row.id}});
			}

		}
	}
</script>

<style lang='scss' scoped="scoped">
@mixin ft($dirc){
	float:$dirc;
}
@mixin wh($w,$h){
	width:$w;
	height:$h;
	line-height: $h;
}

.goBackWraper{
	background: #EEEEEE;
	span{
		@include ft(left);
		line-height:40px;
		color:red;
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
						padding: 0 10px;
						height:50px;
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



	.slideDown {
		display: none;
	}

	.spreadSlowlly {
		display: block;
	}

	.select-more {
		margin: 0 30px;
		i {
			color: #9c9c9c;
		}
	}

	.handleEditShow {
		.el-tree {
			width: 500px;
		}
		font-size: 15px !important;
		.el-input {
			width: 438px;
		}
		.adminDetailBox {
			margin-left: 180px;
			padding: 15px 0;
			.addRoleRemark {
				width: 438px;
				height: 120px;
				padding: 6px 6px;
				margin-left: 6px;
				border: 1px solid #ccc;
				border-radius: 3px;
			}
			.el-form-item__label {}
			.status {
				margin-left: 12px;
				font-size: 15px;
			}
			.deptBox {
				line-height: 40px;
				height: 40px;
				.dept {
					width: 80px;
					text-align: right;
					float: left;
					font-size: 14px;
					color: #606266;
					line-height: 40px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
				}
				.deptCheck {
					margin-left: 10px;
				}
			}
		}
		div {
			.product_button {
				margin: 30px 0 20px 50px;
				padding: 0 3px;
				background: #e02222;
				width: 108px;
				height: 36px;
				border-radius: 3px;
				color: #fff;
				font-size: 14px;
				border: none;
				display: inline-block;
				text-align: center;
				line-height: 36px;
				cursor: pointer;
			}
			.adminDetailTitle {
				font-size: 18px;
				margin: 10px 0;
			}
		}
	}
</style>

