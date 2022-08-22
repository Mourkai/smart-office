<template>
	<view class="list-item" @click="toPage(data.url)">
		<view class="checkbox" v-if="checkbox">
			<u-checkbox label="" shape="circle" :checked="data.check" @change="change" :name="data.name" />
		</view>
		<view class="content">
			<view class="title">
				<u--image :src="data.avatar" v-if="data.avatar" shape="circle" class="avatar" width="40px" height="40px" />
				<view class="name" v-text="data.name"></view>
				<view class="right-text">
					<view class="icon" v-if="data.rightIcon">
						<image v-if="data.rightIcon.indexOf('/') != -1" :src="data.rightIcon" class="icon-img"></image>
						<u-icon v-else :name="data.rightIcon" color="#3196FA" size="20"></u-icon>
					</view>
					<view class="time" :style="data.rightTextStyle" v-text="data.rightText"></view>
				</view>
			</view>
			<template v-for="(item,index) in data.text">
				<view class="text1" v-if="item" :key="item">
					<view class="icon" v-if="data.icon">
						<image v-if="data.icon[index].indexOf('/') != -1" :src="item" class="icon-img"></image>
						<u-icon v-else :name="data.icon[index]" color="#aaa" size="18"></u-icon>
					</view>
					<view v-html="item"></view>
				</view>
			</template>
			<view class="right-tip" v-if="data.rightTip">
				<view :class="data.rightTipStatus">{{data.rightTip}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'list-item',
		data() {
			return {}
		},
		mounted() {
			this.data.text = this.data.text.map((item, index) => {
				if (item && item.indexOf('\\n')) {
					return item.replace(/\n/g, '<br>')
				} else {
					return item
				}
			})
		},
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},
			checkbox: {
				type: Boolean,
				default: false
			}
		},
		components: {},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			change(e) {
				this.$emit('change', e)
			}
		}
	}
</script>
<style lang="scss">
	.list-item {
		display: flex;
		align-items: center;
		border-bottom: 1px dotted #ddd;
		padding-bottom: 30rpx;

		.checkbox {
			max-width: 100rpx;
			margin: 0 0 0 10rpx;
		}

		.content {
			flex: 1;
			margin-left: 30rpx;
			position: relative;

			.title {
				display: flex;
				align-items: center;
				margin: 30rpx 0;
				.avatar{
					margin-right:20rpx;
				}
				.name {
					flex: 1;
					margin-right:20rpx;
				}

				.right-text {
					font-size: 30rpx;
					display: flex;

					.icon-img {
						margin-top: 5rpx;
						width: 35rpx;
						height: 35rpx;
					}

					.time {
						margin-left: 10rpx;
						color: #333333;
						line-height: 45rpx;
						margin-right: 10rpx;
					}
				}
			}

			[class^="text"] {
				display: flex;
				font-size: 28rpx;
				line-height: 45rpx;
				color: #666666;
				margin-top: 20rpx;

				.icon {
					margin-right: 15rpx;
					margin-top: 7rpx;
					.icon-img {
						display: block;
						width: 42rpx;
						height: 42rpx;
					}
				}
			}

			.right-tip {
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				font-size: 30rpx;

				.info {
					color: #3196FA;
				}

				.success {
					color: #53c21d;
				}

				.danger {
					color: #E45656;
				}
			}
		}
	}
</style>
