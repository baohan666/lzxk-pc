<template>
	<div id>
		<div class="detailBody" v-show="detailVisible">
			<div>
				<el-button type='danger' size="small" @click='hideBack()'>返回</el-button>
				<!--	<el-button type='danger' size="small" @click='handleDelDialog()' v-show='delBtnShow'>删除</el-button>-->
				<el-button type='danger' size="small" @click='handleEdit()' v-show='datailArr.status != "禁用" ,!editShow'>编辑</el-button>
				<el-button type='danger' size="small" @click='leaveOfficeDialog()' v-show='datailArr.status != "离职"'>离职</el-button>
				<el-button type='danger' size="small" @click='biddenOrStart()' v-show='datailArr.status == "禁用"'>申请解禁</el-button>
			</div>
			<el-scrollbar></el-scrollbar>
			<div class="detail_content">
				<ul>
					<li><span>部门:</span>{{datailArr.dept}}
						<a href="javascript:;" @click='getLogDept()'>查看变更记录</a>
					</li>
					<li><span>姓名:</span>{{datailArr.name}}<i class="userStatus">{{datailArr.status}}</i></li>
					<li><span>性别:</span>{{datailArr.sex==1?'男':'女'}}</li>
					<li><span>手机:</span>{{datailArr.mobile}}
						<a href="javascript:;" @click='getLogTel()'>查看变更记录</a>
					</li>
					<li><span>身份证号:</span>{{datailArr.idCard}}</li>
					<li><span>身份证扫描件:</span>
						<viewer class='viewer' :images="datailArr.idCardImg">
							<img v-for="src in datailArr.idCardImgs" :src="datailArr.url+src" :key="src" width="200">
						</viewer>
					</li>
					<li><span>职务:</span>{{datailArr.positions}}
						<a href="javascript:;" @click='getLogPos()'>查看变更记录</a>
					</li>
					<li v-show="datailArr.position=='省区经理'"><span>NC对应编码:</span>{{datailArr.ncCode}}</li>
					<li><span>应聘登记表扫描件:</span>
						<viewer class='viewer' :images="datailArr.applicationImgs">
							<img v-for="src in datailArr.applicationImgs" :src="datailArr.url+src" :key="src" width="200">
						</viewer>
					</li>
					<li><span>是否保证金人员:</span>{{datailArr.isDeposit}}</li>

					<li v-show="datailArr.isDeposit=='是' "><span>保证金金额:</span>
						{{datailArr.otherAmount}}						
					</li>
					<li v-if="datailArr.isDeposit == '是'"><span>保证金汇款证明扫描件:</span>
						<viewer class='viewer' :images="datailArr.depositImgs">
							<img v-for="src in datailArr.depositImgs" :src="datailArr.url+src" :key="src" width="200">
						</viewer>
					</li>
					<li><span>创建时间:</span>{{datailArr.createDate}}</li>
				</ul>
			</div>
			<el-dialog :title='dailogTitleType' :visible.sync="hintVisible" :append-to-body='true' left top='150px' width='500px' ref='dialogTitle'>
				<div class="dailogCon" v-show="imgClickShow">
					<img v-bind:src="cllickImgSrc">
				</div>
				<div class="dailogCon" v-show="hintMsgShow" v-model="hintMsg">{{hintMsg}}</div>
				<ul class="dailogCon" v-show="logShow">
					<li v-for='(item,index) in logList' v-show='logList.length>0'>
						<div>变更{{index+1}}</div>
						<div>{{item.createDate}}</div>
						<div>由{{item.oldData}} <i>变更为</i> {{item.newData}}</div>
					</li>
					<li v-show='logList.length==0' style="text-align: center;">暂无变更记录</li>
				</ul>

				<span slot="footer" v-show="!imgClickShow">		
							<span @click="visibleSure()" class="dialogBtnTrue" >确定</span>
				</span>

			</el-dialog>

		</div>

	</div>

</template>

