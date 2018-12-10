<!--
	总部 - 省区订单详情 - 打印发货
-->

<template>
		<div id="">
			
		<div class="print_or_back_btn noprint">
		    <div class="print_btn">
		        <a href="javascript:void(0)" @click="doPrintVue()" target="_blank"><input type="button" value="打印"/></a>
		    </div>
		    <div class="back_btn">
		      <input type="button" value="返回" @click="goBack()"/>
		    </div>
		
			
		</div>
		
		
		
		
	
		<div class="daYin">
			<div class="daYinInfo">
				<div class="daYin_title">朗致销客销售确认单</div>				
					<el-row :gutter="24" type="flex" justify="space-between">
					<el-col :span="3">
						<div class="grid-content bg-purple"><span class="fontSize10">销售类型:基础医药</span></div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple"><span class="fontSize10">单据编号:{{basicForm.orderNum}}</span></div>
					</el-col>
				</el-row>
				<div class='table_daYin'>
					<el-row :gutter="24" type="flex" class='row-bg row-bd ' justify="center">
						<el-col :span="24" class='bg bd-top'>
							<div class="grid-content bg-purple"><span class="fontSize10">基本信息</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd ' justify="space-between">
						<el-col :span="4" class='bg '>
							<div class="grid-content bg-purple"><span class="fontSize10">*商业公司（开票公司）</span></div>
						</el-col>
						<el-col :span="20" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.customerName}}</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="space-between">
						<el-col :span="4" class='bg '>
							<div class="grid-content bg-purple"><span class="fontSize10">签约客户名称</span></div>
						</el-col>
						<el-col :span="20" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.managerName}}</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd bd-left' justify="center">
						<el-col :span="1.2">
							<div class="grid-content bg-purple"><i class="solid"></i><span class="fontSize10">正常业务发货</span></div>
						</el-col>
						<el-col :span="1.2">
							<div class="grid-content bg-purple"><i></i><span class="fontSize10">换货</span></div>
						</el-col>
						<el-col :span="1.2">
							<div class="grid-content bg-purple"><i></i><span class="fontSize10">退货</span></div>
						</el-col>

					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="center">
						<el-col :span="4" class='bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">发货申请人</span></div>
						</el-col>
						<el-col :span="8" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.managerName}}</span></div>
						</el-col>
						<el-col :span="4" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">发货申请时间</span></div>
						</el-col>
						<el-col :span="8" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.createDate}}</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg' justify="center">
						<el-col :span="24" class='bg '>
							<div class="grid-content bg-purple"><span class="fontSize10">申请发货货物</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg  '>
						<el-table :data="tableData" border>
							<el-table-column label="序号" width="200" type=index align='center'>
							</el-table-column>
							<el-table-column prop="goodsName" label="品名" width="200" align='center'>
							</el-table-column>
							<el-table-column prop="specsMax" label="包装规格" width="200" align='center'>
							</el-table-column>
							<el-table-column prop="totalNum" label="盒数" width="200" align='center'>
							</el-table-column>
							<el-table-column prop="pieceNum" label="件数" align='center'>
							</el-table-column>
							<el-table-column prop="price" label="*单价" align='center'>
							</el-table-column>
							<el-table-column prop="sumPrice" label="小计" align='center'>
							</el-table-column>
							<el-table-column prop="purchaseTypeStr" label="政策类型" align='center'>
							</el-table-column>
						</el-table>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="center">
						<el-col :span="4" class='bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">合计金额</span></div>
						</el-col>
						<el-col :span="20" class='bd-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.sumPriceString}}</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="center">
						<el-col :span="24" class='bg '>
							<div class="grid-content bg-purple"><span class="fontSize10">出库单信息</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd text-left'>
						<el-col :span="4" class='text-left bg '>
							<div class="grid-content bg-purple"><span class="fontSize10">运输方式</span></div>
						</el-col>
						<el-col :span="20" class='bd-left text-left'>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i></i><span class="fontSize10">汽运</span></div>
							</el-col>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i class="solid"></i><span class="fontSize10">铁路</span></div>
							</el-col>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i></i><span class="fontSize10">顺丰</span></div>
							</el-col>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="center">
						<el-col :span="24" class='bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">实际收货信息</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="start">

						<el-col :span="6" class='text-left bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">是否与出库单信息一致</span></div>
						</el-col>

						<el-col :span="18" class='bd-left text-left'>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.isSameStockOut =='是' ? 'solid' : ''" ></i><span class="fontSize10">是</span></div>
							</el-col>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.isSameStockOut =='否' ? 'solid' : ''" ></i><span class="fontSize10">否</span></div>
							</el-col>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd'>

						<el-col :span="6" class='text-left bg'>
							<div class="grid-content bg-purple text-left"><span class="fontSize10 ">省区授权收货人</span></div>
						</el-col>

						<el-col :span="6" class='bd-left text-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.ordersDeliveryMsgDetail.deliveryName}}</span></div>
						</el-col>
						<el-col :span="6" class='bd-left text-left bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">收货人电话</span></div>
						</el-col>
						<el-col :span="6" class='bd-left text-left'>
							<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.ordersDeliveryMsgDetail.deliveryPhone}}</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="start">
						<el-col :span="6" class='text-left bg'>
							<div class="grid-content bg-purple text-left"><span class="fontSize10 ">实际收货地址</span></div>
						</el-col>

						<el-col :span="18" class='text-left' justify="start">
							
								<div class="grid-content bg-purple"><span class="fontSize10">{{basicForm.ordersDeliveryMsgDetail.deliveryAddress}}</span></div>
						
						</el-col>

					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="start">
						<el-col :span="6" class='text-left bg'>
							<div class="grid-content bg-purple"><span class="fontSize10">单据是否随货</span></div>
						</el-col>
						<el-col :span="6" class='bd-left text-left'>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.fileTypeSpec =='是' ? 'solid' : ''" ></i><span class="fontSize10">是</span></div>
							</el-col>
							<el-col :span="1.5">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.fileTypeSpec =='否' ? 'solid' : ''" ></i><span class="fontSize10">否</span></div>
							</el-col>
						</el-col>
						<el-col :span="12" class='bd-left text-left'>
							<el-col :span="4">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.specialFile.includes('出库单') ? 'solid' : ''" ></i><span class="fontSize10">出库单</span></div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.specialFile.includes('首营资料') ? 'solid' : ''" ></i><span class="fontSize10">首营资料</span></div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple"><i :class="basicForm.ordersDeliveryMsgDetail.specialFile.includes('质检单') ? 'solid' : ''"></i><span class="fontSize10">质检单</span></div>
							</el-col>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd'>
						<el-col :span="2">
							<div class="grid-content bg-purple text-left"><span class="fontSize10 ">备注：</span></div>
						</el-col>
					</el-row>
					<el-row :gutter="24" type="flex" class='row-bg row-bd' justify="space-between">					
						<div class="grid-content bg-purple text-left">
							<span class="fontSize10 ">
									&nbsp;&nbsp;本人确认上述货物已经全部接受,并由本人负责向像海南德义堂药业有限公司回款,如本人没有按要求回款而产生争议或诉讼或进入其他司法程序的,海南德义堂药业邮箱公司可凭此<<朗致销客销售确认单>>进行维权.
							</span>
						</div>					
						<el-col :span="6" class='text-right' style='margin-top:10px;'>						
							<div class="grid-content bg-purple "><span class="fontSize10 ">
							省区经理签字:{{basicForm.managerName}}	<br />{{basicForm.sendOutCreateDate}}
							</span>
						</div>						
						</el-col>						
					</el-row>
				</div>

			</div>

		</div>

	</div>

