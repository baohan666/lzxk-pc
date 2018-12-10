<!--总部：人员管理：人员申请单-->
<template>
  <div>
    <div class="search_wrap">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <div class="div-inline el-form-item">
          <datepicker startIsShow="true" endIsShow="true" class="div-inline" @changeSelect="changeSelect"></datepicker>
        </div>
        <el-form-item>
          <el-select v-model="departmentId" placeholder="请选择事业部">
            <el-option label="请选择事业部" value=''></el-option>
            <el-option v-for="(item,key,index) in departmentMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="provinceArea" placeholder="请输入省区"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="applyType" placeholder="申请类型">
            <el-option label="申请类型" value=''></el-option>
            <el-option v-for="(val,key,idx) in applyTypelist" :label="val" :value="key"
                       :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="applyStatus" placeholder="申请单状态">
            <el-option label="申请单状态" value=''></el-option>
            <el-option v-for="(val,key,idx) in applyStatuslist" :label="val" :value="key"
                       :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="staffName" placeholder="请输入人员姓名"></el-input>
        </el-form-item>
        <div class="div-inline el-button-red" @click="toInquire()">查询</div>

      </el-form>
    </div>
    <div class="table_wrap">


      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark">

        <el-table-column prop="userApplyNo" label="编号">
          <template slot-scope="scope">
            <!--isRead 是否已读  1是 2否-->
            <div>{{scope.row.userApplyNo}}</div>
            <div :class="scope.row.isRead==2?'newData':''"></div>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="提交时间"></el-table-column>
        <el-table-column prop="departmentId" label="事业部">
          <template slot-scope="scope">
            {{ scope.row.departmentId == 0 ? "顶级部门" : scope.row.departmentId == 1 ? "心脑事业部" : scope.row.departmentId == 2 ? "风湿及骨科事业部" : scope.row.departmentId == 3 ? "云事业部" : "消化事业部"}}
          </template>
        </el-table-column>
        <el-table-column prop="managerName" label="省区经理"></el-table-column>
        <el-table-column prop="provinceName" label="所属省区"></el-table-column>
        <el-table-column prop="applyType" label="申请类型">
          <template slot-scope="scope">
            {{ scope.row.applyType == 1 ? "新增" : scope.row.applyType == 2 ? "修改" : scope.row.applyType == 3 ? "离职" : "解禁"}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="人员姓名"></el-table-column>
        <el-table-column prop="position" label="人员职务">
          <template slot-scope="scope">
            {{ scope.row.position == 1 ? "省区经理" : scope.row.position == 2 ? "地区经理" : scope.row.position == 3 ? "县区经理" : "省办人员"}}
          </template>
        </el-table-column>
        <el-table-column prop="treeName" label="部门"></el-table-column>
        <el-table-column prop="applyStatus" label="申请单状态">
          <template slot-scope="scope">
            {{ scope.row.applyStatus == 1 ? "待提交" : scope.row.applyStatus == 2 ? "待审核" : scope.row.applyStatus == 3 ? "审核通过" : scope.row.applyStatus == 4 ? "审核不通过" : scope.row.applyStatus == 5 ? "审核暂缓" : scope.row.applyStatus == 6 ? "已撤回" : "已删除"}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operateBtn" @click="viewDetail(scope.row.id)">查看详情</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords'
                     :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' v-on:clickpage="updataPage"></el-pagination>
    </div>
  </div>

</template>

<script>
  import elPagination from 'components/el-page';
  import datepicker from 'components/data-plugin'
  import {getPersonAplData,userApplyInfoIsRead} from 'src/api/headquarter_url/personManage';

  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
        departmentId: '',
        departmentMenu:{1:'心脑事业部',2:'风湿及骨科事业部',3:'云事业部',4:'消化事业部'},//事业部列表
        provinceArea: '',  //请输入省区
        applyType: '',//申请类型
        applyTypelist: {1:'新增',2:'修改',3:'离职',4:'解禁'},
        applyStatus: '',//申请单状态
        applyStatuslist:{1:'待提交',2:'待审核',3:'审核通过',4:'审核不通过',5:'审核暂缓',6:'已撤回',7:'已删除'},
        staffName: '',//人员姓名
        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize: 10,
        pagin_show: '',
        tableData3: [],
        infoList: []

      }
    },
    mounted() {
      let datalist = this.getsearchInfo(this.pageIndex,this.pageSize);
      this.initData(datalist)
    },
    components: {
      datepicker,
      elPagination
    },
    methods: {
      //页面初始化
      initData(datalist) {
        //获取table数据列表和分页信息
        getPersonAplData(datalist).then(res => {
          if(res.data.code==1){
            const datas=res.data.data;
            if(datas.dataList.length>0){
              this.totalRecords=datas.totalRecords;
              this.totalPageCnt=datas.totalPageCnt;
              this.pageIndex=datas.pageIndex;
              this.tableData3= datas.dataList;
              this.pagin_show= true;
            }else{
              this.tableData3= [];
              this.pagin_show= false;
            }
          }else{
            this.pagin_show= false;
          }
        });
      },
      //获取参数
      getsearchInfo(pageIndex,pageSize) {
        let datalist = {
          pageIndex: pageIndex
          , pageSize: pageSize
          , provinceName: this.provinceArea
          , applyType: this.applyType
          , departmentId: this.departmentId
          , startDate: this.startDate
          , endDate: this.endDate
          , applyStatus: this.applyStatus
          , name:this.staffName
        };
        return datalist;
      },
      //日期组件
      changeSelect(val) {
        val.type == "startDate" ? this.startDate = val.data : this.endDate = val.data;
      },
      //查询
      toInquire() {
        let datalist = this.getsearchInfo(1,this.pageSize);
        this.initData(datalist);
      },

      //查看详情
      viewDetail($id) {
        console.log($id);
        userApplyInfoIsRead({applyId: $id}).then(res => {
          //未读变成已读
          console.log("未读变已读")
        })
        this.$router.push({path:'/viewDetailPAZB',query:{id:$id}});
        /*getdDetailPAData({applyId: $id}).then(res => {
          this.infoList = res.data.data.obj;
        })*/
      },
      //点击分页
      updataPage(val){
        this.pageSize = val.pageSize;
        this.pageIndex = val.pageIndex;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },
    }
  }
</script>
<style lang='scss' scoped>
  .el-form--inline .el-form-item {
    height: 40px;
  }
  .newData {
    position: absolute;
    width: 50px;
    height:40px;
    top: 0;
    left: 0;
    background: url(../../../assets/images/weidu_03.png) left top no-repeat;
  }
</style>
