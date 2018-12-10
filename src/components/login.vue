<template>
	<div>
		<div class="containWrap">
			<img src="../assets/images/loginLogo.jpg" alt="" class="loginLogo">
			<div class="loginMoudle">
				<div class="loginForm">
					<el-form ref="AccountForm" :model="account" :rules="rules" label-width="85px" class="demo-ruleForm">
				  		<el-form-item label="账号：" prop="accountNum">
				  			<el-input placeholder="请输入账号" v-model="account.accountNum" type="number" v-vue-onkeypress></el-input>
						</el-form-item>
						<el-form-item label="密码：" prop="password">
				  			<el-input placeholder="请输入密码" v-model="account.password" type="password" v-vue-onkeypress></el-input>
						</el-form-item>
					    <div class="forgetPWD" @click= "forgetPWD">忘记密码</div>
					</el-form>
				</div>
				<el-button v-show="account.accountNum=='' || account.password==''" type="danger" class="loginBtn" disabled>立即登录</el-button>
	    		<div v-show="account.accountNum!='' && account.password!=''" class="el-button-red loginBtn" @click="handleLogin()">立即登录</div>
			</div>
		</div>
		<el-dialog title="找回密码" :visible.sync="dialogPWDVisible" :append-to-body='true'  width="35%" center>
			<div class= 'dialog_body_content dialog_body_login' center>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form-inline">
					<el-row :gutter="20" justify="center">
						<el-col :span="15">
							<el-form-item label="手机号：" prop="accountNum" class="inline-block">
							    <el-input v-model="ruleForm.accountNum" placeholder="请输入手机号" v-vue-onkeypress></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-button v-if="isSendcode" type="primary" size="mini" round>{{seconds}} 秒重新发送验证码</el-button>

							<el-button v-if="!isSendcode" size="mini" round @click="getVerifyCode">发送验证码</el-button>
						</el-col>
						<el-col :span="15">
							<el-form-item label="验证码：" prop="code">
							    <el-input v-model="ruleForm.code" placeholder="请输入验证码" v-vue-onkeypress></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="15">
							<el-form-item label="设置密码：" prop="password">
							    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" v-vue-onkeypress></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogPWDVisible = false">取消</span>
    			<el-button v-show="ruleForm.phoneNumber=='' || ruleForm.verifCode=='' || ruleForm.resetPWD==''" class="dialogDisaBtn" type="danger" disabled>确定</el-button>
				<span v-show="ruleForm.phoneNumber!='' && ruleForm.verifCode!='' && ruleForm.resetPWD!=''" class="dialog-sure-btn dialoperateBtn" @click="add_sure()">确定</span>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import crypto from "crypto";
  	import {setStore,setDepartment,getAliOssUrl} from 'src/config/cache'

	import {login, getCodeData, modifyPWD} from 'src/api/api_user';

	export default {
	    data() {
		    return {
		      	activeName: "first",//总部和省区切换
		        loading: false,
		        account: {
		          	accountNum: '',//账号
		          	password: ''//密码
		        },
		        ruleForm: {
		        	accountNum: '',//手机号
		        	code: '',//验证码
		        	password: ''//重置密码
		        },
		        isSendcode: false,//是否发送验证码
		        seconds: '',
		        dialogPWDVisible: false,
		        rules: {//rules：是表单验证规则
		          	accountNum: [{ required: true, message: "请输入用户名",  trigger: 'blur' }],
		          	password: [{required: true, message: "请输入密码",  trigger: 'blur'}],
		          	code: [{ required: true, message: "请输入验证码",  trigger: 'blur' }],
		        }
		    };
	    },

	    created(){
			//获取导航栏数据
//          this.getNavbarData();
		},
	    methods: {

	    	//登录
	      	handleLogin(){
		        let md5 = crypto.createHash("md5");
				md5.update(this.account.password.toString());//必须是字符串
				let password = md5.digest("hex");
				console.log();
		        let datalist = {
		          	accountNum: this.account.accountNum,//账号
	          		password: password//密码
		        };
		        this.loading = true;
		        window.sessionStorage.setItem('access-user', JSON.stringify(datalist));
//		         this.$router.push({path: '/provinceOrderZB'});
		        login(datalist).then( res => {
              //登录成功跳页面
              let datas= res.data.data;
              setStore("navMenulist", datas.dataList);
              setStore('activeIndexTop',0);//登录时重设跳转页面
              setStore('accountNum',datas.accountNum);//登录成功账号
              setStore('password',this.account.password);//登录成功密码
              setStore('accountId',datas.accountId);//登录时重设跳转页面
              setStore('accountName',datas.accountName);//登录时重设跳转页面
                this.$router.push({path: datas.dataList[0].child[0].path});
              })
            },

		    //忘记密码
		    forgetPWD(){
		    	this.ruleForm.accountNum= this.account.accountNum;
		    	console.log(this.ruleForm.accountNum);
		    	this.dialogPWDVisible= true;
		    },

		    //获取验证码
		    getVerifyCode(){
		    	getCodeData({"accountNum": this.ruleForm.accountNum}).then( res => {
		    		this.seconds = 60;
		    		this.isSendcode = true;
		    		this.$message.success(`获取验证码成功`);
		    		//倒计时
					var timer = setInterval(() => {
					    this.seconds--
					    if (this.seconds === 0) {
					      clearInterval(timer);
					      this.isSendcode = false;
					    }
					}, 1000);
		    	})

		    },


		    //忘记密码确定按钮
		    add_sure(){
		    	let md5 = crypto.createHash("md5");
				md5.update(this.ruleForm.password.toString());//必须是字符串
				let password = md5.digest("hex");
		    	let datalist ={
		    		accountNum:this.ruleForm.accountNum,
		    		password:password,
		    		code: this.ruleForm.code
		    	}
		    	modifyPWD(datalist).then( res =>{
		    		this.$message.success(res.data.data.msg);
		    		this.dialogPWDVisible= false;
		    	})
		    }
	    }
	  }
</script>

<style lang="scss">
	.el-tabs__nav-wrap{
		padding:0 26px;
		line-height:53px;
	}
	.el-tabs__item{
		font-size:16px;
	}
</style>
<style lang="scss" scoped="scoped">
	.containWrap{
		position: relative;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background: url(../assets/images/loginLogo_bg.jpg) no-repeat center top;
		.loginLogo{
			position: absolute;
		    left: 3.6%;
		    top: 45px;
		    z-index: 2;
		}
		.loginMoudle{
			position: absolute;
			top: 230px;
			right: 200px;
			width: 338px;
			height: 321px;
			background: #fff;
			z-index: 3;
			font-size:16px;
			border:3px solid #f0f0f0;
			.loginForm{
				padding:45px 30px 0 20px;
			}
		}
		.loginBtn{
			display: block;
			width:80%;
			text-align: center;
			margin:auto;
			height:45px;
			margin-top: 30px;
		}
		.el-button-red{
			line-height: 45px;
		}
		.forgetPWD{
			text-align: right;
			font-size:12px;
			color:#1f5dbc;
		}


	}
	.dialogDisaBtn{
		display: inline-block;
        width: 100px;
        height: 36px;
        margin-left:30px;


	}
	.dialog_body_login{
		padding-top:30px;padding-left:50px;
	}

</style>