</template>
<script>
	import {
		getProvinceOrdersDetail,
		handleOrders,
		insertOrdersDelivery
	} from 'src/api/headquarter_url/orderManage';

	export default {

		data() {
			return {
				tableData: [],
				detailArr: [],
				basicForm: [],
			}
		},
		created() {

		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				handleOrders({
					'ordersId': this.$route.query.ordersId,
					'buttonType': this.$route.query.buttonType,
					'ordersStatus': this.$route.query.ordersStatus,
					'customerId': this.$route.query.customerId
				}).then(res => {
					console.log(res)
					this.basicForm = res.data.data;
					this.tableData = res.data.data.goodsList;
					console.log(this.tableData)
				})
			},
			doPrint() {
				// 1.设置要打印的区域 div的className
				var newstr = document.getElementsByClassName('daYin')[0].innerHTML
				// 2. 复制给body，并执行window.print打印功能
				document.body.innerHTML = newstr
				// 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
				var oldstr = document.body.innerHTML
				window.print()
				document.body.innerHTML = oldstr
				return false
			},
			doPrintVue() {
				var newstr = document.getElementsByClassName('daYin')[0].innerHTML
				document.body.innerHTML = newstr
				window.print()
				// 重新加载页面，以刷新数据
				window.location.reload()
			},
			goBack() {
				this.$router.replace({
					path: '/provinceOrderZB'
				});
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
	
	.daYinInfo {
		.el-table th {
			background: rgb(217, 217, 217);
			;
			text-align: center;
			font-family: "微软雅黑";
			font-size: 12px;
			font-weight: 900;
			color: black;
		}
		.el-table__row td {
			text-align: center;
			font-family: "微软雅黑";
			font-size: 12px;
			font-weight: 900;
			color: black;
		}
		.el-table td,
		.el-table th.is-leaf {
			border-right: 1px solid #000;
		}
		.el-table td{
			border-top: 1px solid #000;
		}
		.el-table--border,
		.el-table--group {
			/*border: 1px solid #000;*/
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
	.print_or_back_btn{
    width:97%;
    height:26px;
    margin-left:1.5%;
    margin-top:10px;
}
.print_btn{
    float:left;
    width:12%;
    height:22px;
    border:2px solid #000;
}
.print_btn input{
    float:left;
    border:0;
    width:100%;
    height:22px;
    font-weight:900;
    cursor:pointer;
}
.back_btn{
    float:right;
    width:12%;
    height:22px;
    border:2px solid #000;
}
.back_btn input{
    float:left;
    border:0;
    width:100%;
    height:22px;
    background:#F0F0F0;
    font-weight:600;
    cursor:pointer;
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
	
	.daYinInfo {
		width: 95%;
		margin: 20px auto;
		background: #ffff;
		text-align: center;
		
		i {
			display: inline-block;
			width: 10px;
			height: 10px;
			border: 1px solid black;
		}
		.solid {
			background: black;
		}
		.fontSize10 {
			font-family: "微软雅黑";
			font-size: 12px;
			font-weight: 900;
		}
		.daYin_title {
			 width:100%;
    font-size:22px;
    text-align:center;
		}
		.table_daYin {
			
			.el-row {
				border: 1px solid #000;
				    line-height: 30px;
				    
			
				.cell {
					font-family: "微软雅黑";
					font-size: 12px;
					font-weight: 900;
				}
			}
			.el-col {}
			.bg {
				background: rgb(217, 217, 217);
			}
			.bd-top{
				border-top: 1px solid #000;
			}
			.bd-left {
				border-left: 1px solid #000;
		
			}
			.text-left {
				text-align: left;
			}
			.text-right {
				text-align: right;
			}
			.row-bd {
				border: 1px solid #000;
			}
		}
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
	
	.areaWraper {
		.el-col-group {
			height: 400px;
			overflow: auto;
		}
	}
	
	.auditLog {
		margin-top: 10px;
		span {
			padding-right: 15px;
		}
	}
	
	.auditPass {
		width: 650px;
		margin: 20px auto;
		text-align: center;
		.el-button-red {
			margin-right: 20px;
		}
	}
	
	.dailogCon {
		width: 100%;
		line-height: 150px;
		text-align: center;
		font-size: 14px;
		div {
			line-height: 40px;
			padding: 15px 10px;
			input {
				border: 1px solid #1f5dbc;
			}
		}
	}
	
	.dialogBtnTrue {
		padding: 6px 25px;
		background: #e02222;
		border-radius: 2px;
		color: white;
	}
</style>