<!--省区：商品管理：在售商品-->
<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
			  <el-form-item label="物料名称">
			    <el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
			  </el-form-item>
			  <el-form-item label="物料编码">
			    <el-input v-model="materialCode" placeholder="请输入物料编码"></el-input>
			  </el-form-item>
			  <el-form-item label="生产企业">
			  	<el-select v-model="manufacturer" placeholder="请选择生产企业" @focus='getManufacturer()'>
			      <el-option label="请选择生产企业" value='0'></el-option>
			      <el-option v-for="(item,key,index) in manufacturerMenu" :label="item" :value="key" :key="index"></el-option>
			   </el-select>
			  </el-form-item>
			  <el-form-item label="物料类别">
			    <el-select v-model="category" placeholder="请选择物料类别" @focus='getCategory()'>
			      <el-option label="请选择物料类别" value='0'></el-option>
			      <el-option v-for="(item,key,index) in categoryMenu" :label="item" :value="key" :key="index"></el-option>
			    </el-select>
			  </el-form-item>
			  <div class="div-inline select-more" @click = "spreadCon()">
			  	更多筛选 <i class="el-icon-arrow-down"></i>
			  </div>
			  <button class="div-inline el-button-red" @click = "toInquire()">查询</button>
		  	<button class="div-inline el-button-red" @click = 'exportBtn'>导出</button>
		  	</el-form>
		  	<el-form ref="form" :inline="true" class="demo-form-inline slideDown">
			  <el-form-item label="剂型">
			    <el-select v-model="drugType" placeholder="请选择剂型" @focus='getDrugType()'>
			      <el-option label="请选择剂型" value='0'></el-option>
			      <el-option v-for="(item,key,index) in drugTypeMenu" :label="item" :value="key" :key="index"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="规格">
			    <el-input v-model="specsMax" placeholder="请输入规格"></el-input>
			  </el-form-item>
			  <el-form-item label="包装规格">
			    <el-input v-model="specsMin" placeholder="请输入包装规格"></el-input>
			  </el-form-item>

			  <el-form-item label="单位">
			    <el-input v-model="unit" placeholder="请输入单位"></el-input>
			  </el-form-item>
			  <el-form-item label="版本号">
			    <el-input v-model="version" placeholder="请输入版本号"></el-input>
			  </el-form-item>
			  <el-form-item label="批准文号">
			    <el-input v-model="licenseNumber" placeholder="请输入批准文号"></el-input>
			  </el-form-item>
			  </el-form>
		</div>
		<div class="table_wrap">

			<el-table
	  	ref="multipleTable"
	  	:data="tableData3"
	  	border
	  	tooltip-effect="dark">
        <el-table-column prop="goodsName" label="物料名称"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="specsMax" label="规格"></el-table-column>
        <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
		  	<el-table-column prop="drugType" label="剂型"></el-table-column>
		    <el-table-column prop="specsMin" label="包装规格"></el-table-column>
		    <el-table-column prop="category" label="物料类别"></el-table-column>
		    <el-table-column prop="cityPrice" label="地区经理标准价"></el-table-column>
		    <el-table-column prop="countyPrice" label="县区经理标准价"></el-table-column>
		    <el-table-column prop="address" label="操作">
		    	<template slot-scope="scope">
			        <div class="operateBtn" @click="view(scope.row.id,1)">查看</div>
			    </template>
		    </el-table-column>
	  	</el-table>
	  	<el-pagination
	  		v-if="pagin_show"
		    class="pagination"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageIndex"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="pageSize"
		      layout="sizes, prev, pager, next, jumper,total"
		      :total="totalRecords">
		    </el-pagination>
	 </div>

	</div>

</template>

