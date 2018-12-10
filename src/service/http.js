/**
 * http配置
 */
import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'
import {getStore} from 'src/config/cache'

const instance=axios.create();
// axios 配置

//网络连接失败(连接不上)的时候，延迟5s报错吗
instance.defaults.timeout = 15000
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
  //配置生产接口域名
  instance.baseURL="http://192.168.14.32:8082/lzxk/"
}else{
  //配置开发接口域名


   instance.baseURL="http://192.168.18.135:8080/" // 经理
// instance.baseURL="http://17.17.1.174:8080/"  // 经理
//instance.baseURL="http://192.168.18.144:8080/" // 刘力才
//instance.baseURL="http://192.168.18.146:8080/"  // 于婷
// instance.baseURL="http://192.168.18.142:8080/"  // 李虎



}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

//把 token 放在请求的头部。
axios.interceptors.request.use=instance.interceptors.request.use
instance.interceptors.request.use(
  config => {
    //在请求拦截器中配置公共参数 sessionId
	//const sessionId = "9999";
    // 如果是post请求就把默认参数拼到data里面
    // 如果是get请求就拼到params里面
   let accountNum = '';
    if(getStore('accountNum')){
      accountNum = getStore('accountNum');
    }

    let accountName = '';
    if(getStore('accountName')){
      accountName = getStore('accountName');
    }
    if(config.method === 'post'){
        let data = qs.parse(config.data);
        config.data = qs.stringify({
            accountNum: accountNum,
            accountName: accountName,
            ...data
        });
    }else if(config.method === 'get') {
         config.params = {
            accountNum: accountNum,
            ...config.params
        }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
  	if(response.data.code&&response.data.code!=1){
	   alert(response.data.msg);
	   return Promise.reject(response.data);
	}else{
    	return response
	}



  },
  error => {
  	console.log(error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    return Promise.reject(error);
//  return Promise.reject(error.response.data)
  },
)

export default instance


