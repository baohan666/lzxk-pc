webpackJsonp([70],{G35d:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("3cXf"),a=o.n(i),n=o("Agyp"),r=o("Xrov"),s=o("ROW2"),c=o("DMbw"),l={name:"detailFeedbackZB",data:function(){return{infoList:[],tableData:[],goodsName:this.$route.query.subSearchName,changPriLogData:[],priceInfo:[],changPriceNum:0,changeReason:"",dialogReasonVisible:!1,obj:{}}},created:function(){this.initData()},components:{goBack:n.a,changePriceLog:r.a},methods:{initData:function(){var e=this;Object(c.n)({goodsId:this.$route.query.goodsId,subSearchName:this.goodsName}).then(function(t){e.infoList=t.data.data.good,e.tableData=t.data.data.list,console.log(e.tableData)})},toInquire:function(){this.initData()},submitChangePrice:function(){var e=this,t={priceInfo:this.priceInfo,changeReason:this.changeReason},o={arrayListStr:a()(t),applyType:1,userId:Object(s.b)("accountId")};console.log(o),Object(c.D)(o).then(function(t){e.$router.go(-1)})},handleChange:function(e,t){var o=1,i=1,a=1;if("provincePrice"==t?(a=e.provincePrice,i=e.oldProvincePrice,o=1):"cityPrice"==t?(a=e.cityPrice,i=e.oldCityPrice,o=2):(a=e.countyPrice,i=e.oldCountyPrice,o=3),"oldPrice"==a)return!1;var n={priceType:o,id:e.id,goodsId:this.infoList.goodsId,oldPrice:i,newPrice:a,userId:e.managerUserId};this.priceInfo=[],n.userId in this.obj?(console.log(this.obj),console.log(n.userId),console.log(this.obj[n.userId]),1==n.priceType?this.obj[n.userId][0]=n:2==n.priceType?this.obj[n.userId][1]=n:3==n.priceType&&(this.obj[n.userId][2]=n)):(this.obj[n.userId]=[],this.obj[n.userId][0]=n,console.log(this.obj)),this.priceInfo.push(this.obj),this.changPriceNum=this.priceInfo.length},handleInput2:function(e){e.target.value=e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]||null},changePartPrice:function(e,t){this.$router.push({path:"/changePartPriceZB",query:{goodsId:this.$route.query.goodsId,managerId:t,userId:t,searchCity:"",searchCounty:""}})},showChangePriceLog:function(e,t,o){var i=this,a=0;a=5==o?1:4==o?2:3,null==e&&(e=0);var n={pageIndex:1,pageSize:10,priceId:e,goodsId:this.$route.query.goodsId,managerId:t,userId:t,logType:a};Object(c.o)(n).then(function(e){i.changPriLogData=e.data.data,i.$refs.changePriceLog.dialogShow()})}}},u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("go-back",{attrs:{title:"改价"}}),e._v(" "),o("div",{staticClass:"infoDetail"},[o("el-row",{attrs:{gutter:20}},[o("span",[e._v(e._s(e.infoList.goodsName))]),e._v(" "),o("span",[e._v(e._s(e.infoList.goodsSpecsMax))]),e._v(" "),o("span",[e._v(e._s(e.infoList.goodsManufacturer))]),e._v(" "),o("span",[e._v(e._s(e.infoList.goodsType))])]),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("span",[e._v("公司标准价-省区： "+e._s(e.infoList.provincePrice))]),e._v(" "),o("span",[e._v("公司标准价-地区： "+e._s(e.infoList.cityPrice))]),e._v(" "),o("span",[e._v("公司标准价-县区： "+e._s(e.infoList.countyPrice))])])],1),e._v(" "),o("div",{staticClass:"table_wrap"},[o("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0}},[o("el-form-item",[o("el-input",{attrs:{placeholder:"请输入省区经理名称或省区名称"},model:{value:e.goodsName,callback:function(t){e.goodsName="string"==typeof t?t.trim():t},expression:"goodsName"}})],1),e._v(" "),o("div",{staticClass:"div-inline el-button-red bitchRemove",on:{click:function(t){e.toInquire()}}},[e._v("查询")])],1),e._v(" "),o("el-table",{ref:"multipleTable",attrs:{data:e.tableData,border:"","tooltip-effect":"dark","max-height":"530"}},[o("el-table-column",{attrs:{prop:"proName",label:"省区名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"userName",label:"省区经理名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"provincePrice",label:"公司定价-省区"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.row.provincePrice,expression:"scope.row.provincePrice",modifiers:{trim:!0}}],class:{tableInput:!0,color_red:e.infoList.provincePrice<t.row.provincePrice,color_blue:e.infoList.provincePrice>t.row.provincePrice},attrs:{type:"number"},domProps:{value:t.row.provincePrice},on:{change:function(o){e.handleChange(t.row,"provincePrice")},keydown:e.handleInput2,input:function(o){o.target.composing||e.$set(t.row,"provincePrice",o.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"cityPrice",label:"公司定价-地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.row.cityPrice,expression:"scope.row.cityPrice",modifiers:{trim:!0}}],class:{tableInput:!0,color_red:e.infoList.cityPrice<t.row.cityPrice,color_blue:e.infoList.cityPrice>t.row.cityPrice},attrs:{type:"number"},domProps:{value:t.row.cityPrice},on:{change:function(o){e.handleChange(t.row,"cityPrice")},keydown:e.handleInput2,input:function(o){o.target.composing||e.$set(t.row,"cityPrice",o.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"countyPrice",label:"公司定价-县区"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.row.countyPrice,expression:"scope.row.countyPrice",modifiers:{trim:!0}}],class:{tableInput:!0,color_red:e.infoList.countyPrice<t.row.countyPrice,color_blue:e.infoList.countyPrice>t.row.countyPrice},attrs:{type:"number"},domProps:{value:t.row.countyPrice},on:{change:function(o){e.handleChange(t.row,"countyPrice")},keydown:e.handleInput2,input:function(o){o.target.composing||e.$set(t.row,"countyPrice",o.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",{staticClass:"operateBtn",on:{click:function(o){e.changePartPrice(t.row.id,t.row.managerUserId)}}},[e._v("修改个别区域")]),e._v(" "),o("div",{staticClass:"operateBtn",on:{click:function(o){e.showChangePriceLog(t.row.id,t.row.managerUserId,t.row.position)}}},[e._v("改价日志")])]}}])})],1)],1),e._v(" "),o("div",{staticClass:"operateWraper"},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.changPriceNum>0,expression:"changPriceNum>0"}],staticClass:"div-inline el-button-red",on:{click:function(t){e.dialogReasonVisible=!0}}},[e._v("提交改价")])]),e._v(" "),o("changePriceLog",{ref:"changePriceLog",attrs:{changPriLogData:e.changPriLogData}}),e._v(" "),o("el-dialog",{attrs:{title:"改价原因",visible:e.dialogReasonVisible,"append-to-body":!0,width:"35%"},on:{"update:visible":function(t){e.dialogReasonVisible=t}}},[o("div",{staticClass:"dialog_body_content"},[o("div",{staticClass:"dialog_changePrice_reason"},[e._v("\n\t\t\t\t\t改价原因：\n\t\t\t\t\t"),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.changeReason,expression:"changeReason"}],staticClass:"checkReason",attrs:{placeholder:"请填写改价原因",name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.changeReason},on:{input:function(t){t.target.composing||(e.changeReason=t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{directives:[{name:"show",rawName:"v-show",value:""==e.changeReason,expression:"changeReason==''"}],staticClass:"dialogDisaBtn",attrs:{type:"danger",disabled:""}},[e._v("确定")]),e._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:""!=e.changeReason,expression:"changeReason!=''"}],staticClass:"dialog-sure-btn dialoperateBtn",on:{click:function(t){e.submitChangePrice()}}},[e._v("确定")])],1)])],1)},staticRenderFns:[]};var d=o("C7Lr")(l,u,!1,function(e){o("HpAN")},"data-v-47294682",null);t.default=d.exports},HpAN:function(e,t){}});
//# sourceMappingURL=70.c35b1fb7ec28d359f4b8.js.map