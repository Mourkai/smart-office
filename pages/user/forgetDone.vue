<template>
	<view class="forget">
	    <view class="tips">
			<image src="../../static/public/forget-done.png" mode=""></image>
			<view>密码修改成功</view>
		</view>
		<u-button shape="circle" @click="done" type="primary" text="完成"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			done() {
				uni.navigateTo({
					url:'/pages/user/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.forget {
		padding: 50rpx;
		.tips{
			display: flex;
			flex-direction: column;
			text-align: center;
			image{
				width:100rpx;
				height: 100rpx;
				margin: 30rpx auto;
			}
		}
		.u-button{
			width:70%;
			height:80rpx;
			margin-top:130rpx;
		}
	}
</style>
