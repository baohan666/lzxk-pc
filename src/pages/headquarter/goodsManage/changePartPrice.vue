<template>
	<div>
		<go-back title="改价"></go-back>
		<div class="infoDetail">
			<el-row :gutter="20">
				<span>{{infoList.goodsName}}</span>
				<span>{{infoList.goodsSpec}}</span>
				<span>{{infoList.goodsManufacturer}}</span>
				<span>{{infoList.goodsType}}</span>
			</el-row>
			<el-row :gutter="20">
				<span>公司标准价-省区： {{infoList.provinceStandardPrice}}</span>
				<span>公司标准价-地区： {{infoList.cityStandardPrice}}</span>
				<span>公司标准价-县区： {{infoList.countyStandardPrice}}</span>
				<span>公司定价-省区： {{infoList.provinceFixedPrice}}</span>
				<span>公司定价-地区： {{infoList.cityFixedPrice}}</span>
				<span>公司定价-县区： {{infoList.countyFixedPrice}}</span>
			</el-row>
		</div>
		<div class="table_wrap">
			<el-form ref="form" :inline="true" class="demo-form-inline">
			  	<el-form-item>
				    <el-input v-model.trim="searchCity" placeholder="请输入地区经理名称或地区名称"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-input v-model.trim="searchCounty" placeholder="请输入县区经理名称或县区名称"></el-input>
				</el-form-item>
				<div class="div-inline el-button-red bitchRemove" @click="toInquire">查询</div>
			</el-form>

			<div class="detail_content qualifiInfo_wraper">
				<div class='qualifiInfo_table'>
					<el-row class="titleThead">
					  	<el-col :span="5">区域名</el-col>
					  	<el-col :span="5">区域经理姓名</el-col>
					  	<el-col :span="5">职务</el-col>
					  	<el-col :span="5">价格</el-col>
					  	<el-col :span="4">操作</el-col>

					</el-row>
					<div v-if="searchCity=='' && searchCounty==''" v-for = '(item,index) in tableData' :key="index">
						<el-row>
						  	<el-col :span="5">{{item.cityObject.areaName}}</el-col>
						  	<el-col :span="5">{{item.cityObject.userName}}</el-col>
						  	<el-col :span="5">{{item.cityObject.position}}</el-col>
						  	<el-col :span="5">
                  <input
                    v-model.trim="item.cityObject.areaPrice"
                    placeholder="请输入价格"
                    @change="handleChange(item.cityObject,'cityPrice')"
                    type="number"
                    @keydown="handleInput2"
                    :class="{'tableInput': true, 'color_red' : infoList.cityStandardPrice < item.cityObject.areaPrice, 'color_blue' : infoList.cityStandardPrice > item.cityObject.areaPrice}"></el-col>
						  	<el-col :span="4"><span
                  class="operateBtn"
                  @click="showChangePriceLog(item.cityObject.id, item.cityObject.managerUserId, item.cityObject.position,  item.cityObject.userId)">改价日志</span></el-col>
						</el-row>

						<el-row v-for = '(menuCounty,index) in item.countyArray' :key="index">
						  	<el-col :span="5">{{menuCounty.areaName}}</el-col>
						  	<el-col :span="5">{{menuCounty.userName}}</el-col>
						  	<el-col :span="5">{{menuCounty.position}}</el-col>
						  	<el-col :span="5"><input v-model.trim="menuCounty.areaPrice" placeholder="请输入价格"  @change="handleChange(menuCounty,'countyPrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : infoList.countyStandardPrice < menuCounty.areaPrice, 'color_blue' : infoList.countyStandardPrice > menuCounty.areaPrice}"></el-col>
						  	<el-col :span="4"><span class="operateBtn" @click="showChangePriceLog(menuCounty.id, menuCounty.managerUserId, menuCounty.position, menuCounty.userId)">改价日志</span></el-col>
						</el-row>
					</div>
					<div v-if="searchCity!='' || searchCounty!=''" v-for = '(item,index) in tableData' :key="index">
						<el-row>
						  	<el-col :span="5">{{item.areaName}}</el-col>
						  	<el-col :span="5">{{item.userName}}</el-col>
						  	<el-col :span="5">{{item.position}}</el-col>
						  	<el-col :span="5"><input v-model.trim="item.areaPrice" placeholder="请输入价格"  @change="handleChange(item,'cityPrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : infoList.cityStandardPrice < item.areaPrice, 'color_blue' : infoList.cityStandardPrice > item.areaPrice}"></el-col>
						  	<el-col :span="4"><span class="operateBtn" @click="showChangePriceLog(item.id, item.managerUserId, item.position, item.userId)">改价日志</span></el-col>
						</el-row>
					</div>

				</div>
			</div>
		</div>

		<div class="operateWraper">
			<div class="div-inline el-button-red" v-show="changPriceNum>0" @click = "dialogReasonVisible=true">提交改价</div>
		</div>
		<changePriceLog ref="changePriceLog" :changPriLogData="changPriLogData"></changePriceLog>
		<el-dialog title="改价原因" :visible.sync="dialogReasonVisible" :append-to-body='true' width="35%">
			<div class= 'dialog_body_content'>
				<div class="dialog_changePrice_reason">
					改价原因：
					<textarea class="checkReason" placeholder="请填写改价原因" v-model="changeReason" name="" id="" cols="30" rows="10"></textarea>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
    			<el-button v-show="changeReason==''" type="danger" class="dialogDisaBtn" disabled>确定</el-button>
				<span v-show="changeReason!=''" class="dialog-sure-btn dialoperateBtn" @click="submitChangePrice()">确定</span>
			</div>
		</el-dialog>
	</div>

