webpackJsonp([56],{"/8xW":function(e,t){},gROn:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("a9+l"),n=a("zY1m"),o=a("eYXE"),p={data:function(){return{startDate:"",endDate:"",departmentId:"",departmentMenu:{1:"心脑事业部",2:"风湿及骨科事业部",3:"云事业部",4:"消化事业部"},provinceArea:"",applyType:"",applyTypelist:{1:"新增",2:"修改",3:"离职",4:"解禁"},applyStatus:"",applyStatuslist:{1:"待提交",2:"待审核",3:"审核通过",4:"审核不通过",5:"审核暂缓",6:"已撤回",7:"已删除"},staffName:"",totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:"",tableData3:[],infoList:[]}},mounted:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(e)},components:{datepicker:n.a,elPagination:l.a},methods:{initData:function(e){var t=this;Object(o.i)(e).then(function(e){if(1==e.data.code){var a=e.data.data;a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData3=a.dataList,t.pagin_show=!0):(t.tableData3=[],t.pagin_show=!1)}else t.pagin_show=!1})},getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,provinceName:this.provinceArea,applyType:this.applyType,departmentId:this.departmentId,startDate:this.startDate,endDate:this.endDate,applyStatus:this.applyStatus,name:this.staffName}},changeSelect:function(e){"startDate"==e.type?this.startDate=e.data:this.endDate=e.data},toInquire:function(){var e=this.getsearchInfo(1,this.pageSize);this.initData(e)},viewDetail:function(e){console.log(e),Object(o.s)({applyId:e}).then(function(e){console.log("未读变已读")}),this.$router.push({path:"/viewDetailPAZB",query:{id:e}})},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_wrap"},[a("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0}},[a("div",{staticClass:"div-inline el-form-item"},[a("datepicker",{staticClass:"div-inline",attrs:{startIsShow:"true",endIsShow:"true"},on:{changeSelect:e.changeSelect}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择事业部"},model:{value:e.departmentId,callback:function(t){e.departmentId=t},expression:"departmentId"}},[a("el-option",{attrs:{label:"请选择事业部",value:""}}),e._v(" "),e._l(e.departmentMenu,function(e,t,l){return a("el-option",{key:l,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入省区"},model:{value:e.provinceArea,callback:function(t){e.provinceArea=t},expression:"provinceArea"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"申请类型"},model:{value:e.applyType,callback:function(t){e.applyType=t},expression:"applyType"}},[a("el-option",{attrs:{label:"申请类型",value:""}}),e._v(" "),e._l(e.applyTypelist,function(e,t,l){return a("el-option",{key:l,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"申请单状态"},model:{value:e.applyStatus,callback:function(t){e.applyStatus=t},expression:"applyStatus"}},[a("el-option",{attrs:{label:"申请单状态",value:""}}),e._v(" "),e._l(e.applyStatuslist,function(e,t,l){return a("el-option",{key:l,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入人员姓名"},model:{value:e.staffName,callback:function(t){e.staffName=t},expression:"staffName"}})],1),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toInquire()}}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{ref:"multipleTable",attrs:{data:e.tableData3,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"userApplyNo",label:"编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(t.row.userApplyNo))]),e._v(" "),a("div",{class:2==t.row.isRead?"newData":""})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"提交时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"departmentId",label:"事业部"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(0==t.row.departmentId?"顶级部门":1==t.row.departmentId?"心脑事业部":2==t.row.departmentId?"风湿及骨科事业部":3==t.row.departmentId?"云事业部":"消化事业部")+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"managerName",label:"省区经理"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所属省区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"applyType",label:"申请类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(1==t.row.applyType?"新增":2==t.row.applyType?"修改":3==t.row.applyType?"离职":"解禁")+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"人员姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"position",label:"人员职务"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(1==t.row.position?"省区经理":2==t.row.position?"地区经理":3==t.row.position?"县区经理":"省办人员")+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"treeName",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"applyStatus",label:"申请单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(1==t.row.applyStatus?"待提交":2==t.row.applyStatus?"待审核":3==t.row.applyStatus?"审核通过":4==t.row.applyStatus?"审核不通过":5==t.row.applyStatus?"审核暂缓":6==t.row.applyStatus?"已撤回":"已删除")+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.viewDetail(t.row.id)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1)])},staticRenderFns:[]};var s=a("C7Lr")(p,r,!1,function(e){a("/8xW")},"data-v-a1b519c6",null);t.default=s.exports}});
//# sourceMappingURL=56.cfbd7391780e2b311808.js.map