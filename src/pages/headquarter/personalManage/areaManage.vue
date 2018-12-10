<!--
	总部 - 管理行政区
-->
<template>
	<div class="accountManage">
		<div id="" v-show="!handleEditShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="姓名:">
						<el-input v-model="name" placeholder="请输入姓名 " class="handle-input">
						</el-input>
					</el-form-item>
					<div class="div-inline el-form-item">
						<depart-componet departMsg="事业部：" @selectSuccess="selectSuccess"></depart-componet>
					</div>
					<el-form-item label="关联状态:" class="handle-select">
						<el-select v-model="selStatus" placeholder="全部状态">
							<el-option label="全部" value=''></el-option>
							<el-option label="已关联" value='1'></el-option>
							<el-option label="未关联" value='2'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属省区:">
						<el-input v-model="provinceName" placeholder="请输入省区 " class="handle-input">
						</el-input>
					</el-form-item>					
					<el-form-item label="职级:" class="handle-select">
						<el-select v-model="position" placeholder="请选择职级">
							<el-option label="全部" value=""></el-option>
							<el-option label="县区经理" value="3"></el-option>
							<el-option label="地区经理" value="4"></el-option>
							<el-option label="省区经理" value="5"></el-option>
						</el-select>
					</el-form-item>					
					<button @click="search" class='el-button-red'>查询</button>
					<button @click="checkOut" class='el-button-red'>导出</button>
				</el-form>				
			</div>
			<div class='table_wrap'>
				<el-table :data="tableData" border>
					<el-table-column prop="departmentName" label="事业部"  align='center'>
					</el-table-column>
					<el-table-column prop="provinceName" label="所属省区"  align='center'>
					</el-table-column>
					<el-table-column prop="name" label="姓名"  align='center'>
					</el-table-column>
					<el-table-column prop="position" label="职级" align='center'>
					</el-table-column>
					<el-table-column prop="treeName" label="部门"  align='center'>
					</el-table-column>					
					<el-table-column prop="mobile" label="手机号"  align='center'>
					</el-table-column>
					<el-table-column prop="status" label="人员状态" align='center'>
					</el-table-column>
					<el-table-column prop="relevanceStatusStr" label="关联状态" align='center' >
					</el-table-column>
					<el-table-column prop="date" label="操作" align='center'>
						<template slot-scope="scope">
							<div class="operateBtn edit" v-if='scope.row.relevanceStatusStr == "已关联"' @click="handleRevision(scope.$index, scope.row ),departmentName=scope.row.departmentName,provinceName=scope.row.provinceName,name=scope.row.name	">修改</div>
							<div class="operateBtn" v-if='scope.row.relevanceStatusStr == "已关联"' @click="handleCheck(scope.$index, scope.row ),departmentName=scope.row.departmentName,provinceName=scope.row.provinceName,name=scope.row.name">查看</div>
							<div class="operateBtn" v-if='scope.row.relevanceStatusStr != "已关联"' @click="handleRelevance(scope.$index, scope.row),departmentName=scope.row.departmentName,provinceName=scope.row.provinceName,name=scope.row.name">关联</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
		</div>

		<!-- 编辑弹出框 -->
		<div v-show="handleEditShow" class="handleEditShow">
			<div>
				<button @click="backBtn" class='el-button-red'>返回</button>
			</div>
			<div class="adminDetailBox">
				<div class="adminDetailTitle">{{handleTitle}}- <span>{{departmentName}}{{provinceName}}{{name}}</span> </div>
			
				<!--关联时-->
				<el-tree 	v-show='treeShow && !revisionTreeShow'										
							ref="tree"
							:data="dataTree" 
							:load="loadNode" 
							:props="defaultProps" 
							show-checkbox 
							highlight-current
							lazy 
							node-key="areaCode" 	
			
				></el-tree>	
				<!--查看时-->
				<el-tree v-show='!treeShow && !revisionTreeShow' ref="treeCheck" :data="dataTreeCheck" node-key="areaCode" :props="props" highlight-current>
				</el-tree>
				<!--修改时-->
				<el-tree 	v-show='revisionTreeShow'										
							ref="datarevisionTree"
							:data="datarevisionTree" 
							:props="revisionProps" 
							show-checkbox 
							node-key="areaCode" 
							highlight-current
							:default-checked-keys="resourceCheckedKey"
				></el-tree>					
			</div>			
			<div class="adminDetailBtn" slot="footer" v-show="!disabledShow">
				<button v-show="!revisionTreeShow" @click="saveEditbtn()" class='el-button-red'>确定</button>
				<button v-show="revisionTreeShow" @click="upDataEditbtn()" class='el-button-red'>确定</button>
				<button @click="handleEditShow = false" class='el-button-red'>取消</button>
			</div>

		</div>

	</div>

