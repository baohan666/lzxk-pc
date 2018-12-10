<!--
	订单--省区
	 政策补货-分页
-->

<template>
	<div class="accountManage">
		<div id="" v-show="!handleDetailShow">
			<div class="search_wrap">
				<el-radio-group v-model="oweType" @change="changeHandler" class="selectRadio">
					<el-radio :label="2">需补货产品</el-radio>
    				<el-radio :label="3">主品盈余</el-radio>
    				<el-radio :label="4">其他</el-radio>
		  	  </el-radio-group>
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="区域经理：">
						<el-input v-model="oweName" placeholder="请输入区域经理"></el-input>
					</el-form-item>
					<el-form-item label="产品名称：">
						<el-input v-model="goodsName" placeholder="请输入产品名称"></el-input>
					</el-form-item>
					<el-form-item label="状态：" v-if="oweType==2">
						<el-select v-model="oweStatus" placeholder="请选择状态">
							<el-option label="请选择状态" value=''></el-option>
							<el-option label="未提交" :value="6" ></el-option>
							<el-option label="已提交" :value="4" ></el-option>
							<el-option label="已完成" :value="7" ></el-option>
							<el-option label="待审核" :value="5" ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态：" v-else>
						<el-select v-model="oweStatus" placeholder="请选择状态">
							<el-option label="请选择状态" value=''></el-option>
							<el-option label="待处理" :value="8" ></el-option>
							<el-option label="已处理" :value="9" ></el-option>
						</el-select>
					</el-form-item>
					<button @click="searchQuery" class='el-button-red'>查询</button>
					<button @click="checkOutOrderInfo" class='el-button-red'>导出</button>
				</el-form>
			</div>
			<div class='table_wrap'>
				<el-table v-if="oweType==2" :data="tableData" border key='firstTable'>
					<el-table-column prop="treeName" label="部门"  align='center'>
					</el-table-column>
					<el-table-column prop="oweName" label="区域经理" align='center'>
					</el-table-column>
					<el-table-column prop="position" label="职级" align='center'>
					</el-table-column>
					<el-table-column prop="goodsName" label="产品名称" align='center'>
					</el-table-column>
					<el-table-column prop="specsMax" label="规格"  align='center'>
					</el-table-column>
					<el-table-column prop="price" label="单价"  align='center'>
					</el-table-column>
					<el-table-column prop="totalBox" label="数量"  align='center'>
					</el-table-column>
					<el-table-column prop="totalPrice" label="合计金额"  align='center'>
					</el-table-column>
					<el-table-column prop="oweStatusStr" label="状态"  align='center'>
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center' >
						<template slot-scope="scope">
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row )">查看详情</div>
						</template>
					</el-table-column>
				</el-table>
			
				
				<el-table v-if="oweType==3" :data="tableData" border key='twoTable'>
					<el-table-column prop="treeName" label="部门"  align='center'>
					</el-table-column>
					<el-table-column prop="oweName" label="区域经理" align='center'>
					</el-table-column>
					<el-table-column prop="position" label="职级" align='center'>
					</el-table-column>
					<el-table-column prop="goodsName" label="产品名称" align='center'>
					</el-table-column>
					<el-table-column prop="specsMax" label="规格"  align='center'>
					</el-table-column>
					<el-table-column prop="totalBox" label="采购数量"  align='center'>
					</el-table-column>
					<el-table-column prop="price" label="采购单价"  align='center'>
					</el-table-column>
					<el-table-column prop="oweStatusStr" label="状态"  align='center'>
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center' >
						<template slot-scope="scope">
							<div class="operateBtn" v-show='scope.row.oweStatusStr != "已处理" ' @click="dialogVisible = true">待处理</div>
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row )">查看详情</div>
						</template>
					</el-table-column>
				</el-table>
				<el-table v-if="oweType==4" :data="tableData" border key='lastTable'>
					<el-table-column prop="treeName" label="部门"  align='center'>
					</el-table-column>
					<el-table-column prop="oweName" label="区域经理" align='center'>
					</el-table-column>
					<el-table-column prop="position" label="职级" align='center'>
					</el-table-column>
					<el-table-column prop="goodsName" label="产品名称" align='center'>
					</el-table-column>
					<el-table-column prop="specsMax" label="规格"  align='center'>
					</el-table-column>
					<el-table-column prop="totalBox" label="采购数量"  align='center'>
					</el-table-column>
					<el-table-column prop="price" label="采购单价"  align='center'>
					</el-table-column>
					<el-table-column prop="oweStatusStr" label="状态" align='center'>
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center' >
						<template slot-scope="scope">
							<div class="operateBtn"  @click="dialogVisible = true,oweStatus=scope.row.oweStatus,ordersOweId=scope.row.id" v-show='scope.row.oweStatusStr != "已处理" '>待处理</div>
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row )">查看详情</div>
						</template>
					</el-table-column>
				</el-table>
				</div>
			</div>

			<el-dialog :title="dailogTitleType" :visible.sync="dialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
				<div class="dailogCon">
					<span>{{dailogCon}}</span>
				</div>

				<span slot="footer">
				<span @click="getPolicyOweDeal()" class="dialogBtnTrue">确定</span>
				</span>

			</el-dialog>


			<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>

		</div>

	</div>

