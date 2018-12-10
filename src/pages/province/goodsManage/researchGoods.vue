<!--省区：商品管理：调研商品-->
<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <el-form-item label="产品名称：">
          <el-input v-model="goodsName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="生产企业">
          <el-input v-model="manufacturer" placeholder="请输入生产企业"></el-input>
        </el-form-item>
        <div class="div-inline el-form-item">
          <div class="div-inline">点击时间：</div>
          <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="changeSelect"></datepicker>
        </div>
        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
        <div class="div-inline el-button-red" @click = 'exportBaseInfoData'>导出</div>
      </el-form>
    </div>
    <div class="table_wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark" >
        <el-table-column prop="goodsName" label="产品名称"></el-table-column>
        <el-table-column prop="specsMax" label="规格"  width="150"></el-table-column>
        <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
        <el-table-column prop="unit" label="单位" width="80"></el-table-column>
        <el-table-column prop="mainEffect" label="功能主治"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="clickNum" label="点击量" width="90"></el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="scope">
            <div class="operateBtn" @click="view(scope.row.id)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
    </div>
  </div>

</template>

<script>
  import datepicker from 'components/data-plugin'
  import elPagination from 'components/el-page';
  import {getGoodResearData, exportGoodReData,getManufacturData} from 'src/api/province_url/goodsManage';

  export default {
    data() {
      return {
        startDate: '',//开始日期
        endDate: '',//结束日期
        goodsName: '',//商品名称
        manufacturer: "",//生产企业

        tableData:[],//table列表
        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize:10,
        pagin_show:true,

      }
    },
    created(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
      this.initData(datalist)
    },
    components:{
      elPagination,
      datepicker
    },
    methods: {
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        getGoodResearData(datalist).then(res => {
          console.log("res:",res)
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
        })
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,startDate:this.startDate
          ,endDate:this.endDate
          ,goodsName: this.goodsName
          ,manufacturer: this.manufacturer
        };
        return datalist;
      },
      //日期组件
      changeSelect(val){
        val.type == "startDate"?this.startDate = val.data : this.endDate = val.data;
      },
      //点击查询按钮
      toInquire(){
        let datalist=this.getsearchInfo(1,this.pageSize);
        this.initData(datalist);
      },

      //点击导出基本信息按钮
      exportBaseInfoData(){
        let datalist = {
          startDate:this.startDate
          ,endDate:this.endDate
          ,goodsName: this.goodsName
          ,manufacturer: this.manufacturer
        };
        exportGoodReData(datalist).then(res => {
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

      //查看
      view($id){
        this.$router.push({path:'/view_researGoodsSQ',query:{id:$id}});
      },

      //点击分页
      updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },

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
</style>
<style lang='scss' scoped="scoped">

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

</style>

