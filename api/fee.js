import { myRequest } from '@/util/api.js'
const ModuleName = '/fee'

//入职申请查询
export function getInduction(data) {
	return myRequest({
		url: ModuleName+'/induction/'+data,
		method:'get',
		loading:true
	})
}

//备用金申请详情
export function projectImprest(data) {
	return myRequest({
		url: ModuleName + '/projectImprest/'+data,
		method: 'get',
		loading: true
	})
}

//物资采购申请
export function projectMaterial(data) {
	return myRequest({
		url: ModuleName + '/projectMaterial/'+data,
		method: 'get',
		loading: true
	})
}

//项目报销申请 
export function projectReimbursement(data) {
	return myRequest({
		url: ModuleName + '/projectReimbursement/info-dto/'+data,
		method: 'get',
		loading: true
	})
}

//项目报销申请明细
export function projectReimbursementRecord(data) {
	return myRequest({
		url: ModuleName + '/projectReimbursementRecord/'+data,
		method: 'get',
		loading: true
	})
}


//非项目报销申请
export function nonProjectReimbursement(data) {
	return myRequest({
		url: ModuleName + '/nonProjectReimbursement/process/detail/'+data,
		method: 'get',
		loading: true
	})
}


//投标保证金
export function bidBail(data) {
	return myRequest({
		url: ModuleName + '/bidBail/'+data,
		method: 'get',
		loading: true
	})
}

//中标服务费
export function bidService(data) {
	return myRequest({
		url: ModuleName + '/bidService/'+data,
		method: 'get',
		loading: true
	})
}

//项目付款申请
export function projectPay(data) {
	return myRequest({
		url: ModuleName + '/projectPay/'+data,
		method: 'get',
		loading: true
	})
}

//获取报销科目枚举类
export function getReimbursementTypeEnum() {
	return myRequest({
		url: ModuleName + '/common/getReimbursementTypeEnum',
		method: 'get',
		loading: true
	})
}

export function getPayTypeEnum() {
	return myRequest({
		url: ModuleName + '/common/getPayTypeEnum',
		method: 'get',
		loading: true
	})
}

//付款申请
export function paymentDetail(id) {
	return myRequest({
		url: ModuleName + '/payment/detail/'+id,
		method: 'get',
		loading: true
	})
}

//付款科目
export function reimbursementTypeList(data) {
	return myRequest({
		url: ModuleName + '/reimbursementType/list',
		method: 'post',
		data
	})
}

//差旅报销申请
export function reimbursementDetail(data) {
	return myRequest({
		url: ModuleName + '/reimbursement/detail/'+data,
		method: 'get'
	})
}

//获取交通方式
export function getTraffic(data) {
	return myRequest({
		url: ModuleName + '/reimbursement/getTraffic',
		method: 'get'
	})
}

//获取交通方式 市内
export function getTrafficCity(data) {
	return myRequest({
		url: ModuleName + '/reimbursement/getTrafficCity',
		method: 'get'
	})
}
