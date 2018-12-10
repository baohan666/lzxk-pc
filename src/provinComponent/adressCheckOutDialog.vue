<!--
	省区  通讯录 导出 组件
	
-->


<template>
	<div id>
		<el-dialog title='请选择部门:' :visible.sync="checkOutVisible" :append-to-body='true'  left id='checkOutDialog'>
			<div class="dialogBody">
				<div class="dialogBodyRight">
				<el-input v-model="inputSearch" v-on:input='inputSearchM()' placeholder="请输入内容">
					<el-button slot="append" icon="el-icon-search">
					</el-button>
				</el-input>
			<ul class="serchList" v-show="serchList">
				<div class="searchTitle">部门:</div>
				<li v-show="orgTreeList==''" >无</li>
				<li v-for="item in orgTreeList" @click="checkList(item)">
					{{ item.name }}
				</li>
				<div class="searchTitle">人员:</div>
				<li v-show="userInfoList==''">无</li>
				<li v-for="item in userInfoList" @click="checkList(item)">
					{{ item.name }}
				</li>
			</ul>
			<el-tree ref="tree" :props="props1" :load="loadNode1" node-key="id" :highlight-current="true" show-checkbox @node-click="handleNodeClick" @node-expand='handleNodeExpand' lazy>
			</el-tree>
			</div>
				<div class="splitSolid">
					<span></span>
				</div>
			
				<div class="checkDept">
					<div>已经选择的部门</div>
					<ul class="checkDeptList" v-show="checkDeptShow">
						<li v-for="(item,index) in checkDeptList">
							{{ item }}	<img @click="removeCheck(item,index)" src="../assets/images/pc_chahao.png" alt="" />
						</li>			
					</ul>
				</div>
			</div>
			
			<span slot="footer">		
				<span @click="checkOut()" class="el-button-red">确定</span>
			</span>
		</el-dialog>
	</div>

</template>

