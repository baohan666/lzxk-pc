<template>
	<div>
		<div class="search_wrap">
			<el-radio-group v-model="radioActive" @change="changeHandler" class="selectRadio">
				<el-radio :label="1">按药品</el-radio>
    			<el-radio :label="2">按区域经理</el-radio>
		    </el-radio-group>
		    <el-form ref="form" :inline="true" class="demo-form-inline">
			  	<el-form-item label="商品名称：">
				    <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="物料类别：" v-show="fication==1">
				    <el-select v-model="category" placeholder="请选择物料类别" @focus='getCategory()'>
				      	<el-option label="请选择物料类别" value='0'></el-option>
				     	<el-option v-for="(item,key,index) in categoryMenu" :label="item" :value="key" :key="index"></el-option>
				    </el-select>
			  	</el-form-item>
				<div class="div-inline el-form-item">
				 	<depart-componet @selectSuccess = "selectSuccess"></depart-componet>
				</div>

				<el-form-item label="经理名称：" v-show="fication==2">
				    <el-input v-model="userName" placeholder="请输入经理名称"></el-input>
				</el-form-item>
        <el-form-item label="所在区域：" v-show="fication==2">
          <el-input v-model="areaName" placeholder="请输入所在区域"></el-input>
        </el-form-item>
			  	<div class="div-inline el-button-red" @click = "changeHandler(fication,1)">查询</div>
			  	<!--<div class="div-inline el-button-red" @click = "ImportPrice()">导入改价</div>	-->
			</el-form>
		</div>

		<div class="table_wrap">
			<div v-show="radioActive==1">
				<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
				    <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
				    <el-table-column prop="materialCode" label="物料编码"></el-table-column>
				    <el-table-column prop="goodsName" label="物料名称"></el-table-column>
				  	<el-table-column prop="drugType" label="剂型" width="90"></el-table-column>
				    <el-table-column prop="specsMax" label="规格"></el-table-column>
				    <el-table-column prop="specsMin" label="包装规格" width="90"></el-table-column>
				    <el-table-column prop="category" label="物料类别" width="90"></el-table-column>
				    <el-table-column prop="provincePrice" label="省区经理标准价" width="120"></el-table-column>
				    <el-table-column prop="cityPrice" label="地区经理标准价" width="120"></el-table-column>
				    <el-table-column prop="countyPrice" label="县区经理标准价" width="120"></el-table-column>
				    <el-table-column prop="address" label="操作" width="120">
				    	<template slot-scope="scope">
					        <div class="operateBtn" @click="changePrice(scope.row.id, null)">改价</div>
					    </template>
				    </el-table-column>
			  	</el-table>
			</div>
			<div v-show="radioActive==2">
			  	<div class="div-inline el-button-red bitchChangePrice"  @click="batchChangePrice">批量改价</div>
			  	<el-table
            ref="multipleTable"
            :data="tableData" border tooltip-effect="dark" @selection-change="handleSelectionChange"
            :empty-text="condition">
				    <el-table-column type="selection"></el-table-column>
				    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
				    <el-table-column prop="specsMax" label="规格"></el-table-column>
				    <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
				  	<el-table-column prop="drugType" label="剂型" width="90"></el-table-column>
				    <el-table-column prop="areaName" label="区域名"></el-table-column>
				    <el-table-column prop="userName" label="区域经理" width="120"></el-table-column>
				    <el-table-column prop="position" label="职务" width="100"></el-table-column>
				    <el-table-column prop="standPrice" label="公司标准价" width="100"></el-table-column>
				    <el-table-column prop="fixedPrice" label="定价" width="100"></el-table-column>
				    <el-table-column prop="fewPrice" label="现价" width="100"></el-table-column>
				    <el-table-column prop="address" label="操作" width="120">
				    	<template slot-scope="scope">
					        <div class="operateBtn" @click="changePrice(scope.row.priceId, scope.row.areaCode, scope.row.id)">改价</div>
					    </template>
				    </el-table-column>
			  	</el-table>
			</div>
	  		<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
	 	</div>
	</div>
</template>

