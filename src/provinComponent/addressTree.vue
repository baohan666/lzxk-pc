<!--
	省区 通讯录 左侧树 组件
	
-->

<template>
	<div id="addressTree_" >
		<el-tree ref="tree" :props="defaultProps" :data="dataTree1" :load="loadNode22" node-key="id" :highlight-current="true" @node-click="handleNodeClick" @node-expand='handleNodeExpand'  :default-expanded-keys="arr" show-checkbox lazy class='addressTree_'>
		</el-tree>
	</div>

</template>

<script>
	let id = 1000;
	import {
		addressList,
		addressGetOrgTree
	} from 'src/api/province_url/addressList';

	export default {
 
		data() {
			return {
				defaultProps: {
					label: 'name',
					children: 'children',
					isLeaf: 'leaf'
				},
				treeId: '',
				treeName:'',
				lev:'',
				pid:'',
				dataTree1: '',
				treeFir: '1',
				treeSec: '1',
				orderId: '',
				arr: []
			};
		},

		mounted: function() {
			addressList().then(res => {
					const datas= res.data.data
					console.log(datas.id,datas.name,false,datas.pid,datas.lev)
					this.treeId = datas.id;
					this.treeName = datas.name, //treeName 
					this.pid = datas.pid, //
					this.lev = datas.lev, //级别
					this.$emit("streeId", datas.id,datas.name,false,datas.pid,datas.lev)			
			})
			//tree 背景图 不能操作
			$('.el-tree-node__content .el-checkbox').addClass('disabled')
		},
		props: [
			'changeTreeName', 'appendTreeChild'
		],
		watch: {
			changeTreeName(newValue, oldValue) {
				this.$refs.tree.getCurrentNode().name = newValue;
			},
			appendTreeChild(newValue, oldValue) {
				console.log(newValue)
				this.append(newValue)
			}
		},
		methods: {
			append(data,test) {
				const newChild = {
					id: id++,
					label: test,
					children: []
				};
				if(!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			remove(node, data) {
				console.log(node,data)
				const parent = node.parent;
				const children = parent.data.childNodes || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
			//实时更新树  删除 添加子部门
			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span class="custom-tree-node">
		            <span>{node.label}</span>
		            <span>
		              <el-button size="mini" type="text" on-click={ () => this.moveAppend() }>Append</el-button>
		              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
		            </span>
		          </span>);
			},
			childAppend(){
				alert(1)
			},
			handleNodeExpand(data) {
				this.$nextTick(()=>{//下次 DOM 更新循环结束之后执行延迟回调
		 			$('.el-tree-node__content .el-checkbox').addClass('disabled')			    	
				})
			},
			//左侧树点击
			handleNodeClick(data, node) {
				let self = this;
				self.selectTreeId = data.id;
				self.moveAppendChild = data;
				console.log(data)
				console.log(self)
				
				console.log(this.treeId)
				if(node.level == 1) {
					this.$emit("streeId", this.treeId, this.treeName, this.pid, node.isLeaf, this.lev)
				} else {
					this.$emit("streeId", data.id, data.name, data.pid, node.isLeaf, data.lev)
				}
			},
			moveAppend(){
				let self = this;
				self.$set(self.moveAppendChild,'children',[]);
				const newChild = {
					id: id++,
					label: 122222222,
					children: []
				};

				self.moveAppendChild.children.push(newChild);
				
			},
			moveRemove(){
				console.log(this.$refs.tree.getCurrentNode().id)
		
//				let self = this;
//				self.$set(self.moveAppendChild,'children',[]);
//				self.moveAppendChild.children.push(newChild);
			},
			// 树加载
			loadNode22(node, resolve) {
				console.log(node)
				if(node.level === 0) {
					addressList().then(res => {
						if(res.data.code == 1) {
							setTimeout(() => {
								resolve([{
									'name': res.data.data.name
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
<style>
	.addressTree_ {
		height: 800px;
		overflow-y: auto !important;
	}
	
	.addressTree_ .el-tree-node__content {
		height: 40px;
		padding-left: 10px;
	}
	
	.addressTree_ .el-checkbox__inner {
		line-height: 0;
		margin: 0;
		width: 16px;
		height: 16px;
		padding: 3px;
		border: 1px solid #000;
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
		z-index: 100;
	}
	
	.addressTree_ .el-tree-node__label {
		padding: 2px 5px;
		margin: 0;
		cursor: pointer;
		line-height: 25px;
		color: #333;
		background-color: transparent;
		text-decoration: none;
		vertical-align: top;
		display: inline-block;
		/*background-color:#ebeefb;*/
		border-radius: 2px;
	}
	
	.addressTree_ .disabled {
		pointer-events: none;
		cursor: default;
	}
	
	.addressTree_ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
		background-color: #dbe0e5;
	}
</style>