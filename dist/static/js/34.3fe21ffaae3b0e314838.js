webpackJsonp([34],{On2E:function(t,e){},QVdK:function(t,e){},SyJD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("zY1m"),i=a("a9+l"),o=a("cW/P"),s={data:function(){return{startDate:"",endDate:"",goodsName:"",manufacturer:"",tableData:[],totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0}},created:function(){var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},components:{elPagination:i.a,datepicker:n.a},methods:{initData:function(t){var e=this;Object(o.p)(t).then(function(t){console.log("res:",t);var a=t.data.data;a.dataList.length>0?(e.pagin_show=!0,e.totalRecords=a.totalRecords,e.totalPageCnt=a.totalPageCnt,e.pageIndex=a.pageIndex,e.tableData=a.dataList):(e.tableData=[],e.pagin_show=!1)})},getsearchInfo:function(t,e){return{pageIndex:t,pageSize:e,startDate:this.startDate,endDate:this.endDate,goodsName:this.goodsName,manufacturer:this.manufacturer}},changeSelect:function(t){"startDate"==t.type?this.startDate=t.data:this.endDate=t.data},toInquire:function(){var t=this.getsearchInfo(1,this.pageSize);this.initData(t)},exportBaseInfoData:function(){var t={startDate:this.startDate,endDate:this.endDate,goodsName:this.goodsName,manufacturer:this.manufacturer};Object(o.d)(t).then(function(t){var e=(new Date).getTime()+".xls",a=new Blob([t.data]),n=document.createElement("a");n.download=e,n.style.display="none",n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)})},view:function(t){this.$router.push({path:"/view_researGoodsSQ",query:{id:t}})},updataPage:function(t){this.pageIndex=t.pageIndex,this.pageSize=t.pageSize;var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(e)}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"产品名称："}},[a("el-input",{attrs:{placeholder:"请输入产品名称"},model:{value:t.goodsName,callback:function(e){t.goodsName=e},expression:"goodsName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"生产企业"}},[a("el-input",{attrs:{placeholder:"请输入生产企业"},model:{value:t.manufacturer,callback:function(e){t.manufacturer=e},expression:"manufacturer"}})],1),t._v(" "),a("div",{staticClass:"div-inline el-form-item"},[a("div",{staticClass:"div-inline"},[t._v("点击时间：")]),t._v(" "),a("datepicker",{staticClass:"div-inline",attrs:{startIsShow:"true",endIsShow:"true"},on:{changeSelect:t.changeSelect}})],1),t._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(e){t.toInquire()}}},[t._v("查询")]),t._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:t.exportBaseInfoData}},[t._v("导出")])],1)],1),t._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{ref:"multipleTable",attrs:{data:t.tableData,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"goodsName",label:"产品名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"specsMax",label:"规格",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"manufacturer",label:"生产企业"}}),t._v(" "),a("el-table-column",{attrs:{prop:"unit",label:"单位",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mainEffect",label:"功能主治"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clickNum",label:"点击量",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operateBtn",on:{click:function(a){t.view(e.row.id)}}},[t._v("查看")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{pageIndex:t.pageIndex,pageSize:t.pageSize,totalRecords:t.totalRecords,totalPageCnt:t.totalPageCnt,pagin_show:t.pagin_show},on:{clickpage:t.updataPage}})],1)])},staticRenderFns:[]};var r=a("C7Lr")(s,l,!1,function(t){a("On2E"),a("QVdK")},"data-v-3c3b3e1d",null);e.default=r.exports}});
//# sourceMappingURL=34.3fe21ffaae3b0e314838.js.map