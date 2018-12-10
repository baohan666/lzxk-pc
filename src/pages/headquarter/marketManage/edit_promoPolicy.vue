<template>
	<div class="create_wraper">
		<go-back v-if="this.$route.query.handleType == 1" title="编辑促销政策"></go-back>
		<go-back v-else title="复制促销政策"></go-back>
		<el-form :inline="true" ref="ruleForm" label-width="100px" class="demo-form-inline">

		<div class="containInfo_wraper">
			<div class="detail_title"><i class="line_Icon"></i>基本信息：</div>
			<div class="detail_content">
				<el-row :gutter="20">
					<el-col :span="7">
					  	<el-form-item label="政策类型：" class="is-required">
						    <el-select v-model="policyTypes" placeholder="请选择政策类型" @change ="policyChange">
			      				<el-option  label="奖励政策" value="2" key="1"></el-option>
			      				<el-option v-if="policyType==3" label="回款奖励" value="3" key="2"></el-option>
			      				<el-option v-else-if="policyType==4" label="回款奖励" value="4" key="3"></el-option>
                    <el-option v-else label="回款奖励" value="3" key="2"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
					  	<el-form-item label="政策名称：" class=" is-required">
						    <el-input v-model="title" placeholder="请输入政策名称"></el-input>
						</el-form-item>
					</el-col>

				  	<el-col :span="10">
				  		<div class="div-inline el-form-item is-required">
					  		<div class="div-inline el-form-item__label">政策有效期：</div>
			  				<datepicker startIsShow = "true" endIsShow= "true" :starTim="policyStartDate" :endTim="policyEndDate" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'policyValidDate')"></datepicker>
					  	</div>
				  	</el-col>
				  	<el-col :span="7">
					  	<el-form-item label="事业部：" class="is-required">
							<el-select v-model="departmentId"  placeholder="请选择事业部" @change ="selectSuccess">
							    <el-option label="请选择事业部" value=''></el-option>
							    <el-option v-for="(item,key,index) in departmentMenu" :label="item" :value="key" :key="index"></el-option>
							</el-select>
						</el-form-item>
			 		</el-col>
				  	<el-col :span="10">
				  		<div class="div-inline el-form-item">
					  		<div class="div-inline">核销期间：</div>
			  				<datepicker startIsShow = "true" endIsShow= "true" :starTim="verificationStartDate" :endTim="verificationEndDate" class="div-inline" @changeSelect="(value) =>changeSelect(value, 'verifyDate')"></datepicker>
					  	</div>
				  	</el-col>
          <el-col :span="7" v-show="policyType==2">
            <div class="div-inline el-form-item is-required">
              <div class="div-inline el-form-item__label">政策子类型：</div>
              <el-select v-model="policyTypeCheck == null?'':policyTypeCheck" placeholder="请选择政策子类型">
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
					<el-col :span="20">政策说明:<textarea class="poliyMark" v-model="remark" name="" id="" cols="30" rows="10"></textarea></el-col>
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
					<el-table v-if="policyType==2" :data="tableData1" border tooltip-effect="dark">
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
					    		<input class="tableInput" v-model="scope.row.afterDiscountPrice" type="number" @keydown="handleInput2">
					    	</template>
					    </el-table-column>
					  	<el-table-column prop="batchNumber" label="指定批号">
					  		<template slot-scope="scope">
					    		<input class="tableInput" v-model="scope.row.batchNumber" v-vue-onkeypress>
					    	</template>
					  	</el-table-column>
				  	</el-table>
          <template v-if="policyType==3||policyType==4">
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
				<releaseRange ref="dialogSeleProMa" :isView="false"  :dialogRangeVisible="dialogRangeVisible" :relRangeList ="rangeList" title ="发布范围" @setProvMange = "setProvMange"></releaseRange>
			</div>
		</div>
		</el-form>
		<div class="operateWraper">
			<div class="div-inline el-button-red" @click = "saveAddPolGoods">保存</div>
		</div>
	</div>
</template>

