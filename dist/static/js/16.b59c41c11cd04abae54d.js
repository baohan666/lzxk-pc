webpackJsonp([16],{"4Gyg":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("3cXf"),n=a.n(i),s=a("hRKE"),o=a.n(s),r=a("HzJ8"),l=a.n(r),d=a("ZLEe"),c=a.n(d),h=a("gFbb"),u=a("a9+l"),v=a("PsGs"),p={data:function(){return{loading:!0,dataTree:[],dataTreeCheck:[],datarevisionTree:[],revisionProps:{label:"areaName",children:"childArea",isLeaf:"leaf"},defaultProps:{label:"areaName",isLeaf:"leaf"},props:{children:"childArea",label:"areaName"},provinceNameTitle:"",nameTitle:"",treeShow:!0,resourceCheckedKey:[],pageIndex:1,pageSize:10,totalRecords:0,totalPageCnt:0,pagin_show:!0,name:"",selStatus:"",position:"",provinceName:"",disabledShow:!1,handleEditShow:!1,revisionTreeShow:!1,tableData:[],handleTitle:"关联行政区",userId:"",getSoleOption:[],selSole:"",getDeptOption:[],departmentId:""}},mounted:function(){this.getData(this.pageIndex,this.pageSize)},components:{addressPlugin:h.a,elPagination:u.a},inject:["reload"],methods:{loadNode:function(e,t){var a=this;1===e.level&&Object(v.b)({areaLevel:e.level+1,parentId:e.key,userId:this.userId}).then(function(e){"省区经理关联行政区"==a.handleTitle&&e.data.data.forEach(function(e){e.leaf=!0}),1==e.data.code&&setTimeout(function(){t(e.data.data)},200)}),2===e.level&&Object(v.b)({areaLevel:e.level+1,parentId:e.key,userId:this.userId}).then(function(e){console.log(e.data.data),e.data.data.forEach(function(e){e.leaf=!0}),1==e.data.code&&setTimeout(function(){t(e.data.data)},200)})},getData:function(e,t,a,i,n){var s=this;Object(v.c)({pageSize:t,pageIndex:e,relevanceStatus:a,name:i,position:n}).then(function(e){var t=e.data.data;c()(t.dataList).length>0?(s.totalRecords=t.totalRecords,s.totalPageCnt=t.totalPageCnt,s.pageIndex=t.pageIndex,s.tableData=t.dataList,s.pagin_show=!0):(s.tableData=[],s.pagin_show=!1)})},updataPage:function(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex,this.getData(this.pageIndex,this.pageSize,this.selStatus,this.name,this.position)},handleRelevance:function(e,t){var a=this;this.treeShow=!0,3==t.positionId?this.handleTitle="县区经理关联行政区":4==t.positionId?this.handleTitle="地区经理关联行政区":5==t.positionId&&(this.handleTitle="省区经理关联行政区"),this.userId=t.userId,Object(v.b)({userId:this.userId}).then(function(e){var t=e.data.data;a.dataTree=t,a.loading=!1}),this.revisionTreeShow=!1,this.handleEditShow=!0,this.disabledShow=!1},handleCheck:function(e,t){var a=this;this.treeShow=!1,3==t.positionId?this.handleTitle="县区经理已关联行政区":4==t.positionId?this.handleTitle="地区经理已关联行政区":5==t.positionId&&(this.handleTitle="省区经理已关联行政区"),Object(v.a)({userId:t.userId}).then(function(e){a.dataTreeCheck=e.data.data}),this.treeShow=!1,this.revisionTreeShow=!1,this.handleEditShow=!0,this.disabledShow=!0},handleRevision:function(e,t){var a=this;this.loading=!0,console.log(t),this.treeShow=!0,3==t.positionId?this.handleTitle="县区经理关联行政区":4==t.positionId?this.handleTitle="地区经理关联行政区":5==t.positionId&&(this.handleTitle="省区经理关联行政区"),this.userId=t.userId,Object(v.f)({userId:this.userId}).then(function(e){var t=e.data.data;a.datarevisionTree=t,console.log(a.datarevisionTree),a.traversalObject(a.datarevisionTree)}),this.revisionTreeShow=!0,this.handleEditShow=!0,this.disabledShow=!1},traversalObject:function(e){for(var t in e){if("childArea"==t&&this.isArray(e[t])){var a=!0,i=!1,n=void 0;try{for(var s,r=l()(e[t]);!(a=(s=r.next()).done);a=!0){var d=s.value;1==d.isChoose&&3==d.areaLevel&&"县区经理关联行政区"==this.handleTitle?this.resourceCheckedKey.push(d.areaCode):1==d.isChoose&&3==d.areaLevel&&"地区经理关联行政区"==this.handleTitle&&this.resourceCheckedKey.push(d.areaCode)}}catch(e){i=!0,n=e}finally{try{!a&&r.return&&r.return()}finally{if(i)throw n}}console.log(this.resourceCheckedKey)}"object"==o()(e[t])&&this.traversalObject(e[t])}},isArray:function(e){return"[object Array]"==Object.prototype.toString.call(e)},checkOut:function(){Object(v.d)({pageSize:this.pageSize,pageIndex:this.pageIndex,relevanceStatus:this.selStatus,name:this.name,position:this.position}).then(function(e){var t=(new Date).getTime()+".xls",a=new Blob([e.data]),i=document.createElement("a");i.download=t,i.style.display="none",i.href=URL.createObjectURL(a),console.log(i.href),document.body.appendChild(i),i.click(),URL.revokeObjectURL(i.href),document.body.removeChild(i)})},backBtn:function(){this.disabledShow=!1,this.handleEditShow=!1,this.revisionTreeShow=!1,this.getData(this.pageIndex,this.pageSize,this.selStatus,this.name,this.position)},saveEditbtn:function(){var e=this,t=this.$refs.tree.getHalfCheckedNodes(),a=this.$refs.tree.getCheckedNodes();if(0==t.concat(a).length)return alert("请选择行政区"),!1;Object(v.e)({type:1,userId:this.userId,areaArrayStr:n()(t.concat(a))}).then(function(t){e.reload(),e.$message.success("关联操作成功")})},upDataEditbtn:function(){var e=this,t=this.$refs.datarevisionTree.getHalfCheckedNodes(),a=this.$refs.datarevisionTree.getCheckedNodes(),i=t.concat(a),s=!0,o=!1,r=void 0;try{for(var d,c=l()(i);!(s=(d=c.next()).done);s=!0){var h=d.value;this.isArray(h.childArea)&&null!=h.childArea&&delete h.childArea}}catch(e){o=!0,r=e}finally{try{!s&&c.return&&c.return()}finally{if(o)throw r}}if(0==i.length)return alert("请选择行政区"),!1;Object(v.e)({type:2,userId:this.userId,areaArrayStr:n()(i)}).then(function(t){e.reload(),e.$message.success("修改操作成功")})},search:function(){this.getData(1,this.pageSize,this.selStatus,this.name,this.position)}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"accountManage"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.handleEditShow,expression:"!handleEditShow"}],attrs:{id:""}},[a("div",{staticClass:"search_wrap"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"姓名:"}},[a("el-input",{staticClass:"handle-input",attrs:{placeholder:"请输入姓名 "},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),a("el-form-item",{staticClass:"handle-select",attrs:{label:"关联状态:"}},[a("el-select",{attrs:{placeholder:"全部状态"},model:{value:e.selStatus,callback:function(t){e.selStatus=t},expression:"selStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"已关联",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"未关联",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"handle-select",attrs:{label:"职级:"}},[a("el-select",{attrs:{placeholder:"请选择职级"},model:{value:e.position,callback:function(t){e.position=t},expression:"position"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"县区经理",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"地区经理",value:"4"}})],1)],1),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.search}},[e._v("查询")]),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:e.checkOut}},[e._v("导出")])],1)],1),e._v(" "),a("div",{staticClass:"table_wrap"},[a("el-table",{attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"姓名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"position",label:"职级",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"treeName",label:"部门",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"手机号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"人员状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"relevanceStatusStr",label:"关联状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["已关联"==t.row.relevanceStatusStr?a("div",{staticClass:"operateBtn edit",on:{click:function(a){e.handleRevision(t.$index,t.row),e.treeNameTitle=t.row.provinceName,e.nameTitle=t.row.name}}},[e._v("修改")]):e._e(),e._v(" "),"已关联"==t.row.relevanceStatusStr?a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleCheck(t.$index,t.row),e.treeNameTitle=t.row.provinceName,e.nameTitle=t.row.name}}},[e._v("查看")]):e._e(),e._v(" "),"已关联"!=t.row.relevanceStatusStr?a("div",{staticClass:"operateBtn",on:{click:function(a){e.handleRelevance(t.$index,t.row)}}},[e._v("关联")]):e._e()]}}])})],1)],1),e._v(" "),a("el-pagination",{attrs:{pageIndex:e.pageIndex,pageSize:e.pageSize,totalRecords:e.totalRecords,totalPageCnt:e.totalPageCnt,pagin_show:e.pagin_show},on:{clickpage:e.updataPage}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.handleEditShow,expression:"handleEditShow"}],staticClass:"handleEditShow"},[a("div",[a("button",{staticClass:"el-button-red",on:{click:e.backBtn}},[e._v("返回")])]),e._v(" "),a("div",{staticClass:"adminDetailBox"},[a("span",{staticClass:"adminDetailTitle"},[e._v(e._s(e.handleTitle)+"- "),a("span",[e._v(e._s(e.treeNameTitle)+"-"+e._s(e.nameTitle))])]),e._v(" "),a("el-tree",{directives:[{name:"show",rawName:"v-show",value:e.treeShow&&!e.revisionTreeShow,expression:"treeShow && !revisionTreeShow"},{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tree",attrs:{data:e.dataTree,load:e.loadNode,props:e.defaultProps,"show-checkbox":"","highlight-current":"",lazy:"","node-key":"areaCode"}}),e._v(" "),a("el-tree",{directives:[{name:"show",rawName:"v-show",value:!e.treeShow&&!e.revisionTreeShow,expression:"!treeShow && !revisionTreeShow"}],ref:"treeCheck",attrs:{data:e.dataTreeCheck,"node-key":"areaCode",props:e.props,"highlight-current":""}}),e._v(" "),a("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"},{name:"show",rawName:"v-show",value:e.revisionTreeShow,expression:"revisionTreeShow"}],ref:"datarevisionTree",attrs:{data:e.datarevisionTree,props:e.revisionProps,"show-checkbox":"","node-key":"areaCode","highlight-current":"","default-checked-keys":e.resourceCheckedKey}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.disabledShow,expression:"!disabledShow"}],staticClass:"adminDetailBtn",attrs:{slot:"footer"},slot:"footer"},[a("button",{directives:[{name:"show",rawName:"v-show",value:!e.revisionTreeShow,expression:"!revisionTreeShow"}],staticClass:"el-button-red",on:{click:function(t){e.saveEditbtn()}}},[e._v("确定")]),e._v(" "),a("button",{directives:[{name:"show",rawName:"v-show",value:e.revisionTreeShow,expression:"revisionTreeShow"}],staticClass:"el-button-red",on:{click:function(t){e.upDataEditbtn()}}},[e._v("确定")]),e._v(" "),a("button",{staticClass:"el-button-red",on:{click:function(t){e.handleEditShow=!1}}},[e._v("取消")])])])])},staticRenderFns:[]};var b=a("C7Lr")(p,f,!1,function(e){a("WU0f"),a("JaWG")},"data-v-5b70c6e8",null);t.default=b.exports},JaWG:function(e,t){},PsGs:function(e,t,a){"use strict";a.d(t,"c",function(){return o}),a.d(t,"b",function(){return r}),a.d(t,"e",function(){return l}),a.d(t,"a",function(){return d}),a.d(t,"f",function(){return c}),a.d(t,"d",function(){return h});var i=a("lta2"),n=a("6iV/"),s=a.n(n),o=function(e){return i.a.get(i.a.baseURL+"sysDictArea/getSysDictAreaUserInfo",{params:e})},r=function(e){return i.a.get(i.a.baseURL+"sysDictArea/getArea",{params:e})},l=function(e){return i.a.post(i.a.baseURL+"sysDictArea/saveArea",s.a.stringify(e))},d=function(e){return i.a.post(i.a.baseURL+"sysDictArea/checkArea",s.a.stringify(e))},c=function(e){return i.a.post(i.a.baseURL+"sysDictArea/updateArea",s.a.stringify(e))},h=function(e){return i.a.post(i.a.baseURL+"sysDictArea/outputSysDictArea",s.a.stringify(e),{responseType:"blob"})}},WU0f:function(e,t){}});
//# sourceMappingURL=16.b59c41c11cd04abae54d.js.map