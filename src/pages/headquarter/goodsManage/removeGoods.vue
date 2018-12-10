<!--总部：商品管理：下架商品-->
<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
			  <el-form-item label="商品名称">
			    <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
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
			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	<div class="div-inline el-button-red" @click = 'exportBtn'>导出</div>
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
			  	<div class="div-inline el-form-item">
			 		<depart-componet departMsg="事业部" @selectSuccess = "selectSuccess"></depart-componet>
			 	</div>
			  <el-form-item label="单位">
			    <el-input v-model="unit" placeholder="请输入剂型"></el-input>
			  </el-form-item>
			  <el-form-item label="版本号">
			    <el-input v-model="version" placeholder="请输入规格"></el-input>
			  </el-form-item>
			  <el-form-item label="批准文号">
			    <el-input v-model="licenseNumber" placeholder="请输入包装规格"></el-input>
			  </el-form-item>
			  </el-form>

		</div>
		<div class="table_wrap">
		  <div class="div-inline el-button-red bitchRemove"  @click="batchRemove">批量上架</div>

			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark"
	  	@selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
		    <el-table-column prop="materialCode" label="物料编码"  width="90"></el-table-column>
		    <el-table-column prop="goodsName" label="物料名称" width="100"></el-table-column>
		  	<el-table-column prop="drugType" label="剂型" width="90"></el-table-column>
		    <el-table-column prop="specsMax" label="规格"></el-table-column>
		    <el-table-column prop="specsMin" label="包装规格" width="90"></el-table-column>
		    <el-table-column prop="specsMax" label="库存"></el-table-column>
		    <el-table-column prop="provincePrice" label="省区经理标准价" width="120"></el-table-column>
		    <el-table-column prop="cityPrice" label="地区经理标准价" width="120"></el-table-column>
		    <el-table-column prop="countyPrice" label="县区经理标准价" width="120"></el-table-column>
		    <el-table-column prop="address" label="操作">
		    	<template slot-scope="scope">
			        <div class="operateBtn" @click="goodsRemove(scope.row.id)">上架</div>
			        <div class="operateBtn" @click="editGoods(scope.row.id)">编辑</div>
			        <div class="operateBtn" @click="view(scope.row.id)">查看</div>
			    </template>
		    </el-table-column>
	  	</el-table>
	  	<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
	 </div>
	  	<el-dialog
			  	class="dialogTipsWrap"
				  title="提示"
				  :visible.sync="dialogVisible"
				  width="30%"
				  :append-to-body='true'>
				  <div class='myDiolog_body_small'>
				  	<div class="textTip">{{textTip}}</div>
				  </div>
          <div slot="footer" class="dialog-footer">
            <span class="dialog-cancel-btn dialoperateBtn" @click="dialogVisible = false">取消</span>
            <span class="dialog-sure-btn dialoperateBtn" @click="removeSure">确定</span>
            <!--<span v-if="sureBtn_status==1" class="dialog-sure-btn" @click="removeSure">确定</span>
					<span v-else-if="sureBtn_status==2" class="dialog-sure-btn" @click="dialogVisible = false">确定</span>-->
          </div>
			</el-dialog>
	</div>

</template>

