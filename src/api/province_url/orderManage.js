import instance from '../../service/http';
import qs from 'qs'
//省区 --订单管理 接口   https://note.youdao.com/share/?id=4a181a2349eb755072a7d7e4c5d95399&type=note#/


//销售订单-分页
export const getOrdersList = (data) => instance.get(instance.baseURL+'provinceOrders/salesOrdersList',{params:data});

//销售订单-导出
export const checkOutOrderInfo = (data) => instance.post(instance.baseURL+'provinceOrders/salesOrdersExcel',qs.stringify(data),{ responseType: 'blob'});

//订单状态ordersStatus
export const getOrdersStatus = (data) => instance.get(instance.baseURL+'orders/salesOrdersStatus');

//销售订单 -- 查看详情

export const getOrdersDetail = (data) => instance.get(instance.baseURL+'provinceOrders/salesOrdersDetail',{params:data});


//商业公司下拉
export const getbillNameList = (data) => instance.get(instance.baseURL+'common/billName',{params:data});

//获取发货信息
export const getDeliveryMsg = (data) => instance.get(instance.baseURL+'provinceOrders/getDeliveryMsg',{params:data});
// 销售订单-审核-补发物流信息请求地址：192.168.18.144:8080/provinceOrders/salesOrdersUpdate

export const salesOrdersUpdate = (data) => instance.get(instance.baseURL+'provinceOrders/salesOrdersUpdate',{params:data});
//发货
export const salesOrdersSend = (data) => instance.post(instance.baseURL+'provinceOrders/salesOrdersSend',qs.stringify(data));


//销售订单-审核-通过驳回 请求地址：192.168.18.144:8080/provinceOrders/salesOrdersCheck
export const salesOrdersCheck = (data) => instance.post(instance.baseURL+'provinceOrders/salesOrdersCheck',qs.stringify(data));

//回款方式设置
export const getPaymentList = (data) => instance.get(instance.baseURL+'payment/list',{params:data});

//更改回款方式
export const setPaymentUpdate = (data) => instance.get(instance.baseURL+'payment/update',{params:data});







//政策补货/列表查询
export const getPolicyOweList = (data) => instance.get(instance.baseURL+'provinceOrders/provincePolicyOweList',{params:data});

//政策补货/导出orders/policyOweExcel
export const checkOutPolicyInfo = (data) => instance.post(instance.baseURL+'provinceOrders/provincePolicyOweExcel',qs.stringify(data),{ responseType: 'blob'});

//政策补货/查看详情
export const getPolicyOweDetail = (data) => instance.get(instance.baseURL+'orders/policyOweDetail',{params:data});

//政策补货/审核通过
export const getPolicyOweCheck = (data) => instance.get(instance.baseURL+'orders/policyOweCheck',{params:data});

//订单待处理orders/policyOweDeal
export const getPolicyOweDeal = (data) => instance.get(instance.baseURL+'orders/policyOweDeal',{params:data});



//省区欠货
export const getSQOweList = (data) => instance.get(instance.baseURL+'provinceOrders/provinceOrdersOweList',{params:data});

//省区欠货导出
export const outputSQOweList = (data) => instance.get(instance.baseURL+'provinceOrders/outputProvinceOweList',{params:data});

//省区提醒省区
export const remindProvince = (data) => instance.get(instance.baseURL+'orders/remindProvince',{params:data});

//不许提单
export const notAllow = (data) => instance.get(instance.baseURL+'orders/notAllow',{params:data});

