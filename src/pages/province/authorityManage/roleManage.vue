<!--
	省区 - 角色管理 
-->

<template>
	<div>
		<div id="" v-show="!handleEditShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">
					<button @click="addRole()" class='el-button-red'>创建角色</button>
					<el-form-item label="账号状态:">
						<el-select v-model="statusAll" placeholder="全部状态">
							<el-option label="全部状态" value=''></el-option>
							<el-option  label="删除" value="0"></el-option>
							<el-option label="正常" value="1"></el-option>
							<el-option  label="禁用" value="2"></el-option>
						</el-select>
					</el-form-item>
					<button @click="search" class='el-button-red'>查询</button>
				</el-form>
			</div>

			<div class="table_wrap">
				<el-table :data="tableData" border>
					<el-table-column label="序号" width='60px' type=index align='center'>
					</el-table-column>
					<el-table-column prop="name" label="名称"  align='center'>
					</el-table-column>
					<el-table-column prop="remark" label="描述"  align='center'>
					</el-table-column>
					<el-table-column prop="createDate" label="创建时间"  align='center'>
					</el-table-column>
					<el-table-column prop="count" label="账号数"  align='center'>
					</el-table-column>
					<el-table-column prop="status" label="状态"  align='center' :formatter="formatterStatus">
					</el-table-column>
					<el-table-column label="操作" align='center'>
						<template slot-scope="scope">
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row)">查看</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleEdit(scope.$index, scope.row)">编辑</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleForOrSta(scope.$index, scope.row)">{{scope.row.status==2?'解禁':'禁用'}}</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleDelete(scope.$index, scope.row)">删除</div>
						</template>
					</el-table-column>

				</el-table>
			</div>
			<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
		</div>

		<!--分页-->

		<el-dialog title='提示' :visible.sync="delVisible" :append-to-body='true' center width="30%">
			<div style="text-align: center;line-height: 100px ;">
				<span>您确定要删除吗？</span>
			</div>
			<span slot="footer" calss='dialog-footer'>
				<button @click="deleteRow" class="el-button-red">确定</button>
			</span>
		</el-dialog>
		<!-- 编辑弹出框 -->	
		<!-- 编辑弹出框 -->		
		<div v-show="handleEditShow" class="handleSeloShow">
			<div>
				<button @click="backBtn" class="el-button-red margin-20">返回</button>
			</div>
			<div class="adminDetailBox">
				<span class="adminDetailTitle">
						基本信息
				</span>
			</div>
			<div class="adminDetailBox">
				<el-form ref="form" :model="form" label-width="80px" style='border:1px solid red,'>
					<el-form-item label="角色名称:">
						<el-input v-show='!handleEditShowStatus' v-model="form.name"></el-input>
						<span class="margin-l-12" v-show='handleEditShowStatus'>{{form.name}}</span>
					</el-form-item>
					<el-form-item label="状态:" v-show='handleEditShowStatus'>						
						<span class="margin-l-12" v-show="form.status == 1">正常</span>
						<span class="margin-l-12" v-show="form.status == 2">禁用</span>
						<span class="margin-l-12" v-show="form.status == 0">删除</span>
					</el-form-item>
					<el-form-item label="角色描述:">
						<textarea v-show='!handleEditShowStatus' v-model="form.remark" type="text" maxlength="100" class="addRoleRemark"></textarea>
						<span class="margin-l-12" v-show='handleEditShowStatus'>{{form.remark}}</span>
					</el-form-item>
					<!--创建时-->
					<el-form-item label="角色权限:" v-show='!handleEditCheckShow'>
							<el-tree 					
							v-loading="loading"
							ref="tree"
							:data="dataTree" 
							:load="loadNode" 
							:props="defaultProps" 
							show-checkbox 
							lazy 
							node-key="id" 
				
						></el-tree>			
					</el-form-item>
					<!--编辑/查看-->
					<el-form-item label="角色权限:" v-show='handleEditCheckShow'>						
						<el-tree ref="treeCheck" :data="dataTreeCheck" node-key="menuId" show-checkbox :props="props" :default-checked-keys="resourceCheckedKey">
						</el-tree>
					</el-form-item>
				</el-form>

			</div>
			<!--v-show="!disabledShow"-->
			<div class="adminDetailBox" slot="footer" v-show='checkBtnHide'>
				<button @click="saveEditRole" class="el-button-red">确定</button>
				<button @click="handleEditShow = false" class="el-button-red">取消</button>
			</div>
			

		</div>
	</div>

</template>

