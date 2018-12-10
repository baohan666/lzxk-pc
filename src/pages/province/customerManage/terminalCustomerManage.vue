<!--省区：终端客户管理-->
<template>
  <div>
    <div class="search_wrap">
      <el-form  :inline="true" class="demo-form-inline">
        <el-form-item label="客户名称：">
          <el-input v-model="clinicName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户类型：">
          <el-select v-model="customType" placeholder="请选择客户类型" @focus="getCusType()">
            <el-option label="请选择客户类型" value='0'></el-option>
            <el-option v-for="(item,key,index) in customerList" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户联系人：">
          <el-input v-model="username" placeholder="请输入客户联系人"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input v-model="name" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <!--暂时隐藏-->
        <!--<div class="div-inline select-more" @click = "spreadCon()">
          更多筛选 <i class="el-icon-arrow-down"></i>
        </div>-->
        <div class="div-inline el-button-red" @click = "toInquire()">查询</div>
        <div class="div-inline el-button-red" @click = 'exportData()'>导出</div>

      </el-form>
      <el-form ref="form" :inline="true" class="demo-form-inline slideDown">
        <el-form-item label="创建人：">
          <el-input v-model="createUser" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <div class="province_city_county">
          <el-form-item label="所在地区：">
            <address-plugin v-on:seleSuccess="seleSuccess" required='false'></address-plugin>
          </el-form-item>
        </div>
        <el-form-item label="法人：">
          <el-input v-model="legalPerson" placeholder="请输入法人"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号：">
          <el-input v-model="businessLicense" placeholder="请输入营业执照号"></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div class="table_wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark" >

        <el-table-column prop="clinicName" label="客户名称" width="100"></el-table-column>
        <el-table-column prop="customType" label="客户类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.customType == 1 ? "诊所" : scope.row.customType == 2 ? "乡镇卫生院" : scope.row.customType == 3 ? "村卫生室" : scope.row.customType == 4 ? "单体药房" : scope.row.customType == 5 ? "连锁药房" : scope.row.customType == 6 ? "民营医院" : scope.row.customType == 7 ? "专科医院" : scope.row.customType == 8 ? "综合医院" : "军队医院"}}
          </template>
        </el-table-column>
        <el-table-column prop="belongsArea" label="所属区域"></el-table-column>
        <el-table-column prop="detail" label="详细地址"></el-table-column>
        <el-table-column prop="businessLicense" label="营业执照号"></el-table-column>
        <el-table-column prop="username" label="客户联系人"></el-table-column>
        <el-table-column prop="clinicPhone" label="联系人电话"></el-table-column>
        <el-table-column prop="name" label="负责人"></el-table-column>
        <el-table-column prop="mobile" label="负责人手机号"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operateBtn" @click="view(scope.row.id)">查看</div>
            <div class="operateBtn" @click="allot(scope.row.id)">分配</div>
            <div class="operateBtn" @click="cancelAllot(scope.row.id)">取消分配</div>
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
    <!--分配弹窗begin-->
    <el-dialog title="分配人员" :visible.sync="dialogAllotVisible" :append-to-body='true'>
      <div class= 'dialog_body_content'>
        地县经理：
        <el-select v-model="allotList.showlist" filterable remote reserve-keyword placeholder="请输入并选择地县经理"
                   @change="((item)=>{currentSel(item)})"
                   :remote-method="((item)=>{remoteMethod(item)})"
                   :loading="loading" style="width:80%;">
          <el-option
            v-for="(menu,index) in provinNamList"
            :key="index"
            :label="menu.name+'    '+menu.areaManager+'    '+(menu.position==3?'县区经理':menu.position==4?'地区经理':'')"
            :value="menu">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogAllotVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="allot_sure">确定</span>
      </div>
    </el-dialog>
    <!--分配弹窗end-->
  </div>

</template>

