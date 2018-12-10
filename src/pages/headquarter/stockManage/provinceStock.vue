<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
		   	<el-form-item label="事业部：">
				<el-select v-model="departmentId" placeholder="请选择事业部">
		      		<el-option v-for="(item,key,index) in departmentMenu" :label="item" :value="key" :key="index"></el-option>
		    	</el-select>
			  </el-form-item>
			  <el-form-item label="所属省区：">
			    <el-input v-model="provinceName" placeholder="请输入所属省区"></el-input>
			  </el-form-item>

			  <el-form-item label="省区经理：">
			    <el-input v-model="provinceManager" placeholder="请输入省区经理"></el-input>
			  </el-form-item>
			   <el-form-item label="商品名称：">
			    <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
			  </el-form-item>


			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	  <div class="div-inline el-button-red" @click = 'exportData()'>导出</div>
		  	</el-form>
		</div>
		<div class="table_wrap">
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >
		    <el-table-column prop="departmentId" label="事业部"  width="120">
		    	<template slot-scope="scope">
			        {{ scope.row.departmentId == 0 ? "顶级部门" : scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 2 ? "云事业部" : "消化事业部"}}
			    </template>
		    </el-table-column>
		  	<el-table-column prop="provinceName" label="所属省区"></el-table-column>
		    <el-table-column prop="provinceManager" label="省区经理"></el-table-column>
		    <el-table-column prop="goodsName" label="产品名称"></el-table-column>
		    <el-table-column prop="materialCode" label="物料编码"></el-table-column>
		    <el-table-column prop="specsMax" label="规格"></el-table-column>
		    <el-table-column prop="enterprise" label="生产企业"></el-table-column>
		    <el-table-column prop="stockActual" label="实际库存"></el-table-column>
		    <el-table-column prop="stockUsable" label="可销售库存"></el-table-column>
		    <el-table-column prop="stockUnusable" label="冻结库存"></el-table-column>
		    <el-table-column prop="address" label="操作">
		    	<template slot-scope="scope">
					<div class="operateBtn" @click="viewLog(scope.row.id)">查看日志</div>
			    </template>
		    </el-table-column>
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
    import {getStore,setStore,setDepartment,getAliOssUrl} from 'src/config/cache'
	import elPagination from 'components/el-page';
  	import {getProStockData,exportInfoData} from 'src/api/headquarter_url/stockManage';

  export default {
    data() {
      return {
      	departmentId: "",//事业部
      	provinceName: '',//所属省区
        provinceManager: '',//省区经理名字
      	goodsName: '',//商品名字

      	departmentMenu: [],//事业部列表


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
		this.initData(datalist)
	},
	components:{
        elPagination
    },
    methods: {
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
	        getProStockData(datalist).then(res => {
	        	const datas=res.data.data;
	        	if(datas.dataList.length>0){
	        		this.totalRecords=datas.totalRecords;
		        	this.totalPageCnt=datas.totalPageCnt;
		        	this.pageIndex=datas.pageIndex;
		        	this.tableData= datas.dataList;
              this.pagin_show= true;
	        	}else{
	        		this.tableData= [];
	        		this.pagin_show= false;
	        	}
    		});
    		if (getStore('departmentMenu')) {
	          this.departmentMenu = JSON.parse(getStore('departmentMenu'));
	        }else{
	          this.departmentMenu = setDepartment();

	        };
	        console.log(this.departmentMenu);


    	},
    	//获取table列表数据请求参数
		getsearchInfo(pageIndex,pageSize){
			let datalist = {
				pageIndex:pageIndex
				,pageSize:pageSize
				,provinceName:this.provinceName
				,provinceManager:this.provinceManager
	      		,goodsName: this.goodsName
	      		,departmentId: this.departmentId

			};
			return datalist;
		},
		//获取客户类型
		getCusType(){
			getCusTypeData('').then(res =>{
    			this.customerList = res.data.data;console.log(this.customerList);
    		})
		},
		//查询
		toInquire(){
			let datalist=this.getsearchInfo(1,this.pageSize);
			this.initData(datalist);
		},
		//导出
		exportData(){
			let datalist = {
					departmentId:this.departmentId
					,provinceName:this.provinceName
		      		,provinceManager: this.provinceManager
		      		,goodsName: this.goodsName
				};
				exportInfoData(datalist).then(res => {
					let fileName = new Date().getTime()+'.xls';
				 	const blob = new Blob([res.data]);
				    const elink = document.createElement('a');
				    elink.download = fileName;
				    elink.style.display = 'none';
				    elink.href = URL.createObjectURL(blob);
				    document.body.appendChild(elink);
				    elink.click();
				    URL.revokeObjectURL(elink.href); // 释放URL 对象
				    document.body.removeChild(elink);
				})

		},
    	//查看详情
    	viewLog($id){
    		this.$router.push({path:'/provinStockLogZB',query:{id:$id}});
    	},

		//点击分页
		updataPage : function(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		}


    }
  }
</script>
<style lang="scss">
	.search_wrap .province_city_county .el-form-item__content{
		width:auto;
	}
	.el-input__inner{
		padding:0 10px;
	}
</style>
<style lang='scss' scoped="scoped">

.bitchRemove{
	margin-bottom:20px;
}
.slideDown{
	display: none;
}
.spreadSlowlly{
	display: block;
}
.select-more{
	margin:0 30px;
	i{
		color:#9c9c9c;
	}
}
.el-button-red{
	margin-bottom: 20px;
}
.province_city_county{
	display: inline-block;
}

</style>
