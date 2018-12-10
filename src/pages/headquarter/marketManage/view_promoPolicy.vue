<template>
	<div>
		<go-back title="查看促销政策"></go-back>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple">
				  	<span>政策类型</span>：
				  	{{goodsDetai.policyType == 2 ? '奖励政策' : '回款奖励'}}
				  </div></el-col>
          <el-col v-if="goodsDetai.policyTypeCheck != null" :span="7"><div class="grid-content bg-purple">
            <span>政策子类型</span>：
            {{policyTypeCheckStr[goodsDetai.policyTypeCheck]}}
          </div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple">
				  	<span>政策名称</span>：
				  	{{goodsDetai.title}}
				  </div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>政策有效期</span>：{{goodsDetai.policyStartDate}}--{{goodsDetai.policyEndDate}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple">
				  	<span>事业部</span>：
				  	{{goodsDetai.departmentId ==1 ? '心脑事业部' : goodsDetai.departmentId ==2 ? "风湿及骨科事业部" :  goodsDetai.departmentId ==3 ? "云事业部" : "消化事业部"}}
				  </div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>核销期间</span>：{{goodsDetai.verificationStartDate}}--{{goodsDetai.verificationEndDate}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>政策说明</span>：{{goodsDetai.remark}}</div></el-col>
				</el-row>
			</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>政策规则</div>
			<div class = "table_wrap">
				<!--奖励商品-->
				<el-table v-if="goodsDetai.policyType==2" :data="goodsDetai.subList" border tooltip-effect="dark">
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
        <!--回款奖励-->
        <template v-if="goodsDetai.policyType==3||goodsDetai.policyType==4">
          <!--回款商品-->
          <mainTable :items="mainList" :isView="true"></mainTable>
          <!--奖励商品-->
          <subTable :items="subList" :isView="true"></subTable>
        </template>
			</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>适用范围</div>
			<div class = "detail_table">
				<span class="viewRemark" @click="viewRange()">查看</span>
				<releaseRange ref="dialogSeleProMa" :isView="true" :dialogRangeVisible="dialogRangeVisible" :relRangeList ="goodsDetai.rangeList" :isEdit="isEdit" title ="发布范围"></releaseRange>
			</div>
		</div>

	</div>
</template>
<script>
	import goBack from 'src/components/goBack';
	import releaseRange from 'src/headComponent/releaseRange';
  import {promoPolyDetail} from 'src/api/headquarter_url/promotionPolicy';
  import mainTable from 'src/pages/headquarter/marketManage/main_table';
  import subTable from 'src/pages/headquarter/marketManage/sub_table';
  export default {
    data() {
      return {
       	goodsDetai:{},
       	policyType: '',
       	dialogRangeVisible:false,//适用范围弹窗
       	tableData1:[],//奖励商品
       	tableData2:[],//单品回款奖励
       	tableData3:[],//多主品回款奖励
       	mainList:[],//主品
		    subList: [],//奖励商品
       	isEdit:false,//省区经理可编辑
        policyTypeCheckStr:{
          1:"人员变动",
          2:"库存处理",
          3:"纯回款奖励",
          4:"会议奖励",
        },//政策子类型
      }
    },
    created(){
		this.initData()
	},

	components:{
		goBack,
		releaseRange,
    mainTable,
    subTable
	},
    methods: {
      initData(){
	        promoPolyDetail({'policyId': this.$route.query.id, 'policyType': this.$route.query.type}).then(res => {
              let datas = res.data.data;
              this.goodsDetai = datas;
              this.policyType = datas.policyType;
              if(datas.policyType==2){
                this.tableData1 = datas.subList;
              }
              if(datas.policyType==3||datas.policyType==4){
                this.mainList = datas.mainList;
                this.subList = datas.subList;
              }
	        })
		},
		  viewRange(){
        this.$refs.dialogSeleProMa.dialogShow();
		  },
      closeDiolog(){
        this.dialogRangeVisible =false;
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">

@mixin wh($w,$h){
	width:$w;
	height:$h;
	line-height: $h;
}

.containInfo_wraper{
	margin:20px 30px;

	background:#ffff;
	border:1px solid #e6e6e6;
	.detail_title{
		padding:0 20px;
		line-height:50px;
		color:#1f5dbc;
		font-size:14px;
		.line_Icon{
			display: inline-block;
			@include wh(4px,14px);
			vertical-align: middle;
			margin-right:5px;
			border-radius:20%;
			background:#1f5dbc;
		}
		border-bottom:1px solid #e6e6e6;
	}
	.detail_content{
		padding: 0 29px;
		line-height:49px;
		font-size:14px;
		span{
			display:inline-block;
			width:70px;
			text-align:justify;
			text-align-last:justify;
            text-justify:inter-ideograph;/*IE*/
           text-align-last:inter-ideograph;
		}


	}
	.table_wrap{
			margin-top: 0;
			border: none;
			padding:20px 39px;
		}
	.detail_table{
		padding:20px 49px;
		.viewRemark{
			color:#1f5dbc;
			font-size:14px;
		}
	}
}

</style>
