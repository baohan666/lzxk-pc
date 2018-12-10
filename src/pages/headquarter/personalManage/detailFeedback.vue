<template>
	<div>
		<div class='goBackWraper clear'>
			<span>朗致销客</span>
			<div class='backBtn'>返回</div>
		</div>	
		<div class="infoDetail">
			<span>{{infoList.name}}</span>
			<span>{{infoList.orgTree}}</span>
			<span>{{infoList.position}}</span>
			<span>提交人电话：{{infoList.mobile}}</span>
			<span>问题所属诊所：{{infoList.clinicName}}</span>
			<span>诊所电话：{{infoList.ClinicPhone}}</span>			
			<span>编号：{{infoList.number}}</span>		
			<span>提交时间：{{infoList.createDate}}</span>
			<span>问题分类：{{infoList.problemType}}</span>
		</div>
		<div class="advice_question">
			<h3>问题详述：</h3>
			<p>{{infoList.problemDescription}}</p>
			<h3>意见/建议</h3>
			<p>{{infoList.advice}}</p>
		</div>
		
	</div>
	
</template>
<script>
  import {getFeedbackDetail} from 'src/api/headquarter_url/personManage';	
	
  export default {
  	name : 'detailFeedbackZB',
    data() {
      return {
        /*name:''//提交人
        ,orgTree:''//所属事业部
        ,position:''//职位
        ,createDate:''//提交时间
        ,number:''//编号
        ,mobile:''//提交认电话
        ,problemType:''//问题类型
        ,problemDescription:''//问题描述
        ,advice:''//建议
        ,clinicName:''//问题所属诊所
        ,ClinicPhone:''//诊所电话
        ,createDate:''//创建时间*/
       infoList:[]      
      }
    },
    mounted(){
		this.initData()
	},
    methods: {
       initData:function(){
       	const this_=this;
	        getFeedbackDetail({id: this.$route.query.id}).then(function(res){
//				console.log(res.data.data);
				this_.infoList=res.data.data;
	        })
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
	}
}
.infoDetail{
	padding:20px 30px;
	border-bottom:1px solid #ddd;
	span{
		padding-right:15px;
		font-size:14px;
		color:#333;
		line-height:40px;
	}
	background:#fff;	
}
.advice_question{
	margin:30px;
	padding:20px;
	background:#fff;
	color:#666;
	h3{
		font-size:16px;
		color:#333;		
	}
	p{
		padding:20px 30px;
		font-size:14px;
	}	
}
	
</style>