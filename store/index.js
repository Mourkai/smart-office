import Vue from 'vue';
import Vuex from 'vuex';
import {
	accountLoginRequest,
	userLogout
} from '@/api/user.js'
import {
	getMyInfo,
	getProcessCategory,
	connectSocket,
	treeListWithUserCount,
	allArea
} from '@/api/system.js'
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
		async accountLogin({
			commit,
			dispatch
		}, payload) {
			localCache.setCache('userRemember', {
				username: payload.username
			})
			if (payload.remember == 1) {
				localCache.setCache('userRemember', payload)
			}
			const loginResult = await accountLoginRequest(payload)
			const token = loginResult.data.access_token
			commit('changeToken', token)
			localCache.setCache('token', token)
			const {
				data
			} = await getMyInfo()
			localCache.setCache('userInfo', data)
			commit('changeUserInfo', data)
			//获取字典值
			const dict = await getProcessCategory()
			const allAreaData = await allArea()
			localCache.setCache('businessModule', dict.data)
			localCache.setCache('allArea', allAreaData.data)
			uni.$u.toast("登录成功")
			//const orgUsersList = await treeListWithUserCount()
			//localCache.setCache('orgUsersList', orgUsersList.data[0])
			connectSocket({
				token,
				userId:data.userId
			})
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
			await userLogout()
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
