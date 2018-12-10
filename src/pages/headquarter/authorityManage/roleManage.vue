<!--
	总部 - 角色管理
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
							<el-option key="1" label="删除" value="0"></el-option>
							<el-option key="2" label="正常" value="1"></el-option>
							<el-option key="3" label="禁用" value="2"></el-option>
						</el-select>
					</el-form-item>
					<button @click="search" class='el-button-red'>查询</button>
				</el-form>
			</div>
			<div class="table_wrap">
				<el-table :data="tableData" border>
					<el-table-column label="序号"  type=index align='center'>
					</el-table-column>
					<el-table-column prop="name" :show-overflow-tooltip="true" label="名称"  align='center'>
					</el-table-column>
					<el-table-column prop="remark" :show-overflow-tooltip="true" label="描述"  align='center'>
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
		<el-dialog title='提示' :visible.sync="delVisible" :append-to-body='true' center width="30%">
			<div style="text-align: center;line-height: 100px ;">
				<span>您确定要删除吗？</span>
			</div>
			<span slot="footer" calss='dialog-footer'>
				<button @click="deleteRow" class="el-button-red">确定</button>
			</span>
		</el-dialog>
		<div v-show="handleEditShow" class="handleSeloShow">
			<div>
				<span @click="backBtn" class="product_button">返回</span>
			</div>
			<div class="adminDetailBox">
				<span class="adminDetailTitle">
					基本信息
				</span>
			</div>
			<div class="adminDetailBox">
				<el-form ref="form" :model="form" label-width="80px" style='border:1px solid red,'>
					<el-form-item label="角色名称:">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="状态:" v-show='handleEditShowStatus'>
						<span class="status" v-show="form.status == 1">正常</span>
						<span class="status" v-show="form.status == 2">禁用</span>
						<span class="status" v-show="form.status == 0">删除</span>
					</el-form-item>
					<el-form-item label="角色描述:">
						<textarea id="editRoleRemark" v-model="form.remark" type="text" maxlength="100" class="addRoleRemark"></textarea>
					</el-form-item>
					<div id="" class="deptBox" >
						<span class="dept">
							事业部：
						</span>
						<!--创建角色时-->
						<el-checkbox-group v-show='!handleEditShowStatus' v-model="checkList" >
							<el-checkbox  v-for="item in departmentList" :key='item.name' :label="item.id" >{{item.name}}</el-checkbox>
						</el-checkbox-group>
						<!--查看角色时-->
						<el-checkbox-group v-show="!checkBtnShow && handleEditShowStatus" v-model="checkList" >
							<el-checkbox  v-for="item in departmentList" :key='item.name' :label="item.id" disabled>{{item.name}}</el-checkbox>
						</el-checkbox-group>
						<!--编辑角色时-->
						<el-checkbox-group v-show="checkBtnShow && handleEditShowStatus" v-model="checkList" >
						<el-checkbox v-show="checkBtnShow" v-for="item in departmentList" :key='item.name' :label="item.id" >{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</div>
					<el-form-item label="角色权限:" v-show='!handleEditShowStatus'>
							<el-tree
							v-loading="loading"
							ref="tree"
							:data="dataTree"
							:load="loadNode"
							:props="defaultProps"
							show-checkbox
							lazy
							node-key="id"
							:default-checked-keys="resourceCheckedKey"
							
						></el-tree>
					</el-form-item>

					<el-form-item label="角色权限:" v-show='handleEditShowStatus'>
						<el-tree ref="treeCheck" :data="dataTreeCheck" node-key="id" show-checkbox :props="props" :default-checked-keys="resourceCheckedKey">
						</el-tree>
					</el-form-item>

					<!--<el-form-item label="角色权限:" v-show='handleEditShowStatus'>
						<el-tree ref="treeCheck" :data="dataTreeCheck" node-key="id" show-checkbox :props="props" >
						</el-tree>
					</el-form-item>-->
				</el-form>

			</div>
			<div class="adminDetailBox" slot="footer" v-show="checkBtnShow">
				<span @click="saveEditRole" class="product_button">确定</span>
				<span @click="handleEditShow = false" class="product_button">取消</span>
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
		updateRole//编辑角色
	} from 'src/api/headquarter_url/authorityManage';
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				checkBtnShow:true, //查看时隐藏按钮
				handleEditShow: false, //编辑显示隐藏
				handleEditShowStatus:false,
				loading: true, //
				dataTree: [],//创建角色树
				dataTreeCheck:[],//查看编辑树
				defaultProps: {

					label: 'name',
					children: 'sub',
					isLeaf: 'leaf',

				},
				props: {
					id:'id',
					children: 'children',
					label: 'menuName',
				},
				isAdd: false,
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
				checkedDept: [], //复选框
				departmentList: [],
				tableData: [],
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				checkList:'',//选中事业部
				getSelOption: [],//角色select
				roleList: [],
				checkDeptArr:[],
				forOrStaMsg: '启用',
				is_search: false,
				editVisible: false,
				delVisible: false, //删除确认弹框
				forOrStaVisible: false,
				forbiddenBtnShow: false, //禁用解禁
				departmentId:[],
				twoMenu:[],
				form: {
					name: '',
					remark: '',
					status: '',
					departmentList:'',
					"departmentId": [],
					"oneMenu": []
				},
				updateRoleJson:{
					'id':'',
					'name': '',
					'remark': '',
					"departmentId":'',
					"oneMenu":[],
				},
				formJson:{
					'name': '',
					'remark': '',
					"departmentId":'',
					"oneMenu":[],
				},
				twoMenu:[],
				thrMenuS:[],
				nextMenuS:[],
				idDel: '',
				roleId:'',//当前编辑人查看人id
				idx: -1,
				isStu: '',
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]

			}
	},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		mounted: function() {
			this.getData(this.pageIndex, this.pageSize)
		},
		components: {
			elPagination
		},
		methods: {
			getData(pageIndex, pageSize, status) {
				getRoleListData({
					"pageIndex": pageIndex,
					"pageSize": pageSize,
					'status': status
				}).then(res=> {
					const datas = res.data.data;
					console.log(datas)
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
				this.getData(this.pageIndex, this.pageSize,this.status)
			},
			//创建角色 角色权限
			addRole() {
					this.form.name = '',
					this.form.remark = '',
					this.form.departmentList = [],
					this.formJson.oneMenu = [],
					this.isAdd = false;
					this.handleEditShowStatus = false;
					this.formJson.departmentId = [];
				getRoleMenuList().then(res=> {
						this.dataTree = res.data.data.menuList;
						this.departmentList = res.data.data.departmentList;
						this.traversalDept();
						this.loading = false;
				})
				this.handleEditShow = true;
			},


			//返回编辑
			backBtn() {
				this.reload();
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
				this.handleEditShow = false;
			},
			//列表编辑按钮
			handleEdit(index, row) {
				this.roleId = row.id;
				this.idx = index;
				this.form = {
					name: row.name,
					remark: row.remark,
					status: row.status
				}
				this.resourceCheckedKey =[];
				this.departmentId = [];
				this.handleEditShowStatus = true;
				checkRole({
					'id':row.id
				}).then(res=>{
					this.departmentList = res.data.data.departmentList,
					this.dataTreeCheck = res.data.data.permissionList;
					this.traversalDept();
					this.traversalObject(this.dataTreeCheck)
				})

				this.handleEditShow = true;

			},
			//查看
			handleCheck(index, row) {

				this.isAdd = true;
				this.roleId = row.id;
				this.form = {
					name: row.name,
					remark: row.remark,
					status: row.status
				}

				checkRole({
					'id': row.id
				}).then(res=> {
						this.departmentList = res.data.data.departmentList,
						this.dataTreeCheck = res.data.data.permissionList;
						this.traversalDept();
						this.traversalObject(this.dataTreeCheck)
						 setTimeout(()=>{
							this.traversalDisable(this.dataTreeCheck)
							},200)
						this.handleEditShow = true;
				})
				this.handleEditShowStatus = true;
				this.handleEditShow = true;
				this.checkBtnShow = false;

			},
			traversalDept(){
				this.checkList = [];
				for(let item of this.departmentList){
//						console.log(111)
						if(item.is_check == true){
							this.checkList.push(item.id)
						}
					}
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
			//编辑角色
			updateRole(data){
				updateRole(data).then(res=>{
//					console.log(res)
						this.reload()
						this.$message.success('编辑角色成功');
				})
			},

			//创建角色接口
			insertRole(data){
				insertRole(data).then(res=> {
					this.reload()
					this.$message.success('创建角色成功');
				})
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
						this.getData(this.pageIndex, this.pageSize, this.statusAll)
				});

				this.delVisible = false;
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			//筛选查询搜索
			search() {
				console.log(this.pageIndex, this.pageSize, this.statusAll)
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
			},
			// 分页
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
			},
			loadNode(node, resolve) {
				if(node.level === 1) {
					//点击加载树的下一级调用
					getNextMenuList({
						"id":node.key
					}).then(res => {
					console.log(res.data.data)
					res.data.data.forEach(item => {
							if(item.isBtn == 1){
								item.isleaf = true;
							}
						})
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
						console.log(res.data.data)
					res.data.data.forEach(item => {
						console.log(item.isBtn)
							if(item.isBtn == 1){
								item.leaf = true;
							}
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
				if(node.level === 3) {
					getNextMenuList({
						"id": node.key
					}).then(res => {
					if(this.isArray(res.data.data)){
						res.data.data.forEach(item => {
						console.log(item.isBtn)
							if(item.isBtn == 1){
								item.leaf = true;
							}
						})
					}else{
						res.data.data = [];
					}
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
				if(node.level === 4) {
					getNextMenuList({
						"id": node.key
					}).then(res => {
					console.log(res)

					res.data.data.forEach(item => {
							if(item.isBtn == 1){
								item.leaf = true;
							}
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
				if(node.level === 5) {
					getNextMenuList({
						"id": node.key
					}).then(res => {
					console.log(res)
					res.data.data.forEach(item => {
							if(item.Btn == 1){
								item.leaf = true;
							}
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
				if(node.level === 6) {
					getNextMenuList({
						"id": node.key
					}).then(res => {
						console.log(res)
					res.data.data.forEach(item => {
							if(item.isBtn == 1){
								item.leaf = true;
							}
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
				if(node.level === 7) {
					getNextMenuList({
						"id": node.key
					}).then(res => {
					console.log(res)
					res.data.data.forEach(item => {
							if(item.isBtn == 1){
								item.leaf = true;
							}
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!
					})
				}
			},


			isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},
			//创建角色确定
			saveEditRole(){
				//菜单数组
				let menuArr = []
				let addTreeArr = this.$refs.tree.getCheckedNodes() 
				let editTreeArr = this.$refs.treeCheck.getCheckedNodes()
				if(this.form.name == '') {
					alert('请输入角色名称');
					return false;
				} else if(this.form.remark == '') {
					alert('请输入角色描述');
					return false;
				}  else if(this.checkList.length == 0) {
					alert('请选择事业部');
					return false;
				}	else if(addTreeArr.length == 0 && editTreeArr.length == 0 ) {
					alert('请选择权限');
					return false;
				}
				
				
				//编辑时
				if(this.handleEditShowStatus){

					
					for(let MenuItem of editTreeArr){
						if(MenuItem.isBtn == 0){
							menuArr.push(MenuItem)
						}
					}
					
					this.updateRoleJson.oneMenu =[]
					this.updateRoleJson.name = this.form.name;
					this.updateRoleJson.remark = this.form.remark;
					this.updateRoleJson.departmentId = this.checkList.toString()
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
					this.formJson.departmentId = this.checkList.toString()
//
					console.log(this.formJson)
					this.insertRole({"data":JSON.stringify(this.formJson)})
				}


			},
			
			//递归
			traversalObjectLeaf(obj){
			    for (let a in obj) {
			        if(a=="children" && this.isArray(obj[a])){
							for(let item of obj[a]){
								item.leaf = true;
							}
					}
			        if (typeof (obj[a]) == "object") {
			            this.traversalObject(obj[a]); //递归遍历
			        }
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
				this.getData(1, this.pageSize, this.statusAll);
			},
			// 分页
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getData(this.pageIndex, this.pageSize, this.statusAll)
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
							this.getData(this.pageIndex, this.pageSize, this.statusAll)

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
		height: 320px;
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
			margin-left: 180px;
			padding: 15px 0;
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
			.status{
				    margin-left: 12px;
				    font-size: 15px;
			}
			.deptBox{
				line-height: 40px;
				height: 40px;
				.dept{
					width: 80px;
				    text-align: right;
				    float: left;
				    font-size: 14px;
				    color: #606266;
				    line-height: 40px;
				    -webkit-box-sizing: border-box;
				    box-sizing: border-box;
				}
				.deptCheck{
					margin-left: 10px;
				}
			}


			.product_button {
				margin: 30px 0 20px 50px;
				padding: 0 3px;
				background: #e02222;
				width: 108px;
				height: 36px;
				border-radius: 3px;
				color: #fff;
				font-size: 14px;
				border: none;
				display: inline-block;
				text-align: center;
				line-height: 36px;
				cursor: pointer;
			}
			.adminDetailTitle {
				font-size: 18px;
				margin: 10px 0;
			}
		}
	}
</style>
