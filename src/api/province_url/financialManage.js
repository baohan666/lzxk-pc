import instance from '../../service/http';
import qs from 'qs'
/**
 * 省区：财务管理
 */
//地县回款
export const getProCollectionData = (data) => instance.post(instance.baseURL+'provinceCollection/list',qs.stringify(data));

//审核即地县回款详情
export const getProCollectionLogData = (data) => instance.post(instance.baseURL+'provinceCollection/detail',qs.stringify(data));
/*1.3 地县回款-审核与驳回*/
export const collectionCheck = (data) => instance.post(instance.baseURL+'collection/check',qs.stringify(data));

//查看销售订单
export const salesOrdersDetail = (data) => instance.post(instance.baseURL+'provinceOrders/salesOrdersDetail',qs.stringify(data));


























/**/
