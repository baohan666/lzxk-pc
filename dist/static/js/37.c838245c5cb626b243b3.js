webpackJsonp([37],{"5BS1":function(e,t){},"HH/p":function(e,t){},cqvK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("ROW2"),l=a("gFbb"),s=a("a9+l"),o=a("xQKn"),i={data:function(){return{clinicName:"",customType:"",username:"",name:"",departmentId:"",createUser:"",provinceCode:"",cityCode:"",countyCode:"",legalPerson:"",businessLicense:"",customerList:[],departmentMenu:[],totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0,tableData:[]}},mounted:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(e)},components:{elPagination:s.a,addressPlugin:l.a},methods:{initData:function(e){var t=this;Object(o.m)(e).then(function(e){var a=e.data.data;1==e.data.code?a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1):t.pagin_show=!1}),Object(n.b)("departmentMenu")?this.departmentMenu=JSON.parse(Object(n.b)("departmentMenu")):this.departmentMenu=Object(n.c)(),console.log(this.departmentMenu)},getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,clinicName:this.clinicName,customType:this.customType,username:this.username,name:this.name,departmentId:this.departmentId,createUser:this.createUser,provinceCode:this.provinceCode,cityCode:this.cityCode,countyCode:this.countyCode,legalPerson:this.legalPerson,businessLicense:this.businessLicense}},getCusType:function(){var e=this;Object(o.k)("").then(function(t){e.customerList=t.data.data,console.log(e.customerList)})},toInquire:function(){var e=this.getsearchInfo(1,this.pageSize);this.initData(e)},exportData:function(){var e={clinicName:this.clinicName,customType:this.customType,username:this.username,name:this.name,departmentId:this.departmentId,createUser:this.createUser,provinceCode:this.provinceCode,cityCode:this.cityCode,countyCode:this.countyCode,legalPerson:this.legalPerson,businessLicense:this.businessLicense};Object(o.g)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),n=document.createElement("a");n.download=t,n.style.display="none",n.href=URL.createObjectURL(a),console.log(n.href),document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)})},view:function(e){this.$router.push({path:"/viewterminCustomerZB",query:{id:e}})},seleSuccess:function(e){this.provinceCode=e.provinceCode,this.cityCode=e.cityCode,this.countyCode=e.countyCode},spreadCon:function(){var e=document.querySelector(".slideDown");if(e.classList.contains("spreadSlowlly"))return e.classList.remove("spreadSlowlly"),!1;e.classList.add("spreadSlowlly")},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},number:function(){this.phone=this.phone.replace(/[^\.\d]/g,""),this.phone=this.phone.replace(".","")}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"客户名称："}},[a("el-input",{attrs:{placeholder:"请输入客户名称"},model:{value:e.clinicName,callback:function(t){e.clinicName=t},expression:"clinicName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户类型："}},[a("el-select",{attrs:{placeholder:"请选择客户类型"},on:{focus:function(t){e.getCusType()}},model:{value:e.customType,callback:function(t){e.customType=t},expression:"customType"}},[a("el-option",{attrs:{label:"请选择客户类型",value:"0"}}),e._v(" "),e._l(e.customerList,function(e,t,n){return a("el-option",{key:n,attrs:{label:e,value:t}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"客户联系人："}},[a("el-input",{attrs:{placeholder:"请输入客户联系人"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"负责人："}},[a("el-input",{attrs:{placeholder:"请输入负责人"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"事业部："}},[a("el-select",{attrs:{placeholder:"请选择事业部"},model:{value:e.departmentId,callback:function(t){e.departmentId=t},expression:"departmentId"}},e._l(e.departmentMenu,function(e,t,n){return a("el-option",{key:n,attrs:{label:e,value:t}})}))],1),e._v(" "),a("div",{staticClass:"div-inline select-more",on:{click:function(t){e.spreadCon()}}},[e._v("\n\t\t  \t更多筛选 "),a("i",{staticClass:"el-icon-arrow-down"})]),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toInquire()}}},[e._v("查询")]),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.exportData()}}},[e._v("导出")])],1),e._v(" "),a("el-form",{ref:"form",staticClass:"demo-form-inline slideDown",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"创建人："}},[a("el-input",{attrs:{placeholder:"请输入创建人"},model:{value:e.createUser,callback:function(t){e.createUser=t},expression:"createUser"}})],1),e._v(" "),a("div",{staticClass:"province_city_county"},[a("el-form-item",{attrs:{label:"所在地区："}},[a("address-plugin",{attrs:{required:"false"},on:{seleSuccess:e.seleSuccess}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"法人："}},[a("el-input",{attrs:{placeholder:"请输入法人"},model:{value:e.legalPerson,callback:function(t){e.legalPerson=t},expression:"legalPerson"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营业执照号："}},[a("el-input",{attrs:{placeholder:"请输入营业执照号"},model:{value:e.businessLicense,callback:function(t){e.businessLicense=t},expression:"businessLicense"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{ref:"multipleTable",attrs:{data:e.tableData,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"clinicName",label:"客户名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"departmentId",label:"事业部",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t        "+e._s(0==t.row.departmentId?"顶级部门":1==t.row.departmentId?"心脑事业部":2==t.row.departmentId?"风湿及骨科事业部":3==t.row.departmentId?"云事业部":4==t.row.departmentId?"消化事业部":"")+"\n\t\t    ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"customTypeStr",label:"客户类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"belongsArea",label:"所属区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"legalPerson",label:"法人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bossPhone",label:"法人手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"businessLicense",label:"营业执照号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"客户联系人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"clinicPhone",label:"联系人电话"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"负责人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"负责人手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createPerson",label:"创建人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.view(t.row.id)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1)])},staticRenderFns:[]};var c=a("C7Lr")(i,r,!1,function(e){a("HH/p"),a("5BS1")},"data-v-0026965e",null);t.default=c.exports}});
//# sourceMappingURL=37.c838245c5cb626b243b3.js.map