<template>
	<view class="feedback">
		<view class="form-item item-column">
			<view class="title required">意见与反馈</view>
			<view class="content">
				<u--textarea height="150" v-model="v" placeholder="请输入内容"></u--textarea>
			</view>
		</view>
		<view class="btn-group">
			<u-button type="info" shape="circle" text="取消" @click="back()"></u-button>
			<u-button type="primary" shape="circle" text="提交" @click="submit()"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'my',
		data() {
			return {
				v: ''
			}
		},
		onLoad() {},
		components: {

		},
		methods: {
			submit() {
				uni.$u.toast("暂未开放")
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.feedback{
		padding: 30rpx;
	}
	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;

		.title {
			color: #666666;
			font-size: 30rpx;
			margin-right: 20rpx;
		}

		.title::before {
			content: "*";
			color: #fff;
			margin-right: 6rpx;
		}

		.required::before {
			color: red;
		}

		.content {
			flex: 1;
		}
	}

	.item-column {
		flex-direction: column;
		align-items: flex-start;

		.content {
			margin-top: 13rpx;
			width: 100%
		}
	}
	.btn-group {
		display: flex;
		margin-top: 70rpx;
	
		.u-button {
			margin: 0 30rpx;
		}
	}
</style>
