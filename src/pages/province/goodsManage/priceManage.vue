<!--作者：朱
价格管理
对接接口：于婷-->

<template>
  <div>
    <div class="search_wrap">
      <el-radio-group v-model="radioActive" @change="changeHandler" class="selectRadio">
        <el-radio :label="1">按药品</el-radio>
        <el-radio :label="2">按区域经理</el-radio>
      </el-radio-group>
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称：">
          <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="物料类别：" v-show="fication==1">
          <el-select v-model="category" placeholder="请选择物料类别" @focus='getCategory()'>
            <el-option label="请选择物料类别" value='0'></el-option>
            <el-option v-for="(item,key,index) in categoryMenu" :label="item" :value="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!--<div class="div-inline el-form-item">-->
          <!--<depart-componet @selectSuccess = "selectSuccess"></depart-componet>-->
        <!--</div>-->
        <el-form-item label="经理名称：" v-show="fication==2">
          <el-input v-model="userName" placeholder="请输入经理名称"></el-input>
        </el-form-item>
        <el-form-item label="所在区域：" v-show="fication==2">
          <el-input v-model="areaName" placeholder="请输入所在区域"></el-input>
        </el-form-item>
        <div class="div-inline el-button-red" @click = "changeHandler(fication,1)">查询</div>
        <!--<div class="div-inline el-button-red" @click = "ImportPrice()">导入改价</div>-->
      </el-form>
    </div>

    <div class="table_wrap">
      <div v-show="radioActive==1">
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
          <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
          <el-table-column prop="materialCode" label="物料编码"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称"></el-table-column>
          <el-table-column prop="drugType" label="剂型"></el-table-column>
          <el-table-column prop="specsMax" label="规格"></el-table-column>
          <el-table-column prop="specsMin" label="包装规格"></el-table-column>
          <el-table-column prop="category" label="物料类别"></el-table-column>
          <el-table-column prop="cityStPrice" label="标准价-地区"></el-table-column>
          <el-table-column prop="cityPrice" label="定价-地区"></el-table-column>
          <el-table-column prop="countyStPrice" label="标准价-县区"></el-table-column>
          <el-table-column prop="countyPrice" label="定价-县区"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operateBtn" @click="changePrice(scope.row.priceId,scope.row.goodsId,1)">修改省区定价</div>
              <div class="operateBtn" @click="changePrice(scope.row.priceId,scope.row.goodsId,2)">修改个别区域价格</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="radioActive==2">
        <div class="div-inline el-button-red bitchChangePrice"  @click="batchChangePrice">批量改价</div>
        <el-table
          ref="multipleTable"
          :data="tableData" border tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          :empty-text="condition">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="manufacturer" label="生产企业"></el-table-column>
          <el-table-column prop="materialCode" label="物料编码"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称"></el-table-column>
          <el-table-column prop="drugType" label="剂型" width="90"></el-table-column>
          <el-table-column prop="specsMax" label="规格" width="90"></el-table-column>
          <el-table-column prop="specsMin" label="包装规格" width="90"></el-table-column>
          <el-table-column prop="category" label="物料类别" width="90"></el-table-column>
          <el-table-column prop="areaName" label="区域名"></el-table-column>
          <el-table-column prop="userName" label="区域经理" width="120"></el-table-column>
          <el-table-column prop="position" label="职务" width="100"></el-table-column>
          <el-table-column prop="standPrice" label="公司标准价" width="100"></el-table-column>
          <el-table-column prop="fixedPrice" label="区域价" width="100"></el-table-column>
          <el-table-column prop="fewPrice" label="现价" width="100"></el-table-column>
          <el-table-column prop="address" label="操作" width="120">
            <template slot-scope="scope">
              <div class="operateBtn" @click="changePrice(scope.row.priceId, scope.row.areaCode, scope.row.id,scope.row.areaCode)">改价</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination :pageIndex='pageIndex' :pageSize='pageSize' :totalRecords='totalRecords' :totalPageCnt='totalPageCnt' :pagin_show='pagin_show' @clickpage="updataPage"></el-pagination>
    </div>
    <!--分配弹窗begin-->
    <el-dialog title="修改省区定价" :visible.sync="dialogAllotVisible" :append-to-body='true' width="60%">
      <div class= 'dialog_body_content'>
        <p>
          {{detailsArr.goodsName}}&nbsp;&nbsp;
          {{detailsArr.goodsSpec}}&nbsp;&nbsp;
          {{detailsArr.manufacturer}}&nbsp;&nbsp;
          {{detailsArr.drugType}}
        </p> <!--点舌丸   36里x1瓶x200盒   山西双人药业有限责任公司   丸剂-->
        <p>
          公司定价-省区：{{detailsArr.provinceFixedPrice}}
          &nbsp;&nbsp;  公司标准价-地区：{{detailsArr.cityStandardPrice}}
          &nbsp;&nbsp;   公司标准价-县区：{{detailsArr.countyStandardPrice}}
        </p>
      </div>
      <div>
        <div class="div_A">
          <span>省区定价-地区</span>
          <input type="number" :class="['input_A',{biao:inputVal_3<inputVal_1}]" v-model="inputVal_1" @change="inputOnlyOnePoint(1)">
        </div>
        <div class="div_A">
          <span>省区定价-县区</span>
          <input type="number" :class="['input_A',{biao:inputVal_4<inputVal_2}]" v-model="inputVal_2" @change="inputOnlyOnePoint(2)">
        </div>
        <!--menuCounty.managerUserId,-->
        <span class="rizhi_A" @click="showChangePriceLog(detailsArr.priceId, detailsArr.position, detailsArr.userId,detailsArr.goodsId)">改价日志</span>
      </div>
      <div>
        <span class="yuanyin">改价原因：</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="改价原因(必填)"
          maxlength="200"
          v-model="textarea">
        </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogAllotVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="Submission">确定</span>
      </div>
    </el-dialog>
    <!--分配弹窗end-->
    <!--分配弹窗begin-->
    <el-dialog
      title="成功"
      :visible.sync="dialogAllotVisible_A"
      :append-to-body='true'
      width="60%">
      <div class="success_tan">
        提交改价成功，等待总部审核，具体情况可至改价申请单的详情页查看
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="dialog-sure-btn dialoperateBtn" @click="dialogAllotVisible_A = false">确定</span>
      </div>
    </el-dialog>
    <!--分配弹窗end-->
    <changePriceLog ref="changePriceLog" :changPriLogData="changPriLogData"></changePriceLog>
  </div>
