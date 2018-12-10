import instance from '../../service/http';
import qs from 'qs'
/**
 * 获取意见反馈页面相关数据数据getFeedbackData---table;getFeedbackDetail---详情页；exportData----导出
 */

export const getFeedbackData = (data) => instance.post(instance.baseURL+'feedback/list',qs.stringify(data));
export const getFeedbackDetail = (data) => instance.post(instance.baseURL+'feedback/detail',qs.stringify(data));
export const exportData = (data) => instance.post(instance.baseURL+'feedback/excel',qs.stringify(data),{ responseType: 'blob'});

/**
 * 获取销管范围数据getSalescopeData----table；
 */
export const getSalescopeData = (data) => instance.post(instance.baseURL+'userProvince/list',qs.stringify(data));
export const getEditData = (data) => instance.post(instance.baseURL+'userProvince/dept',qs.stringify(data));
export const getAddData = (data) => instance.post(instance.baseURL+'userProvince/add',qs.stringify(data));
export const AddSure = (data) => instance.post(instance.baseURL+'userProvince/saveAdd',qs.stringify(data));
export const editSure = (data) => instance.post(instance.baseURL+'userProvince/saveEdit',qs.stringify(data));
export const getProinceByDeptId = (data) => instance.post(instance.baseURL+'userProvince/getProinceByDeptId',qs.stringify(data));

/*
 有无销售人员
 * */
/*export const getSalestaffData = (data) => instance.post(instance.baseURL+'isSaleMan/list',qs.stringify(data));
export const getProvinceData = (data) => instance.post(instance.baseURL+'isSaleMan/province',qs.stringify(data));
export const operatForbidden = (data) => instance.post(instance.baseURL+'isSaleMan/ban',qs.stringify(data));*/
//有无销售-分页
export const staffSalesList = (data) => instance.post(instance.baseURL+'staffSales/list',qs.stringify(data));
//有无销售-人员状态下拉
export const commonUserStatus = (data) => instance.post(instance.baseURL+'common/userStatus',qs.stringify(data));
//有无销售-省区下拉
export const staffSalesPullDown = (data) => instance.post(instance.baseURL+'staffSales/pullDown',qs.stringify(data));
//有无销售记录
export const staffSalesLog = (data) => instance.post(instance.baseURL+'staffSales/log',qs.stringify(data));
//导出
export const staffSalesExcel = (data) => instance.post(instance.baseURL+'staffSales/excel',qs.stringify(data),{ responseType: 'blob'});

/*
 人员申请单
 * */
export const getPersonAplData = (data) => instance.post(instance.baseURL+'userApplyInfo/list',qs.stringify(data));
//人员申请单--点击未读变已读
export const userApplyInfoIsRead = (data) => instance.post(instance.baseURL+'userApplyInfo/isRead',qs.stringify(data));
/*
* 人员申请单--详情
* */
export const getdDetailPAData = (data) => instance.post(instance.baseURL+'userApplyInfo/detail',qs.stringify(data));
//4.6 人员申请单--审核(通过、不通过、暂缓、撤回)
export const userApplyInfoCheck = (data) => instance.post(instance.baseURL+'userApplyInfo/check',qs.stringify(data));
//4.7 人员申请单--编辑后保存
export const userApplyInfoEditSave = (data) => instance.post(instance.baseURL+'userApplyInfo/editSave',qs.stringify(data));

/*export default {
    //获取首页数据
    getFeedbackData(data){
        return instance.post(instance.baseUrl+"feedbackList",qs.stringify(data))
    }

}*/





