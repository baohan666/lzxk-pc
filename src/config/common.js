	
  import {getDepartmentData} from 'src/api/headquarter_url/goodsManage';
  import {setStore} from 'src/config/cache'
  	
	
//获取部门
export const getDepartment = function(){
		let this_=this;
		getDepartmentData("").then(function(res){
			setStore('departmentMenu',res.data.data);
		})
	}
