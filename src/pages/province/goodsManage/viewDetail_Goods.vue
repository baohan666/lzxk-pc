<!--省区：商品管理：在售商品：查看商品详情-->
<template>
  <div>
    <go-back title="查看商品信息"></go-back>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="7"><div class="grid-content bg-purple"><span>物料名称</span>：{{goodsDetai.goodsName}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"><span>规格</span>：{{goodsDetai.specsMax}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"><span>生产企业</span>：{{goodsDetai.manufacturer}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7"><div class="grid-content bg-purple"><span>剂型</span>：{{goodsDetai.drugType}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"><span>包装规格</span>：{{goodsDetai.specsMin}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"><span>物料类别</span>：{{goodsDetai.category}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7"><div class="grid-content bg-purple"><span>单位</span>：{{goodsDetai.unit}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"><span>批准文号</span>：{{goodsDetai.licenseNumber}}</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple"><span>版本号</span>：{{goodsDetai.version}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content bg-purple"><span>商品图片</span>：</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple"><img width="200" v-for="(item,index) in goodsDetai.imgList" :src="item" :key="index" alt=""></div></el-col>
        </el-row>
      </div>

    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>销售信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="7"><div class="grid-content bg-purple">地区经理开票价：{{goodsDetai.cityPrice}}</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">县区经理开票价：{{goodsDetai.countyPrice}}</div></el-col>
        </el-row>

      </div>

    </div>
    <div class="containInfo_wraper">
      <div class="detail_title"><i class="line_Icon"></i>其他信息：</div>
      <div class="detail_content">
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><span>物料备注</span>：{{goodsDetai.remark}}</div></el-col>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogRangeVisible" :append-to-body='true'>
      <div class="areaWraper">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          ref="tree"
          :accordion="true"
          :default-checked-keys="checkedKeysArr"
          :props="defaultProps">
        </el-tree>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  import goBack from 'src/components/goBack';//返回
  import {getStore,getAliOssUrl} from 'src/config/cache'
  import {getGoodDetaiData,getVisRangeData} from 'src/api/province_url/goodsManage';//调接口

  export default {

    data() {
      return {
        data2: [],//可见范围数据
        checkedKeysArr:[],//默认勾选的key
        defaultProps: {//tree树形结构组件
          children: 'children',
          label: 'label'
        },

        goodsDetai:{}
        ,dialogRangeVisible:false
        ,dialogTitle: '查看限购区域'
        ,checked1: null
        ,checked2: null
        ,checked3: null
        ,province:[]
        ,cities: []
        ,counties:[]
      }
    },
    components:{
      goBack,//返回
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData:function(){
        const this_=this;
        getGoodDetaiData({id: this.$route.query.id}).then(function(res){
          console.log(JSON.stringify(res.data.data));
          this_.goodsDetai = res.data.data;
        })
      },
      //查看可见范围
      visualRange:function(){
        let this_=this;
        let userId = getStore('accountId');
        let datalist={
          userId: userId,
          goodsId:  this.$route.query.id
        }
        this.dialogRangeVisible = true;
        getVisRangeData(datalist).then(res =>{
          console.log("可见范围res.data.data.options:",res.data.data.options)
          this.data2=res.data.data.options;
          let jsonDataSelf=this.data2;
          //将tree树形结构下的数据进行勾选和不可操作初始化
          for(let i=0;i<jsonDataSelf.length;i++){
            jsonDataSelf[i].disabled=true;//只能查看不能编辑
            if(jsonDataSelf[i].isCheck==1){
              this.checkedKeysArr.push(jsonDataSelf[i].id)
            }
            if(jsonDataSelf[i].children){
              for(let j=0;j<jsonDataSelf[i].children.length;j++){
                jsonDataSelf[i].children[j].disabled=true;//只能查看不能编辑
                if(jsonDataSelf[i].children[j].isCheck==1){
                  this.checkedKeysArr.push(jsonDataSelf[i].children[j].id)
                }
              }
            }
          }
        })
      },
      //有无销售人员切换1是无2是有
      changeHandler: function($val){
        console.log($val)
      },
    }
  }
</script>
<style lang="scss">
  .el-col-group{
    .el-radio{
      display: block;
      margin-left:30px;
      line-height: 36px;
    }
  }
</style>

<style lang="scss" scoped="scoped">
  @mixin ft($dirc){
    float:$dirc;
  }
  @mixin wh($w,$h){
    width:$w;
    height:$h;
    line-height: $h;
  }
  .goBackWraper{
    span{
      @include ft(left);
      line-height:40px;
    }
    .backBtn{
      @include wh(90px,40px);
      @include ft(right);
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #e02222;
      border-radius: 2px;
    }
  }
  .containInfo_wraper{
    margin:20px 30px;

    background:#ffff;
    border:1px solid #e6e6e6;
    .detail_title{
      padding:0 20px;
      line-height:50px;
      color:#1f5dbc;
      font-size:14px;
      .line_Icon{
        display: inline-block;
        @include wh(4px,14px);
        vertical-align: middle;
        margin-right:5px;
        border-radius:20%;
        background:#1f5dbc;
      }
      border-bottom:1px solid #e6e6e6;
    }
    .detail_content{
      padding: 0 29px;
      line-height:49px;
      font-size:14px;
      span{
        display:inline-block;
        width:70px;
        text-align:justify;
        text-align-last:justify;
        text-justify:inter-ideograph;/*IE*/
        text-align-last:inter-ideograph;
      }
      .viewRemark{
        color:#1f5dbc;
      }

    }
  }
  .areaWraper{
    .el-col-group{
      height:400px;
      overflow:auto;
    }


  }
</style>
