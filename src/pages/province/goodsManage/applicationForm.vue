<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <div class="div-inline el-form-item">
          <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="changeSelect"></datepicker>
        </div>
        <el-form-item>
          <el-select v-model="applicationStatus" placeholder="请选择审核状态" @focus='getCheckStatus()'>
            <el-option label="请选择审核状态" value='0'>请选择审核状态</el-option>
            <el-option v-for="(item,key,index) in checkStatusMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="areaName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userName" placeholder="请输入经理名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="checkName" placeholder="请输入审核人"></el-input>
        </el-form-item>
        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
        <div class="div-inline el-button-red" @click = 'exportChangePrInfoData'>导出</div>
      </el-form>
    </div>
    <div class="table_wrap">
      <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
        <el-table-column prop="applyNum" label="编号"></el-table-column>
        <el-table-column prop="createDateStr" label="申请时间"></el-table-column>
        <el-table-column prop="changeArea" label="改价区域" width="120"></el-table-column>
        <el-table-column prop="areaManager" label="区域经理"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="appStatus" label="审核状态" width="120"></el-table-column>
        <el-table-column prop="handleName" label="审核人" width="120"></el-table-column>
        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="scope">
            <div class="operateBtn" @click="toCheckview(scope.row.id)">详情</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
    </div>

  </div>
</template>

<script>
  import departComponet from 'src/headComponent/departComponent'
  import datepicker from 'components/data-plugin'
  import elPagination from 'components/el-page';
  import {getStore} from 'src/config/cache'

  import {getApplyChaPricData, exportApplyChaPriData, getCheckStatusData, } from 'src/api/province_url/goodsManage';
  export default {
    data() {
      return {
        goodsName: ''  //商品名称
        ,startDate: ''	//开始时间
        ,endDate: ''	//结束时间
        ,applicationStatus: "0" //审核状态
        ,checkStatusMenu:{"1":"待审核","2":"审核中","3":"通过","4":"不通过","5":"撤回"} //审核列表  1.待销管审核（前端显示待审核） 2.待审批（前端显示审核中) 3 通过 4不通过 5撤回
        ,depId: "0"			//事业部
        ,areaName: ''     //地区名称
        ,userName: ''    //经理名称
        ,checkName: ''	//审核人名称

        ,tableData: []
        ,totalRecords: 0 //总条数
        ,totalPageCnt: 0 //总页数
        ,pageIndex: 1 //当前页
        ,pageSize:10
        ,pagin_show:true
      }
    },
    created(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
      console.log(datalist);
      this.initData(datalist)
    },
    components:{
      departComponet,
      datepicker,
      elPagination
    },
    methods: {

      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        getApplyChaPricData(datalist).then(res => {
          if(res.data.code==1){
            const datas=res.data.data;
            if(datas.dataList.length>0){
              this.totalRecords=datas.totalRecords;
              this.totalPageCnt=datas.totalPageCnt;
              this.pageIndex=datas.pageIndex;
              this.tableData= datas.dataList;
              this.pagin_show = true;
            }else{
              this.tableData= [];
              this.pagin_show = false;
            }
          }else{
            this.pagin_show = false;
          }
        })
      },
      //获取参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          userId:getStore('accountId') //当前登录人id
          ,pageSize:pageSize //每页大小----Y
          ,pageIndex:pageIndex  //当前页-----Y
          ,goodsName: this.goodsName //商品名称
          ,startDate: this.startDate	//开始时间
          ,endDate: this.endDate		//结束时间
          ,applicationStatus: this.applicationStatus  //审核状态
          ,areaName: this.areaName     //地区名称
          ,userName: this.userName    //经理名称
          ,checkName: this.checkName	//审核人名称
        };
        return datalist;
      },

      getCheckStatus(){
        if(Object.keys(this.checkStatusMenu).length>0){
          return false;
        }
        getCheckStatusData("").then(res => {
          this.checkStatusMenu = res.data.data;
        })
      },
      toCheckview($id){
        this.$router.push({"path":"applyFormDeataiSQ", query:{"applyId": $id}})
      },
      //点击分页
      updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
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

      //点击导出按钮
      exportChangePrInfoData(){
        let datalist = {
          userId:getStore('accountId') //当前登录人id
          ,pageSize:this.pageSize //每页大小----Y
          ,pageIndex:this.pageIndex  //当前页-----Y
          ,goodsName: this.goodsName //商品名称
          ,startDate: this.startDate	//开始时间
          ,endDate: this.endDate		//结束时间
          ,applicationStatus: this.applicationStatus  //审核状态
          ,areaName: this.areaName     //地区名称
          ,userName: this.userName    //经理名称
          ,checkName: this.checkName	//审核人名称

        };
        exportApplyChaPriData(datalist).then(res => {
          let fileName = new Date().getTime()+'.xls';
          const blob = new Blob([res.data]);
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);console.log(elink.href);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        })
      },

    }
  }
</script>

<style lang="scss" scoped="scoped">


</style>
