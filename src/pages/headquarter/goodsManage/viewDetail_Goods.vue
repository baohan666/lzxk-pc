<template>
	<div>
		<div class='goBackWraper clear'>
			<span>查看商品详情</span>
			<div class='backBtn'>返回</div>
		</div>	
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>物料名称</span>：{{goodsDetai.goodsName}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>物料编码</span>：{{goodsDetai.materialCode}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>生产企业</span>：{{goodsDetai.manufacturer}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>剂型</span>：{{goodsDetai.drugType}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>规格</span>：{{goodsDetai.specsMax}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>包装规格</span>：{{goodsDetai.specsMin}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple"><span>物料类别</span>：{{goodsDetai.category}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>批准文号</span>：{{goodsDetai.licenseNumber}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple"><span>单位</span>：{{goodsDetai.unit}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="10"><div class="grid-content bg-purple"><span>版本号</span>：{{goodsDetai.version}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="2"><div class="grid-content bg-purple"><span>商品图片</span>：</div></el-col>
				  <el-col :span="3" v-for="(item,index) in goodsDetai.imgList" :key="index"><div class="grid-content bg-purple"><img width="100%" :src="item" alt=""></div></el-col>					
				</el-row>
			</div>			
			
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>销售信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="10"><div class="grid-content bg-purple">可销售事业部：{{goodsDetai.departmentIds}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="7"><div class="grid-content bg-purple">省区经理开票价：{{goodsDetai.provincePrice}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple">地区经理开票价：{{goodsDetai.cityPrice}}</div></el-col>
				  <el-col :span="7"><div class="grid-content bg-purple">县区经理开票价：{{goodsDetai.countyPrice}}</div></el-col>
				</el-row>
				
			</div>			
			
		</div>
		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>其他信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
				  <el-col :span="24"><div class="grid-content bg-purple"><span>物料备注</span>：{{goodsDetai.remark}}</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="10">
				  	<div class="grid-content bg-purple">可见范围：
				  		<font class="viewRemark" @click="visualRange">查看</font>
				  	</div>
				  </el-col>
				</el-row>
				
			</div>			
			
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogRangeVisible" :append-to-body='true'>
			<div>
				<span>销售组织：</span>
				<el-radio-group v-model="radio">
				    <el-radio :label="1">心脑事业部</el-radio>
				    <el-radio :label="2">风湿及骨科事业部</el-radio>
				    <el-radio :label="3">云事业部</el-radio>
				    <el-radio :label="4">消化事业部</el-radio>
				</el-radio-group>
			</div>
			<div class="areaWraper">
				<div class="title">
					<el-row  :gutter="20">
						<el-col :span="8">
							<div class="grid-content bg-purple-dark">省区</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple-dark">地区</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple-dark">县区</div>
						</el-col>
					</el-row>
				</div>
				<div class="">
					<el-row :gutter="20">
						<el-col :span="8" class="el-col-group">
							<el-radio-group  v-model="checked1" @change="changeHandler">	    
							    <el-radio v-for="(item,index) in province" :label="item.id" :key="index">{{item.name}}</el-radio>
							</el-radio-group>
						</el-col>
						<el-col :span="8">
							<el-radio-group  v-model="checked2">	    
							    <el-radio v-for="(item,index) in cities" :label="item.isCheck" :key="index" disabled ></el-radio>
							</el-radio-group>
						</el-col>
						<el-col :span="8">
							<el-checkbox-group  v-model="checked3" :min="1">	    
							    <el-checkbox v-for="(item,index) in counties" :label="item.isCheck" :key="index" disabled ></el-checkbox>
							</el-checkbox-group>
						</el-col>
					</el-row>	 
				</div>
			</div>		
				
		</el-dialog>
	</div>	
</template>
<script>
  import {getGoodDetaiData,getVisRangeData} from 'src/api/headquarter_url/goodsManage';
  		
  export default {

    data() {
      return {
       	goodsDetai:{}
       	,dialogRangeVisible:false
       	, radio: 1
       	,dialogTitle: '查看限购区域'
        ,checked1: null
        ,checked2: null
        ,checked3: null
        ,province:[]
        ,cities: []
        ,counties:[]
      }
    },
    mounted(){
		this.initData()
	},
    methods: {
        initData:function(){
       		const this_=this;      
	        getGoodDetaiData({id: this.$route.query.id,type: this.$route.query.type}).then(function(res){
				console.log(JSON.stringify(res.data.data));
				this_.goodsDetai = res.data.data;
	        })
		},
		//查看可见范围
		visualRange:function(){
			let this_=this;
			let datalist={
				depId: this.radio,
				goodsId:  this.$route.query.id
			}
			this.dialogRangeVisible = true;
			getVisRangeData(datalist).then(res =>{
				this_.province = res.data.data.options;
				this_.province.forEach((item,key,index) => {
					if(item.isCheck == 1){
						this_.checked1 = item.id;
						this_.cities = item.children;
						return false;
					}					
				})
			})
		},
		//有无销售人员切换1是无2是有
		changeHandler: function($val){
			console.log($val)
		},
    }
  }
</script>
<style lang="scss">
	.el-col-group{
		.el-radio{
			display: block;
			margin-left:30px;
			line-height: 36px;
		}
	}
</style>

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
.containInfo_wraper{
	margin:20px 30px;

	background:#ffff;
	border:1px solid #e6e6e6;
	.detail_title{	
		padding:0 20px;
		line-height:50px;
		color:#1f5dbc;
		font-size:14px;
		.line_Icon{
			display: inline-block;
			@include wh(4px,14px);	
			vertical-align: middle;
			margin-right:5px;		
			border-radius:20%;
			background:#1f5dbc;
		}
		border-bottom:1px solid #e6e6e6;
	}
	.detail_content{
		padding: 0 29px;
		line-height:49px;
		font-size:14px;
		span{
			display:inline-block;
			width:70px;
			text-align:justify;
			text-align-last:justify;
            text-justify:inter-ideograph;/*IE*/
           text-align-last:inter-ideograph;
		}
		.viewRemark{
			color:#1f5dbc;
		}
		
	}
}
.areaWraper{
	.el-col-group{
		height:400px;
		overflow:auto;	
	}
	
		
}
</style>