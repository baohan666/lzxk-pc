webpackJsonp([41],{Hz4w:function(t,e){},MQaB:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Agyp"),n=s("R7dn"),i={data:function(){return{goodsDetai:{},ordersCollectionId:this.$route.query.id}},created:function(){this.initData()},components:{goBack:a.a},mounted:function(){},methods:{initData:function(){var t=this;console.log({conferenceId:this.ordersCollectionId}),Object(n.b)({conferenceId:this.ordersCollectionId}).then(function(e){t.goodsDetai=e.data.data.detailConference,console.log(t.goodsDetai)})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("go-back",{attrs:{title:"会议详情"}}),t._v(" "),s("div",{staticClass:"infoDetail"},[s("el-row",{attrs:{gutter:24}},[s("span",[t._v("会议编号： "+t._s(t.goodsDetai.meetingNum))]),t._v(" "),s("span",[t._v("提交人： "+t._s(t.goodsDetai.createName))]),t._v(" "),s("span",[t._v("职位： "+t._s(t.goodsDetai.position))]),t._v(" "),s("span",[t._v("提交时间： "+t._s(t.goodsDetai.createDate))])])],1),t._v(" "),s("div",{staticClass:"containInfo_wraper"},[t._m(0),t._v(" "),s("div",{staticClass:"detail_content"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议名称")]),t._v("："+t._s(t.goodsDetai.title))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议类型")]),t._v("："+t._s(t.goodsDetai.typeStr))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议时间")]),t._v("："+t._s(t.goodsDetai.meetingDate))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议活动省份")]),t._v("："+t._s(t.goodsDetai.meetingProvince))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议活动地点")]),t._v("："+t._s(t.goodsDetai.meetingPlace))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("主讲人")]),t._v("："+t._s(t.goodsDetai.mainSpeaker))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("参会人数")]),t._v("："+t._s(t.goodsDetai.meetingPersonNum))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议内容")]),t._v("："+t._s(t.goodsDetai.meetingContent))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("推广产品名称")]),t._v("："+t._s(t.goodsDetai.goodsNames))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议申请理由")]),t._v("："+t._s(t.goodsDetai.applicationReason))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("span",[t._v("会议总结概述")]),t._v("："+t._s(t.goodsDetai.meetingSumup))])]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple imgWrap"},[s("span",[t._v("签到表")]),t._v("：\n            "),s("viewer",{attrs:{images:t.goodsDetai.signImgsList}},[s("div"),t._v(" "),t._l(t.goodsDetai.signImgsList,function(t){return s("img",{key:t,attrs:{src:t,width:"200"}})})],2)],1)]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple imgWrap"},[s("span",[t._v("会场照片")]),t._v("：\n            "),s("viewer",{attrs:{images:t.goodsDetai.meetingImgsList}},t._l(t.goodsDetai.meetingImgsList,function(t){return s("img",{key:t,attrs:{src:t,width:"200"}})}))],1)]),t._v(" "),s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple imgWrap",attrs:{id:"galley"}},[s("span",[t._v("完整总结报告")]),t._v("：\n            "),s("viewer",{attrs:{images:t.goodsDetai.sumupImgsList}},t._l(t.goodsDetai.sumupImgsList,function(t){return s("img",{key:t,attrs:{src:t,width:"200"}})}))],1)])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail_title"},[e("i",{staticClass:"line_Icon"}),this._v("基本信息：")])}]};var r=s("C7Lr")(i,o,!1,function(t){s("Hz4w")},"data-v-208e893b",null);e.default=r.exports},R7dn:function(t,e,s){"use strict";s.d(e,"a",function(){return o}),s.d(e,"c",function(){return r}),s.d(e,"b",function(){return c});var a=s("lta2"),n=s("6iV/"),i=s.n(n);console.log(a.a.baseURL);var o=function(t){return a.a.post(a.a.baseURL+"conference/getConferenceList",i.a.stringify(t))},r=function(t){return a.a.post(a.a.baseURL+"conference/outputConference",i.a.stringify(t),{responseType:"blob"})},c=function(t){return a.a.post(a.a.baseURL+"conference/getDetailConference",i.a.stringify(t))}}});
//# sourceMappingURL=41.f8595036a7685249bf5c.js.map