<script>

	import { selectOrgTree,addressList,outputUserInfo,addressGetOrgTree } from 'src/api/province_url/addressList';

	export default {

		data() {
			return {
				props1: {
					label: 'name',
					children: 'zones',
					isLeaf: 'leaf'
				},
				treeFir: '1',
				treeSec: '1',
				orderId: '',
				inputSearch:'',
				orgTreeList: '',
				userInfoList: '',
				checkDeptList:[],
				serchList:false,
				checkDeptShow:true,
				checkOutVisible:false,
				idArr:[],
				treeId:''
			};
		},
		props: [   
      		'changDeptBtnFlag'
        ],  
		mounted: function() {
			addressList().then(res => {
					console.log(res)
					this.treeName = res.data.data.id
					this.treeId = res.data.data.id
					
				})
			setTimeout(function(){
					this.checkDeptList = [];
					$('.el-checkbox').addClass('disabled')	
				},1000)
		},
		methods: {
			handleNodeExpand(){
				setTimeout(function(){
					$('.el-checkbox').addClass('disabled')	
				},1000)
					
			},
			show(){
				this.checkOutVisible =true;
			},
			getTreeId(){
				
			},
			
			checkOut(){
				if(this.idArr.length == 0) {
					alert('请选择部门')
				}else {
					if(this.changDeptBtnFlag) {
						this.$emit('checkOutsuccess', this.idArr, this.checkDeptList, false);
						this.checkOutVisible =false;
					} else {
						this.outputUserInfo();
						this.checkOutVisible =false;
					}
				}
			},
		
			//导出
			outputUserInfo() {
				
				outputUserInfo({
					'ids': this.idArr.toString()
				}).then(function(res) {
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
			inputSearchM() {
				if(this.inputSearch == '') {
					this.serchList = false;
					return false;
				}else{					
					selectOrgTree({
						'name': this.inputSearch
					}).then(res=> {
						if(res.data.code == 1) {
							this.orgTreeList = res.data.data.orgTreeList
							this.userInfoList = res.data.data.userInfoList
							this.serchList = true;
							console.log(res.data.data)
						}
					})
				}
				
			},
			//搜索框 changDeptBtnFlag true 时 添加人员修改事业部 ，false 时 导出功能
			checkList(item){
				if(this.changDeptBtnFlag){
						this.checkDeptList = [];
						this.idArr = [];
						if(this.checkDeptList.includes(item.name)||this.checkDeptList.length>0){
							return false
						}else{
							this.checkDeptList.push(item.name)
							this.idArr.push(item.id)
						}			
					}else{
						if(this.checkDeptList.includes(item.name)){
							return false
						}else{
							this.checkDeptList.push(item.name)
							this.idArr.push(item.id)
						}			
					}
					
			},
			//选中添加右侧列表
			handleNodeClick(data, node) {
				if(this.changDeptBtnFlag){
						this.checkDeptList = [];
						this.idArr = [];
						if(this.checkDeptList.includes(data.name)||this.checkDeptList.length>0){
							return false
						}else{
							this.checkDeptList.push(data.name)
							this.idArr.push(data.id)
						}			
					}else{
						if(this.checkDeptList.includes(data.name)){
							return false
						}else{
							this.checkDeptList.push(data.name)
							this.idArr.push(data.id)
						}			
					}
					
			},
			//移除选中
			removeCheck(item,index){
				console.log(item,index)
				this.checkDeptList.splice(index,1)
				this.idArr.splice(index,1)
			},
			loadNode1(node, resolve) {
				if(node.level === 0) {
					addressList().then(res => {
						if(res.data.code == 1) {
							setTimeout(() => {
								resolve([{
									'name': res.data.data.name,
									'id':res.data.data.id
								}]); // tree 初始化
							}, 200); //加载下级数据!	
						}
					})
				}
				if(node.level === 1) {
					//点击加载树的下一级调用
					addressGetOrgTree({
						"id": this.treeId
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
					addressGetOrgTree({
						"id": node.key
					}).then(res => {

						res.data.data.forEach(item => {
							item.leaf = true; //控制左侧箭头显示
						})
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}

			}
		}
	};
</script>



<style lang="scss">
	.dialogBody {
		height: 450px;
		display: flex;
		flex-direction: row;
		.dialogBodyRight {
			width: 350px;			
			padding: 0 15px;
		}
		.serchList {
			width: 350px;	
			background: white;
			position: absolute;
			z-index: 999;
			.searchTitle {
				height: 34px;
				line-height: 34px;
				background: #fff;
				color: #1f5dbc;
				font-size: 16px;
				padding-left: 20px;
			}
			li {
				height: 34px;
				line-height: 34px;
				background: #fff;
				color: #666;
				font-size: 14px;
				padding-left: 54px;
				cursor: pointer;
			}
		}
		
		
		
	}
	
	.dialogBody .splitSolid {
		display: block;
		padding: 20px;
		width: 30px;
		height: 400px;
		text-align: center;
	}
	
	.dialogBody .splitSolid span {
		display: block;
		width: 1px;
		height: 400px;
		background: #e5e5e5;
	}
	
	#checkOutDialog .el-dialog {
		width: 750px;
		height: 600px;
		.el-button-red{
		    padding: 10px 20px;
		}
	}
	
	#checkOutDialog .el-dialog .el-input {
		width: 100%;
		margin: 10px 0;
	}
	
	#checkOutDialog .el-dialog .el-tree {
		width: 350px;
		height: 400px;
		overflow-y: auto !important;
	}
	
	#checkOutDialog .el-dialog .el-tree .el-tree-node__content {
		height: 40px;
		padding-left: 10px;
	}
	
	#checkOutDialog .el-dialog .el-tree .el-icon-caret-right {
		display: inline-block;
		border: 0 none;
		cursor: pointer;
		outline: none;
		font-size: 12px;
	}
	
	#checkOutDialog .el-dialog .el-tree .el-tree-node__label {
		padding: 2px 5px;
		margin: 0;
		cursor: pointer;
		color: #333;
		background-color: transparent;
		text-decoration: none;
		vertical-align: top;
		display: inline-block;
		border-radius: 2px;
	}
	
	.el-tree .disabled {
		pointer-events: none;
		cursor: default;
	}
	
	#checkOutDialog .el-dialog .el-tree .el-checkbox__inner {
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
		background-image: url(../assets/images/zTreeStandard.png);
		background-position: -110px -1px;
	}
	
	#checkOutDialog .checkDept {	
		margin-top: 20px;	
		width: 350px;
	}
	
	#checkOutDialog .checkDept .checkDeptList {
		border-top: 1px solid #e5e5e5;
		width: 300px;
		margin: 10px 0px;
	}
	
	#checkOutDialog .checkDeptList li {
		width: 100%;
		padding: 10px 14px;
		cursor: pointer;
	}
	
	#checkOutDialog .checkDept .checkDeptTitle {
		margin-top: 20px;
	}
	
	#checkOutDialog .checkDept .checkDeptList img {
		float: right;
		vertical-align: center;
		cursor: pointer;
	}
	
</style>