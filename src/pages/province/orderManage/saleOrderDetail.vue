<!--
	省区 - 销售订单详情
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
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>订单状态</span>：{{basicForm.ordersStatusStr}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>订单编号</span>：{{basicForm.ordersNum}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>提交人</span>：{{basicForm.submitName}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>提交人职级</span>：{{basicForm.position}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>创建时间</span>：{{basicForm.createDate}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>回款方式</span>：{{basicForm.collectionTypeStr}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>是否回款</span>：{{basicForm.isCollectionStr}}</div>
					</el-col>
				</el-row>
			</div>

		</div>
		<div>
			<div class="containInfo_wraper">
        <div v-for="item in detailArr">
          <div class="detail_title"><i class="line_Icon"></i>终端客户：{{item.clinicName}}
            <button class="el-button-red" @click="setWuliu(item.customerId)" v-if='basicForm.ordersStatus == 8'>录入发货信息</button>
            <button class="el-button-red" @click="getDeliveryMsg(item.customerId)"
                    v-if='basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11'>补发发货信息</button>
          </div>
          <div class='table_wrap'>
            <el-table :data="item.ordersInfoList" border>
              <el-table-column prop="goodsName" label="商品名称"  align='center'>
              </el-table-column>
              <el-table-column prop="materialCode" label="物料编码"  align='center' v-if='basicForm.ordersStatus == 12 || basicForm.ordersStatus == 7'>
              </el-table-column>
              <el-table-column prop="manufacturer" label="生产企业"  align='center' v-if='basicForm.ordersStatus == 7'>
              </el-table-column>
              <el-table-column prop="specsMax" label="规格"  align='center'>
              </el-table-column>
              <el-table-column prop="customerName" label="终端客户" align='center'>
              </el-table-column>
              <el-table-column prop="pieceNum" label="合计件数" align='center'>
                <template slot-scope="scope">
                  <span>共{{scope.row.pieceNum}}件{{scope.row.boxNum}}盒</span>
                </template>
              </el-table-column>
              <el-table-column prop="totalNum" label="采购盒数" align='center'>
              </el-table-column>
              <el-table-column prop="price" label="单价（每盒）" align='center'>
              </el-table-column>
              <el-table-column prop="balancePrice" label="客户结算价" align='center'>
              </el-table-column>
              <el-table-column prop="invoicePrice" label="客户开票价" align='center'>
              </el-table-column>
              <el-table-column prop="sumBalancePrice" label="客户结算小计"  align='center'>
              </el-table-column>
              <el-table-column prop="sumInvoicePrice" label="客户开票小计"  align='center'>
              </el-table-column>
              <el-table-column prop="isOpenBillStr" label="需开发票"  align='center'>
              </el-table-column>
              <el-table-column prop="policyType" label="政策类型"  align='center'>
              </el-table-column>
              <el-table-column prop="totalNumReal" label="实发数量"  align='center' v-if=' basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11'>
              </el-table-column>
              <el-table-column label="实发数量"  align='center' v-if='basicForm.ordersStatus  == 8 '>
                <template slot-scope="scope">
                  <input class="tableInput" v-model.trim="scope.row.totalNumReal" @change="handleChange(scope.row,'totalNum')" type="number" @keydown="handleInput"></input>
                </template>
              </el-table-column>
              <!--<el-table-column prop="forwardUnit" label="发货主体" width="250" align='center' v-if='basicForm.ordersStatus  == 8  '>
                              <template slot-scope="scope">
                                      <select name="" v-model="scope.row.forwardUnit" @change="handleChange(scope.row,'forwardUnit')">
                                      <option :value="item" v-for="(item,index) in forwardUnitList" >{{item}}</option>
                                  </select>
                              </template>
                          </el-table-column>-->

              <el-table-column prop="date" label="订单追溯" align='center' min-width='150px' v-if='basicForm.notice == "欠货订单" || basicForm.notice == "政策补货订单"'>
                <template slot-scope="scope">
                  <div v-if='basicForm.notice == "政策补货订单"' class="operateBtn" @click="handleCheckDetail(scope.$index, scope.row )">查看详情</div>
                  <div v-if='basicForm.notice == "欠货订单"' class="operateBtn" @click="handleExpress(scope.$index, scope.row )">查看原订单</div>
                </template>
              </el-table-column>
            </el-table>
            <el-row :gutter="20" type="flex" justify="end">
              <el-col :span="3">
                <div class="grid-content bg-purple"><span>金额小计</span>：{{item.ordersTotalSum}}</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple"><span>客户结算总金额</span>：{{item.customerTotalSum}}</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple"><span>客户开票总金额</span>：{{item.invoiceTotalSum}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="detail_title"><i class="line_Icon"></i>实际收货信息：</div>
          <div class='table_wrap'>
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
          </div>
          <div class="detail_title"><i class="line_Icon"></i>特殊要求：</div>
          <div class='table_wrap'>
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
        </div>


				<div class="detail_title" v-if="ordersCollection_1"><i class="line_Icon"></i>打款信息：</div>
				<div class='table_wrap' v-if="ordersCollection_1">
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
		<div class="detail_content auditLog" style="margin:30px;">
			<el-row :gutter="20">
				<el-col :span="3">
					<div class="grid-content bg-purple"><span class="remark">备注：</span>{{basicForm.remark}}</div>
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

		<!--//1.待地总审核2.待省区财务审核3.待省总审核4.预采购单5.待资质审核6.待销管审核7.待财务审核8.待发货9.待收货10部分收货11.已收货12.已驳回13.已取消14.待确认15.省区财务驳回-->
		<div class="auditPass" v-if='basicForm.ordersStatus == 1 || basicForm.ordersStatus == 2 || basicForm.ordersStatus == 3'>
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="您确定要通过吗？",auditType=basicForm.ordersStatus,auditStatus="1",passBtnShow=true,dayinShow = false'>通过</button>
			<button class="el-button-red" @click='dialogVisible=true,
				dailogTitleType="提示",
				dailogCon="请输入不通过原因:",
				noPassBtnShow = true,
				auditStatus="2",auditType=basicForm.ordersStatus'>不通过</button>
		</div>
		<div class="auditPass" v-show=" basicForm.ordersStatus == 8 || basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10|| basicForm.ordersStatus == 11">
			<button class="el-button-red" @click='verifyNum' v-if="basicForm.ordersStatus == 8">确认发货</button>
			<button class="el-button-red" v-if="basicForm.ordersStatus == 8" @click='$router.go(-1)'>取消</button>
			<!--basicForm.ordersStatus  != 8 && basicForm.ordersStatus != 9 && basicForm.ordersStatus != 10 ||basicForm.ordersStatus != 11-->
		</div>
		<!-- 录入物流和发货商业公司弹框 -->
		<el-dialog title='提示' :visible.sync="enterVisible" :append-to-body='true' center width="30%">
			<div class="dailogCon" v-if="wuliuShow">
				<div class="wuliu">
					<span>物流公司：</span>
					<el-input type="" v-model="expressName" name="" id="" value="" placeholder="请输入物流公司" /></el-input>

				</div>
				<div class="wuliu">
					<span>物流单号：</span>

					<el-input type="" v-model="courierNum" name="" id="" value="" placeholder="请输入物流单号" /></el-input>
				</div>
				<div class="wuliu">
					<span>出库单号：</span>
					<el-input type="" v-model="stockOutNum" name="" id="" value="" placeholder="请输入出库单号" /></el-input>
				</div>
				<div class="wuliu">
					<span>商业公司：</span>
					<el-select v-model="forwardUnit" placeholder="请选择商业公司" @change="handleChangeSel">
						<el-option label="请选择商业公司" value=''></el-option>
						<el-option v-for="item in forwardUnitList" :label="item.company" :value='item.id'>
						</el-option>
					</el-select>
				</div>
			</div>
			<span slot="footer" calss='dialog-footer'>
				<span @click="qureyWuliu" class="dialogBtnTrue"   v-if="wuliuShow,basicForm.ordersStatus == 8">确定</span>
			<span @click="salesOrdersUpdate" class="dialogBtnTrue" v-if="wuliuShow,basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11">确定</span>
			</span>
		</el-dialog>

		<el-dialog :title="dailogTitleType" :visible.sync="dialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
			<div class="dailogCon" v-if="passBtnShow || fahuoShow ||noPassBtnShow">

				<span class="dailog_con">{{dailogCon}}</span>
				<el-input type="textarea" v-model="reason" v-if='auditStatus =="2"'></el-input>

			</div>
			<span slot="footer">
			<!--待发货时确认发货-->
				<span @click="handleOrdersNumPass()" class="dialogBtnTrue"  v-if="fahuoShow">确定</span>
			<!--普通传参时的确定按钮-->
			<span @click="handleOrdersPass()" class="dialogBtnTrue" v-if="basicForm.ordersStatus != 6 && passBtnShow && !noPassBtnShow">确定</span>
			<span @click="handleOrdersNoPass()" class="dialogBtnTrue" v-if="noPassBtnShow">确定</span>

			</span>
		</el-dialog>
	</div>

</template>
<script>
	import {
		getOrdersDetail,
		salesOrdersCheck, // 通过不通过
		salesOrdersSend, //确认发货
		getbillNameList,
		getDeliveryMsg, //获取物流信息
		salesOrdersUpdate //补发物流信息
	} from 'src/api/province_url/orderManage';
	export default {
		data() {
			return {
				tableData: [],
				detailArr: [],
        ordersCollection_1:false,// 是否显示打款信息
        ordersCollection:{},// 打款信息 对象
				basicForm: [],
				company: '',
        setWuliuId: '',//当前设置物流的客户id
				radioArray: [],
				customerShow: false,
				enterVisible: false,
				noPassBtnShow: false,
				passBtnShow: false,
				dayinShow: true,
				fahuoShow: false,
				wuliuShow: false,
				ordersInfoId: '',
				customerId: '', //商业公司id
				courierNum: '', //物流单号
				expressName: '', //物流公司
				stockOutNum: '', //出库单号
				dialogBtnVisible: true,
				dailogTitleType: '提示',
				dailogCon: '提示内容',
				dialogVisible: false,
				stockOutSignShow: true,
				auditStatus: '',
				auditType: '',
				reason: '', //驳回原因
				selectOpt: '', //打印
				goodsDetai: {},
				auditLog: [],
				stockOutSignList: ['模板1', '模板4', '模板9+12', '模板13'],
				stockOutSignSelected: '',
				stockOutSignJson: [],
				deliveryId: '', //补发信息 回传 id
				forwardUnit: '',
				forwardUnitSelected: '朗致集团江西医药有限公司',
				forwardUnitList: [{
					label: '朗致集团江西医药有限公司',
					value: '1'
				}, {
					label: '海南德义堂',
					value: '2'
				}],
				forwardUnitAjax: 2,
				deliverJson: [], //每个商业公司
				deliverJsonArr: [], //所有商业公司待
				deliverJsonObj: {
					"waybill": '',
					"companyName": '',
					"billId": '',
					"stockOutNum": '',
					"infoArray": []
				},
        infoStr:[],//确认发货时 给后台数据
			}
		},
		created() {},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		mounted() {
			this.initData();
			this.getbillNameList();
		},
		methods: {
			initData() {
				getOrdersDetail({
					ordersId: this.$route.query.id,
				}).then(res => {
					const datas = res.data.data
					this.basicForm = datas.basic;
					this.auditLog = datas.checkList;
					this.detailArr = datas.detail;
					this.ordersCollection= datas.ordersCollection; // 打款信息
          if (this.ordersCollection==null){
            this.ordersCollection_1 = false
          } else{
            this.ordersCollection_1 = true
          }
          for(let item of this.detailArr){
              const infoArray = [];
            item.ordersInfoList.forEach(p=>{
              if(this.basicForm.ordersStatus == 8){
                p.totalNumReal = '';//清空NC处理后回显的totalNumReal
              }
              infoArray.push({
                "infoId": p.id,
                "totalBoxReal": ""
              })
            });
            let radioObj = {
              "customerName" :item.customerName,
              "customerId" : item.customerId ,
            }
            this.radioArray.push( radioObj );
            const Obj = {
                "customerId":item.customerId,
                "waybill": '',
                "expressName": '',
                "forwardUnit": '',
                "billId": '',
                "stockOutNum": '',
                "infoArray": infoArray,
            }
            this.infoStr.push(Obj)
          }
				})
			},
			setWuliu(id){//设置发货信息
        this.enterVisible=true;
        this.wuliuShow=true;
        this.courierNum = '';
        this.expressName = '';
        this.forwardUnit = '';
        this.stockOutNum = '';
        this.deliveryId = '';
        this.setWuliuId = id;
        this.infoStr.forEach(p=>{
          if(p.customerId == this.setWuliuId){
            this.courierNum = p.courierNum;
            this.expressName = p.expressName;
            this.forwardUnit = p.forwardUnit;
            this.stockOutNum = p.stockOutNum;
            this.billId =p.billId;
          }
        })
      },
			qureyWuliu(){//发货信息确认按钮
        this.enterVisible = false;
        this.infoStr.forEach(p=>{
            if(p.customerId == this.setWuliuId){
              p.courierNum = this.courierNum;
              p.expressName = this.expressName;
              p.forwardUnit = this.forwardUnit;
              p.stockOutNum = this.stockOutNum;
              p.billId =this.billId;
            }
        })
      },
			getbillNameList() {
				getbillNameList().then(res => {
					this.forwardUnitList = res.data.data;
				})
			},
			//获取补发信息
			getDeliveryMsg(customerId) {
				getDeliveryMsg({
					'ordersId': this.$route.query.id,
					'customerId': customerId
				}).then(res => {
					const datas = res.data.data
          if (datas!=null){
            this.courierNum = datas.waybill; //物流单号
            this.expressName = datas.expressName; //物流公司名称
            this.forwardUnit = datas.billId; //商业公司id
            this.stockOutNum = datas.stockOutNum;//出库单号
            this.deliveryId = datas.id;
          } else{
            this.courierNum = ''; //物流单号
            this.expressName = ''; //物流公司名称
            this.forwardUnit = ''; //商业公司id
            this.stockOutNum = '';//出库单号
            this.deliveryId = '';
          }

				})
					this.enterVisible = true,
					this.wuliuShow = true
			},
			//补发确定
			salesOrdersUpdate() {
				this.deliverJsonObj = {
					"waybill": this.courierNum,
					"expressName": this.expressName,
					"billId": this.forwardUnit,
					"stockOutNum": this.stockOutNum,
					'deliveryId': this.deliveryId
				}

				this.deliverJsonArr.push(this.deliverJsonObj)

				salesOrdersUpdate({
					'ordersId': this.$route.query.id,
					'infoStr': JSON.stringify(this.deliverJsonArr)
				}).then(res => {
					console.log(res)
				})
				this.enterVisible = false
			},
			handleRadioChanges(item) {
				this.customerId = item.customerId
			},
			handleInput(e) {
				// 通过正则过滤小数点后两位
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
			},
			//确认发货验证数量\n
			verifyNum() {
        let num = 0;
        let totalNum = 0;
        for(let item of this.detailArr){
          totalNum += item.ordersInfoList.length;
          item.ordersInfoList.forEach(p=>{
            if(p.totalNumReal == null || p.totalNumReal.toString().trim().length == 0){
              this.$message.success('请输入发货数量')
              return false;
            }else{
              num += 1;
            }
          })
        }
        if(num == totalNum){
          this.dialogVisible = true;
          this.dailogCon = "您确定要发货吗？";
          this.fahuoShow = true;
        }
			},
			//商业公司
			handleChangeSel(val) {
				this.billId = this.forwardUnit
			},
			//发货数量
			handleChange(row,val) {
				let jsonObj = {
					"infoId": row.ordersInfoId,
					"totalBoxReal": row.totalNumReal
				}
				this.deliverJson.push(jsonObj)
				for(let i = 0; i < this.deliverJson.length; i++) {
					for(let j = i + 1; j < this.deliverJson.length; j++) {
						if(this.deliverJson[i].infoId == this.deliverJson[j].infoId) {
							this.deliverJson.splice(i, 1)
							j--;
						}
					}
				}
				this.deliverJsonObj = {
					"waybill": this.courierNum,
					"expressName": this.expressName,
					"billId": this.forwardUnit,
					"stockOutNum": this.stockOutNum,
					"infoArray": this.deliverJson
				}
				for(let item of this.detailArr) {
					for(let temp of item.ordersInfoList) {
					    if(row.id == temp.id){
                temp.jsonObj = this.deliverJsonObj;
              }
					}
				}
        this.infoStr.forEach(p=>{
          if(p.customerId == row.customerId){
            p.infoArray.forEach(item=>{
              if(item.infoId == row.id){
                item.totalBoxReal = row.totalNumReal;
              }
            })
          }
        })
			},
			handleCheckDetail() {},
			handleOrdersNumPass() {
				salesOrdersSend({
					'ordersId': this.$route.query.id,
					'infoStr': JSON.stringify(this.infoStr)

				}).then(res => {
					console.log(res)
					this.dialogVisible = false;
					this.$router.go(-1);
				})
			},

			//待资质审核通过//1通过 2不通过 3整单驳回 4重新提交 5转为待发货 7打印发票申请单 8打印开票申请单
			handleOrdersPass() {
				salesOrdersCheck({
					'ordersId': this.$route.query.id,
					'auditType': this.auditType,
					'auditStatus': this.auditStatus,
				}).then(res => {
//					console.log(res)
					this.$router.go(-1);
				})
			},
			//不通过 ，蒸蛋驳回
			handleOrdersNoPass() {
				if(this.reason == ''){
					alert('请输入不通过原因')
					return false;
				}

				salesOrdersCheck({
					'ordersId': this.$route.query.id,
					'auditType': this.auditType,
					'auditStatus': this.auditStatus,
					'auditRemark': this.reason
				}).then(res => {
//					console.log(res)
					this.dialogVisible = false;
					this.$router.go(-1);
				})
			},


			goBack() {
				this.$router.go(-1)
				//this.$router.replace({path: '/provinceOrderZB'});
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
		.tableInput {
			border-radius: 4px;
			border: 1px solid #dcdfe6;
			box-sizing: border-box;
			height: 30px;
			line-height: 30px;
			padding: 0 15px;
			width: 80%;
		}
		.detail_title {
			padding: 0 20px;
			line-height: 50px;
			color: #1f5dbc;
			font-size: 14px;
			button {
				margin-left: 20px;
			}
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

	.auditPass {
		width: 650px;
		margin: 20px auto;
		text-align: center;
		.el-button-red {
			margin-right: 20px;
		}
	}
	.dailogCon {
		padding: 50px;
		font-size: 14px;
		text-align: center;
		.wuliu {
			span {
				width: 150px;
				text-align: center;
				line-height: 50px;
			}
			.el-input {
				width: 400px;
				line-height: 50px;
			}
			.el-select {
				width: 400px;
				line-height: 50px;
			}
		}
		div {
			display: flex;
			justify-content: space-between;
			span {
				width: 200px;
				text-align: right;
				line-height: 100px;
			}
			.el-textarea {
				padding: 15px;
				.el-textarea__inner {
					width: 80%;
					height: 150px;
				}
			}
		}
		span {
			line-height: 10px;
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
