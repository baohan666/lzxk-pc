<template>
	<div>
		<el-dialog title="提示" :visible.sync="dialogHintVisible" :append-to-body='true' width="35%">
			<div class= 'dialog_body_content'>
				<div class="prompText">{{promptMsg}}</div>
			</div>
			<div v-if="sureIshow" slot="footer" class="dialog-footer">
				<span class="dialog-sure-btn dialoperateBtn" @click="iSure()">确定</span>
			</div>
		</el-dialog>			
	</div>	 
</template>

<script>
 export default {
    data() {
      	return {
			dialogHintVisible: false
      	};
    },
    props: ["promptMsg", "sureIshow"],
    computed:{
    	
    },
    created(){

    },
    methods: {
    	//弹窗展示
    	dialogShow(){
			this.dialogHintVisible=true;
		},
		//弹窗隐藏
		dialogHide(){
			this.dialogHintVisible=false;
		},
		iSure(){
			console.log("ppp");
			this.$emit('isSureClose');
		}
    }
  };
</script>
<style lang="scss" scoped="scoped">
	.dialog_body_content{
		.prompText{
			color:#333;
			text-align: center;
			line-height: 110px;
		}
	}
	
</style>
