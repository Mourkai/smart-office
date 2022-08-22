<template>
	<view>
		<uni-nav-bar dark fixed safeAreaInsetTop background-color="#fff" color="#000" status-bar left-icon="left" :title="title">
			<view slot="left">
				<u--image :showLoading="true" v-if="userInfo.sex == 0" src="/static/public/men.png" width="37px" height="37px" @click="toProfile"></u--image>
				<u--image :showLoading="true" v-else src="/static/public/women.png" width="37px" height="37px" @click="toProfile"></u--image>
			</view>
		</uni-nav-bar>
		<view @click="toSearch">
			<u-search placeholder="请搜索" disabled v-show="isSearch" :show-action="false">
			</u-search>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import localCache from '@/util/cache.js'
	export default {
		name: 'custom-header',
		data() {
			return {
				// searchWord: "",
				username: '',
				userInfo: {}
			}
		},
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			title: {
				type: String,
				default: "掌上业财"
			},
			borderColor: {
				type: String,
				default: '#3196FA'
			}
		},
		mounted() {
			this.updateHeader()
		},
		activated() {
			this.updateHeader()
		},
		created(){
			this.updateHeader()
		},
		components: {
			UniNavBar
		},
		methods: {
			toProfile() {
				uni.navigateTo({
					url: '/pages/contacts/details?color=#3196fa&userId=' + this.userInfo.userId
				})
			},
			updateHeader(){
				this.userInfo = localCache.getCache('userInfo')
				//this.username = this.userInfo.singleName
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-navbar {
		.center {
			width: 100%;
			line-height: 44px;
			text-align: center;
		}

		.avatar {
			background-color: #fff;
			width: 60rpx;
			margin-left: 15rpx;
			height: 60rpx;
			border-radius: 50%;
			color: #3196FA;
			text-align: center;
			line-height: 60rpx;
			font-size: 27rpx;
		}
	}

	.u-search {
		width: 90%;
		margin: 25rpx auto !important;
	}
	/deep/.uni-nav-bar-text{
		font-size:17px;
	}
</style>
