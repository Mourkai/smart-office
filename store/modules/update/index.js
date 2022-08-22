import {
	appUpdate
} from '@/api/system.js'

export default {
	state: {

	},
	getters: {

	},
	actions: {
		async updateVersion(context,isToast) {
			const {data} = await appUpdate()
			if(uni.getSystemInfoSync().platform == 'ios' && data.appStatus==1){
				return false
			}
			plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
				let wv = parseInt(widgetInfo.version.replace(/\./g, ""), 10)//本地版本
				let uv = parseInt(data.appVersion.replace(/\./g, ""), 10)//最新版本
				if(wv >= uv){
					isToast && uni.showLoading({
						title: '检测中'
					})
					isToast && setTimeout(() => {
						uni.$u.toast("当前是最新版本")
					}, 500)
				}
				if (wv < uv) {
					uni.showLoading({
						title: '更新中'
					});
					uni.downloadFile({
						url: data.appDownUrl,
						success: downloadResult => {
							if (downloadResult.statusCode === 200) {
								uni.hideLoading()
								plus.runtime.install(downloadResult.tempFilePath, {force: false},
									function() {
										plus.runtime.restart()
									},
									function(e) {
										uni.showToast({
											icon: 'none',
											position: 'bottom',
											title:e.code+" - "+e.message
										});
									}
								);
							}
						},fail: (err) => {
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '失败请重新下载',
							})
						}
					})
				}
			})
		}
	}
}
