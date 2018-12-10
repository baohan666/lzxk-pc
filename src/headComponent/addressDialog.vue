<template>
	<el-dialog title='提示' :visible.sync="delVisible" :append-to-body='true' left id='addressDialog' width='490px' height='250px'>
		<div class="textTip">
			{{delMsg}}
		</div>
		<span slot="footer">		
				<button @click="btnTrue()" class="el-button-red">确定</button>
		</span>
	</el-dialog>

</template>

<script>
	import {
		deleteUserInfo, //人员删除
		forbiddenOrStart, //批量禁用启用
	} from 'src/api/headquarter_url/addressList';

	export default {
		name: 'addressDialog',
		components: {
			
		},

		props: [
			'delMsg', 'multipleSelection', 'nowId'
		],

		data() {
			return {
				ids: '',
				idArr: [],
				flag: true,
				delVisible:false,			
			}
		},
		methods: {
			show(){
				this.delVisible = true;
			},
			hide(){
				this.delVisible = false;
			},
			
			btnTrue() {
				this.idArr = [];
				this.multipleSelection.forEach(item => {
					this.idArr.push(item.id)
				})
				if(this.delMsg == '禁用后，该人员将不能再登录朗致销客手机端，确定将该人员禁用吗？') {			
					this.forbiddenOrStart(this.idArr.toString(),2)
				} else if(this.delMsg == '启用后，该人员可登录朗致销客手机端，确认将该人员启用吗？') {	
					this.forbiddenOrStart(this.idArr.toString(),1)
				} else if(this.delMsg == '删除后，成员的企业微信消息记录将完全被清除。') {
					this.deleteUserInfo(this.idArr.toString())
				} else {
					this.delVisible = false;
				}

			},


			//人员禁用启用
			forbiddenOrStart(idA,status) {
				forbiddenOrStart({
					"ids": idA,
					'status': status
				}).then(res => {
					if(res.data.code == 1) {
						this.$emit('deleteSuccess')
					} else {
						alert(res.data.msg)
					}
				})
			},

			//删除
			deleteUserInfo(idA) {
				deleteUserInfo({
					"ids": idA
				}).then(res => {
					if(res.data.code == 1) {
						this.$emit('deleteSuccess')
					} else {
						alert(res.data.msg)
					}
				})
			},
		},

	}
</script>

<style>
	#dialog .el-dialog {
		width: 490px;
		height: 250px;
	}
	
	.textTip {
		line-height: 50px;
		margin-top: 50px;
		text-align: center;
	}
	
	.el-button-red {
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
</style>