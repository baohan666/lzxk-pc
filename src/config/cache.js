import {getDepartmentData, getAliOssUrlData} from 'src/api/api_components';
 
 /*
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 
//获取部门数据并缓存
export const setDepartment = () => {
	let this_=this;
	getDepartmentData({roleId: 1}).then(res => {
		setStore('departmentMenu',res.data.data);
		return res.data.data
	})	
}
/*
 获取阿里云参数
 * */
export const getAliOssUrl = function(){
	let this_=this;
	let AliOssUrlist=[];
	getAliOssUrlData("").then(function(res){
		setStore('AliOssUrlist',res.data.data);
	})
	return AliOssUrlist;
}