/**
 * Created by yqr on 2018/4/13.
 */
import instance from '../service/http';
import qs from 'qs'
//登录
export const login = (data) => instance.post(instance.baseURL+'login/login',qs.stringify(data));
//获取验证码
export const getCodeData = (data) => instance.post(instance.baseURL+'login/getCode',qs.stringify(data));
//修改密码
export const modifyPWD = (data) => instance.post(instance.baseURL+'login/modifyPassword',qs.stringify(data));
//退出登录
export const loginOut = (data) => instance.post(instance.baseURL+'login/logOut',qs.stringify(data));
//按钮权限
export const nextMenu = (data) => instance.post(instance.baseURL+'menu/nextMenu',qs.stringify(data));


/*export default {
  //登录
  	login: params => {
      	return instance.post(instance.baseURL+'login/login', qs.stringify(params))
  	},
  //退出
  	logout: params => {
      	return instance.post(instance.baseURL+'login/logOut', qs.stringify(params))
  	}
}*/