</template>

<script>
  import departComponet from 'src/headComponent/departComponent';
  import elPagination from 'components/el-page';
  import {getStore} from 'src/config/cache' // 获取缓存
  import changePriceLog from 'src/components/changePriceLog';
  import {getPricManagDrugData, getPricManagAreaData,getStandardPriceData, getCategoryListData,getChaPriceData,getChaPriceData_1 ,getChangePriceLogData} from 'src/api/province_url/goodsManage';

  export default {
    data() {
      return {
        goodsName: '',//商品名称
        radioActive: 1,//按药品
        depId: '0',//事业部id
        category: '0',//物料
        categoryMenu:[],//物料类别
        userName:'',//经理名称
        areaName:'', // 所属区域

        tableData: [],
        totalRecords: 0,//总条数
        totalPageCnt: 0,//总页数
        pageIndex: 1,//当前页
        pageSize:10,
        pagin_show:true,

        changPriLogData:[],//改价日志数据

        multipleSelection:[],
        fication:1, //点击分类 1：按药品 2：按省区经理
        dialogAllotVisible:false, //修改省区定价 弹层
        dialogAllotVisible_A:false, // 成功弹层
        inputVal_1:0.00, // 省区定价 地区
        inputVal_2:0.00, // 省区定价 县区
        inputVal_3:0.00, // 原始 省区定价 地区
        inputVal_4:0.00, // 原始 省区定价 县区
        textarea:'', //  改价原因
        detailsArr: [], // 修改省区 详情信息
        condition:'请输入查询条件' // 初始化 按区域表格 显示
      };
    },
    created(){
      let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
      this.initData(datalist);
    },
    components:{
      departComponet,
      elPagination,
      changePriceLog
    },
    methods: {
      //按药品和按区域
      changeHandler(val,c){
        this.tableData = [];
      // userId:getStore("accountId") // 当前登录人
        let datalist=this.getsearchInfo(1,this.pageSize); // 获取参数
        console.log(datalist);
        this.condition = '请输入查询条件';
        if (val==1 || c == 1 ){
          if (this.userName!=''||this.areaName!='' ||val==1){
            this.condition = '暂无数据';
            this.initData(datalist);
          }
          else {
            alert('请输入经理名称或者所在区域');
          }

        }
        this.fication = val;// 给选择类别 赋值 1为按药品 2：按省区经理
        console.log(val);
      },
      //页面初始化
      initData(datalist){
        //获取table数据列表和分页信息
        console.log(this.radioActive);
        if(this.radioActive == 1){ // 按药品
          console.log(getStore("accountId"));
          getPricManagDrugData(datalist).then(res => {
            if(res.data.code==1){
              const datas=res.data.data;
              if(datas.dataList.length>0){
                this.totalRecords=datas.totalRecords; // 总天数
                this.totalPageCnt=datas.totalPageCnt; // 总页数
                this.pageIndex=datas.pageIndex; // 当前页
                this.tableData= datas.dataList; // 初始化数组
                this.pagin_show = true;
              }else{
                this.tableData= [];
                this.pagin_show = false;
              }
            }else{
              this.pagin_show = false;
            }
          })
        }else{
          console.log(datalist);
          getPricManagAreaData(datalist).then(res => { // 按经理
            if(res.data.code==1){
              const datas=res.data.data;
              if(datas.dataList.length>0){
                this.totalRecords=datas.totalRecords;// 总天数
                this.totalPageCnt=datas.totalPageCnt;// 总页数
                this.pageIndex=datas.pageIndex;// 当前页
                this.tableData= datas.dataList;// 初始化数组
                this.pagin_show = true;
              }else{
                this.tableData= [];
                this.pagin_show = false;
              }
            }else{
              this.pagin_show = false;
            }
          })
        }
      },

      //批量改价
      batchChangePrice(){
        console.log(this.multipleSelection);
        let areaCode=[];
        let priceId =[];
        this.multipleSelection.forEach((item, index, arr) =>{
          areaCode.push(item.areaCode);
          priceId.push(item.priceId);
        })
        areaCode= Array.from(new Set(areaCode));
        if( areaCode.length==1){
          console.log({"areaCode": areaCode[0], "priceId":priceId.join(",")});
          this.$router.push({"path":"batChangeSQ",query: {"areaCode": areaCode[0], "priceId":priceId.join(",")}});

        }else if( areaCode.length > 1){
          this.$message.success("请选择相同区域的商品")
        }else{
          this.$message.success("请选择需要改价的商品")
        }
      },

      //获取参数
      getsearchInfo(pageIndex,pageSize){
        console.log(this.radioActive);
        let datalist = {};
        if(this.radioActive==1){
          datalist = {
            pageIndex:pageIndex  //当前页-----Y
            ,pageSize:pageSize //每页大小----Y
            ,goodsName: this.goodsName //商品名称
            ,category: this.category //物料类别
            ,depId: this.depId //事业部id
            ,userId:getStore("accountId") // 当前登录人
          };
        }else{
          datalist = {
            pageIndex:pageIndex  //当前页-----Y
            ,pageSize:pageSize //每页大小----Y
            ,goodsName: this.goodsName //商品名称
            ,category: this.category //物料类别
            ,userName: this.userName//经理名称
            ,depId: this.depId //事业部id
            ,areaName:this.areaName // 所属区域
            ,userId:getStore("accountId") // 当前登录人
          };
        }
        return datalist;
      },
      //导入改价
      ImportPrice(){

      },
      //改价
      changePrice(priceId,goodsId,c,d){
      let userId = getStore('accountId');
        console.log(priceId,goodsId,userId);
        if(this.radioActive == 1){//按药品
          if (c==1){ // 省区修改价格弹窗
            if (priceId==null){
              priceId = 0
            }
            let obj = {priceId:priceId, goodsId:goodsId,userId:userId,subSearchName: this.goodsName};
            this.dialogAllotVisible = true;
            this.initData_sheng(obj);
          }else {
            this.$router.push({
              path:'/changePriceSQ',
              query:{
                priceId:priceId,
                goodsId:goodsId,
                userId:userId,
                subSearchName:this.goodsName
              }
            });
          }

          // this.$router.push({path:'/changePriceZB',query:{goodsId:id, subSearchName: this.goodsName}});
          // this.$router.push({path:'/changePriceSQ',query:{priceId:priceId, goodsId:goodsId,userId:userId,subSearchName: this.goodsName}});
        }else{//按区域
          console.log({
            priceId:priceId,
            goodsId:goodsId,
            userId:userId,
            subSearchName: this.goodsName,
            areaCode:d
          });
          this.$router.push({
            path:'/batChangeSQ',
            query:{
              priceId:priceId,
              goodsId:goodsId,
              userId:userId,
              subSearchName: this.goodsName,
              areaCode:d
            }});
          // this.$router.push({path:'/batChangeSQ',query:{"areaCode":code, "priceId":id, "goodsId":gid}});

        }
      },

      //获取物料类别
      getCategory(){
        if(Object.keys(this.categoryMenu).length>0){
          return false;
        }
        getCategoryListData("").then(res => {
          this.categoryMenu = res.data.data;
        })
      },
      //点击事业部
      selectSuccess(val){
        this.depId = val;
      },
      //复选框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //点击分页
      updataPage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
        this.initData(datalist)
      },
      // 点击分类 1：按药品 2：按省区经理
      // fication(a){
      //   console.log(22222);
      // }
      initData_sheng(obj){ // 省区修改价格
        // priceId:priceId, goodsId:goodsId,userId:userId
        getChaPriceData(obj).then(res => {
          console.log(res.data.data);
          this.detailsArr = res.data.data; // 修改省区 详情信息
          this.inputVal_1=res.data.data.cityFiexed; // 省区定价 地区
          this.inputVal_2 =res.data.data.countyFiexed;// 省区定价 县区
          this.inputVal_3=res.data.data.cityFiexed; // 省区定价 地区
          this.inputVal_4 =res.data.data.countyFiexed;// 省区定价 县区
        })
      },
      inputOnlyOnePoint(c) { // 保留两位小数
        if(c==1){
          this.inputVal_1 = (this.inputVal_1-0).toFixed(2);
        }else{
          this.inputVal_2 = (this.inputVal_2-0).toFixed(2);
        }

      },
      // $managerUserId,
      // 查看改价日志
      showChangePriceLog($id, $position, $userId,goodsId){
        let logType = 0;console.log($userId);
        $position=="地区经理" ? logType=2 : logType=3 ; // 1111111111111111
        if ($id==null){
          $id = 0
        }
        let datalist ={
          pageIndex:1,
          pageSize:10,
          priceId:$id,//商品价格表id  //11111111111111111111111111111
          goodsId:goodsId,//商品id
          // managerId:$managerUserId,//省区经理id  // 1111111111111111
          userId:$userId,//省区、地区、县区id //111111111111111111
          logType:logType  //1省区 2地区 3县区
        }
        console.log(datalist);
        getChangePriceLogData(datalist).then(res => {
          this.changPriLogData= res.data.data;
          console.log(this.changPriLogData);
          this.$refs.changePriceLog.dialogShow();
        })
      },
      Submission(){ // 点击改价确定 请求
        if (this.textarea!=''){
          let userId = getStore('accountId');
          let obj = {
            userId:userId,
            priceId:this.detailsArr.priceId,
            reason:this.textarea,priceInfo: '['+
              '{"priceType":"2","oldPrice":'+this.inputVal_3+',"newPrice":'+this.inputVal_1+'},'+
              '{"priceType":"3","oldPrice":'+this.inputVal_4+',"newPrice":'+this.inputVal_2+'}'+
              ']'
          };
          console.log(obj.priceId);
          if (obj.priceId==null){
            obj.priceId=0;
          }
          console.log(obj);
          getChaPriceData_1(obj).then(res => {
            console.log(res.data.data);
            this.dialogAllotVisible=false; // 关闭 修改弹层
            this.dialogAllotVisible_A = true // 显示成功弹层
          }).catch(err=>{
            console.log(err)
          })
        } else{
          this.$message({
            showClose: true,
            message: '改价原因不能为空',
            type: 'error'
          });
        }

      }

    }
  }
</script>
<style lang="scss" scoped="scoped">
  .selectRadio{
    margin-bottom:20px;
  }
  .bitchChangePrice{
    margin-bottom:20px;
  }
  .dialog_body_content{
    padding:16px 20px;
    border-bottom: 1px solid #bfbfbf;
  }
  .input_A{
    border: 1px solid #999;
    width: 60px;
    height: 40px;
    text-align: center;
  }
  .div_A{
    display: inline-block;
    margin-left: 20px;
    margin-top: 10px;
  }
  .rizhi_A{
    float: right;
    margin-right: 60px;
    line-height: 40px;
    color: #1f5dbc ;
  }
  .yuanyin{
    margin: 10px 0 10px 4px;
    font-size: 18px;
    display: inline-block;
  }
  .biao{
    color: #e02222;
  }
  /*.success_tan{*/
    /*display: inline-block;*/
    /*line-height: 300px;*/
    /*!*text-align: center;*!*/
    /*font-size: 26px;*/
    /*margin: 0 auto;*/
  /*}*/
  .success_tan{
    text-align: center;
    font-size: 26px;
    line-height: 100px;
  }
</style>
