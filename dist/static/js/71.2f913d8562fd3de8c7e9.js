webpackJsonp([71],{EC7X:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("ZLEe"),i=a.n(n),l=a("XH94"),s=a("zY1m"),o=a("a9+l"),c=a("DMbw"),r={data:function(){return{goodsName:"",startDate:"",endDate:"",applicationStatus:"0",checkStatusMenu:{1:"待审核",2:"审核中",3:"通过",4:"不通过",5:"撤回"},depId:"0",areaName:"",userName:"",checkName:"",tableData:[],totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0}},created:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(e)},components:{departComponet:l.a,datepicker:s.a,elPagination:o.a},methods:{initData:function(e){var t=this;Object(c.j)(e).then(function(e){if(1==e.data.code){var a=e.data.data;a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1)}else t.pagin_show=!1})},getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,goodsName:this.goodsName,startDate:this.startDate,endDate:this.endDate,applicationStatus:this.applicationStatus,depId:this.depId,areaName:this.areaName,userName:this.userName,checkName:this.checkName}},getCheckStatus:function(){var e=this;if(i()(this.checkStatusMenu).length>0)return!1;Object(c.p)("").then(function(t){e.checkStatusMenu=t.data.data})},toCheckview:function(e){this.$router.push({path:"applyFormDeataiZB",query:{applyId:e}})},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},selectSuccess:function(e){this.departmentId=e,console.log(this.departmentId)},changeSelect:function(e){"startDate"==e.type?this.startDate=e.data:this.endDate=e.data},toInquire:function(){var e=this.getsearchInfo(1,this.pageSize);this.initData(e)},exportChangePrInfoData:function(){var e={goodsName:this.goodsName,startDate:this.startDate,endDate:this.endDate,applicationStatus:this.applicationStatus,depId:this.depId,areaName:this.areaName,userName:this.userName,checkName:this.checkName};Object(c.g)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),n=document.createElement("a");n.download=t,n.style.display="none",n.href=URL.createObjectURL(a),console.log(n.href),document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("div",{staticClass:"div-inline el-form-item"},[a("datepicker",{staticClass:"div-inline",attrs:{startIsShow:"true",endIsShow:"true"},on:{changeSelect:e.changeSelect}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择审核状态"},on:{focus:function(t){e.getCheckStatus()}},model:{value:e.applicationStatus,callback:function(t){e.applicationStatus=t},expression:"applicationStatus"}},[a("el-option",{attrs:{label:"请选择审核状态",value:"0"}},[e._v("请选择审核状态")]),e._v(" "),e._l(e.checkStatusMenu,function(e,t,n){return a("el-option",{key:n,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("div",{staticClass:"div-inline el-form-item"},[a("depart-componet",{attrs:{departMsg:""},on:{selectSuccess:e.selectSuccess}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入商品名称"},model:{value:e.goodsName,callback:function(t){e.goodsName=t},expression:"goodsName"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入区域名称"},model:{value:e.areaName,callback:function(t){e.areaName=t},expression:"areaName"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入经理名称"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入审核人"},model:{value:e.checkName,callback:function(t){e.checkName=t},expression:"checkName"}})],1),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toInquire()}}},[e._v("查询")]),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:e.exportChangePrInfoData}},[e._v("导出")])],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{ref:"multipleTable",attrs:{data:e.tableData,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"applyNum",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDateStr",label:"申请时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"applicationProvince",label:"申请省区",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceManager",label:"省区经理",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"changeArea",label:"改价区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"areaManager",label:"区域经理"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"appStatus",label:"审核状态",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"handleName",label:"审核人",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.toCheckview(t.row.id)}}},[e._v("详情")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1)])},staticRenderFns:[]};var d=a("C7Lr")(r,p,!1,function(e){a("MNfs")},"data-v-471ee9d7",null);t.default=d.exports},MNfs:function(e,t){}});
//# sourceMappingURL=71.2f913d8562fd3de8c7e9.js.map