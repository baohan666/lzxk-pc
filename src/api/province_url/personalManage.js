import instance from '../../service/http';
import qs from 'qs'

/*
省区：人员管理：人员申请单
*/
//人员申请单列表
export const getProStockLogData = (data) => instance.post(instance.baseURL+'goodsStockLog/list',qs.stringify(data));
export const provinceUserApplyList = (data) => instance.post(instance.baseURL+'provinceUserApply/list',qs.stringify(data));
//人员申请单--类型下拉
export const getApplyTypeData = (data) => instance.post(instance.baseURL+'common/userApplyType',qs.stringify(data));
//人员申请单--状态下拉
export const getApplyStatusData = (data) => instance.post(instance.baseURL+'common/userApplyStatus',qs.stringify(data));
/*
省区：人员管理：人员申请单：详情
*/
//人员申请单--点击未读变已读
export const userApplyInfoIsRead = (data) => instance.post(instance.baseURL+'userApplyInfo/isRead',qs.stringify(data));
//人员申请单详情
export const provinceUserApplyDetail = (data) => instance.post(instance.baseURL+'provinceUserApply/detail',qs.stringify(data));
//人员申请单详情-日志
export const userApplyInfoLog = (data) => instance.post(instance.baseURL+'userApplyInfo/log',qs.stringify(data));
//人员申请单--审核(撤回)
export const userApplyInfoCheck = (data) => instance.post(instance.baseURL+'userApplyInfo/check',qs.stringify(data));
