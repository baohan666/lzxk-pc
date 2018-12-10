<!--省区：库存管理：查看日志-->
<template>
	<div>
    <go-back title="库存日志"></go-back>
		<div class="infoDetail">
			<span>产品名称：{{infoList.goodsName}}</span>
			<span>规格：{{infoList.specsMax}}</span>
			<span>实际库存：{{infoList.stockActual}}</span>
			<span>可销售库存：{{infoList.stockUsable}}</span>
			<span>冻结库存：{{infoList.stockUnusable}}</span>
		</div>
		<div class="table_wrap">
			<div class= "titleTip">库存变更明细</div>
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >
		  	<el-table-column prop="createDate" label="变更时间"></el-table-column>
		    <el-table-column prop="changeNumber" label="变更数量"></el-table-column>
		    <el-table-column prop="changeTypeStr" label="更改类型"></el-table-column>
		    <el-table-column prop="remark" label="变更原因"></el-table-column>
	  	</el-table>
	  	<el-pagination
	  			:pageIndex='pageIndex'
	  			:pageSize= 'pageSize'
	  			:totalRecords='totalRecords'
	  			:totalPageCnt='totalPageCnt'
	  			:pagin_show= 'pagin_show'
	  			v-on:clickpage="updataPage"></el-pagination>
	 </div>

	</div>

</template>
<script>
	import elPagination from 'components/el-page';
  import {getProStockLogData} from 'src/api/province_url/stockManage';
  import goBack from 'src/components/goBack';//返回

  export default {
  	name : 'detailFeedbackZB',
    data() {
      return {
        infoList:[],

        totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

      	tableData:[],//table列表
      }
    },
    mounted(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
      this.initData(datalist);
    },
    components:{
      elPagination,
      goBack,//返回
    },
    methods: {
      initData:function(datalist){
        console.log("datalist:",datalist)
          getProStockLogData(datalist).then(res => {
            let datas = res.data.data;
            this.infoList = datas.dataList[0].title;
            this.tableData = datas.dataList[0].list;

            this.totalRecords= datas.totalRecords;
            this.totalPageCnt= datas.totalPageCnt;
            this.pageIndex= datas.pageIndex;
          })
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,stockId: this.$route.query.id
        };
        return datalist;
      },
      //点击分页
      updataPage : function(val){
        console.log("分页val：",val)
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      }
    }
  }
</script>
<style lang="scss" scoped="scoped">

@mixin ft($dirc){
	float:$dirc;
}
@mixin wh($w,$h){
	width:$w;
	height:$h;
	line-height: $h;
}
.goBackWraper{
	span{
		@include ft(left);
		line-height:40px;
	}
	.backBtn{
		@include wh(90px,40px);
		@include ft(right);
	    text-align: center;
	    background: #fff;
	    font-size: 18px;
	    color: #e02222;
	    border-radius: 2px;
	}
}
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
.titleTip{
	color: #1f5dbc;
	margin:0 0 20px;
	font-size:14px;
}

</style>
