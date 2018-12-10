<template>
	<div>		
		<div class="table_wrap">
		    <div class="div-inline el-button-red addBtn"  @click="addBtn">新增</div>						
			<!--由于element-ui插件循环数据重复，所以将数据拆分在两个table中展示，合并table-->
			<el-dialog :title="title" :visible.sync="dialogAddVisible" :append-to-body='true'>
			
				<el-row class="table_merge">
				  <el-col :span="12">
				  	<el-table :data="gridAddLeft" class="table-left" border @selection-change="handleSelectionChange_add">
						<el-table-column type="selection" :selectable="checkSelectable"></el-table-column>				    					    
						<el-table-column prop="roleName" label="角色类型" ></el-table-column>
						<el-table-column prop="name" label="账号"></el-table-column>				
					</el-table>
				  </el-col>
				  <el-col :span="12">
				  	<el-table :data="gridAddRight" class="table-right" border @selection-change="handleSelectionChange_add">
						<el-table-column type="selection" :selectable="checkSelectable"></el-table-column>				    					    
						<el-table-column prop="roleName" label="角色类型" ></el-table-column>
						<el-table-column prop="name" label="账号"></el-table-column>
					</el-table>
				  </el-col>
				</el-row>				
				 <div slot="footer" class="dialog-footer">
				    
				    <button class="el-button-red" @click="add_sure">确定</button>
				</div>
			</el-dialog>
			<el-table :data="tableData" border >
				<el-table-column type="selection" :selectable="checkSelectable2"></el-table-column>				    					    	      
			      <el-table-column prop="name" label="销管姓名" ></el-table-column>
			      <el-table-column prop="cloud" label="云事业部" ></el-table-column>
			      <el-table-column prop="arthritis" label="风湿事业部" > </el-table-column>
			      <el-table-column prop="heartBrain" label="心脑事业部"></el-table-column>
			      <el-table-column prop="digestion" label="消化事业部" ></el-table-column>	
			      <el-table-column prop="operate" label="操作" >
			        <template slot-scope="scope">
				        <div class="operateBtn" @click="editProvince(scope.row)">编辑省区</div>				        			          		        
				    </template>
				     
		      </el-table-column>
		      <!--<el-col :span="24" v-if="tableData.length == 0"><div class="noData" >暂无数据</div></el-col>-->
		    </el-table>
		</div>
		
		<el-dialog :title="title" :visible.sync="dialogEditVisible" :append-to-body='true' center width="40%">
			<div class="editProvince_xiaoguan">
				销管：{{saleName}}
			</div>
			<el-tabs class="editProvince_dept" v-model="activeName"  @tab-click="handleClick">
			    <el-tab-pane v-for="(item,key,index) in editList" :label="item.departmentName" :key="item.departmentId"></el-tab-pane>			   
			</el-tabs>
			<!--由于element-ui插件循环数据重复，所以将数据拆分在两个table中展示，合并table-->
			<el-row class="table_merge">
			  <el-col :span="24">
			  	<el-table :data="gridData" ref="gridData" class="table-left" border @selection-change="handleSelectionChange_edit">
					<el-table-column type="selection" :selectable="checkSelectable2" ></el-table-column>				    					    
					<el-table-column prop="provinceName" label="省区名称" ></el-table-column>
					<el-table-column prop="provinceManager" label="省区经理姓名"></el-table-column>				
				</el-table>
			  </el-col>
			  <!--<el-col :span="12">
			  	<el-table  :data="gridDataRight" ref="gridDataRight" class="table-right" border @selection-change="handleSelectionChange_edit">
					<el-table-column type="selection" :selectable="checkSelectable2"></el-table-column>				    					    
					<el-table-column prop="provinceName" label="省区名称" ></el-table-column>
					<el-table-column prop="provinceManager" label="省区经理姓名"></el-table-column>
				</el-table>
			  </el-col>-->
			   <el-col :span="24" v-if="gridData.length == 0"><div class="noData" >暂无数据</div></el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
		
				<button class="el-button-red" @click="edit_sure">确定</button>
			</div>
		</el-dialog>	    		
	</div>
