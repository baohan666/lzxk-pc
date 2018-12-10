import instance from '../../service/http';
import qs from 'qs'
/*
 * 终端客户管理
 * */
//初始化数据
export const getTerCustomData = (data) => instance.post(instance.baseURL+'provinceClinic/list',qs.stringify(data));
//获取客户类型
export const getCusTypeData = (data) => instance.post(instance.baseURL+'common/clinicType',qs.stringify(data));
//导出
export const exportInfoData = (data) => instance.post(instance.baseURL+'provinceClinic/excel',qs.stringify(data),{ responseType: 'blob'});

/*弹窗*/
//终端客户管理-分配-获取分配的人员--实时查询地县经理
export const cityCountyName = (data) => instance.post(instance.baseURL+'userInfo/cityCountyName',qs.stringify(data));
//终端客户管理-分配--判断查询到经理是否符合条件
export const judge = (data) => instance.post(instance.baseURL+'userInfo/judge',qs.stringify(data));
//终端客户管理-分配-开始分配
export const allot = (data) => instance.post(instance.baseURL+'provinceClinic/allot',qs.stringify(data));

//取消分配确定
export const cancelProvinNamData = (data) => instance.post(instance.baseURL+'provinceClinic/cancelAllot',qs.stringify(data));

//查看终端客户详情
export const viewTerCustom = (data) => instance.post(instance.baseURL+'provinceClinic/detail',qs.stringify(data));
































/**/
