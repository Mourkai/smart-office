<template>
	<view class="message">
		<view class="fixed-header">
			<!-- <CustomHeader ref="cheader" :title="" bgColor="#F1F1F1" borderColor="#F1F1F1" /> -->
			<!-- <u-tabs :list="list2" lineWidth="60" :current="0" @click="changeTabs" lineColor="#3196FA" /> -->
		</view>
		<view class="fixed-body">
			<Message ref="sonCom"></Message>
		</view>
	</view>
</template>

<script>
	import CustomHeader from '@/components/custom-header/custom-header.vue'
	import Message from './components/message.vue'
	import Wait from './components/wait.vue'
	import Warning from './components/warning.vue'
	import localCache from '@/util/cache.js'
	import {
		getPendingCount
	} from '@/api/process.js'
	export default {
		name: 'message',
		data() {
			return {
				curentComponent: 'Message',
				list2:[]
			}
		},
		async mounted() {
			// const {
			// 	data
			// } = await getPendingCount()
			const list2 = [{
				name: '消息',
				component: 'Message'
			}, {
				name: '待办',
				component: 'Wait',
				// badge: {
				// 	value:1
				// }
			}, {
				name: '预警',
				component: 'Warning'
			}]
			this.list2 =  list2
		},
		onShow() {
			if(this.$refs.cheader){
				this.$refs.cheader.updateHeader()
			}
			this.$nextTick(()=>{
				this.$refs.sonCom.loadData()
			})
		},
		components: {
			CustomHeader,
			Wait,
			Message,
			Warning
		},
		methods: {
			changeTabs(r) {
				this.curentComponent = r.component
			},
			onPullDownRefresh() {
				this.$refs.sonCom.pullDown()
			}
		}
	}
</script>
<style lang="scss" scoped>
	/deep/.u-tabs__wrapper__nav__item {
		flex: 1 !important;
	}

	/deep/.u-tabs__wrapper__nav__line {
		height: 5rpx !important;
	}

	/deep/.u-tabs__wrapper__nav__line {
		left: -6px !important;
	}

	page {
		position: relative;
	}

	.fixed-header {
		position: fixed;
		width: 100%;
		background-color: #fff;
		z-index: 9;
		left: 0;
	}

	.fixed-body {
		position: absolute;
		width: 100%;
		padding-bottom: 100rpx;
	}
	/deep/.u-tabs__wrapper{
		border-bottom: 1px solid transparent;
	}
</style>