</template>
<script>

  	import {getSalescopeData,getEditData,getAddData,AddSure,editSure,getProinceByDeptId} from 'src/api/headquarter_url/personManage';	
  	
  export default {
    data() {
      return {
       tableData:[],  
       dialogAddVisible : false,
       dialogEditVisible : false,
       activeName: 'second',
       title: '请选择需要配置销管审核范围的账号',
       saleName: '',       
       
       activeName: 'name1',
       
       gridAddList: [],
       gridAddLeft: [],
       gridAddRight: [],
       multipleSelect_add: [],
       gridData:[],
       editList: [],
       accountId:'',
       departMenulist: {},
       gridDataList: [],
       gridDataLeft: [],
       gridDataRight: [],
       multipleSelect_edit: [],
       accountInfoIds:[],
       departmentId:'',
       jsonArray:[],
       noData:false
       
      }
    },
    inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
    created(){
		this.initData();

	},
    methods: {
    	//初始化页面
	    initData(){

			getSalescopeData().then(res => {	
				const datas = res.data.data;
						console.log(res.data)						
						this.tableData = datas;										
			})			
		},
		
		//点击新增按钮
		addBtn(){	
			this.accountInfoIds = [];
			this.dialogAddVisible = true;
			getAddData('').then(res => {
				this.gridAddList = res.data.data;
				let arr=res.data.data;
				let t = arr.length;
				this.gridAddLeft = arr.slice(0,Math.round(t/2));
				    this.gridAddRight = arr.slice(Math.round(t/2), t);				    
			})
		},
		//新增确定
		add_sure(){
			if(this.accountInfoIds.length == 0){
				alert('请选择需要配置销管审核范围的账号')
				return false;
			}
			let datalist={str:this.accountInfoIds.toString()};
			AddSure(datalist).then(res => {
				console.log(res)
				if(res.data.code!=1){
					this.$message.success(res.data.msg);
	        		return false;
				}
				this.dialogAddVisible = false;
				this.initData();
			})
		},
		//点击编辑按钮
		editProvince(row){
			this.title = '编辑省区';
			this.saleName = row.name;
			this.dialogEditVisible = true;
			this.accountId = row.accountId;
			getEditData({'accountId':row.accountId}).then(res => {
				let datas = res.data.data;
				this.editList = datas.departmentList;
				this.getProinceByDeptId(this.editList[0].departmentId)
				this.departmentId = '1';
				
			})
		},
		//tab切换转化数据
		getProinceByDeptId(id){
			
			getProinceByDeptId({departmentId:id,accountId:this.accountId}).then(res =>{
			
				this.gridData = res.data.data;	
//				let arr = this.gridDataList;						
//			    let t = arr.length;
//			    this.gridDataLeft = arr.slice(0,Math.round(t/2));
//				this.gridDataRight = arr.slice(Math.round(t/2), t);
				this.$nextTick(()=>{//下次 DOM 更新循环结束之后执行延迟回调
					 this.gridData.forEach( ( item, i ) => {
					 	if(item.isChoose == 1){
					 		this.$refs.gridData.toggleRowSelection(this.gridData[i],true);//默认选中  
					 		}
						 
						} );
						
		 			
//		 			this.$refs.gridDataRight.toggleRowSelection(this.gridDataRight.find(d => d.isChoose == 1),true);//默认选中  
				})
			})
		},
		edit_sure(){
			console.log(JSON.stringify(this.accountInfoIds));
			editSure({
				departmentId:this.departmentId,
				accountId:this.accountId,
				jsonArray:this.accountInfoIds.toString()
			}).then(res => {
				
				this.dialogEditVisible = false;
				this.reload();
				this.$message.success('编辑成功');
			})
		},
		 
	    handleSelectionChange_add(val) {
	        this.multipleSelect_add = val;
	          val.forEach((item, index, arr) => {
	    			this.accountInfoIds.push(item.accountId);	    			
	    		})
	          console.log(this.accountInfoIds)
	    },
	    
	    handleSelectionChange_edit(val) {
//	        this.multipleSelect_edit = val;
//		 	this.$refs.gridDataLeft.toggleRowSelection(this.gridDataLeft.find(d => {
//		 		if(d.isChoose == 1){
//		 			console.log(d)
//		 		}
//		 	}));//默认选中
//		 	this.$refs.gridDataRight.toggleRowSelection(this.gridDataRight.find(d => d.isChoose == 1),true);//默认选中  			
	        
	    },
	    handleSelectionChange_edit(val) {
	
	    	this.accountInfoIds = [];
	 
		    val.forEach((item, index, arr) => {
		    	this.accountInfoIds.push(item.provinceCode);	    			
		    })		
	  		 console.log(this.accountInfoIds)
	          
	    }, 
	    isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},
	    //tab切换事件
	    handleClick(tab, event){

	    	this.accountInfoIds = [];
		   	this.getProinceByDeptId(this.editList[tab.index].departmentId)		        
		    this.departmentId = this.editList[tab.index].departmentId
	    	 
	    },
	    
	    //新增按钮弹窗禁用状态
	    checkSelectable (row, index) {
          	//通过status来禁止不能选择的项
	         return row.status != 1

	    },
	    //编辑按钮弹窗禁用状态
	    checkSelectable2 (row, index) {
	    	return row.status != 3
	    }
		
    }
  }
</script>
<style>
	.el-table__empty-block{display: none;}
</style>
<style lang="scss" scoped>

	.table_wrap .addBtn{
		width:108px;
		text-align: center;
		margin-bottom:24px;
	}
	.editProvince_dept{
		
		margin-left: 10px;
	}
	.editProvince_xiaoguan{
		margin-left: 10px;
		height: 33px;
	    line-height: 33px;	    
	    font-size: 14px;
	    color:#333;
	}
	.table_merge{
		height:420px;
		overflow: auto;

		.el-table--border{
			border:none;
		}
		.el-table--border::after, .el-table--group::after, .el-table::before{
			background:none;
		}
		.table-left {
			border-left:1px solid #eae2e0;
		}
		.noData{
			height:48px;
			line-height:48px;
			text-align: center;
			border-left:1px solid #eae2e0;
			border-right:1px solid #eae2e0;
			border-bottom:1px solid #e3e8f9;
		}		
	}
	

</style>

        