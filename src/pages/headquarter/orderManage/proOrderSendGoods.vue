<!--
	总部 - 省区订单详情 - 打印发货
-->

<template>
	<div>
		<div class="print_or_back_btn noprint">
	    <div class="print_btn">
	        <a href="javascript:void(0)" @click="doPrintVue()" target="_blank"><input type="button" value="打印"/></a>
	    </div>
	    <div class="back_btn">
	      <input type="button" value="返回" @click="goBack()"/>
	    </div>
	</div>
<div class="tableBOX" id="billBOX">
    <div class="table_title">开票申请单</div>
    <div class="table_other">
        <div class="table_sellClass">销售类型：基础医药</div>
        <div class="table_billNumber">单据编号：{{basicForm.ordersNum}}</div>
        <div class="table_applyTime">*申请时间：{{basicForm.createDate}}</div>
    </div>
    <div class="borderWrap">
        <table class="table_Bill" cellspacing="0" cellpadding="0">
            <tbody class="bill">
            <tr>
                <td colspan="3">发票种类</td>
                <td colspan="8">
                    <span></span><span>增值税票</span>
                </td>
            </tr>
            </tbody>
            <tbody class="bill">
            <tr>
                <td rowspan="6">开票企业信息</td>
                <td colspan="2">企业名称</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billCompanyName}}</td>
            </tr>
            <tr>
                <td colspan="2">注册地址</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billRegistAddress}}</td>
            </tr>
            <tr>
                <td colspan="2">开户银行</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billAccountBank}}</td>
            </tr>
            <tr>
                <td colspan="2">银行账号</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billAccountNum}}</td>
            </tr>
            <tr>
                <td colspan="2">企业税号</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billTaxpayerCode}}</td>
            </tr>
            <tr>
                <td colspan="2">注册电话</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.registPhone}}</td>
            </tr>
            </tbody>
            <tbody class="bill">
                <td rowspan="tableData.length" style="border-right:none">开票产品信息</td>
                <td colspan="8">  
                	<el-table :data="tableData" >						
							<el-table-column prop="goodsName" label="品名"  align='center'>
							</el-table-column>
							<el-table-column prop="specsMax" label="规格"  align='center'>
							</el-table-column>
							<el-table-column prop="totalNum" label="实发数量"  align='center'>
							</el-table-column>
							<el-table-column prop="price" label="件数" align='center'>
							</el-table-column>
							<el-table-column prop="price" label="盒数" align='center'>
							</el-table-column>
							<el-table-column prop="price" label="*单价" align='center'>
							</el-table-column>							
							<el-table-column prop="gapUp" label="开票类型" align='center'>
							</el-table-column>
							<el-table-column prop="gapUpPrice" label="开票价格" align='center'>
							</el-table-column>
							<el-table-column prop="sumPrice" label="小计" align='center'>
							</el-table-column>
						</el-table>
                </td>
            <tr>
                <td colspan="3">
                    合计
                </td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.sumPriceString}}</td>
            </tr>
            </tbody>
            <tbody class="bill">
            <tr>
                <td colspan="3">发票收取联系人</td>
                <td colspan="2">{{basicForm.ordersDeliveryMsgDetail.billMailReceiveName}}</td>
                <td colspan="2">电话</td>
                <td colspan="4">{{basicForm.ordersDeliveryMsgDetail.billMailReceivePhone}}</td>
            </tr>
            <tr>
                <td colspan="3">本单业务负责人</td>
                <td colspan="2">{{}}</td>
                <td colspan="2">电话</td>
                <td colspan="4">{{}}</td>
            </tr>
            <tr>
                <td colspan="3">发票邮寄地址</td>
                <td colspan="8">{{basicForm.ordersDeliveryMsgDetail.billMailReceiveAddress}}</td>
            </tr>
            <tr>
                <td colspan="3">备注</td>
                <td colspan="8">{{basicForm.remark}}</td>
            </tr>
            <tr>
                <td colspan="3">省区经理（签字）</td>
                <td colspan="8">{{basicForm.managerName}}</td>
            </tr>
            </tbody>
        </table>
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
			
			doPrintVue() {
				var newstr = document.getElementsByClassName('tableBOX')[0].innerHTML
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
	#billBOX{
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
			border-left: 1px solid #000;
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
.tableBOX{
    position: relative;
    width:95%;
    height:auto;
    margin:0 auto;
    overflow: hidden;
}
.table_title{
    width:100%;
    font-size:22px;
    text-align:center;
}
.table_other{
    width:97%;
    margin:0 auto;
    height:14px;
    padding-top:32px;
}
.table_sellClass{
    float:left;
    width:33%;
    font-size:14px;
    font-weight:600;
}
.table_billNumber{
    float:left;
    width:33%;
    font-size:14px;
    font-weight:600;
}
.table_applyTime{
    float:left;
    width:34%;
    font-size:14px;
    font-weight:600;

}
.borderWrap{
    width:97%;
    margin:0 auto;
}
/*table样式*/
table{
    width:100%;
    height:auto;
    border-right:1px solid #000;
    border-bottom:1px solid #000;
    border-collapse: collapse;
}
td{
    border-left:1px solid #000;
    border-top:1px solid #000;
    border-right:1px solid #000;
    background:#FFF;
    text-align:center;
    font-size:12px;
}
.td_background{
    background:#d9d9d9;
}
/*head*/
.table_head tr{
    height:38px;
}
.table_headText{
    width:10%;
}
.table_headcheckState{
    display:inline-block;
    _zoom:1;
    _display:inline;
    width:12px;
    height:12px;
    border:2px solid #000;
    position:relative;
    top:3px;
    margin-right:5px;
}
.table_checkStateBlack{
    background:#000;
}
.table_headPolicyClass span{
    margin-left:1%;
}
.table_drugBill tr{
    height:28px;
}
.table_drugBill .table_drugBillTitle{
    height:58px;
}
/*.table_flowFile{
    margin-left:10px;
}*/
.table_logisticsMsg td{
    text-align:left;
    padding-left:10px;
}
.table_tfoot td{
    text-align:left;
}
.table_logisticsMsg tr{
    height:30px;
}
.table_tfoot .tfoot_sign{
    height:75px;
}
.table_tfoot .tfoot_mark{
    height:50px;
}
.table_tfoot .tfoot_mark .tfoot_markWord{
    padding-left:10px;
}
.tfoot_sign_text{
    text-align:right;
    line-height:24px;
}
.tfoot_clime{
    line-height: 24px;
    padding:10px;
}
.table_logisticsMsg .logisticsMsg_demand{
    height:60px;
}
.special_demandDiv1{
    height:22px;
    padding-left:10px;
    padding-top:8px;
}
.special_demandDiv2{
    height:27px;
    padding-top:3px;
    padding-left:10px;
}
.demond_check{
    display:inline-block;
    _zoom:1;
    _display:inline;
    width:12px;
    height:12px;
    border:2px solid #000;
}

.table_Bill tr{
    height:33px;
}
/*交易类别和出库单特殊要求 选择框里的图片*/
.blackbg_checkNone{
    display:none;
}
.blackbg_black{
    width:12px;
    height:12px;
    display:block;
}

</style>