</template>
<script>
	import goBack from 'src/components/goBack';
	import changePriceLog from 'src/components/changePriceLog';
	import {getStore} from 'src/config/cache'

  	import {changePartPriceData, getChangePriceLogData, saveBatchPartChaPriceData} from 'src/api/headquarter_url/goodsManage';

  export default {
  	name : 'detailFeedbackZB',
    data() {
      	return {
       		infoList:[],  //对象
       		tableData: [],	//数据列表
       		searchCity:  this.$route.query.searchCity,//地区经理及地区名称
       		searchCounty:  this.$route.query.searchCounty,//县区经理及县区名称
       		changeReason: '',//改价原因
       		dialogReasonVisible: false,
       		changPriLogData:[],//改价日志数据
       		priceInfo: [],//改价数据集合
          obj: {},
       		changPriceNum: 0
      	}
    },
    created(){
		this.initData()
	},
	components:{
		goBack,
	    changePriceLog
	},
    methods: {
        initData(){
	        changePartPriceData({goodsId:this.$route.query.goodsId, managerId: this.$route.query.managerId, userId: this.$route.query.userId,  searchCity: this.searchCity, searchCounty: this.searchCounty}).then(res => {
				this.infoList=res.data.data.headObj;
				this.tableData =res.data.data.listJson.areaArray;
				console.log(this.infoList);
	        })
		},
		//提交改价
		submitChangePrice(){
			let arrayListStr={"priceInfo": this.priceInfo, "changeReason":this.changeReason}
			let datalist = {
				"arrayListStr": JSON.stringify(arrayListStr),
				"applyType": 1 ,//1总部 2省区
				"userId":getStore('accountId')
			}
			console.log(datalist);
			saveBatchPartChaPriceData(datalist).then( res =>{
				this.$router.go(-1);
			})
		},
		handleChange(dataRow, type){
			//priceType表示1.公司定价-省区2.省区定价-地区、3.省区定价-县区、4.地区价、5.县区价
			let priceType=1;
			let oldPrice=1;
			let newPrice=1;
			if(type == "cityPrice"){
				newPrice = dataRow.provincePrice;
				oldPrice = dataRow.provincePrice;//老价格
				priceType = 4;
			}else{
				newPrice = dataRow.countyPrice;
				oldPrice = dataRow.countyPrice;//老价格
				priceType = 5;
			}
			if(newPrice == "oldPrice"){
				return false;
			}
			let priceInfo = {
				"priceType" : priceType,
				"goodsId" : this.$route.query.goodsId,
				"oldPrice" : dataRow.oldAreaPrice,
				"newPrice" : dataRow.areaPrice,
				"userId" : dataRow.userId
			}


      this.priceInfo=[];
      if (priceInfo.userId in this.obj) {
        console.log(this.obj);
        console.log(priceInfo.userId);
        console.log(this.obj[priceInfo.userId]);
        console.log(priceInfo.priceType);
        if (priceInfo.priceType==1){
          this.obj[priceInfo.userId][0] = priceInfo;
        }else if (priceInfo.priceType==2){
          this.obj[priceInfo.userId][1] = priceInfo;
        } else if (priceInfo.priceType==3){
          this.obj[priceInfo.userId][2] = priceInfo;
        }else if (priceInfo.priceType==4){
          this.obj[priceInfo.userId][0] = priceInfo;
        }
      }else{
        this.obj[priceInfo.userId]=[];
        this.obj[priceInfo.userId][0]=priceInfo;
        console.log(this.obj)
      }
      this.priceInfo.push(this.obj);
      console.log(this.priceInfo);
      this.changPriceNum = this.priceInfo.length;
		},
		handleInput2(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null

        },

		//查看改价日志
		showChangePriceLog($id, $managerUserId, $position, $userId){
			let logType = 0;console.log($userId);
			$position=="地区经理" ? logType=2 : logType=3 ;
			if ($id==null){
        $id = 0;
      }
			let datalist ={
				pageIndex:1,
				pageSize:10,
				priceId:$id,//商品价格表id
				goodsId:this.$route.query.goodsId,//商品id
				// managerId:$managerUserId,//省区经理id
				managerId:this.infoList.managerId,//省区经理id
				userId:$userId,//省区、地区、县区id
				logType:logType  //1省区 2地区 3县区
			};
			console.log(datalist);
			getChangePriceLogData(datalist).then(res => {
				this.changPriLogData= res.data.data
				this.$refs.changePriceLog.dialogShow();
			})
		},
		//查询
	    toInquire(){
	    	this.initData();
	    }
    },


}
</script>
<style lang="scss" scoped="scoped">

