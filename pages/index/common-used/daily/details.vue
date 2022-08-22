<template>
	<view class="details">
		<view class="header">
			<view class="title">王某某提交日报申请</view>
			<!-- <view class="desc">
				<image src="@/static/menu/message/rizhi.png" mode=""></image>
				<view class="title">人资与党建</view>
			</view> -->
		</view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc">2022302022022202</view>
			</view>
			<view class="content-item">
				<view class="title">日报日期</view>
				<view class="desc">2022-02-14</view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc">123455494</view>
			</view>
			<view class="content-item">
				<view class="title">工作地点</view>
				<view class="desc">北京市西城区西绒线昌盛大厦</view>
			</view>
			<view class="content-item">
				<view class="title">今日完成</view>
				<view class="desc">
					北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦北京市西城区西绒线昌盛大厦
				</view>
			</view>
			<view class="content-item">
				<view class="title">今日完成</view>
				<view class="desc">
					北京市西城区西绒线昌盛大厦
				</view>
			</view>
			<view class="content-item">
				<view class="title">今日完成</view>
				<view class="desc">
					北京市西城区西绒线昌盛大厦
				</view>
			</view>
		</view>
		<view class="step-title p20">流程</view>
		<view class="step-line p20">
			<LineProcess :data="process"></LineProcess>
		</view>
		<view class="btn">
			<u-button type="primary" shape="circle" text="撤销"></u-button>
		</view>
	</view>
</template>
<script>
	import LineProcess from '@/components/line-process/line-process.vue'
	import {
		process
	} from './config/daily.js'
	export default {
		data() {
			return {
				value1: '很好',
				process,
				showModal: false,
				modalTitle: ''
			};
		},
		components: {
			LineProcess
		},
		methods: {
			openModel() {
				this.modalTitle = '转发'
				this.showModal = true
			},
			cancelModal() {
				this.showModal = false
			}
		},
	};
</script>
<style lang="scss" scoped>
	.details {
		box-sizing: border-box;
		padding-bottom: 50rpx;
	}

	.header {
		padding: 40rpx 20rpx;
		font-size: 38rpx;
		border-bottom: 1px solid #D7D7D7;

		.desc {
			margin-top: 15rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #666666;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}

	.content {
		padding: 40rpx 20rpx 20rpx 20rpx;
		border-bottom: 1px solid #D7D7D7;

		.content-item {
			margin-bottom: 30rpx;
			font-size: 30rpx;
			display: flex;

			.title {
				min-width: 150rpx;
				color: #666666;
				line-height: 50rpx;
			}
			.desc {
				flex: 1;
				color: #333;
				font-size: 29rpx;
				line-height: 50rpx;
			}
		}
	}

	.step-line {
		border-bottom: 1px solid #ddd;
		margin-bottom: 40rpx;
	}
	.btn{
		.u-button{
			width: 50%;
		}
	}
</style>
