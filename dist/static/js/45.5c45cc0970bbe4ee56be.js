webpackJsonp([45],{"9n14":function(t,a){},QFoA:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("a9+l"),i=e("bWIj"),s=e("Agyp"),o={name:"detailFeedbackZB",data:function(){return{infoList:[],totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0,tableData:[]}},mounted:function(){var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},components:{elPagination:n.a,goBack:s.a},methods:{initData:function(t){var a=this;Object(i.c)(t).then(function(t){var e=t.data.data;a.infoList=e.dataList[0].title,a.tableData=e.dataList[0].list,a.totalRecords=e.totalRecords,a.totalPageCnt=e.totalPageCnt,a.pageIndex=e.pageIndex})},getsearchInfo:function(t,a){return{pageIndex:t,pageSize:a,stockId:this.$route.query.id}},updataPage:function(t){this.pageIndex=t.pageIndex,this.pageSize=t.pageSize;var a=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(a)}}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("go-back",{attrs:{title:"库存日志"}}),t._v(" "),e("div",{staticClass:"infoDetail"},[e("span",[t._v("产品名称："+t._s(t.infoList.goodsName))]),t._v(" "),e("span",[t._v("规格："+t._s(t.infoList.specsMax))]),t._v(" "),e("span",[t._v("实际库存："+t._s(t.infoList.stockActual))]),t._v(" "),e("span",[t._v("可销售库存："+t._s(t.infoList.stockUsable))]),t._v(" "),e("span",[t._v("冻结库存："+t._s(t.infoList.stockUnusable))])]),t._v(" "),e("div",{staticClass:"table_wrap"},[e("div",{staticClass:"titleTip"},[t._v("库存变更明细")]),t._v(" "),e("el-table",{ref:"multipleTable",attrs:{data:t.tableData,border:"","tooltip-effect":"dark"}},[e("el-table-column",{attrs:{prop:"createDate",label:"变更时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"changeNumber",label:"变更数量"}}),t._v(" "),e("el-table-column",{attrs:{prop:"changeTypeStr",label:"更改类型"}}),t._v(" "),e("el-table-column",{attrs:{prop:"remark",label:"变更原因"}})],1),t._v(" "),e("el-pagination",{attrs:{pageIndex:t.pageIndex,pageSize:t.pageSize,totalRecords:t.totalRecords,totalPageCnt:t.totalPageCnt,pagin_show:t.pagin_show},on:{clickpage:t.updataPage}})],1)],1)},staticRenderFns:[]};var l=e("C7Lr")(o,r,!1,function(t){e("9n14")},"data-v-69c4fe25",null);a.default=l.exports},bWIj:function(t,a,e){"use strict";e.d(a,"b",function(){return o}),e.d(a,"a",function(){return r}),e.d(a,"c",function(){return l});var n=e("lta2"),i=e("6iV/"),s=e.n(i),o=function(t){return n.a.post(n.a.baseURL+"goodsStock/list",s.a.stringify(t))},r=function(t){return n.a.post(n.a.baseURL+"goodsStock/excel",s.a.stringify(t),{responseType:"blob"})},l=function(t){return n.a.post(n.a.baseURL+"goodsStockLog/list",s.a.stringify(t))}}});
//# sourceMappingURL=45.5c45cc0970bbe4ee56be.js.map