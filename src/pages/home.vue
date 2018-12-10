<template>
	<div>
		<el-row class="container">
  	<!--头部导航-->
    <el-col :span="24" class="topbar-wrap">
    	<div class="topbar_logo">
    		logo
    		<div class="topbar_logo_wraper">
    			<img src="../assets/images/logo.png">
    		</div>
			</div>
      <div class="topbar-title">
        <el-row>
          <el-col :span="24">
            <el-menu
            	class="el-menu-demo"
            	mode="horizontal"
            	router >
              <el-menu-item
              	v-for="(topNavMenulist,index) in navMenulist"
              	:index="topNavMenulist.child[0].path"
              	:key="index"
				:class="activeIndexTop==index?'is-active':''"
              	@click="changeMenuTop(index)">
              	{{topNavMenulist.name}}
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      	<div class="topbar-account topbar-btn">
          	<span class="el-dropdown-link userinfo-inner">
            	{{accountName}}
            <font>|</font>
            <i class="el-icon-remove-outline" @click="closeAccount()"></i>
          </span>
      </div>
  </el-col>

    <el-col :span="24" class="main">
    	<!--左侧部分-->
		    <aside class="showSidebar">
			    <!--导航菜单-->
			    <div class="tac">
			    	 <el-row>
				  <el-col :span="24">
				    <el-menu
				    	class="el-menu-vertical-demo"
				      router>
				       <el-menu-item
				       	v-for='(leftNavMenulist,index) in navMenuleft'
				       	:index="leftNavMenulist.path"
				       	:class="$route.path===leftNavMenulist.path?'is-active':'unActive'"
				       	:key="index">
				        <i class="active_icon"></i>
				        <span @click="leftNavMenuClick(leftNavMenulist)">{{leftNavMenulist.name}}</span>
				        <i class="el-icon-caret-left"></i>
				      </el-menu-item>
				    </el-menu>
				  </el-col>
				</el-row>
			    </div>

		  </aside>
		  <!--右侧部分-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
        	<el-row class="el-row-content">
	          <el-col :span="24" class="content-wrapper">
	            <router-view></router-view>
	          </el-col>
          </el-row>
        </div>
      </section>
    </el-col>
  </el-row>
  <promptDialog ref="loginOutDialog" sureIshow="true" @isSureClose="isSureClose" promptMsg = "你确定要退出登录吗?"></promptDialog>
	</div>

</template>
<script>
	import {mapState} from 'vuex';
	import promptDialog from 'components/promptDialog'
  	import {getStore, setStore, removeStore} from 'src/config/cache'
	import {loginOut,nextMenu} from 'src/api/api_user';

 	export default {
		data :function(){
			return{
        leftNavMenuCur:'',
        navMenuleftSelf:0,
				activeIndexTop : 0,//头部菜单激活索引
				dialogVisible: false,//头部菜单激活索引
				"navMenulist" : [],//导航栏数据列表
				'navMenuleft' : [],//左侧数据列表
				accountName :''
			}
		},
		mounted(){
			this.initData();
		},
		components:{
      		promptDialog
   		},

		methods:{
			//点击头部菜单
			changeMenuTop:function(i){
				this.activeIndexTop=i;
				setStore('activeIndexTop',i);
	        	this.navMenuleft = this.navMenulist[this.activeIndexTop].child;
				console.log('this.$route.path',this.$route.path);
				console.log('this.navMenuleft',this.navMenuleft);
			},
			//退出登录
			closeAccount : function (){
				this.$refs.loginOutDialog.dialogShow();
			},
			isSureClose(){
				loginOut({"accountNum": getStore("accountNum")}).then( res =>{
					this.$router.push({path:'login'});
				})

			},
			initData:function(){
				//获取头部导航栏激活索引值
				if (getStore('activeIndexTop')) {
		          	this.activeIndexTop = getStore('activeIndexTop');
		          	this.accountName = getStore('accountName');
		          	console.log("1111111111")
		        }else{
		          	this.activeIndexTop = 0 ;
              console.log("22222")
		        }
				if(getStore('navMenulist')){
          console.log("333")
	        		this.navMenulist =JSON.parse(getStore('navMenulist'));
	        		this.navMenuleft = this.navMenulist[this.activeIndexTop].child;
        		}
			},
			leftNavMenuClick(item){
        this.leftNavMenuCur=item.path;
				console.log(item)
//				nextMenu({id:item.id}).then(res=>{
//					console.log(res)
//					const menuNameDatas= res.data.data; //后台权限
//					const menuArr = document.querySelectorAll('.menu-disable') //当前页面按钮
//					for(let item of menuArr){
//						for(let menuItem of menuNameDatas){
//							//isShow 是否可用
//							if(menuItem.name == item.innerText && menuItem.isShow == 1){
//								item.setAttribute('disabled','disabled');
//								item.classList.add('menu-bg-color');	//common.css
//							}
//						}
//					}
//				})
			}

		}
	}
