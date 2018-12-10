<template>
  <div class="edit_wraper">
    <go-back title="查看商品详情"></go-back>
    <el-form :model="goodsDetai" :inline="true" ref="goodsDetai" :rules="rules" class="demo-form-inline">
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
        <div class="detail_content">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="物料名称：" prop="goodsName">
                <el-input v-model="goodsDetai.goodsName" placeholder="请输入物料名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="物料编码：" prop="materialCode">
                <el-input v-model="goodsDetai.materialCode" placeholder="请输入物料编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="生产企业：" prop="manufacturer">
                <el-select v-model="goodsDetai.manufacturer" placeholder="请选择生产企业">
                  <el-option v-for="(item,key,index) in manufacturerMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="剂型：" prop="drugType">
                <el-select v-model="goodsDetai.drugType" placeholder="请选择剂型">
                  <el-option v-for="(item,key,index) in drugTypeMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="规格：" prop="specsMax">
                <el-input v-model="goodsDetai.specsMax" placeholder="请输入规格"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="包装规格：" prop="specsMin">
                <el-input v-model="goodsDetai.specsMin" placeholder="请输入包装规格"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="物料类别" prop="category">
                <el-select v-model="goodsDetai.category" placeholder="请选择物料类别">
                  <el-option v-for="(item,key,index) in categoryMenu" :label="item" :value="key"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="批准文号：" prop="licenseNumber">
                <el-input v-model="goodsDetai.licenseNumber" placeholder="请输入批准文号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="单位：" prop="licenseNumber">
                <el-input v-model="goodsDetai.unit" placeholder="请输入单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="版本号：">
                <el-input v-model="goodsDetai.version" placeholder="请输入单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="商品图片：">
              <div class="div-inline uploadImg_box">
                <upload-img :imgMenu="imgList" :maxLimit="5" fileName="goods" :isInvert="true"
                            @uploadSuccess="uploadSuccess"></upload-img>
              </div>
              <span class="uploadImg_tip">请上传图片，最多上传5张 </span>
            </el-form-item>
          </el-row>
        </div>
      </div>
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>销售信息：</div>
        <div class="detail_content">
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="可销售事业部：" prop="departmentIds">
                <el-checkbox-group v-model="goodsDetai.departmentIds" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="(item,key,index) in departmentMenu" :label="key" :key="index">{{item}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="省区经理开票价：" prop="provincePrice">
                <input class="tableInput" v-model="goodsDetai.provincePrice" type="number" @keydown="handleInput2"
                       placeholder="请输入省区经理开票价">
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="地区经理开票价：" prop="cityPrice">
                <input class="tableInput" v-model="goodsDetai.cityPrice" type="number" @keydown="handleInput2"
                       placeholder="请输入地区经理开票价">
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="县区经理开票价：" prop="countyPrice">
                <input class="tableInput" v-model="goodsDetai.countyPrice" type="number" @keydown="handleInput2"
                       placeholder="请输入县区经理开票价">
              </el-form-item>
            </el-col>
          </el-row>
        </div>

      </div>
      <div class="containInfo_wraper">
        <div class="detail_title"><i class="line_Icon"></i>其他信息：</div>
        <div class="detail_content">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple"><span>物料备注</span>：
                <textarea class="poliyMark" v-model="goodsDetai.remark" name="" id="" cols="30" rows="10"></textarea>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple">可见范围：<font class="viewRemark" @click="visualRange">查看</font></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="operateWraper">
      <div class="div-inline el-button-red" @click="toSave('goodsDetai',2)">保存</div>
      <div class="div-inline el-button-red" @click="toSave('goodsDetai',1)">保存并上架</div>
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
      <div slot="footer" class="dialog-footer">
        <span class="dialog-cancel-btn dialoperateBtn" @click="dialogRangeVisible = false">取消</span>
        <span class="dialog-sure-btn dialoperateBtn" @click="checkedKeys">确定</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import goBack from 'src/components/goBack';//返回
  import uploadImg from 'components/aliossupload'
  import {getStore, setDepartment} from 'src/config/cache'
  import {
    getGoodDetaiData,
    getVisRangeData,
    getManufacturData,
    getCategoryListData,
    getdrugTypeData,
    toSaveData,
    toSaveUploadData
  } from 'src/api/headquarter_url/goodsManage';

  export default {
    name: 'edit_removeGoods',
    data() {
      return {
        data2: [],
        checkedKeysArr:[],//默认勾选的key
        unCheckedKeysArrOld:[],//初次加载没被勾选的key，用来判断是否修改过
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName:'1',
        jsonData:{},


        goodsId: '' //商品ID
        , type: ''//type类型
        , goodsDetai: {}
        , checkList: ''
        , manufacturerMenu: []//生产厂家
        , categoryMenu: []//物料类别
        , drugTypeMenu: []//剂型
        , departmentMenu: []//事业部
        , departmentMenuSelf: []//弹窗内展示的事业部
        , dialogRangeVisible: false
        , radio: '1'	//切换事业部
        , dialogTitle: '查看限购区域' //弹窗提示语
        , checked1: [] 	//所勾选省区
        , checked2: []   //所勾选地区
        , checked3: []   //所勾选县区
        , UnmultiplChoice: []   //未勾选的省地县集合，用于传参
        , province: []    //省区数据集合
        , cities: []			//地区数据集合
        , counties: []		//县区数据集合
        , imgList: []
        , provinceIndex: null//展开省级图标
        , cityIndex: null//展开shi级图标
        , rules: {//校验基本信息
          goodsName: [{required: true, message: '请输入物料名称', trigger: 'blur'}],
          materialCode: [{required: true, message: '请输入物料编码', trigger: 'blur'}],
          manufacturer: [{required: true, message: '请选择生产企业', trigger: 'change'}],
          drugType: [{required: true, message: '请选择剂型', trigger: 'change'}],
          specsMax: [{required: true, message: '请输入规格', trigger: 'blur'}],
          specsMin: [{required: true, message: "请输入包装规格", trigger: 'blur'}],
          category: [{required: true, message: "请选择物料类别", trigger: 'blur'}],
          departmentIds: [{required: true, message: '请选择事业部', trigger: 'blur'}],
          provincePrice: [{required: true, message: "请输入省区经理开票价", trigger: 'blur'}],
          cityPrice: [{required: true, message: "请输入地区经理开票价", trigger: 'blur'}],
          countyPrice: [{required: true, message: "请输入县区经理开票价", trigger: 'blur'}],

        }
      }

    },
    mounted() {
//      this.getAreaData();
      this.getManufacturer();
      this.getDrugType();
      this.getCategory();
      this.initData();
    },
    components: {
      uploadImg,
      goBack,//返回
    },
    methods: {
      handleClick(tab, event) {//可见范围弹窗tabs切换
        console.log("切换tab,event:",tab, event);
      },
      //页面初始化
      initData() {
        this.goodsId = this.$route.query.id;
        this.type = this.$route.query.type;
        getGoodDetaiData({id: this.goodsId, type: this.type}).then(res => {
          this.goodsDetai = res.data.data;
          this.imgList = this.goodsDetai.imgList;
          console.log("this.goodsDetai:",this.goodsDetai)
          console.log((this.goodsDetai.departmentIds == null));
          (this.goodsDetai.departmentIds == null || this.goodsDetai.departmentIds == "") ? this.goodsDetai.departmentIds = [] : this.goodsDetai.departmentIds = this.goodsDetai.departmentIds.split(',');
          let imgMenu = [];
          this.imgList.forEach((item, index, arr) => {
            let imgd = item.split("/");
            imgMenu.push(imgd[imgd.length - 1])
          })
          this.goodsDetai.goodsImgs = imgMenu;
        });
        //获取事业部
        if (getStore('departmentMenu')!='null'||getStore('departmentMenu')) {
          this.departmentMenu = JSON.parse(getStore('departmentMenu'));
        } else {
          this.departmentMenu = setDepartment();
        }
        console.log("this.departmentMenu:",this.departmentMenu)
        //获取各部门下的省地县数据集合
        for(let k in this.departmentMenu){
          let datalist = {
            depId: k,
            goodsId: this.$route.query.id
          }
          getVisRangeData(datalist).then(res => {
            console.log("key："+k+";"+"对应值："+this.departmentMenu[k]);
            console.log("res.data.data.options:"+k+':',res.data.data.options)
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
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      handleCheckedCitiesChange(val) {
        console.log(val);
        console.log(this.goodsDetai.departmentIds);
      },
      //保存
      toSave(formName, $type) {
          this.$refs[formName].validate((valid) => {
            console.log("valid:",valid)
            if (valid) {
              //保存并上架时，价格不能为0
              if($type==1){
                if(this.goodsDetai.provincePrice==0||this.goodsDetai.cityPrice==0||this.goodsDetai.countyPrice==0){
                  this.$message.error("保存并上架时，销售信息下的开票价格必须大于0！");
                  return false;
                }
              }
              //判断可见范围是否修改过
              let changStatus = 1;
              console.log("保存this.unCheckedKeysArrOld:",this.unCheckedKeysArrOld)
              console.log("保存this.UnmultiplChoice:",this.UnmultiplChoice)
              const listA = this.unCheckedKeysArrOld?this.unCheckedKeysArrOld:[];
              const listB = this.UnmultiplChoice?this.UnmultiplChoice:[];
              Array.prototype.equals = function(arr) {
                return this.sort().join() === arr.sort().join()
              }
              if(listA.equals(listB)){
                console.log("没修改")
                changStatus = 2;//没修改过
              }else{
                console.log("修改过")
                changStatus = 1;//修改过
              }
              let treeIds = this.UnmultiplChoice.join(",");
              console.log("保存this.UnmultiplChoice：",this.UnmultiplChoice)
              console.log("保存treeIds：",treeIds)
              if (typeof this.goodsDetai.goodsImgs != "string") {
                this.goodsDetai.goodsImgs = this.goodsDetai.goodsImgs.join(",")
              }
              let departmentIds = this.goodsDetai.departmentIds;
              console.log("保存departmentIds:",departmentIds);
              let datalist = {
                id: this.goodsId,//商品ID
                goodsName: this.goodsDetai.goodsName,
                materialCode: this.goodsDetai.materialCode,
                manufacturer: this.goodsDetai.manufacturer,
                category: this.goodsDetai.category,
                drugType: this.goodsDetai.drugType,

                specsMax: this.goodsDetai.specsMax,
                specsMin: this.goodsDetai.specsMin,
                unit: this.goodsDetai.unit,
                version: this.goodsDetai.version,

                licenseNumber: this.goodsDetai.licenseNumber,
                goodsImgs: this.goodsDetai.goodsImgs,
                remark: this.goodsDetai.remark,
                provincePrice: this.goodsDetai.provincePrice,

                cityPrice: this.goodsDetai.cityPrice,
                countyPrice: this.goodsDetai.countyPrice,
                departmentIds: departmentIds,

                treeIds: treeIds,//不可见节点[1,2,3..............]
                changStatus: changStatus,  //1修改过 2未修改
                type: $type,//1保存并提交 2保存
                userId: getStore('accountId'),
              };
              toSaveData(datalist).then(res => {
                this.$message.success("保存成功！");
                this.$router.go(-1);
                console.log(res);
              })
            } else {
              this.$message.error("请将必填项填写完整！")
              return false;
            }
          });
      },

      //获取生产企业
      getManufacturer() {
        getManufacturData().then(res => {
          this.manufacturerMenu = res.data.data;
        })
      },
      //获取物料类别
      getCategory() {
        getCategoryListData("").then(res => {
          this.categoryMenu = res.data.data;
        })
      },
      //获取剂型
      getDrugType() {
        getdrugTypeData("").then(res => {
          this.drugTypeMenu = res.data.data;
        })
      },

      //点击可见范围‘查看’
      visualRange() {
        console.log("查看this.jsonData:",this.jsonData)
        console.log("查看Object.keys(this.jsonData).length:",Object.keys(this.jsonData).length)
        console.log("查看可见范围this.goodsDetai.departmentIds:",this.goodsDetai.departmentIds)
        if(this.goodsDetai.departmentIds!=''||this.goodsDetai.departmentIds.length!=0){
          console.log("可销售事业部有勾选")
          if(Object.keys(this.jsonData).length==Object.keys(this.departmentMenu).length){
            //设置弹窗内的事业部为勾选过的的可销售事业部【仅作为tab选项卡的标题存在】
            let departmentMenuSelf={};
            for(let i=0;i<this.goodsDetai.departmentIds.length;i++){
              if(this.goodsDetai.departmentIds[i] in this.departmentMenu){
                departmentMenuSelf[this.goodsDetai.departmentIds[i]]=this.departmentMenu[this.goodsDetai.departmentIds[i]]
              }
            }
            this.departmentMenuSelf=departmentMenuSelf;
            this.radio=Object.keys(departmentMenuSelf)[0];
            this.activeName=Object.keys(departmentMenuSelf)[0];
            this.getAreaData();
            this.dialogRangeVisible = true;
          }else{
            this.$message.error('数据加载中,请稍后点击查看');
          }
        }else{
          this.$message.error('请选择可销售事业部');
        }
      },

      //获取本地缓存省地县数据集合
      getAreaData() {
        console.log("获取本地缓存省地县数据集合this.goodsDetai.departmentIds:",this.goodsDetai.departmentIds)
        console.log("获取本地缓存省地县数据集合this.jsonData:",this.jsonData)
        for(let g=0;g<this.goodsDetai.departmentIds.length;g++){
          console.log("this.goodsDetai.departmentIds[g]:",this.goodsDetai.departmentIds[g])
          if(this.goodsDetai.departmentIds[g] in this.jsonData){
            let jsonDataSelf=this.jsonData[this.goodsDetai.departmentIds[g]];
            for(let i=0;i<jsonDataSelf.length;i++){
              if(jsonDataSelf[i].children){//某个省下所有的市
                for(let j=0;j<jsonDataSelf[i].children.length;j++){
                  if(jsonDataSelf[i].children[j].children){//某个市下所有的县
                    for(let k=0;k<jsonDataSelf[i].children[j].children.length;k++){
                      if(jsonDataSelf[i].children[j].children[k].isCheck==1){
                        this.checkedKeysArr.push(jsonDataSelf[i].children[j].children[k].id)
                      }
                    }
                  }else{//该市下面没有县区
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
              /*console.log("初始化选中的this.checkedKeysArr,",this.checkedKeysArr)*/
            }
          }
        }
      },
      // 获得选中的节点的key
      checkedKeys:function (data) {
        let arr3=[];//所有没被选中的
        console.log("departmentMenuSelf:",this.departmentMenuSelf)
        console.log("jsonData:",this.jsonData)
        let arrListSelf=[];
        for (var k in this.departmentMenuSelf){
          arrListSelf.push(k);
        }
        for(var g=0;g<arrListSelf.length;g++) {//循环勾选中的可销售事业部
          if (arrListSelf[g] in this.jsonData) {//判断选中的事业部是否存在于jsonData对象中
            let jsonDataSelf = this.jsonData[arrListSelf[g]];//获取事业部对应的省区
            console.log("jsonDataSelf:",jsonDataSelf)
            console.log("保存"+g+':',this.$refs.tree[g].getCheckedKeys());
            let arr1=this.$refs.tree[g].getCheckedKeys();//tree中被选中的id
            console.log("tree中被选中的id:this.$refs.tree[g].getCheckedKeys():",this.$refs.tree[g].getCheckedKeys())
            let arr2=[];//所有的id
            for(var i=0;i<jsonDataSelf.length;i++){//这一段for循环是为了对应事业部下获取所有省区的id
              arr2.push(jsonDataSelf[i].id);
              if(jsonDataSelf[i].children){
                for(var j=0;j<jsonDataSelf[i].children.length;j++){
                  arr2.push(jsonDataSelf[i].children[j].id);
                  if(jsonDataSelf[i].children[j].children){
                    for(var k=0;k<jsonDataSelf[i].children[j].children.length;k++){
                      arr2.push(jsonDataSelf[i].children[j].children[k].id);
                    }
                  }
                }
              }
            }
            console.log('所有arr2:',arr2)
            console.log('被选中的arr1:',arr1)
            //arr1与arr2对比从所有中取出没被选中的
            for(var i=0;i<arr1.length;i++){
              for(var j=0;j<arr2.length;j++){
                if(arr2[j]==arr1[i]){
                  arr2.splice(j,1)
                }
              }
            }
            arr3.push.apply(arr3,arr2);
            console.log("没被选中的arr3",arr3);
          }
        }
        /*for(let g=0;g<this.goodsDetai.departmentIds.length;g++) {//循环勾选中的可销售事业部
          if (this.goodsDetai.departmentIds[g] in this.jsonData) {//判断选中的事业部是否存在于jsonData对象中
            let jsonDataSelf = this.jsonData[this.goodsDetai.departmentIds[g]];//获取事业部对应的省区
            console.log("jsonDataSelf:",jsonDataSelf)
            console.log("保存"+g+':',this.$refs.tree[g].getCheckedKeys());
            let arr1=this.$refs.tree[g].getCheckedKeys();//tree中被选中的id
            console.log("tree中被选中的id:this.$refs.tree[g].getCheckedKeys():",this.$refs.tree[g].getCheckedKeys())
            let arr2=[];//所有的id
            for(var i=0;i<jsonDataSelf.length;i++){//这一段for循环是为了对应事业部下获取所有省区的id
              arr2.push(jsonDataSelf[i].id);
              if(jsonDataSelf[i].children){
                for(var j=0;j<jsonDataSelf[i].children.length;j++){
                  arr2.push(jsonDataSelf[i].children[j].id);
                  if(jsonDataSelf[i].children[j].children){
                    for(var k=0;k<jsonDataSelf[i].children[j].children.length;k++){
                      arr2.push(jsonDataSelf[i].children[j].children[k].id);
                    }
                  }
                }
              }
            }
            console.log('所有arr2:',arr2)
            console.log('被选中的arr1:',arr1)
            //arr1与arr2对比从所有中取出没被选中的
            for(var i=0;i<arr1.length;i++){
              for(var j=0;j<arr2.length;j++){
                if(arr2[j]==arr1[i]){
                  arr2.splice(j,1)
                }
              }
            }
            arr3.push.apply(arr3,arr2);
            console.log("没被选中的arr3",arr3);
          }
        }*/
        this.UnmultiplChoice=arr3;//弹窗内所有没被选中的省市县id（复选框不是对勾的）
        console.log("this.UnmultiplChoice:",this.UnmultiplChoice)
        this.dialogRangeVisible = false;//关闭弹窗
      },
      uploadSuccess($val) {
        this.goodsDetai.goodsImgs = $val.fileName;
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

  .edit_wraper {
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
        padding: 20px 29px;
        line-height: 49px;
        font-size: 14px;
        .el-input__inner {
          @include wh(auto, 34px);
        }
        .poliyMark {
          border: 1px solid #e6e6e6;
          border-radius: 5px;
          width: 85%;
          height: 70px;
          vertical-align: middle;
          margin-left: 20px;
          padding: 10px;
          line-height: 26px;
        }
        .tableInput {
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          padding: 0 15px;
        }
        .uploadImg_box {
          vertical-align: middle;
        }
        .uploadImg_tip {
          color: #e02222;
          font-size: 12px;
          padding-left: 20px;
        }
        .viewRemark {
          color: #1f5dbc;
        }

        .el-form-item {
          margin-bottom: 15px;
          .el-form-item__content {
            line-height: 34px;
            vertical-align: middle;
            .el-input__inner {
              width: 185px;
              margin-left: -4px;
            }
          }
        }
        .el-checkbox-group {
          display: inline-block;
        }
      }
    }
    .operateWraper {
      text-align: center;
      margin-bottom: 30px;
    }
  }

  .el-dialog-visib-range {
    .el-dialog .el-dialog__body {
      .el-dialog-depart-radio {
        padding: 20px 28px 0;
      }
    }
    .areaWraper {
      .title {
        margin-top: 20px;
        line-height: 38px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
      }
      .el-col-group {
        height: 400px;
        overflow: auto;
        .expandText {
          display: inline-block;
          width: 20px;
          height: 38px;
          line-height: 38px;
          font-size: 14px;

        }
        .el-checkbox-group {
          padding-left: 22% !important;
        }
        .el-checkbox {
          display: inline-block;
          margin-left: 30px;
          line-height: 38px;
        }
      }
    }
  }

</style>
