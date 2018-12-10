<template>
	<div class="businessCompanyManage">
		<div class="search_wrap">
			<div>
			  <div class="div-inline el-button-red" @click = "toCreatBusiCpy()">创建商业公司</div>
			</div>
		   <el-form :inline="true" class="demo-form-inline">
			  <el-form-item label="商业公司名称：">
			    <el-input v-model="company" placeholder="请输入商业公司名称"></el-input>
			  </el-form-item>
			  <el-form-item label="客户编码：">
			    <el-input v-model="customerCode" placeholder="请输入客户编码"></el-input>
			  </el-form-item>
			  <div class="div-inline">
			  	<div class="div-inline">创建时间：</div>
			  	<el-date-picker
			      v-model="startDate"
			      type="date"
			      placeholder="提交开始时间"
			      :picker-options="pickerOptionStar">

			    </el-date-picker>
			    <div class="div-inline">-</div>
			    <el-date-picker
			      v-model="endDate"
			      type="date"
			      placeholder="提交结束时间"
			      :picker-options="pickerOptionEnd">
			    </el-date-picker>
			  </div>
        <!--暂时隐藏-->
			  <!--<div class="div-inline select-more" @click = "spreadCon()">-->
			  	<!--更多筛选 <i class="el-icon-arrow-down"></i>-->
			  <!--</div>-->
			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	  <div class="div-inline el-button-red" @click = 'exportBaseInfoData'>导出基本信息</div>
		  	  <div class="div-inline el-button-red" @click = 'exportAptitudeData'>导出资质信息</div>
		  	</el-form>
		  	<el-form ref="form" :inline="true" class="demo-form-inline slideDown">
		  		<div class="province_city_county">
		  			<el-form-item label="所在地区：">
					    <address-plugin v-on:seleSuccess="seleSuccess" required='false'></address-plugin>
					</el-form-item>
		  		</div>
			  <el-form-item label="纳税人登记号：">
			    <el-input v-model="taxpayerCode" placeholder="请输入纳税人登记号"></el-input>
			  </el-form-item>
			  <el-form-item label="创建人：">
			    <el-input v-model="username" placeholder="请输入创建人"></el-input>
			  </el-form-item>
			  <el-form-item label="法人：">
			    <el-input v-model="bossName" placeholder="请输入法人"></el-input>
			  </el-form-item>
			  <el-form-item label="企业地址：">
			    <el-input v-model="companyAddress" placeholder="请输入企业地址"></el-input>
			  </el-form-item>
			  <el-form-item label="客户基本分类：">
				<el-select v-model="customerType" id='questionType' placeholder="请选择">
		      		<el-option v-for="(menu,index) in customerList" :label="menu.name" :value="menu.value" :key="index"></el-option>
		    	</el-select>
			  </el-form-item>
			  <el-form-item label="电话：">
			    <el-input v-model.number="phone" placeholder="请输入电话" @keyup.native="number(phone)"></el-input>
			  </el-form-item>
			</el-form>
		</div>
		<div class="table_wrap">
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >

		    <el-table-column prop="company" label="商业公司名称"></el-table-column>
		    <el-table-column prop="customerCode" label="客户编码"  width="130"></el-table-column>
		    <el-table-column prop="addressData" label="所在地区"></el-table-column>
		  	<el-table-column prop="companyAddress" label="企业地址"></el-table-column>
		    <el-table-column prop="taxpayerCode" label="纳税人登记号" width="150"></el-table-column>
		    <el-table-column prop="username" label="创建人" width="110"></el-table-column>
		    <el-table-column prop="createDate" label="创建时间" width="160"></el-table-column>
		    <el-table-column prop="address" label="操作" width="120">
		    	<template slot-scope="scope">
					<div class="operateBtn" @click="view(scope.row.id)">查看</div>
			        	<el-dropdown trigger="click">
					      <div class="operateBtn" @click="moreOperate()">更多</div>
					      <el-dropdown-menu slot="dropdown">
					        <el-dropdown-item @click.native = "edit(scope.row.id)">编辑</el-dropdown-item>
					        <el-dropdown-item @click.native = "allot(scope.row.id)">分配</el-dropdown-item>
					        <el-dropdown-item @click.native = "cancelAllot(scope.row.id)">取消分配</el-dropdown-item>
					        <el-dropdown-item @click.native = "addressBook(scope.row.id)">地址簿</el-dropdown-item>
					      </el-dropdown-menu>
					    </el-dropdown>
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
    <!--分配人员 begin-->
	 	<el-dialog class= 'dialogAllot' title="分配人员" :visible.sync="dialogAllotVisible" :append-to-body='true'>
			<div class= 'dialog_body_content'>
				省区经理：
				<el-select v-model="allotList.showlist" filterable remote reserve-keyword placeholder="请输入并选择省区经理"
					  			@change="((item)=>{currentSel(item)})"
					  			:remote-method="((item)=>{remoteMethod(item)})"
					  			:loading="loading" style="width:80%;">
							    <el-option
							      v-for="(menu,index) in provinNamList"
							      :key="index"
                    :label="menu.name+'    '+menu.deptName+'    '+menu.provinceName"
							      :value="menu">
							    </el-option>
  							</el-select>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogAllotVisible = false">取消</span>
				<span class="dialog-sure-btn dialoperateBtn" @click="allot_sure">确定</span>
			</div>
		</el-dialog>
    <!--分配人员 end-->
    <!--取消分配人员 begin-->
		<el-dialog class= 'dialogAllot' title="取消分配人员" :visible.sync="dialogCancelAllotVisible" :append-to-body='true'>
			<div class= 'dialog_body_content'>
				<el-table :data="dialog_provincList" class="table-left" border @selection-change="handleSelectionChange">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="deptName" label="事业部" ></el-table-column>
					<el-table-column prop="provinceName" label="所属省区"></el-table-column>
					<el-table-column prop="name" label="省区经理"></el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogCancelAllotVisible = false">取消</span>
				<span class="dialog-sure-btn dialoperateBtn" @click="cancelAllot_sure">确定</span>
			</div>
		</el-dialog>
    <!--取消分配人员 end-->
    <!--地址簿 begin-->
		<el-dialog class= 'dialogAllot' title="地址簿" :visible.sync="dialogAddBookVisible" :append-to-body='true' width="60%">
			<div class= 'dialog_body_content'>
				<el-table :data="dialog_addBooklist" class="table-left" border>
					<el-table-column prop="username" label="省区经理"></el-table-column>
					<el-table-column prop="addressData" label="所属区域">
						<template slot-scope="scope">
							<div v-if="addrBookStatus[scope.$index]!='edit'">
								<address-plugin :getProvince="scope.row.provinceName" :getCounty="scope.row.countyName" :getCity="scope.row.cityName" @seleSuccess="seleSuccess" required='false'></address-plugin>
							</div>
			    			<div v-if="addrBookStatus[scope.$index]=='edit'">
								 {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.countyName}}
			    			</div>
						</template>
					</el-table-column>
					<el-table-column prop="addressData" label="出库单地址">
						<template slot-scope="scope">
							<el-input  v-if="addrBookStatus[scope.$index]!='edit'" v-model="scope.row.addressData" placeholder="请输入出库单地址">{{scope.row.addressData}}</el-input>
			    			<div v-else="addrBookStatus[scope.$index]=='edit'">{{scope.row.addressData}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="收货人">
						<template slot-scope="scope">
							<el-input  v-if="addrBookStatus[scope.$index]!='edit'" v-model="scope.row.name" placeholder="请输入收货人">{{scope.row.name}}</el-input>
							<div v-else="addrBookStatus[scope.$index]=='edit'">{{scope.row.name}}</div>
			    		</template>
					</el-table-column>
					<el-table-column prop="phone" label="收货电话">
						<template slot-scope="scope">
							<el-input v-if="addrBookStatus[scope.$index]!='edit'" v-model="scope.row.phone" placeholder="请输入收货电话" @keyup.native="number">{{scope.row.phone}}</el-input>
							<div v-else="addrBookStatus[scope.$index]=='edit'">{{scope.row.phone}}</div>
			    		</template>
					</el-table-column>
					<el-table-column prop="stockOutSign" label="赠品打印标识">
						<template slot-scope="scope">
							<el-select v-model="scope.row.stockOutSign" placeholder="请选择" v-if="addrBookStatus[scope.$index]!='edit'">
						    <el-option
						      v-for="(item,key,index) in dialogAwardSignlist"
						      :key="index"
						      :label="item"
						      :value="item">
						    </el-option>
						  </el-select>
						  <div v-else="addrBookStatus[scope.$index]=='edit'">{{scope.row.stockOutSign}}</div>
			    		</template>
					</el-table-column>
					<el-table-column prop="name" label="操作">
						<template slot-scope="scope">
							<div v-if="addrBookStatus[scope.$index]=='edit'" class="operateBtn" @click="addrBookEdit(scope.$index, scope.row)">编辑</div>
							<div v-else="addrBookStatus[scope.$index]!='edit'" class="operateBtn" @click="addrBookSave(scope.$index, scope.row)">保存</div>

							<div v-if="addrBookStatus[scope.$index]=='edit'" class="operateBtn" @click="addrBookDel(scope.$index, scope.row)">删除</div>
							<div v-else="addrBookStatus[scope.$index]!='edit'" class="operateBtn" @click="addrBookCancel(scope.$index, scope.row)">取消</div>
			    		</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
    <!--地址簿 end-->
	</div>

</template>
<script>
	import addressPlugin from 'components/address';
	import elPagination from 'components/el-page';
  	import {getBusiCmpyData, exportBaseInfo, exportAptitude, getProvinNamData, saveProvinNamData,
  		getCancelData, cancelProvinNamData, getAddressBookData, saveAddrBookData, delAddrBookData} from 'src/api/headquarter_url/customerManage';

  export default {
    data() {
      return {
      	startDate: '',//开始日期
        endDate: '',//结束日期
      	company: '',//商业公司名称
      	customerCode: '',//客户编码
      	taxpayerCode: "",//纳税人登记号
      	bossName: '',//法人姓名
      	username: '',//创建人
      	phone: '',//电话
      	companyAddress: '',//企业地址
      	provinceCode: '',//省区code
      	cityCode: '',//市区code
      	countyCode: '',//县区code
        addressProvinceCode: '',//地址簿：省区code
        addressCityCode: '',//地址簿：市区code
        addressCountyCode: '',//地址簿：县区code
        addressProvinceName: '',//地址簿：省区
        addressCityName: '',//地址簿：市区
        addressCountyName: '',//地址簿：县区

      	customerType: '',//客户类型
      	customerList: '',//客户类型列表

      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,

      	tableData:[],//table列表
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
        dialogAllotVisible:false,//分配弹窗
        loading: false,
        allotList:{
        	showlist:'',//省区经理-省区名--事业部的拼接
        	userId: '',//省区经理ID
			billId: ''//基本信息id
        },
        provinNamList:[],//可供选择的省区经理名字列表

        dialogCancelAllotVisible:false,//取消分配弹窗
      	dialog_provincList:[],
      	cancelAllot_ids: '',

      	dialogAddBookVisible:false,//地址簿弹窗
      	dialog_addBooklist: [],//地址簿弹窗
      	dialogAwardSignlist:{1:'模板1',2:'模板4',3:'模板9+模板12',4:'模板13'},//赠品打印标识
      	stockOutSign:['',''],
      	addrBookStatus: []
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
	        getBusiCmpyData(datalist).then(res => {
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
    		})
    	},
    	//获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,startDate:this.startDate
          ,endDate:this.endDate
          ,company: this.company
          ,customerCode: this.customerCode
          ,taxpayerCode: this.taxpayerCode//纳税人登记号
          ,bossName: this.bossName
          ,username: this.username
          ,phone: this.phone
          ,customerType: this.customerType
          ,companyAddress:this.companyAddress//企业地址
          ,provinceCode: this.provinceCode//省区code
          ,cityCode: this.cityCode//市区code
          ,countyCode: this.countyCode//县区code
        };
        return datalist;
      },

      //企业地址
      seleSuccess($val){
        console.log("企业地址$val:",$val)
        this.addressProvinceCode = $val.provinceCode;
        this.addressCityCode = $val.cityCode;
        this.addressCountyCode = $val.countyCode;
        this.addressProvinceName = $val.provinceName;
        this.addressCityName = $val.cityName;
        this.addressCountyName = $val.countyName;
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
					,company: this.company//商业公司名称
          ,customerCode: this.customerCode//客户编码
          ,customerType: this.customerType//客户类型
          ,taxpayerCode: this.taxpayerCode//纳税人登记号
          ,bossName: this.bossName
          ,username: this.username
          ,phone: this.phone
          ,companyAddress:this.companyAddress//企业地址
          ,provinceCode: this.provinceCode//省区code
          ,cityCode: this.cityCode//市区code
          ,countyCode: this.countyCode//县区code
				};
				exportBaseInfo(datalist).then(function(res){
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

			//导出资质信息
			exportAptitudeData(){
				let datalist = {
					startDate:this.startDate
					,endDate:this.endDate
					,company: this.company//商业公司名称
          ,customerCode: this.customerCode//客户编码
          ,customerType: this.customerType//客户类型
          ,taxpayerCode: this.taxpayerCode//纳税人登记号
          ,bossName: this.bossName
          ,username: this.username
          ,phone: this.phone
          ,companyAddress:this.companyAddress//企业地址
          ,provinceCode: this.provinceCode//省区code
          ,cityCode: this.cityCode//市区code
          ,countyCode: this.countyCode//县区code
				};
				exportAptitude(datalist).then(function(res){
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

			//创建商业公司
			toCreatBusiCpy(){
				this.$router.push({path:'/creatBusiCompanyZB'});
			},

			//查看
			view($id){
				this.$router.push({path:'/viewBusiCompanyZB',query:{id:$id}});
			},
			//更多
			moreOperate: function(){

			},

			//编辑-----
			edit($id){
				this.$router.push({path:'/editBusCompanyZB',query:{id:$id}});
			},

			//分配
			allot($id){
				console.log($id);
        this.allotList.showlist='';
				this.billId = $id;
				this.dialogAllotVisible = true;
				this.provinNamList=[];
			},

			//实时获取省区经理列表
			remoteMethod(query) {
				if (query !== '') {
          this.loading = true;
          getProvinNamData({provinceManager:query}).then(res => {
            this.loading = false;
            if(res.data.data.length>0){//有数据
              console.log("实时获取省区经理列表res.data.data:",res.data.data)
              this.provinNamList = res.data.data;
            }else{//无数据
               this.provinNamList = [];
            }
          })
        } else {
          this.provinNamList = [];
        }
			},
			//选择省区
			currentSel($val){
			  console.log("选择省区")
				this.allotList.showlist = $val.name+"    "+$val.deptName+"    "+$val.provinceName;
				this.userId = $val.userId;
			},
			//分配确定按钮
			allot_sure(){
        saveProvinNamData({userId : this.userId, billId : this.billId}).then(res => {
          this.$message.success(res.data.msg);
          this.dialogAllotVisible = false;
        })
      },

			//取消分配
			cancelAllot($id){
        this.dialog_provincList=[];//清空上次弹窗内容
        this.cancelAllot_ids='';//清空上次复选框选中内容
				this.dialogCancelAllotVisible = true;
				getCancelData({billId:$id}).then(res => {
					this.billId = $id
					this.dialog_provincList= res.data.data;
				})
			},
			//取消分配确定
			cancelAllot_sure(){
			  if(this.dialog_provincList!=''||this.dialog_provincList.length!=0){//如果取消分配弹窗内有数据
          if(this.cancelAllot_ids==''){
            this.$message.error('请点击勾选需要取消分配的人员');
            return false;
          }
          cancelProvinNamData({userIds : this.cancelAllot_ids, billId : this.billId}).then( res => {
            this.$message.success(res.data.msg);
            this.dialogCancelAllotVisible = false;
            this.cancelAllot_ids='';//清空上次复选框选中内容
          })
        }else{
          this.dialogCancelAllotVisible = false;
          this.cancelAllot_ids='';//清空上次复选框选中内容
        }
			},
			//点击取消分配弹窗中的复选框
			handleSelectionChange($val) {
        let userIdArr=[];
        $val.forEach((item,index) => {
          userIdArr.push(item.userId);
        })
        this.cancelAllot_ids=userIdArr.join(',');
      },
			//地址簿
			addressBook($id){
				this.dialogAddBookVisible = true;
				this.billId = $id;
				getAddressBookData({billId : $id}).then( res =>{
					let datalist = res.data.data;
					this.addrBookStatus = [];
					datalist.forEach((item,index,arr) => {
						switch(item.stockOutSign){
							case 1 :  datalist[index].stockOutSign ="模板1"; break;
							case 2 :  datalist[index].stockOutSign ="模板4"; break;
							case 3 :  datalist[index].stockOutSign ="模板9+模板12"; break;
							case 4 :  datalist[index].stockOutSign ="模板13"; break;
						}
            this.addrBookStatus.push('edit');
					});
					this.dialog_addBooklist = res.data.data;
				})

			},
			//地址簿编辑按钮
			addrBookEdit($index,row){
			  console.log("地址簿编辑row：",row)
        this.addressProvinceCode = row.provinceCode;
        this.addressCityCode = row.cityCode;
        this.addressCountyCode = row.countyCode;
        this.addressProvinceName = row.provinceName;
        this.addressCityName = row.cityName;
        this.addressCountyName = row.countyName;
				this.$set(this.addrBookStatus,$index,"sace");
			},
			//地址簿保存按钮
			addrBookSave($index,row){
			  console.log("校验row.stockOutSign：",row.stockOutSign)
			  console.log("校验row.stockOutSign：",row.stockOutSign=='模板1')
        if(this.addressProvinceCode == ''||this.addressCityCode==''||this.addressCountyCode==''||this.addressProvinceCode == null||this.addressCityCode==null||this.addressCountyCode==null){
          this.$message.success('请输入所属区域');
          return false;
        }else if(row.addressData == ''||row.addressData==null){
					this.$message.success('请输入出库单地址');
					return false;
				}else if(row.name== ''){
					this.$message.success('请输入收货人');
					return false;
				}else if(row.phone== ''){
					this.$message.success('请输入收货电话');
					return false;
				}else if(row.stockOutSign==''||row.stockOutSign==null){
					this.$message.success('请选择赠品打印标识');
					return false;
				}
        console.log("地址簿保存按钮row:",row)
				this.$set(this.addrBookStatus,$index,"edit");//回到带编辑按钮的那个样式
				let datalist = {
          addressData : row.addressData ,//出库单地址
					name:row.name ,//收货人
					phone:row.phone ,//收货人电话
					stockOutSign:row.stockOutSign=='模板1'?1:row.stockOutSign=='模板4'?2:row.stockOutSign=='模板9+模板12'?3:row.stockOutSign=='模板13'?4:'',//打印标识
					billId:row.billId ,//商业公司id
					userId:row.userId,//用户id
          provinceCode:this.addressProvinceCode,
          cityCode:this.addressCityCode,
          countyCode:this.addressCountyCode,
          provinceName:this.addressProvinceName,
          cityName:this.addressCityName,
          countyName:this.addressCountyName,
				}
				saveAddrBookData(datalist).then(res =>{
				  //所在地区和模板需要赋值回显
          row.provinceCode=this.addressProvinceCode;
          row.cityCode=this.addressCityCode;
          row.countyCode=this.addressCountyCode;
          row.provinceName=this.addressProvinceName;
          row.cityName=this.addressCityName;
          row.countyName=this.addressCountyName;
//          row.stockOutSign=row.stockOutSign==1?'模板1':row.stockOutSign==2?'模板4':row.stockOutSign==3?'模板9+模板12':row.stockOutSign==4?'模板13':'';
					this.$message.success('保存成功');
				})
			},
			//地址簿删除按钮
			addrBookDel($index,row){
				let datalist = {
					billId:row.billId ,//商业公司id
					userId:row.userId//用户id
				}
				delAddrBookData(datalist).then(res =>{
					this.dialog_addBooklist.splice($index,1);
					this.$message.success(res.data.msg);
				})

			},

			//地址簿取消按钮
			addrBookCancel($index,row){
        this.$set(this.addrBookStatus,$index,"edit");//取消编辑操作，回到初始状态（带编辑按钮的那个状态）
//				this.dialog_addBooklist.splice($index , 1 ,{provinceCode:'',provinceName:'',addressData:'', name: '', phone: '', stockOutSign: '', username: row.username});
			},


			//点击分页
			updataPage : function(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
			number(phone){　　
	　　　 		phone=phone.replace(/[^\.\d]/g,'');
	            phone=phone.replace('.','');
	　　		}

    }
  }
</script>
<style lang='scss'>
  .businessCompanyManage {
    .search_wrap {
      .el-form-item__content {
        width: auto !important;
      }
    }
  }
  //分配弹窗
  .dialogAllot .el-dialog__body{
    padding:20px 30px !important;
  }
</style>
<style lang='scss' scoped="scoped">
  .businessCompanyManage{
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
  }
</style>
