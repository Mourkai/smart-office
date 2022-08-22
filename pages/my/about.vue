<template>
	<view class="about">
		<view class="logo">
			<image src="@/static/public/about-logo.png" mode=""></image>
		</view>
		<u-cell title="软件版本" :value="version" @click="update" isLink></u-cell>
		<view class="bottom">
			<view class="copyright">
				北京至臻云智能科技有限公司<text class="link" @click="toPage(1)"> 服务协议</text>|<text class="link" @click="toPage(2)">隐私政策</text><br>
				Copyright © 2020-2025
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {
				version: '1.0'
			}
		},
		components: {

		},
		onLoad() {
			plus.runtime.getProperty(plus.runtime.appid,(widgetInfo) => {
				this.version = widgetInfo.version
			})
		},
		methods: {
			logout() {
				this.$store.dispatch('logout')
			},
			toPage(type){
				if(type == 1){
					uni.navigateTo({
						url:'./service'
					})
				}
				if(type == 2){
					uni.navigateTo({
						url:'./policy'
					})
				}
			},
			// 检查是否更新版本
			update() {
				// if(!window.plus){
				// 	uni.showToast({
				// 		icon: 'none',
				// 		position: 'bottom',
				// 		title: '不支持更新'
				// 	});
				//    return false
				// }
				// console.log(plus);
				this.$store.dispatch('updateVersion',true)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.about{
		height: 100vh;
		.bottom{
			position:fixed;bottom:18px;width: 100%;box-sizing: border-box;
		}
		.copyright{
			font-size: 13px;color: #999999;text-align: center;
		}
		.link{
			display: inline-block;
			margin: 0 10rpx;
			color: #2979ff;
		}
	}
	.logo {
		border-bottom: 15rpx solid #f2f2f2;
		text-align: center;

		image {
			width: 130rpx;
			height: 130rpx;
			padding: 30rpx;
			border-radius: 50%;
			border: 1px solid #E0AF31;
			margin: 60rpx 0;
		}
	}
</style>
