import { myRequest } from '@/util/api.js'
const ModuleName = '/auth'
/**
 * 登录 
 * @param {Object} data
 */
export function accountLoginRequest(data) {
	return myRequest({
		url: ModuleName+'/login',
		method:'post',
		loading:true,
		data
	})
}

/**
 * 重置密码
 * @param {Object} data
 */
export function resetLoginPassword(data) {
	return myRequest({
		url: ModuleName+'/pwd',
		method:'put',
		data
	})
}

/**
 * 获取重置密码token
 * @param {Object} data
 */
export function retrievePwdToken(data) {
	const param = '?idNum6='+data.idNum6+'&tel='+data.tel
	return myRequest({
		url: ModuleName+'/retrievePwdToken'+param,
		method:'get',
		loading:true
	})
}

/**
 * 获取重置密码token
 * @param {Object} data
 */
export function userLogout(data) {
	return myRequest({
		url: ModuleName+'/logout',
		method:'delete',
		loading:true
	})
}
