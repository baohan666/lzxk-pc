webpackJsonp([49],{QHRR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("hRKE"),n=a.n(s),o=a("HzJ8"),r=a.n(o),i=a("ZLEe"),l=a.n(i),c=a("a3Yh"),d=a.n(c),u=a("hDjc"),h={data:function(){var e;return e={roleId:"",dataTree:"",disabledShow:!1,handleEditShow:!1,forbiddenBtnShow:"true",pagin_show:!0,delStatus:!1,isSatus:!0,indexTree:"",nameOrTel:"",selStatus:"",selSole:"",checkedDept:[],departmentList:[],tableData:[],checkList:[],totalRecords:0,totalPageCnt:0},d()(e,"pagin_show",!0),d()(e,"pageIndex",1),d()(e,"pageSize",10),d()(e,"getSoleOption",[]),d()(e,"editVisible",!1),d()(e,"delVisible",!1),d()(e,"forOrStaVisible",!1),d()(e,"forOrStaMsg","禁用"),d()(e,"statusForOrStart",""),d()(e,"tableIndex",""),d()(e,"defaultProps",{children:"children",label:"menuName"}),d()(e,"form",{name:"",phoneNum:"",status:"",departmentId:"",remark:"",roleName:"",id:""}),d()(e,"idDel",""),d()(e,"resourceCheckedKey",[]),e},inject:["reload"],created:function(){var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.getData(e),this.selectRoleName()},components:{elPagination:a("a9+l").a},methods:{getsearchInfo:function(e,t){return{pageIndex:e,pageSize:t,name:this.nameOrTel,roleId:this.selSole,status:this.selStatus}},getData:function(e){var t=this;Object(u.f)(e).then(function(e){var a=e.data.data;console.log(a),l()(a.dataList).length>0?(t.totalRecords=a.totalRecords,t.totalPageCnt=a.totalPageCnt,t.pageIndex=a.pageIndex,t.tableData=a.dataList,t.pagin_show=!0):(t.tableData=[],t.pagin_show=!1)})},selectRoleName:function(){var e=this;Object(u.l)().then(function(t){e.getSoleOption=t.data.data})},updataPage:function(e){this.pageIndex=e.pageIndex,this.pageSize=e.pageSize;var t=this.getsearchInfo(this.pageIndex,this.pageSize);this.getData(t)},onSelectedSole:function(e){var t=this;this.resourceCheckedKey=[],this.roleId=e,Object(u.a)({id:e}).then(function(e){t.departmentList=e.data.data.departmentList,t.dataTree=e.data.data.permissionList,t.traversalDept(),t.traversalObject(t.dataTree),setTimeout(function(){t.traversalObjectDisable(t.dataTree)},200)})},saveEditbtn:function(){var e=this;return""==this.form.name?(alert("请输入姓名"),!1):""==this.form.phoneNum?(alert("电话"),!1):/^1[34578]\d{9}$/.test(this.form.phoneNum)?""==this.roleId?(alert("请选择角色类型"),!1):void(this.isSatus?Object(u.m)({id:this.form.id,name:this.form.name,phoneNum:this.form.phoneNum,roleId:this.roleId}).then(function(t){e.handleEditShow=!1,e.reload(),e.$message.success("编辑账号成功")}):Object(u.j)({name:this.form.name,phoneNum:this.form.phoneNum,roleId:this.roleId}).then(function(t){e.reload(),e.$message.success("新增账号成功")})):(alert("手机号码有误，请重填"),!1)},addAccount:function(){this.roleId="",this.form={name:"",phoneNum:"",status:"",departmentId:[],remark:"",roleName:""},this.isSatus=!1,this.disabledShow=!1,this.handleEditShow=!0},backBtn:function(){this.handleEditShow=!1;var e=this.getsearchInfo(this.pageIndex,this.pageSize);this.getData(e)},formatterStatus:function(e,t){switch(e.status){case 0:return"删除";case 1:return"正常";case 2:return"禁用"}},clear:function(){this.nameOrTel="",this.selStatus="",this.selSole=""},handleCurrentChange:function(e){this.pageIndex=e.pageIndex,this.pageSize=e.pageSize,this.getData(this.pageIndex,this.pageSize)},handleSizeChange:function(e){},search:function(){var e=this.getsearchInfo(1,this.pageSize);this.getData(e)},handleEdit:function(e,t){var a=this;this.disabledShow=!1,this.isSatus=!0,this.roleId=t.roleId,this.form={name:t.name,phoneNum:t.accountNum,roleName:t.roleName,status:t.status,remark:t.remark,id:t.id},Object(u.a)({id:t.roleId}).then(function(e){a.departmentList=e.data.data.departmentList,a.dataTree=e.data.data.permissionList,console.log(a.dataTree),a.traversalDept(),a.traversalObject(a.dataTree),setTimeout(function(){a.traversalObjectDisable(a.dataTree)},200)}),this.handleEditShow=!0},handleCheck:function(e,t){var a=this;this.resourceCheckedKey=[],this.disabledShow=!0,this.isSatus=!0,this.roleId=t.roleId,this.form={name:t.name,phoneNum:t.accountNum,roleName:t.roleName,status:t.status,remark:t.remark},console.log(this.form),Object(u.a)({id:t.roleId}).then(function(e){a.departmentList=e.data.data.departmentList,a.dataTree=e.data.data.permissionList,console.log(a.dataTree),a.traversalDept(),a.traversalObject(a.dataTree),setTimeout(function(){a.traversalObjectDisable(a.dataTree)},200)}),this.handleEditShow=!0},traversalObject:function(e){for(var t in e){if("children"==t&&this.isArray(e[t])){var a=!0,s=!1,o=void 0;try{for(var i,l=r()(e[t]);!(a=(i=l.next()).done);a=!0){var c=i.value;c.check&&this.resourceCheckedKey.push(c.menuId)}}catch(e){s=!0,o=e}finally{try{!a&&l.return&&l.return()}finally{if(s)throw o}}}"object"==n()(e[t])&&this.traversalObject(e[t])}},traversalDept:function(){this.checkList=[];var e=!0,t=!1,a=void 0;try{for(var s,n=r()(this.departmentList);!(e=(s=n.next()).done);e=!0){var o=s.value;1==o.is_check&&this.checkList.push(o.id)}}catch(e){t=!0,a=e}finally{try{!e&&n.return&&n.return()}finally{if(t)throw a}}},traversalObjectDisable:function(e){for(var t in e){if("children"==t&&this.isArray(e[t])){var a=!0,s=!1,o=void 0;try{for(var i,l=r()(e[t]);!(a=(i=l.next()).done);a=!0){i.value.disabled=!0}}catch(e){s=!0,o=e}finally{try{!a&&l.return&&l.return()}finally{if(s)throw o}}}"object"==n()(e[t])&&this.traversalObjectDisable(e[t])}},isArray:function(e){return"[object Array]"==Object.prototype.toString.call(e)},handleForOrSta:function(e,t){this.idDel=t.id,console.log(this.tableData[e]),1==t.status?this.forOrStaRow(2):this.forOrStaRow(1)},handleDelete:function(e,t){this.idDel=t.id,this.delVisible=!0},handleSelectionChange:function(e){this.multipleSelection=e},deleteRow:function(){var e=this;Object(u.b)({id:this.idDel}).then(function(t){e.getData(e.pageIndex,e.pageSize,e.nameOrTel,e.selSole,e.selStatus)}),this.delVisible=!1},forOrStaRow:function(e){var t=this;Object(u.d)({id:this.idDel,status:e}).then(function(e){t.getData(t.pageIndex,t.pageSize,t.nameOrTel,t.selSole,t.selStatus)})}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"accountManage"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.handleEditShow,expression:"!handleEditShow"}],attrs:{id:""}},[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("button",{staticClass:"el-button-red",on:{click:e.addAccount}},[e._v("新增账号\n\t\t\t")]),e._v(" "),a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"handle-input",attrs:{placeholder:"请输入姓名或电话 "},model:{value:e.nameOrTel,callback:function(t){e.nameOrTel=t},expression:"nameOrTel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{placeholder:"全部状态"},model:{value:e.selStatus,callback:function(t){e.selStatus=t},expression:"selStatus"}},[a("el-option",{attrs:{label:"请选择状态",value:""}}),e._v(" "),a("el-option",{attrs:{label:"删除",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"正常",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"禁用",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{staticStyle:{color:"red"},attrs:{label:"角色:"}},[a("el-select",{staticClass:"handle-select",attrs:{placeholder:"全部角色"},model:{value:e.selSole,callback:function(t){e.selSole=t},expression:"selSole"}},[a("el-option",{attrs:{label:"请选择角色",value:""}}),e._v(" "),e._l(e.getSoleOption,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.search}},[e._v("查询")]),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.clear}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"序号",width:"60px",type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"accountNum",label:"电话",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"roleName",label:"角色名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",align:"center",formatter:e.formatterStatus}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleCheck(t.$index,t.row)}}},[e._v("查看")]),e._v(" "),0!=t.row.status?a("div",{staticClass:"operateBtn edit",on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]):e._e(),e._v(" "),0!=t.row.status?a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleForOrSta(t.$index,t.row)}}},[e._v(e._s(2==t.row.status?"解禁":"禁用"))]):e._e(),e._v(" "),0!=t.row.status?a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")]):e._e()]}}])})],1)],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.delVisible,"append-to-body":!0,center:"",width:"30%"},on:{"update:visible":function(t){e.delVisible=t}}},[a("div",{staticStyle:{"text-align":"center","line-height":"100px"}},[a("span",[e._v("您确定要删除吗？")])]),e._v(" "),a("span",{attrs:{slot:"footer",calss:"dialog-footer"},slot:"footer"},[a("button",{staticClass:"el-button-red",on:{click:e.deleteRow}},[e._v("确定")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.handleEditShow,expression:"handleEditShow"}],staticClass:"handleEditShow"},[a("div",[a("button",{staticClass:"el-button-red margin30",on:{click:e.backBtn}},[e._v("返回")])]),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"adminDetailBox"},[a("el-form",{ref:"form",staticStyle:{border:"1px solid red,"},attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"姓      名:"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.disabledShow,expression:"disabledShow"}],staticClass:"status"},[e._v(e._s(e.form.name))]),e._v(" "),a("el-input",{directives:[{name:"show",rawName:"v-show",value:!e.disabledShow,expression:"!disabledShow"}],model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"电      话:"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.disabledShow,expression:"disabledShow"}],staticClass:"status"},[e._v(e._s(e.form.phoneNum))]),e._v(" "),a("el-input",{directives:[{name:"show",rawName:"v-show",value:!e.disabledShow,expression:"!disabledShow"}],model:{value:e.form.phoneNum,callback:function(t){e.$set(e.form,"phoneNum",t)},expression:"form.phoneNum"}})],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isSatus,expression:"isSatus"}],attrs:{label:"状      态:"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:1==e.form.status,expression:"form.status == 1"}],staticClass:"status"},[e._v("正常")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:2==e.form.status,expression:"form.status == 2"}],staticClass:"status"},[e._v("禁用")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0==e.form.status,expression:"form.status == 0"}],staticClass:"status"},[e._v("删除")])]),e._v(" "),a("el-form-item",{attrs:{label:"角色类型:"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.disabledShow,expression:"disabledShow"}],staticClass:"status"},[e._v(e._s(e.form.roleName))]),e._v(" "),a("el-select",{directives:[{name:"show",rawName:"v-show",value:!e.disabledShow,expression:"!disabledShow"}],staticClass:"handle-select",attrs:{placeholder:"全部角色"},on:{change:function(t){e.onSelectedSole(t)}},model:{value:e.form.roleName,callback:function(t){e.$set(e.form,"roleName",t)},expression:"form.roleName"}},[a("el-option",{attrs:{label:"请选择角色",value:""}}),e._v(" "),e._l(e.getSoleOption,function(e,t){return a("el-option",{attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:""!==e.form.roleName,expression:"form.roleName !== ''"}],staticClass:"deptBox",attrs:{id:""}},[a("span",{staticClass:"dept"},[e._v("\n\t\t\t\t\t\t事业部：\n\t\t\t\t\t")]),e._v(" "),a("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.departmentList,function(t){return a("el-checkbox",{key:t.name,attrs:{label:t.id,disabled:""}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:""!==e.form.roleName,expression:'form.roleName !== ""'}],attrs:{label:"角色权限:"}},[a("el-tree",{ref:"tree",attrs:{data:e.dataTree,"node-key":"menuId","show-checkbox":"",props:e.defaultProps,"default-checked-keys":e.resourceCheckedKey}})],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.disabledShow,expression:"!disabledShow"}],staticClass:"adminDetailBox",attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"el-button-red",on:{click:function(t){e.saveEditbtn()}}},[e._v("确定")]),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:function(t){e.handleEditShow=!1}}},[e._v("取消")])])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"adminDetailBox"},[t("span",{staticClass:"adminDetailTitle"},[this._v("基本信息")])])}]};var f=a("C7Lr")(h,m,!1,function(e){a("drG9")},"data-v-a930a210",null);t.default=f.exports},drG9:function(e,t){},hDjc:function(e,t,a){"use strict";a.d(t,"f",function(){return r}),a.d(t,"b",function(){return i}),a.d(t,"d",function(){return l}),a.d(t,"l",function(){return c}),a.d(t,"j",function(){return d}),a.d(t,"m",function(){return u}),a.d(t,"h",function(){return h}),a.d(t,"i",function(){return m}),a.d(t,"g",function(){return f}),a.d(t,"k",function(){return v}),a.d(t,"a",function(){return p}),a.d(t,"n",function(){return b}),a.d(t,"c",function(){return g}),a.d(t,"e",function(){return w});var s=a("lta2"),n=a("6iV/"),o=a.n(n),r=function(e){return s.a.get(s.a.baseURL+"accountInfo/getAccountInfoList",{params:e})},i=function(e){return s.a.get(s.a.baseURL+"accountInfo/deleteAccountInfo",{params:e})},l=function(e){return s.a.get(s.a.baseURL+"accountInfo/forOrStaAccountInfo",{params:e})},c=function(e){return s.a.get(s.a.baseURL+"role/selectRoleName")},d=function(e){return s.a.get(s.a.baseURL+"accountInfo/insertAccountInfo",{params:e})},u=function(e){return s.a.get(s.a.baseURL+"accountInfo/updateAccountInfo",{params:e})},h=function(e){return s.a.get(s.a.baseURL+"role/roleList",{params:e})},m=function(e){return s.a.get(s.a.baseURL+"menu/oneMenuList",{params:e})},f=function(e){return s.a.get(s.a.baseURL+"menu/nextMenuList",{params:e})},v=function(e){return s.a.post(s.a.baseURL+"role/insertRole",o.a.stringify(e))},p=function(e){return s.a.get(s.a.baseURL+"role/selectRoleById",{params:e})},b=function(e){return s.a.post(s.a.baseURL+"role/updateRole",o.a.stringify(e))},g=function(e){return s.a.get(s.a.baseURL+"role/deleteRole",{params:e})},w=function(e){return s.a.get(s.a.baseURL+"role/forOrStaRole",{params:e})}}});
//# sourceMappingURL=49.f27a8c5a098811929f3b.js.map