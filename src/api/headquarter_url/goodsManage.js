import instance from '../../service/http';
import qs from 'qs'



/**
 * 获取总部在售、下架商品页面初始化数据getFeedbackData---table;getCategoryListData---物料类别；exportData----导出
 */
export const getOnsalegoodsData = (data) => instance.post(instance.baseURL+'goods/pageGoodsList',qs.stringify(data));
export const getCategoryListData = (data) => instance.post(instance.baseURL+'goods/categoryList',qs.stringify(data));
export const getdrugTypeData = (data) => instance.post(instance.baseURL+'goods/drugTypeList',qs.stringify(data));
export const getManufacturData = (data) => instance.post(instance.baseURL+'goods/manufacturerList',qs.stringify(data));

export const getUpateGdData = (data) => instance.post(instance.baseURL+'goods/upateGoodStatus',qs.stringify(data));
export const exportData = (data) => instance.post(instance.baseURL+'xlsExcel/exportGoods',qs.stringify(data),{ responseType: 'blob'});

/*
 查看详情可见范围
 * */
export const getGoodDetaiData = (data) => instance.post(instance.baseURL+'goods/getGoodsDetail',qs.stringify(data));
export const getVisRangeData = (data) => instance.post(instance.baseURL+'goods/getAllOrgTreeList',qs.stringify(data));

/*
 下架编辑页面
 * */
export const toSaveData = (data) => instance.post(instance.baseURL+'goods/updateGoods',qs.stringify(data));
export const toSaveUploadData = (data) => instance.post(instance.baseURL+'goods/updateGoods',qs.stringify(data));


/*
 上传商品
 * */
export const uploadGoods = (data) => instance.post(instance.baseURL+'goods/addGoods',qs.stringify(data));


/*调研商品*/
export const getGoodResearData = (data) => instance.post(instance.baseURL+'goodsPre/list',qs.stringify(data));
export const exportGoodReData = (data) => instance.post(instance.baseURL+'xlsExcel/exportProGoods',qs.stringify(data),{ responseType: 'blob'});
export const addGoodReData = (data) => instance.post(instance.baseURL+'goodsPre/save',qs.stringify(data));
export const delGoodReData = (data) => instance.post(instance.baseURL+'goodsPre/delete',qs.stringify(data));
export const editSaveGoodReData = (data) => instance.post(instance.baseURL+'goodsPre/editSave',qs.stringify(data));

//调研商品详情页
export const getGoodReBaseData = (data) => instance.post(instance.baseURL+'goodsPre/detail',qs.stringify(data));
export const getGoodReDemaData = (data) => instance.post(instance.baseURL+'goodsPreCollect/list',qs.stringify(data));


//价格管理
//按药品
export const getPricManagDrugData = (data) => instance.post(instance.baseURL+'goodsPrice/pageListForGoods',qs.stringify(data));
//按区域
export const getPricManagAreaData = (data) => instance.post(instance.baseURL+'goodsPrice/pageListForUser',qs.stringify(data));
//按药品改价详情
export const getChaPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/getGoodsInfo',qs.stringify(data));
//按区域改价详情
export const getBatchChaPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/batchChangePrice',qs.stringify(data));
//按药品提交改价
export const saveChangePriceData = (data) => instance.post(instance.baseURL+'goodsPrice/commitProvincePrice',qs.stringify(data));
//修改个别区域价格
export const changePartPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/changePartPrice',qs.stringify(data));
//按药品提交改价
export const saveBatchChaPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/commitBatchChangePrice',qs.stringify(data));
//按药品修改个别区域提交改价
export const saveBatchPartChaPriceData = (data) => instance.post(instance.baseURL+'goodsPrice/commitCountyPrice',qs.stringify(data));



//改价日志
export const getChangePriceLogData = (data) => instance.post(instance.baseURL+'goodsPrice/toShowChangePriceLog',qs.stringify(data));

//改价申请单
export const getApplyChaPricData = (data) => instance.post(instance.baseURL+'changePriceApply/applyPageList',qs.stringify(data));
export const exportApplyChaPriData = (data) => instance.post(instance.baseURL+'xlsExcel/exportCpa',qs.stringify(data),{ responseType: 'blob'});
export const getCheckStatusData = (data) => instance.post(instance.baseURL+'changePriceApply/checkApply',qs.stringify(data));
export const getApplyFormDetailData = (data) => instance.post(instance.baseURL+'changePriceApply/toShowApplicationInfo',qs.stringify(data));
export const checkApplyPassData = (data) => instance.post(instance.baseURL+'changePriceApply/checkApply',qs.stringify(data));
export const approveApplyPassData = (data) => instance.post(instance.baseURL+'changePriceApply/approveApply',qs.stringify(data));






/**/
