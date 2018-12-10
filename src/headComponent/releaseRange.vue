<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogHintVisible" :append-to-body='true'>
				<el-row class="table_merge">
				  <el-col :span="12">
				  	<el-table :data="gridDataLeft" ref="gridDataLeft" class="table-left" border @selection-change="handleSelectionChangeLeft">
						<el-table-column type="selection" :selectable="checkSelectable"></el-table-column>
						<el-table-column prop="provinceName" label="所属省区" ></el-table-column>
						<el-table-column prop="name" label="省区经理"></el-table-column>
					</el-table>
				  </el-col>
				  <el-col :span="12">
				  	<el-table :data="gridDataRight"  ref="gridDataRight" class="table-right" border @selection-change="handleSelectionChangeRight">
						<el-table-column type="selection" :selectable="checkSelectable"></el-table-column>
						<el-table-column prop="provinceName" label="所属省区" ></el-table-column>
						<el-table-column prop="name" label="省区经理"></el-table-column>
					</el-table>
				  </el-col>
				</el-row>
				<div v-if="!isView" slot="footer" class="dialog-footer">
					<span class="dialog-cancel-btn dialoperateBtn" @click="dialogHintVisible=false">取消</span>
					<span class="dialog-sure-btn dialoperateBtn" @click="handleSure">确定</span>
				</div>
			</el-dialog>
	</div>
</template>

<script>
	export default{
		props:["relRangeList","title","isView", "dialogRangeVisible"],
		data(){
			return {
				gridDataList: [],
        gridDataLeft: [],
        gridDataRight: [],
        multipleSelectLeft: [],
        multipleSelectRight: [],
				dialogHintVisible: false,
        isHuixian:true,//是否回显  只回显一次
			}
		},
		watch: {
      relRangeList(val) {
          let arr = val;
          let t = arr.length;
          this.gridDataLeft = arr.slice(0,Math.round(t/2));
          this.gridDataRight = arr.slice(Math.round(t/2), t);
        }
		},
		computed:{},
		created(){},
		methods:{
        chakan(){
          this.$nextTick(()=>{//下次 DOM 更新循环结束之后执行延迟回调
            if(this.gridDataLeft&&this.gridDataLeft.length>0){
              for (var i = 0;i<this.gridDataLeft.length;i++){
                if (this.gridDataLeft[i].isChoose==1){
                  this.$refs.gridDataLeft.toggleRowSelection(this.gridDataLeft[i],true);//默认选中
                }
              }
            }
            if(this.gridDataRight&&this.gridDataRight.length>0){
              for (var i = 0;i<this.gridDataRight.length;i++){
                if (this.gridDataRight[i].isChoose==1){
                  this.$refs.gridDataRight.toggleRowSelection(this.gridDataRight[i],true);//默认选中
                }
              }
            }
          })
       },
        clear(){
          this.$nextTick(()=>{//下次 DOM 更新循环结束之后执行延迟回调
            if(this.gridDataLeft&&this.gridDataLeft.length>0){
              for (var i = 0;i<this.gridDataLeft.length;i++){
                if (this.gridDataLeft[i].isChoose==1){
                  this.$refs.gridDataLeft.toggleRowSelection(this.gridDataLeft[i],false);//默认选中
                }
              }
            }
            if(this.gridDataRight&&this.gridDataRight.length>0){
              for (var i = 0;i<this.gridDataRight.length;i++){
                if (this.gridDataRight[i].isChoose==1){
                  this.$refs.gridDataRight.toggleRowSelection(this.gridDataRight[i],false);//默认选中
                }
              }
            }
          })
        },
        dialogShow(){
          this.dialogHintVisible=true;
          if(this.isHuixian){
            this.chakan();
          }else{
            this.clear();
          }
        },
        dialogHide(){
          this.dialogHintVisible=false;
        },
        handleSelectionChangeLeft(val) {
          this.multipleSelectLeft = val;
        },
        handleSelectionChangeRight(val) {
          this.multipleSelectRight = val;
        },
      //弹窗是否禁用状态
        checkSelectable (row, index) {
            if(this.$props.isView){//查看时 都不可点击
              return false;
            }else{
              return row.isEdit == 1;//isEdit为1时  可以点击
            }
        },
          //确定按钮
        handleSure(){
            const multipleSelect = [...this.multipleSelectLeft,...this.multipleSelectRight];
            this.$emit("setProvMange",multipleSelect);
            this.dialogHintVisible=false;
        },
		}
	}
</script>

<style lang="scss" scoped>

	.table_wrap .addBtn{
		width:108px;
		text-align: center;
		margin-bottom:24px;
	}

	.editProvince_xiaoguan{
		height: 33px;
	    line-height: 33px;
	    font-size: 14px;
	    color:#333;
	}
	.table_merge{
		height:420px;
		padding:20px 30px;
		overflow: auto;
		border-top:1px solid #e3e8f9;
		.el-table--border{
			border:none;
		}
		.el-table--border::after, .el-table--group::after, .el-table::before{
			background:none;
		}
		.table-left {
			border-left:1px solid #eae2e0;
		}
		.noData{
			height:48px;
			line-height:48px;
			text-align: center;
			border-left:1px solid #eae2e0;
			border-right:1px solid #eae2e0;
			border-bottom:1px solid #e3e8f9;
		}
	}
</style>
