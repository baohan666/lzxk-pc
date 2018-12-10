import instance from '../../service/http';
import qs from 'qs'
/**
 * 省区库存
 */
//省区库存展示
export const getProStockData = (data) => instance.post(instance.baseURL+'goodsStock/provinceList',qs.stringify(data));
//省区库存-修改库存-回显
export const toUpdateGoodsStock = (data) => instance.post(instance.baseURL+'goodsStock/toUpdateGoodsStock',qs.stringify(data));
//省区库存-修改库存-保存
export const updateGoodsStock = (data) => instance.post(instance.baseURL+'goodsStock/updateGoodsStock',qs.stringify(data));
//导出
export const exportInfoData = (data) => instance.post(instance.baseURL+'goodsStock/provinceExcel',qs.stringify(data),{ responseType: 'blob'});

//省区库存日志
export const getProStockLogData = (data) => instance.post(instance.baseURL+'goodsStockLog/list',qs.stringify(data));


























/**/
