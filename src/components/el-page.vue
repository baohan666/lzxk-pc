<template>
	<div>
		<el-pagination
		    	v-if="pagin_show"
		    	class="pagination"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageIndex"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="pageSize"
		      layout="sizes, prev, pager, next, jumper,total"
		      :total="totalRecords">
		</el-pagination>
		
	</div>
</template>
<script>
	export default{
		props: {
			pageIndex : {//页数
				type : Number,
				default : 1
			} ,
			pageSize : {//每页大小
				type : Number,
				default : 1
			} ,
			totalRecords : {//总条数
				type : Number,
				default : 1
			},
			totalPageCnt : {//总页数
				type : Number,
				default : 1
			},
			pagin_show : {//是否显示分页
				type : Boolean,
				default : 1
			}
		},
		data(){
			return {}
		},
   		created(){
	    	
	    },
		methods:{			
			//点击更改每页展示条数
			handleSizeChange($val) {
		        this.$emit('clickpage',{pageIndex : this.pageIndex, pageSize : $val});		       
		   	},		    
		    //点击当前页
		    handleCurrentChange($val) {
				this.$emit('clickpage',{pageIndex : $val, pageSize : this.pageSize});	
		    },
	    }
	};
</script>

<style>
</style>