import {getNavbar} from '../service/getData'

export default {
	/*登录成功获取导航栏数据*/
	async getNavbarData({commit,state}){
		let res = await getNavbar();
		commit(getNavbarInfo, res)
	}	
}