<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogHintVisible" :append-to-body='true'>
			<div class=" searchItem_wrap">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  		<el-form-item label="商品名称： ">
				    	<el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="InquirBtn()">查询</el-button>
				  	</el-form-item>
				</el-form>
			</div>
			<div class="table_wrap">
				<el-table :data="tableData" ref="tableData" border @selection-change="handleSelectionChange">
					<el-table-column key='1' v-if="!isRadio" type="selection" label="请选择"></el-table-column>
					<el-table-column  key='2' v-if="type==3 && isRadio==true" label="请选择">
				      	<template slot-scope="scope">
					    	<el-radio  @change.native="getCurrentRow(scope.row)" :label="scope.$index" v-model="radio" class="textRadio">&nbsp;</el-radio>
				      	</template>
				    </el-table-column>
					<el-table-column prop="goodsName" label="商品名称"></el-table-column>
					<el-table-column prop="specsMax" label="规格"></el-table-column>
					<el-table-column prop="provincePrice" label="单价"></el-table-column>
					<el-table-column prop="materialCode" label="物料编码"></el-table-column>
					<el-table-column prop="remark" label="备注"></el-table-column>
				</el-table>
			</div>

		  	<el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
			<div slot="footer" class="dialog-footer">
				<span class="dialog-cancel-btn dialoperateBtn" @click="dialogHintVisible=false">取消</span>
				<span class="dialog-sure-btn dialoperateBtn" @click="handleSure">确定</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import elPagination from 'components/el-page';
	export default{
		props:["goodsList", "title", "policyType", "isradio"],
		data(){
			return {
				formInline: {
					goodsName:''
				},
				tableData: [],
			    totalRecords: 0,//总条数
		      	totalPageCnt: 1,//总页数
		      	pageIndex: 1,//当前页
		      	pageSize:10,
		      	pagin_show:true,
		      	dialogHintVisible:false,
		      	type: this.$props.policyType,//政策类型是3的时候主品单选
		      	isRadio: this.$props.isradio,
		      	radio:''

			}
		},
		components:{
	        elPagination
	    },
		watch: {
	        goodsList(val) {
            this.tableData = val.dataList;
            this.pageIndex = val.pageIndex;
            this.pageSize = val.pageSize;
            this.totalRecords= val.totalRecords;
            this.totalPageCnt = val.totalPageCnt;
            this.type = this.$props.policyType;
            this.isRadio = this.$props.isradio;
            this.radio = '';
	        }

		},
		computed:{

		},
		created(){

		},
		methods:{
			dialogShow(){
				this.dialogHintVisible=true;
			},
			dialogHide(){
				this.dialogHintVisible=false;
			},
			//查询商品名称
			InquirBtn() {
		        this.$emit("selectAwardGoods",{name:this.formInline.goodsName,pageIndex:1});
		    },
			//点击分页
			updataPage(val){
				this.$emit('getGoodsList',val)
			},
        	//确定按钮
        handleSure(){
          this.$emit("uploadData",this.multipleSelect);
          this.dialogHintVisible=false;
          this.formInline.goodsName = '';
        },
        	//选择复选框
			  handleSelectionChange(val) {
          this.multipleSelect = val;
		   	},
		   	//单选按钮
		   	getCurrentRow(val){
		   		this.multipleSelect =[];
		   		this.multipleSelect.push(val);
		   	}


		}
	}
</script>

<style lang="scss" scoped>
	.searchItem_wrap{
		padding:15px 0 0 30px !important;
	}
	.table_wrap{
		margin-top: 0 !important;
		border:none !important;
		padding: 0 30px !important;
	}

</style>
