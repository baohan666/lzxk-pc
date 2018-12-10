import instance from '../../service/http';
import qs from 'qs'
console.log(instance.baseURL);

/*省区促销政策 李虎接口 会议 列表*/
export const getPromPolicyData = (data) => instance.post(instance.baseURL+'conference/getConferenceList',qs.stringify(data));

/*省区促销政策 李虎接口 导出*/
export const saveBanStatus = (data) => instance.post(instance.baseURL+'conference/outputConference',qs.stringify(data),{ responseType: 'blob'});


/*促销政策---详情页 刘力才接口*/
export const promoPolyDetail = (data) => instance.post(instance.baseURL+'conference/getDetailConference',qs.stringify(data));











/**/
