<template>
	<div>
		<div class="search_wrap">
			<div>
			  <div class="div-inline el-button-red" @click = "toCreatBusiCpy()">添加</div>
			</div>
		   <el-form  :inline="true" class="demo-form-inline">
				<el-form-item label="政策类型：">
				  	<el-select v-model="policyType" placeholder="请选择政策类型">
				      <el-option label="请选择政策类型" value='0'></el-option>
				      <el-option v-for="(item,key,index) in policyTypeMenu" :label="item" :value="key" :key="index"></el-option>
				   </el-select>
				</el-form-item>
				<div class="div-inline el-form-item">
				  	<div class="div-inline">政策有效期：</div>
				  	<datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'poliyData')"></datepicker>
				</div>
				<el-form-item label="政策状态：">
				   <el-select v-model="status" placeholder="请选择政策状态">
				      <el-option label="请选择政策状态" value='0'></el-option>
				      <el-option v-for="(item,key,index) in statusMenu" :label="item" :value="key" :key="index"></el-option>
				   </el-select>
				 </el-form-item>
			  	<div class="div-inline el-form-item">
			 		 <depart-componet @selectSuccess = "selectSuccess"></depart-componet>
			  	</div>
         <el-form-item label="适用范围：">
           <el-input v-model="name" placeholder="请输入适用范围"></el-input>
         </el-form-item>

         <div v-if="false" class="div-inline select-more" @click = "spreadCon()">
				  	更多筛选 <i class="el-icon-arrow-down"></i>
				</div>
			  	<div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  		<!--<div class="div-inline el-button-red" @click = 'exportBtn'>导出</div>-->
		  	</el-form>
		  	<el-form ref="form" :inline="true" class="demo-form-inline slideDown">
			  	<el-form-item label="启用状态：">
				  	<el-select v-model="policyStatus" placeholder="请选择政策类型">
				       <el-option label="请选择启用状态" value='0'></el-option>
				       <el-option label="启用" value="1"></el-option>
				       <el-option label="禁用" value="2"></el-option>
				    </el-select>
				</el-form-item>
			  <el-form-item label="政策名称：">
			    <el-input v-model="title" placeholder="请输入政策名称"></el-input>
			  </el-form-item>
			  <el-form-item label="适用范围：">
			    <el-input v-model="name" placeholder="请输入适用范围"></el-input>
			  </el-form-item>

			  <el-form-item label="创建人：">
			    <el-input v-model="createUser" placeholder="请输入创建人"></el-input>
			  </el-form-item>
			  <div class="div-inline el-form-item">
			  	<div class="div-inline">创建时间：</div>
			  	<datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'creatData')"></datepicker>
			  </div>
			</el-form>
		</div>
		<div class="table_wrap">
			<el-table :data="tableData" border tooltip-effect="dark" >
			    <el-table-column prop="policyType" label="政策类型">
			    	<template slot-scope="scope">
			         	{{ scope.row.policyType == 2 ? "奖励政策" : "回款奖励"}}
			    	</template>
			    </el-table-column>
			    <el-table-column prop="title" label="政策名称" :show-overflow-tooltip="true"></el-table-column>
			    <el-table-column prop="policyStartDate" label="开始日期"></el-table-column>
			  	<el-table-column prop="policyEndDate" label="结束日期"></el-table-column>
			    <el-table-column prop="listUser" label="适用范围" :show-overflow-tooltip="true">
			    	<template slot-scope="scope" >
			    		<span v-for="(item,index) in scope.row.listUser" :key="index">
			    			{{item.name}}
			    		</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="status" label="状态">
			    	<template slot-scope="scope">
              {{scope.row.status}}
			    	</template>
			    </el-table-column>
			    <el-table-column prop="policyStatusStr" label="启用状态"></el-table-column>
			    <el-table-column prop="departmentId" label="事业部">
			    	<template slot-scope="scope">
			         	{{ scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 3 ? "云事业部" : "消化事业部"}}
			    	</template>
			    </el-table-column>
			    <el-table-column prop="createUser" label="创建人"></el-table-column>
			    <el-table-column prop="createDate" label="创建时间"></el-table-column>
			    <el-table-column prop="address" label="操作">
			    	<template slot-scope="scope">

						<div v-if="scope.row.policyStatus==2" class="operateBtn" @click="banStatus(scope.row.id,1)">启用</div>
						<div v-if="scope.row.policyStatus==1" class="operateBtn" @click="banStatus(scope.row.id,2)">禁用</div>
						<div v-if="scope.row.flag==1" class="operateBtn" @click="edit(scope.row.id, scope.row.policyType,1)">修改</div>
						<div class="operateBtn" @click="view(scope.row.id, scope.row.policyType)">查看</div>
				        <div class="operateBtn" @click="edit(scope.row.id, scope.row.policyType,2)">复制</div>
				    </template>
			    </el-table-column>
		  	</el-table>
		  	<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
	 	</div>
	</div>

