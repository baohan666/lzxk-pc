<!--
	总部 - 省区订单详情
-->
<template>
	<div>
		<div class='goBackWraper clear'>
			<span>查看订单详情</span>
			<div class='backBtn'  @click="goBack">返回</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>订单状态</span>：{{basicForm.status}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>订单编号</span>：{{basicForm.ordersNum}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>事业部</span>：{{basicForm.departmentName}}</div>
					</el-col>
					<el-col :span="3">
						<div class="grid-content bg-purple"><span>省区经理</span>：{{basicForm.managerName}}</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple"><span>提交人</span>：{{basicForm.submitName}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>创建时间</span>：{{basicForm.createDate}}</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content bg-purple"><span>销管</span>：{{basicForm.saleManager}}</div>
					</el-col>
					<el-col :span="3" v-show='basicForm.ordersType!=1'>
						<div class="grid-content bg-purple"><span >注意</span>：<span style="color:red;width:110px">{{basicForm.notice}}</span></div>
					</el-col>
				</el-row>
			</div>

		</div>
		<div v-for="item in detailArr">
			<div class="containInfo_wraper">
				<div class="detail_title"><i class="line_Icon"></i>商品公司：<a href="javascript:;">{{item.customerName}}</a></div>
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
						<el-table-column prop="totalNum" label="采购盒数" align='center'>
						</el-table-column>
						<el-table-column prop="pieceNum" label="合计件数" align='center'>
							 <template slot-scope="scope">
				                <span>共{{scope.row.pieceNum}}件{{scope.row.boxNum}}盒</span>
				              </template>
						</el-table-column>
						<!--<el-table-column prop="totalNum" label="总盒数" align='center'>
						</el-table-column>-->
						<el-table-column prop="price" label="单价（每盒）" align='center'>
						</el-table-column>
						<el-table-column prop="sumPrice" label="小计" align='center'>
						</el-table-column>
						<el-table-column prop="policyType" label="政策类型" align='center'>
						</el-table-column>
						<el-table-column prop="gapUp" label="开票类型"  align='center'>
						</el-table-column>
						<el-table-column prop="gapUpPrice" label="开票单价"  align='center'>
						</el-table-column>
						<el-table-column prop="totalNumReal" label="实发数量"  align='center' v-if=' basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11'>
						</el-table-column>
						<el-table-column prop="forwardUnit" label="发货主体"  align='center' v-if=' basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10 || basicForm.ordersStatus == 11 '>
						</el-table-column>
						<el-table-column label="实发数量" align='center' v-if='basicForm.ordersStatus  == 8 '>
							<template slot-scope="scope">
					   		 <input class="tableInput" v-model.trim="scope.row.totalNumReal" @change="handleChange(scope.row,'totalNum',scope.row.totalNumReal)" type="number" @keydown="handleInput"></input>
							</template>
						</el-table-column>
						<el-table-column prop="forwardUnit" label="发货主体" width="250" align='center' v-if='basicForm.ordersStatus  == 8  '>
							<template slot-scope="scope">
								<el-select v-model="scope.row.forwardUnit" placeholder="朗致集团江西医药有限公司" @change="handleChange(scope.row,'forwardUnit')">
									<el-option v-for="item in forwardUnitList" :label="item.label" :value='item.id'>
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="物流" align='center' min-width='150px' v-if="basicForm.ordersStatus == 11">
							<template slot-scope="scope" >
								<div class="operateBtn" @click="dialogVisible = true,ordersInfoId=scope.row.ordersInfoId,wuliuShow=true,dayinShow=false">查看物流</div>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="物流" align='center' min-width='150px' v-if="basicForm.ordersStatus == 9">
							<template slot-scope="scope" >
								<div v-if="scope.row.deliveryId==null||scope.row.deliveryId.length==0" class="operateBtn" @click="setWuliu(scope.row)">录入物流</div>
								<div v-else class="operateBtn" @click="setWuliu(scope.row)">编辑物流</div>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="订单追溯" align='center' min-width='150px' v-if='basicForm.notice == "欠货订单" || basicForm.notice == "政策补货订单"'>
							<template slot-scope="scope">
								<div class="operateBtn" @click="handleCheckOldOrder(scope.row)">查看原订单</div>
							</template>
						</el-table-column>
					</el-table>
					<el-row :gutter="20" type="flex" justify="end">
						<el-col :span="3">
							<div class="grid-content bg-purple"><span>总计金额</span>：{{item.ordersTotalSum}}</div>
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
				<div class="detail_title"><i class="line_Icon"></i>出库单信息：</div>
				<div class='table_wrap'>
					<div class="detail_content">
						<el-row :gutter="20">
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>收货人</span>：{{item.stockOutReceiveName}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>收货人电话</span>：{{item.stockOutReceivePhone}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span style="width: 100px;">出库单上地址</span>：{{item.stockOutReceiveAddress}}</div>
							</el-col>
							<el-col :span="7" v-if="basicForm.ordersStatus == 6">
								<div class="grid-content bg-purple"><span style="width: 100px;">出库单打印标识</span>：
									<select name="" v-model="stockOutSignSelected = item.stockOutSign" id="item.historyMsgId" @change="stockOutSignSelected = stockOutSignSelected,getCouponSelected(item)">
										<option :value="i" v-for="(i,index) in stockOutSignList" >{{i}}</option>
									</select>
								</div>
							</el-col>
							<el-col :span="7" v-if="basicForm.ordersStatus != 6">
								<div class="grid-content bg-purple"><span style="width: 100px;">出库单打印标识</span>：{{item.stockOutSign}}
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="detail_title"><i class="line_Icon"></i>发票信息：</div>
				<div class='table_wrap'>
					<div class="detail_content">
						<el-row :gutter="20">
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>企业名称</span>：{{item.billCompanyName}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>注册地址</span>：{{item.billRegistAddress}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>开户银行</span>：{{item.billAccountBank}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>账号</span>：{{item.billAccountNum}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span >企业税号</span>：{{item.billTaxpayerCode}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span >注册电话</span>：{{item.registPhone}}</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="detail_title"><i class="line_Icon"></i>发票邮寄信息：</div>
				<div class='table_wrap'>
					<div class="detail_content">
						<el-row :gutter="20">
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>发票收取人</span>：{{item.billMailReceiveName}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span>联系电话</span>：{{item.billMailReceivePhone}}</div>
							</el-col>
							<el-col :span="7">
								<div class="grid-content bg-purple"><span style="width: 100px;">发票邮寄地址</span>：{{item.billMailReceiveAddress}}</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
	</div>
		<div class="detail_content auditLog" style="margin:30px;">
      <el-row v-if="basicForm.syncfailureReason!=null&&basicForm.syncfailureReason!=''" :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple"><span class="remark">同步失败原因：</span>{{basicForm.syncfailureReason}}</div>
        </el-col>
      </el-row>
			<el-row :gutter="20">
				<el-col :span="20">
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
		<div class="auditPass" v-show="basicForm.ordersStatus == 5">
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="您确定要通过商业公司的资质吗？",buttonType="1",passBtnShow=true,dayinShow = false,noPassBtnShow = false'>通过</button>
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="请输入不通过原因:",buttonType="2",noPassBtnShow = true'>不通过</button>
		</div>

		<div class="auditPass" v-show="basicForm.ordersStatus == 6 || basicForm.ordersStatus == 7">
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="您确定要通过吗？",buttonType="1",passBtnShow=true,dayinShow = false,noPassBtnShow = false'>通过</button>
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="请输入驳回原因：",buttonType="2",noPassBtnShow = true'>整单驳回</button>
		</div>

		<div class="auditPass" v-show=" basicForm.ordersStatus == 8 || basicForm.ordersStatus == 9 || basicForm.ordersStatus == 10|| basicForm.ordersStatus == 11">
			<button class="el-button-red" @click='wuliuShow=false,dayinShow=true,dialogVisible=true,dailogCon="请选择商业公司",buttonType="7"'>打印发货申请单</button>
			<button class="el-button-red" @click='wuliuShow=false,dayinShow = true,dailogCon="请选择商业公司",dialogVisible=true,buttonType="8"' >打印开票申请单</button>
			<button class="el-button-red" @click='verifyNum()' v-if="basicForm.ordersStatus == 8 &&accountName == 'admin'">确认发货</button>
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="请输入驳回原因：",buttonType="2",noPassBtnShow = true' v-if='basicForm.ordersStatus != 11 && basicForm.ordersStatus  != 8 && basicForm.ordersStatus != 9 && basicForm.ordersStatus != 10 '>整单驳回</button>
		</div>

		<div class="auditPass" v-show="basicForm.ordersStatus == 14">
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="您确定要重新提交吗？",buttonType="4",passBtnShow = true,noPassBtnShow = false' >重新提交</button>
			<button class="el-button-red" @click='dialogVisible=true,dailogTitleType="提示",dailogCon="请输入驳回原因：",buttonType="2",noPassBtnShow = true'>整单驳回</button>
			<button class="el-button-red" @click='dialogVisible=true,dailogCon="您确定转为待发货吗？",buttonType="5",passBtnShow = true,noPassBtnShow = false'>转为待发货</button>
		</div>
			<el-dialog :title="dailogTitleType" :visible.sync="dialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
				<div class="dailogCon" v-if="passBtnShow || fahuoShow ||noPassBtnShow">
					<div>
						<span class="noPassDailogCon" v-show='buttonType =="3" || buttonType =="2"'>{{dailogCon}}</span>
						<span class="passDailogCon" v-show='buttonType !="3" && buttonType !="2"'>{{dailogCon}}</span>
						<el-input type="textarea" maxlength="100" v-model="reason" v-if='buttonType =="3" || buttonType =="2"'></el-input>
					</div>
				</div>
				<div class="dailogCon" v-if="wuliuShow">
					<div class="wuliu">
						<span>物流公司：</span>
						<el-input type="" v-model="expressName" name="" id="" value="" placeholder="请输入物流公司" /></el-input>
					</div>
					<div class="wuliu">
						<span>物流单号：</span>
						<el-input type="" v-model="courierNum" name="" id="" value="" placeholder="请输入物流单号" /></el-input>
					</div>
				</div>
				<div class="dailogCon" v-if="dayinShow && !fahuoShow && !passBtnShow && !wuliuShow && buttonType !='3' && buttonType !='2'">
					<span class="opt">{{dailogCon}}</span>
					<el-radio-group v-model="company" v-for='(item,index) in radioArray' @change="handleRadioChanges(item)">
						<el-radio justify="center" type="radio" name="company" id="" :label="item.customerName"/></el-radio>
					</el-radio-group>
				</div>

				<span slot="footer">
					<!--打印 打印需要传后台商业公司id-->
					<span @click="handleDayin()" class="dialogBtnTrue"   v-if="dayinShow && !fahuoShow && !passBtnShow && !wuliuShow && buttonType !='3' && buttonType !='2'">确定</span>
					<!--录入物流-->
					 <span @click="handleExpress()" class="dialogBtnTrue"   v-if="wuliuShow">确定</span>
					<!--待发货时确认发货-->
					<span @click="handleOrdersNumPass()" class="dialogBtnTrue"  v-if="fahuoShow">确定</span>
					<!--普通传参时的确定按钮-->
					<span @click="handleOrdersPass()" class="dialogBtnTrue"  v-if="basicForm.ordersStatus != 6 && passBtnShow && !noPassBtnShow">确定</span>
					<span @click="handleOrdersNoPass()" class="dialogBtnTrue"  v-if="noPassBtnShow">确定</span>
					<!--出库单打印标识确定-->
					<span @click="handleOrdersSelPass()" class="dialogBtnTrue" v-if="basicForm.ordersStatus == 6 && !noPassBtnShow">确定</span>
				</span>
			</el-dialog>
	</div>
</template>
<script>
	import {
		getProvinceOrdersDetail,
		handleOrders,
		insertOrdersDelivery,
		selectPrimaryOrders
	} from 'src/api/headquarter_url/orderManage';
	export default {
		data() {
			return {
				tableData: [],
				detailArr: [],
				basicForm: {
					status: '', //	    订单状态
					ordersNum: '', //		订单编号
					submitName: '', //		提交人
					deptName: '', //		事业部
					createDate: '', //		创建时间
					saleManager: '', //		销管
					notice: '', //     注意
					remark: '', //		备注
				},
				company:'',
				radioArray:[],
				noPassBtnShow:false,
				passBtnShow:false,
				dayinShow:true,
				fahuoShow:false,
				wuliuShow:false,
				ordersInfoId:'',
				customerId:'', //商业公司id
				courierNum:'',  //物流单号
				expressName:'', //物流公司
        billId:'',
        deliveryId:'',
        companyName:'',
				dialogBtnVisible:true,
				dailogTitleType:'提示',
				dailogCon:'提示内容',
				dialogVisible:false,
				stockOutSignShow:true,
				buttonType:'',
				reason:'',//驳回原因
				selectOpt:'',//打印
				goodsDetai: {},
				auditLog: [],
				stockOutSignList:[   '模板1',  '模板4',  '模板9+12',  '模板13' ],
				stockOutSignSelected:'',
				stockOutSignJson:[],
				deliverJson:[], //待发货
				forwardUnitSelected:'朗致集团江西医药有限公司',
				forwardUnitList:[{label:'朗致集团江西医药有限公司',id:'2'},{label:'海南德义堂',id:'1'}],
				forwardUnitAjax:2,
				deliverJsonObj:{
					"ordersInfoId" : "",
					"billId" : "" ,
					"forwardUnit" : "" ,
					"totalNumReal" : "",
				},
        accountName:""//登录人名字

			}
		},
		created(){
      this.accountName = localStorage.accountName;
    },
    inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		mounted() {
			this.initData()
		},
		methods: {
			initData () {
				getProvinceOrdersDetail({
					orderId: this.$route.query.id,
				}).then(res => {
					const datas = res.data.data
					this.basicForm = datas.orders;
					this.auditLog = datas.ordersCheck;
					this.detailArr = datas.ordersInfo;
					for(let item of this.detailArr){
            item.ordersInfoList.forEach(p=>{
              if(this.basicForm.ordersStatus == 8){
                p.totalNumReal = '';//清空NC处理后回显的totalNumReal
              }
            });//清空NC处理后回显的totalNumReal
            let radioObj = {
            "customerName" :item.customerName,
            "customerId" : item.customerId ,
            }
            this.radioArray.push( radioObj )
					}
				})
			},
			//打印发票开票
			handleDayin(){
				if(this.customerId == ''){
					alert('请选择商业公司')
					return false;
				}
				handleOrders({
					'ordersId':this.$route.query.id,
					'buttonType': this.buttonType,
					'ordersStatus':this.basicForm.ordersStatus.toString(),
					'customerId':this.customerId
				}).then(res=>{
					this.dialogVisible=false;
					if(this.buttonType == 7){
						this.$router.push({path:'/proOrderBillZB',query:{'ordersId':this.$route.query.id,'buttonType': this.buttonType,'ordersStatus':this.basicForm.ordersStatus.toString(),'customerId':this.customerId}});
					}else{
						this.$router.push({path:'/proOrderSendGoodsZB',query:{'ordersId':this.$route.query.id,'buttonType': this.buttonType,'ordersStatus':this.basicForm.ordersStatus.toString(),'customerId':this.customerId}});
					}

				})
			},
			handleRadioChanges(item){
				this.customerId = item.customerId
			},
			handleInput(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
        	},
        	//发货数量
      handleChange(row,type,num){
        let forwardUnit = '2';
        let totalNumReal = '';
        if(type == "totalNum"){
					totalNumReal = num;
				}else if(type == "forwardUnit"){
					forwardUnit = row.forwardUnit;
					totalNumReal= row.totalNumReal;
				}
				let deliverJsonObj = {
					"id" :row.ordersInfoId,
					"customerId" : row.customerId ,
					"forwardUnit" : forwardUnit ,
					"totalNumReal" : totalNumReal
					}
			this.deliverJson.push(deliverJsonObj)
			for(let i = 0;i<this.deliverJson.length;i++){
				for(let j = i+1;j<this.deliverJson.length;j++){
					if(this.deliverJson[i].id == this.deliverJson[j].id){
						this.deliverJson.splice(i,1)
						j--;
					}
				}
			}
			},
      //输入物流信息
      setWuliu(data){console.log(data.ordersInfoId)
        this.dialogVisible = true;
        this.ordersInfoId=data.ordersInfoId;
        this.billId=data.customerId;
        this.companyName=data.customerName;
        this.wuliuShow=true;
        this.dayinShow=false;
        this.courierNum="";
        this.expressName="";
        if(data.deliveryId !=null&&data.deliveryId.toString().length>0){
          this.deliveryId=data.deliveryId;
          this.courierNum=data.courierNum;
          this.expressName=data.expressName;
        }
      },
			//录入物流
			handleExpress(){
				if(this.courierNum == ''){
					alert('请填写物流单号')
					return false;
				}else if(this.expressName == ''){
					alert('请填写物流公司')
					return false;
				}
				insertOrdersDelivery({
					'ordersInfoId':this.ordersInfoId,
					'courierNum': this.courierNum,
					'expressName':this.expressName,
					'billId':this.billId,
					'companyName':this.companyName,
					'ordersId':this.$route.query.id,
					'deliveryId':this.deliveryId,
				}).then(res=>{
					this.dialogVisible=false;
					this.wuliuShow = false;
          this.initData();
					this.$message.success('操作成功');
				})
			},
			//待发货时确认发货 6确认发货
			handleOrdersNumPass(){
        let num = 0;
        let totalNum = 0;
				for(let item of this.detailArr){
            totalNum += item.ordersInfoList.length;
				    item.ordersInfoList.forEach(p=>{
              if(p.totalNumReal == null || p.totalNumReal.toString().trim().length == 0){
                alert('请输入发货数量')
                return false;
              }else{
                num += 1;
              }
            })
        	}
        if(num == totalNum){
          handleOrders({
            'ordersId':this.$route.query.id,
            'buttonType':  this.buttonType,
            'ordersStatus':this.basicForm.ordersStatus.toString(),
            'deliverJson':JSON.stringify(this.deliverJson)
          }).then(res=>{
            this.dialogVisible=false;
            this.$router.go(-1);
            this.$message.success('确认发货成功');
          })
        }
			},

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
          this.buttonType="6"
          this.fahuoShow = true;
        }
			},

			//待资质审核通过//1通过 2不通过 3整单驳回 4重新提交 5转为待发货 7打印发票申请单 8打印开票申请单
			handleOrdersPass(){
				handleOrders({
					'ordersId':this.$route.query.id,
					'buttonType':  this.buttonType,
					'ordersStatus':this.basicForm.ordersStatus.toString(),
				}).then(res=>{
					console.log(res)
					this.dialogVisible=false;
					this.$router.go(-1);
					this.$message.success('订单操作成功');
				})
			},
			//不通过 ，蒸蛋驳回
			handleOrdersNoPass(){
				if(this.reason.length == 0){
					alert('请输入原因')
					return false;
				}
				handleOrders({
					'ordersId':this.$route.query.id,
					'buttonType':  this.buttonType,
					'ordersStatus':this.basicForm.ordersStatus.toString(),
					'ordersRemark':this.reason
				}).then(res=>{
					console.log(res)
					this.dialogVisible=false;
					this.$router.go(-1);
					this.$message.success('订单操作成功');
				})
			},
			//出库单打印标识
			getCouponSelected(item){
				console.log(item)
				let stockOutSignObj ={}
				stockOutSignObj.historyMsgId = item.historyMsgId,
				stockOutSignObj.stockOutSign = item.stockOutSign
				this.stockOutSignJson.push(stockOutSignObj)
			},
			//出库单打印标识确认
			handleOrdersSelPass(){
				handleOrders({
					'ordersId':this.$route.query.id,
					'buttonType':  this.buttonType,
					'ordersStatus':this.basicForm.ordersStatus.toString(),
					'stockOutSignJson':JSON.stringify(this.stockOutSignJson)
				}).then(res=>{
					console.log(res)
					this.dialogVisible=false;
					this.$router.go(-1);
					this.$message.success('订单操作成功');

				})
			},
			//查看原订单
			handleCheckOldOrder(row){
        if(row.oldOrdersId==null||row.oldOrdersId==''){
          this.$message.success('暂无原订单信息');
        }else{
          let routeData = this.$router.resolve({
            name: "provinceOrderDetailZB",
            query: {id:row.oldOrdersId},
          });
          window.open(routeData.href, '_blank');
        }
			},
			 goBack(){
			 	this.$router.go(-1)
//			    this.$router.replace({path: '/provinceOrderZB'});
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
	/*.el-select{
		width: 220px;引起了所有页面中查询下拉框的宽度边长，样式遮挡问题
	}*/
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
		.tableInput{
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
			font-size:16px;
			font-weight: 900px;
			padding-right:20px;
		}
		.auditLog_li_hegit{

				line-height: 25px;

		}

	}
	.auditPass{
		width: 650px;
		margin:20px auto;
		text-align: center;
		.el-button-red{
			margin-right: 20px;
		}
	}
	.dailogCon{
		padding: 50px;
		font-size: 14px;
		text-align: center;

			.el-radio{
					line-height: 2;
				}

		.opt{
			margin-top:-30px ;
			line-height: 40px;
		}
		.wuliu{
			display: flex;
			flex-direction: row;
			span {
				display: inline-block;

				text-align: center;
				line-height: 50px;
			}
			.el-input {
				display: inline-block;
				width: 200px;
				line-height: 50px;
			}
		}
		div{
			display: flex;
			flex-direction: column;

			.passDailogCon{
				text-align: center;
				margin: auto;

			}
			.noPassDailogCon{
				line-height: 30px;
				text-align: center;

			}
			span{
				width:150px;
				text-align: right;
				line-height: 100px;
			}
			.el-textarea{

				.el-radio-group{

				}
				.el-textarea__inner{
					width:50%;
					line-height: 20px;
					height: 30px;
				}
			}
		}

		span{
			line-height: 10px;
			input{
				border: 1px solid  #1f5dbc;
			}
		}

	}

	.dialogBtnTrue{

		padding: 6px 25px;
		background: #e02222;
		border-radius: 2px;
		color: white;

	}
</style>
