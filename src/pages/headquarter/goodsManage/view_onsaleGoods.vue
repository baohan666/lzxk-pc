<!--总部：商品管理：下架商品：查看商品详情-->
<template>
  <div>
    <go-back title="查看商品详情"></go-back>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>物料名称</span>：{{goodsDetai.goodsName}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>物料编码</span>：{{goodsDetai.materialCode}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>生产企业</span>：{{goodsDetai.manufacturer}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>剂型</span>：{{goodsDetai.drugType}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>规格</span>：{{goodsDetai.specsMax}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>包装规格</span>：{{goodsDetai.specsMin}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>物料类别</span>：{{goodsDetai.category}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>批准文号</span>：{{goodsDetai.licenseNumber}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple"><span>单位</span>：{{goodsDetai.unit}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple"><span>版本号</span>：{{goodsDetai.version}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple imgWrap">
              <span>商品图片</span>：
              <viewer :images="goodsDetai.imgList">
                <img v-for="src in goodsDetai.imgList" :src="src" :key="src" width="200">
              </viewer>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>销售信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">可销售事业部：{{goodsDetai.departmentIds}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple">省区经理开票价：{{goodsDetai.provincePrice}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">地区经理开票价：{{goodsDetai.cityPrice}}</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">县区经理开票价：{{goodsDetai.countyPrice}}</div>
          </el-col>
        </el-row>

      </div>

    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>其他信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple"><span>物料备注</span>：{{goodsDetai.remark}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">可见范围：
              <font class="viewRemark" @click="visualRange">查看</font>
            </div>
          </el-col>
        </el-row>

      </div>

    </div>
    <el-dialog class="el-dialog-visib-range" :title="dialogTitle" :visible.sync="dialogRangeVisible"
               :append-to-body='true'>
      <div class="el-dialog-depart-radio">
        <span>销售组织：</span>
      </div>
      <div class="areaWraper">
        <div style="height: 300px;overflow-y: auto;">
          <!--
          default-checked-keys	默认勾选的节点的 key 的数组	array	—	—;
          accordion	是否每次只打开一个同级树节点展开	boolean	—	false;
          -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,key,index) in departmentMenuSelf" :label="item" :name="key">
              <el-tree
                :data="jsonData[key]"
                show-checkbox
                node-key="id"
                ref="tree"
                :accordion="true"
                :default-checked-keys="checkedKeysArr"
                :props="defaultProps">
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import goBack from 'src/components/goBack';//返回
  import {getStore, setDepartment} from 'src/config/cache'
  import {getGoodDetaiData, getVisRangeData} from 'src/api/headquarter_url/goodsManage';

  export default {

    data() {
      return {
        data2: [],
        checkedKeysArr:[],//默认勾选的key
        unCheckedKeysArr:[],//没被勾选的key，需要传给后台
        unCheckedKeysArrOld:[],//初次加载没被勾选的key，需要与unCheckedKeysArr进行对比，用来判断是否修改过
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName:'1',
        jsonData:{},
        goodsDetai: {}
        , dialogRangeVisible: false
        ,departmentMenu:[]
        ,departmentMenuSelf: []//弹窗内展示的事业部
        , radio: 1
        , dialogTitle: '查看限购区域'
        , checked1: null
        , checked2: null
        , checked3: null
        , province: []
        , cities: []
        , counties: []
      }
    },
    mounted() {
      this.initData()
    },
    components: {
      goBack,//返回
    },
    methods: {
      handleClick(tab, event) {//可见范围弹窗tabs切换
        console.log("切换tab,event:",tab, event);
      },
      initData: function () {
        const this_ = this;
        //获取页面数据
        getGoodDetaiData({id: this.$route.query.id, type: this.$route.query.type}).then((res) => {
          console.log(JSON.stringify(res.data.data));
          this_.goodsDetai = res.data.data;
          //获取事业部
          if (getStore('departmentMenu')!='null') {
            this.departmentMenu = JSON.parse(getStore('departmentMenu'));
          } else {
            this.departmentMenu = setDepartment();
          }
          console.log("this.departmentMenu:",this.departmentMenu)
          //设置弹窗内的事业部为勾选过的的可销售事业部【仅作为tab选项卡的标题存在】
          let departmentMenuSelf={};
          for(let i=0;i<this.goodsDetai.departmentIdStr.length;i++){
            if(this.goodsDetai.departmentIdStr[i] in this.departmentMenu){
              departmentMenuSelf[this.goodsDetai.departmentIdStr[i]]=this.departmentMenu[this.goodsDetai.departmentIdStr[i]]
            }
          }
          this.departmentMenuSelf=departmentMenuSelf;
          this.activeName=Object.keys(departmentMenuSelf)[0];
          console.log("现有的this.departmentMenuSelf:",this.departmentMenuSelf)
          //获取各部门下的省地县数据集合
          for(let k in this.departmentMenuSelf){
            console.log("key："+k+";"+"对应值："+this.departmentMenuSelf[k]);
            let datalist = {
              depId: k,
              goodsId: this.$route.query.id
            }
            getVisRangeData(datalist).then(res => {
              this.jsonData[k]=res.data.data.options;
              let arr=this.jsonData[k];
              for(var z=0;z<arr.length;z++){//这一段for循环是为了给this.unCheckedKeysArrOld存值
                if(arr[z].isCheck==2){
                  this.unCheckedKeysArrOld.push(arr[z].id);
                }
                if(arr[z].children){//如果省下有市
                  for( var x=0;x<arr[z].children.length;x++){
                    if(arr[z].children[x].isCheck==2){
                      this.unCheckedKeysArrOld.push(arr[z].children[x].id);
                    }
                    if(arr[z].children[x].children){//如果市下有县
                      for( var y=0;y<arr[z].children[x].children.length;y++){
                        if(arr[z].children[x].children[y].isCheck==2){
                          this.unCheckedKeysArrOld.push(arr[z].children[x].children[y].id);
                        }
                      }
                    }
                  }
                }
              }
            })
          }
          console.log("this.jsonData:",this.jsonData)
        })
      },
      //查看可见范围
      visualRange: function () {
        if(Object.keys(this.jsonData).length==Object.keys(this.departmentMenuSelf).length){
          this.getAreaData();
          this.dialogRangeVisible = true;
        }else{
          this.$message.error('数据加载中,请稍后点击查看');
        }
      },
      //获取本地缓存省地县数据集合
      getAreaData() {
        console.log("获取本地缓存省地县数据集合this.jsonData:",this.jsonData)
        console.log("获取this.goodsDetai.departmentIdStr:",this.goodsDetai.departmentIdStr)
        for(let g=0;g<this.goodsDetai.departmentIdStr.length;g++){
          if(this.goodsDetai.departmentIdStr[g] in this.jsonData){
            let jsonDataSelf=this.jsonData[this.goodsDetai.departmentIdStr[g]];
            console.log("jsonDataSelf:",jsonDataSelf)
            for(let i=0;i<jsonDataSelf.length;i++){
              jsonDataSelf[i].disabled=true;//只能查看不能编辑
              if(jsonDataSelf[i].children){//某个省下所有的市
                for(let j=0;j<jsonDataSelf[i].children.length;j++){
                  jsonDataSelf[i].children[j].disabled=true;//只能查看不能编辑
                  if(jsonDataSelf[i].children[j].children){//某个市下所有的县
                    console.log(413)
                    for(let k=0;k<jsonDataSelf[i].children[j].children.length;k++){
                      jsonDataSelf[i].children[j].children[k].disabled=true;//只能查看不能编辑
                      if(jsonDataSelf[i].children[j].children[k].isCheck==1){
                        this.checkedKeysArr.push(jsonDataSelf[i].children[j].children[k].id)//设置选中的id
                      }
                    }
                  }else{//该市下面没有县区
                    console.log(421)
                    if(jsonDataSelf[i].children[j].isCheck==1){
                      this.checkedKeysArr.push(jsonDataSelf[i].children[j].id)
                    }
                  }
                }
              } else{//该省下面没有市区
                if(jsonDataSelf[i].isCheck==1){
                  this.checkedKeysArr.push(jsonDataSelf[i].id)
                }

              }
            }
          }
        }
      },
      //有无销售人员切换1是无2是有
      changeHandler: function ($val) {
        console.log($val)
      },
    }
  }
</script>


<style lang="scss" scoped="scoped">
  @mixin ft($dirc) {
    float: $dirc;
  }

  @mixin wh($w,$h) {
    width: $w;
    height: $h;
    line-height: $h;
  }

  .goBackWraper {
    span {
      @include ft(left);
      line-height: 40px;
    }
    .backBtn {
      @include wh(90px, 40px);
      @include ft(right);
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #e02222;
      border-radius: 2px;
    }
  }

  .containInfo_wraper {
    margin: 20px 30px;

    background: #ffff;
    border: 1px solid #e6e6e6;
    .detail_title {
      padding: 0 20px;
      line-height: 50px;
      color: #1f5dbc;
      font-size: 14px;
      .line_Icon {
        display: inline-block;
        @include wh(4px, 14px);
        vertical-align: middle;
        margin-right: 5px;
        border-radius: 20%;
        background: #1f5dbc;
      }
      border-bottom: 1px solid #e6e6e6;
    }
    .detail_content {
      padding: 0 29px;
      line-height: 49px;
      font-size: 14px;
      span {
        display: inline-block;
        width: 70px;
        text-align: justify;
        text-align-last: justify;
        text-justify: inter-ideograph; /*IE*/
        text-align-last: inter-ideograph;
      }
      .viewRemark {
        color: #1f5dbc;
      }
      .imgWrap img{
        margin: 20px 20px 0 0;
      }
    }
  }

  .areaWraper {
    .el-col-group {
      height: 400px;
      overflow: auto;
    }

  }

  .dialog_body {
    padding: 30px 20px;
  }
</style>