</template>

<script>
	import datepicker from 'components/data-plugin'
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';
  import {getPromPolicyData,saveBanStatus} from 'src/api/headquarter_url/promotionPolicy';
  export default {
    data() {
      return {
      	policyType: '',//政策类型
      	policyTypeMenu: {2:'奖励政策', 3:'回款奖励'},//政策类型列表  ---1.奖励政策2.单品回款奖励3.多品回款奖励
      	policyStartDate: '',//政策起始时间
      	policyEndDate: '',//政策结束时间
      	status: "",//政策状态
      	statusMenu: {1:'未开启', 2:'进行中', 3:'已失效'},//政策状态列表---状态1未启用  2进行中 3已失效
      	title: '',//政策名称
      	startDate: '',//开始时间
      	endStart: '',//结束时间
      	name: '',//使用范围
      	createUser: '',//创建人
      	departmentId: '',//事业部

      	tableData: [],
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,
      	policyStatus: ''
      }
    },
 	created(){
    	let datalist=this.getsearchInfo(this.pageIndex);
      this.initData(datalist);
	},
	components:{
		datepicker,
		departComponet,
		elPagination
	},
    methods: {
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
	        getPromPolicyData(datalist).then(res => {
	        	const datas=res.data.data;
	        	if(Object.keys(datas.dataList).length>0){
	        		this.totalRecords=datas.totalRecords;
		        	this.totalPageCnt=datas.totalPageCnt;
		        	this.pageIndex=datas.pageIndex;
		        	this.tableData= datas.dataList;
              this.pagin_show= true;
	        	}else{
	        		this.tableData= [];
	        		this.pagin_show= false;
	        	}

    		})
    	},
    	banStatus($id,status){
    		let datalist ={
    			policyId: $id,
    			policyStatus: status
    		};
    		saveBanStatus(datalist).then( res => {
    			let datalist=this.getsearchInfo(this.pageIndex);
				this.initData(datalist);
    		})
    	},
    	//获取参数
		  getsearchInfo(pageIndex){
			let datalist = {
				pageIndex:pageIndex  //当前页-----Y
				,pageSize:this.pageSize //每页大小----Y
				,policyType: this.policyType //政策类型
	      		,policyStartDate: this.policyStartDate //政策起始时间
	      		,policyEndDate: this.policyEndDate //政策结束时间
	      		,status: this.status //政策状态
	      		,title: this.title //政策名称
	      		,startDate: this.startDate //开始时间
	      		,endStart: this.endStart //结束时间
	      		,name: this.name //使用范围
	      		,createUser: this.createUser //创建人
	      		,departmentId: this.departmentId //事业部
	      		,policyStatus: this.policyStatus

			};
			return datalist;
		},
			//点击筛选更多==-
			spreadCon(){
				let myDiv = document.querySelector(".slideDown");
				if(myDiv.classList.contains('spreadSlowlly')){
					myDiv.classList.remove("spreadSlowlly");
					return false;
				}
				myDiv.classList.add("spreadSlowlly");
			},
			//点击事业部
			selectSuccess(val){
				this.departmentId = val;
			},
			//日期组件
			changeSelect(val,type){console.log(val,type);
				if(type == "poliyData"){
					val.type == "startDate"?this.policyStartDate = val.data : this.policyEndDate = val.data;
				}else{
					val.type == "startDate"?this.startDate = val.data : this.endDate = val.data;
				}
			},
			toCreatBusiCpy(){
				this.$router.push({path:'/add_promoPolicyZB'})
			},
			//点击分页
			updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
			//点击查询按钮
			toInquire(){
				let datalist=this.getsearchInfo(1);
				this.initData(datalist);
			},
			//点击导出按钮
			exportBtn(){
				let datalist = {
					    policyType: this.policyType //政策类型
		      		,policyStartDate: this.policyStartDate //政策起始时间
		      		,policyEndDate: this.policyEndDate //政策结束时间
		      		,status: this.status //政策状态
		      		,title: this.title //政策名称
		      		,startDate: this.startDate //开始时间
		      		,endStart: this.endStart //结束时间
		      		,name: this.name //使用范围
		      		,createUser: this.createUser //创建人
		      		,departmentId: this.departmentId //事业部
				};
				exportData(datalist).then(res => {
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


			view($id,$type){
				this.$router.push({path:'/view_promoPolicyZB',query:{id:$id,type:$type}});
			},


     		edit($id,$type,$handleType){
				this.$router.push({path:'/edit_promoPolicyZB',query:{id:$id,type:$type,handleType:$handleType}});
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
	i{
		color:#9c9c9c;
	}
}
.el-button-red{
	margin-bottom: 20px;
}



</style>
