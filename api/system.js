import {
	myRequest,
	SOCKET_URL
} from '@/util/api.js'
const ModuleName = '/system'
import main from '../main.js'
/**
 * 通讯录 
 * @param {Object} data
 */
export function getAppUserList(data) {
	return myRequest({
		url: ModuleName + '/user/getAppUserList',
		method: 'post',
		data,
		loading: true
	})
}
/**
 * 获取用户信息 
 * @param {Object} data
 */
export function getUserInfo(data) {
	return myRequest({
		url: ModuleName + '/user/getUserById/' + data,
		method: 'get',
		loading: true
	})
}

/**
 * 获取自己的信息
 * @param {Object} data
 */
export function getMyInfo() {
	return myRequest({
		url: ModuleName + '/user/getInfo',
		method: 'get',
		loading: true
	})
}


/**
 * 获取自己的信息
 * @param {Object} data
 */
export function getProcessCategory() {
	return myRequest({
		url: ModuleName + '/dict/data/type/process_category',
		method: 'get'
	})
}


//常用地区
export function areaCommon() {
	return myRequest({
		url: ModuleName + '/areaCommon/list',
		method: 'post',
	})
}

//所有城市
export function allArea() {
	return myRequest({
		url: ModuleName + '/areaInfo/areaList',
		method: 'get',
		loading: true
	})
}


/**
 * 获取组织人员信息
 * @param {Object} data
 */
export function getUserBaseList() {
	return myRequest({
		url: ModuleName + '/user/baseList',
		method: 'get'
	})
}

/**
 * 获取审批状态字典值
 * @param {Object} data
 */
export function getProcessStatus() {
	return myRequest({
		url: ModuleName + '/dict/data/type/process_status',
		method: 'get'
	})
}

//  工作城市 
export function getOneArea(id) {
	return myRequest({
		url: ModuleName + '/areaCommon/' + id,
		method: 'get',
	})
}



//  获取用户详细信息 
export function turnByUserId(id) {
	return myRequest({
		url: ModuleName + '/workInfo/turnByUserId/' + id,
		method: 'get',
	})
}

// 付凯伟
// 获取客户详情
export function getCustomerInfo(data) {
	return myRequest({
		url: ModuleName + '/customerInfo/info-dto/' + data,
		method: 'get'
	});
}
// 客户企业性质枚举
export function getCustomerNatureEnum() {
	return myRequest({
		url: ModuleName + '/common/getCustomerNatureEnum',
		method: 'get'
	});
}

// 供应商申请详情
export function supplierInfo(data) {
	return myRequest({
		url: ModuleName + '/supplierInfo/info-dto/' + data,
		method: 'get'
	});
}
// 客户
export function customerDepartment(data) {
	return myRequest({
		url: ModuleName + '/customerDepartment/info-dto/' + data,
		method: 'get'
	});
}

export function appUpdate(data) {
	return myRequest({
		url: ModuleName+'/config/app',
		method:'GET'
	})
}

export const connectSocket = (data)=>{
	uni.connectSocket({
		url: SOCKET_URL+'/msg/websocket?token=' + data.token+'&userId='+data.userId+'&source=1',
		success:(r)=>{
			console.log(r);
		},
		fail:(r)=>{
			console.log(r);
		}
	});
	uni.onSocketOpen(function(res) {
		console.log('WebSocket连接已打开！');
	});
	uni.onSocketError(function(res) {
		console.log('WebSocket连接打开失败，请检查！');
		console.log(res);
	});
	uni.onSocketMessage(res=>{
		// if(res.event === 'msg'){
		// 	const source = JSON.parse(res.data)
		// 	main.$EventBus.$emit("socketMessage", source.data);
		// }else if(res.event === 'msg_update'){
		// }
		main.$EventBus.$emit("socketMessage", 'refresh');
	});
}


export function computerTypeList(data) {
	return myRequest({
		url: ModuleName+'/computerConfigure/computerTypeList',
		method:'post'
	})
}

export function treeListWithUserCount(data) {
	return myRequest({
		url: ModuleName+'/organizational/treeListWithUserCount',
		method:'post',
		loading: true
	})
}

export function getAppAllUserCount(data) {
	return myRequest({
		url: ModuleName+'/user/getAppAllUserCount',
		method:'post'
	})
}

export function groupInfoList(data) {
	return myRequest({
		url: ModuleName+'/groupInfo/list',
		method:'post',
		data,
		loading: true
	})
}

export function groupInfo(data) {
	return myRequest({
		url: ModuleName+'/groupInfo/getInfo',
		method:'post',
		loading: true,
		data
	})
}

//删除群组成员
export function deleteGroupUser(data) {
	return myRequest({
		url: ModuleName+`/groupInfo/deleteUser/${data.groupId}/${data.userId}`,
		method:'post',
		loading: true
	})
}

//修改群组成员日报状态
export function changeUserStatus(data) {
	return myRequest({
		url: ModuleName+`/groupInfo/changeUserStatus/${data.userId}/${data.status}`,
		method:'post'
	})
}

//新增群员
export function addGroupUser(data) {
	return myRequest({
		url: ModuleName+`/groupInfo/addUser`,
		method:'post',
		data
	})
}

export function workDate(userId) {
  return myRequest({
    url: ModuleName+`/user/getUserById/${userId}`,
    method: 'get',
  })
}





