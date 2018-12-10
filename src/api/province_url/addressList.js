import instance from '../../service/http';
import qs from 'qs'
//省区初始化左侧树
export const addressList = (data) => instance.get(instance.baseURL+'provinceAddressList/getProvinceOrgTree',{params:data});

//点击树的下一级调用
export const addressGetOrgTree = (data) => instance.get(instance.baseURL+'addressList/getOrgTree',{params:data});

//右侧人员列表addressList/getProvinceUserByTreeId
export const addressListTree = (data) => instance.get(instance.baseURL+'addressList/getUserByTreeId',{params:data});

//右侧人员详情
export const addressDetail = (data) => instance.get(instance.baseURL+'addressList/getUserDetailById',{params:data});

//人员离职
export const leaveOffice = (data) => instance.get(instance.baseURL+'provinceAddressList/provinceLeaveOffice',{params:data});

//申请解禁  
export const forbiddenOrStart = (data) => instance.get(instance.baseURL+'provinceAddressList/provinceStart',{params:data});

//编辑addressLis/provinceUpdateUserInfo
//export const provinceUpdateUserInfo = (data) => instance.get(instance.baseURL+'addressList/provinceUpdateUserInfo',{params:data});

//通讯录导出
export const outputUserInfo = (data) => instance.post(instance.baseURL+'addressList/outputUserInfo',qs.stringify(data),{ responseType: 'blob'});


//删除
export const deleteUserInfo = (data) => instance.get(instance.baseURL+'addressList/deleteUserInfo',{params:data});

//查看变更记录
export const getOrgUserLog = (data) => instance.get(instance.baseURL+'addressList/getOrgUserLog',{params:data});

//通讯录搜索
export const selectOrgTree = (data) => instance.get(instance.baseURL+'addressList/selectOrgTree',{params:data});

//修改部门名称
export const updateOrgTree = (data) => instance.get(instance.baseURL+'addressList/updateOrgTree',{params:data});

//添加子部门
export const insertOrgTree = (data) => instance.get(instance.baseURL+'addressList/insertOrgTree',{params:data});

//删除部门
export const deleteOrgTree = (data) => instance.get(instance.baseURL+'addressList/deleteOrgTree',{params:data});

//上边人数
export const getCountByTreeId = (data) => instance.get(instance.baseURL+'addressList/getCountByTreeId',{params:data});
//增加人员
export const insertUserInfo = (data) => instance.get(instance.baseURL+'provinceAddressList/insertProvinceUserInfo',{params:data});

//编辑
export const updateUserInfo = (data) => instance.get(instance.baseURL+'provinceAddressList/provinceUpdateUserInfo',{params:data});