</template>

<script>
	import addressPlugin from 'components/address';
	import elPagination from 'components/el-page';
	import departComponet from 'src/headComponent/departComponent'
	import {
		getList,
		getAllProvince,
		saveArea,
		checkArea,
		updateArea,
		outputSysDictArea//导出
	} from 'src/api/headquarter_url/areaManage.js';

	export default {
		data() {
			return {
				loading: true, //
				dataTree: [],//创建角色树
				dataTreeCheck:[],//查看
				datarevisionTree:[],//修改树
				revisionProps:{
					label: 'areaName',
					children: 'childArea',
					isLeaf: 'leaf'
				},
				
				defaultProps: {
					label: 'areaName',
					isLeaf: 'leaf'
				},
				props: {
	
					children: 'childArea',
					label: 'areaName'
				},
				departmentName:'',				
				treeShow:true,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				pageIndex: 1,
				pageSize: 10,
				totalRecords: 0, //总条数
				totalPageCnt: 0,	//总页数
				pagin_show: true,
				name: '', //姓名 搜索
				selStatus: '', //关联状态 搜索
				relevanceVisible: false,
				position: '',
				provinceName: '',
				disabledShow: false,
				handleEditShow: false, 
				revisionTreeShow:false,
				tableData: [],
				handleTitle: '关联行政区', // 职级显示不同
				userId: '', //人员id
				getDeptOption: [],
				departmentId: '',
			
			}
		},
		mounted: function() {
			this.getData(this.pageIndex, this.pageSize)
		},
		components: {
			departComponet,
			addressPlugin,
			elPagination
		},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		methods: {
			loadNode(node, resolve) {		
				if(node.level === 1) {
					//点击加载树的下一级调用
					getAllProvince({
						'areaLevel':node.level+1,
						'parentId':node.key,
						'userId':this.userId
					}).then(res => {
						if(this.handleTitle == '省区经理关联行政区'){
							res.data.data.forEach(item => {
								item.leaf = true;
							})
						}
						if(res.data.code == 1) {
							setTimeout(() => {
								resolve(res.data.data);
							}, 200); //加载下级数据!	
						}
					})
				}
				if(node.level === 2) {
					getAllProvince({
						'areaLevel':node.level+1,
						'parentId':node.key,
						'userId':this.userId
					}).then(res => {
						res.data.data.forEach(item => {
								item.leaf = true;
						})
						if(res.data.code == 1) {
							setTimeout(() => {
								resolve(res.data.data);
							}, 200); //加载下级数据!	
						}

					})
				}			
			},
			getData(pageIndex, pageSize, relevanceStatus, name, provinceName, position, departmentId) {
				getList({
					'pageSize': pageSize, //每页大小
					'pageIndex': pageIndex,
					'relevanceStatus': relevanceStatus, //1 关联 2 未关联
					'name': name,	//
					'provinceName': provinceName, //所属省区
					'position': position, //3 县区经理 4:地区经理 4 省区经理 10 省办人员
					'departmentId': departmentId //事业部id
				}).then(res => {
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
			//点击分页
			updataPage(val){
				this.pageSize = val.pageSize;
				this.pageIndex = val.pageIndex;			
				this.getData(this.pageIndex, this.pageSize, this.selStatus, this.name,this.provinceName, this.position, this.departmentId)
			},
			//点击事业部
			selectSuccess(val) {
				this.departmentId = val;
//				console.log(this.departmentId);
			},
			//关联
			handleRelevance(index, row) {
				this.treeShow =true;
					if(row.positionId == 3) {
					this.handleTitle = '县区经理关联行政区';
					}
					else if(row.positionId == 4) {
					this.handleTitle = '地区经理关联行政区';
					}
					else if(row.positionId == 5) {
					this.handleTitle = '省区经理关联行政区';
					}
					this.userId = row.userId;
					getAllProvince({
						userId:this.userId
					}).then(res => {
						const datas = res.data.data					
						this.dataTree = datas;
					})
				this.revisionTreeShow = false;
				this.handleEditShow = true;
				this.disabledShow = false;
			},
			
			//列表查看按钮
			handleCheck(index, row) {
				this.treeShow =false;
				if(row.positionId == 3) {
					this.handleTitle = '县区经理已关联行政区';
				} else if(row.positionId == 4) {
					this.handleTitle = '地区经理已关联行政区';
					
				} else if(row.positionId == 5) {
					this.handleTitle = '省区经理已关联行政区';
				}
				checkArea({userId:row.userId}).then(res=>{					
					this.dataTreeCheck = res.data.data
				})			
				this.treeShow = false;
				this.revisionTreeShow = false;
				this.handleEditShow = true;
				this.disabledShow = true;
			},

			//列表修改按钮
			handleRevision(index, row) {
				console.log(row)
				this.treeShow =true;
					if(row.positionId == 3) {
					this.handleTitle = '县区经理关联行政区';
					}
					else if(row.positionId == 4) {
					this.handleTitle = '地区经理关联行政区';
					}
					else if(row.positionId == 5) {
					this.handleTitle = '省区经理关联行政区';
					}
					this.userId = row.userId;
					updateArea({
						userId:this.userId
					}).then(res => {
						const datas = res.data.data					
						this.datarevisionTree = datas;
						console.log(this.datarevisionTree)
						this.traversalObject(this.datarevisionTree)						
					})				
				this.revisionTreeShow = true;
				this.handleEditShow = true;
				this.disabledShow = false;
			},
			traversalObject(obj){		
			    for (let a in obj) {
			        if(a=="childArea" && this.isArray(obj[a])){				
							for(let item of obj[a]){
								if(item.isChoose == 1 && item.areaLevel == 3 ){
									this.resourceCheckedKey.push(item.areaCode)
								}
								else if(item.isChoose == 1 && this.handleTitle != '县区经理关联行政区') {
									this.resourceCheckedKey.push(item.areaCode)
								}
							}	
							console.log(this.resourceCheckedKey)
					} 
			        if (typeof (obj[a]) == "object") {
			            this.traversalObject(obj[a]); //递归遍历	
			        }
			    }
				
			},
			isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},
			//导出
			checkOut() {
				outputSysDictArea({
					'pageSize': this.pageSize, //每页大小
					'pageIndex': this.pageIndex,
					'relevanceStatus': this.selStatus, //1 关联 2 未关联
					'name': this.name,
					'provinceName': this.provinceName,
					'position': this.position, //3 县区经理 4:地区经理 4 省区经理 10 省办人员
					'departmentId':  this.departmentId //事业部id					
				}).then(res => {
					let fileName = new Date().getTime() + '.xls';
					const blob = new Blob([res.data]);
					const elink = document.createElement('a');
					elink.download = fileName;
					elink.style.display = 'none';
					elink.href = URL.createObjectURL(blob);
					console.log(elink.href);
					document.body.appendChild(elink);
					elink.click();
					URL.revokeObjectURL(elink.href); // 释放URL 对象
					document.body.removeChild(elink);

				})
			},

			//编辑返回按键
			backBtn() {
				this.reload()
			},
			//关联确定按钮
			saveEditbtn() {
				let checkedHalfArr = this.$refs.tree.getHalfCheckedNodes()//获取半选
				let checkedArr = this.$refs.tree.getCheckedNodes()
				let allCheckArr = checkedHalfArr.concat(checkedArr)
				if(allCheckArr.length == 0){
					alert('请选择行政区')
					return false;
				}
				saveArea({
					type:1,
					userId:this.userId,
					areaArrayStr:JSON.stringify(checkedHalfArr.concat(checkedArr)) 
				}).then(res=>{
					this.reload()
					this.$message.success('关联操作成功');
				})
				
			},
			upDataEditbtn() {
				let checkedHalfArr = this.$refs.datarevisionTree.getHalfCheckedNodes()//获取半选
				let checkedArr = this.$refs.datarevisionTree.getCheckedNodes()
				let allCheckArr = checkedHalfArr.concat(checkedArr)
				for(let item of allCheckArr){	
					if(this.isArray(item.childArea) && item.childArea!= null){
						delete item.childArea;
					}					
				}
				if(allCheckArr.length == 0){
					alert('请选择行政区');
					return false;
				}
				saveArea({
					type:2,
					userId:this.userId,
					areaArrayStr:JSON.stringify(allCheckArr)
				}).then(res=>{
					this.reload()
					this.$message.success('修改操作成功');
				})
				
			},
			search() {
				this.getData(1, this.pageSize, this.selStatus, this.name, this.provinceName, this.position, this.departmentId)
			},
			
		}
	}
</script>

<style lang="scss">
	.search_wrap .province_city_county .el-form-item__content {
		width: auto;
	}

	.el-input__inner {
		padding: 0 10px;
	}
</style>

<style lang='scss' scoped="scoped">
	.province_city_county {
		display: inline-block;
	}

	
	.handleEditShow {
		margin-top: 20px;
		.el-tree {
			margin: 10px;
			width: 350px;
			height: 600px;
			font-size: 20px;
			overflow-y: auto !important;
		
		}
	
		.el-input {
			width: 438px;
		}
		.adminDetailBox {
			width: 1000px;
			margin-left: 100px;
			padding: 15px 0;
			display: flex;
			flex-direction: column;
			span{
				font-size: 16px;
			}
			.adminDetailTitle {
				font-size: 18px;
			}
		}
		.adminDetailBtn {
			width: 500px;
			text-align: center;
			
		}
	}
</style>
