<template>
	<div>
		<el-form :model="item" :inline="true" ref="accountRules" :rules="accountRules" class="demo-form-inline">
			<el-row :gutter="20">
				<el-col :span="7">
					<el-form-item label="账号："  prop="accountNumber">
						<el-input v-model="item.accountNumber" v-vue-onkeypress placeholder="请输入账号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="户名："  prop="accountName">
						<el-input v-model="item.accountName" placeholder="请输入户名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="开户银行：" prop="depositBank">
						<el-input v-model="item.depositBank" v-vue-onkeypress placeholder="请输入开户银行"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="账户性质："  prop="accountType2">
						<el-select v-model="item.accountType2" placeholder="请选择账户性质">
							<el-option label="公司" value="1" key='1'></el-option>
							<el-option label="个人" value="2" key='2'></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="默认：" :class="getIndex==1?'is-required':''">
						<el-radio :label="getIndex" >&nbsp;</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	export default{
		props: {
			datalist: {
				type: Object
			},
			getIndex: {
				type: Number
			},
      isDefault2: {
        type: Number
      },
		},
		data(){
			return {
				item: this.$props.datalist,
				accountRules: {//校验基本信息
	       			accountNumber: [{required: true,message: '请输入账号',trigger: 'blur'}],
	       			accountName: [{required: true,message: '请输入户名',trigger: 'blur'}],
	       			depositBank: [{required: true,message: '请输入开户行',trigger: 'blur'}],
	       			accountType2: [{required: true,message: '请选择账户类型',trigger: 'change'}],
	       		}
			}
		},
		watch: {
	        datalist(val) {
				this.item = val;
				console.log(val);
	        }

		},
		computed:{

		},
   		created(){
			this.changeIndex();
	    },
		methods:{
			//账户几
			changeIndex(){
				this.item.number= this.$props.getIndex;
			},
			//校验账户信息
			toExamin(){
				let item =this.item;
				this.$refs.accountRules.validate((valid) => {

		        })
			}
	    }
	};
</script>

<style lang="scss" scoped="scoped">

</style>
