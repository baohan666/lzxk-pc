<!--总部：人员管理：有无销售人员-->
<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <div class="div-inline el-form-item">
          <depart-componet departMsg="事业部：" @selectSuccess = "selectSuccess"></depart-componet>
        </div>
        <el-form-item label="省区">
          <el-select v-model="provinceCode" placeholder="请选择省区" @focus='getProvinceCode()'>
            <el-option label="请选择省区" value='0'></el-option>
            <el-option v-for="(item,key,index) in provinceCodeMenu" :label="item.provinceName" :value="item.provinceCode" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员状态">
          <el-select v-model="userStatus" placeholder="请选择人员状态" @focus='getUserStatus()'>
            <el-option label="请选择人员状态" value='0'></el-option>
            <el-option v-for="(item,key,index) in userStatusMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无销售">
          <el-select v-model="isHaveSales" placeholder="全部">
            <el-option label="全部" value='0'></el-option>
            <el-option v-for="(item,key,index) in isHaveSalesMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <div class="div-inline el-form-item">
          <div class="div-inline">时间：</div>
          <el-date-picker
            v-model="salesDate"
            value-format="yyyy-MM"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
        <div class="div-inline el-button-red" @click = 'exportBaseInfoData()'>导出</div>
      </el-form>
    </div>
    <div class="table_wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark" >
        <el-table-column prop="deptName" label="事业部"></el-table-column>
        <el-table-column prop="provinceName" label="所属省区"></el-table-column>
        <el-table-column prop="managerUserName" label="省区经理"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="positionStr" label="职务"></el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="userStatusStr" label="人员状态"></el-table-column>
        <el-table-column prop="isHaveSalesStr" label="有无销售"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operateBtn" @click="view(scope.row.userId)">有无销售记录</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
    </div>
    <!--有无销售记录begin-->
    <el-dialog title="销售记录" :visible.sync="dialogAllotVisible" :append-to-body='true'>
      <div class= 'dialog_body_content'>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          tooltip-effect="dark" >
          <el-table-column prop="yearMonth" label="月份"></el-table-column>
          <el-table-column prop="isHaveSalesStr" label="销售情况"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogAllotVisible = false">确定</span>
      </div>
    </el-dialog>
    <!--有无销售记录end-->
  </div>

</template>

<script>
  import departComponet from 'src/headComponent/departComponent'
  import elPagination from 'components/el-page';
  import {staffSalesList,commonUserStatus,staffSalesPullDown,staffSalesLog,staffSalesExcel} from 'src/api/headquarter_url/personManage';

  export default {
    data() {
      return {
        departmentId: '',//事业部
        provinceCode:'',//省区
        provinceCodeMenu:[],//省区下拉列表
        userStatus:'',//人员状态
        userStatusMenu:[],//人员状态下拉列表
        isHaveSales:'',//有无销售记录
        isHaveSalesMenu:{1:'有', 2:'无'},//有无销售记录下拉列表
        salesDate:this.monthnow(),//时间：年月
        dialogAllotVisible:false,//有无销售记录弹窗

        tableData3:[],//table列表
        tableData:[],//table列表
        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize:10,
        pagin_show:true,
      }
    },
    created(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
      this.initData(datalist)
    },
    components:{
      departComponet,
      elPagination
    },
    methods: {
      //获取年月
      monthnow(){
        let date=new Date;
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        month =(month<10 ? "0"+month:month);
        let mydate = (year.toString()+'-'+month.toString());
        return mydate;
      },
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        staffSalesList(datalist).then(res => {
          console.log("res:",res)
          const datas=res.data.data;
          if(datas.dataList.length>0){
            this.pagin_show=true;
            this.totalRecords=datas.totalRecords;
            this.totalPageCnt=datas.totalPageCnt;
            this.pageIndex=datas.pageIndex;
            this.tableData= datas.dataList;
            this.pagin_show= true;
          }else{
            this.tableData= [];
            this.pagin_show= false;
          }
        })
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex,
          pageSize:pageSize,
          departmentId: this.departmentId,//事业部
          provinceCode:this.provinceCode==0?'':this.provinceCode,//省区
          userStatus:this.userStatus==0?'':this.userStatus,//人员状态
          isHaveSales:this.isHaveSales==0?'':this.isHaveSales,//有无销售记录
          salesDate:this.salesDate==''?this.monthnow():this.salesDate,//时间：年月
        };
        return datalist;
      },
      //点击查询按钮
      toInquire(){
        let datalist=this.getsearchInfo(1,this.pageSize);
        this.initData(datalist);
      },

      //点击导出基本信息按钮
      exportBaseInfoData(){
        let datalist = {
          departmentId: this.departmentId,//事业部
          provinceCode:this.provinceCode==0?'':this.provinceCode,//省区
          userStatus:this.userStatus==0?'':this.userStatus,//人员状态
          isHaveSales:this.isHaveSales==0?'':this.isHaveSales,//有无销售记录
          salesDate:this.salesDate==''?this.monthnow():this.salesDate,//时间：年月
        };
        staffSalesExcel(datalist).then(res => {
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

      //有无销售记录弹窗
      view($id){
        this.dialogAllotVisible = true;
        staffSalesLog({userId:$id}).then(res => {
          const datas=res.data.data;
          if(datas.length>0){
            this.tableData3= datas;
          }else{
            this.tableData3= [];
          }
        })
      },

      //点击分页
      updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },
      //点击事业部
      selectSuccess(val){
        this.departmentId = val;
        console.log(this.departmentId);
      },
      //获取省区
      getProvinceCode(){
        staffSalesPullDown('').then(res =>{
          this.provinceCodeMenu = res.data.data;
          console.log("省区：",this.provinceCodeMenu);
        })
      },
      //获取人员状态
      getUserStatus(){
        commonUserStatus('').then(res =>{
          this.userStatusMenu = res.data.data;
          console.log("人员状态：",this.userStatusMenu);
        })
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
  .dialog_body_content{
    padding-top: 30px!important;
    padding-left: 30px!important;
    padding-right: 30px!important;
    max-height: 500px!important;
    overflow: scroll;
  }
</style>

