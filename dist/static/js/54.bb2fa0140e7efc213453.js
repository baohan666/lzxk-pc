webpackJsonp([54],{"H/P5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("PP8w"),o=a("zY1m"),n=a("XH94"),s=a("a9+l"),i={data:function(){return{totalRecords:0,totalPageCnt:0,pagin_show:!0,pageIndex:1,pageSize:10,oweType:2,goodsName:"",departmentId:"",oweStatus:"",provinceName:"",managerName:"",tableData:[],ordersOweId:"",handleDetailShow:!1,dailogTitleType:"提示",dialogVisible:!1,dailogCon:"确定将状态更新为已处理？"}},mounted:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.getData(e)},components:{departComponet:n.a,datepicker:o.a,elPagination:s.a},methods:{getPolicyOweDeal:function(){var e=this;Object(l.h)({ordersOweId:this.ordersOweId,oweStatus:this.oweStatus}).then(function(t){console.log(t),e.dialogVisible=!1,e.oweStatus="";var a=e.getsearchInfo(e.pageIndex,e.pageSize);e.getData(a)})},getData:function(e){var t=this;2==this.oweType?Object(l.j)(e).then(function(e){if(1==e.data.code){var a=e.data.data;a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1)}else t.pagin_show=!1}):3==this.oweType?Object(l.j)(e).then(function(e){if(1==e.data.code){var a=e.data.data;a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1)}else t.pagin_show=!1}):4==this.oweType&&Object(l.j)(e).then(function(e){if(1==e.data.code){var a=e.data.data;a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1)}else t.pagin_show=!1})},getsearchInfo:function(e,t){console.log(this.oweType);var a={};return 2==this.oweType?a={pageIndex:e,pageSize:t,oweType:this.oweType,goodsName:this.goodsName,departmentId:this.departmentId,provinceName:this.provinceName,managerName:this.managerName,oweStatus:this.oweStatus}:3==this.oweType?a={pageIndex:e,pageSize:t,oweType:this.oweType,goodsName:this.goodsName,departmentId:this.departmentId,provinceName:this.provinceName,managerName:this.managerName,oweStatus:this.oweStatus}:4==this.oweType&&(a={pageIndex:e,pageSize:t,oweType:this.oweType,goodsName:this.goodsName,departmentId:this.departmentId,provinceName:this.provinceName,managerName:this.managerName,oweStatus:this.oweStatus}),a},searchQuery:function(){var e=this.getsearchInfo(1,this.pageSize);this.getData(e)},updataPage:function(e){console.log(e),this.pageIndex=e.pageIndex,this.pageSize=e.pageSize,this.getData(this.pageIndex,this.pageSize)},selectSuccess:function(e){this.departmentId=e},changeHandler:function(e){this.tableData=[];var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.getData(t)},backBtn:function(){this.handleEditShow=!1,this.getData(this.pageIndex,this.pageSize,this.nameOrTel,this.selStatus,this.selSole)},checkOutOrderInfo:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);Object(l.b)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),l=document.createElement("a");l.download=t,l.style.display="none",l.href=URL.createObjectURL(a),console.log(l.href),document.body.appendChild(l),l.click(),URL.revokeObjectURL(l.href),document.body.removeChild(l)})},handleCheck:function(e,t){this.$router.push({path:"/policyOweDetailZB",query:{id:t.id,oweStatus:t.oweStatus}})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"accountManage"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.handleDetailShow,expression:"!handleDetailShow"}],attrs:{id:""}},[a("div",{staticClass:"search_wrap"},[a("el-radio-group",{staticClass:"selectRadio",on:{change:e.changeHandler},model:{value:e.oweType,callback:function(t){e.oweType=t},expression:"oweType"}},[a("el-radio",{attrs:{label:2}},[e._v("需补货产品")]),e._v(" "),a("el-radio",{attrs:{label:3}},[e._v("主品盈余")]),e._v(" "),a("el-radio",{attrs:{label:4}},[e._v("其他")])],1),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"省区经理："}},[a("el-input",{attrs:{placeholder:"请输入省区经理"},model:{value:e.managerName,callback:function(t){e.managerName=t},expression:"managerName"}})],1),e._v(" "),a("div",{staticClass:"div-inline el-form-item"},[a("depart-componet",{attrs:{departMsg:"事业部："},on:{selectSuccess:e.selectSuccess}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属省区："}},[a("el-input",{attrs:{placeholder:"请输入省区名称"},model:{value:e.provinceName,callback:function(t){e.provinceName=t},expression:"provinceName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品名称："}},[a("el-input",{attrs:{placeholder:"请输入产品名称"},model:{value:e.goodsName,callback:function(t){e.goodsName=t},expression:"goodsName"}})],1),e._v(" "),2==e.oweType?a("el-form-item",{attrs:{label:"状态："}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.oweStatus,callback:function(t){e.oweStatus=t},expression:"oweStatus"}},[a("el-option",{staticStyle:{},attrs:{label:"请选择状态",value:""}}),e._v(" "),a("el-option",{attrs:{label:"未提交",value:6}}),e._v(" "),a("el-option",{attrs:{label:"已提交",value:4}}),e._v(" "),a("el-option",{attrs:{label:"已完成",value:7}}),e._v(" "),a("el-option",{attrs:{label:"待审核",value:5}})],1)],1):a("el-form-item",{attrs:{label:"状态："}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.oweStatus,callback:function(t){e.oweStatus=t},expression:"oweStatus"}},[a("el-option",{staticStyle:{},attrs:{label:"请选择状态",value:""}}),e._v(" "),a("el-option",{attrs:{label:"待处理",value:8}}),e._v(" "),a("el-option",{attrs:{label:"已处理",value:9}})],1)],1),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.searchQuery}},[e._v("查询")]),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.checkOutOrderInfo}},[e._v("导出")])],1)],1),e._v(" "),2==e.oweType?a("el-table",{key:"firstTable",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"deptName",label:"事业部",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所属省区",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"managerName",label:"省区经理",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"产品名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specsMax",label:"规格",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalBox",label:"数量",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalPrice",label:"合计金额",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"oweStatusStr",label:"状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleCheck(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1):e._e(),e._v(" "),3==e.oweType?a("el-table",{key:"twoTable",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"deptName",label:"事业部",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所属省区",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"managerName",label:"省区经理",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"产品名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specsMax",label:"规格",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalBox",label:"盈余数量",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"采购单价",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"oweStatusStr",label:"状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{directives:[{name:"show",rawName:"v-show",value:"已处理"!=t.row.oweStatusStr,expression:'scope.row.oweStatusStr != "已处理" '}],staticClass:"operateBtn",on:{click:function(a){e.dialogVisible=!0,e.oweStatus=t.row.oweStatus,e.ordersOweId=t.row.id}}},[e._v("待处理")]),e._v(" "),a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleCheck(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1):e._e(),e._v(" "),4==e.oweType?a("el-table",{key:"lastTable",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"deptName",label:"事业部",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所属省区",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"managerName",label:"省区经理",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"产品名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specsMax",label:"规格",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalBox",label:"采购数量",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"采购单价",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"oweStatusStr",label:"状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{directives:[{name:"show",rawName:"v-show",value:"已处理"!=t.row.oweStatusStr||"9"!=t.row.oweStatus,expression:'scope.row.oweStatusStr != "已处理" || scope.row.oweStatus != "9" '}],staticClass:"operateBtn",on:{click:function(a){e.dialogVisible=!0,e.oweStatus=t.row.oweStatus,e.ordersOweId=t.row.id}}},[e._v("待处理")]),e._v(" "),a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleCheck(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1):e._e()],1),e._v(" "),a("el-dialog",{staticClass:"elDialogAddress",attrs:{title:e.dailogTitleType,visible:e.dialogVisible,"append-to-body":!0,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"dailogCon"},[a("span",[e._v(e._s(e.dailogCon))])]),e._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("span",{staticClass:"dialogBtnTrue",on:{click:function(t){e.getPolicyOweDeal()}}},[e._v("确定")])])]),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1)},staticRenderFns:[]};var c=a("C7Lr")(i,r,!1,function(e){a("LttF")},"data-v-b44a14d8",null);t.default=c.exports},LttF:function(e,t){}});
//# sourceMappingURL=54.bb2fa0140e7efc213453.js.map