<script>
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';

  	import {getOnsalegoodsData,getCategoryListData,getManufacturData,getdrugTypeData,
  	exportData,getUpateGdData,getGoodDetaiData} from 'src/api/headquarter_url/goodsManage';

  export default {
    data() {
      return {
      	goodsName: '',
      	materialCode: '',
      	manufacturer: "0",
      	manufacturerMenu: [],
      	category: '0',
      	categoryMenu: [],
      	drugType: '0',
      	drugTypeMenu: [],
      	specsMax: '',
      	specsMin: '',
      	depIds: '0',
      	departmentMenu:[],
      	unit: '',
      	version: '',
      	licenseNumber: '',
      	status: 2,//2下架的商品列表；1是在售的商品列表

        tableData: [],
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

      	categoryMenu: [],

        multipleSelection: '',
        tId: '',
        dialogVisible: false,
        removeGoods:{},
        textTip:'',
        sureBtn_status:1//1是点击下架确定按钮，2是提示关闭按钮
      }
    },
 	created(){
    	let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
			this.initData(datalist)
	},
	components:{
		departComponet,
		elPagination
	},
    methods: {
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
        getOnsalegoodsData(datalist).then(res => {
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

    	},
    	//获取参数
		getsearchInfo(pageIndex,pageSize){
			let datalist = {
				pageIndex:pageIndex
				,pageSize:pageSize
				,goodsName: this.goodsName
	      		,materialCode: this.materialCode
	      		,manufacturer: this.manufacturer
	      		,category: this.category
	      		,drugType: this.drugType
	      		,specsMax: this.specsMax
	      		,specsMin: this.specsMin
	      		,depIds: this.depIds
	      		,unit: this.unit
	      		,version: this.version
	      		,licenseNumber: this.licenseNumber
	      		,status:this.status//2下架的商品
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

			//获取生产企业
			getManufacturer(){
				if(this.manufacturerMenu.length>0) return false;
				getManufacturData().then(res => {
					this.manufacturerMenu = res.data.data;
				})
			},

			//获取物料类别
			getCategory(){
				if(this.categoryMenu.length>0) return false;
				getCategoryListData("").then(res => {
					this.categoryMenu = res.data.data;
				})
			},

			//获取剂型
			getDrugType(){
				if(this.drugTypeMenu.length>0) return false;
				getdrugTypeData("").then(res => {
					this.drugTypeMenu = res.data.data;
				})
			},


			//点击查询按钮
			toInquire(){
				let datalist=this.getsearchInfo(1,this.pageSize);
				this.initData(datalist);
			},

			//点击导出按钮
			exportBtn(){
				let datalist = {
					goodsName: this.goodsName
		      		,materialCode: this.materialCode
		      		,manufacturer: this.manufacturer
		      		,category: this.category
		      		,drugType: this.drugType
		      		,specsMax: this.specsMax
		      		,specsMin: this.specsMin
		      		,depIds: this.depIds
		      		,unit: this.unit
		      		,version: this.version
		      		,licenseNumber: this.licenseNumber
		      		,status: this.status//2下架的商品列表
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

			//批量上架
			batchRemove(){
				let mult=this.multipleSelection;
        if (mult != '' || mult.length > 0) {
          mult.forEach((item,index,arr)=>{
            this.tId += item.id+",";
          })
//					this.sureBtn_status = 1;
					this.textTip = "您确定要上架这些商品吗？";
					let ids=this.tId.substring(0, this.tId.lastIndexOf(','));
					this.removeGoodss={"ids":ids,status:1};
				}else{
          this.$message.error('请选择需要上架的商品');
//					this.sureBtn_status = 2;
				}
				this.dialogVisible = true;
			},
      //单个上架
			goodsRemove($id){
				this.removeGoodss={"ids":$id,status:1};
//				this.sureBtn_status = 1;
				this.textTip = "您确定要上架此商品吗？"
				this.dialogVisible = true;
			},
      //上架弹窗点击确定
			removeSure(){
				getUpateGdData(this.removeGoodss).then(res => {
					this.$message.success(`上架成功`);
					this.dialogVisible= false;
					let datalist=this.getsearchInfo(1,this.pageSize);
					this.initData(datalist)
				})
			},

			//编辑
			editGoods: function($id){
				this.$router.push({path:'/edit_removeGoodsZB',query:{id:$id,type:2}});
			},

			//下架商品的详情页与在售的一致，共用一个子页面view_onsaleGoodsZB
			view: function($id){
				this.$router.push({path:'/view_onsaleGoodsZB',query:{id:$id,type:1}});
			},



			//复选框
		    handleSelectionChange(val) {
		      	this.multipleSelection = val;
		    },

      //点击分页
			updataPage(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
			//点击事业部
			selectSuccess(val){
				this.depIds = val;
				console.log(this.depIds);
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


</style>