<script>
	import {getStore,setDepartment} from 'src/config/cache'
	import goBack from 'src/components/goBack';
	import departComponet from 'src/headComponent/departComponent';
	import datepicker from 'components/data-plugin';
	import elPagination from 'components/el-page';
	import selectGoods from 'src/headComponent/selectGoods';
	import releaseRange from 'src/headComponent/releaseRange';
  import mainTable from 'src/pages/headquarter/marketManage/main_table';
  import subTable from 'src/pages/headquarter/marketManage/sub_table';
  import {promoPolyDetail, getGoods, getRangeProvince,savePolGoods,updatePolicy} from 'src/api/headquarter_url/promotionPolicy';
	export default {
		data() {
			return {
          id: '',//政策id
					policyTypes: '',//政策类型
          policyTypeCheck: '',//政策子类型
					policyType: '',//反显政策类型
					policyStartDate:'',//政策有效期
					policyEndDate:'',//政策有效期
					title:'',//政策名称
					verificationStartDate: '',//核销起始时间
					verificationEndDate: '',//核销结束时间
					departmentId: '',//事业部
					departmentIds: '',//反显事业部
					departmentMenu:[],
					remark: '',//政策说明
					tableData1:[],//奖励商品policyType==2
          tableData2:[],//单品回款奖励policyType==3
          tableData3:[],//多主品回款奖励policyType==4
					rangeList:[],
					userId:[],//适用范围id
				  goodsList:'',//
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
				  awardGoods: "show",//选择需回款商品
			}
		},
		created() {
			this.initData()
		},
		components:{
			goBack,
      departComponet,
      datepicker,
      elPagination,
      selectGoods,
      mainTable,
      subTable,
      releaseRange
	    },
		methods: {
			initData(){
			    this.departmentMenu = JSON.parse(getStore('departmentMenu'));
		        promoPolyDetail({'policyId': this.$route.query.id, 'policyType': this.$route.query.type}).then(res => {
					let datas = res.data.data;
					this.id = datas.id;//政策id
					this.policyTypes = datas.policyTypeStr;//政策类型
					this.policyType = datas.policyType;
					this.policyTypeCheck = datas.policyTypeCheck+"";
					this.policyStartDate = datas.policyStartDate;//政策有效期
					this.policyEndDate = datas.policyEndDate;//政策有效期
					this.title = datas.title;//政策名称
					this.verificationStartDate = datas.verificationStartDate;//核销起始时间
					this.verificationEndDate = datas.verificationEndDate;//核销结束时间
					this.departmentId = datas.departmentIdStr;//事业部
					this.departmentIds = datas.departmentIdStr;
					this.remark = datas.remark;//政策说明
          datas.rangeList.forEach(p=>{
            if(p.isChoose == 1){
              this.userId.push(p.userId);
            }
          })
					this.mainList = datas.mainList;//主品
					this.subList = datas.subList;//奖励商品
          this.mainList&&this.mainList.forEach(p=>{
              this.goodsIdm.push(p.goodsId)
          })
          this.subList&&this.subList.forEach(p=>{
              this.goodsId.push(p.goodsId)
          })
					this.rangeList = datas.rangeList;
					if(datas.policyType==2){
						this.tableData1 = datas.subList;
					}
					if(datas.policyType==3){
						datas.subList.forEach((item,index,arr) => {
							console.log(item);console.log(datas.mainList[0]);
							let c={...item, ...datas.mainList[0]};
							this.tableData2.push(c);
						})
					}
					if(datas.policyType==4){
						datas.subList.forEach((item,index,arr) => {
							let c={};
							this.mainList = datas.mainList;
							this.subList = datas.subList;
							if(datas.mainList.length-1<index){
								c={...item, ...datas.mainList[datas.mainList.length-1]};
							}else{
								c={...item, ...datas.mainList[index]};
							}
							this.tableData3.push(c);
						})
					}
		        })
			},
			//日期组件
			changeSelect(val,type){console.log(val,type);
				if(type == "policyValidDate"){
					val.type == "startDate"?this.policyStartDate = val.data : this.policyEndDate = val.data;
				}else{
					val.type == "startDate"?this.verificationStartDate = val.data : this.verificationEndDate = val.data;
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
          departmentIds: this.departmentId,
          goodsName:params.name == undefined?"":params.name,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        //奖励政策直接选择商品，单品和多品先选择主品再选择奖励商品
        if(this.departmentId!='' && this.policyType!=''){
          if((this.policyType !=2 && this.awardGoods=='show') || this.policyType ==2 || this.policyType !=2 && this.mainList.length>0){
            getGoods(datalist).then( res =>{
              this.goodsList = res.data.data;
              this.$refs.dialogSeleGoods.dialogShow();
            });
          }else if(this.policyType !=2 && this.mainList.length == 0 && this.awardGoods=='hide'){
            this.isHuiKuan=true;
            this.awardGoods='show'
          }
        }else{
          this.$message.success('请先选择政策类型和事业部');
        }
      },
      handleInput2(e) {
            // 通过正则过滤小数点后两位
            	e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null

        	},
      //选择商品确定按钮
      uploadData(val){
        if(this.policyType==2){//奖励商品
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
              this.tableData1.push(arraylist);
              this.goodsId.push(item.id)//奖励商品id
              this.clearProvMange();//清空使用范围
            }
          })
          this.awardGoods='show';

        }else if(this.policyType!=2){//单品和多品回款奖励
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
                this.clearProvMange();//清空使用范围
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
                this.clearProvMange();//清空使用范围
              }
            })
          }
          this.tableData2=[];
          this.tableData3= [];
          this.subList.forEach((item,index,arr) => {
            let tablist={};
            if(this.mainList.length-1<index){
              tablist={...item, ...this.mainList[this.mainList.length-1]};
            }else{
              tablist={...item, ...this.mainList[index]};
            }
            this.policyType==3 ? this.tableData2.push(tablist) :this.tableData3.push(tablist);
          })
          this.tableData = this.mainList;
          this.awardGoods='show';

        }
      },
			// 合并单元格(行数、列数、行号、列号)
      objectSpanMethod({row,column,rowIndex,columnIndex}) {
	      		console.log(this.mainList.length, this.subList.length);
	      		if(this.policyType == 3 && this.subList.length>1){
	      			if (columnIndex === 0) {
	      				let rowspan = new Array(7).fill(0) ;
	      				rowspan[0]=this.subList.length;
	      				return {
			                rowspan: rowspan[rowIndex],
			                colspan: 1
			           }
			        }
	      		}else if(this.policyType == 4 && this.subList.length>0){
	      			if (columnIndex === 0 )  {
	      				let mul= parseFloat(this.subList.length/this.mainList.length);
	      				let n= this.subList.length % this.mainList.length;
	      				var arrMain = [];//主品个数索引
	      				var mergeMain =[];//需要合并的行数集合
	      				for(let i = 0; i<this.subList.length; i++){
	      					arrMain.push(i);
	      				}
	      				for(let i = 0; i<arrMain.length; i+=mul){
	      					mergeMain.push(arrMain.slice(i,i+mul));
	      				};
	      				console.log("mergeMain",JSON.stringify(mergeMain));
	      				for (let i = 0; i< mergeMain.length; i++){
	      					let element = mergeMain[i];
	      					for (let j = 0; j < element.length; j++) {//[0,1][3,4,5]合并的行  12行合并，345行合并
				              	let item = element[j];console.log("element",element[j]);
				              	if (rowIndex == item) {//需要合并单元格的行数
				                if (j == 0) {
				                  return {
				                    rowspan: element.length,
				                    colspan: 1
				                  }
				                } else if (j != 0) {//不合并的
				                  return {
				                    rowspan: 0,
				                    colspan: 0
				                  }
				                }
				            }
			            }
	      				}

			        }
	      		}else if(this.mainList.length>1 && this.subList.length==0){//多个主品时,奖励商品请选择合并单元格
	      			if (columnIndex === 1) {
	      				for (let j = 0; j < 1; j++) {
		      				if (rowIndex == 0){
		      					if (j == 0) {
				                  return {
				                    rowspan: this.mainList.length,
				                    colspan: 1
				                  }
				                } else if (j != 0) {//1   不合并的
				                  return {
				                    rowspan: 0,
				                    colspan: 0
				                  }
				                }
		      				}
		      			}
			        }
	      		}
	      	},
			//自定义表头
			renderHeader(h) {
		        return h('div',[
		         	h('span', '奖励商品'),
		         	h('el-button', {
		         		'class':['el-button--small'],
		         		on:{
		         			click: ()=>{this.selectAwardGoods({})}
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
		         			click: ()=>{this.selectAwardGoods()}
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
        this.clearProvMange();//清空使用范围
      },
      //删除政策回款商品
      deleScopeRow(goodsId){
        this.tableData1 = this.tableData1.filter(p=>p.goodsId!=goodsId);
        this.goodsId = this.goodsId.filter(p=>p!=goodsId);
        this.clearProvMange();//清空使用范围
      },
		   	//选择政策--重新赋值
			policyChange(val){
        this.policyType= val;
        this.awardGoods='hide';//商品列表隐藏
        this.isHuiKuan=false;//商品列表隐藏
        this.mainList = [];
        this.subList = [];
        this.tableData1 = [];
        this.goodsIdm = [];//主品id
        this.goodsId = [];//奖励商品id
        this.tableData1 = [];
        this.tableData=[{goodsNamem:"",specsMaxm:""}];
        this.clearProvMange();//清空使用范围
			},
			 //点击事业部
			selectSuccess(val){
				this.departmentId = val;
				this.awardGoods='hide';//商品列表隐藏
				this.mainList = [];
				this.subList = [];
				this.goodsIdm = [];//主品id
				this.goodsId = [];//奖励商品id
        this.tableData1 = [];
				this.tableData=[{goodsNamem:"",specsMaxm:""}];
			},
			//适用范围
			setRange(){
				if( this.policyTypes == this.policyType && this.departmentId == this.departmentIds){
					this.$refs.dialogSeleProMa.dialogShow();
					return false;
				}
				let datalist = {
					departmentId: this.departmentId,
					goodsId: this.goodsId.toString(),
					goodsIdm: this.goodsIdm.toString(),
					policyType: this.policyType
				};

				getRangeProvince(datalist).then( res => {
					this.rangeList = res.data.data;
				});
				this.$refs.dialogSeleProMa.dialogShow();

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
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
				let datalist=this.getsearchInfo(this.pageIndex,this.pageSize);
				this.initData(datalist)
			},
	    	//设置适用范围
      setProvMange(val){
        this.userId = [];
        val.forEach(p => {console.log(p)
          this.userId.push(p.userId);
        })
      },
      //获取商品列表
      getGoodsList(val){
        this.pageIndex = val.pageIndex;
        this.pageSize = val.pageSize;
        let datalist = {
          departmentIds: this.departmentId,
          goodsName:this.$refs.dialogSeleGoods.formInline.goodsName,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        getGoods(datalist).then( res =>{
          this.goodsList = res.data.data;
        });
      },
      clearProvMange(){
        this.userId = [];//清空使用范围
        this.$refs.dialogSeleProMa.isHuixian = false;
      },
      //保存按钮
      saveAddPolGoods(){
        if(this.policyType==''){
          this.$message.success("请选择政策类型")
          return false;
        }else if(this.title.trim()==''){
          this.$message.success("请输入政策名称")
          return false;
        }else if(this.policyType==2&&this.policyTypeCheck==''){
          this.$message.success("请选择政策子类型")
          return false;
        }else if(this.policyStartDate==''||this.policyEndDate == ''){
          this.$message.success("请选择政策有效期")
          return false;
        }else if(this.departmentId==''){
          this.$message.success("请选择事业部")
          return false;
        }
        let policyRule=[];
        let isSubmit = false;
        if(this.policyType==2){//奖励政策
          if(this.tableData1.length>0){
            let obj = {};
            let _num = 0;
            const _arr = this.tableData1.slice();
            _arr.reverse().forEach(p=>{
              if(p.awardNum.toString().length>0&&p.afterDiscountPrice.toString().length>0){
                _num+=1;
                obj = {
                  "goodsId":p.goodsId //商品id
                  ,"awardNum":p.awardNum//奖励数量，必填
                  ,"discountPrice":p.afterDiscountPrice //折后价,必填
                  ,"batchNumber":p.batchNumber   //指定批号
                }
                policyRule.push(obj);
              }else{
                if(p.awardNum.length.toString()==0){
                  this.$message.success("请输入【"+p.goodsName+"】的奖励数量")
                }else if(p.afterDiscountPrice.toString().length==0){
                  this.$message.success("请输入【"+p.goodsName+"】的折后价")
                }
              }
            })
            if(_num == this.tableData1.length){
              isSubmit = true;
            }else{
              isSubmit = false;
            }
          }else{
            this.$message.success("请完善政策规则")
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
              if(p.collectionNum.toString().length>0){
                _num += 1;
                obj = {
                  "goodsId":p.goodsIdm//商品id
                  ,"collectionNum": p.collectionNum//回款数量
                }
                mainArray.push(obj)
              }else{
                if(p.collectionNum.toString().length==0){
                  this.$message.success("请输入【"+p.goodsNamem+"】的回款商品数量")
                }
              }
            })
            if(_num == this.mainList.length){
              isSubmit = true;
            }else{
              isSubmit = false;
            }
          }
          if(this.subList.length==0){
            this.$message.success("请添加奖励的商品")
            isSubmit = false;
            return false;
          }else{
            const subArr = this.subList.slice();
            let obj = {};
            let _num = 0;
            subArr.reverse().forEach(p=>{
              if(p.awardNum.toString().length>0&&p.afterDiscountPrice.toString().length>0){
                _num += 1;
                obj = {
                  "goodsId":p.goodsId  //商品id
                  ,"awardNum":p.awardNum //奖励数量，必填
                  ,"discountPrice":p.afterDiscountPrice //折后价,必填
                  ,"batchNumber":p.batchNumber    //指定批号
                }
                subArray.push(obj)
              }else{
                if(p.awardNum.toString().length==0){
                  this.$message.success("请输入【"+p.goodsName+"】的奖励数量")
                }else if(p.afterDiscountPrice.toString().length==0){
                  this.$message.success("请输入【"+p.goodsName+"】的折后价")
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
        if(this.userId.length==''){
          this.$message.success("请设置适用范围");
          isSubmit = false;
          return false;
        }
        if(isSubmit){
            if(this.$route.query.handleType == 1){//修改
              let datalist = {
                id: this.id,//政策类型
                policyType: this.policyType,//政策类型
                policyStartDate: this.policyStartDate,//政策有效期
                policyEndDate: this.policyEndDate,//政策有效期
                title: this.title,//政策名称
                verificationStartDate: this.verificationStartDate,//核销起始时间
                verificationEndDate: this.verificationEndDate,//核销结束时间
                departmentId: this.departmentId,//事业部
                remark: this.remark,//政策说明
                policyRule: JSON.stringify(policyRule),
                policyRange: this.userId.toString(),
                policyTypeCheck:this.policyTypeCheck=='null'?'':this.policyTypeCheck,//政策子类型
              }
              updatePolicy(datalist).then( res =>{
                if(res.data.code == 1){
                  this.$router.go(-1);
                }else{
                  this.$message.success(res.data.msg);
                }
              })
            }else{//复制
              let datalist = {
                policyType: this.policyType,//政策类型
                policyStartDate: this.policyStartDate,//政策有效期
                policyEndDate: this.policyEndDate,//政策有效期
                title: this.title,//政策名称
                verificationStartDate: this.verificationStartDate,//核销起始时间
                verificationEndDate: this.verificationEndDate,//核销结束时间
                departmentId: this.departmentId,//事业部
                remark: this.remark,//政策说明
                policyRule: JSON.stringify(policyRule),
                policyRange: this.userId.toString(),
                policyTypeCheck:this.policyTypeCheck=='null'?'':this.policyTypeCheck,//政策子类型
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
  	}
</script>

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
        resize:none
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
