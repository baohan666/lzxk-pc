<!--
	省区 - 回款方式设置
-->

<template>
	<div class="accountManage">
		<div id="">
			<div class="search_wrap">
				<el-radio-group v-model="flag" @change="changeHandler" class="selectRadio">
					<el-radio :label="1">现货现款</el-radio>
    				<el-radio :label="2">先货后款</el-radio>	   		
		  	  	</el-radio-group>
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="地区名称或地区经理名称：">
						<el-input v-model="cityAndName" placeholder="请输入地区名称或地区经理名称"></el-input>
					</el-form-item>
					<el-form-item label="县区名称或县区经理名称：">
						<el-input v-model="countyAndName" placeholder="请输入县区名称或县区经理名称"></el-input>
					</el-form-item>		
				<button @click="searchQuery" class='el-button-red'>查询</button>
				
				</el-form>
			</div>
		<div class='table_wrap'>
				<button @click="paymentUpdate" class='el-button-red'>更改回款方式</button>
				<el-row class="table_merge">
				
				  <el-col :span="20" >
				  	<el-table :data="tableData" ref="tableData" class="table-left" border @selection-change="handleSelectionChange">
						<el-table-column type="selection"></el-table-column>				    					    
						<el-table-column prop="areaName" label="区域名称" ></el-table-column>
						<el-table-column prop="name" label="区域经理名字" ></el-table-column>				
					</el-table>
				  </el-col>
				  <!--<el-col :span="12">
				  	<el-table :data="tableDataRight" ref="tableDataRight" class="table-right" border @selection-change="handleSelectionChange">
						<el-table-column type="selection"></el-table-column>				    					    
						<el-table-column prop="areaName" label="区域名称" ></el-table-column>
						<el-table-column prop="name" label="区域经理名字"></el-table-column>
					</el-table>
				  </el-col>-->
				</el-row>
			</div>

			<el-dialog title="提示" :visible.sync="dialogVisible" :append-to-body='true' width="30%" >
				<div class="dailogCon" style="text-align: center;">
					<span>{{dailogCon}}</span>					
				</div>				
				<span slot="footer">
					<span @click="dialogVisible = false" class="dialogBtnTrue">确定</span>
				</span>
			</el-dialog>

		</div>
		<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>

	</div>

</template>

<script>
	import {
		getPaymentList,//回款方式设置
		setPaymentUpdate,//更改回款方式
	
	} from 'src/api/province_url/orderManage';
	import datepicker from 'components/data-plugin'
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				cityAndName:'',//省区经理或者省区的名字
				countyAndName:'',//县区经理或者县区的名
				totalRecords: 0, //总条数
					
				totalPageCnt: 0 //总页数
					,
				pagin_show: true,
				pageIndex: 1,
				pageSize: 10,				
				flag: 1  //1现款现货  (默认展示)2先货后款
					,
				areaName:'', //经理所在地区名
				name: '' //经理的名字
					,
				userIds:'' // 选择的id   多选逗号分割
					,
				multipleSelect:[],
				userIds:[],
				tableData:[],
				tableDataLeft: [],
				tableDataRight: [],
				dailogConShow :false,
				ordersFrom: '' // 订单类型
					,
				dailogTitleType:'提示',
				dailogCon:'请您先选择地区或者县区经理',
				dialogVisible:false,
			}
		},
		
		mounted: function() {

			this.getData(this.pageIndex, this.pageSize, this.flag)
		},
		components: {
			departComponet,
			datepicker,
			elPagination
		},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		methods: {
			getData(pageIndex, pageSize, flag,cityAndName, countyAndName) {
				getPaymentList({
					'pageSize': pageSize //每页大小
						,
					'pageIndex': pageIndex
						,
					'flag': flag 
						,
					'cityAndName': cityAndName //订单编号
						,
					'countyAndName': countyAndName //提交人
						,
				
				}).then(res => {
					console.log(res)
					const datas = res.data.data;
					if(Object.keys(datas.dataList).length > 0) {
						this.totalRecords = datas.totalRecords;
						this.totalPageCnt = datas.totalPageCnt;
						this.pageIndex = datas.pageIndex;
						this.tableData = datas.dataList;
						this.pagin_show = true;
					} else {
						this.tableData = [];					
						this.pagin_show = false;
					}

				})
			},
			
//			relRangeList(val) {
//				let arr = val;			
//			    let t = arr.length;
//			    this.tableDataLeft = arr.slice(0,Math.round(t/2));
//				this.tableDataRight = arr.slice(Math.round(t/2), t);
//				if(!this.$props.isEdit){
//					this.$nextTick(()=>{//下次 DOM 更新循环结束之后执行延迟回调
//		 				this.$refs.tableDataLeft.toggleRowSelection(this.tableDataLeft.find(d => d.flag == 1),true);//默认选中  
//		 				this.$refs.tableDataRight.toggleRowSelection(this.tableDataRight.find(d => d.flag == 1),true);//默认选中  
//				    	
//					})
//				}
				
//	        },
			
			//查询
			searchQuery() {	
				this.getData(1, this.pageSize, this.flag, this.cityAndName, this.countyAndName)
			},
			//切换
			changeHandler(val){
//  			this.tableData = [];
    			this.getData(this.pageIndex, this.pageSize, this.flag, this.cityAndName, this.countyAndName)
    		},
			//点击分页
			updataPage(val) {
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				this.getData(this.pageIndex, this.pageSize, this.flag, this.cityAndName, this.countyAndName)
			},
			// 分页导航
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getData(this.pageIndex, this.pageSize, this.flag, this.cityAndName, this.countyAndName)
			},
			
			
			handleSelectionChange(val) {				
		        this.multipleSelect = val;
		 	},
			paymentUpdate(){
				 this.multipleSelect.forEach((item, index, arr) => {
	    			this.userIds.push(item.userId);	    			
	    	})
				if(this.userIds.length == 0){
					this.dialogVisible = true;
					return false
				}	
				setPaymentUpdate({
					'userIds':this.userIds.toString(),
					'type':this.flag == 1? 2 : 1
				}).then(res=>{
					this.reload();
					this.$message.success('更改汇款方式成功');
				})
				
				
			}
		

		}
	}
</script>

<style lang='scss' scoped="scoped">
	
	

			.selectRadio{
		margin-bottom:20px;
	}
		.table_merge{
		height:420px;
		padding:20px 30px;
		overflow: auto;
		border-top:1px solid #e3e8f9;
		.el-table--border{
			border:none;
		}
		.el-table--border::after, .el-table--group::after, .el-table::before{
			background:none;
		}
		.table-left {
			border-left:1px solid #eae2e0;
			
		}
		.table-right {
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
	
	.dailogCon{
		padding: 50px;	
		font-size: 14px;
		div{
			display: flex;
			justify-content:space-between;
			span{
				width:200px;
				text-align: right;
				line-height: 200px;
			}
			.el-textarea{
				padding: 15px;
				.el-textarea__inner{
					width:80%;
					height: 150px;
				}
			}
		}
		
		span{
			line-height: 10px;
			input{
				border: 1px solid  #1f5dbc;
			}
		}
		
	}
	.dialogBtnTrue{
	
		padding: 6px 25px;
		background: #e02222;
		border-radius: 2px;
		color: white;
		
	}

	
	
	
</style>
