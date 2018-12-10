webpackJsonp([26],{EO3N:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("PP8w"),r={data:function(){return{tableData:[],detailArr:[],basicForm:[]}},created:function(){},mounted:function(){this.initData()},methods:{initData:function(){var t=this;Object(e.n)({ordersId:this.$route.query.ordersId,buttonType:this.$route.query.buttonType,ordersStatus:this.$route.query.ordersStatus,customerId:this.$route.query.customerId}).then(function(a){console.log(a),t.basicForm=a.data.data,t.tableData=a.data.data.goodsList,console.log(t.tableData)})},doPrintVue:function(){var t=document.getElementsByClassName("tableBOX")[0].innerHTML;document.body.innerHTML=t,window.print(),window.location.reload()},goBack:function(){this.$router.replace({path:"/provinceOrderZB"})}}},l={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"print_or_back_btn noprint"},[s("div",{staticClass:"print_btn"},[s("a",{attrs:{href:"javascript:void(0)",target:"_blank"},on:{click:function(a){t.doPrintVue()}}},[s("input",{attrs:{type:"button",value:"打印"}})])]),t._v(" "),s("div",{staticClass:"back_btn"},[s("input",{attrs:{type:"button",value:"返回"},on:{click:function(a){t.goBack()}}})])]),t._v(" "),s("div",{staticClass:"tableBOX",attrs:{id:"billBOX"}},[s("div",{staticClass:"table_title"},[t._v("开票申请单")]),t._v(" "),s("div",{staticClass:"table_other"},[s("div",{staticClass:"table_sellClass"},[t._v("销售类型：基础医药")]),t._v(" "),s("div",{staticClass:"table_billNumber"},[t._v("单据编号："+t._s(t.basicForm.ordersNum))]),t._v(" "),s("div",{staticClass:"table_applyTime"},[t._v("*申请时间："+t._s(t.basicForm.createDate))])]),t._v(" "),s("div",{staticClass:"borderWrap"},[s("table",{staticClass:"table_Bill",attrs:{cellspacing:"0",cellpadding:"0"}},[t._m(0),t._v(" "),s("tbody",{staticClass:"bill"},[s("tr",[s("td",{attrs:{rowspan:"6"}},[t._v("开票企业信息")]),t._v(" "),s("td",{attrs:{colspan:"2"}},[t._v("企业名称")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billCompanyName))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"2"}},[t._v("注册地址")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billRegistAddress))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"2"}},[t._v("开户银行")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billAccountBank))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"2"}},[t._v("银行账号")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billAccountNum))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"2"}},[t._v("企业税号")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billTaxpayerCode))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"2"}},[t._v("注册电话")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.registPhone))])])]),t._v(" "),s("tbody",{staticClass:"bill"},[s("td",{staticStyle:{"border-right":"none"},attrs:{rowspan:"tableData.length"}},[t._v("开票产品信息")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[s("el-table",{attrs:{data:t.tableData}},[s("el-table-column",{attrs:{prop:"goodsName",label:"品名",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"specsMax",label:"规格",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"totalNum",label:"实发数量",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"price",label:"件数",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"price",label:"盒数",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"price",label:"*单价",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gapUp",label:"开票类型",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gapUpPrice",label:"开票价格",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"sumPrice",label:"小计",align:"center"}})],1)],1),t._v(" "),s("tr",[s("td",{attrs:{colspan:"3"}},[t._v("\n                    合计\n                ")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.sumPriceString))])])]),t._v(" "),s("tbody",{staticClass:"bill"},[s("tr",[s("td",{attrs:{colspan:"3"}},[t._v("发票收取联系人")]),t._v(" "),s("td",{attrs:{colspan:"2"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billMailReceiveName))]),t._v(" "),s("td",{attrs:{colspan:"2"}},[t._v("电话")]),t._v(" "),s("td",{attrs:{colspan:"4"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billMailReceivePhone))])]),t._v(" "),t._m(1),t._v(" "),s("tr",[s("td",{attrs:{colspan:"3"}},[t._v("发票邮寄地址")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.ordersDeliveryMsgDetail.billMailReceiveAddress))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"3"}},[t._v("备注")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.remark))])]),t._v(" "),s("tr",[s("td",{attrs:{colspan:"3"}},[t._v("省区经理（签字）")]),t._v(" "),s("td",{attrs:{colspan:"8"}},[t._v(t._s(t.basicForm.managerName))])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("tbody",{staticClass:"bill"},[a("tr",[a("td",{attrs:{colspan:"3"}},[this._v("发票种类")]),this._v(" "),a("td",{attrs:{colspan:"8"}},[a("span"),a("span",[this._v("增值税票")])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("tr",[a("td",{attrs:{colspan:"3"}},[this._v("本单业务负责人")]),this._v(" "),a("td",{attrs:{colspan:"2"}},[this._v("{{}}")]),this._v(" "),a("td",{attrs:{colspan:"2"}},[this._v("电话")]),this._v(" "),a("td",{attrs:{colspan:"4"}},[this._v("{{}}")])])}]};var i=s("C7Lr")(r,l,!1,function(t){s("V+79"),s("UsDl")},"data-v-748b28ac",null);a.default=i.exports},UsDl:function(t,a){},"V+79":function(t,a){}});
//# sourceMappingURL=26.acb1858797a4eeedb058.js.map