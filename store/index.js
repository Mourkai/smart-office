import Vue from 'vue';
import Vuex from 'vuex';
import localCache from '@/util/cache.js'
import update from "./modules/update";
import organization from "./modules/organization";
Vue.use(Vuex); //vue的插件机制
const store = new Vuex.Store({
	namespaced: true,
	state: {
		token: '',
		userInfo: {}
	},
	getters: {

	},
	mutations: {
		changeToken(state, token) {
			state.token = token
		},
		changeUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		accountLogin({
			commit,
			dispatch
		}, payload) {
			localCache.setCache('userRemember', {
				username: payload.username
			})
			if (payload.remember == 1) {
				localCache.setCache('userRemember', payload)
			}
			const token = "f7c1323d-b350-4cdf-a0ea-63848be7303a"
			commit('changeToken', token)
			localCache.setCache('token', token)
			const data = {
				"userId": "d4f3281492f24e92a373eb95a940b849",
				"singleName": "邱鹏",
				"orgParentName": "项目管理中心",
				"orgId": "134",
				"orgName": "智慧财务与咨询事业部",
				"orgLeader": "ba96cbf796945a4765edb3f4a8519a5d",
				"orgLeaderName": "王涌",
				"orgCode": null,
				"orgAuthCode": "1-3-6",
				"orgType": 4,
				"orgTypeLabel": null,
				"postId": "4a94a1d3a20841edf40622c9873f8778",
				"postName": "事业部副总",
				"leader": "d4f3281492f24e92a373eb95a940b849",
				"leaderName": "邱鹏",
				"baseAddressId": "92fd81c3e91ac296cf9d70248b0fc728",
				"baseAddress": "山东省青岛市",
				"sex": 0
			}
			localCache.setCache('userInfo', data)
			commit('changeUserInfo', data)
			//获取字典值
			uni.$u.toast("登录成功")
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}, 500)
		},
		refreshBuildingStore({
			commit,
			dispatch
		}, payload) {
			const token = localCache.getCache('token')
			const userInfo = localCache.getCache('userInfo')
			if (token) {
				commit('changeToken', token)
			}
			if (userInfo) {
				commit('changeUserInfo', userInfo)
			}
		},
		async logout({
			commit,
			dispatch
		}, payload) {
			const userRemember = localCache.getCache('userRemember')
			localCache.clearCache()
			localCache.setCache('userRemember', userRemember)
			commit('changeToken', '')
			commit('changeUserInfo', '')
			uni.$u.toast("退出成功")
			uni.closeSocket({
				code: 1000,
				reason: '主动关闭',
				success: (res) => {
					console.log("成功关闭连接")
				},
				fail: (res) => {
					console.log(res);
				},
				complete: (res) => {
					console.log(res);
					console.log("成功关闭连接")
				}
			});
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			}, 500)
		}
	},
	modules: {
		update,
		organization
	}
});

export function setupStore() {
	store.dispatch('refreshBuildingStore')
}

export default store;
