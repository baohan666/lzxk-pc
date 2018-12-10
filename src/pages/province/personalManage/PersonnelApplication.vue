<!--省区：人员管理：人员申请单-->
<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <div class="div-inline el-form-item">
          <div class="div-inline">提交时间：</div>
          <!--<el-date-picker v-model="F.date" type="date" placeholder="选择日期" @change="getTime" :readonly="IsReadOnly.DJRQ"></el-date-picker>-->
          <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="changeSelect"></datepicker>
        </div>
        <el-form-item label="申请类型">
          <el-select v-model="applyType" placeholder="请选择申请类型" @focus='getApplyType()'>
            <el-option label="请选择申请类型" value='0'></el-option>
            <el-option v-for="(item,key,index) in applyTypeMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="applyStatus" placeholder="请选择申请状态" @focus='getApplyStatus()'>
            <el-option label="请选择申请状态" value='0'></el-option>
            <el-option v-for="(item,key,index) in applyStatusMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员姓名：">
          <el-input v-model="applyInfoName" placeholder="请输入人员姓名"></el-input>
        </el-form-item>
        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
      </el-form>
    </div>
    <div class="table_wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark" >
        <el-table-column prop="userApplyNo" label="编号"></el-table-column>
        <el-table-column prop="createDate" label="提交时间"></el-table-column>
        <el-table-column prop="applyType" label="申请类型" width="80">
          <template slot-scope="scope">
            <!--申请单类型:1新增 2修改 3离职 4解禁-->
            <span>{{scope.row.applyType==1?'新增':scope.row.applyType==2?'修改':scope.row.applyType==3?'离职':'解禁'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyInfoName" label="人员姓名" width="80"></el-table-column>
        <el-table-column prop="position" label="人员职务" width="80">
          <template slot-scope="scope">
            <!--5:省区经理 4: 地区经理 3县区经理  10 内勤-->
            <span>{{scope.row.position==5?'省区经理':scope.row.position==4?'地区经理':scope.row.position==3?'县区经理':'内勤'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="treeName" label="部门"></el-table-column>
        <el-table-column prop="applyStatus" label="申请单状态" width="100">
          <template slot-scope="scope">
            <!--申请单状态: 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回 -->
            <span>{{scope.row.applyStatus==2?'待审核':scope.row.applyStatus==3?'审核通过':scope.row.applyStatus==4?'审核不通过':scope.row.applyStatus==5?'审核暂缓':'已撤回'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operateBtn" @click="view(scope.row.id)">查看详情</div>
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
  import {provinceUserApplyList,getApplyTypeData,getApplyStatusData}  from 'src/api/province_url/personalManage';

  export default {
    data() {
      return {
        startDate: '',//开始日期
        endDate: '',//结束日期
        manufacturer: "",//生产企业
        manufacturerMenu: [],//生产企业下拉列表
        applyInfoName:"",//人员姓名
        applyType:"",//申请单类型:1新增 2修改 3离职 4解禁
        applyTypeMenu: [],//申请单类型下拉列表
        applyStatus:"",//申请单状态: 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        applyStatusMenu: [],//申请单状态下拉列表

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
        provinceUserApplyList(datalist).then(res => {
          console.log("res:",res)
          const datas=res.data.data;
          if(datas.dataList.length>0){
            this.totalRecords=datas.totalRecords;
            this.totalPageCnt=datas.totalPageCnt;
            this.pageIndex=datas.pageIndex;
            this.tableData= datas.dataList;
            this.pagin_show= true;
          }else{
            this.tableData= [];
            this.pagin_show= false;
          }
        }).catch(err=>{
          console.log("err:",err);
        })
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,startDate:this.startDate
          ,endDate:this.endDate
          ,applyInfoName: this.applyInfoName//人员姓名
          ,applyType:this.applyType//申请单类型:1新增 2修改 3离职 4解禁
          ,applyStatus:this.applyStatus//申请单状态: 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
//          ,manufacturer: this.manufacturer==0?'':this.manufacturer
        };
        return datalist;
      },
      /*applyType:"",//申请单类型:1新增 2修改 3离职 4解禁
        applyTypeMenu: [],//申请单类型下拉列表
        applyStatus:"",//申请单状态: 2待审核 3审核通过 4审核不通过 5审核暂缓 6已撤回
        applyStatusMenu: [],//申请单状态下拉列表*/
      //获取申请单类型
      getApplyType: function(){
        let this_=this;
        if(Object.keys(this_.applyTypeMenu).length>0){
          return false;
        }
        getApplyTypeData().then(function(res){
          if(res.data.code!=1){
            this_.$message.success(res.data.msg);
            return false;
          }
          this_.applyTypeMenu = res.data.data;
        })
      },
      //获取申请单状态
      getApplyStatus: function(){
        let this_=this;
        if(Object.keys(this_.applyStatusMenu).length>0){
          return false;
        }
        getApplyStatusData().then(function(res){
          if(res.data.code!=1){
            this_.$message.success(res.data.msg);
            return false;
          }
          this_.applyStatusMenu = res.data.data;
        })
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

      //查看
      view($id){
        this.$router.push({path:'/PersonnelApplicationDatailSQ',query:{id:$id}});
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
  .newData {
    position: absolute;
    width: 50px;
    height:40px;
    top: 0;
    left: 0;
    background: url(../../../assets/images/weidu_03.png) left top no-repeat;
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

</style>

