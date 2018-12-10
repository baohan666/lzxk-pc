import instance from '../../service/http';
import qs from 'qs'
/**
 * 商业公司管理exportData----导出
 */
export const getBusiCmpyData = (data) => instance.post(instance.baseURL+'businessCompany/list',qs.stringify(data));
//导出基本信息
export const exportBaseInfo = (data) => instance.post(instance.baseURL+'businessCompany/excel',qs.stringify(data),{ responseType: 'blob'});
//导出资质信息
export const exportAptitude = (data) => instance.post(instance.baseURL+'businessCompany/info',qs.stringify(data),{ responseType: 'blob'});
//获取可供选择的省区经理列表
export const getProvinNamData = (data) => instance.post(instance.baseURL+'userInfo/allot',qs.stringify(data));
//选择分配省区经理点击确定按钮
export const saveProvinNamData = (data) => instance.post(instance.baseURL+'billStockOutAddress/addSave',qs.stringify(data));
//取消分配
export const getCancelData = (data) => instance.post(instance.baseURL+'userInfo/allotted',qs.stringify(data));
//取消分配确定
export const cancelProvinNamData = (data) => instance.post(instance.baseURL+'billStockOutAddress/cancelAllot',qs.stringify(data));
//地址簿数据
export const getAddressBookData = (data) => instance.post(instance.baseURL+'billStockOutAddress/book',qs.stringify(data));
//地址簿保存
export const saveAddrBookData = (data) => instance.post(instance.baseURL+'billStockOutAddress/saveBook',qs.stringify(data));
//地址簿删除
export const delAddrBookData = (data) => instance.post(instance.baseURL+'billStockOutAddress/dropBook',qs.stringify(data));
//新建商业公司
export const checkBusiCmpy = (data) => instance.post(instance.baseURL+'businessCompany/company',qs.stringify(data));
export const saveBusiCmpyData = (data) => instance.post(instance.baseURL+'businessCompany/addSave',qs.stringify(data));
export const getbusiRangeData = (data) => instance.post(instance.baseURL+'businessRange/range',qs.stringify(data));
//编辑商业公司
export const checkBusiCmpyEdit = (data) => instance.post(instance.baseURL+'businessCompany/companyEdit',qs.stringify(data));
export const saveBusiCmpyDataEdit = (data) => instance.post(instance.baseURL+'businessCompany/editSave',qs.stringify(data));
//查看商业公司详情
export const viewBusiCmpy = (data) => instance.post(instance.baseURL+'businessCompany/detail',qs.stringify(data));

/*
 * 终端客户管理
 * */
//初始化数据
export const getTerCustomData = (data) => instance.post(instance.baseURL+'clinic/list',qs.stringify(data));
//获取客户类型
export const getCusTypeData = (data) => instance.post(instance.baseURL+'clinic/type',qs.stringify(data));
//导出
export const exportInfoData = (data) => instance.post(instance.baseURL+'clinic/excel',qs.stringify(data),{ responseType: 'blob'});

//查看终端客户详情
export const viewTerCustom = (data) => instance.post(instance.baseURL+'clinic/detail',qs.stringify(data));
































/**/
