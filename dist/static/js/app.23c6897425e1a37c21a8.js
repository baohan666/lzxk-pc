webpackJsonp([87],{"9aUF":function(e,n,t){"use strict";t.d(n,"b",function(){return i}),t.d(n,"a",function(){return l}),t.d(n,"c",function(){return u});var o=t("lta2"),a=t("6iV/"),r=t.n(a),i=function(e){return o.a.post(o.a.baseURL+"goods/getAliOssUrl",r.a.stringify(e))},l=function(e){return o.a.post(o.a.baseURL+"sysDictArea/getSysDictArea",r.a.stringify(e))},u=function(e){return o.a.post(o.a.baseURL+"role/dept",r.a.stringify(e))}},"F/KL":function(e,n){},IcnI:function(e,n,t){"use strict";var o=t("IvJb"),a=t("9rMa");o.default.use(a.a);n.a=new a.a.Store({state:{navbarList:""}})},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t("tqWA"),t("vGMN"),t("ksBL");var o=t("IvJb"),a=t("9ab0"),r=t.n(a),i=t("lta2"),l=t("IcnI"),u=t("YaEn"),c={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[this.isRouterAlive?n("router-view"):this._e()],1)},staticRenderFns:[]};var s=t("C7Lr")({provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},methods:{reload:function(){var e=this;this.isRouterAlive=!1,this.$nextTick(function(){e.isRouterAlive=!0})}}},c,!1,function(e){t("VSWF")},null,null).exports;t("UAgs");var m={bind:function(e,n){e.onkeypress=function(e){return function(e){var n=e||event;return/[\d]/.test(String.fromCharCode(n.keyCode||n.which))||8===n.which}(e)}}},p=function(e){e.directive("VueOnkeypress",m)};window.Vue&&(window.VueOnkeypress=m,Vue.use(p)),m.install=p;var d=m,h=t("ZuOF"),f=t.n(h);t("F/KL");o.default.directive("VueOnkeypress",d),o.default.config.productionTip=!1,o.default.use(r.a),o.default.use(f.a),f.a.setDefaults({Options:{inline:!0,button:!0,navbar:!0,title:!1,toolbar:!0,tooltip:!0,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}),new o.default({el:"#app",instance:i.a,router:u.a,store:l.a,components:{App:s},template:"<App/>"})},ROW2:function(e,n,t){"use strict";t.d(n,"d",function(){return i}),t.d(n,"b",function(){return l}),t.d(n,"c",function(){return u}),t.d(n,"a",function(){return c});var o=t("3cXf"),a=t.n(o),r=t("9aUF"),i=function(e,n){e&&("string"!=typeof n&&(n=a()(n)),window.localStorage.setItem(e,n))},l=function(e){if(e)return window.localStorage.getItem(e)},u=function(){Object(r.c)({roleId:1}).then(function(e){return i("departmentMenu",e.data.data),e.data.data})},c=function(){return Object(r.b)("").then(function(e){i("AliOssUrlist",e.data.data)}),[]}},UAgs:function(e,n){var t,o,a,r,i;t=document,o=window,a=t.documentElement,r="orientationchange"in window?"orientationchange":"resize",i=function(){var e=a.clientWidth;console.log(e),e&&(a.style.fontSize=e/1920*100+"px")},t.addEventListener&&(o.addEventListener(r,i,!1),t.addEventListener("DOMContentLoaded",i,!1))},VSWF:function(e,n){},YaEn:function(e,n,t){"use strict";var o=t("IvJb"),a=t("zO6J");o.default.use(a.a);var r=new a.a({routes:[{path:"/login",name:"login",component:function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,"K31e"))}},{path:"/",name:"home",component:function(){return Promise.all([t.e(0),t.e(18)]).then(t.bind(null,"vkyI"))},redirect:"/onsaleGoodsZB",children:[{path:"/onsaleGoodsZB",name:"onsaleGoodsZB",components:{default:function(){return Promise.all([t.e(0),t.e(65)]).then(t.bind(null,"0q8w"))}}},{path:"/uploadGoodsZB",name:"uploadGoodsZB",components:{default:function(){return Promise.all([t.e(0),t.e(21)]).then(t.bind(null,"WsRF"))}}},{path:"/researchGoodsZB",name:"researchGoodsZB",components:{default:function(){return Promise.all([t.e(0),t.e(57)]).then(t.bind(null,"Cq0O"))}}},{path:"/removeGoodsZB",name:"removeGoodsZB",components:{default:function(){return Promise.all([t.e(0),t.e(69)]).then(t.bind(null,"r4Mh"))}}},{path:"/priceManageZB",name:"priceManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"zJkI"))}}},{path:"/applicationFormZB",name:"applicationFormZB",components:{default:function(){return Promise.all([t.e(0),t.e(71)]).then(t.bind(null,"EC7X"))}}},{path:"/businessCompanyManageZB",name:"businessCompanyManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(28)]).then(t.bind(null,"6GfT"))}}},{path:"/terminalCustomerManageZB",name:"terminalCustomerManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(37)]).then(t.bind(null,"cqvK"))}}},{path:"/provinceOrderZB",name:"provinceOrderZB",components:{default:function(){return Promise.all([t.e(0),t.e(79)]).then(t.bind(null,"D/hl"))}}},{path:"/countyOrderZB",name:"countyOrderZB",components:{default:function(){return Promise.all([t.e(0),t.e(75)]).then(t.bind(null,"EQcx"))}}},{path:"/policyReplenishmentZB",name:"policyReplenishmentZB",components:{default:function(){return Promise.all([t.e(0),t.e(54)]).then(t.bind(null,"H/P5"))}}},{path:"/zhiyiPurchaseOrderZB",name:"zhiyiPurchaseOrderZB",components:{default:function(){return t.e(19).then(t.bind(null,"8Q2p"))}}},{path:"/provinceOwngoodsManageZB",name:"provinceOwngoodsManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(51)]).then(t.bind(null,"8DAe"))}}},{path:"/promotionPolicyZB",name:"promotionPolicyZB",components:{default:function(){return Promise.all([t.e(0),t.e(77)]).then(t.bind(null,"/d+P"))}}},{path:"/meetingManageZB",name:"meetingManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(47)]).then(t.bind(null,"0RD0"))}}},{path:"/addressListZB",name:"addressListZB",components:{default:function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,"vEKu"))}}},{path:"/areaManageZB",name:"areaManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(17)]).then(t.bind(null,"WVhH"))}}},{path:"/feedBackZB",name:"feedBackZB",components:{default:function(){return Promise.all([t.e(0),t.e(62)]).then(t.bind(null,"89TL"))}}},{path:"/PersonnelApplicationZB",name:"PersonnelApplicationZB",components:{default:function(){return Promise.all([t.e(0),t.e(56)]).then(t.bind(null,"gROn"))}}},{path:"/salesScopeZB",name:"salesScopeZB",components:{default:function(){return Promise.all([t.e(0),t.e(36)]).then(t.bind(null,"FWO6"))}}},{path:"/salesStaffZB",name:"salesStaffZB",components:{default:function(){return Promise.all([t.e(0),t.e(22)]).then(t.bind(null,"qswi"))}}},{path:"/provinceStockZB",name:"provinceStockZB",components:{default:function(){return Promise.all([t.e(0),t.e(14)]).then(t.bind(null,"/VRo"))}}},{path:"/provinceRetuenMoneyZB",name:"provinceRetuenMoneyZB",components:{default:function(){return Promise.all([t.e(0),t.e(15)]).then(t.bind(null,"Ykj5"))}}},{path:"/roleManageZB",name:"roleManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(50)]).then(t.bind(null,"q8Zt"))}}},{path:"/accountManageZB",name:"accountManageZB",components:{default:function(){return Promise.all([t.e(0),t.e(49)]).then(t.bind(null,"QHRR"))}}},{path:"/onsaleGoodsSQ",name:"onsaleGoodsSQ",components:{default:function(){return Promise.all([t.e(0),t.e(74)]).then(t.bind(null,"2oIy"))}}},{path:"/researchGoodsSQ",name:"researchGoodsSQ",components:{default:function(){return Promise.all([t.e(0),t.e(34)]).then(t.bind(null,"SyJD"))}}},{path:"/priceManageSQ",name:"priceManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"g4M9"))}}},{path:"/applicationFormSQ",name:"applicationFormSQ",components:{default:function(){return Promise.all([t.e(0),t.e(52)]).then(t.bind(null,"fIu2"))}}},{path:"/promotionPolicySQ",name:"promotionPolicySQ",components:{default:function(){return Promise.all([t.e(0),t.e(63)]).then(t.bind(null,"VN8f"))}}},{path:"/policyReplenishmentSQ",name:"policyReplenishmentSQ",components:{default:function(){return Promise.all([t.e(0),t.e(64)]).then(t.bind(null,"iDHZ"))}}},{path:"/OwngoodsManageSQ",name:"OwngoodsManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(60)]).then(t.bind(null,"A7Ul"))}}},{path:"/saleOrderSQ",name:"saleOrderSQ",components:{default:function(){return Promise.all([t.e(0),t.e(67)]).then(t.bind(null,"sD1+"))}}},{path:"/setReturnMoneySQ",name:"setReturnMoneySQ",components:{default:function(){return Promise.all([t.e(0),t.e(80)]).then(t.bind(null,"EG70"))}}},{path:"/terminalCustomerManageSQ",name:"terminalCustomerManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,"GxFc"))}}},{path:"/meetingManageSQ",name:"meetingManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(40)]).then(t.bind(null,"iNgz"))}}},{path:"/provinceStockSQ",name:"provinceStockSQ",components:{default:function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,"6D/D"))}}},{path:"/addressListSQ",name:"addressListSQ",components:{default:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"nj97"))}}},{path:"/areaManageSQ",name:"areaManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(16)]).then(t.bind(null,"4Gyg"))}}},{path:"/PersonnelApplicationSQ",name:"PersonnelApplicationSQ",components:{default:function(){return Promise.all([t.e(0),t.e(10)]).then(t.bind(null,"eqmQ"))}}},{path:"/provinceRetuenMoneySQ",name:"provinceRetuenMoneySQ",components:{default:function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,"06cp"))}}},{path:"/roleManageSQ",name:"roleManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(44)]).then(t.bind(null,"wkv2"))}}},{path:"/accountManageSQ",name:"accountManageSQ",components:{default:function(){return Promise.all([t.e(0),t.e(43)]).then(t.bind(null,"q37P"))}}}]},{path:"/detailFeedbackZB",name:"detailFeedbackZB",component:function(){return Promise.all([t.e(0),t.e(58)]).then(t.bind(null,"rt0i"))}},{path:"/view_onsaleGoodsZB",name:"view_onsaleGoodsZB",component:function(){return Promise.all([t.e(0),t.e(66)]).then(t.bind(null,"JZgE"))}},{path:"/viewDetail_GoodsZB",name:"viewDetail_GoodsZB",component:function(){return Promise.all([t.e(0),t.e(25)]).then(t.bind(null,"jaK4"))}},{path:"/edit_removeGoodsZB",name:"edit_removeGoodsZB",component:function(){return Promise.all([t.e(0),t.e(55)]).then(t.bind(null,"T/J/"))}},{path:"/view_researGoodsZB",name:"view_researGoodsZB",component:function(){return Promise.all([t.e(0),t.e(61)]).then(t.bind(null,"AznP"))}},{path:"/meetingManageDetailZB",name:"meetingManageDetailZB",component:function(){return Promise.all([t.e(0),t.e(46)]).then(t.bind(null,"hOrv"))}},{path:"/changePriceZB",name:"changePriceZB",component:function(){return Promise.all([t.e(0),t.e(70)]).then(t.bind(null,"G35d"))}},{path:"/changePartPriceZB",name:"changePartPriceZB",component:function(){return Promise.all([t.e(0),t.e(81)]).then(t.bind(null,"JUhs"))}},{path:"/applyFormDeataiZB",name:"applyFormDeataiZB",component:function(){return Promise.all([t.e(0),t.e(73)]).then(t.bind(null,"fgcX"))}},{path:"/batChangePriceZB",name:"batChangePriceZB",component:function(){return Promise.all([t.e(0),t.e(83)]).then(t.bind(null,"onKu"))}},{path:"/creatBusiCompanyZB",name:"creatBusiCompanyZB",component:function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,"GuFI"))}},{path:"/viewBusiCompanyZB",name:"viewBusiCompanyZB",component:function(){return Promise.all([t.e(0),t.e(23)]).then(t.bind(null,"DEfm"))}},{path:"/viewterminCustomerZB",name:"viewterminCustomerZB",component:function(){return Promise.all([t.e(0),t.e(35)]).then(t.bind(null,"xU3D"))}},{path:"/editBusCompanyZB",name:"editBusCompanyZB",component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"OLL+"))}},{path:"/provinStockLogZB",name:"provinStockLogZB",component:function(){return Promise.all([t.e(0),t.e(45)]).then(t.bind(null,"QFoA"))}},{path:"/view_promoPolicyZB",name:"view_promoPolicyZB",component:function(){return Promise.all([t.e(0),t.e(82)]).then(t.bind(null,"2m96"))}},{path:"/add_promoPolicyZB",name:"add_promoPolicyZB",component:function(){return Promise.all([t.e(0),t.e(32)]).then(t.bind(null,"MDgU"))}},{path:"/edit_promoPolicyZB",name:"edit_promoPolicyZB",component:function(){return Promise.all([t.e(0),t.e(78)]).then(t.bind(null,"ATt+"))}},{path:"/countyOrderDetailZB",name:"countyOrderDetailZB",component:function(){return Promise.all([t.e(0),t.e(33)]).then(t.bind(null,"XnAn"))}},{path:"/provinceOrderDetailZB",name:"provinceOrderDetailZB",component:function(){return Promise.all([t.e(0),t.e(31)]).then(t.bind(null,"8vfa"))}},{path:"/proOrderBillZB",name:"proOrderBillZB",component:function(){return Promise.all([t.e(0),t.e(27)]).then(t.bind(null,"+I5Q"))}},{path:"/proOrderSendGoodsZB",name:"proOrderSendGoodsZB",component:function(){return Promise.all([t.e(0),t.e(26)]).then(t.bind(null,"EO3N"))}},{path:"/policyOweDetailZB",name:"policyOweDetailZB",component:function(){return Promise.all([t.e(0),t.e(24)]).then(t.bind(null,"P+RY"))}},{path:"/provinceRetuenMoneyDetailZB",name:"provinceRetuenMoneyDetailZB",component:function(){return Promise.all([t.e(0),t.e(48)]).then(t.bind(null,"4SfG"))}},{path:"/viewDetailPAZB",name:"viewDetailPAZB",component:function(){return Promise.all([t.e(0),t.e(53)]).then(t.bind(null,"GNHA"))}},{path:"/viewDetailPAeditZB",name:"viewDetailPAeditZB",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"FV3D"))}},{path:"/viewDetail_GoodsSQ",name:"viewDetail_GoodsSQ",component:function(){return Promise.all([t.e(0),t.e(30)]).then(t.bind(null,"VKAx"))}},{path:"/view_researGoodsSQ",name:"view_researGoodsSQ",component:function(){return Promise.all([t.e(0),t.e(68)]).then(t.bind(null,"ngj6"))}},{path:"/PersonnelApplicationDatailSQ",name:"PersonnelApplicationDatailSQ",component:function(){return Promise.all([t.e(0),t.e(39)]).then(t.bind(null,"KzXa"))}},{path:"/changePriceSQ",name:"changePriceSQ",component:function(){return Promise.all([t.e(0),t.e(76)]).then(t.bind(null,"+wqK"))}},{path:"/batChangeSQ",name:"batChangeSQ",component:function(){return Promise.all([t.e(0),t.e(84)]).then(t.bind(null,"Tc5c"))}},{path:"/applyFormDeataiSQ",name:"applyFormDeataiSQ",component:function(){return Promise.all([t.e(0),t.e(85)]).then(t.bind(null,"wKvG"))}},{path:"/provinStockLogSQ",name:"provinStockLogSQ",component:function(){return Promise.all([t.e(0),t.e(38)]).then(t.bind(null,"+8EW"))}},{path:"/saleOrderDetailSQ",name:"saleOrderDetailSQ",component:function(){return Promise.all([t.e(0),t.e(20)]).then(t.bind(null,"sJOY"))}},{path:"/viewterminCustomerSQ",name:"viewterminCustomerSQ",component:function(){return Promise.all([t.e(0),t.e(12)]).then(t.bind(null,"o2UV"))}},{path:"/meetingManageDetailSQ",name:"meetingManageDetailSQ",component:function(){return Promise.all([t.e(0),t.e(41)]).then(t.bind(null,"MQaB"))}},{path:"/add_promoPolicySQ",name:"add_promoPolicySQ",component:function(){return Promise.all([t.e(0),t.e(29)]).then(t.bind(null,"nD4z"))}},{path:"/view_promoPolicySQ",name:"view_promoPolicySQ",component:function(){return Promise.all([t.e(0),t.e(59)]).then(t.bind(null,"CL/Q"))}},{path:"/edit_promoPolicySQ",name:"edit_promoPolicySQ",component:function(){return Promise.all([t.e(0),t.e(72)]).then(t.bind(null,"ezCK"))}},{path:"/provinceRetuenMoneyDetailSQ",name:"provinceRetuenMoneyDetailSQ",component:function(){return Promise.all([t.e(0),t.e(42)]).then(t.bind(null,"/7eF"))}}]});r.beforeEach(function(e,n,t){if(e.path.startsWith("/login"))window.sessionStorage.removeItem("access-user"),t();else if(e.path.startsWith("/register"))window.sessionStorage.removeItem("access-user"),t();else{JSON.parse(window.sessionStorage.getItem("access-user"))?t():t({path:"/login"})}}),n.a=r},ksBL:function(e,n){},lta2:function(e,n,t){"use strict";var o=t("rVsN"),a=t.n(o),r=t("4YfN"),i=t.n(r),l=t("aozt"),u=t.n(l),c=t("6iV/"),s=t.n(c),m=t("IcnI"),p=t("YaEn"),d=t("ROW2"),h=u.a.create();h.defaults.timeout=15e3,console.log("production"),h.baseURL="http://192.168.14.32:8082/lzxk/",u.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8",u.a.interceptors.request.use=h.interceptors.request.use,h.interceptors.request.use(function(e){var n="";Object(d.b)("accountNum")&&(n=Object(d.b)("accountNum"));var t="";if(Object(d.b)("accountName")&&(t=Object(d.b)("accountName")),"post"===e.method){var o=s.a.parse(e.data);e.data=s.a.stringify(i()({accountNum:n,accountName:t},o))}else"get"===e.method&&(e.params=i()({accountNum:n},e.params));return e},function(e){return a.a.reject(e)}),h.interceptors.response.use(function(e){return e.data.code&&1!=e.data.code?(alert(e.data.msg),a.a.reject(e.data)):e},function(e){if(console.log(e),e.response)switch(e.response.status){case 401:m.a.commit(types.LOGOUT),"login"!==p.a.currentRoute.path&&p.a.replace({path:"login",query:{redirect:p.a.currentRoute.path}})}return a.a.reject(e)}),n.a=h},tqWA:function(e,n){},vGMN:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.23c6897425e1a37c21a8.js.map