</template>

<script>
	import {
		getPolicyOweList,
		checkOutPolicyInfo,
		getPolicyOweDeal
	} from 'src/api/province_url/orderManage';
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
				oweType:2  //2.政策补货产品3.政策补货主品盈余产品4.政策补货政策副品
					,
				goodsName:''//产品名称
					,
				treeName: '' //事业部id  1.心脑事业部 2.风湿及骨科事业部3.云事业部4.消化事业部
					,
				oweStatus: '' //需补货产品：显示4-7的状态下拉4.已提交 5.待审核 6 未提交 7 已完成 主品盈余和其他下拉显示这两个：8 待处理 9已处理
					,
				provinceName: '' //省区名字
					,
				oweName: ''
					,//省区经理名字
				tableData: [],

				handleDetailShow:false,
				dailogTitleType:'提示',
				dialogVisible:false,
				dailogCon:''

			}
		},
		mounted: function() {
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.getData(datalist);
//			this.getData(this.pageIndex, this.pageSize,2);

		},
		components: {
			departComponet,
			datepicker,
			elPagination,
		},
		methods: {
			getData(datalist) {
				if(this.oweType==2){
					getPolicyOweList(datalist).then(res => {
							let datas = res.data.data;
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
				}else if(this.oweType==3){
					getPolicyOweList(datalist).then(res => {

						let datas = res.data.data;
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
				}else if(this.oweType==4){
					getPolicyOweList(datalist).then(res => {
					let datas = res.data.data;
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
				}

			},
			//获取参数
		getsearchInfo(pageIndex,pageSize){
			console.log(this.oweType);
			let datalist = {};
			if(this.oweType==2){
				datalist = {
					'pageIndex': pageIndex
						,
					'pageSize': pageSize //每页大小
						,
					'oweType': this.oweType //2.政策补货产品3.政策补货主品盈余产品4.政策补货政策副品
						,
					'goodsName': this.goodsName //产品名称
						,
					'oweName': this.oweName //省区经理名字
						,
					'oweStatus': this.oweStatus //需补货产品：显示4-7的状态下拉4.已提交 5.待审核 6 未提交 7 已完成 主品盈余和其他下拉显示这两个：8 待处理 9已处理
				};
			}else if(this.oweType==3){
				datalist = {
					'pageIndex': pageIndex
						,
					'pageSize': pageSize //每页大小
						,
					'oweType': this.oweType //2.政策补货产品3.政策补货主品盈余产品4.政策补货政策副品
						,
					'goodsName': this.goodsName //产品名称
						,
					'oweName': this.oweName //省区经理名字
						,
					'oweStatus': this.oweStatus //需补货产品：显示4-7的状态下拉4.已提交 5.待审核 6 未提交 7 已完成 主品盈余和其他下拉显示这两个：8 待处理 9已处理
				};
			}else if(this.oweType==4){
				datalist = {
					'pageIndex': pageIndex
						,
					'pageSize': pageSize //每页大小
						,
					'oweType': this.oweType //2.政策补货产品3.政策补货主品盈余产品4.政策补货政策副品
						,
					'goodsName': this.goodsName //产品名称
						,
					'oweName': this.oweName //省区经理名字
						,
					'oweStatus': this.oweStatus //需补货产品：显示4-7的状态下拉4.已提交 5.待审核 6 未提交 7 已完成 主品盈余和其他下拉显示这两个：8 待处理 9已处理
				};
			}
			return datalist;
		},

			//待处理
			getPolicyOweDeal(){
				getPolicyOweDeal({
				'ordersOweId':this.ordersOweId,
				'oweStatus':this.oweStatus
			}).then(res=>{
				console.log(res)
				this.dialogVisible =false;
				this.oweStatus = "";
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.getData(datalist);
			})
			},

			//查询
			searchQuery() {
				let datalist=this.getsearchInfo(1,this.pageSize);
				this.getData(datalist);
			},
			//点击分页
			updataPage(val){
				console.log(val)
        this.pageIndex = val.pageIndex;
        this.pageSize = val.pageSize;
				this.getData(this.pageIndex,this.pageSize)
//				let datalist=this.getsearchInfo(val.pageIndex,val.pageSize);
//				this.initData(datalist)
			},
			//点击事业部
			selectSuccess(val) {
				this.departmentId = val;
			},

			//切换
			changeHandler(val){
    			this.tableData = [];
    			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.getData(datalist);
    		},

			//编辑返回按键
			backBtn() {
				this.handleEditShow = false;
				this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selStatus, this.selSole)

			},

			//导出
			checkOutOrderInfo() {
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				checkOutPolicyInfo(datalist).then(res => {
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
				this.$router.push({path:'/policyOweDetailZB',query:{id:row.id,oweStatus:row.oweStatus}});
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

	.selectRadio{
		margin-bottom:20px;
	}


	.operateBtn{
		    display: inline-block;
		    color: #1f5dbc !important;
		    margin-right: 8px;
		    cursor: pointer;
	}

</style>

