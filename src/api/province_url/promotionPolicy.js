import instance from '../../service/http';
import qs from 'qs'
console.log(instance.baseURL);

/*省区促销政策 刘力才接口*/
export const getPromPolicyData = (data) => instance.post(instance.baseURL+'provincePolicyMain/list',qs.stringify(data));

/*省区促销政策 禁用 启用 刘力才接口*/
export const saveBanStatus = (data) => instance.post(instance.baseURL+'policyMain/ban',qs.stringify(data));


/*促销政策---详情页 刘力才接口*/
export const promoPolyDetail = (data) => instance.post(instance.baseURL+'provincePolicyMain/detail',qs.stringify(data));

//政策新增
// 点击添加商品列表 数据
export const getGoods = (data) => instance.post(instance.baseURL+'provincePolicyMain/goodsList',qs.stringify(data));
//适用范围
export const getRangeProvince = (data) => instance.post(instance.baseURL+'userInfo/cityCounty',qs.stringify(data));

export const savePolGoods = (data) => instance.post(instance.baseURL+'policyMain/savePolicy',qs.stringify(data)); // 新增
//政策编辑
export const updatePolicy = (data) => instance.post(instance.baseURL+'policyMain/updatePolicy',qs.stringify(data));











/**/
