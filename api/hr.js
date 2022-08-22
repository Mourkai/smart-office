import { myRequest } from '@/util/api.js'
const ModuleName = '/hr'
//9208
//入职申请查询
export function getInduction(data) {
	return myRequest({
		url: ModuleName+'/induction/'+data,
		method:'get',
		loading:true
	})
}

//员工离职申请
export function getUserByPersonChangeId(data) {
	return myRequest({
		url: ModuleName+'/turnover/getUserByPersonChangeId/'+data,
		method:'get',
		loading:true
	})
}

//调动申请
export function tranAndTurnByid(data) {
	return myRequest({
		url: ModuleName+'/transfer/tranAndTurnByid/'+data,
		method:'get',
		loading:true
	})
}

//转正申请
export function regularDetail(data) {
	return myRequest({
		url: ModuleName+'/regularDetail/getById/'+data,
		method:'post',
		loading:true
	})
}
//薪资调整申请
export function changeSalary(data) {
	return myRequest({
		url: ModuleName+'/changeSalary/'+data,
		method:'get',
		loading:true
	})
}


//出差申请
export function businessTravel(data) {
	return myRequest({
		url: ModuleName+'/businessTravel/detail/'+data,
		method:'get',
		loading:true
	})
}

//加班 申请
export function userWorkOver(data) {
	return myRequest({
		url: ModuleName+'/userWorkOver/'+data,
		method:'get',
		loading:true
	})
}

//员工类型
export function getUserEmployeeTypeEnum(data) {
	return myRequest({
		url: ModuleName+'/common/getUserEmployeeTypeEnum',
		method:'get'
	})
}

//获取我的绩效列表
export function evaluationList(data) {
	return myRequest({
		url: ModuleName+'/performanceEvaluation/userEvaluationList',
		method:'post',
		data,
		loading:true
	})
}
//获取我的绩效枚举
export function getCoefficientLevelEnum(data) {
  return myRequest({
  	url: ModuleName+'/performanceCoefficient/getCoefficientLevelEnum',
  	method:'get',
  })
}

//绩效详情
export function evalDetail(data) {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/detail?programmeId='+data.programmeId+'&evaluationId='+data.id,
  	method:'get',
	loading:true
  })
}

//绩效申诉
export function appealEvaluation(data) {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/appealEvaluation',
  	method:'post',
	data,
	loading:true
  })
}

//绩效申诉
export function confirmEvaluation(data) {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/confirmEvaluation',
  	method:'post',
	data,
	loading:true
  })
}

//绩效详情
export function findEvalDetail(id) {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/'+id,
  	method:'get',
	loading:true
  })
}

//查看当前用户是否有待确认绩效
export function isHaveEvaluationUnconfirmed() {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/isHaveEvaluationUnconfirmed',
  	method:'get'
  })
}

//离职详情
export function outDetail(id) {
  return myRequest({
  	url: ModuleName+'/outDetail/'+id,
  	method:'get'
  })
}

//离职原因
export function getReasonsForResignationEnum() {
  return myRequest({
  	url: ModuleName+'/common/getReasonsForResignationEnum',
  	method:'get'
  })
}

//查询绩效申诉详情(流程待办已办中调用)
export function getPerformanceEvaluationByAppealId(id) {
  return myRequest({
  	url: ModuleName+'/performanceEvaluation/getPerformanceEvaluationByAppealId?id='+id,
  	method:'get',
	loading:true
  })
}

