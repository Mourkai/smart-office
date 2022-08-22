<template>
	<view class="my">
		<u-cell-group>
			<u-cell value="" isLink>
				<view slot="title" @click="toProfile" class="u-slot-title" style="display: flex;">
					<view class="img">
						<Avatar :name="name" :sex="sex" size="100rpx" fontSize="27rpx" />
					</view>
					<view class="text">
						<view class="name" v-text="name"></view>
						<view class="dep" v-text="orgName"></view>
					</view>
				</view>
			</u-cell>
			<view class="content">
				<u-cell icon="bell" title="消息通知" url="/pages/my/notice" iconStyle="color:#3196fa" isLink />
				<u-cell icon="edit-pen" title="意见与反馈" url="/pages/my/feedback" iconStyle="color:#3196fa" isLink />
				<!-- <u-cell icon="edit-pen" title="意见与反馈" @click="notice" iconStyle="color:#3196fa" isLink /> -->
				<u-cell icon="info-circle" title="关于应用" url="/pages/my/about" iconStyle="color:#3196fa" isLink />
			</view>
		</u-cell-group>
		<u-action-sheet :actions="actionList" cancelText="取消" @select="listenAction" title="退出登录"
			@close="showAction=false" :show="showAction"></u-action-sheet>
		<view class="btn">
			<u-button type="primary" @click="showAction=true" shape="circle">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	import Avatar from '@/components/avatar/avatar.vue'
	export default {
		name: 'my',
		data() {
			return {
				showAction: false,
				name: '',
				userId: '',
				sex:'',
				orgName: '',
				actionList: [{
					name: '退出'
				}]
			}
		},
		onLoad() {
			this.activeFunc()
		},
		onShow() {
			this.activeFunc()
		},
		activated() {
			this.activeFunc()
		},
		components: {
			Avatar
		},
		methods: {
			listenAction(e) {
				if (e.name == '退出') {
					this.$store.dispatch('logout')
				}
			},
			notice(){
				uni.$u.toast("暂未开放")
			},
			activeFunc(){
				const userInfo = localCache.getCache('userInfo')
				if (!userInfo) {
					uni.$u.toast("登录状态已过期")
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/user/login'
						})
					}, 500)
					return false
				}
				this.name = userInfo.singleName
				this.sex = userInfo.sex
				this.userId = userInfo.userId
				this.orgName = userInfo.orgName
			},
			toProfile() {
				uni.navigateTo({
					url: '/pages/contacts/details?color=#3196fa&userId=' + this.userId
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		position: relative;
		height: 100%;
	}
	/deep/.content .u-cell__body{
		padding:25rpx 30rpx;
	}
	.content {
		border-top: 10rpx solid #f2f2f2;

		/deep/.u-cell__title-text {
			font-size: 30rpx;
		}
	}

	.btn {
		position: fixed;
		bottom: 150rpx;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60%;
	}

	.u-cell-group {
		.u-slot-title {
			display: flex;
			align-items: center;

			.text {
				margin-left: 20rpx;

				.name {
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}

				.dep {
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}

	/deep/.u-action-sheet__item-wrap__item__name {
		color: red;
	}
</style>