<script>
  import {getStore,getAliOssUrl} from 'src/config/cache'
  import {getOnsalegoodsData,getCategoryListData,getdrugTypeData,getManufacturData,exportData} from 'src/api/province_url/goodsManage';//调接口

  export default {
    data() {
      return {
      	goodsName: '',
      	materialCode: '',//物料编码
      	manufacturer: "0",//生产企业
      	manufacturerMenu: [],//生产企业下拉列表
      	category: '0',//物料类别
      	categoryMenu: [],//物料类别下拉列表
      	drugType: '0',//剂型
      	drugTypeMenu: [],//剂型下拉列表
      	specsMax: '',
      	specsMin: '',
      	unit: '',
      	version: '',
      	licenseNumber: '',
      	status: 1,

      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

        tableData3: [],//table列表

        AliOssUrlist:[]
      }
    },
    mounted(){
    	let datalist=this.getsearchInfo(this.pageIndex);
      this.initData(datalist);
	  },
    methods: {
    	//页面初始化
	    initData : function(datalist){
			//获取table数据列表和分页信息
				const this_=this;
	        getOnsalegoodsData(datalist).then(function(res){
	        	if(res.data.code!=1){
	        		this_.$message.success(res.data.msg);
	        		return false;
	        	}
	        	const datas=res.data.data;
	        	if(Object.keys(datas.dataList).length>0){
              this_.pagin_show=true;
	        		this_.totalRecords=datas.totalRecords;
		        	this_.totalPageCnt=datas.totalPageCnt;
		        	this_.pageIndex=datas.pageIndex;
		        	this_.tableData3= datas.dataList;
	        	}else{
	        		this_.tableData3= [];
	        		this_.pagin_show= false;
	        	}

    		})
        if (getStore('departmentMenu')) {
          this.departmentMenu = JSON.parse(getStore('departmentMenu'));
        }else{
          this.departmentMenu = setDepartment();
        };
    	},
    	//获取参数
		  getsearchInfo : function(pageIndex){
        let userId = getStore('accountId');
			  let datalist = {
				  pageIndex:pageIndex  //当前页-----Y
				  ,pageSize:this.pageSize //每页大小----Y
				  ,goodsName: this.goodsName //商品名称
          ,materialCode: this.materialCode //物料编码
          ,manufacturer: this.manufacturer//生产厂家
          ,category: this.category //物料类别
          ,drugType: this.drugType //剂型
          ,specsMax: this.specsMax //规格
          ,specsMin: this.specsMin //包装规格
          ,userId:userId //登录人id------Y

          ,unit: this.unit //单位
          ,version: this.version //版本号
          ,licenseNumber: this.licenseNumber //批准文号
          ,status: this.status  //状态 1在售------Y
				};
				return datalist;
			},

			//点击筛选更多==-
			spreadCon: function(){
				let myDiv = document.querySelector(".slideDown");
				if(myDiv.classList.contains('spreadSlowlly')){
					myDiv.classList.remove("spreadSlowlly");
					return false;
				}
				myDiv.classList.add("spreadSlowlly");
			},

			//获取生产企业
			getManufacturer: function(){
				let this_=this;
				if(Object.keys(this_.manufacturerMenu).length>0){
					return false;
				}
				getManufacturData().then(function(res){
					if(res.data.code!=1){
	        		this_.$message.success(res.data.msg);
	        		return false;
	        	}
					this_.manufacturerMenu = res.data.data;
				})
			},

			//获取物料类别
			getCategory: function(){
				let this_=this;
				if(Object.keys(this_.categoryMenu).length>0){
					return false;
				}
				getCategoryListData("").then(function(res){
					if(res.data.code!=1){
	        		this_.$message.success(res.data.msg);
	        		return false;
	        	}
					this_.categoryMenu = res.data.data;
				})
			},

			//获取剂型
			getDrugType: function(){
				let this_=this;
				if(Object.keys(this_.drugTypeMenu).length>0){
					return false;
				}
				getdrugTypeData("").then(function(res){
					if(res.data.code!=1){
	        		this_.$message.success(res.data.msg);
	        		return false;
	        	}
					this_.drugTypeMenu = res.data.data;
				})
			},



			//点击查询按钮
			toInquire: function(){
				let datalist=this.getsearchInfo(1);
				this.initData(datalist);
			},

			//点击导出按钮
			exportBtn: function(){
        let userId = getStore('accountId');
				let datalist = {
					goodsName: this.goodsName
          ,materialCode: this.materialCode
          ,manufacturer: this.manufacturer
          ,category: this.category
          ,drugType: this.drugType
          ,specsMax: this.specsMax
          ,specsMin: this.specsMin
          ,unit: this.unit
          ,version: this.version
          ,licenseNumber: this.licenseNumber
          ,status: this.status
          ,userId:userId
				};
				exportData(datalist).then(function(res){
					let fileName = new Date().getTime()+'.xls';
				 	const blob = new Blob([res.data]);
				    const elink = document.createElement('a');
				    elink.download = fileName;
				    elink.style.display = 'none';
				    elink.href = URL.createObjectURL(blob);console.log(elink.href);
				    document.body.appendChild(elink);
				    elink.click();
				    URL.revokeObjectURL(elink.href); // 释放URL 对象
				    document.body.removeChild(elink);
				})
			},

			//查看商品详情
			view: function($id,num){
				this.$router.push({path:'/viewDetail_GoodsSQ',query:{id:$id}});
			},

      //点击更改每页展示条数
			handleSizeChange($val) {
	        this.pageSize = $val;
	        let datalist = this.getsearchInfo(1);
				this.initData(datalist);
	    },

	    //点击当前页
	    handleCurrentChange($val) {
				this.pageIndex = $val;
				let datalist = this.getsearchInfo($val);
				this.initData(datalist);
	    },

    }
  }
</script>
<style lang='scss' scoped="scoped">
.slideDown{
	display: none;
}
.spreadSlowlly{
	display: block;
}
.select-more{
	margin:0 30px;
  cursor: pointer;
	i{
		color:#9c9c9c;
	}
}
.el-button-red{
	margin-bottom: 20px;
}


</style>