.infoDetail{
	padding:20px 30px;
	border-bottom:1px solid #ddd;
	span{
		padding-right:15px;
		font-size:14px;
		color:#333;
		line-height:40px;
	}
	background:#fff;
}
.table_wrap{
	margin:30px;
	padding:20px;
	background:#fff;
	color:#666;
	.qualifiInfo_table {
				border-top: 1px solid #eae2e0;
				border-left: 1px solid #eae2e0;
				.titleThead {
					background: #ebeefb;
				}
				.el-row {
					.el-col {
						padding: 0 10px;
						text-align: center;
						border-bottom: 1px solid #eae2e0;
						border-right: 1px solid #eae2e0;
						.operateBtn {
							color: #1f5dbc !important;
							cursor: pointer;
						}
						.tableInput{
						    border-radius: 4px;
						    border: 1px solid #dcdfe6;
						    box-sizing: border-box;
						    height: 40px;
						    line-height: 40px;
						    padding: 0 15px;
						    width: 60%;

						}
					}
				}
			}

		.detail_content {
			padding: 10px 29px 0;
			line-height: 49px;
			font-size: 14px;
			.account_block_title{
				line-height: 30px;
			}
			.marginL30{
				margin-left:15px;
			}

		}
}
.operateWraper {
		margin: 20px;
		text-align: center;
		.el-button-red {
			padding: 0 0.5rem;
		}

	}

.dialog_changePrice_reason{
	padding:30px;
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
</style>
