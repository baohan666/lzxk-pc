<!--
	总部 - 欠货管理
-->

<template>
	<div class="accountManage">
		<div id="" v-show="!handleEditShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="省区经理：">
						<el-input v-model="managerName" placeholder="请输入省区经理"></el-input>
					</el-form-item>

					<div class="div-inline el-form-item">
						<depart-componet departMsg="事业部：" @selectSuccess="selectSuccess"></depart-componet>
					</div>
					<el-form-item label="状态：">
						<el-select v-model="oweStatus" placeholder="请选择订单状态">
							<el-option label="请选择状态" value=''></el-option>
							<el-option label="不许提单" value='2'></el-option>
							<el-option label="已提单" value='4'></el-option>
							<el-option label="未提单" value='6'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属省区：">
						<el-input v-model="provinceName" placeholder="请输入省区名称"></el-input>
					</el-form-item>
					<el-form-item label="是否提醒：">
						<el-select v-model="isRemind" placeholder="全部">
							<el-option label="全部" value=''></el-option>
							<el-option label="是" value='1'></el-option>
							<el-option label="否" value='0'></el-option>
						</el-select>
					</el-form-item>

					<div class="div-inline select-more" @click="spreadCon()">
						更多筛选 <i class="el-icon-arrow-down"></i>
					</div>

					<button @click="searchQuery()" class='el-button-red btn'>查询</button>
					<button @click="checkOutOrderInfo()" class='el-button-red btn'>导出</button>

				</el-form>
				<el-form ref="form" :inline="true" class="demo-form-inline slideDown">

					<div class="div-inline el-form-item">
						<div class="div-inline">提交时间：</div>
						<datepicker startIsShow="true" endIsShow="true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'creatData')"></datepicker>
					</div>
				</el-form>

			</div>
			<div class='table_wrap'>
				<el-table :data="tableData" border>
					<el-table-column prop="createDate" label="提交订单时间" align='center'>
					</el-table-column>
					<el-table-column prop="deptName" label="事业部" align='center'>
					</el-table-column>
					<el-table-column prop="provinceName" label="所属省区" align='center'>
					</el-table-column>
					<el-table-column prop="managerName" label="省区经理" align='center'>
					</el-table-column>
					<el-table-column prop="goodsName" label="产品名称" align='center'>
					</el-table-column>
					<el-table-column prop="specsMax" label="规格" align='center'>
					</el-table-column>
					<el-table-column prop="price" label="省区单价" align='center'>
					</el-table-column>
					<el-table-column prop="totalBox" label="数量" align='center'>
					</el-table-column>
					<el-table-column prop="totalPrice" label="合计金额" align='center'>
					</el-table-column>
					<el-table-column prop="goodsTypeStr" label="产品类型" align='center'>
					</el-table-column>
					<el-table-column prop="oweStatusStr" label="状态" align='center'>
					</el-table-column>
					<el-table-column prop="isRemindStr" label="是否提醒" align='center'>
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center'>
						<template slot-scope="scope">
							<div class="operateBtn" v-if="scope.row.oweStatus == 1&&scope.row.isRemindStr == '否'" @click="dialogVisible = true,id = scope.row.id,dailogCon='确定提醒省区可以提单?',dailogConShow = true,dailogTitleType='提示' ">提醒省区</div>
							<div class="operateBtn" v-if="scope.row.oweStatus == 1" @click="dialogVisible = true,id = scope.row.id,dailogCon='确定提醒省区可以提单?',dailogConShow = false,dailogTitleType='提示'">不许提单</div>
							<div class="operateBtn" v-if="scope.row.oweStatus == 2" @click="dailogCon = scope.row.closeReason,dialogVisible = true,dailogConShow = true,dailogTitleType='不许提单原因'">不许提单原因</div>
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row )">查看订单</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

<!--
	提醒省区 不许提单 查看订单——否 未提单
	不许提单原因   查看订单——否  不许提单
	查看订单 —— 已提单
	不许提单 查看订单——人员删除
-->
			<el-dialog :title="dailogTitleType" :visible.sync="dialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
				<div class="dailogCon" v-if="dailogConShow">
					<span>{{dailogCon}}</span>
				</div>
				<div class="dailogCon" v-if="!dailogConShow">
					<span> 不许提单原因：</span>
					<el-input type="textarea" v-model="reason" ></el-input>
				</div>

				<span slot="footer">
					<button v-if="!dailogConShow" @click="notAllow()" class="el-button-red">确定</button>
					<button v-if="dailogConShow && dailogTitleType!='不许提单原因'" @click="remindProvince()" class="el-button-red">确定</button>
				</span>
			</el-dialog>

		</div>
		<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>

	</div>

</template>

