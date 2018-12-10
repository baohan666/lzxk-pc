<template>
	<div class="addressBook">
		<div class="addressBook_left">
			<div class="addressBook_leftMain">

				<div class="addressBook_search">
					<el-input v-model="inputSearch" v-on:input='inputChangSearch()' placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search">
						</el-button>
					</el-input>
					<ul class="serchList" v-show="serchList">
						<div class="searchTitle">部门:</div>
						<li v-show="orgTreeList==''">无</li>
						<li v-for="item in orgTreeList" @click="refreshList(item.id)">
							{{ item.name }}
						</li>
						<div class="searchTitle">人员:</div>
						<li v-show="userInfoList==''">无</li>
						<li v-for="item in userInfoList" @click="refreshList(item.id)">
							{{ item.name }}
						</li>
					</ul>

				</div>
				<div class="addressBook_tab">
					<ul>
						<li class="js_tabDept" :class="{active:isActive==index}" v-for="(item,index) in tabS" @click="isActive=index,changeTab(index)">{{item}}</li>
					</ul>
				</div>
				<address-tree @streeId="refreshList" :changeTreeName='sendTreeName' :appendTreeChild='sendTreeChildName' class='addTree' v-show='addressTreeShow' ref="addressTree"></address-tree>
			</div>
		</div>

		<div class="addressBook_right">

			<div id="" v-show="handleDept && !rightShow">
				<div class="addressPersonSituation" v-model="personCount">
					<h2>{{personCount.dept}}</h2>
					<h3>人员概况：</h3>
					<h4>总人数: {{personCount.count}}</h4>
					<h4>省区经理: {{personCount.provinceCount}}</h4>
					<h4>地区经理: {{personCount.cityCount}}</h4>
					<h4>县区经理: {{personCount.countyCount}}</h4>
					<h4>省办人员: {{personCount.officeCount}}</h4>
					<h3>其中：</h3>
					<h4>
					<span>正常: {{personCount.normalCount}}</span>
					<span>禁用: {{personCount.forbiddenCount}}</span>
					<span>离职: {{personCount.leaveCount}}</span>
					</h4>

				</div>
				<ul class="addressHandleDept">
					<li class="addressBookOpe_editName " @click="topDialogVisible = true,dailogTitleType = '修改部门名称：',	deptNameChange = treeName">修改名称</li>
					<li class="addressBookOpe_addChild " @click="topDialogVisible = true,dailogTitleType = '添加子部门：',deptNameChange = ''" v-show="lev != 4">添加子部门</li>
					<li class="addressBookOpe_cancel" @click="topDialogVisible = true,dailogTitleType = '提示:',deptNameChange = ''">删除</li>
				</ul>
			</div>

			<div class="addressBook_rightMain" v-show="rightShow">
				<div class="addressBook_departmentOpe">
					<h3 class="addressBookTitle" v-model="personCount">
						<i>{{personCount.dept}}</i>
						<i>
							<span>(</span>
							总人数: <span>{{personCount.count}}</span>
							省区经理: <span>{{personCount.provinceCount}}</span>
							地区经理:<span>{{personCount.cityCount}}</span>
							县区经理:<span>{{personCount.countyCount}}</span>
							省办人员: <span>{{personCount.officeCount}}</span>
							<!--正常: <span>{{personCount.normalCount}}</span>
							禁用: <span>{{personCount.leaveCount}}</span>
							离职: <span>{{personCount.forbiddenCount}}</span>-->
									<span>)</span>
						</i></h3>

				</div>
				<div class="addressBook_memberOpe">
					<div class="line">
						<el-form :inline="true" class="demo-form-inline">
							<el-form-item label="姓名：">
								<el-input v-model="nameSearch" placeholder="请输入姓名 ">
								</el-input>
							</el-form-item>
							<el-form-item label="保证金人员：">
								<el-select v-model="isDeposit" placeholder="全部">
									<el-option label="全部" value=""></el-option>
									<el-option label="是" value="1"></el-option>
									<el-option label="否" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="状态:">
								<el-select v-model="statusAll" placeholder="全部">
									<el-option label="全部" value=""></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="禁用" value="2"></el-option>
									<el-option label="离职" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="职级:">
								<el-select v-model="position" placeholder="全部">
									<el-option label="全部" value=""></el-option>
									<el-option label="县区经理" value="3"></el-option>
									<el-option label="地区经理" value="4"></el-option>
									<el-option label="省区经理" value="5"></el-option>
									<el-option label="省办人员" value="10"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="事业部:">
								<el-select v-model="departmentId" placeholder="全部">
									<el-option label="全部" value=""></el-option>
									<el-option label="心脑事业部" value="1"></el-option>
									<el-option label="风湿及骨科事业部" value="2"></el-option>
									<el-option label="云事业部" value="3"></el-option>
									<el-option label="消化事业部" value="4"></el-option>
								</el-select>
							</el-form-item>
							</el-form-item>
							<button @click='search' class='el-button-red'>查询</button>
						</el-form>
					</div>
					<div class="line">
						<div @click='addDept()' class='el-button-red'>添加成员</div>
						<div @click=' batchUse()' class='el-button-red'>批量启用</div>
						<div @click=' batchForbidden()' class='el-button-red'>批量禁用</div>
						<div @click='$refs.checkOutLog.show()' class='el-button-red'>导出</div>
						<div @click='delDialog()' class='el-button-red'>删除</div>
					</div>

				</div>
				<div class="table_wrap">
					<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @row-click="handleDetail">
						<el-table-column type="selection" label="请选择" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="姓名" align='center'>
						</el-table-column>
						<el-table-column prop="departmentId" label="事业部" :formatter="formatterDept" align='center'>
						</el-table-column>
						<el-table-column prop="positions" label="职务" :formatter="formatterPosition" align='center'>
						</el-table-column>
						<el-table-column prop="dept" label="部门" align='center'>
						</el-table-column>
						<el-table-column prop="mobile" label="手机" align='center'>
						</el-table-column>
						<el-table-column prop="superior" label="上级" align='center'>
						</el-table-column>
						<el-table-column prop="isDeposit" label="保证金人员" :formatter="formatterPerson" align='center'>
							<template slot-scope="scope">
								<span v-if="scope.row.isDeposit==1">是</span>
								<span v-if="scope.row.isDeposit==2">否</span>
							</template>
						</el-table-column>
						<el-table-column prop="status" label="人员状态" :formatter="formatterStatus" align='center'>
						</el-table-column>
						
					</el-table>
				</div>
				<!--分页-->
				<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
			</div>

			<div class="addressBook_addPreson" v-show='addPresonFlag'>
				<ul>
					<li class="addPreson_header" v-model='addOrEdit'>{{addOrEdit}}</li>
					<li>
						<span class="addPreson_left">部门
						<i class="colorE02222">*</i>
						<i>:</i>
						</span>
						<i>
						<span class="deptBg"></span>
						<span v-model="deptName">{{deptName}}</span>
						<a href="javascript:;" class="change" @click='changeDeptName()'>修改</a>
					</i>
					</li>
					<li>
						<span class="addPreson_left">姓名
						<i class="colorE02222">*</i>
						<i>:</i>
					</span>
						<el-input v-model="inputName" placeholder="请输入姓名"></el-input>
					</li>
					<li>
						<span class="addPreson_left">性别
						<i class="colorE02222">*</i>
						<i>:</i>
					</span>
						<el-radio v-model="radioSex" label="1" value=''>男</el-radio>
						<el-radio v-model="radioSex" label="2" value=''>女</el-radio>
					</li>
					<li>
						<span class="addPreson_left">手机
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<el-input v-model="inputTel" placeholder="请输入手机号"></el-input>
					</li>
					<li>
						<span class="addPreson_left">身份证号
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<el-input v-model="inputIdCard" placeholder="请输入身份证号"></el-input>
					</li>
					<li>
						<span class="addPreson_left">身份证扫描件
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<div class="div-inline uploadImg_box">
							<upload-img :isInvert="true" :imgMenu="cardImgListSelf" :maxLimit="3" fileName="combo" @uploadSuccess="uploadIdCardSuccess"></upload-img>
						</div>
						<span class="uploadImg_tip">请上传图片，最多上传3张</span>
					</li>
					<li>
						<span class="addPreson_left">职级
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<el-select v-model="isPosition" placeholder="请选择">
							<el-option label="请选择" value=''></el-option>
							<el-option label="县区经理" value='3'></el-option>
							<el-option label="地区经理" value='4'></el-option>
							<el-option label="省区经理" value='5'></el-option>
							<el-option label="省办人员" value='10'></el-option>
						</el-select>
					</li>
					<li v-show='this.isPosition == 5 || this.isPosition == "省区经理"'>
						<span class="addPreson_left">NC对应编码
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<el-input v-model="ncCode" placeholder="请输入NC对应编码"></el-input>
					</li>

					<li v-show='this.isPosition !== ""'>
						<span class="addPreson_left">应聘登记表扫描件
					<i class="colorE02222">*</i>
					<i>:</i>
					</span>
						<div class="div-inline uploadImg_box">
							<upload-img :isInvert="true" :imgMenu="applicationImgSelf" :maxLimit="3" fileName="combo" @uploadSuccess="uploadApplicationImgSuccess"></upload-img>
						</div>
						<span class="uploadImg_tip">请上传图片，最多上传3张</span>

					</li>
					<li v-show='this.isPosition !== ""'>
						<span class="addPreson_left">是否保证金人员
						<i class="colorE02222">*</i>
						<i>:</i>
					</span>
						<el-select v-model="isDeposit" placeholder="请选择">
							<el-option label="请选择" value=''></el-option>
							<el-option label="是" value='1'></el-option>
							<el-option label="否" value='2'></el-option>
						</el-select>
					</li>
					<li v-show='this.isPosition !== "" && this.isDeposit == 1 || this.isDeposit == "是"'>
						<span class="addPreson_left">保证金金额
						<i class="colorE02222">*</i>
						<i>:</i>
					</span>
							<el-input v-model="otherAmount" placeholder="请输入金额"></el-input>
					</li>
					<li v-show='this.isPosition !== "" && this.isDeposit == 1 '>
						<span class="addPreson_left">保证金扫描件
						<i class="colorE02222">*</i>
						<i>:</i>
					</span>
						<div class="div-inline uploadImg_box">
							<upload-img :isInvert="true" :imgMenu="depositImgSelf" :maxLimit="3" fileName="combo" @uploadSuccess="uploadDepositImgSuccess"></upload-img>
						</div>
						<span class="uploadImg_tip">请上传图片，最多上传3张</span>
					</li>
					<li>
						<span class="addPreson_left">创建时间:						
					</span>
						{{createDate}}
					</li>
					<div class="addFooter">
						<button @click="btnSaveRegExp()" class='el-button-red'>保存</button>
						<button @click="btnClose()" class='el-button-close'>取消</button>
					</div>
				</ul>

			</div>
			<!--弹框组件-->
			<address-dialog ref='delVisible' :delMsg='dialogMsg' :multipleSelection='multipleSelection' @deleteSuccess='deleteSuccessFromChild'></address-dialog>
			<!--导出组件-->
			<check-out-dialog ref='checkOutLog' :changDeptBtnFlag='changDeptBtnFlag' v-on:checkOutsuccess="deptNameFromchild"></check-out-dialog>
			<!--人员详情组件-->
			<check-detail ref='detailDialog' :hintMsg='hintMsg' :datailArr='datailArr' v-on:detailEdit='detailEditFromChild' v-on:detailBack='hideBackFromChild' :nowId='sendId' :delBtnShow='delBtnShow' :forbiddenBtnShow='forbiddenBtnShow'></check-detail>
			<el-dialog :title="dailogTitleType" :visible.sync="topDialogVisible" :append-to-body='true' width="30%" class='elDialogAddress'>
				<div class="textTip" v-if="dailogTitleType != '提示:'">
					<span>部门名称:</span>
					<el-input v-model="deptNameChange"></el-input>
				</div>
				<div class="textTip" v-else="">
					<span v-show="tableData.length == 0  && isLeafTree">您确定要删除该部门吗？</span>
					<span v-show="tableData.length > 0 || !isLeafTree">请删除此部门下的成员或子部门后，再删除此部门！</span>
				</div>
				<span slot="footer">
					<button @click="topDialogBtnTrue()" class="el-button-red">确定</button>
				</span>
			</el-dialog>

		</div>

	</div>