<script>
	import departComponet from 'src/headComponent/departComponent';
	import elPagination from 'components/el-page';

	import {getPricManagDrugData, getPricManagAreaData, getCategoryListData, } from 'src/api/headquarter_url/goodsManage';

  export default {
    data() {
      return {
        goodsName: '',//商品名称
        radioActive: 1,//按药品
        depId: '0',//事业部id
        category: '0',//物料
        categoryMenu:[],//物料类别
        userName:'',//经理名称
        areaName:'', // 所在区域
        fication:1,

		    tableData: [],
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页 1
      	pageSize:10,
      	pagin_show:true,
        condition:'请输入查询条件', // 初始化 按区域表格

		    multipleSelection:[]

      };
    },
    created(){
    	let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
		  this.initData(datalist);
    },
     components:{
        departComponet,
        elPagination
    },
    methods: {
		//按药品和按区域
    	changeHandler(val,c){
    		this.tableData = [];
    		let datalist=this.getsearchInfo(1,this.pageSize);
        this.condition = '请输入查询条件';
        if (val==1 || c == 1 ) {
          if (this.areaName!='' || this.userName!='' || val == 1) {
            this.condition = '暂无数据';
            this.initData(datalist);
          }else{
            alert("请输入经理名称或所在区域")
          }
        }
        this.fication = val;// 给选择类别 赋值 1为按药品 2：按区域经理
			  console.log(val);
    	},
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
			console.log(this.radioActive);
			if(this.radioActive == 1){
				getPricManagDrugData(datalist).then(res => {
	        		if(res.data.code == 1){
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
              }else{
                this.pagin_show= false;
              }
    			})
			}else{
				getPricManagAreaData(datalist).then(res => {
          if(res.data.code == 1){
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
          }else{
            this.pagin_show= false;
          }
				})
			}
    },

    	//批量改价
    	batchChangePrice(){
    		console.log(this.multipleSelection);
    		let areaCode=[];
    		let priceId =[];
    		this.multipleSelection.forEach((item, index, arr) =>{
    			areaCode.push(item.areaCode);
    			priceId.push(item.priceId);
    		})
    		areaCode= Array.from(new Set(areaCode));
    		console.log(areaCode.length);
    		console.log(areaCode);
    		if( areaCode.length==1){
    			this.$router.push({"path":"batChangePriceZB",query: {"areaCode": areaCode[0], "priceId":priceId.join(",")}});

    		}else if( areaCode.length > 1){
    			this.$message.success("请选择相同区域的商品")
    		}else{
    			this.$message.success("请选择需要改价的商品")
    		}
    	},

    	//获取参数
		getsearchInfo(pageIndex,pageSize){
			console.log(this.radioActive);
			let datalist = {};
			if(this.radioActive==1){
				datalist = {
					pageIndex:pageIndex  //当前页-----Y
					,pageSize:pageSize //每页大小----Y
					,goodsName: this.goodsName //商品名称
		      		,category: this.category //物料类别
		      		,depId: this.depId //事业部id
				};
			}else{
				datalist = {
					pageIndex:pageIndex  //当前页-----Y
					,pageSize:pageSize //每页大小----Y
					,goodsName: this.goodsName //商品名称
          ,areaName: this.areaName //所在区域
          ,userName: this.userName//经理名称
          ,depId: this.depId //事业部id
				};
			}
			return datalist;
		},
		//导入改价
		ImportPrice(){

		},
		//改价
		changePrice(id,code,gid){
			if(this.radioActive == 1){//按药品
				this.$router.push({path:'/changePriceZB',query:{goodsId:id, subSearchName: this.userName}});
			}else{//按区域
				this.$router.push({path:'/batChangePriceZB',query:{"areaCode":code, "priceId":id, "goodsId":gid}});

			}

		},

		//获取物料类别
		getCategory(){
			if(Object.keys(this.categoryMenu).length>0){
				return false;
			}
			getCategoryListData("").then(res => {
				this.categoryMenu = res.data.data;
			})
		},
    	//点击事业部
		selectSuccess(val){
			this.depId = val;
			console.log(val)
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


    }
  }
</script>
<style lang="scss" scoped="scoped">
	.selectRadio{
		margin-bottom:20px;
	}
	.bitchChangePrice{
		margin-bottom:20px;
	}
</style>
