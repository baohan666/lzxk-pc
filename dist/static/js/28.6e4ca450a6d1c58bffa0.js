webpackJsonp([28],{"6GfT":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("gFbb"),s=a("a9+l"),i=a("xQKn"),n={data:function(){var e=this;return{startDate:"",endDate:"",company:"",customerCode:"",taxpayerCode:"",bossName:"",username:"",phone:"",companyAddress:"",provinceCode:"",cityCode:"",countyCode:"",addressProvinceCode:"",addressCityCode:"",addressCountyCode:"",addressProvinceName:"",addressCityName:"",addressCountyName:"",customerType:"",customerList:"",totalRecords:0,totalPageCnt:0,pageIndex:1,pageSize:10,pagin_show:!0,tableData:[],pickerOptionStar:{disabledDate:function(t){var a=e.endDate;if(a)return t.getTime()>a}},pickerOptionEnd:{disabledDate:function(t){var a=e.startDate;if(a)return t.getTime()<a}},dialogAllotVisible:!1,loading:!1,allotList:{showlist:"",userId:"",billId:""},provinNamList:[],dialogCancelAllotVisible:!1,dialog_provincList:[],cancelAllot_ids:"",dialogAddBookVisible:!1,dialog_addBooklist:[],dialogAwardSignlist:{1:"模板1",2:"模板4",3:"模板9+模板12",4:"模板13"},stockOutSign:["",""],addrBookStatus:[]}},mounted:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(e)},components:{elPagination:s.a,addressPlugin:o.a},methods:{initData:function(e){var t=this;Object(i.i)(e).then(function(e){var a=e.data.data;1==e.data.code?a.dataList.length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1):t.pagin_show=!1})},getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,startDate:this.startDate,endDate:this.endDate,company:this.company,customerCode:this.customerCode,taxpayerCode:this.taxpayerCode,bossName:this.bossName,username:this.username,phone:this.phone,customerType:this.customerType,companyAddress:this.companyAddress,provinceCode:this.provinceCode,cityCode:this.cityCode,countyCode:this.countyCode}},seleSuccess:function(e){console.log("企业地址$val:",e),this.addressProvinceCode=e.provinceCode,this.addressCityCode=e.cityCode,this.addressCountyCode=e.countyCode,this.addressProvinceName=e.provinceName,this.addressCityName=e.cityName,this.addressCountyName=e.countyName},spreadCon:function(){var e=document.querySelector(".slideDown");if(e.classList.contains("spreadSlowlly"))return e.classList.remove("spreadSlowlly"),!1;e.classList.add("spreadSlowlly")},toInquire:function(){var e=this.getsearchInfo(1,this.pageSize);this.initData(e)},exportBaseInfoData:function(){var e={startDate:this.startDate,endDate:this.endDate,company:this.company,customerCode:this.customerCode,customerType:this.customerType,taxpayerCode:this.taxpayerCode,bossName:this.bossName,username:this.username,phone:this.phone,companyAddress:this.companyAddress,provinceCode:this.provinceCode,cityCode:this.cityCode,countyCode:this.countyCode};Object(i.f)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),o=document.createElement("a");o.download=t,o.style.display="none",o.href=URL.createObjectURL(a),console.log(o.href),document.body.appendChild(o),o.click(),URL.revokeObjectURL(o.href),document.body.removeChild(o)})},exportAptitudeData:function(){var e={startDate:this.startDate,endDate:this.endDate,company:this.company,customerCode:this.customerCode,customerType:this.customerType,taxpayerCode:this.taxpayerCode,bossName:this.bossName,username:this.username,phone:this.phone,companyAddress:this.companyAddress,provinceCode:this.provinceCode,cityCode:this.cityCode,countyCode:this.countyCode};Object(i.e)(e).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),o=document.createElement("a");o.download=t,o.style.display="none",o.href=URL.createObjectURL(a),console.log(o.href),document.body.appendChild(o),o.click(),URL.revokeObjectURL(o.href),document.body.removeChild(o)})},toCreatBusiCpy:function(){this.$router.push({path:"/creatBusiCompanyZB"})},view:function(e){this.$router.push({path:"/viewBusiCompanyZB",query:{id:e}})},moreOperate:function(){},edit:function(e){this.$router.push({path:"/editBusCompanyZB",query:{id:e}})},allot:function(e){console.log(e),this.allotList.showlist="",this.billId=e,this.dialogAllotVisible=!0,this.provinNamList=[]},remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,Object(i.l)({provinceManager:e}).then(function(e){t.loading=!1,e.data.data.length>0?(console.log("实时获取省区经理列表res.data.data:",e.data.data),t.provinNamList=e.data.data):t.provinNamList=[]})):this.provinNamList=[]},currentSel:function(e){console.log("选择省区"),this.allotList.showlist=e.name+"    "+e.deptName+"    "+e.provinceName,this.userId=e.userId},allot_sure:function(){var e=this;Object(i.r)({userId:this.userId,billId:this.billId}).then(function(t){e.$message.success(t.data.msg),e.dialogAllotVisible=!1})},cancelAllot:function(e){var t=this;this.dialog_provincList=[],this.cancelAllot_ids="",this.dialogCancelAllotVisible=!0,Object(i.j)({billId:e}).then(function(a){t.billId=e,t.dialog_provincList=a.data.data})},cancelAllot_sure:function(){var e=this;if(""!=this.dialog_provincList||0!=this.dialog_provincList.length){if(""==this.cancelAllot_ids)return this.$message.error("请点击勾选需要取消分配的人员"),!1;Object(i.a)({userIds:this.cancelAllot_ids,billId:this.billId}).then(function(t){e.$message.success(t.data.msg),e.dialogCancelAllotVisible=!1,e.cancelAllot_ids=""})}else this.dialogCancelAllotVisible=!1,this.cancelAllot_ids=""},handleSelectionChange:function(e){var t=[];e.forEach(function(e,a){t.push(e.userId)}),this.cancelAllot_ids=t.join(",")},addressBook:function(e){var t=this;this.dialogAddBookVisible=!0,this.billId=e,Object(i.h)({billId:e}).then(function(e){var a=e.data.data;t.addrBookStatus=[],a.forEach(function(e,o,s){switch(e.stockOutSign){case 1:a[o].stockOutSign="模板1";break;case 2:a[o].stockOutSign="模板4";break;case 3:a[o].stockOutSign="模板9+模板12";break;case 4:a[o].stockOutSign="模板13"}t.addrBookStatus.push("edit")}),t.dialog_addBooklist=e.data.data})},addrBookEdit:function(e,t){console.log("地址簿编辑row：",t),this.addressProvinceCode=t.provinceCode,this.addressCityCode=t.cityCode,this.addressCountyCode=t.countyCode,this.addressProvinceName=t.provinceName,this.addressCityName=t.cityName,this.addressCountyName=t.countyName,this.$set(this.addrBookStatus,e,"sace")},addrBookSave:function(e,t){var a=this;if(console.log("校验row.stockOutSign：",t.stockOutSign),console.log("校验row.stockOutSign：","模板1"==t.stockOutSign),""==this.addressProvinceCode||""==this.addressCityCode||""==this.addressCountyCode||null==this.addressProvinceCode||null==this.addressCityCode||null==this.addressCountyCode)return this.$message.success("请输入所属区域"),!1;if(""==t.addressData||null==t.addressData)return this.$message.success("请输入出库单地址"),!1;if(""==t.name)return this.$message.success("请输入收货人"),!1;if(""==t.phone)return this.$message.success("请输入收货电话"),!1;if(""==t.stockOutSign||null==t.stockOutSign)return this.$message.success("请选择赠品打印标识"),!1;console.log("地址簿保存按钮row:",t),this.$set(this.addrBookStatus,e,"edit");var o={addressData:t.addressData,name:t.name,phone:t.phone,stockOutSign:"模板1"==t.stockOutSign?1:"模板4"==t.stockOutSign?2:"模板9+模板12"==t.stockOutSign?3:"模板13"==t.stockOutSign?4:"",billId:t.billId,userId:t.userId,provinceCode:this.addressProvinceCode,cityCode:this.addressCityCode,countyCode:this.addressCountyCode,provinceName:this.addressProvinceName,cityName:this.addressCityName,countyName:this.addressCountyName};Object(i.o)(o).then(function(e){t.provinceCode=a.addressProvinceCode,t.cityCode=a.addressCityCode,t.countyCode=a.addressCountyCode,t.provinceName=a.addressProvinceName,t.cityName=a.addressCityName,t.countyName=a.addressCountyName,a.$message.success("保存成功")})},addrBookDel:function(e,t){var a=this,o={billId:t.billId,userId:t.userId};Object(i.d)(o).then(function(t){a.dialog_addBooklist.splice(e,1),a.$message.success(t.data.msg)})},addrBookCancel:function(e,t){this.$set(this.addrBookStatus,e,"edit")},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.initData(t)},number:function(e){e=(e=e.replace(/[^\.\d]/g,"")).replace(".","")}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"businessCompanyManage"},[a("div",{staticClass:"search_wrap"},[a("div",[a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toCreatBusiCpy()}}},[e._v("创建商业公司")])]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"商业公司名称："}},[a("el-input",{attrs:{placeholder:"请输入商业公司名称"},model:{value:e.company,callback:function(t){e.company=t},expression:"company"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户编码："}},[a("el-input",{attrs:{placeholder:"请输入客户编码"},model:{value:e.customerCode,callback:function(t){e.customerCode=t},expression:"customerCode"}})],1),e._v(" "),a("div",{staticClass:"div-inline"},[a("div",{staticClass:"div-inline"},[e._v("创建时间：")]),e._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"提交开始时间","picker-options":e.pickerOptionStar},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}}),e._v(" "),a("div",{staticClass:"div-inline"},[e._v("-")]),e._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"提交结束时间","picker-options":e.pickerOptionEnd},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:function(t){e.toInquire()}}},[e._v("查询")]),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:e.exportBaseInfoData}},[e._v("导出基本信息")]),e._v(" "),a("div",{staticClass:"div-inline el-button-red",on:{click:e.exportAptitudeData}},[e._v("导出资质信息")])],1),e._v(" "),a("el-form",{ref:"form",staticClass:"demo-form-inline slideDown",attrs:{inline:!0}},[a("div",{staticClass:"province_city_county"},[a("el-form-item",{attrs:{label:"所在地区："}},[a("address-plugin",{attrs:{required:"false"},on:{seleSuccess:e.seleSuccess}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"纳税人登记号："}},[a("el-input",{attrs:{placeholder:"请输入纳税人登记号"},model:{value:e.taxpayerCode,callback:function(t){e.taxpayerCode=t},expression:"taxpayerCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建人："}},[a("el-input",{attrs:{placeholder:"请输入创建人"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人："}},[a("el-input",{attrs:{placeholder:"请输入法人"},model:{value:e.bossName,callback:function(t){e.bossName=t},expression:"bossName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"企业地址："}},[a("el-input",{attrs:{placeholder:"请输入企业地址"},model:{value:e.companyAddress,callback:function(t){e.companyAddress=t},expression:"companyAddress"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户基本分类："}},[a("el-select",{attrs:{id:"questionType",placeholder:"请选择"},model:{value:e.customerType,callback:function(t){e.customerType=t},expression:"customerType"}},e._l(e.customerList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"电话："}},[a("el-input",{attrs:{placeholder:"请输入电话"},nativeOn:{keyup:function(t){e.number(e.phone)}},model:{value:e.phone,callback:function(t){e.phone=e._n(t)},expression:"phone"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{ref:"multipleTable",attrs:{data:e.tableData,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"company",label:"商业公司名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"customerCode",label:"客户编码",width:"130"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addressData",label:"所在地区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"companyAddress",label:"企业地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taxpayerCode",label:"纳税人登记号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"创建人",width:"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",width:"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.view(t.row.id)}}},[e._v("查看")]),e._v(" "),a("el-dropdown",{attrs:{trigger:"click"}},[a("div",{staticClass:"operateBtn",on:{click:function(t){e.moreOperate()}}},[e._v("更多")]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{nativeOn:{click:function(a){e.edit(t.row.id)}}},[e._v("编辑")]),e._v(" "),a("el-dropdown-item",{nativeOn:{click:function(a){e.allot(t.row.id)}}},[e._v("分配")]),e._v(" "),a("el-dropdown-item",{nativeOn:{click:function(a){e.cancelAllot(t.row.id)}}},[e._v("取消分配")]),e._v(" "),a("el-dropdown-item",{nativeOn:{click:function(a){e.addressBook(t.row.id)}}},[e._v("地址簿")])],1)],1)]}}])})],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1),e._v(" "),a("el-dialog",{staticClass:"dialogAllot",attrs:{title:"分配人员",visible:e.dialogAllotVisible,"append-to-body":!0},on:{"update:visible":function(t){e.dialogAllotVisible=t}}},[a("div",{staticClass:"dialog_body_content"},[e._v("\n\t\t\t\t省区经理：\n\t\t\t\t"),a("el-select",{staticStyle:{width:"80%"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入并选择省区经理","remote-method":function(t){e.remoteMethod(t)},loading:e.loading},on:{change:function(t){e.currentSel(t)}},model:{value:e.allotList.showlist,callback:function(t){e.$set(e.allotList,"showlist",t)},expression:"allotList.showlist"}},e._l(e.provinNamList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name+"    "+e.deptName+"    "+e.provinceName,value:e}})}))],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("span",{staticClass:"dialog-cancel-btn dialoperateBtn",on:{click:function(t){e.dialogAllotVisible=!1}}},[e._v("取消")]),e._v(" "),a("span",{staticClass:"dialog-sure-btn dialoperateBtn",on:{click:e.allot_sure}},[e._v("确定")])])]),e._v(" "),a("el-dialog",{staticClass:"dialogAllot",attrs:{title:"取消分配人员",visible:e.dialogCancelAllotVisible,"append-to-body":!0},on:{"update:visible":function(t){e.dialogCancelAllotVisible=t}}},[a("div",{staticClass:"dialog_body_content"},[a("el-table",{staticClass:"table-left",attrs:{data:e.dialog_provincList,border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"事业部"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所属省区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"省区经理"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("span",{staticClass:"dialog-cancel-btn dialoperateBtn",on:{click:function(t){e.dialogCancelAllotVisible=!1}}},[e._v("取消")]),e._v(" "),a("span",{staticClass:"dialog-sure-btn dialoperateBtn",on:{click:e.cancelAllot_sure}},[e._v("确定")])])]),e._v(" "),a("el-dialog",{staticClass:"dialogAllot",attrs:{title:"地址簿",visible:e.dialogAddBookVisible,"append-to-body":!0,width:"60%"},on:{"update:visible":function(t){e.dialogAddBookVisible=t}}},[a("div",{staticClass:"dialog_body_content"},[a("el-table",{staticClass:"table-left",attrs:{data:e.dialog_addBooklist,border:""}},[a("el-table-column",{attrs:{prop:"username",label:"省区经理"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addressData",label:"所属区域"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"!=e.addrBookStatus[t.$index]?a("div",[a("address-plugin",{attrs:{getProvince:t.row.provinceName,getCounty:t.row.countyName,getCity:t.row.cityName,required:"false"},on:{seleSuccess:e.seleSuccess}})],1):e._e(),e._v(" "),"edit"==e.addrBookStatus[t.$index]?a("div",[e._v("\n\t\t\t\t\t\t\t\t "+e._s(t.row.provinceName)+e._s(t.row.cityName)+e._s(t.row.countyName)+"\n\t\t\t    \t\t\t")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"addressData",label:"出库单地址"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"!=e.addrBookStatus[t.$index]?a("el-input",{attrs:{placeholder:"请输入出库单地址"},model:{value:t.row.addressData,callback:function(a){e.$set(t.row,"addressData",a)},expression:"scope.row.addressData"}},[e._v(e._s(t.row.addressData))]):a("div",[e._v(e._s(t.row.addressData))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"收货人"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"!=e.addrBookStatus[t.$index]?a("el-input",{attrs:{placeholder:"请输入收货人"},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}},[e._v(e._s(t.row.name))]):a("div",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"收货电话"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"!=e.addrBookStatus[t.$index]?a("el-input",{attrs:{placeholder:"请输入收货电话"},nativeOn:{keyup:function(t){return e.number(t)}},model:{value:t.row.phone,callback:function(a){e.$set(t.row,"phone",a)},expression:"scope.row.phone"}},[e._v(e._s(t.row.phone))]):a("div",[e._v(e._s(t.row.phone))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"stockOutSign",label:"赠品打印标识"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"!=e.addrBookStatus[t.$index]?a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.row.stockOutSign,callback:function(a){e.$set(t.row,"stockOutSign",a)},expression:"scope.row.stockOutSign"}},e._l(e.dialogAwardSignlist,function(e,t,o){return a("el-option",{key:o,attrs:{label:e,value:e}})})):a("div",[e._v(e._s(t.row.stockOutSign))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return["edit"==e.addrBookStatus[t.$index]?a("div",{staticClass:"operateBtn",on:{click:function(a){e.addrBookEdit(t.$index,t.row)}}},[e._v("编辑")]):a("div",{staticClass:"operateBtn",on:{click:function(a){e.addrBookSave(t.$index,t.row)}}},[e._v("保存")]),e._v(" "),"edit"==e.addrBookStatus[t.$index]?a("div",{staticClass:"operateBtn",on:{click:function(a){e.addrBookDel(t.$index,t.row)}}},[e._v("删除")]):a("div",{staticClass:"operateBtn",on:{click:function(a){e.addrBookCancel(t.$index,t.row)}}},[e._v("取消")])]}}])})],1)],1)])],1)},staticRenderFns:[]};var d=a("C7Lr")(n,l,!1,function(e){a("yzx3"),a("Pu26")},"data-v-54aab45b",null);t.default=d.exports},Pu26:function(e,t){},yzx3:function(e,t){}});
//# sourceMappingURL=28.6e4ca450a6d1c58bffa0.js.map