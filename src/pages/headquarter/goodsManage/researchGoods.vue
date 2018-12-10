<template>
	<div>
		<div class="search_wrap">
			<div>
			  <div class="div-inline el-button-red" @click = "toAddGoods">添加商品</div>
			</div>
		   <el-form  :inline="true" class="demo-form-inline">
			  	<el-form-item label="产品名称：">
			    	<el-input v-model="goodsName" placeholder="请输入产品名称"></el-input>
			  	</el-form-item>
			  	<el-form-item label="生产企业：">
			    	<el-input v-model="manufacturer" placeholder="请输入生产企业"></el-input>
			  	</el-form-item>
			  	<div class="div-inline el-form-item">
			  		<div class="div-inline">点击时间：</div>
				  	<datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="changeSelect"></datepicker>
			  	</div>
			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	  <div class="div-inline el-button-red" @click = 'exportBaseInfoData'>导出</div>
		  	</el-form>
		</div>
		<div class="table_wrap">
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >
	  		<el-table-column type="selection" :selectable="handleSelectionChange"></el-table-column>
		    <el-table-column prop="goodsName" label="产品名称"></el-table-column>
		    <el-table-column prop="specsMax" label="规格"  width="150"></el-table-column>
		    <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
		  	<el-table-column prop="unit" label="单位" width="80"></el-table-column>
		    <el-table-column prop="mainEffect" label="功能主治"></el-table-column>
		    <el-table-column prop="remark" label="备注"></el-table-column>
		    <el-table-column prop="createUserName" label="创建人" width="120"></el-table-column>
		    <el-table-column prop="createDate" label="创建时间" width="160"></el-table-column>
		    <el-table-column prop="clickNum" label="点击量" width="90"></el-table-column>
		    <el-table-column prop="address" label="操作" width="150">
		    	<template slot-scope="scope">
					<!--<div class="operateBtn" @click="view(scope.row.id)">编辑</div>-->
					<div class="operateBtn" @click = "edit(scope.row.id)">编辑</div>
					<div class="operateBtn" @click="del(scope.row.id)">删除</div>
					<div class="operateBtn" @click="view(scope.row.id)">查看</div>
			    </template>
		    </el-table-column>
	  	</el-table>
	  	<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
	 </div>
	 	<el-dialog title="添加产品" :visible.sync="dialogAadVisible" :append-to-body='true'>
			<div class= 'dialog_body_content'>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-row :gutter="20">
						<el-col :span="18">
							<el-form-item label="产品名称" prop="goodsName">
							    <el-input v-model="ruleForm.goodsName" placeholder="请输入产品名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="规格" prop="specsMax">
							    <el-input v-model="ruleForm.specsMax" placeholder="请输入产品规格"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="生产企业">
							    <el-input v-model="ruleForm.manufacturer" placeholder="请输入生产企业"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="单位">
							    <el-input v-model="ruleForm.unit" placeholder="请输入单位"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="功能主治">
							    <el-input v-model="ruleForm.mainEffect" placeholder="请输入主治功能"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="备注">
							    <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogAadVisible = false">取消</span>
				<span class="dialog-sure-btn dialoperateBtn" @click="add_sure('ruleForm',isEdit)">确定</span>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import datepicker from 'components/data-plugin'
	import addressPlugin from 'components/address';
	import elPagination from 'components/el-page';
  	import {getGoodResearData, exportGoodReData, delGoodReData, addGoodReData, editSaveGoodReData, getGoodReBaseData} from 'src/api/headquarter_url/goodsManage';

  export default {
    data() {
      return {
      	startDate: '',//开始日期
        endDate: '',//结束日期
      	goodsName: '',//商品名称
      	manufacturer: '',//生产厂家

		    tableData:[],//table列表
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

      	dialogAadVisible: false,
      	ruleForm: {//添加商品表单
          	goodsName: '',//商品名称
          	manufacturer: '',//生产厂商
          	specsMax: '',//规格
          	unit: '',//单位
          	mainEffect: '',//主要功能
          	remark: ''//备注
        },
        rules: {
          	goodsName: { required: true, message: '请输入产品名称', trigger: 'blur' },
          	specsMax: { required: true, message: '请输入规格', trigger: 'blur' }
        },
        isEdit:true // 是否为编辑按钮

      }
    },
 	created(){
    let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
		this.initData(datalist)
	},
	components:{
        elPagination,
        addressPlugin,
        datepicker
    },
    methods: {
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
	        getGoodResearData(datalist).then(res => {
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

    		})
    	},
    	//获取table列表数据请求参数
		getsearchInfo(pageIndex,pageSize){
			let datalist = {
				pageIndex:pageIndex
				,pageSize:pageSize
				,startDate:this.startDate
				,endDate:this.endDate
				,goodsName: this.goodsName
	      		,manufacturer: this.manufacturer
			};
			return datalist;
		},

		//日期组件
			changeSelect(val){
				val.type == "startDate"?this.startDate = val.data : this.endDate = val.data;
			},
			//点击查询按钮
			toInquire(){
				let datalist=this.getsearchInfo(1,this.pageSize);
				this.initData(datalist);
			},

			//点击导出基本信息按钮
			exportBaseInfoData(){
				let datalist = {
					startDate:this.startDate
					,endDate:this.endDate
					,goodsName: this.goodsName
		      		,manufacturer: this.manufacturer
				};
				exportGoodReData(datalist).then(res => {
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


			//添加产品
			toAddGoods(){
        this.ruleForm={};
        this.isEdit = false;
        this.dialogAadVisible = true;
			},
			//添加产品确定按钮

			add_sure(formName,isEdit) {
        		this.$refs[formName].validate((valid) => {
          			if (valid) {
          				let datalist = this.ruleForm;
          				if (isEdit) {
          				  console.log("编辑");
                    editSaveGoodReData(datalist).then( res => {
                      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);// 重新加载列表数据 取参数
                      this.initData(datalist); // 重新加载列表数据
                      this.dialogAadVisible = false;
                    })
                  }else{
                    console.log("添加商品");
                    addGoodReData(datalist).then( res => {
                      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);// 重新加载列表数据 取参数
                      this.initData(datalist); // 重新加载列表数据
                      this.dialogAadVisible = false;
                    })
                  }
          			} else {
            			console.log('error submit!!');
            			return false;
          			}
        		});
			},
			//查看
			view($id){
				this.$router.push({path:'/view_researGoodsZB',query:{id:$id}});
			},

			//删除
			del($id){
				delGoodReData({goodsPreId: $id}).then(res => {
					let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
					this.initData(datalist)
				})
			},

			//编辑-----
			edit($id){
				getGoodReBaseData({goodsPreId: $id}).then( res => {
          this.dialogAadVisible = true;
					this.ruleForm = res.data.data;
					this.isEdit = true;
          console.log(this.ruleForm);
				})
			},


			//点击分页
			updataPage(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
		//复选框
	    handleSelectionChange(val) {
	      	this.multipleSelection = val;
	    },

    }
  }
</script>

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
.dialog_body_content{
	padding:30px 10px;
}
</style>
