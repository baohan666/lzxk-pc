import instance from '../../service/http';
import qs from 'qs'
/*财务管理*/
export const getRetuMoneyData = (data) => instance.post(instance.baseURL+'collection/list',qs.stringify(data));
export const exportRetuMoneyData = (data) => instance.post(instance.baseURL+'collection/excel',qs.stringify(data),{ responseType: 'blob'});
export const saveCheckData = (data) => instance.post(instance.baseURL+'collection/check',qs.stringify(data));
export const reasonRefuseData = (data) => instance.post(instance.baseURL+'collection/reject',qs.stringify(data));
//省区回款详情
export const getProCollectionLogData = (data) => instance.post(instance.baseURL+'collection/detail',qs.stringify(data));
