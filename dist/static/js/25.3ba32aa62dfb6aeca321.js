webpackJsonp([25],{Y5GT:function(t,e){},jaK4:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("3cXf"),i=a.n(s),l=a("DMbw"),n={data:function(){return{goodsDetai:{},dialogRangeVisible:!1,radio:1,dialogTitle:"查看限购区域",checked1:null,checked2:null,checked3:null,province:[],cities:[],counties:[]}},mounted:function(){this.initData()},methods:{initData:function(){var t=this;Object(l.q)({id:this.$route.query.id,type:this.$route.query.type}).then(function(e){console.log(i()(e.data.data)),t.goodsDetai=e.data.data})},visualRange:function(){var t=this,e={depId:this.radio,goodsId:this.$route.query.id};this.dialogRangeVisible=!0,Object(l.z)(e).then(function(e){t.province=e.data.data.options,t.province.forEach(function(e,a,s){if(1==e.isCheck)return t.checked1=e.id,t.cities=e.children,!1})})},changeHandler:function(t){console.log(t)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"containInfo_wraper"},[t._m(1),t._v(" "),a("div",{staticClass:"detail_content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("物料名称")]),t._v("："+t._s(t.goodsDetai.goodsName))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("物料编码")]),t._v("："+t._s(t.goodsDetai.materialCode))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("生产企业")]),t._v("："+t._s(t.goodsDetai.manufacturer))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("剂型")]),t._v("："+t._s(t.goodsDetai.drugType))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("规格")]),t._v("："+t._s(t.goodsDetai.specsMax))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("包装规格")]),t._v("："+t._s(t.goodsDetai.specsMin))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("物料类别")]),t._v("："+t._s(t.goodsDetai.category))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("批准文号")]),t._v("："+t._s(t.goodsDetai.licenseNumber))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("单位")]),t._v("："+t._s(t.goodsDetai.unit))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("版本号")]),t._v("："+t._s(t.goodsDetai.version))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:2}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("商品图片")]),t._v("：")])]),t._v(" "),t._l(t.goodsDetai.imgList,function(t,e){return a("el-col",{key:e,attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{attrs:{width:"100%",src:t,alt:""}})])])})],2)],1)]),t._v(" "),a("div",{staticClass:"containInfo_wraper"},[t._m(2),t._v(" "),a("div",{staticClass:"detail_content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("可销售事业部："+t._s(t.goodsDetai.departmentIds))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("省区经理开票价："+t._s(t.goodsDetai.provincePrice))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("地区经理开票价："+t._s(t.goodsDetai.cityPrice))])]),t._v(" "),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("县区经理开票价："+t._s(t.goodsDetai.countyPrice))])])],1)],1)]),t._v(" "),a("div",{staticClass:"containInfo_wraper"},[t._m(3),t._v(" "),a("div",{staticClass:"detail_content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",[t._v("物料备注")]),t._v("："+t._s(t.goodsDetai.remark))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("可见范围：\n\t\t\t  \t\t"),a("font",{staticClass:"viewRemark",on:{click:t.visualRange}},[t._v("查看")])],1)])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogRangeVisible,"append-to-body":!0},on:{"update:visible":function(e){t.dialogRangeVisible=e}}},[a("div",[a("span",[t._v("销售组织：")]),t._v(" "),a("el-radio-group",{model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[a("el-radio",{attrs:{label:1}},[t._v("心脑事业部")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("风湿及骨科事业部")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("云事业部")]),t._v(" "),a("el-radio",{attrs:{label:4}},[t._v("消化事业部")])],1)],1),t._v(" "),a("div",{staticClass:"areaWraper"},[a("div",{staticClass:"title"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple-dark"},[t._v("省区")])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple-dark"},[t._v("地区")])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple-dark"},[t._v("县区")])])],1)],1),t._v(" "),a("div",{},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"el-col-group",attrs:{span:8}},[a("el-radio-group",{on:{change:t.changeHandler},model:{value:t.checked1,callback:function(e){t.checked1=e},expression:"checked1"}},t._l(t.province,function(e,s){return a("el-radio",{key:s,attrs:{label:e.id}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-radio-group",{model:{value:t.checked2,callback:function(e){t.checked2=e},expression:"checked2"}},t._l(t.cities,function(t,e){return a("el-radio",{key:e,attrs:{label:t.isCheck,disabled:""}})}))],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-checkbox-group",{attrs:{min:1},model:{value:t.checked3,callback:function(e){t.checked3=e},expression:"checked3"}},t._l(t.counties,function(t,e){return a("el-checkbox",{key:e,attrs:{label:t.isCheck,disabled:""}})}))],1)],1)],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"goBackWraper clear"},[e("span",[this._v("查看商品详情")]),this._v(" "),e("div",{staticClass:"backBtn"},[this._v("返回")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail_title"},[e("i",{staticClass:"line_Icon"}),this._v("基本信息：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail_title"},[e("i",{staticClass:"line_Icon"}),this._v("销售信息：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail_title"},[e("i",{staticClass:"line_Icon"}),this._v("其他信息：")])}]};var c=a("C7Lr")(n,r,!1,function(t){a("Y5GT"),a("wpKX")},"data-v-79a37e5e",null);e.default=c.exports},wpKX:function(t,e){}});
//# sourceMappingURL=25.3ba32aa62dfb6aeca321.js.map