<template>
	<div>
		 
	</div>
</template>

<script>
    import {getStore,setDepartment} from 'src/config/cache'
	
	export default{
		props: {
			
		},
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