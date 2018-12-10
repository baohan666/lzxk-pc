<template>
	<div>
    <go-back title="查看订单详情"></go-back>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple"><span>订单编号</span>：{{basicForm.ordersNum}}</div>
          </el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>订单状态</span>：{{basicForm.ordersStatusStr}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>销售组织</span>：{{basicForm.deptName}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>提交人</span>：{{basicForm.submitName}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>提交人职级</span>：{{basicForm.position}}</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>创建时间</span>：{{basicForm.createDate}}</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>省区经理</span>：{{basicForm.managerName}}</div>
					</el-col>

				</el-row>
			</div>

		</div>
		<div>
			<div class="containInfo_wraper">
        <div v-for="item in detailArr">
          <div class="detail_title"><i class="line_Icon"></i>终端客户：{{item.clinicName}}</div>
          <div class='table_wrap'>
            <el-table :data="item.ordersInfoList" border>
              <el-table-column prop="goodsName" label="商品名称"  align='center'>
              </el-table-column>
              <el-table-column prop="materialCode" label="物料编码"  align='center'>
              </el-table-column>
              <el-table-column prop="specsMax" label="包装规格" align='center'>
              </el-table-column>
              <el-table-column prop="manufacturer" label="生产企业" align='center'>
              </el-table-column>
              <el-table-column prop="customerName" label="终端客户" align='center'>
              </el-table-column>
              <el-table-column prop="legalPerson" label="客户法人" align='center'>
              </el-table-column>
              <el-table-column prop="totalNum" label="采购盒数" align='center'>
              </el-table-column>
              <el-table-column prop="boxNum" label="合计件数"  align='center'>
                <template slot-scope="scope">
                  <span>共{{scope.row.pieceNum}}件{{scope.row.boxNum}}盒</span>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="单价（每盒）"  align='center'>
              </el-table-column>
              <el-table-column prop="balancePrice" label="客户结算价"  align='center'>
              </el-table-column>
              <el-table-column prop="invoicePrice" label="客户开票价"  align='center'>
              </el-table-column>
              <el-table-column prop="sumPrice" label="县区货款小计"  align='center'>
              </el-table-column>
              <el-table-column prop="sumBalancePrice" label="客户结算小计"  align='center'>
              </el-table-column>
              <el-table-column prop="policyType" label="政策类型"  align='center'>
              </el-table-column>
              <el-table-column prop="totalNumReal" label="实发数量"  align='center' v-if=' basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11'>
              </el-table-column>
            </el-table>
            <el-row :gutter="20" type="flex" justify="end">
              <el-col :span="3">
                <div class="grid-content bg-purple"><span>订单总金额</span>：{{item.ordersTotalSum}}</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple"><span>客户结算总金额</span>：{{item.customerTotalSum}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="detail_title"><i class="line_Icon"></i>实际收货信息：</div>
          <div class="detail_content">
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="grid-content bg-purple"><span>收货人</span>：{{item.deliveryName}}</div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple"><span>收货人电话</span>：{{item.deliveryPhone}}</div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple"><span>收货地址</span>：{{item.deliveryAddress}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="detail_title"><i class="line_Icon"></i>特殊要求：</div>
          <div class="detail_content">
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="grid-content bg-purple"><span>随货文件</span>：{{item.specialFile}}</div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple"><span>物流标准</span>：{{item.specialLogistics}}</div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple"><span style="width: 100px;">出库单特殊要求</span>：{{item.specialOut}}</div>
              </el-col>

            </el-row>
          </div>
        </div>

        <div class="detail_title" v-if="ordersCollection_1"><i class="line_Icon"></i>打款信息：</div>
        <div class='' v-if="ordersCollection_1">
          <div class="detail_content">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="grid-content bg-purple"><span>回款金额</span>：{{ordersCollection.actualCollectionPrice}}</div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <span>回款证明</span>：
                  <viewer :images="ordersCollection.imgsList">
                    <img v-for="src in ordersCollection.imgsList" :src="src" :key="src" width="100">
                  </viewer>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple"><span>备注</span>：{{ordersCollection.remark}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
			</div>

		</div>

		<div class="detail_content" style="margin-left: 35px;">
			<el-row :gutter="20">
				<el-col :span="3">
					<div class="grid-content bg-purple"><span>备注</span>：{{basicForm.remark}}</div>
				</el-col>
			</el-row>
      <div class="auditLog">
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple" v-show="auditLog.length > 0"><span>审核记录：</span>
              <ul>
                <li v-for="item in auditLog" class="auditLog_li_hegit">
                  <span>{{item.type}} : {{item.auditName}}</span>
                  <span>时间：{{item.createDate}}</span>
                  <span v-if="item.status == '审核通过'">{{item.status}}</span>
                  <span v-else>{{item.status}}：{{item.auditRemark}}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
		</div>
	</div>
</template>
<script>
  import goBack from 'src/components/goBack';//返回
	import { getOrdersDetail } from 'src/api/headquarter_url/orderManage';
	import { getGoodDetaiData, getVisRangeData } from 'src/api/headquarter_url/goodsManage';

	export default {

		data() {
			return {
				tableData: [],
				detailArr: [],
        ordersCollection_1:false,// 是否显示打款信息
        ordersCollection:{},// 打款信息 对象1
				basicForm: {
					ordersNum: '', //  订单编号
					submitName: '', //  提交人
					deptName: '', //  事业部-销售组织
					ordersStatusStr: '', //  订单状态
					CreateDate: '', //  创建时间
					position: '', //  职级
					remark: '' //  备注
				},
				detailForm: {
					goodsName: '', //  商品名
					materialCode: '', //  物料编码1
					specsMax: '', // 规格
					manufacturer: '', //  生产厂商
					customerName: '', //  终端客户
					legalPerson: '', //  法人
					boxNum: '', // 采购盒数
					pieceNum: '', // 件数
					price: '', //  单价
					balancePrice: '', //  客户结算价
					invoicePrice: '', //  客户开票价
					sumPrice: '', //  县区贷款小计
					sumBalancePrice: '', //  客户结算小计
					policyType: '', //  政策类型
				},
        auditLog: [],
				goodsDetai: {},
				dialogRangeVisible: false,
				radio: 1,
				dialogTitle: '查看限购区域',
				checked1: null,
				checked2: null,
				checked3: null,
				province: [],
				cities: [],
				counties: []
			}
		},
		mounted() {
			this.initData()
		},
    components:{
      goBack,//返回
    },
		methods: {
			initData: function() {
				getOrdersDetail({
					ordersId: this.$route.query.id,
				}).then(res => {
					this.basicForm = res.data.data.basic;
          this.auditLog = res.data.data.checkList;
					this.detailArr = res.data.data.detail
          console.log(this.detailArr);
          this.ordersCollection= res.data.data.ordersCollection; // 打款信息
          console.log(this.ordersCollection);
          if (this.ordersCollection==null){
            this.ordersCollection_1 = false
          } else{
            this.ordersCollection_1 = true
          }
          console.log(this.ordersCollection_1);

          console.log(this.detailArr)
				})
			},
			/*backBtn(){
			    this.$router.replace({path: '/countyOrderZB'});
			}*/
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

	.areaWraper {
		.el-col-group {
			height: 400px;
			overflow: auto;
		}
	}
  .auditLog{
    margin-top: 10px;
    span{
      font-size: 14px;
      font-weight: 900px;
      padding-right:20px;
    }
    .auditLog_li_hegit{
      line-height: 25px;
    }
  }
</style>
