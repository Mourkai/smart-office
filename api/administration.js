import { myRequest } from '@/util/api.js'
const ModuleName = '/administration'
/**
 * 获取非项目用印详细信息 
 * @param {Object} data
 */
export function nonProjectSeal(data) {
	return myRequest({
		url: ModuleName+'/nonProjectSeal/'+data,
		method:'get',
		loading:true
	})
}

/**
 * 获取项目用印详细信息 
 * @param {Object} data
 */
export function projectSeal(data) {
	return myRequest({
		url: ModuleName+'/projectSeal/'+data,
		method:'get',
		loading:true
	})
}


//获取印章类型枚举类
export function getSealTypeEnumMap() {
	return myRequest({
		url: ModuleName + '/common/getSealTypeEnumMap',
		method: 'get'
	})
}

//获取用印类型枚举类
export function getUseSealTypeEnumMap() {
	return myRequest({
		url: ModuleName + '/common/getUseSealTypeEnumMap',
		method: 'get'
	})
}

export function selectListByType(data) {
	return myRequest({
		url: ModuleName + '/purchaseInfo/selectListByType',
		method: 'get',
		data
	})
}

//电脑租赁
export function computerRentalInfo(data) {
	return myRequest({
		url: ModuleName + '/computerRentalInfo/'+data,
		method: 'get',
		data
	})
}

//行政采购
export function purchaseInfo(data) {
	return myRequest({
		url: ModuleName + '/purchaseInfo/'+data,
		method: 'get',
		data
	})
}

//修改电脑租赁的list
export function updateComputerList(data) {
	return myRequest({
		url: ModuleName + '/computerRentalDetail/updateByList',
		method: 'post',
		data
	})
}

//修改行政采购list
export function updatePurchaseList(data) {
	return myRequest({
		url: ModuleName + '/purchaseDetail/updateByList',
		method: 'post',
		data
	})
}


