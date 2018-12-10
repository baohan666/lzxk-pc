<template>
	<div>
		<div class="search_wrap">
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
		    <el-input v-model="submitter" placeholder="请输入提交人"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-input v-model="position" placeholder="请输入省区"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-select v-model="depart" id="changeDepart" placeholder="请选择事业部">
		      <el-option v-for="(menu,index) in departmentList" :label="menu.name" :value="menu.value" :key="index"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-select v-model="questionType" id='questionType' placeholder="请选择问题分类">
		      <el-option v-for="(menu,index) in questionTypeList" :label="menu.name" :value="menu.value" :key="index"></el-option>

		    </el-select>
		  </el-form-item>
		   <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  <div class="div-inline el-button-red" @click = 'exportBtn'>导出</div>
		</el-form>
		</div>
		<div class="table_wrap">
			<el-table
		      :data="tableData"
		      border
		      id="out-table"
          empty-text="暂无数据">
		      <el-table-column prop="number" label="编号" width="120"></el-table-column>
		      <el-table-column prop="createDate" label="提交时间" width="160"></el-table-column>
		      <el-table-column prop="problemType" label="问题分类" width="120">
		      		<template slot-scope="scope">
			         	{{ scope.row.problemType == 2 ? "其他" : "朗致销客" }}
			    	</template>
		      </el-table-column>
		      <el-table-column prop="name" label="提交人" width="120"></el-table-column>
		      <el-table-column prop="departmentId" label="所属事业部">
		      		<template slot-scope="scope">
			         	{{ scope.row.departmentId == 0 ? "顶级部门" : scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 3 ? "云事业部" : "消化事业部"}}
			    	</template>
		      </el-table-column>
		      <el-table-column  prop="treeName" label="所属部门"></el-table-column>


		      <el-table-column prop="position"  label="职务" width="120">
				<template slot-scope="scope">
			        {{ scope.row.position == 1 ? "省区经理" : scope.row.position == 2 ? "地区经理" : scope.row.position == 3 ? "县区经理" : "省办人员"}}
			    </template>
		      </el-table-column>
<!--		      <el-table-column  prop="problemDescription" label="问题描述"></el-table-column>		-->
		      <el-table-column prop="advice" label="意见/建议"></el-table-column>
		      <!--<el-table-column prop="operate" label="操作" width="80">
		        <template slot-scope="scope">
			        <div class="operateBtn" @click="viewDetails(scope.row.id)">详情</div>
			    </template>
		      </el-table-column>-->
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
  import {getFeedbackData,exportData} from 'src/api/headquarter_url/personManage';
  export default {
    data() {
      return {
      	startDate: '',//开始日期
        endDate: '',//结束日期
        submitter: '',//提交人
        position: '',//职位
        depart: '',//事业部
        questionType: '',//问题分类

      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:'',

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
        tableData:[],             //table数据
        departmentList:[			//事业部门
        	{name:'请选择事业部',value:''},
        	{name:'心脑事业部',value:1},
        	{name:'风湿及骨科事业部',value:2},
        	{name:'云事业部',value:3},
        	{name:'消化事业部',value:4},
        ],
        questionTypeList:[			//问题分类
	        {name:'请选择问题分类',value:''},
//	        {name:'诊所',value:1},
	        {name:'其他',value:2},
	        {name:'朗致销客',value:3},
        ]
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
	        getFeedbackData(datalist).then( res =>{
            if(res.data.code==1){
              const datas=res.data.data;
              if(datas.dataList.length>0){
                this.totalRecords = datas.totalRecords;
                this.totalPageCnt = datas.totalPageCnt;
                this.pageIndex = datas.pageIndex;
                this.tableData = datas.dataList;
                this.pagin_show = true;
              }else{
                this.tableData=[];
                this.pagin_show = false;
              }
            }else{
              this.pagin_show = false;
            }
	        })
		},

		//点击分页
		updataPage : function(val){
			this.pageIndex = val.pageIndex;
			this.pageSize = val.pageSize;
			let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
		},
		//将国际标准日期格式转化为 yyyy-MM-dd
		transformDate : function($val){
			  let date = $val;
			  if(date ==""){return ""};
			  let month = (date.getMonth() + 1).toString().padStart(2,'0');
			  let strDate = date.getDate().toString().padStart(2,'0');
			  //时间格式yyyy-MM-dd
			  return  date.getFullYear()+'-'+month+'-'+strDate;
		},

		//获取参数
		getsearchInfo : function(pageIndex,pageSize){
			let strDate = this.transformDate(this.startDate);
			let enDate = this.transformDate(this.endDate);
			let datalist = {
				pageIndex:pageIndex
				,pageSize:pageSize
				,name:this.submitter
				,type:this.questionType
				,position:this.position
				,departmentId:this.depart
				,startDate:strDate
				,endDate:enDate
			};
			return datalist;
		},

		//点击查询按钮
		toInquire : function(){
			let datalist = this.getsearchInfo(1,this.pageSize);
			this.initData(datalist);
		},

		//点击查看详情
		viewDetails : function($id){
			this.$router.push({path:'/detailFeedbackZB',query:{id:$id}});
		},


	    //点击导出按钮
	    exportBtn : function(){
			let datalist = {
				 name:this.submitter
				,type:this.questionType
				,position:this.position
				,departmentId:this.depart
				,startDate:this.transformDate(this.startDate)
				,endDate:this.transformDate(this.endDate)
			};

			exportData(datalist).then(res=>{

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

	    }
    }
  }
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
    height: 40px;
}

</style>

