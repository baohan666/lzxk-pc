<!--省区：库存管理-->
<template>
	<div>
		<div class="search_wrap">
		   <el-form  :inline="true" class="demo-form-inline">
			   <el-form-item label="商品名称：">
			    <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
			  </el-form-item>
			  <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
		  	  <div class="div-inline el-button-red" @click = 'exportData()'>导出</div>
		  	</el-form>
		</div>
		<div class="table_wrap">
			<el-table
	  	ref="multipleTable"
	  	:data="tableData"
	  	border
	  	tooltip-effect="dark" >
		    <el-table-column prop="goodsName" label="产品名称"></el-table-column>
		    <el-table-column prop="materialCode" label="物料编码"></el-table-column>
		    <el-table-column prop="specsMax" label="规格"></el-table-column>
		    <el-table-column prop="enterprise" label="生产企业"></el-table-column>
		    <el-table-column prop="stockActual" label="实际库存">
          <template slot-scope="scope">
            <span class="stockActual">{{scope.row.stockActual}}</span>
            <div class="operateBtn" @click="stockActualEdit(scope.row.id)">修改</div>
          </template>
        </el-table-column>
		    <el-table-column prop="stockUsable" label="可销售库存"></el-table-column>
		    <el-table-column prop="stockUnusable" label="冻结库存"></el-table-column>
		    <el-table-column prop="address" label="操作">
		    	<template slot-scope="scope">
					<div class="operateBtn" @click="viewLog(scope.row.id)">查看日志</div>
			    </template>
		    </el-table-column>
	  	</el-table>
	  	<el-pagination
	  			:pageIndex='pageIndex'
	  			:pageSize= 'pageSize'
	  			:totalRecords='totalRecords'
	  			:totalPageCnt='totalPageCnt'
	  			:pagin_show= 'pagin_show'
	  			v-on:clickpage="updataPage"></el-pagination>
	 </div>
    <!--修改 begin-->
    <el-dialog class="provinceStock_dialog" title="实际库存修改" :visible.sync="dialogAllotVisible" :append-to-body='true'>
      <div class= 'dialog_body_content'>
        <el-form label-width="100px">
          <el-form-item label="产品名称：">
            <span>{{goodsDetail.goodsName}}</span>
          </el-form-item>
          <el-form-item label="规格：">
            <span>{{goodsDetail.specsMax}}</span>
          </el-form-item>
          <el-form-item label="库存：">
            <el-input v-model="goodsDetail.stockActual"></el-input>
          </el-form-item>
          <el-form-item label="修改原因：">
            <el-input type="textarea" v-model="goodsDetail.remark" maxLength="100"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogAllotVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="allot_sure">确定</span>
      </div>
    </el-dialog>
    <!--修改 end-->
	</div>

</template>

<script>
  import {getStore,setStore,setDepartment,getAliOssUrl} from 'src/config/cache'
  import elPagination from 'components/el-page';
  import {getProStockData,exportInfoData,toUpdateGoodsStock,updateGoodsStock} from 'src/api/province_url/stockManage';//调接口

  export default {
    data() {
      return {
      	departmentMenu: [],//事业部列表
      	totalRecords: 0,//总条数
      	totalPageCnt: 0,//总页数
      	pageIndex: 1,//当前页
      	pageSize:10,
      	pagin_show:true,
      	tableData:[],//table列表
        goodsName:'',
        dialogAllotVisible:false,//修改弹窗
        goodsDetail:[],//修改弹窗的内容
      }
    },
    mounted(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
      this.initData(datalist)
    },
    components:{
      elPagination
    },
    methods: {
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        getProStockData(datalist).then(res => {
          console.log("调getProStockData接口res：",res);
          const datas=res.data.data;
          if(datas.dataList.length>0){
            this.pagin_show=true;
            this.totalRecords=datas.totalRecords;
            this.totalPageCnt=datas.totalPageCnt;
            this.pageIndex=datas.pageIndex;
            this.tableData= datas.dataList;
          }else{
            this.tableData= [];
            this.pagin_show= false;
          }
        });
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,goodsName: this.goodsName
        };
        return datalist;
      },
      //查询
      toInquire(){
        let datalist=this.getsearchInfo(1,this.pageSize);
        this.initData(datalist);
      },
      //导出
      exportData(){
        let datalist = {
          goodsName: this.goodsName
        };
        exportInfoData(datalist).then(res => {
          let fileName = new Date().getTime()+'.xls';
          const blob = new Blob([res.data]);
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        })
      },
    	//查看日志
    	viewLog($id){
    		this.$router.push({path:'/provinStockLogSQ',query:{id:$id}});
    	},
      //点击’修改‘
      stockActualEdit($id){
    	  this.dialogAllotVisible=true;
        toUpdateGoodsStock({goodsStockId:$id}).then(res => {
          console.log("调toUpdateGoodsStock接口res：",res);
          const datas=res.data.data;
          this.goodsDetail=datas;
          this.goodsDetail.remark="";
        });
      },
      //点击’保存‘
      allot_sure(){
        //校验
        if(this.goodsDetail.stockActual==''||this.goodsDetail.stockActual.length==0){
          this.$message.error('请输入库存');
          return false;
        }
        if(this.goodsDetail.stockActual<this.goodsDetail.stockUnusable){
          this.$message.error('实际库存不能少于冻结库存');
          return false;
        }
        if(this.goodsDetail.remark==''||this.goodsDetail.remark.length==0){
          this.$message.error('请输入修改原因');
          return false;
        }
        //保存调接口
        let obj={
          stockActual:this.goodsDetail.stockActual,
          remark:this.goodsDetail.remark,
          goodsStockId:this.goodsDetail.id,
        }
        updateGoodsStock(obj).then(res => {
          this.dialogAllotVisible=false;
          //保存成功后，刷新table列表
          let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
          this.initData(datalist);
        });
      },
      //点击分页
      updataPage : function(val){
        console.log("分页val：",val)
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      }
    }
  }
</script>
<style lang="scss">
    .search_wrap .province_city_county .el-form-item__content{
      width:auto;
    }
    .el-input__inner{
      padding:0 10px;
    }
    .provinceStock_dialog {
      .el-dialog__body {
        padding:20px 20px 10px 20px!important;
      }
      .el-dialog__footer {
        padding: 20px!important;
      }
    }
</style>
<style lang='scss' scoped="scoped">
.stockActual{
  width: 65px;
  display: inline-block;
}
.bitchRemove{
	margin-bottom:20px;
}
.slideDown{
	display: none;
}
.spreadSlowlly{
	display: block;
}
.select-more{
	margin:0 30px;
	i{
		color:#9c9c9c;
	}
}
.el-button-red{
	margin-bottom: 20px;
}
.province_city_county{
	display: inline-block;
}
.checkReason{
  border:1px solid #e6e6e6;
  border-radius:5px;
  width:80%;
  height:70px;
  vertical-align: middle;
  padding:10px;
  line-height:26px;
}
</style>
