webpackJsonp([65],{"0q8w":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("ZLEe"),i=a.n(s),l=a("a3Yh"),n=a.n(l),o=a("XH94"),r=a("a9+l"),c=(a("ROW2"),a("DMbw")),u={data:function(){var e;return e={goodsName:"",materialCode:"",manufacturer:"0",manufacturerMenu:[],category:"0",categoryMenu:[],drugType:"0",drugTypeMenu:[],specsMax:"",specsMin:"",depIds:"0",departmentMenu:[],unit:"",version:"",licenseNumber:"",status:1,tableData3:[],totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0},n()(e,"categoryMenu",[]),n()(e,"multipleSelection",""),n()(e,"tId",""),n()(e,"dialogVisible",!1),n()(e,"removeGoods",{}),n()(e,"textTip",""),n()(e,"sureBtn_status",1),n()(e,"AliOssUrlist",[]),e},created:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);console.log(e),this.initData(e)},components:{departComponet:o.a,elPagination:r.a},methods:{initData:function(e){var t=this;Object(c.v)(e).then(function(e){var a=e.data.data;console.log(a.totalRecords),t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData3=a.dataList})},getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,goodsName:this.goodsName,materialCode:this.materialCode,manufacturer:this.manufacturer,category:this.category,drugType:this.drugType,specsMax:this.specsMax,specsMin:this.specsMin,depIds:this.depIds,unit:this.unit,version:this.version,licenseNumber:this.licenseNumber,status:this.status}},spreadCon:function(){var e=document.querySelector(".slideDown");if(e.classList.contains("spreadSlowlly"))return e.classList.remove("spreadSlowlly"),!1;e.classList.add("spreadSlowlly")},getManufacturer:function(){var e=this;if(i()(this.manufacturerMenu).length>0)return!1;Object(c.u)().then(function(t){e.manufacturerMenu=t.data.data})},getCategory:function(){var e=this;if(i()(this.categoryMenu).length>0)return!1;Object(c.m)("").then(function(t){e.categoryMenu=t.data.data})},getDrugType:function(){var e=this;if(i()(this.drugTypeMenu).length>0)return!1;Object(c.A)("").then(function(t){e.drugTypeMenu=t.data.data})},toInquire:function(){var e=this.getsearchInfo(1,this.pageSize);this.initData(e)},exportBtn:function(){var e={goodsName:this.goodsName,materialCode:this.materialCode,manufacturer:this.manufacturer,category:this.category,drugType:this.drugType,specsMax:this.specsMax,specsMin:this.specsMin,depIds:this.depIds,unit:this.unit,version:this.version,licenseNumber:this.licenseNumber,status:this.status};Object(c.h)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),s=document.createElement("a");s.download=t,s.style.display="none",s.href=URL.createObjectURL(a),console.log(s.href),document.body.appendChild(s),s.click(),URL.revokeObjectURL(s.href),document.body.removeChild(s)})},batchRemove:function(){var e=this,t=this.multipleSelection;if(""!=t||t.length>0){t.forEach(function(t,a,s){e.tId+=t.id+","}),this.textTip="您确定要下架这些商品吗？";var a=this.tId.substring(0,this.tId.lastIndexOf(","));this.removeGoodss={ids:a,status:2},this.dialogVisible=!0}else this.$message.error("请选择需要下架的商品")},goodsRemove:function(e){this.removeGoodss={ids:e,status:2},this.textTip="您确定要下架此商品吗？",this.dialogVisible=!0},removeSure:function(){var e=this;Object(c.y)(this.removeGoodss).then(function(t){e.$message.success("下架成功"),e.dialogVisible=!1;var a=e.getsearchInfo(1,e.pageSize);e.initData(a)})},view:function(e,t){this.$router.push({path:"/view_onsaleGoodsZB",query:{id:e,type:1}})},handleSelectionChange:function(e){this.multipleSelection=e},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},selectSuccess:function(e){this.depIds=e,console.log(this.depIds)}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{placeholder:"请输入商品名称"},model:{value:e.goodsName,callback:function(t){e.goodsName=t},expression:"goodsName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"物料编码"}},[a("el-input",{attrs:{placeholder:"请输入物料编码"},model:{value:e.materialCode,callback:function(t){e.materialCode=t},expression:"materialCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"生产企业"}},[a("el-select",{attrs:{placeholder:"请选择生产企业"},on:{focus:function(t){e.getManufacturer()}},model:{value:e.manufacturer,callback:function(t){e.manufacturer=t},expression:"manufacturer"}},[a("el-option",{attrs:{label:"请选择生产企业",value:"0"}}),e._v(" "),e._l(e.manufacturerMenu,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"物料类别"}},[a("el-select",{attrs:{placeholder:"请选择物料类别"},on:{focus:function(t){e.getCategory()}},model:{value:e.category,callback:function(t){e.category=t},expression:"category"}},[a("el-option",{attrs:{label:"请选择物料类别",value:"0"}}),e._v(" "),e._l(e.categoryMenu,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("div",{staticClass:"div-inline select-more",on:{click:function(t){e.spreadCon()}}},[e._v("\n        更多筛选 "),a("i",{staticClass:"el-icon-arrow-down"})]),e._v(" "),a("button",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toInquire()}}},[e._v("查询")]),e._v(" "),a("button",{staticClass:"div-inline el-button-red ",on:{click:e.exportBtn}},[e._v("导出")])],1),e._v(" "),a("el-form",{ref:"form",staticClass:"demo-form-inline slideDown",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"剂型"}},[a("el-select",{attrs:{placeholder:"请选择剂型"},on:{focus:function(t){e.getDrugType()}},model:{value:e.drugType,callback:function(t){e.drugType=t},expression:"drugType"}},[a("el-option",{attrs:{label:"请选择剂型",value:"0"}}),e._v(" "),e._l(e.drugTypeMenu,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"规格"}},[a("el-input",{attrs:{placeholder:"请输入规格"},model:{value:e.specsMax,callback:function(t){e.specsMax=t},expression:"specsMax"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"包装规格"}},[a("el-input",{attrs:{placeholder:"请输入包装规格"},model:{value:e.specsMin,callback:function(t){e.specsMin=t},expression:"specsMin"}})],1),e._v(" "),a("div",{staticClass:"div-inline el-form-item"},[a("depart-componet",{attrs:{departMsg:"事业部"},on:{selectSuccess:e.selectSuccess}})],1),e._v(" "),a("el-form-item",{attrs:{label:"单位"}},[a("el-input",{attrs:{placeholder:"请输入剂型"},model:{value:e.unit,callback:function(t){e.unit=t},expression:"unit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"版本号"}},[a("el-input",{attrs:{placeholder:"请输入规格"},model:{value:e.version,callback:function(t){e.version=t},expression:"version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"批准文号"}},[a("el-input",{attrs:{placeholder:"请输入包装规格"},model:{value:e.licenseNumber,callback:function(t){e.licenseNumber=t},expression:"licenseNumber"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("button",{staticClass:"div-inline el-button-red bitchRemove ",on:{click:e.batchRemove}},[e._v("批量下架")]),e._v(" "),a("el-table",{ref:"multipleTable",attrs:{data:e.tableData3,border:"","tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{prop:"manufacturer",label:"生产企业"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialCode",label:"物料编码",width:"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"物料名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugType",label:"剂型",width:"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specsMax",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specsMin",label:"包装规格",width:"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provincePrice",label:"省区经理标准价",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityPrice",label:"地区经理标准价",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"countyPrice",label:"县区经理标准价",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"operateBtn ",on:{click:function(a){e.goodsRemove(t.row.id)}}},[e._v("下架")]),e._v(" "),a("span",{staticClass:"operateBtn ",on:{click:function(a){e.view(t.row.id,1)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1),e._v(" "),a("el-dialog",{staticClass:"dialogTipsWrap",attrs:{title:"提示",visible:e.dialogVisible,width:"30%","append-to-body":!0},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"myDiolog_body_small"},[a("div",{staticClass:"textTip"},[e._v(e._s(e.textTip))])]),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("span",{staticClass:"dialog-cancel-btn dialoperateBtn",on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),a("span",{staticClass:"dialog-sure-btn dialoperateBtn",on:{click:e.removeSure}},[e._v("确定")])])])],1)},staticRenderFns:[]};var p=a("C7Lr")(u,d,!1,function(e){a("PrO3")},"data-v-565d688a",null);t.default=p.exports},PrO3:function(e,t){}});
//# sourceMappingURL=65.2dd71a0ca3ba349bb652.js.map