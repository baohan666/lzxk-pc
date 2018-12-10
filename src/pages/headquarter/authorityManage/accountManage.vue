<!--
	总部 - 账号管理
-->

<template>
	<div class="accountManage">
		<div id="" v-show="!handleEditShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">
					<button @click="addAccount" class='el-button-red'>新增账号
				</button>
					<el-form-item label="账号:">
						<el-input v-model="nameOrTel" placeholder="请输入姓名或电话 " class="handle-input">
						</el-input>
					</el-form-item>
					<el-form-item label="状态:">
						<el-select v-model="selStatus" placeholder="全部状态">
							<el-option label="请选择状态" value=''></el-option>
							<el-option label="删除" value='0'></el-option>
							<el-option label="正常" value='1'></el-option>
							<el-option label="禁用" value='2'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="角色:" style='color: red;'>
						<el-select v-model="selSole" placeholder="全部角色" class="handle-select">
							<el-option label="请选择角色" value=''></el-option>
							<el-option v-for="(item,index) in getSoleOption" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<button @click="search" class='el-button-red'>查询</button>
					<button @click="clear" class='el-button-red'>清空</button>
				</el-form>
			</div>
			<div class='table_wrap'>
				<el-table :data="tableData" border>
					<el-table-column label="序号" width='60px' type=index align='center'>
					</el-table-column>
					<el-table-column prop="name" label="姓名"  align='center'>
					</el-table-column>
					<el-table-column prop="accountNum" label="电话"  align='center'>
					</el-table-column>
					<el-table-column prop="roleName" label="角色名称"  align='center'>
					</el-table-column>
					<el-table-column prop="createDate" label="创建时间"  align='center'>
					</el-table-column>
					<el-table-column prop="status" label="状态"  align='center' :formatter="formatterStatus">
					</el-table-column>
					<el-table-column label="操作" align='center' >
						<template slot-scope="scope">
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row)">查看</div>
							<div class="operateBtn edit" v-if="scope.row.status!=0" @click="handleEdit(scope.$index, scope.row)">编辑</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleForOrSta(scope.$index, scope.row)">{{scope.row.status==2?'解禁':'禁用'}}</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleDelete(scope.$index, scope.row)">删除</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
		</div>
		<!-- 删除提示框 -->
		<el-dialog title='提示' :visible.sync="delVisible" :append-to-body='true' center width="30%">
			<div style="text-align: center;line-height: 100px;">
				<span>您确定要删除吗？</span>
			</div>
			<span slot="footer" calss='dialog-footer'>
				<button @click="deleteRow" class="el-button-red">确定</button>
			</span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<div v-show="handleEditShow" class="handleEditShow">
			<div>
				<button @click="backBtn" class="el-button-red margin30">返回</button>
			</div>
			<div class="adminDetailBox">
				<span class="adminDetailTitle">基本信息</span>
			</div>
			<div class="adminDetailBox">
				<el-form ref="form" :model="form" label-width="80px" style='border:1px solid red,'>

					<el-form-item label="姓      名:">
						<span class="status" v-show="disabledShow">{{form.name}}</span>
						<el-input v-model="form.name" v-show="!disabledShow"></el-input>
					</el-form-item>
					<el-form-item label="电      话:">
						<span class="status" v-show="disabledShow">{{form.phoneNum}}</span>
						<el-input v-model="form.phoneNum" v-show="!disabledShow"></el-input>
					</el-form-item>
					<el-form-item label="状      态:" v-show='isSatus'>

						<span class="status" v-show="form.status == 1">正常</span>
						<span class="status" v-show="form.status == 2">禁用</span>
						<span class="status" v-show="form.status == 0">删除</span>
					</el-form-item>
					<el-form-item label="角色类型:">
						<span class="status" v-show="disabledShow">{{form.roleName}}</span>
						<el-select v-show="!disabledShow" v-model="form.roleName" placeholder="全部角色" class="handle-select" @change="onSelectedSole($event)">
							<el-option label="请选择角色" value=''></el-option>
							<el-option v-for="(item,index) in getSoleOption" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

					<div id="" class="deptBox" v-show="form.roleName !== ''">
						<span class="dept">
							事业部：
						</span>					
						<el-checkbox-group v-model="checkList" >							
							<el-checkbox v-for="item in departmentList" :key='item.name' :label="item.id" disabled>{{item.name}}</el-checkbox>						  
						</el-checkbox-group>
					</div>
					<el-form-item label="角色权限:" v-show='form.roleName !== ""'>
						<el-tree ref="tree" :data="dataTree" node-key="menuId" show-checkbox :props="defaultProps" :default-checked-keys="resourceCheckedKey">
						</el-tree>
					</el-form-item>
				</el-form>

			</div>

			<div class="adminDetailBox" slot="footer" v-show="!disabledShow">
				<button @click="saveEditbtn()" class="el-button-red">确定</button>
				<button @click="handleEditShow = false" class="el-button-red">取消</button>
			</div>

		</div>

	</div>

