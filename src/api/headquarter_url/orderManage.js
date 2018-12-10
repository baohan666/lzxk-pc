import instance from '../../service/http';
import qs from 'qs'

/*
 
 * 
 * 总部 - 订单管理 - 所有接口
 * 
 * */

//地县订单-分页
export const getOrdersList = (data) => instance.get(instance.baseURL+'orders/cityCountyOrdersList',{params:data});

//地县订单-导出
export const checkOutOrderInfo = (data) => instance.post(instance.baseURL+'orders/cityCountyOrdersExcel',qs.stringify(data),{ responseType: 'blob'});

//总部省区订单状态ordersStatus
export const getOrdersStatus = (data) => instance.get(instance.baseURL+'orders/provinceOrdersStatus');

//总部地县订单状态ordersStatusorders/salesOrdersStatus
export const getCityOrdersStatus = (data) => instance.get(instance.baseURL+'orders/salesOrdersStatus');

//查看详情

export const getOrdersDetail = (data) => instance.get(instance.baseURL+'orders/cityCountyOrdersDetail',{params:data});

//省区订单列表查询
export const getProvinceOrdersList = (data) => instance.get(instance.baseURL+'orders/getOrders',{params:data});

//省区订单
export const getProvinceOrdersDetail = (data) => instance.post(instance.baseURL+'orders/getOrdersDetail',qs.stringify(data));

//订单详情操作orders/checkOrders
export const handleOrders = (data) => instance.post(instance.baseURL+'orders/checkOrders',qs.stringify(data));

//orders/insertOrdersDeliveryMsg


//查看原订单orders/selectPrimaryOrders
export const selectPrimaryOrders = (data) => instance.post(instance.baseURL+'orders/selectPrimaryOrders',qs.stringify(data));

export const insertOrdersDelivery = (data) => instance.get(instance.baseURL+'orders/insertOrdersDeliveryMsg',{params:data});


//政策补货/列表查询
export const getPolicyOweList = (data) => instance.get(instance.baseURL+'orders/policyOweList',{params:data});

//政策补货/导出orders/policyOweExcel
export const checkOutPolicyInfo = (data) => instance.post(instance.baseURL+'orders/policyOweExcel',qs.stringify(data),{ responseType: 'blob'});

//政策补货/查看详情
export const getPolicyOweDetail = (data) => instance.get(instance.baseURL+'orders/policyOweDetail',{params:data});

//政策补货/审核通过
export const getPolicyOweCheck = (data) => instance.get(instance.baseURL+'orders/policyOweCheck',{params:data});

//订单待处理orders/policyOweDeal
export const getPolicyOweDeal = (data) => instance.get(instance.baseURL+'orders/policyOweDeal',{params:data});


//总部欠货
export const getZBOweList = (data) => instance.get(instance.baseURL+'orders/ordersOweList',{params:data});

//总部欠货导出
export const outputZBOweList = (data) => instance.get(instance.baseURL+'orders/outputOweList',{params:data});

//总部提醒省区
export const remindProvince = (data) => instance.get(instance.baseURL+'orders/remindProvince',{params:data});

//不许提单
export const notAllow = (data) => instance.get(instance.baseURL+'orders/notAllow',{params:data});


//
