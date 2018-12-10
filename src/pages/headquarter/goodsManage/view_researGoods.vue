<template>
	<div>
		<go-back title="查看商品详情"></go-back>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>产品名称</span>：{{goodsDetai.goodsName}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>生产企业</span>：{{goodsDetai.manufacturer}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>规格</span>：{{goodsDetai.specsMax}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>单位</span>：{{goodsDetai.unit}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>功能主治</span>：{{goodsDetai.mainEffect}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>备注</span>：{{goodsDetai.remark}}</div></el-col>
				</el-row>
			</div>
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>需求明细</div>
			<div class="table_wrap">
				<el-table :data="tableData" border tooltip-effect="dark" >
				    <el-table-column prop="name" label="点击人"></el-table-column>
				    <el-table-column prop="departmentStr" label="事业部"  width="130"></el-table-column>
				    <el-table-column prop="provinceName" label="所属省区"></el-table-column>
				    <el-table-column prop="departmentIdStr" label="所属部门"></el-table-column>
				    <el-table-column prop="positionStr" label="职级"></el-table-column>
				    <el-table-column prop="createDate" label="点击时间" width="160"></el-table-column>
			  	</el-table>
		  		<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
	 		</div>
		</div>
	</div>
</template>
<script>
	import goBack from 'src/components/goBack';
	import elPagination from 'components/el-page';

	import {getGoodReBaseData, getGoodReDemaData} from 'src/api/headquarter_url/goodsManage';


  export default {

    data() {
      return {
       	goodsDetai:{},//基本信息
       	tableData:[],//table列表---需求明细
       	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,
      }
    },
    created(){
		this.initData()
	},

	components:{
		goBack,
		elPagination
	},
    methods: {
        initData(){
	        getGoodReBaseData({goodsPreId: this.$route.query.id}).then(res => {
				this.goodsDetai = res.data.data;
	        })
	        let datalist ={
	        	goodsPreId: this.$route.query.id,
	        	pageIndex: this.pageIndex,
	        	pageSize: this.pageSize
	        };
          // datalist = JSON.stringify(datalist);
	        console.log(datalist);
	        getGoodReDemaData(datalist).then(res => {
	        	const datas=res.data.data;
            if(datas.dataList.length>0){
              this.totalRecords=datas.totalRecords;
              this.totalPageCnt=datas.totalPageCnt;
              this.pageIndex=datas.pageIndex;
              this.tableData= datas.dataList;
              console.log(this.tableData);
            }else{
              this.tableData= [];
              this.pagin_show= false;
            }
          })
		},
		//点击分页
		updataPage(val){
      this.pageSize = val.pageSize;
      this.pageIndex = val.pageIndex;
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		},

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
		.viewRemark{
			color:#1f5dbc;
		}

	}
	.table_wrap, .el-dialog__body {
	    margin-top: 0;
	    background: #fff;
	    border: none;
	    padding: 20px;
	}
}
</style>
