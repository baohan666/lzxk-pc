import instance from '../../service/http';
import qs from 'qs'
/**
 * 账号权限列表、删除、禁用启用、角色权限下拉列表
 */
export const getAccountListData = (data) => instance.get(instance.baseURL+'accountInfo/getAccountInfoList',{params:data});
//总部删除账号
export const delAccountListData = (data) => instance.get(instance.baseURL+'accountInfo/deleteAccountInfo',{params:data});
//总部禁用、启用账号
export const forOrStaAccountInfo = (data) =>instance.get(instance.baseURL+'accountInfo/forOrStaAccountInfo',{params:data});
export const selectRoleName = (data) =>instance.get(instance.baseURL+'role/selectRoleName')

//总部新增账号accountInfo/insertAccountInfo
export const insertAccountInfo = (data) =>instance.get(instance.baseURL+'accountInfo/insertAccountInfo',{params:data})	
//总部编辑账号accountInfo/updateAccountInfo
export const updateAccountInfo = (data) =>instance.get(instance.baseURL+'accountInfo/updateAccountInfo',{params:data})	



/*
 * 角色权限列表
 */


export const getRoleListData = (data) =>instance.get(instance.baseURL+'role/roleList',{params:data});
export const getRoleMenuList = (data) =>instance.get(instance.baseURL+'menu/oneMenuList',{params:data})	
export const getNextMenuList = (data) =>instance.get(instance.baseURL+'menu/nextMenuList',{params:data})	
/*创建角色、查看/编辑*/
export const insertRole = (data) =>instance.post(instance.baseURL+'role/insertRole',qs.stringify(data))	

export const checkRole = (data) =>instance.get(instance.baseURL+'role/selectRoleById',{params:data})	

export const updateRole = (data) =>instance.post(instance.baseURL+'role/updateRole',qs.stringify(data))
															
/*删除、禁用、启用角色*/
export const deleteRole = (data) =>instance.get(instance.baseURL+'role/deleteRole',{params:data})	
export const forOrStaRole = (data) =>instance.get(instance.baseURL+'role/forOrStaRole',{params:data})	