<script>
	import {
		getOrgUserLog, //变更记录 
		leaveOffice, //离职
		forbiddenOrStart, //申请解禁
	} from 'src/api/province_url/addressList';

	export default {

		data() {
			return {
				dailogTitleType: '提示',
				cllickImgSrc: '',
				userStatus: '', //状态
				hintMsgShow: false,
				hintVisible: false,
				logShow: false, //变更记录
				imgClickShow: false,
				editShow: false,
				hintMsg: '',
				logList: [],
				btnStart: '启用',
				btnBidden: '禁用',
				detailVisible: false
			};
		},
		props: [
			'datailArr', 'nowId', 'hideShowFlag', 'delBtnShow', 'forbiddenBtnShow'
		],
		mounted: function() {},
		methods: {
			show() {
				this.detailVisible = true
			},
			hide() {
				this.detailVisible = false
			},
			handleDelDialog() {
				this.dailogTitleType = '提示',
					this.logShow = false;
				this.imgClickShow = false;
				this.hintMsg = '删除后，' + this.datailArr.name + '的企业微信消息记录将完全被清除。';
				this.hintMsgShow = true;
				this.hintVisible = true;
			},

			//图片放大
			magnifyImg(item, index) {
				this.cllickImgSrc = item
				this.imgClickShow = true,
					this.hintVisible = true,
					this.logShow = false,
					this.hintMsgShow = false
			},
			//编辑
			handleEdit() {
				this.$emit("detailEdit", false, true)
			},
			//禁用启用
			biddenOrStart() {
				this.hintMsg = '申请禁用需提交总部审核，审核通过后该人员才被解禁，变为正常状态，确认向总部提交解禁申请吗？'
				this.logShow = false;
				this.dailogTitleType = '提示';
				this.hintMsgShow = true;
				this.hintVisible = true;
			},
			//离职
			leaveOfficeDialog() {
				this.dailogTitleType = '提示'
				this.hintMsg = '标记为离职后，该人员将不可再登录朗致销客手机端，且不可再恢复，确定将该人员标记为离职吗？'
				this.logShow = false;
				this.hintMsgShow = true;
				this.hintVisible = true;

			},
			//省区申请解禁
			forbiddenOrStart() {
				forbiddenOrStart({
					"id": this.nowId,
				}).then(res => {
					console.log(res)
					//							this.$set(this.datailArr,'status','已启用')
					this.forbiddenBtnShow = false;
					this.hintVisible = false;

				})

			},

			//人员离职
			leaveOffice() {
				this.hintVisible = false;
				leaveOffice({
					"ids": this.nowId
				}).then(res => {
					console.log(res)
					this.editShow = false,
						this.forbiddenBtnShow = false;
					this.hintVisible = false;
				})
			},
			//返回
			hideBack() {
				this.$emit("detailBack", false, true)
				this.detailVisible = false
			},
			//部门变更接口
			getLogDept() {
				let that = this;
				that.logList = [];
				console.log(that.nowId)
				getOrgUserLog({
					'id': that.nowId,
					'type': '2'
				}).then(function(res) {
					console.log(res)
					that.logList = res.data.data
				})
				this.dailogTitleType = '变更信息';
				this.hintMsgShow = false;
				that.logShow = true;
				that.hintVisible = true;
			},
			//手机号变更
			getLogTel() {
				let that = this;
				that.logList = [];
				getOrgUserLog({
					'id': this.nowId,
					'type': '1'
				}).then(function(res) {
					that.logList = res.data.data
				})
				this.dailogTitleType = '变更信息';
				this.hintMsgShow = false;
				that.logShow = true;
				that.hintVisible = true;
			},
			//职务变更
			getLogPos() {
				this.logVisible = true;
				let that = this;
				that.logList = [];
				getOrgUserLog({
					'id': this.nowId,
					'type': '3'
				}).then(function(res) {
					that.logList = res.data.data
				})
				this.dailogTitleType = '变更信息';
				this.hintMsgShow = false;
				that.logShow = true;
				that.hintVisible = true;
			},
			//变更弹窗
			visibleSure() {
				if(this.logShow) {
					this.logShow = false;
					this.hintVisible = false;
				} else if(this.hintMsgShow) {

					if(this.hintMsg == '标记为离职后，该人员将不可再登录朗致销客手机端，且不可再恢复，确定将该人员标记为离职吗？') {
						this.leaveOffice();
					} else if(this.hintMsg == '申请禁用需提交总部审核，审核通过后该人员才被解禁，变为正常状态，确认向总部提交解禁申请吗？') {

						this.forbiddenOrStart();
					} else {
						console.log('')
					}

				}

			}

		}
	};
</script>

<style lang="scss">
	.detailBody {
		background: #fff;
		margin-top: 30px;
		display: flex;
		flex-direction: column;
	}
	
	.detailBody .el-button {
		background: #e02222;
		margin: 0 15px;
	}
	
	.detailBody .detail_content {
		overflow-y: auto !important;
	}
	
	.detailBody .detail_content ul li {
		line-height: 50px;
		color: #666;
		font-size: 14px;
	}
	
	.detailBody .detail_content ul li span {
		display: inline-block;
		width: 180px;
		text-align: right;
		margin-right: 20px;
	}
	
	.detailBody .detail_content ul li a {
		margin-left: 50px;
		color: #1f5dbc;
		cursor: pointer;
	}
	
	.detailBody .detail_content .el-button-red {
		padding: 8px 20px;
		margin-left: 100px;
	}
	
	.detailBody .detail_content ul li img {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin: 0 10px;
	}
	
	.detailBody .detail_content .imgMinBtn {
		display: inline-block;
	}
	
	.detailBody .detail_content .userStatus {
		padding: 3px;
		border: 1px solid #e02222;
		border-radius: 2px;
		margin-left: 10px;
		color: #e02222;
	}
	.detailBody .detail_content .viewer {
		display: inline-block;
	}
	.detailBody .splitSolid {
		display: block;
		padding: 20px;
		width: 30px;
		height: 400px;
		text-align: center;
	}
	
	.detailBody .splitSolid span {
		display: block;
		width: 1px;
		height: 400px;
		background: #e5e5e5;
	}
	
	.dailogCon {
		width: 100%;
		padding: 50px 15px;
		text-align: center;
		font-size: 14px;
	}
	
	.dialogBtnTrue {
		padding: 6px 25px;
		background: #e02222;
		border-radius: 2px;
		color: white;
	}
	
	.textTip img {
		width: 400px;
		height: 400px;
	}
	
	#detailDialog .el-dialog {
		width: 40%;
		height: 780px;
	}
</style>