<script>
  import {getStore,setStore,setDepartment,getAliOssUrl} from 'src/config/cache'

  import addressPlugin from 'components/address';
  import elPagination from 'components/el-page';
  import {getTerCustomData,getCusTypeData,exportInfoData,cityCountyName,judge,allot,cancelProvinNamData} from 'src/api/province_url/customerManage';//调接口

  export default {
    data() {
      return {
        clinicName: '',//客户名称
        customType: '',//客户类型
        username: '',//客户联系人
        name: '',//负责人
        createUser: '',//创建者
        provinceCode: '',//省区code
        cityCode: '',//市区code
        countyCode: '',//县区code

        legalPerson: '',//法人
        businessLicense: '',//营业执照

        customerList: [],//客户列表
        departmentMenu: [],//事业部列表


        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize:10,
        pagin_show:true,

        tableData:[],//table列表


        dialogAllotVisible:false,//分配弹窗
        loading: false,
        allotList:{
          showlist:'',//省区经理-省区名--事业部的拼接
          userId: '',//省区经理ID
          billId: ''//基本信息id
        },
        provinNamList:[],//可供选择的省区经理名字列表

      }
    },
    mounted(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
      this.initData(datalist)
    },
    components:{
      elPagination,
      addressPlugin
    },
    methods: {
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        getTerCustomData(datalist).then(res => {
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
        if (getStore('departmentMenu')) {
          this.departmentMenu = JSON.parse(getStore('departmentMenu'));
        }else{
          this.departmentMenu = setDepartment();

        };
        console.log(this.departmentMenu);
      },
      //获取table列表数据请求参数
      getsearchInfo(pageIndex,pageSize){
        let datalist = {
          pageIndex:pageIndex
          ,pageSize:pageSize
          ,clinicName:this.clinicName//客户名称
          ,customType:this.customType//客户类型
          ,username: this.username//客户联系人
          ,name: this.name//负责人
          ,createUser:this.createUser//创建者
          ,provinceCode: this.provinceCode//省区code
          ,cityCode: this.cityCode//市区code
          ,countyCode: this.countyCode//县区code
          ,legalPerson: this.legalPerson//法人
          ,businessLicense: this.businessLicense//营业执照号
        };
        return datalist;
      },
      //获取客户类型
      getCusType(){
        getCusTypeData('').then(res =>{
          this.customerList = res.data.data;console.log(this.customerList);
        })
      },
      //查询
      toInquire(){
        let datalist=this.getsearchInfo(1,this.pageSize);
        this.initData(datalist);
      },
      //导出
      exportData(){
        let datalist = {
          clinicName:this.clinicName
          ,customType:this.customType
          ,username: this.username
          ,name: this.name
          ,createUser:this.createUser
          ,provinceCode: this.provinceCode//省区code
          ,cityCode: this.cityCode//市区code
          ,countyCode: this.countyCode//县区code

          ,legalPerson: this.legalPerson
          ,businessLicense: this.businessLicense
        };
        exportInfoData(datalist).then(function(res){
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
      //查看详情
      view($id){
        this.$router.push({path:'/viewterminCustomerSQ',query:{id:$id}});
      },
      //分配
      allot($id){
        console.log($id);
        this.allotList.showlist='';
        this.billId = $id;
        this.dialogAllotVisible = true;
      },

      //实时获取省区经理列表
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          cityCountyName({name:query}).then(res => {
            this.loading = false;
            if(res.data.data.length>0){//有数据
              console.log("有数据：",res.data.data)
              let data=res.data.data;
              this.provinNamList = data;
              /*data.forEach((menu,index)=>{
                let positionName=menu.position==3?'县区经理':menu.position==4?'地区经理':menu.position==5?'省区经理':'省办人员';
                this.provinNamList.push(positionName)
              })*/
              console.log("this.provinNamList：",this.provinNamList)
            }else{//无数据
              this.provinNamList = [];
            }
          })
        } else {
          this.provinNamList = [];
        }
      },
      //选择省区
      currentSel($val){
        console.log("选择省区$val：",$val)
        this.userId = $val.userId;//分配确定按钮调接口传参用
        /*judge*/
        let obj={
          provinceCode:$val.provinceCode,//实时获取省区经理列表中后台返回的provinceCode
          clinicId:this.billId//table列表里'分配'按钮所在行的id
        }
        judge(obj).then(res => {
          console.log("调judge接口res:",res)
          let pName=$val.position==3?'县区经理':$val.position==4?'地区经理':$val.position==5?'省区经理':'省办人员';
          this.allotList.showlist = $val.name+"    "+$val.areaManager+"    "+pName;
        })

      },
      //分配确定按钮
      allot_sure(){
        /*allot,*/
        if(this.allotList.showlist==""||this.allotList.showlist.length==0){
          this.$message.error('请输入并选择分配人员');
          return false;
        }else{
          allot({clinicId : this.billId, userId : this.userId}).then(res => {
            console.log("调allot接口res:",res);
            this.dialogAllotVisible = false;
          })
        }
      },

      //取消分配
      cancelAllot($id){
        this.$confirm('您确定要取消该客户的分配状态吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          console.log("确定");
          cancelProvinNamData({clinicId:$id}).then(res => {
            console.log("取消分配成功");
            let datalist=this.getsearchInfo(this.pageIndex,this.pageSize)
            this.initData(datalist);//重新加载table
          })
        }).catch(() => {//取消
          console.log("取消");
        });
      },
      //企业地址
      seleSuccess($val){
        this.provinceCode = $val.provinceCode;
        this.cityCode = $val.cityCode;
        this.countyCode = $val.countyCode;
      },
      //点击筛选更多==-
      spreadCon(){
        let myDiv = document.querySelector(".slideDown");
        if(myDiv.classList.contains('spreadSlowlly')){
          myDiv.classList.remove("spreadSlowlly");
          return false;
        }
        myDiv.classList.add("spreadSlowlly");
      },
      //点击分页
      updataPage : function(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },
      number(){
        this.phone=this.phone.replace(/[^\.\d]/g,'');
        this.phone=this.phone.replace('.','');
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
    padding:20px 30px;
  }
  .operateBtn{
    display: inline-block;
    color: #1f5dbc !important;
    margin-right: 8px;
    cursor: pointer;
  }
</style>
