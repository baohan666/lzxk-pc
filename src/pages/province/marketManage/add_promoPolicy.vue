<template>
  <div class="create_wraper">
    <go-back title="新增促销政策"></go-back>
    <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-form-inline">

      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
        <div class="detail_content">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="政策类型：" class="is-required">
                <el-select v-model="ruleForm.policyType" placeholder="请选择政策类型" @change ="policyChange">
                  <el-option  label="奖励政策" value="2" key="1"></el-option>
                  <el-option  label="回款奖励" value="3" key="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政策名称：" class=" is-required">
                <el-input v-model="ruleForm.title" placeholder="请输入政策名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <div class="div-inline el-form-item is-required">
                <div class="div-inline el-form-item__label">政策有效期：</div>
                <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'policyValidDate')"></datepicker>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="div-inline el-form-item">
                <div class="div-inline">核销期间：</div>
                <datepicker startIsShow = "true" endIsShow= "true" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'verifyDate')"></datepicker>
              </div>
            </el-col>
            <el-col :span="7" v-show="ruleForm.policyType == 2">
              <div class="div-inline el-form-item is-required">
                <div class="div-inline el-form-item__label">政策子类型：</div>
                <el-select v-model="ruleForm.policyTypeCheck" placeholder="请选择政策子类型">
                  <el-option label="请选择政策子类型" value=''></el-option>
                  <el-option  label="人员变动" value="1" key="1"></el-option>
                  <el-option  label="库存处理" value="2" key="2"></el-option>
                  <el-option  label="纯回款奖励" value="3" key="3"></el-option>
                  <el-option  label="会议奖励" value="4" key="4"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">政策说明:<textarea class="poliyMark" v-model="ruleForm.remark" name="" id="" cols="30" rows="10"></textarea></el-col>
          </el-row>
        </div>
      </div>
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>政策规则</div>

        <div class = "table_wrap">
          <!--选择商品弹窗-->
          <select-goods title="选择商品" @getGoodsList="getGoodsList" ref="dialogSeleGoods" :goodsList="goodsList" :policyType="policyType" :isradio="isradio" @selectAwardGoods="selectAwardGoods" @closeGoodsDiolog="closeGoodsDiolog" @uploadData="uploadData">
          </select-goods>
          <div v-if="awardGoods=='hide'" class = "viewRemark" @click="selectAwardGoods">请选择需回款商品</div>
          <div v-if = "awardGoods=='show'">
            <!--奖励商品-->
            <el-table v-if="ruleForm.policyType==2" :data="ruleForm.tableData1" border tooltip-effect="dark">
              <el-table-column :render-header="renderHeader">
                <template slot-scope="scope">
                  <div>{{scope.row.goodsName}}<span class="viewRemark" @click = "deleScopeRow(scope.row.goodsId)">删除</span></div>
                  <div>{{scope.row.specsMax}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="awardNum" label="奖励数量">
                <template slot-scope="scope">
                  <input class="tableInput" type="number" oninput="if(value.length>8)value=value.slice(0,8)" v-model="scope.row.awardNum" v-vue-onkeypress>
                </template>
              </el-table-column>
              <el-table-column prop="afterDiscountPrice" label="折后价">
                <template slot-scope="scope">
                  <input class="tableInput" v-model="scope.row.afterDiscountPrice" type="number" oninput="if(value.length>8)value=value.slice(0,8)" @keydown="handleInput2">
                </template>
              </el-table-column>
              <el-table-column prop="batchNumber" label="指定批号">
                <template slot-scope="scope">
                  <input class="tableInput" v-model="scope.row.batchNumber" v-vue-onkeypress>
                </template>
              </el-table-column>
            </el-table>
            <!--请选择主品和奖励商品-->
            <template v-if="isHuiKuan">
              <!--回款商品-->
              <mainTable @selectAwardGoods="selectAwardGoods" @delItem="delItem" :items="mainList"></mainTable>
              <!--奖励商品-->
              <subTable @selectAwardGoods="selectAwardGoods" @delItem="delItem" :items="subList"></subTable>
            </template>
          </div>
        </div>
      </div>
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>适用范围</div>
        <div class = "detail_table">
          <span class="viewRemark" @click="setRange()">设置</span>
          <releaseRange ref="dialogSeleProMa" :isView="false"  :dialogRangeVisible="dialogRangeVisible" :relRangeList ="ruleForm.rangeList" title ="发布范围" @setProvMange = "setProvMange"></releaseRange>
        </div>
      </div>
    </el-form>
    <div class="operateWraper">
      <div class="div-inline el-button-red" @click = "saveAddPolGoods">保存</div>
    </div>
  </div>
</template>

<script>
  import goBack from 'src/components/goBack';
  import departComponet from 'src/headComponent/departComponent';
  import datepicker from 'components/data-plugin';
  import elPagination from 'components/el-page';
  import selectGoods from 'src/headComponent/selectGoods';
  import releaseRange from './releaseRange';
  import mainTable from 'src/pages/headquarter/marketManage/main_table';
  import subTable from 'src/pages/headquarter/marketManage/sub_table';
  import {getGoods, getRangeProvince, savePolGoods} from 'src/api/province_url/promotionPolicy';
  export default {
    data() {
      return {
        ruleForm:{
          policyType: '',//政策类型
          policyTypeCheck: '',//政策子类型
          policyStartDate:'',//政策有效期
          policyEndDate:'',//政策有效期
          title:'',//政策名称
          verificationStartDate: '',//核销起始时间
          verificationEndDate: '',//核销结束时间
          // departmentId: '',//事业部
          remark: '',//政策说明

          tableData1:[],//奖励商品policyType==2
          tableData2:[],//单品回款奖励policyType==3
          tableData5:[],//单品回款奖励 奖励商品policyType==3

          tableData3:[],//多主品回款奖励policyType==4
          tableData6:[],//多主品回款奖励 奖励商品 policyType==4

          rangeList:[],
          userId:[]//用户id
        },
        goodsList:'',//
        policyType:'',
        isradio:false,
        dialogSeleGoodsVisible:false,//选择需回款商品

        tableData: [{goodsNamem:"",specsMaxm:""}],
        selectType: '',//选择类型，主品“mulAwardGoods”，奖励为“”
        mainList:[],//主品
        subList: [],//奖励商品
        goodsIdm:[],//主品id
        goodsId:[],//奖励商品id
        pageIndex: 1,//当前页
        pageSize:10,
        dialogRangeVisible:false,//适用范围弹窗
        awardGoods: "hide",//选择需回款商品
        handleType:'',//1需回款商品 2奖励商品
        isHuiKuan:false,//是否为回款政策
      }
    },
    created() {

    },
    components:{
      goBack,
      departComponet,
      datepicker,
      elPagination,
      selectGoods,
      releaseRange,
      mainTable,
      subTable
    },
    methods: {
      //日期组件
      changeSelect(val,type){console.log(val,type);
        if(type == "policyValidDate"){
          val.type == "startDate"?this.ruleForm.policyStartDate = val.data : this.ruleForm.policyEndDate = val.data;
        }else{
          val.type == "startDate"?this.ruleForm.verificationStartDate = val.data : this.ruleForm.verificationEndDate = val.data;
        }
      },
      //选择需回款商品
      selectAwardGoods(params){
        if(params.handleType != undefined){
          this.handleType = params.handleType;
         }
        if(params.pageIndex == 1){
          this.pageIndex = params.pageIndex;
        }
        params.handleType=='1' ? this.selectType= 'mulAwardGoods' : this.selectType= '';
        let datalist = {
          goodsName:params.name == undefined?"":params.name,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        //奖励政策直接选择商品，单品和多品先选择主品再选择奖励商品
        if(this.policyType!=''){
          if((this.policyType !=2 && this.awardGoods=='show') || this.policyType ==2 || this.policyType !=2 && this.mainList.length>0){
            getGoods(datalist).then( res =>{
              this.goodsList = res.data.data;
              this.$refs.dialogSeleGoods.dialogShow();
            });
          }else if(this.policyType !=2 && this.mainList.length == 0 && this.awardGoods=='hide'){
            this.awardGoods='show';
            this.isHuiKuan=true;
          }
        }else{
          this.$message.success('请先选择政策类型');
        }
      },
      //获取商品列表
      getGoodsList(val){
        this.pageIndex = val.pageIndex;
        this.pageSize = val.pageSize;
        let datalist = {
          departmentIds: this.ruleForm.departmentId,
          goodsName:this.$refs.dialogSeleGoods.formInline.goodsName,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        getGoods(datalist).then( res =>{
          this.goodsList = res.data.data;
        });
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
//        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      //选择商品确定按钮
      uploadData(val){
        if(this.ruleForm.policyType==2){//奖励商品
          val.forEach((item, index, arr) => {
            if(!this.goodsId.includes(item.id)){
              let	arraylist={
                goodsId: item.id,//商品id--奖励商品的id
                awardNum:'',//奖励数量
                afterDiscountPrice: '',//折后价
                batchNumber: '',//指定批号
                goodsName: item.goodsName,//商品名称
                specsMax: item.specsMax,//商品规格
              }
              this.ruleForm.tableData1.push(arraylist);
              this.goodsId.push(item.id)//奖励商品id
              this.ruleForm.userId = [];//清空使用范围
            }
          })
          this.awardGoods='show';

        }else if(this.ruleForm.policyType!=2){//单品和多品回款奖励
          if(this.handleType == 1){//如果还没选择主品
            val.forEach((item, index, arr) => {
              if(!this.goodsIdm.includes(item.id)){
                let arraylist='';
                arraylist = {
                  goodsIdm:  item.id,//商品id---主品的商品id--加了m区分
                  goodsNamem: item.goodsName,//商品名称--主品的商品名字-加m区别奖励
                  specsMaxm: item.specsMax,//商品规格-区分
                  collectionNum: '',//回款商品数量
                };
                this.mainList.push(arraylist);
                this.goodsIdm.push(item.id)//主品id
                this.ruleForm.userId = [];//清空使用范围
              }
            })
          }else if(this.handleType == 2){//已经选择主品
            val.forEach((item, index, arr) => {
              if(!this.goodsId.includes(item.id)){
                let arraylist='';
                arraylist ={
                  goodsId: item.id,//商品id--奖励商品的id
                  awardNum:'',//奖励数量
                  afterDiscountPrice: '',//折后价
                  batchNumber: '',//指定批号
                  goodsName: item.goodsName,//商品名称
                  specsMax: item.specsMax,//商品规格
                }
                this.subList.push(arraylist);
                this.goodsId.push(item.id)//奖励商品id
                this.ruleForm.userId = [];//清空使用范围
              }
            })
          }
          this.ruleForm.tableData2=[];
          this.ruleForm.tableData3= [];
          this.subList.forEach((item,index,arr) => {
            let tablist={};
            if(this.mainList.length-1<index){
              tablist={...item, ...this.mainList[this.mainList.length-1]};
            }else{
              tablist={...item, ...this.mainList[index]};
            }
            this.policyType==3 ? this.ruleForm.tableData2.push(tablist) :this.ruleForm.tableData3.push(tablist);
          })
          this.tableData = this.mainList;
          this.awardGoods='show';

        }
      },
      //自定义表头
      renderHeader(h) {
        return h('div',[
            h('span', '奖励商品'),
            h('el-button', {
              'class':['el-button--small'],
              on:{
                click: ()=>{this.selectAwardGoods({});console.log("赠品添加")}
                // click: ()=>{console.log("赠品添加")}
              }
            },'添加奖励商品')
          ]

        )
      },
      renderHeader1(h) {
        return h('div',[
            h('span', '需回款商品'),
            h('el-button', {
              'class':['el-button--small'],
              on:{
                click: ()=>{this.selectAwardGoods(null , 'mulAwardGoods');console.log("主品添加")}
                // click: ()=>{console.log("主品添加")}
              }
            },'添加需回款商品')
          ]

        )
      },
      //删除回款奖励商品
      delItem(params){
        if(params.handleType == 1){//删除需回款商品
          this.mainList = this.mainList.filter(p=>p.goodsIdm!=params.goodId)
          this.goodsIdm = this.goodsIdm.filter(p=>p!=params.goodId)
        }
        if(params.handleType == 2){//删除奖励商品
          this.subList = this.subList.filter(p=>p.goodsId!=params.goodId)
          this.goodsId = this.goodsId.filter(p=>p!=params.goodId)
        }
        this.ruleForm.userId = [];//清空使用范围
      },
      //删除政策回款商品
      deleScopeRow(goodsId){
        this.ruleForm.tableData1 = this.ruleForm.tableData1.filter(p=>p.goodsId!=goodsId);
        this.goodsId = this.goodsId.filter(p=>p!=goodsId);
        this.ruleForm.userId = [];//清空使用范围
      },
      //选择政策--重新赋值
      policyChange(val){
        this.ruleForm.policyType=val;
        this.policyType= val;
        this.awardGoods='hide';//商品列表隐藏
        this.isHuiKuan=false;//商品列表隐藏
        this.mainList = [];
        this.subList = [];
        this.goodsIdm = [];//主品id
        this.goodsId = [];//奖励商品id
        this.ruleForm.tableData1 = [];
        this.tableData=[{goodsNamem:"",specsMaxm:""}];
      },

      //适用范围
      setRange(){
        if(this.goodsId.length==0){
          this.$message.success("请先选择回款商品");
        }else{
          let datalist = {
            goodsId: this.goodsId.toString(),
            goodsIdm: this.goodsIdm.toString(),
            policyType: this.policyType
          };

          getRangeProvince(datalist).then( res => {
            this.ruleForm.rangeList = res.data.data;
          });
          this.$refs.dialogSeleProMa.dialogShow();
        }
      },
      //关闭商品弹窗
      closeGoodsDiolog(){
        this.dialogSeleGoodsVisible =false;
      },
      //关闭适用范围弹窗
      closeDiolog(){
        this.dialogRangeVisible =false;
      },

      //点击分页
      updataPage(val){
        let datalist=this.getsearchInfo(val.pageIndex,val.pageSize);
        this.initData(datalist)
      },
      //设置适用范围
      setProvMange(val){
        this.ruleForm.userId = [];
        val.forEach(p => {
          this.ruleForm.userId.push(p.userId);
        })
      },
      //保存按钮
      saveAddPolGoods(){
        if(this.ruleForm.policyType==''){
          this.$message.success("请选择政策类型")
          return false;
        }else if(this.ruleForm.title.trim()==''){
          this.$message.success("请输入政策名称")
          return false;
        }else if(this.ruleForm.policyType==2&&this.ruleForm.policyTypeCheck==''){
          this.$message.success("请选择政策子类型")
          return false;
        }else if(this.ruleForm.policyStartDate==''||this.ruleForm.policyEndDate == ''){
          this.$message.success("请选择政策有效期")
          return false;
        }
        let policyRule=[];
        let isSubmit = false;
        if(this.ruleForm.policyType==2){//奖励政策
          if(this.ruleForm.tableData1.length>0){
            let obj = {};
            let _num = 0;
            const _arr = this.ruleForm.tableData1.slice();
            _arr.reverse().forEach(p=>{
              if(p.awardNum.trim().length>0&&p.afterDiscountPrice.trim().length>0){
                _num+=1;
                obj = {
                  "goodsId":p.goodsId //商品id
                  ,"awardNum":p.awardNum//奖励数量，必填
                  ,"discountPrice":p.afterDiscountPrice //折后价,必填
                  ,"batchNumber":p.batchNumber   //指定批号
                }
                policyRule.push(obj);
              }else{
                if(p.awardNum.trim().length==0){
                  this.$message.success("请输入【"+p.goodsName+"】的奖励数量")
                  isSubmit = false;
                  return false;
                }else if(p.afterDiscountPrice.trim().length==0){
                  this.$message.success("请输入【"+p.goodsName+"】的折后价")
                  isSubmit = false;
                  return false;
                }
              }
            })
            if(_num == this.ruleForm.tableData1.length){
              isSubmit = true;
            }else{
              isSubmit = false;
            }
          }else{
            this.$message.success("请完善政策规则")
            isSubmit = false;
            return false;
          }
        }else{//回款奖励
          const mainArray = [];
          const subArray = [];
          if(this.mainList.length==0){
            this.$message.success("请添加需回款的商品")
            isSubmit = false;
            return false;
          }else{
            const mainArr = this.mainList.slice();
            let obj = {};
            let _num = 0;
            mainArr.reverse().forEach(p=>{
              if(p.collectionNum.trim().length>0){
                _num += 1;
                obj = {
                  "goodsId":p.goodsIdm//商品id
                  ,"collectionNum": p.collectionNum//回款数量
                }
                mainArray.push(obj)
              }else{
                if(p.collectionNum.trim().length==0){
                  this.$message.success("请输入【"+p.goodsNamem+"】的回款商品数量");
                  isSubmit = false;
                  return false;
                }
              }
            })
            if(_num == this.mainList.length){
              isSubmit = true;
            }else{
              isSubmit = false;
            }
          }
          if(isSubmit){
            if(this.subList.length==0){
              this.$message.success("请添加奖励的商品")
              isSubmit = false;
              return false;
            }else{
              const subArr = this.subList.slice();
              let obj = {};
              let _num = 0;
              subArr.reverse().forEach(p=>{
                if(p.awardNum.trim().length>0&&p.afterDiscountPrice.trim().length>0){
                  _num += 1;
                  obj = {
                    "goodsId":p.goodsId  //商品id
                    ,"awardNum":p.awardNum //奖励数量，必填
                    ,"discountPrice":p.afterDiscountPrice //折后价,必填
                    ,"batchNumber":p.batchNumber    //指定批号
                  }
                  subArray.push(obj)
                }else{
                  if(p.awardNum.trim().length==0){
                    this.$message.success("请输入【"+p.goodsName+"】的奖励数量")
                    isSubmit = false;
                    return false;
                  }else if(p.afterDiscountPrice.trim().length==0){
                    this.$message.success("请输入【"+p.goodsName+"】的折后价")
                    isSubmit = false;
                    return false;
                  }
                }
              })
              if(_num == this.subList.length){
                isSubmit = true;
              }else{
                isSubmit = false;
              }
            }
            policyRule = {
              "mainArray":mainArray
              ,"subArray":subArray
            }
          }
        }

        if(isSubmit && this.ruleForm.userId.length==''){
          this.$message.success("请设置适用范围");
          isSubmit = false;
          return false;
        }
        if(isSubmit){
          let datalist = {
            policyType: this.ruleForm.policyType,//政策类型
            policyStartDate: this.ruleForm.policyStartDate,//政策有效期
            policyEndDate: this.ruleForm.policyEndDate,//政策有效期
            title: this.ruleForm.title,//政策名称
            verificationStartDate: this.ruleForm.verificationStartDate,//核销起始时间
            verificationEndDate: this.ruleForm.verificationEndDate,//核销结束时间
            remark: this.ruleForm.remark,//政策说明
            policyRule: JSON.stringify(policyRule),
            policyRange: this.ruleForm.userId.toString(),
            policyTypeCheck:this.ruleForm.policyTypeCheck,//政策子类型
          }
          savePolGoods(datalist).then( res =>{
            if(res.data.code == 1){
              this.$router.go(-1);
            }else{
              this.$message.success(res.data.msg);
            }
          })
        }
      }
    }
  }
</script>
<style type="text/css">
  .el-form--inline .el-form-item__content{
    vertical-align: middle;
  }
</style>
<style lang="scss" scoped="scoped">

  .containInfo_wraper {
    margin: 20px 30px;
    background: #ffff;
    border: 1px solid #e6e6e6;
    overflow: hidden;
  .detail_title {
    padding: 0 20px;
    line-height: 50px;
    color: #1f5dbc;
    font-size: 14px;
  .line_Icon {
    display: inline-block;
    width: 4px;
    height: 14px;
    vertical-align: middle;
    margin-right: 5px;
    border-radius: 20%;
    background: #1f5dbc;
  }
  border-bottom:1px solid #e6e6e6;
  }
  .detail_content {
    padding: 20px 29px 20px;
    line-height: 49px;
    font-size: 14px;
  .poliyMark{
    border:1px solid #e6e6e6;
    border-radius:5px;
    width:85%;
    height:70px;
    vertical-align: middle;
    margin-left:20px;
    padding:10px;
    line-height:26px;
  }

  }
  .table_wrap{
    margin-top: 0;
    border: none;
    padding:20px 39px;
  .tableInput{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    width: 60%;

  }
  }
  .detail_table{
    padding:20px 39px;
  }
  .viewRemark{
    margin-left:10px;
    color : #1f5dbc;
    font-size:14px;
  }
  }
  .operateWraper {
    margin: 20px;
    text-align: center;
  .el-button-red {
    padding: 0 0.5rem;
  }

  }


</style>
