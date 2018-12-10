import instance from '../../service/http';
import qs from 'qs'
console.log(instance.baseURL);

/*促销政策*/
export const getPromPolicyData = (data) => instance.post(instance.baseURL+'policyMain/list',qs.stringify(data));
export const saveBanStatus = (data) => instance.post(instance.baseURL+'policyMain/ban',qs.stringify(data));


//促销政策---详情页
export const promoPolyDetail = (data) => instance.post(instance.baseURL+'policyMain/detail',qs.stringify(data));

//政策新增
export const getGoods = (data) => instance.post(instance.baseURL+'policyMain/goodsList',qs.stringify(data));
export const getRangeProvince = (data) => instance.post(instance.baseURL+'policyMain/province',qs.stringify(data));
export const savePolGoods = (data) => instance.post(instance.baseURL+'policyMain/savePolicy',qs.stringify(data));
//政策编辑
export const updatePolicy = (data) => instance.post(instance.baseURL+'policyMain/updatePolicy',qs.stringify(data));










/**/
