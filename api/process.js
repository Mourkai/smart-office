import { myRequest } from '@/util/api.js'
const ModuleName = '/process'
/**
 * 待审批日志 
 * @param {Object} data
 */
export function getOaTask(data) {
	return myRequest({
		url: ModuleName+'/task',
		method:'get',
		loading:true,
		data
	})
}

/**
 * 获取已发布模型选择列表
 * @param {Object} data
 */
export function getDeploySelect(data) {
	return myRequest({
		url: ModuleName+'/deploy/select',
		method:'get',
		data
	})
}


export function getTrackById(data) {
	return myRequest({
		url: ModuleName+'/track/busId/'+data,
		method:'get'
	})
}

//流程 批准
export function adoptById(data) {
	return myRequest({
		url: ModuleName+'/adopt/busId',
		method:'put',
		data
	})
}

//流程 拒绝
export function refuseById(data) {
	return myRequest({
		url: ModuleName+'/refuse/busId',
		method:'put',
		data
	})
}


//流程 转办
export function transferById(data) {
	return myRequest({
		url: ModuleName+'/transfer/busId',
		method:'post',
		data
	})
}

//流程 转发
export function relayById(data) {
	return myRequest({
		url: ModuleName+'/relay/busId',
		method:'post',
		data
	})
}
//流程 加签
export function countersignById(data) {
	return myRequest({
		url: ModuleName+'/countersign/busId',
		method:'post',
		data
	})
}

//流程 退回
export function sendBackById(data) {
	return myRequest({
		url: ModuleName+'/sendBack/busId',
		method:'post',
		data
	})
}

//获取待办分类
export function todoclass() {
	return myRequest({
		url: ModuleName+'/todoclass',
		method:'get',
		loading:true	
	})
}

export function getPendingCount() {
	return myRequest({
		url: ModuleName+'/pendingCount',
		method:'get'
	})
}

//退回节点
export function compleAct(data) {
	return myRequest({
		url: ModuleName+'/compleAct/busId/'+data,
		method:'get'
	})
}