</template>

<script>
	import {
		getAccountListData,
		delAccountListData,
		forOrStaAccountInfo,
		selectRoleName,
		insertAccountInfo, // 新增
		updateAccountInfo, //编辑
		checkRole //总部查看角色
	} from 'src/api/headquarter_url/authorityManage';
	import elPagination from 'components/el-page';
	export default {
		data() {
			return {
				roleId: '',
				dataTree: '',
				disabledShow: false,
				handleEditShow: false, //编辑显示隐藏
				forbiddenBtnShow: 'true', //禁用解禁按钮
				pagin_show: true,
				delStatus: false,
				isSatus: true,
				indexTree: '',
				nameOrTel: '', //姓名或电话输入框
				selStatus: '',
				selSole: '', //全部角色，后台返
				checkedDept: [], //复选框
				departmentList: [],
				tableData: [],
				checkList: [],
				totalRecords: 0 //总条数
					,
				totalPageCnt: 0 //总页数
					,
				pagin_show: true,
				pageIndex: 1,
				pageSize: 10,
				getSoleOption: [],
				editVisible: false,
				delVisible: false,
				forOrStaVisible: false,
				forOrStaMsg: '禁用',
				statusForOrStart: '', //禁用启用状态
				tableIndex: '',
				defaultProps: {
					children: 'children',
					label: 'menuName'
				},
				form: {
					name: '',
					phoneNum: '',
					status: '',
					departmentId: '',
					remark: '',
					roleName: '',
					id: ''
				},
				idDel: '',
				resourceCheckedKey:[],
			}
		},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		created() {
			let datalist = this.getsearchInfo(this.pageIndex, this.pageSize);
			this.getData(datalist);
			this.selectRoleName()
		},
		components: {
			elPagination
		},
		methods: {
			//获取table列表数据请求参数
			getsearchInfo(pageIndex, pageSize) {
				let datalist = {
					pageIndex: pageIndex,
					pageSize: pageSize,
					'name': this.nameOrTel,
					'roleId': this.selSole,
					'status': this.selStatus
				};
				return datalist;
			},
			//获取列表
			getData(datalist) {
				getAccountListData(datalist).then(res => {
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
			//获取角色
			selectRoleName() {
				selectRoleName().then(res => {
					this.getSoleOption = res.data.data;
				})
			},
			//点击分页
			updataPage(val) {
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				let datalist = this.getsearchInfo(this.pageIndex, this.pageSize);
				this.getData(datalist);
			},
			//角色查看详情
			onSelectedSole(a) {
				this.resourceCheckedKey =[];
				this.roleId = a;
				checkRole({
					'id': a
				}).then(res => {					
					//事业部
					this.departmentList = res.data.data.departmentList,
					this.dataTree = res.data.data.permissionList,
					this.traversalDept();//回显事业部
					this.traversalObject(this.dataTree)
					setTimeout(()=>{						 	
						this.traversalObjectDisable(this.dataTree)		
					},200)		
					
				})
				
			},
			// 新增账号确定
			saveEditbtn() {
				if(this.form.name == '') {
					alert('请输入姓名');
					return false;
				} else if(this.form.phoneNum == '') {
					alert('电话');
					return false;
				} else if(!(/^1[34578]\d{9}$/.test(this.form.phoneNum))) {
					alert("手机号码有误，请重填");
					return false;
				} else if(this.roleId == '') {
					alert('请选择角色类型');
					return false;
				}
				if(this.isSatus){
					updateAccountInfo({
					'id': this.form.id,
					'name': this.form.name,
					'phoneNum': this.form.phoneNum,
					'roleId': this.roleId
					}).then(res => {
						this.handleEditShow = false;					
						this.reload();					
						this.$message.success('编辑账号成功');
					})
				}else{
					insertAccountInfo({
					'name':this.form.name,
					'phoneNum':this.form.phoneNum,			
					'roleId':this.roleId
					}).then(res=>{
						this.reload();		
						this.$message.success('新增账号成功');
					})					
				}
				
				
			},

			//新增账号
			addAccount() {
				this.roleId = '';
				this.form = {
						name: '',
						phoneNum: '',
						status: '',
						departmentId: [],
						remark: '',
						roleName: '',
					},
				this.isSatus = false;
				this.disabledShow = false;
				this.handleEditShow = true;
				
			},
			//编辑返回按键
			backBtn() {
				this.handleEditShow = false;
				let datalist = this.getsearchInfo(this.pageIndex, this.pageSize);
				this.getData(datalist);			
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

			//清空
			clear() {
				this.nameOrTel = "";
				this.selStatus = "";
				this.selSole = '';
			},
			
			// 分页导航
			handleCurrentChange(val) {
				this.pageIndex = val.pageIndex;
				this.pageSize = val.pageSize;
				this.getData(this.pageIndex, this.pageSize)
			},
			handleSizeChange(val) {

			},
			//查询
			search() {
				let datalist = this.getsearchInfo(1, this.pageSize);
				this.getData(datalist);
			},
			//账号管理编辑
			handleEdit(index, row) {
				this.disabledShow = false;
				this.isSatus = true;
				this.roleId = row.roleId;				
				this.form = {
					name: row.name,
					phoneNum: row.accountNum,
					roleName: row.roleName,
					status: row.status,
					remark: row.remark,
					id: row.id //编辑人员id			
				}
				checkRole({
					'id': row.roleId
				}).then(res => {
					this.departmentList = res.data.data.departmentList,
					this.dataTree = res.data.data.permissionList,
					console.log(this.dataTree)
					this.traversalDept()
					this.traversalObject(this.dataTree)
					setTimeout(()=>{						 	
							this.traversalObjectDisable(this.dataTree)		
					},200)		
				})
				this.handleEditShow = true;
			},
			//账号管理查看
			handleCheck(index, row) {
				this.resourceCheckedKey =[];
				this.disabledShow = true;
				this.isSatus = true;
				this.roleId = row.roleId;
				this.form = {
					name: row.name,
					phoneNum: row.accountNum,
					roleName: row.roleName,
					status: row.status,
					remark: row.remark,
				}
				console.log(this.form)
				checkRole({
					'id': row.roleId
				}).then(res => {
					this.departmentList = res.data.data.departmentList,
					this.dataTree = res.data.data.permissionList,
					console.log(this.dataTree)
					this.traversalDept();
					this.traversalObject(this.dataTree)		
					 setTimeout(()=>{						 	
							this.traversalObjectDisable(this.dataTree)	
					},200)		
					
				})
				this.handleEditShow = true;

			},
			
			traversalObject(obj){		
			    for (let a in obj) {
			        if(a=="children" && this.isArray(obj[a])){
							for(let item of obj[a]){
								if(item.check) {
									this.resourceCheckedKey.push(item.menuId)
								}
							}				
					} 
			        if (typeof (obj[a]) == "object") {
			            this.traversalObject(obj[a]); //递归遍历	
			        }
			    }
				
				
			},
			
			
			traversalDept(){
				this.checkList = [];
				for(let item of this.departmentList){
				
						if(item.is_check == true){							
							this.checkList.push(item.id)
						}
					}
			},
			//
			traversalObjectDisable(obj){		
			    for (let a in obj) {
			        if(a=="children" && this.isArray(obj[a])){
							for(let item of obj[a]){
								item.disabled = true;
							}					
					} 
			        if (typeof (obj[a]) == "object") {
			            this.traversalObjectDisable(obj[a]); //递归遍历
						
			        }
			    }
				
			},
			isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},
			//updateAccountInfo
			//启用禁用
			handleForOrSta(index, row) {
				this.idDel = row.id
				console.log(this.tableData[index])
				if(row.status == 1) {
					this.forOrStaRow(2)
				} else {
					this.forOrStaRow(1)
				}

			},
			//删除
			handleDelete(index, row) {
				this.idDel = row.id
				this.delVisible = true;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			//删除弹框确定
			deleteRow() {
				delAccountListData({
					'id': this.idDel,
				}).then(res => {
					
						this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selSole, this.selStatus)
					
				});
				this.delVisible = false;
			},
			//启用禁用弹框确定
			forOrStaRow(status) {
				forOrStaAccountInfo({
					'id': this.idDel,
					'status': status //禁用启用状态
				}).then(res => {				
						this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selSole, this.selStatus)
				});

			},

		}
	}
</script>

<style lang='scss' scoped="scoped">
	.handleEditShow {
		.el-tree {
			width: 500px;
		}
		font-size: 15px !important;
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
			.el-form-item__label {}
			.status {
				margin-left: 12px;
				font-size: 15px;
			}
			.deptBox {
				line-height: 40px;
				height: 40px;
				.dept {
					width: 80px;
					text-align: right;
					float: left;
					font-size: 14px;
					color: #606266;
					line-height: 40px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
				}
				.deptCheck {
					margin-left: 10px;
				}
			}
		}
		div {
			.margin30 {
				margin: 30px 0 20px 50px;
			}
			.adminDetailTitle {
				font-size: 18px;
				margin: 10px 0;
			}
		}
	}
</style>
