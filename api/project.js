import {
	myRequest
} from '@/util/api.js'
const ModuleName = '/project'
//端口 9209
//  项目信息列表
export function getProject(data) {
	return myRequest({
		url: ModuleName + '/projectInfo/list',
		method: 'post',
		loading: true,
		data
	})
}

//  新增日报记录
export function postDailyReport(data) {
	return myRequest({
		url: ModuleName + '/dailyRecord/temporaryOrSubmitDaily',
		method: 'post',
		loading: true,
		data
	})
}


//  日报维护历史数据
export function putDailyReport(data) {
	return myRequest({
		url: ModuleName + '/dailyRecord/temporaryDaily',
		method: 'post',
		loading: true,
		data
	})
}

//  查询日报记录列表
export function getdailyReport(data) {
	return myRequest({
		url: ModuleName + '/dailyReport/list',
		method: 'get',
		loading: true,
		data
	})
}
//获取日报提交月度汇总
export function getDateList(data) {
	return myRequest({
		url: ModuleName + '/dailyRecord/getCalendarList?date=' + data,
		method: 'get'
	})
}


//获取工时列表接口
export function workingHour(data) {
	return myRequest({
		url: ModuleName + '/workingHour/list',
		method: 'get',
		data
	})
}

//获取日报
export function getDaily(data) {
	return myRequest({
		url: ModuleName + '/dailyRecord/queryDailyOne/' + data,
		method: 'get',
		loading: true
	})
}

// 日报智能带出
export function automaticUserInfo() {
  return myRequest({
    url: ModuleName + `/dailyRecord/automaticUserInfo`,
    method: 'get'
  })
}

//工时 - 获取周列表
export function getWorkingHour(data) {
	return myRequest({
		url: ModuleName + '/workingHour/' + data,
		method: 'get',
		loading: true
	})
}

//工时 - 获取工时类型
export function getWorkType() {
	return myRequest({
		url: ModuleName + '/common/getProjectWorkingHourRecordEnum',
		method: 'get'
	})
}

export function submitWorkingHour(data) {
	return myRequest({
		url: ModuleName + '/workingHour/saveBatchDto',
		method: 'post',
		data,
		loading: true
	})
}

//获取正式项目信息详细信息
export function formalProject(data) {
	return myRequest({
		url: ModuleName + '/formalProject/' + data,
		method: 'get',
		loading: true
	})
}

//获取商机信息详细信息
export function businessOpportunity(data) {
	return myRequest({
		url: ModuleName + '/businessOpportunity/' + data,
		method: 'get',
		loading: true
	})
}

//验收申请详情
export function getAcceptanceInfo(data) {
	return myRequest({
		url: ModuleName + '/projectInfo/getAcceptanceInfo/' + data,
		method: 'get',
		loading: true
	})
}

//投标申请详情
export function biddingInfo(data) {
	return myRequest({
		url: ModuleName + '/biddingInfo/' + data,
		method: 'get',
		loading: true
	})
}
//变更申请
export function projectModify(data) {
	return myRequest({
		url: ModuleName + '/projectModify/' + data,
		method: 'get',
		loading: true
	})
}
//结项申请
export function projectClose(data) {
	return myRequest({
		url: ModuleName + '/projectClose/' + data,
		method: 'get',
		loading: true
	})
}
//收款申请
export function invoiceCollection(data) {
	return myRequest({
		url: ModuleName + '/invoiceCollection/' + data,
		method: 'get',
		loading: true
	})
}
//框架投标申请
// export function biddingInfo(data) {
// 	return myRequest({
// 		url: ModuleName + '/biddingInfo/' + data,
// 		method: 'get',
// 		loading: true
// 	})
// }
//工时申请
export function workingHourRecord(data) {
	return myRequest({
		url: ModuleName + '/workingHourRecord/' + data,
		method: 'get',
		loading: true
	})
}
// 开票申请
export function invoiceRequisition(data) {
	return myRequest({
		url: ModuleName + '/invoiceRequisition/' + data,
		method: 'get',
		loading: true
	})
}

//售前申请 
export function presalesProject(data) {
	return myRequest({
		url: ModuleName + '/presalesProject/' + data,
		method: 'get',
		loading: true
	})
}
//周报申请
export function weekReport(data) {
	return myRequest({
		url: ModuleName + '/weekReport/' + data,
		method: 'get',
		loading: true
	})
}
//中标申请project /noticeAward/{id}
export function noticeAward(data) {
	return myRequest({
		url: ModuleName + '/noticeAward/' + data,
		method: 'get',
		loading: true
	})
}


//获取正式项目信息详细信息
// export function formalProject(data) {
// 	return myRequest({
// 		url: ModuleName + '/formalProject/'+data,
// 		method: 'get',
// 		loading: true
// 	})
// }

//获取商机信息详细信息
// export function businessOpportunity(data) {
// 	return myRequest({
// 		url: ModuleName + '/businessOpportunity/'+data,
// 		method: 'get',
// 		loading: true
// 	})
// }

//验收申请详情
export function projectAcceptance(data) {
	return myRequest({
		url: ModuleName + '/projectAcceptance/' + data,
		method: 'get',
		loading: true
	})
}

