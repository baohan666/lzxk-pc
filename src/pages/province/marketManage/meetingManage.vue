<!--作者：朱
省区会议管理
对接接口：刘力才-->
<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="title" placeholder="请输入会议名称"></el-input>
        </el-form-item>
        <!--<el-form-item label="">-->
          <!--<el-input v-model="provinceName" placeholder="请输入省区或省总"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="">
          <el-input v-model="submitName" placeholder="请输入发起人姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="meetingType" placeholder="全部会议类型">
            <el-option label="全部会议类型" value='0'></el-option>
            <el-option v-for="(item,key,index) in statusMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <div class="div-inline el-form-item">
          <div class="div-inline">会议时间：</div>
          <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'poliyData')"></datepicker>
        </div>

        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
        <div class="div-inline el-button-red" @click = 'exportBtn'>导出</div>
      </el-form>
    </div>
    <div class="table_wrap">
      <el-table :data="tableData" border tooltip-effect="dark" >
        <el-table-column prop="meetingNum" label="会议编号"></el-table-column>
        <el-table-column prop="title" label="会议名称"></el-table-column>
        <el-table-column prop="typeStr" label="会议类型"></el-table-column>
        <el-table-column prop="goodsNames" label="推广产品"></el-table-column>
        <el-table-column prop="meetingDate" label="会议时间"></el-table-column>
        <el-table-column prop="createName" label="发起人"></el-table-column>
        <el-table-column prop="position" label="发起人职位"></el-table-column>
        <el-table-column prop="createDate" label="提交时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operateBtn" @click="view(scope.row.id,scope.row.policyType)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
    </div>
  </div>

</template>

<script>
  import datepicker from 'components/data-plugin'
  import departComponet from 'src/headComponent/departComponent'
  import elPagination from 'components/el-page';
  import {getStore} from 'src/config/cache'

  import {getPromPolicyData, saveBanStatus} from 'src/api/province_url/meetingManage';

  export default {
    data() {
      return {
        policyType: '',//会议编号
        submitName:'', // 提交人姓名
        policyStartDate: '',//会议起始时间
        policyEndDate: '',//会议结束时间
        provinceName:'', // 省区名称或者省总名称
        meetingType: "",//会议类型
        statusMenu: {1:'总部支持会议', 2:'专家培训会', 3:'亿桌会'},//政策状态列表---状态1未启用  2进行中 3已失效
        // userId:getStore('accountId'), // 用户id
        title: '',//会议名称

        tableData: [], // 数据数组
        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize:10,
        pagin_show:true,
        policyStatus: ''

      }
    },
    created(){
      let datalist=this.getsearchInfo(this.pageIndex);
      console.log(datalist);
      this.initData(datalist);

    },
    components:{
      datepicker,
      departComponet,
      elPagination
    },
    methods: {
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        getPromPolicyData(datalist).then(res => {
          const datas=res.data.data;
          console.log(datas);
          if(Object.keys(datas.dataList).length>0){
            this.totalRecords=datas.totalRecords;//总条数
            this.totalPageCnt=datas.totalPageCnt; //总页数
            this.pageIndex=datas.pageIndex; //当前页
            this.tableData= datas.dataList; // 数据数组
            this.pagin_show= true;
          }else{
            this.tableData= [];
            this.pagin_show= false;
          }

        })
      },
      //获取参数
      getsearchInfo(pageIndex){
        let datalist = {
          pageIndex:pageIndex  //当前页-----Y
          ,pageSize:this.pageSize //每页大小----Y
          ,submitName:this.submitName // 提交人姓名
          ,startDate: this.policyStartDate //开始时间
          ,endDate: this.policyEndDate //结束时间
          ,title:this.title // 会议名称
          ,provinceName:this.provinceName // 省区名称或者省总名称
          ,meetingType:this.meetingType // 会议类型
          // ,userId:getStore('accountId') // 用户id
          ,type:2 // 1总部 2省区
        };
        console.log(datalist);
        return datalist;
      },
      //日期组件
      changeSelect(val,type){console.log(val,type);
        if(type == "poliyData"){
          val.type == "startDate"?this.policyStartDate = val.data : this.policyEndDate = val.data;
        }else{
          val.type == "startDate"?this.startDate = val.data : this.endDate = val.data;
        }
      },

      //点击分页
      updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },


      //点击查询按钮
      toInquire(){
        let datalist=this.getsearchInfo(1);
        console.log(datalist);
        this.initData(datalist);
      },

      //点击导出按钮
      exportBtn(){
        let datalist = {
          pageIndex:this.pageIndex  //当前页-----Y
          ,pageSize:this.pageSize //每页大小----Y
          ,submitName:this.submitName // 提交人姓名
          ,startDate: this.policyStartDate //开始时间
          ,endDate: this.policyEndDate //结束时间
          ,title:this.title // 会议名称
          ,provinceName:this.provinceName // 省区名称或者省总名称
          ,meetingType:this.meetingType // 会议类型
          ,userId:getStore('accountId') // 用户id
          ,type:2 // 1总部 2省区
        };
        saveBanStatus(datalist).then(res => {
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


      view($id,$type){
        console.log({id:$id,type:$type});
        this.$router.push({path:'/meetingManageDetailSQ',query:{id:$id,type:$type}});
      },




    }
  }
</script>
<style lang='scss' scoped="scoped">
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



</style>
