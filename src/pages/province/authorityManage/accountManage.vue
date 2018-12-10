<!--
	省区 - 账号管理
-->
<template>
	<div class="accountManage">
		<div id="" v-show="!handleEditShow">
			<div class="search_wrap">
				<el-form :inline="true" class="demo-form-inline">				
					<el-form-item label="人员名称:">
						<el-input v-model="nameOrTel" placeholder="请输入姓名或电话 " class="handle-input">
						</el-input>
					</el-form-item>
					<el-form-item label="账号状态:">
						<el-select v-model="selStatus" placeholder="全部状态">
							<el-option label="请选择状态" value=''></el-option>
							<el-option label="删除" value='0'></el-option>
							<el-option label="正常" value='1'></el-option>
							<el-option label="禁用" value='2'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="角色名称:" style='color: red;'>
						<el-select v-model="selSole" placeholder="全部角色" class="handle-select">
							<el-option label="请选择角色" value=''></el-option>
							<el-option v-for="(item,index) in getSoleOption" :key="item.id" :label="item.roleName" :value="item.roleId">
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
					<el-table-column label="操作" align='center'>
						<template slot-scope="scope">
							<div class="operateBtn" @click="handleCheck(scope.$index, scope.row)">查看</div>
							<div class="operateBtn edit" v-if="scope.row.status!=0" @click="handleEdit(scope.$index, scope.row)">编辑</div>
							<div class="operateBtn" v-if="scope.row.status!=0" @click="handleForOrSta(scope.$index, scope.row)">{{scope.row.status==2?'解禁':'禁用'}}</div>
							
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
				<el-form ref="form" :model="form" label-width="80px">
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
							<el-option v-for="(item,index) in getSoleOption" :label="item.roleName" :value="item.roleId">
							</el-option>
						</el-select>
					</el-form-item>					
					<el-form-item label="角色权限:" v-show='form.roleName !== ""'>
						<el-tree ref="tree" v-loading="loading" :data="dataTree" node-key="id" show-checkbox :props="defaultProps" :default-checked-keys="resourceCheckedKey">
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
		forOrStaAccountInfo,//禁用、启用账号
		editSelectRoleName,//账号管理-编辑账号的角色下拉
		selectRoleName, //账号管理-筛选的角色下拉
		checkAccountInfo, // 查看
		updateAccountInfo, //编辑
		checkProRoleDetail
	} from 'src/api/province_url/authorityManage';
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
				checkList: '',
				totalRecords: 0, //总条数					
				totalPageCnt: 0, //总页数
				pagin_show: true,
				pageIndex: 1,
				pageSize: 10,
				getSoleOption: [],
				loading:true,
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
					accountNum: '',
					status: '',
					departmentId: '',
					remark: '',
					roleName: '',
					id: ''
				},
				idDel: '',
				idx: -1,

			}
		},
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
					
					this.getSoleOption = res.data.data;console.log(this.getSoleOption)
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
				this.loading = true;
				this.resourceCheckedKey =[];
				this.dataTree = [];
				this.roleId = a;
				checkProRoleDetail({
					'id': a
				}).then(res => {					
					//事业部
//					this.departmentList = res.data.data.departmentList,
					this.dataTree = res.data.data.permissionList,
					console.log(this.dataTree)
					this.traversalDept();//回显事业部
					this.traversalObject(this.dataTree)
					
					setTimeout(()=>{						 	
						this.traversalObjectDisable(this.dataTree)		
					},200)	
					this.loading = false;
					
				})
			},
			// 编辑账号确定
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
			
				updateAccountInfo({
					'id': this.form.id,
					'name': this.form.name,
					'phoneNum': this.form.phoneNum,
					'roleId': this.roleId
				}).then(res => {
						this.$message.success('编辑账号成功');
						this.handleEditShow = false;
						this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selStatus, this.selSole)
				})
			},

			//返回
			backBtn(){
				this.handleEditShow = false;
				this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selStatus, this.selSole)
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
				this.pageIndex = val;
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
				checkProRoleDetail({
					'id': row.roleId
				}).then(res => {
					this.dataTree = res.data.data.permissionList,
					this.loading = false;
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
				this.dataTree = [];
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
				checkProRoleDetail({
					'id': row.roleId
				}).then(res => {
//					this.departmentList = res.data.data.departmentList,
					this.dataTree = res.data.data.permissionList,
					this.loading = false;
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

			//启用禁用
			handleForOrSta(index, row) {
				this.roleId = row.roleId;
				this.idDel = row.id;
				if(row.status == 1) {
					this.forOrStaRow(2)
				} else {
					this.forOrStaRow(1)
				}

			},
		
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			//删除弹框确定
			deleteRow() {
				delAccountListData({
					'id': this.idDel,
				}).then(res => {
					if(res.data.code == 1) {
						this.getData(this.pageIndex, this.pageSize, this.nameOrTel, this.selSole, this.selStatus)
					} else {
						alert(res.data.msg)
					}

				});

				this.delVisible = false;
			},
			//启用禁用弹框确定
			forOrStaRow(status) {
				forOrStaAccountInfo({
					'id': this.idDel,
					'status': status, //禁用启用状态
					'roleId':this.roleId
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
