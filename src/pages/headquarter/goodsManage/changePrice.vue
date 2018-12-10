<template>
	<div>
		<go-back title="改价"></go-back>
		<div class="infoDetail">
			<el-row :gutter="20">
				<span>{{infoList.goodsName}}</span>
				<span>{{infoList.goodsSpecsMax}}</span>
				<span>{{infoList.goodsManufacturer}}</span>
				<span>{{infoList.goodsType}}</span>
			</el-row>
			<el-row :gutter="20">
				<span>公司标准价-省区： {{infoList.provincePrice}}</span>
				<span>公司标准价-地区： {{infoList.cityPrice}}</span>
				<span>公司标准价-县区： {{infoList.countyPrice}}</span>
			</el-row>
		</div>
		<div class="table_wrap">
			<el-form ref="form" :inline="true" class="demo-form-inline">
			  	<el-form-item>
				    <el-input v-model.trim="goodsName" placeholder="请输入省区经理名称或省区名称"></el-input>
				</el-form-item>
				<div class="div-inline el-button-red bitchRemove" @click="toInquire()">查询</div>
			</el-form>
			<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" max-height="530">
			    <el-table-column prop="proName" label="省区名称"></el-table-column>
			    <el-table-column prop="userName" label="省区经理名称"></el-table-column>
			    <el-table-column prop="provincePrice" label="公司定价-省区">
			    	<template slot-scope="scope">
					    <input v-model.trim="scope.row.provincePrice" @change="handleChange(scope.row,'provincePrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : infoList.provincePrice < scope.row.provincePrice, 'color_blue' : infoList.provincePrice > scope.row.provincePrice}"></input>
					</template>
			    </el-table-column>
			  	<el-table-column prop="cityPrice" label="公司定价-地区">
			  		<template slot-scope="scope">
					    <input  v-model.trim="scope.row.cityPrice" @change="handleChange(scope.row,'cityPrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : infoList.cityPrice < scope.row.cityPrice, 'color_blue' : infoList.cityPrice > scope.row.cityPrice}"></input>
					</template>
			  	</el-table-column>
			    <el-table-column prop="countyPrice" label="公司定价-县区">
			    	<template slot-scope="scope">
					    <input v-model.trim="scope.row.countyPrice" @change="handleChange(scope.row,'countyPrice')" type="number" @keydown="handleInput2" :class="{'tableInput': true, 'color_red' : infoList.countyPrice < scope.row.countyPrice, 'color_blue' : infoList.countyPrice > scope.row.countyPrice}"></input>
					</template>
			    </el-table-column>
			    <el-table-column prop="address" label="操作">
			    	<template slot-scope="scope">
				        <div class="operateBtn" @click="changePartPrice(scope.row.id, scope.row.managerUserId)">修改个别区域</div>
				        <div class="operateBtn" @click="showChangePriceLog(scope.row.id, scope.row.managerUserId, scope.row.position)">改价日志</div>
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


  	import {getChaPriceData, getChangePriceLogData, saveChangePriceData} from 'src/api/headquarter_url/goodsManage';

  export default {
  	name : 'detailFeedbackZB',
    data() {
      	return {
       		infoList:[],  //对象
       		tableData: [],	//数据列表
       		goodsName: this.$route.query.subSearchName,//省区经理及省区名称
       		changPriLogData:[],//改价日志数据
       		priceInfo: [],//改价数据集合
       		changPriceNum:0,
       		changeReason: '',//改价原因
       		dialogReasonVisible: false,
          obj: {}
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
	        getChaPriceData({goodsId:this.$route.query.goodsId, subSearchName: this.goodsName}).then(res => {
				this.infoList=res.data.data.good;
				this.tableData =res.data.data.list;
				console.log(this.tableData);
	        })
		},
		//查询
		toInquire(){
			this.initData()
		},
		//提交改价
		submitChangePrice(){
			let arrayListStr={"priceInfo": this.priceInfo, "changeReason":this.changeReason}
			let datalist = {
				"arrayListStr": JSON.stringify(arrayListStr),
				"applyType": 1 ,//1总部 2省区
				"userId":getStore('accountId'),
			}
			console.log(datalist);
			saveChangePriceData(datalist).then( res =>{
				this.$router.go(-1);
			})
		},
		handleChange(dataRow, type){
          // console.log(dataRow);
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
				newPrice = dataRow.countyPrice;
				oldPrice = dataRow.oldCountyPrice;//老价格
				priceType = 3 ;
			}
			if(newPrice == "oldPrice"){
				return false;
			}
			let priceInfo = {
				"priceType" : priceType, // 省地县
				"id" : dataRow.id , // 每行 id
				"goodsId" : this.infoList.goodsId , // 用户id
				"oldPrice" : oldPrice ,  // 老价格
				"newPrice" : newPrice , // 新价格
				// "newPrice" : dataRow.areaPrice ,
				"userId" : dataRow.managerUserId
			};
			// [{
      //   priceInfo.userId:[
      //     {},
      //     {},
      //     {}
      //   ],
      //   priceInfo.userId:[
      //     {},
      //     {},
      //     {}
      //   ]
      // }]
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
		},
		handleInput2(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null

        },

		//修改个别区域价格
		changePartPrice($id, $managerUserId){

			this.$router.push({path:'/changePartPriceZB',query:{goodsId:this.$route.query.goodsId, managerId: $managerUserId, userId: $managerUserId, searchCity: "", searchCounty: ""}});
		},
		//查看改价日志
		showChangePriceLog($id, $managerUserId, $position){
			let logType = 0;
			$position==5 ? logType=1 : $position==4 ?  logType=2 : logType=3 ;//职位5=sheng 4=di 3=xian
      if ($id==null){
        $id = 0
      }
			let datalist ={
				pageIndex:1,
				pageSize:10,
				priceId:$id,//商品价格表id
				goodsId:this.$route.query.goodsId,//商品id
				managerId:$managerUserId,//省区经理id
				userId:$managerUserId,//省区、地区、县区id
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