</template>

<script>
	import {
		addressListTree, //通讯录列表
		addressDetail,
		insertOrgTree, //添加子部门
		deleteOrgTree, //删除部门
		deleteUserInfo, //人员删除
		getOrgUserLog,
		selectOrgTree,
		outputUserInfo,
		updateOrgTree,
		getCountByTreeId,
		insertUserInfo, //增加人员
		updateUserInfo//编辑人员
	} from 'src/api/headquarter_url/addressList';

	import AddressTree from 'src/headComponent/addressTree.vue'
	import AddressDialog from 'src/headComponent/addressDialog.vue'
	import CheckOutDialog from 'src/headComponent/checkOutDialog.vue'
	import CheckDetail from 'src/headComponent/checkDetail.vue'
	import { getStore, setDepartment, } from 'src/config/cache'
	import departComponet from 'src/headComponent/departComponent'
	import elPagination from 'components/el-page';
	import uploadImg from 'components/aliossupload' //上传图片组件
	export default {
		data() {
			return {
		
				goodsImgs: '', //上传图片
				addOrEdit: '11',
				deptName: '基础医药中心', //部门名
				inputIdCard: '', //身份证信息
				inputTel: '', //身份证号
				isPosition: '', //添加人员职务
				isDeposit: '', //添加人员保证金人员是否
				inputName: '', //添加人员姓名
				radioSex: '1', //性别				
				ncCode: '', //nc编码
				amount: '1', //保证金金额
				otherAmount: '', //保证金其他金额
				departmentId: '', //事业部id
				depositImg:[], //保证金汇款扫描件
				idCardImg:[], //添加人员身份证
				applicationImg: [], //应聘登记表扫描件
				depositImgSelf: [], //回显添加人员身份证
				applicationImgSelf: [], //回显应聘登记表扫描件
				cardImgListSelf: [], //回显保证金汇款扫描件
				createDate:'',//创建时间
				pageIndex: 1,
				pageSize: 10,
				totalRecords: 0, //总条数
				totalPageCnt: 0, //总页数
				pagin_show: true,
				tabS: ['人员', '部门'],
				isActive: 0,
				tableData: [], //表格
				handleDept: false, //修改名称,添加子部门，删除模块
				topDialogVisible: false, //修改名称,添加子部门，删除弹框
				dailogTitleType: '',
				delBtnShow: false, //删除按钮
				forbiddenBtnShow: false, //删除按钮
				multipleSelection: [], //列表选中信息
				rightShow: true, //右侧列表
				addPresonFlag: false, //添加人员编辑人员
				serchList: false, //tree搜索列表
				checkOutVisible: false, //批量导出弹框
				changDeptBtnFlag: false, //修改弹框和导出弹框区分
				addressTreeShow: true, //左侧树
				inputSearch: '', //左侧搜索框绑定
				statusAll: '', //人员状态
				position: '', //职务
				nameSearch: '', //姓名
				departmentId: '', //事业部
				id: '0', //左侧选中树的id,不选中传1
				userId:'',//row id
				pid: '', //父id
				lev: '', //树级别,添加子部门
				sendTreeName: '',
				sendTreeChildName: '',
				isLeafTree: false, //tree 有没有子节点  部门
				treeName: '基础医药中心',
				treeId: '1',
				deptNameChange: '', //头部修改部门名称
				checked: true, //
				streeId: '', //address子组件点击树id
				orgTreeList: '', //
				userInfoList: '', //
				dialogMsg: '', //删除弹框提示内容
				hintMsg: '', //详情子组件提示信息
				datailArr: [], //详情data
				datailEditArr: [], //详情编辑data
				sendId: '',
				personCount: [], //头部人员
			}
		},
		mounted: function() {
			this.getData(this.id, this.pageIndex, this.pageSize);
			this.getCountByTreeId()
		},
		components: {
			AddressTree,
			AddressDialog,
			CheckOutDialog,
			CheckDetail,
			uploadImg,
			departComponet,
			elPagination
		},
		inject: ['reload'], //provide / inject组合解决--重新加载避免闪烁
		methods: {
//					depositImg:[], //保证金汇款扫描件
//					idCardImg:[], //添加人员身份证
//					applicationImg: [], //应聘登记表扫描
			//上传图片
			uploadIdCardSuccess($val) {
				this.idCardImg = $val.fileName.join(",");
			},
			uploadApplicationImgSuccess($val) {
				this.applicationImg = $val.fileName.join(",");
			},
			uploadDepositImgSuccess($val) {
				this.depositImg = $val.fileName.join(",");
			},
			//点击事业部
			selectSuccess(val) {
				this.departmentId = val;
				console.log(this.departmentId);
			},
			//弹框
			hideDialog() {
				this.rightShow = false, //右侧列表
				this.addPresonFlag = false, //添加人员编辑人员
				this.serchList = false, //tree搜索列表
				this.changDeptBtnFlag = false //修改弹框和导出弹框区分
			},
			//添加人员编辑人员改变 部门
			deptNameFromchild(res1, res2, res3) {
				console.log(res1, res2, res3)
				this.treeId = res1.toString();
				this.checkOutVisible = res3;
				this.deptName = res2.toString();
			},
			//添加人员修改
			changeDeptName() {
				this.$refs.checkOutLog.show();
				this.changDeptBtnFlag = true;
			},
			//添加人员确定
			btnSaveRegExp() {
				if(this.deptName == ''){
					alert('请选择部门')
					return false;
				}else if(this.inputName == '') {
					alert('请输入姓名')
					return false;
				} 
				else if(this.inputTel == '') {
					alert('请输入手机号')
					return false;
				} else if(!(/^1[34578]\d{9}$/.test(this.inputTel))) {
					alert("手机号码有误，请重填");
					return false;
				} else if(this.inputIdCard == '') {
					alert('请输入身份证号')
					return false;
				} else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.inputIdCard))) {
					alert('身份证号填写有误');
					return false;
				} else if(this.idCardImg == '') {
					alert("请上传身份证扫描件 ");
					return false;
				} else if(this.isPosition == '') {
					alert("请选择职务 ");
					return false;
				} else if(this.applicationImg == '') {
					alert("请上传应聘登记表扫描件");
					return false;
				} else if(this.ncCode == '' && this.isPosition == '5' || this.isPosition == '省区经理') {
					alert("请输入nc编码 ");
					return false;
				} else if(this.isPosition !== "" && this.isDeposit == 1 || this.isDeposit == "是") {
					if(this.otherAmount == '') {
						alert("请输入保证金金额");
						return false;
					}else if(this.depositImg == '') {
						alert("请上传保证金汇款扫描件");
						return false;
					}
				}
