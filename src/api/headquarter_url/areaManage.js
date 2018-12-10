import instance from '../../service/http';
import qs from 'qs'
//行政区管理   总部省区 都是接口没变 

export const getList = (data) => instance.get(instance.baseURL+'sysDictArea/getSysDictAreaUserInfo',{params:data});

//关联
export const getAllProvince = (data) => instance.get(instance.baseURL+'sysDictArea/getArea',{params:data});

//sysDictArea/saveArea 关联
export const saveArea = (data) => instance.post(instance.baseURL+'sysDictArea/saveArea',qs.stringify(data));

//sysDictArea/checkArea 查看
export const checkArea = (data) => instance.post(instance.baseURL+'sysDictArea/checkArea',qs.stringify(data));


//sysDictArea/updateArea //修改
export const updateArea = (data) => instance.post(instance.baseURL+'sysDictArea/updateArea',qs.stringify(data));

//outputSysDictArea //导出
export const outputSysDictArea = (data) => instance.post(instance.baseURL+'sysDictArea/outputSysDictArea',qs.stringify(data),{ responseType: 'blob'});

//作废接口
export const getAllCity = (data) => instance.get(instance.baseURL+'sysDictArea/getAllCity',{params:data});

// 作废接口
export const relevanceSysDictArea = (data) => instance.post(instance.baseURL+'sysDictArea/relevanceSysDictArea',qs.stringify(data));