<script>
	import {
		getRoleListData,
		delAccountListData,
		forOrStaAccountInfo,
		selectRoleName,
		getRoleMenuList,
		getNextMenuList,
		insertRole,//创建角色
		checkRole,
		forOrStaRole,
		deleteRole,
		updateRole,//编辑角色
		checkProRoleDetail//查看角色
	} from 'src/api/province_url/authorityManage';
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				checkBtnHide:false,
				handleEditShow: false, //编辑显示隐藏
				handleEditCheckShow:false,
				handleEditShowStatus:false,
				loading: true, //
				dataTree: [],//创建角色树
				dataTreeCheck:[],//查看编辑树
				defaultProps: {
					oId: 'id',
					label: 'name',
					children: 'sub',
				},
				props: {
					children: 'children',
					label: 'menuName'
				},
				nextTree: [],
				subTree: [],
				delStatus: true,
				input: '',
				statusAll: '',
				sel: '',
				totalRecords: 0 //总条数
					,
				totalPageCnt: 0 //总页数
					,
				pagin_show: true,
				pageIndex: 1,
				pageSize: 10,
				departmentList: [],
				tableData: [],
				multipleSelection: [],
				getSelOption: [],
				roleList: [],
				forOrStaMsg: '启用',
				delVisible: false, //删除确认弹框
				forOrStaVisible: false,
				forbiddenBtnShow: false, //禁用解禁
				form: {
					name: '',
					remark: '',
					status: '',
					"oneMenu": []
				},
				updateRoleJson:{
					'id':'',
					'name': '',
					'remark': '',
					"oneMenu":[],
				},
				formJson:{
					'name': '',
					'remark': '',
					"oneMenu":[],
				},
				idDel: '',
				roleId:'',//当前编辑人查看人id
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]，

			}
	},
		mounted: function() {
			this.getData(this.pageIndex, this.pageSize)
		},
		components: {
			elPagination
		},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		methods: {
			getData(pageIndex, pageSize, status) {
				getRoleListData({
					"pageIndex": pageIndex,
					"pageSize": pageSize,
					'status': status
				}).then(res=> {
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
			//状态改变
			formatterStatus(row, column) {			
				switch(row.status) {
					case 0:
						return '删除';
						break;
					case 1:
						return '正常';
						break;
					case 2:
						return '禁用';
						break;
				}
			},					
				//点击分页
			updataPage(val) {
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				this.getData(this.pageIndex, this.pageSize,this.statusAll)
			},
			//创建角色 角色权限
			addRole() {
					this.checkBtnHide = true;
					this.form.name = '',
					this.form.remark = '',
					this.formJson.oneMenu = [],
					this.handleEditShowStatus = false;
					this.handleEditCheckShow =false;
				getRoleMenuList().then(res=> {				
						this.dataTree = res.data.data.menuList;
						this.loading = false;					
				
				})
				this.handleEditShow = true;
			},
			
			
			//返回编辑
			backBtn() {
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
				this.handleEditShow = false;
			},
			//角色管理编辑
			handleEdit(index, row) {
				this.dataTreeCheck = [];
				this.checkBtnHide = true;
				this.roleId = row.id;
				this.form = {
					name: row.name,
					remark: row.remark,
				}				
//				this.handleEditShowStatus = false;
				checkProRoleDetail({
					'id':row.id
				}).then(res=>{
						console.log(res)
					this.dataTreeCheck = res.data.data.permissionList;
					this.traversalObject(this.dataTreeCheck)
					this.loading = false;
				})
				this.handleEditShowStatus = false;
				this.handleEditCheckShow =true;
				this.handleEditShow = true;
				
			},
			//查看
			handleCheck(index, row) {
				this.checkBtnHide = false;
				this.resourceCheckedKey = [];
				this.roleId = row.id;
				this.form = {
					name: row.name,
					remark: row.remark,
					status: row.status
				}
				checkProRoleDetail({
					'id': row.id
				}).then(res=> {				
						this.dataTreeCheck = res.data.data.permissionList;						
						this.traversalObject(this.dataTreeCheck)
						 setTimeout(()=>{
							this.traversalDisable(this.dataTreeCheck)
							},200)
						
				})
				this.handleEditShowStatus = true;
				this.handleEditCheckShow =true;
				this.handleEditShow = true;
				

			},
			//保存
			saveEditRole(){	
					//菜单数组
				let menuArr = []
				let addTreeArr = this.$refs.tree.getCheckedNodes() 
				let editTreeArr = this.$refs.treeCheck.getCheckedNodes()
				
				//编辑时
				if(this.handleEditCheckShow){					
					for(let MenuItem of editTreeArr){
						if(MenuItem.isBtn == 0){
							menuArr.push(MenuItem)
						}
					}					
					this.updateRoleJson.oneMenu =[]
					this.updateRoleJson.name = this.form.name;
					this.updateRoleJson.remark = this.form.remark;
					this.updateRoleJson.id = this.roleId;
					this.updateRoleJson.oneMenu = menuArr

					this.updateRole({"data":JSON.stringify(this.updateRoleJson)})
				}else{
					//创建时
					this.formJson.oneMenu = [];
				
					for(let MenuItem of addTreeArr){
						if(MenuItem.isBtn == 0){
							menuArr.push(MenuItem)
						}
					}
					this.formJson.oneMenu = menuArr;
					this.formJson.name = this.form.name;
					this.formJson.remark = this.form.remark;
					console.log(this.formJson)
					this.insertRole({"data":JSON.stringify(this.formJson)})
				}


			},
			//编辑角色
			updateRole(data){
				updateRole(data).then(res=>{
					console.log(res)
						this.reload()
						this.$message.success('编辑角色成功');
				})
			},

			//c创建角色接口
			insertRole(data){
				insertRole(data).then(res=> {
					this.reload()
					this.$message.success('创建角色成功');
				})
			},

			
			traversalObject(obj){
			    for (let a in obj) {
			        if(a=="children" && this.isArray(obj[a])){
							for(let item of obj[a]){
								if(item.check) {
									this.resourceCheckedKey.push(item.id)
								}
							}
					}
			        if (typeof (obj[a]) == "object") {
						if(obj.level == 1 && obj.check == true && !this.resourceCheckedKey.includes(obj.id)){
							this.resourceCheckedKey.push(obj.id)							
						}
			            this.traversalObject(obj[a]); //递归遍历
			        }
			    }

			},
			traversalDisable(obj){
			    for (let a in obj) {
			        if(a=="children" && this.isArray(obj[a])){
							for(let item of obj[a]){
								item.disabled = true;
							}
					}
			        if (typeof (obj[a]) == "object") {
			            this.traversalDisable(obj[a]); //递归遍历
			        }
			    }

			},
			isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},			
			loadNode(node, resolve) {

				if(node.level === 1) {
					//点击加载树的下一级调用
					getNextMenuList({
						"id":node.key
					}).then(res => {
						console.log(res)
						if(res.data.code == 1) {
							setTimeout(() => {
								resolve(res.data.data);
							}, 200); //加载下级数据!	
						}

					})
				}
				if(node.level === 2) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 3) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 4) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 5) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 6) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 7) {
					getNextMenuList({
						"id": node.key
					}).then(res => {

						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
			},


			
			//删除按钮
			handleDelete(index, row) {
				this.idDel = row.id
				this.delVisible = true;
			},
			//删除弹框确定
			deleteRow() {	
				deleteRole({
					'id': this.idDel,
				}).then(res => {
					if(res.data.code == 1) {
						this.getData(this.pageIndex, this.pageSize, this.statusAll)
					} else {
						alert(res.data.msg)
					}

				});

				this.delVisible = false;
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			//筛选查询搜索
			search() {
				this.getData(1, this.pageSize, this.statusAll)
			},
			// 分页
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
			},

			handleSizeChange(val) {

			},
			handleForOrSta(index, row) {
				this.idDel = row.id
				console.log(this.tableData[index])
				if(row.status == 1){
					this.forOrStaRow(2)
				}else{
					this.forOrStaRow(1)
				}
				
			},
			forOrStaRow(status) {
				forOrStaRole({
					'id': this.idDel,
					'status':status //禁用启用状态
					}).then(res =>{
						console.log(res)
						if(res.data.code == 1) {
							this.getData(this.pageIndex, this.pageSize, this.statusAll)
						} else {
							alert(res.data.msg)
						}
	
					});
				
			},

		}
	}
</script>

<style lang='scss' scoped="scoped">
	.textTip {
		text-align: center;
	}
	
	.el-tree {
		height: 230px;
		overflow-y: auto;
	}
	
	.dialogHeader {
		width: 490px;
		height: 50px;
		border: 1px solid #000;
		line-height: 50px;
		font-size: 16px;
		background: #f3f2f2;
		border-radius: 5px 5px 0 0;
	}
	
	.dialogBody {
		width: 490px;
		height: 130px;
		text-align: center;
		display: table-cell;
		vertical-align: middle;
	}
	
	.handleSeloShow {
		.el-input {
			width: 438px;
		}
		.adminDetailBox {
			margin-top: 5px;
			margin-left: 180px;
		
			.addRoleRemark {
				width: 438px;
				height: 120px;
				padding: 6px 6px;
				margin-left: 6px;
				border: 1px solid #ccc;
				border-radius: 3px;
			}
		}
		div {
			.margin-l-12{
				    margin-left: 12px;
				    font-size: 15px;
			}
			.margin-20{
				margin: 20px;
			}
			
			.adminDetailTitle {
				font-size: 18px;
			
			}
		}
	}
</style>
