<template>
	<view class="right">
		<u-popup :show="show" mode="right" :customStyle="{width:'550rpx'}" @close="closeRight" @open="open">
			<view class="popup-content p20">
				<view class="header">
					<view class="title">
						筛选
					</view>
					<view class="close" @click="closeRight">
						<u-icon name="close"></u-icon>
					</view>
				</view>
				<view class="content">
					<view class="title">
						业务类型
					</view>
					<view class="btn-group">
						<u-button type="primary" shape="circle" text="全部"></u-button>
						<u-button type="info" shape="circle" text="项目用印"></u-button>
						<u-button type="info" shape="circle" text="非项目用印"></u-button>
					</view>
				</view>
				<view class="content">
					<view class="title">
						申请人
					</view>
					<view class="leader-group">
						<view class="avatar">
							<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50px"
								height="50px"></u--image>
							<image src="@/static/menu/message/ok-icon.png" class="ok" mode=""></image>
						</view>
						<view class="avatar">
							<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50px"
								height="50px"></u--image>
							<image src="@/static/menu/message/ok-icon.png" class="ok" mode=""></image>
						</view>
						<view class="avatar">
							<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50px"
								height="50px"></u--image>
							<image src="@/static/menu/message/ok-icon.png" class="ok" mode=""></image>
						</view>
						<view class="avatar">
							<image src="@/static/public/add.png" class="add" mode=""></image>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="title">
						申请时间
					</view>
					<view class="btn-group">
						<u-button type="primary" shape="circle" text="今天"></u-button>
						<u-button type="info" shape="circle" text="昨天"></u-button>
						<u-button type="info" shape="circle" text="本周"></u-button>
						<u-button type="info" shape="circle" text="上周"></u-button>
						<u-button type="info" shape="circle" text="本月"></u-button>
						<u-button type="info" shape="circle" text="上月"></u-button>
					</view>
				</view>
				<view class="content">
					<view class="title">
						自定义时间范围
					</view>
					<view class="date">
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'right',
		data() {
			return {}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		onLoad() {},
		methods: {
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			open() {
			}
		}
	}
</script>
<style lang="scss">
	.popup-content {
		.header {
			font-size: 35rpx;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.title {
				flex: 1;
			}

			.close {
				width: 50rpx;
				text-align: right;
			}
		}

		.content {
			margin-top: 60rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;
			}

			.btn-group {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.u-button {
					width: 30%;
					height: 60rpx;
					margin-bottom: 20rpx;
				}
			}

			.leader-group {
				display: flex;
				align-items: center;

				.avatar {
					width: 25%;
					text-align: center;
					position: relative;

					.add {
						width: 50rpx;
						height: 50rpx;
					}

					.ok {
						background-color: #fff;
						border-radius: 30rpx;
						border: 1px solid #fff;
						width: 30rpx;
						height: 30rpx;
						right: 22%;
						top: 60rpx;
						position: absolute;
					}
				}
			}
		}
	}
</style>
