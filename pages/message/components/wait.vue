<template>
	<view class="wait">
		<view class="wait-item" v-for="(item,index) in menu" :key="item.title" @click="toPage(item.url)">
			<image :src="item.icon"></image>
			<view class="text" v-text="item.title"></view>
			<view class="dot" v-show="item.count">
				<u-badge numberType="overflow" max="99" :value="item.count"></u-badge>
			</view>
		</view>
		<u-empty v-if="isEmpty" icon="/static/public/no-data.png" />
	</view>
</template>

<script>
	import {
		menu
	} from './config/wait.js'
	import {
		todoclass,
		getPendingCount
	} from '@/api/process.js'
	import localCache from '@/util/cache.js'
	export default {
		name: 'wait',
		data() {
			return {
				menu,
				count: 0,
				isEmpty: false
			}
		},
		async mounted() {
			this.loadData()
		},
		activated() {
			this.loadData()
		},
		components: {},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			async loadData(callback) {
				const category = await todoclass()
				this.menu = this.menu.map(item => {
					item.count = 0
					category.data.forEach(item2 => {
						if (item2.category == item.category) {
							item.count = item2.count
						}
					})
					return item
				})
				callback && callback()
			},
			async onPullDownRefresh() {
				this.loadData(() => {
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>
<style lang="scss">
	.wait {
		margin-bottom: 40rpx;
	}

	.wait-item {
		box-sizing: border-box;
		margin: 30rpx 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		align-items: center;
		height: 120rpx;
		border-bottom: 1px dotted #BFBFBF;

		.text {
			flex: 1;
			font-size: 28rpx;
			color: #666666;
		}

		.dot {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
		}

		image {
			width: 80rpx;
			height: 80rpx;
			margin: 0 30rpx;
		}
	}

	.wait-item:last-child {
		border-bottom: none;
	}
</style>