</script>
<style lang="scss">
	$bgt:transparent;
	@mixin pt($pt,$l,$r,$t,$b,$z){
		position:$pt;
		left:$l;
		right:$r;
		top:$t;
		bottom:$b;
		z-index: $z;
	}
	@mixin float($dir){
		float:$dir;
	}
	@mixin wh($w,$h){
		width:$w;
		height:$h;
	}
	@mixin lineh($h,$lht){
		height:$h;
		line-height:$lht;
	}

	.container{
		width:100%;
		@include pt(absolute,null,null,0,0,100);
	}
	.topbar-wrap{
		background:rgba(45, 45, 45, 0.99);
		height:64px;
		border-bottom:none;
		.topbar_logo{
			@include wh(2.1rem,64px);
			@include float(left);
			.topbar_logo_wraper{
				@include pt(absolute,0,null,0,null,1000);
				padding-top:19px;
				text-align: center;
				background: #3c3c3c;
				@include wh(2.1rem,76px);
				img{
					@include wh(86px,38px);
				}
			}
		}
		.topbar-title{
			@include float(left);
			.el-menu-item{
				@include lineh(64px,64px);
				font-size:16px;
			}

		}
		.topbar-account{
			padding-right:0.3rem;
			@include float(right);
			span,i,font{
				color:#fff;
				line-height: 64px;
			}
			font{padding:0 10px;}
		}
	}
	.el-menu-item,.el-menu,.el-menu span{
		background: $bgt !important;
		color:#fff !important;
		text-align: center;
		border:none;
	}
	.main{
		display:flex;
		@include pt(absolute,null,null,64px,0,100);
		.showSidebar{
			width:2.1rem;
			padding-top:12px;
			box-sizing: border-box;
			background:  #3c3c3c;
			.el-menu-item{
				font-size:14px;
				@include lineh(49px,49px);
			}
			.el-icon-caret-left{
					display: none;
					float:right;
					margin-right: -29px;
    			line-height: 49px;
    			font-size: 22px;
				}
			.el-menu .el-menu-item.is-active{
				background:rgba(85, 81, 81, 0.98) !important;
				color:#fff !important;
				.active_icon{
					float:left;
					display: inline-block;
					@include wh(5px,50px);
					border-radius:5px;
					background:#e02222;
					margin-left:-20px;
				}
				.el-icon-caret-left{
					display: block;
				}
			}
      .el-menu .el-menu-item.unActive{
        background:none !important;
        color:#fff !important;
        .active_icon{
          display: none;
        }
        .el-icon-caret-left{
          display: none;
        }
      }
		}
		.content-container {
	    background: #f6f7fb;
	    -ms-flex: 1;
	    -webkit-box-flex: 1;
	    flex: 1;
	    overflow-y: auto;
	    padding : 0 20px;
	    padding-bottom: 1px;
		}
	}

	.topbar-title .el-menu--horizontal .el-menu-item:hover{
	  background-color: $bgt;
	}
	.showSidebar .el-menu-vertical-demo .el-menu-item:hover{
		background-color: $bgt;
	}
	.el-menu--horizontal .el-menu-item.is-active{
		background:#e02222 !important;
		color:#fff !important;
		border-bottom: none;
	}
</style>