//				depositImg:[], //保证金汇款扫描件
//					idCardImg:[], //添加人员身份证
//					applicationImg: [], //应聘登记表扫描
				if(this.addOrEdit == '编辑成员') {
					updateUserInfo({
						"id": this.treeId,
						'userId': this.userId, //编辑人的id
						"name": this.inputName,
						"mobile": this.inputTel,
						"sex": this.radioSex,
						"idCard": this.inputIdCard,
						"idCardImg": this.idCardImg,
						"position": this.isPosition,
						"applicationImg": this.applicationImg, //应聘登记表扫描件
						"isDeposit": this.isDeposit,
						"ncCode": this.ncCode, //nc编码
						"otherAmount": this.otherAmount, //保证金其他金额
						"depositImg": this.depositImg, //保证金汇款扫描件
					}).then(res => {
						this.reload();
						this.$message.success('编辑人员保存成功');
				})

				} else {
					insertUserInfo({
						"id": this.treeId,
						"name": this.inputName,
						"mobile": this.inputTel,
						"sex": this.radioSex,
						"idCard": this.inputIdCard,
						"idCardImg": this.idCardImg,
						"position": this.isPosition,
						"applicationImg": this.applicationImg, //应聘登记表扫描件
						"isDeposit": this.isDeposit,
						"ncCode": this.ncCode, //nc编码
						"otherAmount": this.otherAmount, //保证金其他金额
						"depositImg": this.depositImg, //保证金汇款扫描件
					}).then(res => {
						this.reload();
						this.$message.success('添加人员保存成功');
					})

				}
			},
			//添加人员取消
			btnClose() {
				if(this.addOrEdit == '编辑成员') {
					this.rightShow = false, //右侧列表
					this.addPresonFlag = false, //添加人员编辑人员
					this.serchList = false, //tree搜索列表
					this.changDeptBtnFlag = false //修改弹框和导出弹框区分
					this.$refs.detailDialog.show();
				} else {
					this.reload();
//					this.idCardImg = [];
//					this.depositImgSelf = [];
//					this.rightShow = false, //右侧列表
//					this.addPresonFlag = false, //添加人员编辑人员
//					this.serchList = false, //tree搜索列表
//					this.$refs.detailDialog.hide();
//					this.changDeptBtnFlag = false //修改弹框和导出弹框区分
//					this.rightShow = true;
				}

			},

			//添加人员
			addDept() {	
				
//				this.$router.push({path:'/addPersonZB'});	
//				
					this.deptName = this.treeName,
					this.treeId = this.id,
					this.inputName = '',
					this.inputTel = '',
					this.radioSex = '1',
					this.inputIdCard = '',
					this.idCardImg = '',
					this.isPosition = '',
					this.applicationImg = '', //应聘登记表扫描件
					this.isDeposit = '',
					this.ncCode = '', //nc编码
					this.amount = '', //保证金金额
					this.otherAmount = '', //保证金其他金额
					this.depositImg = '', //保证金汇款扫描件
					this.addOrEdit = '添加成员',
					this.rightShow = false, //右侧列表
					this.addPresonFlag = false, //添加人员编辑人员
					this.serchList = false, //tree搜索列表
					this.changDeptBtnFlag = false //修改弹框和导出弹框区分
					this.addPresonFlag = true;
			},
			//弹框组件确认
			deleteSuccessFromChild() {
				this.$refs.delVisible.hide();
				this.getData(this.id, this.pageIndex, this.pageSize, this.nameSearch, this.isDeposit, this.statusAll, this.position, this.departmentId);
				this.$message.success('批量操作成功');
			},
			//详情组件返回按键
			hideBackFromChild(flag1, flag2) {
				
				this.isDeposit = '';
				this.getData(this.id, this.pageIndex, this.pageSize, this.nameSearch, this.isDeposit, this.statusAll, this.position, this.departmentId);
				this.rightShow = flag2;
			},
			//子组件编辑按键
			detailEditFromChild(flag1, flag2) {
				this.$refs.detailDialog.hide();
				this.cardImgListSelf= [];
				this.depositImgSelf =[];
				this.applicationImgSelf = [];
					this.addOrEdit = '编辑成员',
					this.treeId = this.datailEditArr.treeId,
					this.deptName = this.datailEditArr.dept, //部门名
					this.inputName = this.datailEditArr.name, //添加人员姓名
					this.inputIdCard = this.datailEditArr.idCard, //身份证信息
					this.inputTel = this.datailEditArr.mobile, //身份证号
					this.isPosition = this.datailEditArr.position.toString(), //添加人员职务
					this.isDeposit = this.datailEditArr.isDeposit == '是' ? '1' : '2', //添加人员保证金人员是否		
					this.cardImgListSelf = this.datailEditArr.idCardImgs,
					this.radioSex = this.datailEditArr.sex.toString(), //性别				
					this.depositImgSelf = this.datailEditArr.depositImgs; //保证金汇款扫描件
					this.applicationImgSelf = this.datailEditArr.applicationImgs, //应聘登记表扫描件
//					depositImg:[], //保证金汇款扫描件
//					idCardImg:[], //添加人员身份证
//					applicationImg: [], //应聘登记表扫描
					this.depositImg = this.datailEditArr.depositImg,
					this.idCardImg = this.datailEditArr.idCardImg,	 //添加人员身份证
					this.applicationImg = this.datailEditArr.applicationImg,
					this.ncCode = this.datailEditArr.ncCode, //nc编码
					this.amount = this.datailEditArr.amount, //保证金金额
					this.otherAmount = this.datailEditArr.otherAmount, //保证金其他金额
					
					this.createDate = this.datailArr.createDate
					//应聘登记表扫描件图片回显数据处理
			          let applicationImgMenu = [];
			          this.applicationImgSelf.forEach((item, index, arr) => {         	
			            applicationImgMenu.push(this.datailEditArr.url+item)
			            console.log(applicationImgMenu)
			          })
			         this.applicationImgSelf  = applicationImgMenu;			        
			          //保证金汇款证明扫描件回显
			          let depositImgMenu = [];
			          this.depositImgSelf.forEach((item, index, arr) => {
			            depositImgMenu.push(this.datailEditArr.url+item)
			          })
			          this.depositImgSelf = depositImgMenu;
			          //身份证扫描件回显
			          let idCardImgMenu = [];
			          this.cardImgListSelf.forEach((item, index, arr) => {
			            idCardImgMenu.push(this.datailEditArr.url+item)
			          })
			          this.cardImgListSelf = idCardImgMenu;
			          this.addPresonFlag = flag2//添加人员								
						},
			//删除弹框
			delDialog() {
				this.$refs.delVisible.show();
				const length = this.multipleSelection.length;
				if(length == 0) {
					this.dialogMsg = '未选中任何成员！';
				} else {
					this.dialogMsg = '删除后，成员的企业微信消息记录将完全被清除。';
				}
			},
			//批量启用
			 batchUse(){
			 	this.$refs.delVisible.show();
				const length = this.multipleSelection.length;
				if(length == 0) {
					this.dialogMsg = '未选中任何成员！';
				} else {
					this.dialogMsg = '启用后，该人员可登录朗致销客手机端，确认将该人员启用吗？';
				}
			 },
			 //批量禁用
			 batchForbidden(){
			 	this.$refs.delVisible.show();
				const length = this.multipleSelection.length;
				if(length == 0) {
					this.dialogMsg = '未选中任何成员！';
				} else {
					this.dialogMsg = '禁用后，该人员将不能再登录朗致销客手机端，确定将该人员禁用吗？';
				}
			 },

			//左侧tree点击刷新列表
			refreshList(p1, p2, p3, p4, p5) {
				
				console.log("id--"+p1,"treeName--"+ p2, "pid--"+p3, "isLeafTree--"+ p4, "lev"+p5)
				this.addPresonFlag = false, //添加人员编辑人员
				this.$refs.detailDialog.hide();
				this.changDeptBtnFlag = false //修改弹框和导出弹框区分
				this.handleDept = false;
				this.isActive = 0;
				this.rightShow = true;
				this.id = p1,
				this.treeName = p2,
				this.pid = p3,
				this.isLeafTree = p4,
				this.lev = p5,
				this.getCountByTreeId()
				this.getData(p1, this.pageIndex, this.pageSize,this.name, this.isDeposit, this.status, this.position, this.departmentId);
			},
				//左侧tab切换
			changeTab: function(x) {
				this.isActive = x
				if(x == 1) {
					this.$refs.detailDialog.hide();
					this.handleDept = true;
					this.addPresonFlag = false, //添加人员编辑人员
					this.serchList = false, //tree搜索列表
					this.rightShow = false; //右侧列表
				} else {
					
					this.handleDept = false;
					this.rightShow = true;
				}
			},

			//左侧搜索
			inputChangSearch() {
					this.addPresonFlag = false, //添加人员编辑人员
					this.serchList = false, //tree搜索列表
					this.changDeptBtnFlag = false //修改弹框和导出弹框区分
				if(this.inputSearch == '') {
					console.log(this.isDeposit, this.position, this.departmentId)
					this.getData(0, this.pageIndex, this.pageSize);
					this.rightShow = true;
					this.serchList = false;
					this.addressTreeShow = true;
					return false;
				} else {
					selectOrgTree({
						'name': this.inputSearch
					}).then(res => {
						if(res.data.code == 1) {
							this.orgTreeList = res.data.data.orgTreeList
							this.userInfoList = res.data.data.userInfoList
							this.rightShow = true;
							this.serchList = true;
							this.addressTreeShow = false;
							console.log(res.data.data)
						} else {
							alert(res.data.msg)
						}
					})
				}

			},
			//头部数量
			getCountByTreeId() {
				getCountByTreeId({
					'treeId': this.id
				}).then(res => {
					if(res.data.code == 1) {
						this.personCount = res.data.data
					}
				})
			},
			//获取列表
			getData(id, pageIndex, pageSize, name, isDeposit, status, position, departmentId) {
				addressListTree({
					'id': id,
					'pageIndex': pageIndex,
					'pageSize': pageSize,
					'name': name,
					'isDeposit': isDeposit,
					'status': status,
					'position': position,
					'departmentId': departmentId
				}).then(res => {
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
			//点击分页
			updataPage(val) {
				this.pageSize = val.pageSize;
				this.pageIndex = val.pageIndex;
				this.getData(this.id, this.pageIndex,this.pageSize, this.nameSearch, this.isDeposit, this.statusAll, this.position, this.departmentId);
			},
			//全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//查询
			search() {
				this.getData(this.id, 1, this.pageSize, this.nameSearch, this.isDeposit, this.statusAll, this.position, this.departmentId);
			},
			//详情
			handleDetail(row) {
				this.depositImg = '', this.idCardImg = '', this.applicationImg = '',
				this.datailArr = [];
				this.rightShow = false;
				this.handleDept = false;
				this.sendId = row.id;
				this.userId = row.id;
				addressDetail({
					"id": row.id
				}).then(res => {
					console.log(res.data.data.position)
					if(res.data.code == 1) {
						this.datailEditArr = res.data.data;
						console.log(res.data.data)
						switch(res.data.data.isDeposit) {
							case 1:
								res.data.data.isDeposit = "是";
								break;
							case 2:
								res.data.data.isDeposit = "否";
								break;
						}
						switch(res.data.data.status) {
							case 0:
								this.delBtnShow = false;
								this.forbiddenBtnShow = false;
								res.data.data.status = "删除";
								break;
							case 1:
								this.delBtnShow = false;
								this.forbiddenBtnShow = false;
								res.data.data.status = "正常";
								break;
							case 2:
								this.delBtnShow = false;
								this.forbiddenBtnShow = true;
								res.data.data.status = "禁用";
								break;
							case 3:
								this.delBtnShow = true;
								this.forbiddenBtnShow = false;
								res.data.data.status = "离职";
								break;
						}
						this.datailArr = res.data.data;

					}

				})
				this.$refs.detailDialog.show();
			},

			formatterPerson(row, column) {
				switch(row.isDeposit) {
					case 0:
						return '否';
						break;
					case 1:
						return '是';
						break;
				}
			},
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
					case 3:
						return '离职';
						break;
				}
			},
			formatterPosition(row, column) {
				switch(row.position) {
					case 3:
						return '县区经理';
						break;
					case 4:
						return '地区经理';
						break;
					case 5:
						return '省区经理';
						break;
					case 10:
						return '省办人员';
						break;

				}
			},
			formatterDept(row, column) {
				switch(row.departmentId) {
					case 0:
						return '顶级部门';
						break;
					case 1:
						return '心脑事业部';
						break;
					case 2:
						return '风湿及骨科事业部';
						break;
					case 3:
						return '云事业部';
						break;
					case 4:
						return '消化事业部';
						break;

				}

			},

			//修改部门名称弹框确定
			topDialogBtnTrue() {
				if(this.dailogTitleType == '修改部门名称：') {
					
					if(this.deptNameChange == '') {
						alert('请输入部门名称')
						return false;
					}
					else if(this.deptNameChange.length > 100){
						alert('部门名称不能超过100字')
						return false;
					}
					else {
						this.updateOrgTree()
					}

				} else if(this.dailogTitleType == '添加子部门：') {
					if(this.deptNameChange == '') {
						alert('请输入部门名称')
						return false;
					} 
					else if(this.deptNameChange.length > 100){
						alert('部门名称不能超过100字')
						return false;
					}
					else {
						this.insertOrgTree()
					}
				} 				
				else {
					if(this.tableData.length == 0 && this.isLeafTree) {
						this.deleteOrgTree()
					} else {
						this.topDialogVisible = false;
					}

				}
			},

			//添加子部门
			insertOrgTree() {
				insertOrgTree({
					'name': this.deptNameChange,
					'pid': this.id,
					'lev': this.lev + 1
				}).then(res => {
					if(res.data.code == 1) {
						this.sendTreeChildName = this.deptNameChange;
						this.topDialogVisible = false;
					} else {
						alert(res.data.msg)
					}
					this.sendTreeChildName = this.deptNameChange;
					console.log(res)
				})
			},
			//部门删除
			deleteOrgTree() {
				console.log(this.pid)
				
				deleteOrgTree({
					'id': this.id,
					'pid': this.pid
				}).then(res =>{
					this.getData(1, this.pageIndex, this.pageSize);
					this.topDialogVisible = false;
				})
			},

			//修改名称弹框确定
			updateOrgTree() {
				updateOrgTree({
					'id': this.id,
					'name': this.deptNameChange
				}).then(res => {
					if(res.data.code == 1) {
						this.sendTreeName = this.deptNameChange;
						this.topDialogVisible = false;
					} else {
						alert(res.data.msg)
					}
				})
			},

		}

	}
