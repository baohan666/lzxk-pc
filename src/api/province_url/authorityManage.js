import instance from '../../service/http';
import qs from 'qs'
/**
 * 账号权限列表、删除、禁用启用、角色权限下拉列表
 */
export const getAccountListData = (data) => instance.get(instance.baseURL+'provinceAccount/list',{params:data});
//总部删除账号
export const delAccountListData = (data) => instance.get(instance.baseURL+'accountInfo/deleteAccountInfo',{params:data});
//总部禁用、启用账号
export const forOrStaAccountInfo = (data) =>instance.get(instance.baseURL+'provinceAccount/banAccount',{params:data});

//账号管理-分页的角色筛选条件下拉
export const selectRoleName = (data) =>instance.get(instance.baseURL+'provinceAccount/pullList')
//账号管理-查看账号
export const checkAccountInfo = (data) =>instance.get(instance.baseURL+'provinceAccount/detail')

//编辑账号
export const updateAccountInfo = (data) =>instance.get(instance.baseURL+'accountInfo/updateAccountInfo',{params:data})	
//账号管理-编辑账号的角色下拉
//export const checkRole = (data) =>instance.get(instance.baseURL+'provinceAccount/pull',{params:data})

/*instance.get(instance.baseURL+'accountInfo/updateAccountInfo',{params:data})	
 * 角色权限列表
 */


/*
 * 角色权限列表
 */


export const getRoleListData = (data) =>instance.get(instance.baseURL+'provinceRole/list',{params:data});
export const getRoleMenuList = (data) =>instance.get(instance.baseURL+'menu/provinceMenuList',{params:data})
export const getNextMenuList = (data) =>instance.get(instance.baseURL+'menu/nextMenuList',{params:data})
/*创建角色、查看/编辑*/
export const insertRole = (data) =>instance.post(instance.baseURL+'role/insertRole',qs.stringify(data))
//查看
export const checkProRoleDetail = (data) =>instance.get(instance.baseURL+'provinceRole/detail',{params:data})

export const updateRole = (data) =>instance.post(instance.baseURL+'role/updateRole',qs.stringify(data))

/*删除、禁用、启用角色*/
export const deleteRole = (data) =>instance.get(instance.baseURL+'role/deleteRole',{params:data})
export const forOrStaRole = (data) =>instance.get(instance.baseURL+'role/forOrStaRole',{params:data})
