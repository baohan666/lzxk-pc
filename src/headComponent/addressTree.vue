<template>
	<div id="addressTree">
		<el-tree ref="tree" 
			:props="props1" 
			:load="loadNode1" 
			node-key="id" 
			:highlight-current="true" 
			@node-click="handleNodeClick" 
			@node-expand='handleNodeExpand' 
			:default-expanded-keys="arr"
			show-checkbox lazy
			class='addressTree'
			>
		</el-tree>
	</div>

</template>

<script>
	import { addressList } from 'src/api/headquarter_url/addressList';

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
				arr:[]
			};
		},

		mounted: function() {
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
				console.log(newValue, oldValue)
////				this.$refs.tree.reload();
////				console.log(newValue, oldValue)
////				this.$refs.tree.reload();
//				
////				this.arr.push(newValue)
////				this.$refs.tree.updateKeyChildren(newValue,this.treeFir)
//				//		    	console.log(this.$refs.tree.getCurrentData())
//				//		    	this.$refs.tree.updateKeyChildren(keys,this.treeFir)
//				//		    	const newChild = { id: 12345, label: newValue, children: [] };
//				//		    	this.$refs.tree.getCurrentNode().children.push({ id: 12345, label: 123, children: [] })
//				//		    	const newChild = { id: id++, label: newValue, children: [] };
//				//		    	 if (!this.$refs.tree.getCurrentNode().children) {
//				//		          this.$set(data, 'children', []);
//				//		        }
//				//		    	this.$refs.tree.getCurrentNode().children.push(newChild);		    	
//				//		    	console.log(newValue, oldValue)
//				//		    	this.$refs.tree.getCurrentNode().name = newValue;
			}
		},
		methods: {			
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
//			append(data) {
//				const newChild = {
//					id: id++,
//					label: 'testtest',
//					children: []
//				};
//				if(!data.children) {
//					this.$set(data, 'children', []);
//				}
//				data.children.push(newChild);
//			},
			handleNodeExpand() {
				setTimeout(() => {
					$('.el-tree-node__content .el-checkbox').addClass('disabled')
				}, 1000)

			},
			handleNodeClick(data, node) {
				let self = this;				
				if(data.name == '基础医药中心') {
					this.orderId = 0;
					self.selectTreeId = 1;
				} else {
					this.orderId = data.id;
					self.moveAppendChild = data;
					self.selectTreeId = data.id;
				}
				console.log(data)
				console.log(self)
				this.$emit("streeId", this.orderId, data.name, data.pid, node.isLeaf, data.lev)
			},
			loadNode1(node, resolve) {
				console.log(node)
				if(node.level === 0)
					return resolve([{
						name: '基础医药中心'
					}]);
				if(node.level === 1) {
					addressList({
						"id": 0
					}).then(res => {
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!			        		
					})
				}
				if(node.level === 2) {
					addressList({
						"id": node.key
					}).then(res => {
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})
				}
				if(node.level === 3) {
					addressList({
						"id": node.key
					}).then(res => {						
						setTimeout(() => {
							resolve(res.data.data);
						}, 200); //加载下级数据!	
					})

				}
				if(node.level === 4) {
					addressList({
						"id": node.key
					}).then(function(res) {
						res.data.data.forEach(item => {
							item.leaf = true;
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

		.addressTree {
			height:700px ;
			padding-bottom: 30px;
			overflow-y: auto !important;
		}
		.addressTree .el-tree-node__content {
			height: 40px;
			padding-left: 10px;
		}
		.addressTree .el-checkbox__inner {
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
		.addressTree .el-tree-node__label {
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
		.addressTree .disabled {
			pointer-events: none;
			cursor: default;
		}
		.addressTree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
			background-color: #dbe0e5;
		}

</style>