webpackJsonp([83],{"8xUm":function(e,a){},onKu:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=t("3cXf"),r=t.n(o),i=t("Agyp"),n=t("Xrov"),s=t("ROW2"),c=t("DMbw"),l={name:"detailFeedbackZB",data:function(){return{pricenum:212,areaName:"",areaManager:"",position:"",userId:"",managerUserId:"",tableData:[],goodsName:"",changPriLogData:[],priceInfo:[],obj:{},changPriceNum:0,changeReason:"",dialogReasonVisible:!1}},created:function(){this.initData()},components:{goBack:i.a,changePriceLog:n.a},methods:{initData:function(){var e=this;Object(c.l)({areaCode:this.$route.query.areaCode,priceId:this.$route.query.priceId}).then(function(a){e.areaName=a.data.data.areaName,e.areaManager=a.data.data.areaManager,e.position=a.data.data.position,e.managerUserId=a.data.data.managerUserId,e.tableData=a.data.data.goodsList,e.userId=a.data.data.userId})},submitChangePrice:function(){var e=this,a={priceInfo:this.priceInfo,changeReason:this.changeReason,userId:this.userId},t={arrayListStr:r()(a),changeReason:this.changeReason,userId:Object(s.b)("accountId")};console.log(t),Object(c.B)(t).then(function(a){e.$router.go(-1)})},handleChange:function(e,a){var t=1,o=1;if("provincePrice"==a?(o=e.provincePrice,t=e.oldProvincePrice,1):"cityPrice"==a?(o=e.cityPrice,t=e.oldCityPrice,2):(o=e.fewPrice,t=e.oldPrice,3),"oldPrice"==o)return!1;var r={priceId:e.priceId,newPrice:o,oldPrice:t,userId:this.userId};this.priceInfo=[],r.userId in this.obj?(console.log(this.obj),console.log(r.userId),console.log(this.obj[r.userId]),1==r.priceType?this.obj[r.userId][0]=r:2==r.priceType?this.obj[r.userId][1]=r:3==r.priceType&&(this.obj[r.userId][2]=r)):(this.obj[r.userId]=[],this.obj[r.userId][0]=r,console.log(this.obj)),this.priceInfo.push(this.obj),this.changPriceNum=this.priceInfo.length,console.log(this.priceInfo)},handleInput2:function(e){e.target.value=e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]||null},changePartPrice:function(e,a){this.$router.push({path:"/changePartPriceZB",query:{goodsId:e,managerId:a,userId:a,searchCity:"",searchCounty:""}})},showChangePriceLog:function(e,a,t){var o=this,r=0;r="省区经理"==this.position?1:"地区经理"==a?2:3;var i={pageIndex:1,pageSize:10,priceId:e,goodsId:t,managerId:this.managerUserId,userId:this.userId,logType:r};Object(c.o)(i).then(function(e){o.changPriLogData=e.data.data,o.$refs.changePriceLog.dialogShow()})}}},d={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("go-back",{attrs:{title:"改价"}}),e._v(" "),t("div",{staticClass:"infoDetail"},[t("el-row",{attrs:{gutter:20}},[t("span",[e._v(e._s(e.areaName))]),e._v(" "),t("span",[e._v(e._s(e.areaManager))]),e._v(" "),t("span",[e._v(e._s(e.position))])])],1),e._v(" "),t("div",{staticClass:"table_wrap"},[t("el-table",{ref:"multipleTable",attrs:{data:e.tableData,border:"","tooltip-effect":"dark","max-height":"530"}},[t("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"specsMax",label:"规格"}}),e._v(" "),t("el-table-column",{attrs:{prop:"manufacturer",label:"生产企业"}}),e._v(" "),t("el-table-column",{attrs:{prop:"drugType",label:"剂型"}}),e._v(" "),t("el-table-column",{attrs:{prop:"standPrice",label:"公司标准价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"fixedPrice",label:"省区定价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"fewPrice",label:"价格"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("input",{directives:[{name:"model",rawName:"v-model.trim",value:a.row.fewPrice,expression:"scope.row.fewPrice",modifiers:{trim:!0}}],class:{tableInput:!0,color_red:a.row.fixedPrice<a.row.fewPrice,color_blue:a.row.fixedPrice>a.row.fewPrice},attrs:{type:"number"},domProps:{value:a.row.fewPrice},on:{change:function(t){e.handleChange(a.row,"fewPrice")},keydown:e.handleInput2,input:function(t){t.target.composing||e.$set(a.row,"fewPrice",t.target.value.trim())},blur:function(a){e.$forceUpdate()}}})]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("div",{staticClass:"operateBtn",on:{click:function(t){e.showChangePriceLog(a.row.priceId,a.row.position,a.row.goodsId)}}},[e._v("改价日志")])]}}])})],1)],1),e._v(" "),t("div",{staticClass:"operateWraper"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.changPriceNum>0,expression:"changPriceNum>0"}],staticClass:"div-inline el-button-red",on:{click:function(a){e.dialogReasonVisible=!0}}},[e._v("提交改价")])]),e._v(" "),t("changePriceLog",{ref:"changePriceLog",attrs:{changPriLogData:e.changPriLogData}}),e._v(" "),t("el-dialog",{attrs:{title:"改价原因",visible:e.dialogReasonVisible,"append-to-body":!0,width:"35%"},on:{"update:visible":function(a){e.dialogReasonVisible=a}}},[t("div",{staticClass:"dialog_body_content"},[t("div",{staticClass:"dialog_changePrice_reason"},[e._v("\n\t\t\t\t\t改价原因：\n\t\t\t\t\t"),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.changeReason,expression:"changeReason"}],staticClass:"checkReason",attrs:{placeholder:"请填写改价原因",name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.changeReason},on:{input:function(a){a.target.composing||(e.changeReason=a.target.value)}}})])]),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{directives:[{name:"show",rawName:"v-show",value:""==e.changeReason,expression:"changeReason==''"}],staticClass:"dialogDisaBtn",attrs:{type:"danger",disabled:""}},[e._v("确定")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:""!=e.changeReason,expression:"changeReason!=''"}],staticClass:"dialog-sure-btn dialoperateBtn",on:{click:function(a){e.submitChangePrice()}}},[e._v("确定")])],1)])],1)},staticRenderFns:[]};var u=t("C7Lr")(l,d,!1,function(e){t("8xUm")},"data-v-0e2b3b26",null);a.default=u.exports}});
//# sourceMappingURL=83.b27b4a548a892d1cdaae.js.map