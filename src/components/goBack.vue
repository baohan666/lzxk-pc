<template>
	<div>
		<div class='goBackWraper clear'>
			<span>{{title}}</span>
			<div class='backBtn' @click="goback">返回</div>
		</div>
	</div>
</template>

<script>
	import {goBack} from 'src/components/goBack';

  	export default {
		props:{
	    	title:{
	    		type:String
	    	}
	    },
	    data() {
	      return {

	      }
	    },
	    created(){

		},
	    methods: {
	        goback(){
	        	this.$router.go(-1);
	        }
	    }
  	}
</script>

<style lang="scss" scoped="scoped">
	@mixin ft($dirc){
		float:$dirc;
	}
	@mixin wh($w,$h){
		width:$w;
		height:$h;
		line-height: $h;
	}
	.goBackWraper{
		span{
			@include ft(left);
			line-height:40px;
		}
		.backBtn{
			@include wh(90px,40px);
			@include ft(right);
		    text-align: center;
		    background: #fff;
		    font-size: 18px;
		    color: #e02222;
		    border-radius: 2px;
        cursor: pointer;
		}
	}
</style>
