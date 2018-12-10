<template>
	<div>
		<div class="search_wrap">
			<el-radio-group v-model="flag" @change="changeHandler" class="selectRadio">
				<el-radio  class="div-inline" label="1">无销售人员</el-radio>
				<el-radio  class="div-inline" label="2">有销售人员</el-radio>
		    </el-radio-group>
		    <el-form ref="form" :inline="true" class="demo-form-inline">
			  	<div class="div-inline block">
				    <el-date-picker
				      v-model="startDate"
				      type="date"
				      placeholder="提交开始时间"
				      :picker-options="pickerOptionStar">
				    </el-date-picker>
			   	</div>
			   	<div class="div-inline">-</div>
			   	<div class='div-inline block'>
				    <el-date-picker
				      v-model="endDate"
				      type="date"
				      placeholder="提交结束时间"
				      :picker-options="pickerOptionEnd">
				    </el-date-picker>
			   	</div>
			  	<el-form-item>
				    <el-select v-model="departmentId" placeholder="请选择事业部">
				      <el-option v-for="(menu,index) in departmentList" :label="menu.name" :value="menu.value" :key="index"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item>
				    <el-select v-model="provinceCode" placeholder="请选择省区" @focus='getProvince()'>
				        <el-option label="请选择省区" value='0'></el-option>
				        <el-option v-for="(menu,index) in provinceList" :label="menu.name" :value="menu.value" :key="index"></el-option>
				    </el-select>
			  	</el-form-item>

			  	<el-form-item>
				    <el-input v-model="staffName" placeholder="请输入人员姓名"></el-input>
				</el-form-item>
			  	<div class="div-inline el-button-red" @click = "toInquire()">查询</div>
			</el-form>
		</div>
		<div class="table_wrap">


		<el-table
	  	ref="multipleTable"
	  	:data="tableData3"
	  	border
	  	tooltip-effect="dark"
	  	@selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="departmentId" label="所属事业部">
		    	<template slot-scope="scope">
			        {{ scope.row.departmentId == 0 ? "顶级部门" : scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 2 ? "云事业部" : "消化事业部"}}
			    </template>
		    </el-table-column>
		    <el-table-column prop="provinceName" label="所属省区"></el-table-column>
		    <el-table-column prop="provinceManager" label="省区经理" width="130"></el-table-column>

		  	<el-table-column prop="name" label="姓名" width="120"></el-table-column>
		    <el-table-column prop="position" label="职务" width="100">
		    	<template slot-scope="scope">
			        {{ scope.row.position == 1 ? "省区经理" : scope.row.position == 2 ? "地区经理" : scope.row.position == 3 ? "县区经理" : "省办人员"}}
			    </template>
		    </el-table-column>
		    <el-table-column prop="treeName" label="部门"></el-table-column>
		    <el-table-column prop="mobile" label="手机" width="130"></el-table-column>
		    <el-table-column prop="isDeposit" label="保证金人员" width="120">
		    	<template slot-scope="scope">
			        {{ scope.row.isDeposit == 1 ? "是" : "否" }}
			    </template>
		    </el-table-column>
		    <el-table-column prop="status" label="人员状态" width="120">
		    	<template slot-scope="scope">
			        {{ scope.row.status == 0 ? "删除" : scope.row.status == 1 ? "正常" : scope.row.status == 2 ? "禁用" : "离职"}}
			    </template>
		    </el-table-column>
		    <el-table-column prop="banSign" label="操作">
		    	<template slot-scope="scope">
			        <div class="operateBtn" @click="operatForbidden(scope.row.userId,scope.row.banSign)">
			        	{{ scope.row.banSign == 1 ? "禁用" : "解禁" }}
			        </div>
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
  	import {getSalestaffData,getProvinceData,operatForbidden} from 'src/api/headquarter_url/personManage';
	  import elPagination from 'components/el-page';

  export default {
    data() {
      return {
      	flag: '1',
      	startDate: '',
      	endDate: '',
      	depart: '',

      	departmentId: '',
      	departmentList:[			//事业部门
        	{name:'顶级部门',value:0},
        	{name:'心脑事业部',value:1},
        	{name:'风湿及骨科事业部',value:2},
        	{name:'云事业部',value:3},
        	{name:'消化事业部',value:4},
        ],
      	provinceCode: '',
      	provinceList:[],
      	staffName: '',


      	pickerOptionStar: {  //开始日期范围
            disabledDate: (time) => {
               let endTime = this.endDate;
               if (endTime) {
                  return time.getTime() > endTime;
               }
            }
        },
        pickerOptionEnd: {  //结束日期范围
            disabledDate: (time) => {
               let starTime =this.startDate;
               if (starTime) {
                  return time.getTime() < starTime;
               }
            }
        },

      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:'',

        tableData3: [],

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
	    initData : function(datalist){
			//获取table数据列表和分页信息

			getSalestaffData(datalist).then(res=>{

	        	const datas=res.data.data;
	        	if(Object.keys(datas.dataList).length==0){
	        		this.tableData3=[];
	        		this.pagin_show= false;
	        		return false;
	        	}
	        	this.totalRecords=datas.totalRecords;
	        	this.totalPageCnt=datas.totalPageCnt;
	        	this.pageIndex=datas.pageIndex;
	        	this.pagin_show= true;

	        	this.tableData3=datas.dataList;
			})


    	},

    	//点击分页
		updataPage : function(val){
      this.pageSize = val.pageSize;
      this.pageIndex = val.pageIndex;
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		},

    	//获取参数
		getsearchInfo : function(pageIndex,pageSize){
			let datalist = {
				pageIndex:pageIndex
				,pageSize:pageSize
				,provinceCode: this.provinceCode
	      		,name: this.staffName
	      		,departmentId: this.departmentId
	      		,startDate:this.startDate
	      		,endDate:this.endDate
	      		,flag: this.flag
				};
			return datalist;
		},

		//选择省区
		getProvince: function(){
			let datalist={departmentId:this.departmentId};

			if(this.departmentId.length==0){
				this.provinceList=[];
				return false;
			}

			getProvinceData(datalist).then(res => {
	        	const datas=res.data;

	        	if(Object.keys(datas).length==0){
	        		this.provinceList=[];
	        		return false;
	        	}
				this.provinceList= res.data;

			})
		},
		//查询
		toInquire: function(){
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		},

		//有无销售人员切换1是无2是有
		changeHandler: function($val){
			this.flag=$val;
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		},

		//解禁、禁用操作
		operatForbidden: function(userId,banSign){
			let datalist={
				userId : userId,
				banSign : banSign
			}

			operatForbidden(datalist).then(res =>{
				let txtTip = "";
				banSign==2 ? txtTip="解禁成功！" : txtTip="禁用成功!"
	        	this.$message.success(txtTip);

				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			})
		},


	    handleSelectionChange(val) {
        	this.multipleSelection = val;
        }

    }
}
</script>
<style lang='scss'>

</style>
<style lang="scss" scoped>
	.selectRadio{
		margin-bottom:20px;
	}
	.bitchRemove{
		margin-bottom:20px;
	}
	.el-form--inline .el-form-item {
	    height: 40px;
	}
</style>