<script>
	import {
		getZBOweList,
		outputZBOweList,
		getOrdersStatus,
		remindProvince,
		notAllow
	} from 'src/api/headquarter_url/orderManage';
	import datepicker from 'components/data-plugin'
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				id:'',
				reason:'',//不许提单原因
				totalRecords: 0 //总条数
					,
				totalPageCnt: 0 //总页数
					,
				pagin_show: true,
				pageIndex: 1,
				pageSize: 10,
				ordersNum: '' //订单编号
					,
				submitName: '' //提交人
					,
				departmentId: '' //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
					,
				oweStatus: '' //2. 不许提单 4.已提单 6未提单
					,
				provinceName: '' //省区名字
					,
				managerName: '' //省区经理名字
					,
				startCreateDate: '' //创建时间  开始--和结束时间必须同时选择
					,
				endCreateDate: '' //创建时间 结束
					,
				isRemind: '',
				tableData: [],
				ordersStatusList: [] //订单状态 后台接口
					,
				dailogConShow :false,
				handleEditShow: false,
				ordersFrom: '' // 订单类型
					,
				dailogTitleType:'提示',
				dailogCon:'',
				dialogVisible:false,
			}
		},

		mounted: function() {

			this.getData(this.pageIndex, this.pageSize)
		},
		components: {
			departComponet,
			datepicker,
			elPagination
		},
		methods: {
			getData(pageIndex, pageSize, departmentId, provinceName, managerName, oweStatus, startCreateDate, endCreateDate, isRemind) {
				getZBOweList({
					'pageSize': pageSize //每页大小
						,
					'pageIndex': pageIndex,
					'departmentId': departmentId //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
						,
					'provinceName': provinceName //省区名字
						,
					'managerName': managerName //省区经理名字
						,
					'oweStatus': oweStatus //需补货产品：显示4-7的状态下拉4.已提交 5.待审核 6 未提交 7 已完成 主品盈余和其他下拉显示这两个： 8 待处理 9已处理
						,
					'startCreateDate': startCreateDate //创建时间  开始--和结束时间必须同时选择
						,
					'endCreateDate': endCreateDate //创建时间 结束
						,
					'isRemind': isRemind
				}).then(res => {
					const datas = res.data.data;
					if(Object.keys(datas.dataList).length > 0) {
						this.totalRecords = datas.totalRecords;
						this.totalPageCnt = datas.totalPageCnt;
						this.pageIndex = datas.pageIndex;
						this.tableData = datas.dataList;
						this.pagin_show = true;
					} else {
						this.tableData = [];
						this.pagin_show = false;
					}

				})
			},

			//查询
			searchQuery() {
				this.getData(1, this.pageSize, this.departmentId,this.provinceName, this.managerName, this.oweStatus, this.startCreateDate, this.endCreateDate, this.isRemind)
			},
			//点击分页
			updataPage(val) {
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				this.getData(this.pageIndex,this.pageSize);
			},
			//点击事业部
			selectSuccess(val) {
				this.departmentId = val;
				console.log(this.departmentId);
			},
			//获取订单状态
			getOrdersStatus() {
				getOrdersStatus().then(res => {
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
					val.type == "startDate" ? this.startCreateDate = val.data : this.endCreateDate = val.data;
			},

			//编辑返回按键
			backBtn() {
				this.handleEditShow = false;
				this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selStatus, this.selSole)

			},

			//清空
			//导出
			checkOutOrderInfo() {

				outputZBOweList({
				
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

			// 分页导航
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getData(this.pageIndex, this.pageSize)
			},
			//提醒省区
			remindProvince(){
				remindProvince({
					"id":this.id
				}).then(res=>{
					console.log(res)
					this.dialogVisible = false;
					this.$message.success('提醒省区成功');
					this.getData(this.pageIndex, this.pageSize, this.departmentId,this.provinceName, this.managerName, this.oweStatus, this.startCreateDate, this.endCreateDate, this.isRemind)

				})
			},
			//不许提单
			notAllow(){
				notAllow({
					"id":this.id,
					'reason':this.reason
				}).then(res =>{
					console.log(res)
					this.dialogVisible = false;
					this.getData(this.pageIndex, this.pageSize, this.departmentId,this.provinceName, this.managerName, this.oweStatus, this.startCreateDate, this.endCreateDate, this.isRemind)
				})
			},

			//查看订单详情
			handleCheck(index, row) {
				this.$router.push({path:'/provinceOrderDetailZB',query:{id:row.oldOrdersId}});
			}


		}
	}
</script>

<style lang='scss' scoped="scoped">
  .btn{
    margin-bottom: 12px;
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



	.dailogCon{
		width: 100%;
		line-height: 150px;
		text-align: center;
		font-size: 14px;
		span{
			line-height: 10px;
			input{
				border: 1px solid  #1f5dbc;
			}
		}

	}

</style>