export function getProjectAll(id) {
	return myRequest({
		url: `/project/projectInfo/getProjectInfoAll/${id}`,
		method: 'get'
	});
}
// 获取项目调入人员详细信息
export function getAddPersonRecord(data) {
	return myRequest({
		url: ModuleName + '/addPersonRecord/getDetail/',
		method: 'get',
		data
	});
}


//获取正式项目信息详细信息
// export function formalProject(data) {
// 	return myRequest({
// 		url: ModuleName + '/formalProject/'+data,
// 		method: 'get',
// 		loading: true
// 	})
// }

//获取商机信息详细信息
// export function businessOpportunity(data) {
// 	return myRequest({
// 		url: ModuleName + '/businessOpportunity/'+data,
// 		method: 'get',
// 		loading: true
// 	})
// }

//减员申请 
export function deletePersonRecord(id) {
	return myRequest({
		url: ModuleName + `/deletePersonRecord/getDetail?relationshipId=${id}`,
		method: 'get'
	})
}

export function getProjectInfo(id) {
	return myRequest({
		url: `/project/projectInfo/${id}`,
		method: 'get'
	});
}

//付款合同签署申请
export function contractPaymentInfo(data) {
	return myRequest({
		url: ModuleName + `/contractPaymentInfo/`+data,
		method: 'get',
		loading: true
	})
}
//预算编制申请 
export function projectBudget(data) {
	return myRequest({
		url: ModuleName + `/projectBudget/`+data,
		method: 'get',
		loading: true
	})
}

// 获取合同详情
export function getSignContractDetail(data) {
  return myRequest({
    url: ModuleName + `/contractInfo/` + data,
    method: 'get',
  });
}
// 获取合同类型
export function getContractType() {
  return myRequest({
    url: ModuleName + '/common/getContractTypeList',
    method: 'get',
  });
}
//获取项目结项详情
export function getProjectClose(data) {
  return myRequest({
    url: ModuleName + '/projectClose/' + data,
    method: 'get'
  });
}


//项目级别枚举
export function getProjectLevelEnum() {
  return myRequest({
    url: ModuleName + '/common/getProjectLevelEnum',
    method: 'get'
  });
}

//项目类型枚举
export function getProjectTypeEnum() {
  return myRequest({
    url: ModuleName + '/common/getProjectTypeEnum',
    method: 'get'
  });
}

//付款合同付款申请详情
export function invoicePayment(data) {
  return myRequest({
    url: ModuleName + '/invoicePayment/getByContractId/'+data,
    method: 'get'
  });
}

//招标方式 枚举
export function getBiddingModeEnum(data) {
  return myRequest({
    url: ModuleName + '/common/getBiddingModeEnum',
    method: 'get'
  });
}

//合同类型 枚举
export function getProjectContractTypeEnum() {
  return myRequest({
    url: ModuleName + '/common/getProjectContractTypeEnum',
    method: 'get'
  });
}

//付款申请 代办
export function getById(data) {
  return myRequest({
    url: ModuleName + '/invoicePayment/getById/'+data,
    method: 'get'
  });
}

export function dailyRecordComment(data) {
  return myRequest({
    url: ModuleName + '/projectDailyRecordComment',
    method: 'post',
	data
  });
}

export function dailyRecordCommentList(data) {
  return myRequest({
    url: ModuleName + '/projectDailyRecordComment/list',
    method: 'post',
	data,
	loading: true
  });
}

//删除评论
export function dailyRemoveComment(commentId) {
  return myRequest({
    url: ModuleName + '/projectDailyRecordComment/'+commentId,
    method: 'delete',
	loading: true
  });
}

export function projectAddBudget(id) {
  return myRequest({
    url: ModuleName + '/projectAddBudget/'+id,
    method: 'get',
	loading: true
  });
}

//已中标详细数据
export function winbidderDetail(id) {
  return myRequest({
    url: ModuleName + '/biddingInfo/winningBiddingInfo/'+id,
    method: 'post'
  });
}

//客户名称及客户联系人
export function customernameData(data) {
	return myRequest({
	  url: ModuleName + '/common/getCustomerInfoList',
	  method: 'get',
	  data
	});
}

// 获取投标编码
export function listAndNoticeCode(data) {
  return myRequest({
    url: ModuleName + '/biddingInfo/listAndNoticeCode',
    method: 'post',
	data:null
  });
}

// 获取影响级别枚举
export function getInfluenceLevelEnumEnumMap() {
  return myRequest({
    url: ModuleName + '/common/getInfluenceLevelEnumEnumMap',
    method: 'get'
  });
}

// 获取项目变更状态枚举
export function getProjectModifyStatusEnumMap() {
  return myRequest({
    url: ModuleName + '/common/getProjectModifyStatusEnumMap',
    method: 'get'
  });
}

//风险详情
export function projectRiskRegister(id) {
  return myRequest({
    url: ModuleName + '/projectRiskRegister/detail/'+id,
    method: 'get'
  });
}

export function getRiskProbabilityEnumMap() {
  return myRequest({
    url: ModuleName+`/common/getRiskProbabilityEnumMap`,
    method: "get",
  });
}

// 获取产生的影响枚举
export function getRiskInfluenceEnumMap() {
  return myRequest({
    url: ModuleName+`/common/getRiskInfluenceEnumMap`,
    method: "get",
  });
}

export function getRiskStatusEnumMap() {
  return myRequest({
    url: ModuleName+`/common/getRiskStatusEnumMap`,
    method: "get",
  });
}
