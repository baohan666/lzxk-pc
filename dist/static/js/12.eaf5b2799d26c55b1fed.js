webpackJsonp([12],{"5srG":function(t,s){},gh5T:function(t,s,e){"use strict";e.d(s,"f",function(){return c}),e.d(s,"e",function(){return o}),e.d(s,"d",function(){return r}),e.d(s,"c",function(){return l}),e.d(s,"g",function(){return u}),e.d(s,"a",function(){return p}),e.d(s,"b",function(){return v}),e.d(s,"h",function(){return _});var a=e("lta2"),i=e("6iV/"),n=e.n(i),c=function(t){return a.a.post(a.a.baseURL+"provinceClinic/list",n.a.stringify(t))},o=function(t){return a.a.post(a.a.baseURL+"common/clinicType",n.a.stringify(t))},r=function(t){return a.a.post(a.a.baseURL+"provinceClinic/excel",n.a.stringify(t),{responseType:"blob"})},l=function(t){return a.a.post(a.a.baseURL+"userInfo/cityCountyName",n.a.stringify(t))},u=function(t){return a.a.post(a.a.baseURL+"userInfo/judge",n.a.stringify(t))},p=function(t){return a.a.post(a.a.baseURL+"provinceClinic/allot",n.a.stringify(t))},v=function(t){return a.a.post(a.a.baseURL+"provinceClinic/cancelAllot",n.a.stringify(t))},_=function(t){return a.a.post(a.a.baseURL+"provinceClinic/detail",n.a.stringify(t))}},k5J2:function(t,s){},o2UV:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Agyp"),i=e("gh5T"),n={data:function(){return{customDetai:{}}},mounted:function(){this.initData()},components:{goBack:a.a},methods:{initData:function(){var t=this;Object(i.h)({clinicId:this.$route.query.id}).then(function(s){console.log("调viewTerCustom接口res:",s),t.customDetai=s.data.data})}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("go-back",{attrs:{title:"客户详情"}}),t._v(" "),e("div",{staticClass:"containInfo_wraper"},[t._m(0),t._v(" "),e("div",{staticClass:"detail_content"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("客户名称")]),t._v("："+t._s(t.customDetai.clinicName))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("事业部")]),t._v("："+t._s(0==t.customDetai.departmentId?"顶级部门":1==t.customDetai.departmentId?"心脑事业部":2==t.customDetai.departmentId?"风湿及骨科事业部":3==t.customDetai.departmentId?"云事业部":4==t.customDetai.departmentId?"消化事业部":""))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("客户类型")]),t._v("："+t._s(1==t.customDetai.customType?"诊所":2==t.customDetai.customType?"乡镇卫生院":3==t.customDetai.customType?"村卫生室":4==t.customDetai.customType?"单体药房":5==t.customDetai.customType?"连锁药房":6==t.customDetai.customType?"民营医院":7==t.customDetai.customType?"专科医院":8==t.customDetai.customType?"综合医院":9==t.customDetai.customType?"军队医院":""))])])],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("等级")]),t._v("："+t._s(1==t.customDetai.level?"三级特等":2==t.customDetai.level?"三级甲等":3==t.customDetai.level?"三级乙等":4==t.customDetai.level?"三级丙等":5==t.customDetai.level?"二级甲等":6==t.customDetai.level?"二级乙等":7==t.customDetai.level?"二级丙等":8==t.customDetai.level?"一级甲等":9==t.customDetai.level?"一级乙等":10==t.customDetai.level?"一级丙等":""))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("所属区域")]),t._v("："+t._s(t.customDetai.belongsArea))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("详细地址")]),t._v("："+t._s(t.customDetai.detail))])])],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("法人")]),t._v("："+t._s(t.customDetai.legalPerson))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("法人手机号")]),t._v("："+t._s(t.customDetai.bossPhone))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("营业执照号")]),t._v("："+t._s(t.customDetai.businessLicense))])])],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("客户联系人")]),t._v("："+t._s(t.customDetai.username))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("联系人电话")]),t._v("："+t._s(t.customDetai.clinicPhone))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("门诊量")]),t._v("："+t._s(t.customDetai.outpatientNum))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("医生人数")]),t._v("："+t._s(t.customDetai.doctorNum))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("床位数")]),t._v("："+t._s(t.customDetai.bedNum))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("药店店员数")]),t._v("："+t._s(t.customDetai.clerkNum))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("药店日客流量")]),t._v("："+t._s(t.customDetai.patientNum))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("税务登记证号")]),t._v("："+t._s(t.customDetai.taxRegistration))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("备注")]),t._v("："+t._s(t.customDetai.remark))])]),t._v(" "),e("el-col",{attrs:{span:24}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("营业执照")]),t._v("：\n              "),e("viewer",[e("img",{key:t.customDetai.businessLicenseImgName,attrs:{src:t.customDetai.businessLicenseImgName,width:"200"}})])],1)]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("创建人")]),t._v("："+t._s(t.customDetai.createPerson))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[e("span",[t._v("创建时间")]),t._v("："+t._s(t.customDetai.createDate))])])],1)],1)]),t._v(" "),e("div",{staticClass:"containInfo_wraper"},[t._m(1),t._v(" "),e("div",{staticClass:"detail_content"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[t._v("负责人："+t._s(t.customDetai.name))])]),t._v(" "),e("el-col",{attrs:{span:7}},[e("div",{staticClass:"grid-content bg-purple"},[t._v("负责人手机号："+t._s(t.customDetai.mobile))])])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"detail_title"},[s("i",{staticClass:"line_Icon"}),this._v("基本信息：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"detail_title"},[s("i",{staticClass:"line_Icon"}),this._v("营销信息：")])}]};var o=e("C7Lr")(n,c,!1,function(t){e("5srG"),e("k5J2")},"data-v-2f297a77",null);s.default=o.exports}});
//# sourceMappingURL=12.eaf5b2799d26c55b1fed.js.map