
<!--
	总部 - 政策补货 - 详情
-->

<template>
	<div>
		<div class='goBackWraper clear'>
			<span>查看订单详情</span>
			<div class='backBtn' @click="goBack">返回</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>事业部</span>：{{basicForm.deptName}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>所属省区</span>：{{basicForm.provinceName}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>省区经理</span>：{{basicForm.managerName}}</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple"><span>产品名称</span>：{{basicForm.goodsName}}</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple"><span>规格</span>：{{basicForm.specsMax}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>数量</span>：{{basicForm.totalBox}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>单价</span>：{{basicForm.price}}</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>订单明细：</div>
			<div class='table_wrap'>
				<el-table :data="tableData" border>
					<el-table-column prop="ordersNum" label="订单编号"  align='center'>
					</el-table-column>
					<el-table-column prop="buyDate" label="采购时间"  align='center'>
					</el-table-column>
					<el-table-column prop="submitName" label="提交人" align='center'>
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称" align='center'>
					</el-table-column>
					<el-table-column prop="specsMax" label="规格" align='center'>
					</el-table-column>
					<el-table-column prop="boxNum" label="采购盒数" align='center'>
					</el-table-column>
					<el-table-column prop="pieceNum" label="合计件数" align='center'>
					</el-table-column>
					<el-table-column prop="price" label="单价（每盒）"  align='center'>
					</el-table-column>
					<el-table-column prop="sumPrice" label="小计"  align='center'>
					</el-table-column>
					<el-table-column prop="gapUp" label="开票类型"  align='center'>
					</el-table-column>
					<el-table-column prop="gapUpPrice" label="开票单价"  align='center'>
					</el-table-column>
					<el-table-column prop="totalNumReal" label="实发数量"  align='center'>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>政策明细：</div>
			<div class="detail_content">
				<el-row :gutter="20">
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>政策类型</span>：{{policyForm.policyType ==2 ? '奖励政策' : policyForm.policyType == 3 ? '单品回款奖励' : '多品回款奖励'}} </div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>政策名称</span>：{{policyForm.title}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>政策有效期</span>：{{policyForm.policyStartDate}}--{{policyForm.policyEndDate}}</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple"><span>创建时间</span>：{{policyForm.createDate}}</div>
					</el-col>
				</el-row>
			</div>
			<div class='table_wrap'>
				<!--奖励商品-->
				<el-table v-if="policyForm.policyType==2" :data="policyForm.subList" border tooltip-effect="dark" :span-method="objectSpanMethod">
					<el-table-column prop="" label="奖励商品">
						<template slot-scope="scope">
							<div>{{scope.row.goodsName}}</div>
							<div>{{scope.row.specsMax}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="awardNum" label="奖励数量"></el-table-column>
					<el-table-column prop="afterDiscountPrice" label="折后价"></el-table-column>
					<el-table-column prop="batchNumber" label="指定批号"></el-table-column>
				</el-table>
				<!--单品回款政策-->
				<el-table v-if="policyForm.policyType==3" :data="tableData2" border tooltip-effect="dark" :span-method="objectSpanMethod">
					<el-table-column prop="goodsNamem" label="需要回款的商品">
						<template slot-scope="scope">
							<div>{{scope.row.goodsNamem}}</div>
							<div>{{scope.row.specsMaxm}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="goodsName" label="奖励的商品">
						<template slot-scope="scope">
							<div>{{scope.row.goodsName}}</div>
							<div>{{scope.row.specsMax}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="collectionNum" label="回款商品数量"></el-table-column>
					<el-table-column prop="awardNum" label="奖励数量"></el-table-column>
					<!--<el-table-column prop="baseDiscountPrice" label="打折基础价"></el-table-column>-->
					<el-table-column prop="afterDiscountPrice" label="折后价"></el-table-column>
					<el-table-column prop="batchNumber" label="指定批号"></el-table-column>
				</el-table>
				<!--多品回款政策-->
				<el-table v-if="policyForm.policyType==4" :data="tableData3" border tooltip-effect="dark" :span-method="objectSpanMethod">
					<el-table-column prop="mainGoodsName" label="主品">
						<template slot-scope="scope">
							<div>{{scope.row.goodsNamem}}</div>
							<div>{{scope.row.specsMaxm}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="collectionNum" label="回款商品数量"></el-table-column>
					<el-table-column prop="goodsName" label="奖励商品">
						<template slot-scope="scope">
							<div>{{scope.row.goodsName}}</div>
							<div>{{scope.row.specsMax}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="awardNum" label="奖励数量"></el-table-column>
					<el-table-column prop="afterDiscountPrice" label="折后价"></el-table-column>
					<el-table-column prop="batchNumber" label="指定批号"></el-table-column>
				</el-table>
			</div>
		</div>
		<div class="containInfo_wraper" v-show="this.$route.query.oweStatus!=5">
			<div class="detail_title"><i class="line_Icon"></i>审核信息：</div>
			<div class="detail_content">
					<el-row :gutter="20">
						<el-col :span="5">
						<div class="grid-content bg-purple"><span>审核人</span>：{{basicForm.auditor}}</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>审核时间</span>：{{basicForm.auditTime}}</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="auditPass" v-show="this.$route.query.oweStatus==5">
			<button class="el-button-red" @click='dialogVisible= true'>审核通过</button>
		</div>

		<el-dialog :title="dailogTitleType" :visible.sync="dialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
				<div class="dailogCon">
					<span>{{dailogCon}}</span>
				</div>

				<span slot="footer">

				<span @click="handleOrdersPass()" class="dialogBtnTrue">确定</span>
				</span>
		</el-dialog>



	</div>
	</div>
</template>
<script>
	import { getPolicyOweDetail , getPolicyOweCheck} from 'src/api/headquarter_url/orderManage';

	export default {

		data() {
			return {
				tableData: [],
				detailArr: [],
				basicForm: {
					goodsName: '', //  产品名称
					deptName: '', //  事业部
					provinceName: '', //  省区名字
					managerName: '', //  省区经理名字
					specsMax: '', //  规格
					price: '', //  单价
					totalBox: '', //  数量
					auditor: '', //  审核人：只有需补货产品审核之后显示
					auditTime: '', //  审核时间：只有需补货产品审核之后显示
				},
				policyForm: {
					policyType: '', //  2.奖励政策3.单品回款奖励4.多品回款奖励
					policyStartDate: '', //  政策起始时间
					policyEndDate: '', //  政策结束时间
					title: '', //  政策名称
					createDate: ''
				},

				policyForm: {},
				policyType: '',
				dialogRangeVisible: false, //适用范围弹窗
				tableData1: [], //奖励商品
				tableData2: [], //单品回款奖励

				tableData3: [], //多主品回款奖励
				collspanMore_main: '', //duo品商品长度
				collspanMore_award: '', //多品回款奖励商品长度

				dailogTitleType:'提示',
				dialogVisible:false,
				dailogCon:'您确定要审核通过此补货产品？'
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData: function() {
				getPolicyOweDetail({
					ordersOweId: this.$route.query.id,
					oweStatus: this.$route.query.oweStatus
				}).then(res => {
					let datas = res.data.data;

					this.tableData1 = datas.policy.subList;
					this.basicForm = datas.owe;
					this.tableData = datas.ordersList
					this.policyForm = datas.policy
					if(datas.policy.policyType != 2) {
						this.collspanMore_main = datas.policy.mainList.length;
						this.collspanMore_award = datas.policy.subList.length;
					}
					if(datas.policy.policyType == 3) {
						datas.policy.subList.forEach((item, index, arr) => {
							let c = { ...item,
								...datas.policy.mainList[0]
							};
							this.tableData2.push(c);
						})
					}
					if(datas.policy.policyType == 4) {
						datas.policy.subList.forEach((item, index, arr) => {
							let c = {};
							if(datas.policy.mainList.length - 1 < index) {
								c = { ...item,
									...datas.policy.mainList[datas.policy.mainList.length - 1]
								};
							} else {
								c = { ...item,
									...datas.policy.mainList[index]
								};
							}

							this.tableData3.push(c);
						})
						console.log(JSON.stringify(this.tableData3));
					}
				})
			},

			// 合并单元格(行数、列数、行号、列号)
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(this.policyForm.policyType == 3) {
					if(columnIndex === 0) {
						let rowspan = new Array(7).fill(0);
						rowspan[0] = this.collspanMore_award;
						console.log(rowspan);
						return {
							rowspan: rowspan[rowIndex],
							colspan: 1
						}
					}
				} else if(this.policyForm.policyType == 4) {
					if(columnIndex === 0 || columnIndex === 1) {
						let element = [1, 2]; //需要合并的行
						for(let j = 0; j < 2; j++) { //[0,1][3,4,5]合并的行  12行合并，345行合并
							let item = element[j];
							console.log(item);
							if(rowIndex == item) { //需要合并单元格的行数
								if(j == 0) {
									return {
										rowspan: element.length,
										colspan: 1
									}
								} else if(j != 0) { //不合并的
									return {
										rowspan: 0,
										colspan: 0
									}
								}
							}
						}
					}
				}
			},
			// 鼠标划入，划出效果

			cellMouseEnter(row, column, cell, event) {
				this.rowIndex = row.rowIndex;
				this.hoverOrderArr = [];
				this.OrderIndexArr.forEach(element => {
					if(element.indexOf(this.rowIndex) >= 0) {
						this.hoverOrderArr = element
					}
				})
			},

			cellMouseLeave(row, column, cell, event) {
				this.rowIndex = '-1'
				this.hoverOrderArr = [];
			},

			//审核通过
			handleOrdersPass(){

				getPolicyOweCheck({'ordersOweId':this.$route.query.id,'oweStatus':this.$route.query.oweStatus}).then(res=>{
					console.log(res)
					this.dialogVisible = false;
					this.goBack();
				})
			},
			backBtn(){
			    this.goBack();
			},
			 goBack(){
			    this.$router.replace({path: '/policyReplenishmentZB'});
			  }

		}
	}
</script>
<style lang="scss">
	.el-col-group {
		.el-radio {
			display: block;
			margin-left: 30px;
			line-height: 36px;
		}
	}
</style>

<style lang="scss" scoped="scoped">
	@mixin ft($dirc) {
		float: $dirc;
	}

	@mixin wh($w, $h) {
		width: $w;
		height: $h;
		line-height: $h;
	}

	.goBackWraper {
		span {
			@include ft(left);
			line-height: 40px;
		}
		.backBtn {
			@include wh(90px, 40px);
			@include ft(right);
			text-align: center;
			background: #fff;
			font-size: 18px;
			color: #e02222;
			border-radius: 2px;
		}
	}
	.containInfo_wraper {
		margin: 20px 30px;
		background: #ffff;
		border: 1px solid #e6e6e6;
		.detail_title {
			padding: 0 20px;
			line-height: 50px;
			color: #1f5dbc;
			font-size: 14px;
			.line_Icon {
				display: inline-block;
				@include wh(4px, 14px);
				vertical-align: middle;
				margin-right: 5px;
				border-radius: 20%;
				background: #1f5dbc;
			}
			border-bottom:1px solid #e6e6e6;
		}
		.detail_content {
			padding: 0 29px;
			line-height: 49px;
			font-size: 14px;
			span {
				display: inline-block;
				width: 70px;
				text-align: justify;
				text-align-last: justify;
				text-justify: inter-ideograph;
				/*IE*/
				text-align-last: inter-ideograph;
			}
			.viewRemark {
				color: #1f5dbc;
			}
		}
	}
	.auditPass{
		text-align: center;
		margin: 20px;
	}
	.areaWraper {
		.el-col-group {
			height: 400px;
			overflow: auto;
		}
	}
		.dailogCon{
		width: 100%;
		line-height: 150px;
		text-align: center;
		font-size: 14px;

	}
	.dialogBtnTrue{
		    cursor: pointer;
		padding: 6px 25px;
		background: #e02222;
		border-radius: 2px;
		color: white;

	}

</style>
