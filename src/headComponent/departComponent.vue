<template>
	<div>
		<el-form-item :label="departMsg">
			<el-select v-model="departmentId"  placeholder="请选择事业部" @change="selectOperate">	
			    <el-option label="请选择事业部" value=''></el-option>		     		    			  					    			    	
			    <el-option v-for="(item,key,index) in departmentMenu" :label="item" :value="key" :key="index"></el-option>		     
			</el-select>
		</el-form-item>	
	</div>
</template>

<script>
    import {getStore,setDepartment} from 'src/config/cache'
	
	export default{
		props: ["departMsg"],
		data(){
			return{
				departmentId: '',
				departmentMenu: []
			}
		},
		created(){
			this.init();
		},
		methods: {
			//初始化加载省地县数据并缓存；
			init(){
				console.log(this.$props.departMsg);
				 if(getStore('departmentMenu')) {
			          this.departmentMenu = JSON.parse(getStore('departmentMenu'));
			        }else{
			          this.departmentMenu = setDepartment();
			          
			        }; 
				
			},
			selectOperate($val){
				this.$emit('selectSuccess',$val)
          			
			}
			
		}
	}
	
	
</script>

<style>
</style>