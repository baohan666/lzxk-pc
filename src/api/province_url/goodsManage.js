import instance from '../../service/http';
import qs from 'qs'



/*
* 省区：商品管理：在售商品
*/
//在售商品列表
export const getOnsalegoodsData = (data) => instance.post(instance.baseURL+'provinceGoods/pageProvinceGoodsList',qs.stringify(data));
//剂型下拉列表
export const getdrugTypeData = (data) => instance.post(instance.baseURL+'goods/drugTypeList',qs.stringify(data));
//生产企业下拉列表
export const getManufacturData = (data) => instance.post(instance.baseURL+'goods/manufacturerList',qs.stringify(data));
//物料类别下拉列表
export const getCategoryListData = (data) => instance.post(instance.baseURL+'goods/categoryList',qs.stringify(data));
//导出
export const exportData = (data) => instance.post(instance.baseURL+'xlsExcel/exportProGoods',qs.stringify(data),{ responseType: 'blob'});

/*
省区：商品管理：在售商品：查看商品详情
*/
//商品详情
export const getGoodDetaiData = (data) => instance.post(instance.baseURL+'provinceGoods/getGoodsDetail',qs.stringify(data));
//查看可见范围
export const getVisRangeData = (data) => instance.post(instance.baseURL+'provinceGoods/getProOrgTreeList',qs.stringify(data));

/*
省区：商品管理：调研商品
*/
//1.1商品调研-分页
export const getGoodResearData = (data) => instance.post(instance.baseURL+'goodsPre/list',qs.stringify(data));
//导出
export const exportGoodReData = (data) => instance.post(instance.baseURL+'goodsPre/excel',qs.stringify(data),{ responseType: 'blob'});

/*
*调研商品详情页
*/
//1.2.1 商品调研-详情(两部分   01)--基本信息
export const getGoodReBaseData = (data) => instance.post(instance.baseURL+'goodsPre/detail',qs.stringify(data));
//1.2.2 商品调研-详情(两部分   02)--需求明细
export const getGoodReDemaData = (data) => instance.post(instance.baseURL+'goodsPreCollect/list',qs.stringify(data));

/*
 下架编辑页面
 * */
export const toSaveData = (data) => instance.post(instance.baseURL+'goods/updateGoods',qs.stringify(data));
export const toSaveUploadData = (data) => instance.post(instance.baseURL+'goods/updateGoods',qs.stringify(data));


/*
 上传商品
 * */
export const uploadGoods = (data) => instance.post(instance.baseURL+'goods/addGoods',qs.stringify(data));


//价格管理
//按药品 于婷 ok
export const getPricManagDrugData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/proPageListForGoods',qs.stringify(data));
//按区域经理 于婷 ok
export const getPricManagAreaData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/proPageListForUser',qs.stringify(data));
//按药品改价弹层详情 于婷 ok
export const getChaPriceData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/getGoodsAndPriceInfo',qs.stringify(data));
//按药品改价弹层详情 于婷 ok bug1 更改接口
export const getChaPriceData_1 = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/updateProvinceStandardPrice',qs.stringify(data));
//按药品改价详情 提交 于婷 ok
export const getStandardPriceData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/changePartPrice',qs.stringify(data));
//按区域改价详情 于婷                                                         provinceGoodsPrice/proPageListForUser
export const getBatchChaPriceData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/batchChangePrice',qs.stringify(data));
//按药品提交改价
export const saveChangePriceData = (data) => instance.post(instance.baseURL+'goodsPrice/commitProvincePrice',qs.stringify(data));
//修改个别区域价格
export const changePartPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/changePartPrice',qs.stringify(data));
//按药品提交改价  于婷 ok
export const saveBatchChaPriceData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/commitBatchChangePrice',qs.stringify(data));
//按药品修改个别区域提交改价 于婷 ok
export const saveBatchPartChaPriceData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/commitCountyPrice',qs.stringify(data));



//改价日志 于婷  ok
export const getChangePriceLogData = (data) => instance.post(instance.baseURL+'provinceGoodsPrice/toShowChangePriceLog',qs.stringify(data));

//改价申请单 列表 于婷
export const getApplyChaPricData = (data) => instance.post(instance.baseURL+'provinceChangePriceApply/proApplyPageList',qs.stringify(data));
//改价申请单 导出表格 于婷
export const exportApplyChaPriData = (data) => instance.post(instance.baseURL+'xlsExcel/exportProCpa',qs.stringify(data),{ responseType: 'blob'});

export const getCheckStatusData = (data) => instance.post(instance.baseURL+'changePriceApply/checkApply',qs.stringify(data));

//改价申请单 详情 列表页 于婷 ok
export const getApplyFormDetailData = (data) => instance.post(instance.baseURL+'provinceChangePriceApply/toShowApplicationInfo',qs.stringify(data));
//改价申请单 详情 列表页 撤回 于婷
export const checkApplyPassData = (data) => instance.post(instance.baseURL+'provinceChangePriceApply/rebackApply',qs.stringify(data));

export const approveApplyPassData = (data) => instance.post(instance.baseURL+'changePriceApply/approveApply',qs.stringify(data));






/**/
