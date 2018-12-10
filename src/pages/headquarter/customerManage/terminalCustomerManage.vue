<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
			  <el-form-item label="客户名称：">
			    <el-input v-model="clinicName" placeholder="请输入客户名称"></el-input>
			  </el-form-item>
			   <el-form-item label="客户类型：">
				<el-select v-model="customType" placeholder="请选择客户类型" @focus="getCusType()">
			        <el-option label="请选择客户类型" value='0'></el-option>
		      		<el-option v-for="(item,key,index) in customerList" :label="item" :value="key" :key="index"></el-option>
		    	</el-select>
			  </el-form-item>
			  <el-form-item label="客户联系人：">
			    <el-input v-model="username" placeholder="请输入客户联系人"></el-input>
			  </el-form-item>
			   <el-form-item label="负责人：">
			    <el-input v-model="name" placeholder="请输入负责人"></el-input>
			  </el-form-item>
			  <el-form-item label="事业部：">
				<el-select v-model="departmentId" placeholder="请选择事业部">
		      		<el-option v-for="(item,key,index) in departmentMenu" :label="item" :value="key" :key="index"></el-option>
		    	</el-select>
			  </el-form-item>
			  <div class="div-inline select-more" @click = "spreadCon()">
			  	更多筛选 <i class="el-icon-arrow-down"></i>
			  </div>
			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	  <div class="div-inline el-button-red" @click = 'exportData()'>导出</div>

		  	</el-form>
		  	<el-form ref="form" :inline="true" class="demo-form-inline slideDown">
		  		<el-form-item label="创建人：">
			    <el-input v-model="createUser" placeholder="请输入创建人"></el-input>
			  </el-form-item>
		  		<div class="province_city_county">
		  			<el-form-item label="所在地区：">
					    <address-plugin v-on:seleSuccess="seleSuccess" required='false'></address-plugin>
					</el-form-item>
		  		</div>
			  <el-form-item label="法人：">
			    <el-input v-model="legalPerson" placeholder="请输入法人"></el-input>
			  </el-form-item>
			  <el-form-item label="营业执照号：">
			    <el-input v-model="businessLicense" placeholder="请输入营业执照号"></el-input>
			  </el-form-item>

			</el-form>
		</div>
		<div class="table_wrap">
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >

		    <el-table-column prop="clinicName" label="客户名称" width="100"></el-table-column>
		    <el-table-column prop="departmentId" label="事业部"  width="100">
		    	<template slot-scope="scope">
			        {{ scope.row.departmentId == 0 ? "顶级部门" : scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 3 ? "云事业部" :scope.row.departmentId == 4 ? "消化事业部":""}}
			    </template>
		    </el-table-column>
		    <el-table-column prop="customTypeStr" label="客户类型"></el-table-column>
		  	<el-table-column prop="belongsArea" label="所属区域"></el-table-column>
		    <el-table-column prop="legalPerson" label="法人"></el-table-column>
		    <el-table-column prop="bossPhone" label="法人手机号"></el-table-column>
		    <el-table-column prop="businessLicense" label="营业执照号"></el-table-column>
		    <el-table-column prop="username" label="客户联系人"></el-table-column>
		    <el-table-column prop="clinicPhone" label="联系人电话"></el-table-column>
		    <el-table-column prop="name" label="负责人"></el-table-column>
		    <el-table-column prop="mobile" label="负责人手机号"></el-table-column>
		    <el-table-column prop="createPerson" label="创建人"></el-table-column>
		    <el-table-column prop="createDate" label="创建时间"></el-table-column>
		    <el-table-column prop="address" label="操作">
		    	<template slot-scope="scope">
					<div class="operateBtn" @click="view(scope.row.id)">查看</div>
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

	import addressPlugin from 'components/address';
	import elPagination from 'components/el-page';
  	import {getTerCustomData, getCusTypeData, exportInfoData} from 'src/api/headquarter_url/customerManage';

  export default {
    data() {
      return {
      	clinicName: '',//客户名称
        customType: '',//客户类型
      	username: '',//客户联系人
      	name: '',//负责人
      	departmentId: "",//事业部
      	createUser: '',//创建者
      	provinceCode: '',//省区code
      	cityCode: '',//市区code
      	countyCode: '',//县区code

      	legalPerson: '',//法人
      	businessLicense: '',//营业执照

      	customerList: [],//客户列表
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
    	let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
		this.initData(datalist)
	},
	components:{
        elPagination,
        addressPlugin
    },
    methods: {
    	//页面初始化
	    initData(datalist){
			//获取table数据列表和分页信息
	        getTerCustomData(datalist).then(res => {
	        	const datas=res.data.data;
	        	if(res.data.code==1){
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
				,clinicName:this.clinicName
				,customType:this.customType
	      		,username: this.username
	      		,name: this.name
	      		,departmentId: this.departmentId
	      		,createUser:this.createUser
	      		,provinceCode: this.provinceCode//省区code
      			,cityCode: this.cityCode//市区code
      			,countyCode: this.countyCode//县区code

	      		,legalPerson: this.legalPerson
	      		,businessLicense: this.businessLicense

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
					clinicName:this.clinicName
					,customType:this.customType
		      		,username: this.username
		      		,name: this.name
		      		,departmentId: this.departmentId
		      		,createUser:this.createUser
		      		,provinceCode: this.provinceCode//省区code
	      			,cityCode: this.cityCode//市区code
	      			,countyCode: this.countyCode//县区code

		      		,legalPerson: this.legalPerson
		      		,businessLicense: this.businessLicense
				};
				exportInfoData(datalist).then(function(res){
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
    	//查看详情
    	view($id){
    		this.$router.push({path:'/viewterminCustomerZB',query:{id:$id}});
    	},
      //企业地址
		seleSuccess($val){
			this.provinceCode = $val.provinceCode;
			this.cityCode = $val.cityCode;
			this.countyCode = $val.countyCode;
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
			//点击分页
			updataPage : function(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
			number(){　　
	　　　 		this.phone=this.phone.replace(/[^\.\d]/g,'');
	            this.phone=this.phone.replace('.','');
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
