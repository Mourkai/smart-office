import { myRequest } from '@/util/api.js'
const ModuleName = '/msg'
/**
 * 消息列表 
 * @param {Object} data
 */
export function index() {
	return myRequest({
		url: ModuleName,
		method:'get',
		loading:true
	})
}

export function del(id) {
	return myRequest({
		url: ModuleName+'/by/'+id,
		method:'DELETE'
	})
}

export function count() {
	return myRequest({
		url: ModuleName+'/count',
		method:'get'
	})
}

export function group(data) {
	return myRequest({
		url: ModuleName+'/group',
		method:'get',
		data
	})
}

//清空对应的消息数量
export function clearDot(id) {
	return myRequest({
		url: ModuleName+'/'+id+'/view',
		method:'put'
	})
}


//清空对应群组的消息数量
export function clearGroupDot(data) {
	return myRequest({
		url: ModuleName+'/group/project/daily/comment/view',
		method:'put',
		data
	})
}

//待办消息
export function notice(data) {
	return myRequest({
		url: ModuleName+'/notice',
		method:'get',
		data
	})
}




export function getAuthToken(data) {
	uni.request({
		url: 'https://restapi.getui.com/v2/R9Goea30JX6wOR9aOsUjX3/auth',
		header:{
			'content-type':'application/json;charset=utf-8'
		},
		method:'post',
		data,
		success(res){
			return res
		},
		fail(res){
			return res
		}
	})
}


export function pushToSingle(data,token) {
	uni.request({
		url: 'https://restapi.getui.com/v2/R9Goea30JX6wOR9aOsUjX3/push/single/cid',
		method:'post',
		header:{
			'Content-Type':'application/json;charset=utf-8',
			token
		},
		data,
		success(res){
			plus.runtime.setBadgeNumber(1)
			console.log('推送成功',res)
		},
		fail(res){
			console.log(res);
		}
	})
}


//首页公告
export function indexNotice() {
	return myRequest({
		url: ModuleName+'/notice/public/up',
		method:'get'
	})
}

//根据type获取数量
export function getNumByType(type) {
	return myRequest({
		url: ModuleName+`/types/${type}/status`,
		method:'get'
	})
}
