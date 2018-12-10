
import instance from '../service/http';
import qs from 'qs'

/*
 获取阿里云参数
 * */
export const getAliOssUrlData = (data) => instance.post(instance.baseURL+"goods/getAliOssUrl",qs.stringify(data));


/**
 * 获取省地县地址
 */
export const getAddressData = (data) => instance.post(instance.baseURL+'sysDictArea/getSysDictArea',qs.stringify(data));

/*
 获取部门
 * */
export const getDepartmentData = (data) => instance.post(instance.baseURL+'role/dept',qs.stringify(data));

