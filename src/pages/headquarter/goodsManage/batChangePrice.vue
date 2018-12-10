<template>
	<div>
		<go-back title="改价"></go-back>
		<div class="infoDetail">
			<el-row :gutter="20">
				<span>{{areaName}}</span>
				<span>{{areaManager}}</span>
				<span>{{position}}</span>
			</el-row>

		</div>
		<div class="table_wrap">
			<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" max-height="530">
			    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
			    <el-table-column prop="specsMax" label="规格"></el-table-column>
			    <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
			    <el-table-column prop="drugType" label="剂型"></el-table-column>
			    <el-table-column prop="standPrice" label="公司标准价"></el-table-column>
			    <el-table-column prop="fixedPrice" label="省区定价"></el-table-column>
			    <el-table-column prop="fewPrice" label="价格">
			    	<template slot-scope="scope">
					    <input v-model.trim="scope.row.fewPrice" @change="handleChange(scope.row,'fewPrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : scope.row.fixedPrice < scope.row.fewPrice, 'color_blue' : scope.row.fixedPrice > scope.row.fewPrice}"></input>
					</template>
			    </el-table-column>
			    <el-table-column prop="address" label="操作">
			    	<template slot-scope="scope">
				        <div class="operateBtn" @click="showChangePriceLog(scope.row.priceId, scope.row.position, scope.row.goodsId)">改价日志</div>
				    </template>
			    </el-table-column>
		  	</el-table>
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


  	import {getBatchChaPriceData, getChangePriceLogData, saveBatchChaPriceData} from 'src/api/headquarter_url/goodsManage';

  export default {
  	name : 'detailFeedbackZB',
    data() {
      	return {
      		pricenum:212,
      		areaName:'',//地区名称
       		areaManager:'',//经理名称
       		position:'',//职务
       		userId:'',//
       		managerUserId:"",//jingli ID
       		tableData: [],	//数据列表
       		goodsName: '',//省区经理及省区名称
       		changPriLogData:[],//改价日志数据
       		priceInfo: [],//改价数据集合
          obj:{},
       		changPriceNum:0,
       		changeReason: '',//改价原因
       		dialogReasonVisible: false
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
	        getBatchChaPriceData({"areaCode": this.$route.query.areaCode, "priceId": this.$route.query.priceId}).then(res => {
				this.areaName=res.data.data.areaName;
				this.areaManager=res.data.data.areaManager;
				this.position=res.data.data.position;
				this.managerUserId=res.data.data.managerUserId;
				this.tableData =res.data.data.goodsList;
				this.userId = res.data.data.userId;
	        })
		},
		//提交改价
		submitChangePrice(){
			let arrayListStr={"priceInfo": this.priceInfo, "changeReason":this.changeReason, userId : this.userId};
			let datalist = {
				"arrayListStr": JSON.stringify(arrayListStr),
				"changeReason":this.changeReason,
				"userId":getStore('accountId'),
			}
			console.log(datalist);
			saveBatchChaPriceData(datalist).then( res =>{
				this.$router.go(-1);
			})
		},
		handleChange(dataRow, type){
			//priceType表示1.公司定价-省区2.省区定价-地区、3.省区定价-县区、4.地区价、5.县区价
			let priceType=1;
			let oldPrice=1;
			let newPrice=1;
			if(type == "provincePrice"){
				newPrice = dataRow.provincePrice;
				oldPrice = dataRow.oldProvincePrice;//老价格
				priceType = 1 ;
			}else if(type == "cityPrice"){
				newPrice = dataRow.cityPrice;
				oldPrice = dataRow.oldCityPrice;//老价格
				priceType = 2 ;
			}else{
				newPrice = dataRow.fewPrice;
				// oldPrice = dataRow.oldCountyPrice;//老价格
				oldPrice = dataRow.oldPrice;//老价格
				priceType = 3 ;
			}
			if(newPrice == "oldPrice"){
				return false;
			}
			let priceInfo = {
				"priceId" : dataRow.priceId,// 省地县
				"newPrice" : newPrice , // 新价格
        "oldPrice" : oldPrice ,  // 老价格
        "userId":this.userId
			};
      this.priceInfo=[];
      if (priceInfo.userId in this.obj) {
        console.log(this.obj);
        console.log(priceInfo.userId);
        console.log(this.obj[priceInfo.userId]);
        if (priceInfo.priceType==1){
          this.obj[priceInfo.userId][0] = priceInfo;
        }else if (priceInfo.priceType==2){
          this.obj[priceInfo.userId][1] = priceInfo;
        } else if (priceInfo.priceType==3){
          this.obj[priceInfo.userId][2] = priceInfo;
        }
      }else{
        this.obj[priceInfo.userId]=[];
        this.obj[priceInfo.userId][0]=priceInfo;
        console.log(this.obj)
      }
      this.priceInfo.push(this.obj);
      this.changPriceNum = this.priceInfo.length;
			console.log(this.priceInfo);
		},
		handleInput2(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null

        },

		//修改个别区域价格
		changePartPrice($id, $managerUserId){
			this.$router.push({path:'/changePartPriceZB',query:{goodsId:$id, managerId: $managerUserId, userId: $managerUserId, searchCity: "", searchCounty: ""}});
		},
		//查看改价日志
		showChangePriceLog($id, $position, $goodsId){
			let logType = 0;
			this.position=="省区经理" ? logType=1 : $position=="地区经理" ?  logType=2 : logType=3 ;//职位5=sheng 4=di 3=xian
			let datalist ={
				pageIndex:1,
				pageSize:10,
				priceId:$id,//商品价格表id
				goodsId:$goodsId,//商品id
				managerId:this.managerUserId,//省区经理id
				userId:this.userId,//省区、地区、县区id
				logType:logType  //1省区 2地区 3县区
			}
			getChangePriceLogData(datalist).then(res => {
				this.changPriLogData= res.data.data
				this.$refs.changePriceLog.dialogShow();
			})
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
