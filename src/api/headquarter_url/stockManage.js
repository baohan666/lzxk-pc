import instance from '../../service/http';
import qs from 'qs'
/**
 * 省区库存
 */


export const getProStockData = (data) => instance.post(instance.baseURL+'goodsStock/list',qs.stringify(data));
export const exportInfoData = (data) => instance.post(instance.baseURL+'goodsStock/excel',qs.stringify(data),{ responseType: 'blob'});

//省区库存日志
export const getProStockLogData = (data) => instance.post(instance.baseURL+'goodsStockLog/list',qs.stringify(data));


























/**/