</script>

<style>
	/*.content-container {
		overflow: hidden !important;
	}*/

	.addressBook {
		position: absolute;
		left: 2.2rem;
		top: 10px;
		right: 0;
		bottom: 0;
		background: #f0f2f5;
		overflow: hidden !important;
	}

	.addressBook .addressBook_left {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 19%;
		border-right: 1px solid #e5e5e5;
	}

	.addressBook .addressBook_left .addressBook_search {
		position: relative;
	}

	.elDialogAddress .el-input {
		width: 150px;
	}

	.addressBook .addressBook_left .addressBook_search .el-input {
		width: 90%;
	}

	.addressBook .addressBook_left .addressBook_search .serchList {
		width: 100%;
		background: white;
		position: absolute;
		z-index: 999;
	}

	.addressBook .addressBook_left .addressBook_search .serchList .searchTitle {
		height: 34px;
		line-height: 34px;
		background: #fff;
		color: #1f5dbc;
		font-size: 16px;
		padding-left: 21px;
		margin-top: 20px;
	}

	.addressBook .addressBook_left .addressBook_search .serchList li {
		height: 34px;
		line-height: 34px;
		background: #fff;
		color: #666;
		font-size: 14px;
		padding-left: 54px;
		cursor: pointer;
	}

	.addressBook .addressBook_left .addressBook_tab {
		padding-top: 10px;
	}

	.addressBook .addressBook_left .addressBook_tab ul {
		display: flex;
	}

	.addressBook .addressBook_left .addressBook_tab ul li {
		flex: 1;
		display: flex;
		justify-content: center;
		line-height: 34px;
		cursor: pointer;
		font-size: 14px;
		color: #aaa;
		border-bottom: 1px solid #aaa;
	}

	.addressBook .addressBook_left .addressBook_tab ul .active {
		color: #fff;
		background: #e02222;
	}

	.addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel {
		float: left;
		height: 34px;
		cursor: pointer;
	}

	.addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel img {
		display: block;
		padding: 7px 0 0 14px;
	}

	.addressBook .addressBook_left .addressBook_tab .addressBook_addDepartmentOrLabel .img_addLabel {
		display: none;
	}

	.addressBook .addressBook_left .addressBook_tab .addressBook_zTree {
		position: absolute;
		top: 149px;
		left: 20px;
		right: 0;
		bottom: 0;
	}

	.addressBook .addressBook_right {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 80%;
		overflow-y: auto;
		background: #fff;
		border-left: 1px solid #e5e5e5;
	}

	.addressBook .addressBook_right .addressPersonSituation {
		margin: 50px;
		display: block;
		font-size: 16px;
		color: #666;
	}

	.addressBook .addressBook_right .addressPersonSituation h4 {
		padding: 5px 10px;
	}

	.addressBook .addressBook_right .addressPersonSituation h3 {
		padding: 5px;
	}

	.addressBook .addressBook_right .addressHandleDept {
		width: 600px;
		display: flex;
		justify-content: space-around;
	}

	.addressBook .addressBook_right .addressHandleDept li {
		padding: 0 0.3rem;
		background: #e02222;
		border-radius: 3px;
		height: 36px;
		color: #fff;
		font-size: 14px;
		border: none;
		line-height: 36px;
		cursor: pointer;
		margin-right: 10px;
	}

	.addressBook .addressBook_right .addressBook_addPreson {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		padding-left: 26px;
		background: #fff;
		
		z-index: 2;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul {
		padding-bottom: 100px;
	
	}

	.addressBook .addressBook_right .addressBook_addPreson ul .addFooter {
		padding: 20px 0 10px 80px;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul .addFooter .el-button-close {
		padding: 0 0.3rem;
		background: #eee;
		border-radius: 3px;
		height: 36px;
		color: #666;
		font-size: 14px;
		border: none;
		line-height: 36px;
		cursor: pointer;
		margin-left: 20px;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul li {
		padding: 10px;
		line-height: 40px;
		color: #666;
		font-size: 14px;

	}
	
	.addressBook .addressBook_right .addressBook_addPreson ul li .uploadBtn{
		width: 100px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.addressBook .addressBook_right .addressBook_addPreson .el-input,
	.addressBook .addressBook_right .addressBook_addPreson .el-select {
		width: 190px;
		margin-right: 10px;

	}

	.addressBook .addressBook_right .addressBook_addPreson ul li .el-upload--picture-card {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul li .addPreson_left {
		display: inline-block;
		float: left;
		width: 165px;
		color: #666;
		margin-right: 18px;
	
		text-align: right;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul li .colorE02222 {
		color: #e02222;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul li .change {
		padding: 0 10px;
		color: #2e68c0;
	}

	.addressBook .addressBook_right .addressBook_addPreson ul li .deptBg {
		line-height: 0;
		margin: 0;
		width: 16px;
		height: 16px;
		display: inline-block;
		vertical-align: middle;
		border: 0 none;
		cursor: pointer;
		outline: none;
		background-color: transparent;
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-image: url(../../../assets/images/zTreeStandard.png);
		background-position: -110px -1px;
	}

	.addressBook .addressBook_right .addressBook_rightMain {
		width: 100%;
	}

	.addressBook .addressBook_right .table_wrap {
		overflow-y: auto !important;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe {
		padding: 16px 26px;
		display: flex;
		justify-content: space-between;
		/*border-bottom:1px solid #e5e5e5;*/
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe .addressBookTitle {
		display: block;
		float: left;
		font-size: 16px;
		color: #666;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe ul .addressBookOpe {
		color: #1f5dbc;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe ul .addressBookOpe_addChild {
		border-left: 1px solid #1f5dbc;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe ul .addressBookOpe_cancel {
		border-left: 1px solid #1f5dbc;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_departmentOpe ul li {
		float: left;
		padding: 0 14px;
		cursor: pointer;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_memberOpe {
		padding: 0 26px;
		display: flex;
		flex-direction: column;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_memberOpe .line {

		display: flex;
		align-items: center;
	}
	/*style='color:#B9BDC6'*/

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_memberOpe .line .el-input,
	.addressBook .addressBook_right .addressBook_rightMain .addressBook_memberOpe .line .el-select {
		width: 150px;
		margin-right: 10px;
	}

	.addressBook .addressBook_right .addressBook_rightMain .addressBook_memberOpe .line .addressBook_memberOpeIpt {
		float: left;
		width: 110px;
		line-height: 32px;
		text-align: center;
		margin-right: 40px;
		border-radius: 3px;
		border: 1px solid #e5e5e5;
		background: #eee;
		font-size: 14px;
		color: #666;
		cursor: pointer;
	}
</style>
