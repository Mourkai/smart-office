<template>
	<view class="right">

		<u-popup :show="show" mode="right" :customStyle="{width:'70vw'}" @close="closeRight">
			<view class="popup-content p20">
				<view class="header"></view>
				<view class="content">
					<!-- <view class="title">
						筛选
					</view>
					<view class="btn-group">
						<u-button shape="circle" v-for="(item,index) in rightBtn.type" :text="item.name"
							:class="{'active':active.includes(item.name)}" @click="onClick(index,item)" />
					</view> -->
				</view>
				<view class="content">
					<view class="title">
						审批状态
					</view>
					<view class="btn-group">
						<u-button shape="circle" v-for="(item,index) in approveStatus" :text="item.dictLabel"
							:class="{'active': formData.status === item.dictValue }" @click="approve(item.dictValue)" />
					</view>
				</view>
	<!-- 			<view class="content">
					<view class="title">
						工时周期
					</view>
					<view class="btn-group">
						<view @click="showTime = true" style="width: 100%;">
							<u--input placeholder="选择工时周期" readonly fontSize="13" v-model="formData.value1" />
						</view>
					</view>
				</view> -->
				<RightTimeRange title="申请时间" :currentBtn="formData.currentBtn" :end="formData.proposerDateEnd"
					:start="formData.proposerDateStart" @setTime="setTime"></RightTimeRange>
				<view class="bottom-group">
					<u-button shape="circle" @click="reset">重置</u-button>
					<u-button type="primary" @click="submit" shape="circle">确定</u-button>
				</view>
			</view>
		</u-popup>
		<u-picker v-if="showTime" :show="showTime" @confirm="confirmTime" @cancel="showTime=false"
			:columns="columnsTime"></u-picker>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	import RightTimeRange from '@/components/right-time-range/right-time-range.vue'
	import {
		getProcessStatus
	} from '@/api/system.js'
	import {
		rightBtn
	} from '../work-hours/config/workHours.js'
	export default {
		name: 'right',
		data() {
			return {
				showTime: false,
				rightBtn,
				columnsTime: [
					[1, 2, 3, 4, 5, 6, 7]
				],
				formData: {
					value1: '',
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999,
					status: '', //审批选中状态
				},
				// type:[],
				// active: [], //全部
				approveStatus: [], //审批状态列表
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			searchData: {
				type: Object,
				default: () => {}
			}
		},
		mounted() {
			uni.hideLoading()
			this.formData = {...this.searchData,currentBtn:999}
			this.getProcessCategory()
		},
		components: {
			RightTimeRange
		},
		methods: {
			// 全部 待提交 已处理
			// onClick(index, item) {
			// 	// console.log(item.type)
			// 	this.type = item
			// 	console.log(this.type)
			// 	if (item.name === '全部') {
			// 		this.active = [item.name]
			// 	} else {
			// 		if (this.active.includes('全部')) {
			// 			this.active = []
			// 		}
			// 		this.active.push(item.name)
			// 	}
			// },
			approve(index) {
				this.formData.status = index
			},
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			confirmTime(e) {
				this.formData.value1 = e.value[0]
				this.showTime = false
			},
			submit(item) {
				// console.log(this.type.type)
				// let obj = {
				// 	proposerDateStart: this.formData.proposerDateStart,
				// 	proposerDateEnd: this.formData.proposerDateEnd,
				// 	// type:this.type.type
				// }
				// console.log(111111111)
				// if (this.status) {
				// 	obj['bpmStatus'] = this.status
				// }
				this.$emit('search', this.formData)
				this.$emit('closeRight')
			},
			setTime(e) {
				this.formData.proposerDateStart = e[0]
				this.formData.proposerDateEnd = e[1]
				this.formData.currentBtn = e[2]
			},
			reset() {
				this.formData = {
					type: 10,
					status: '',
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999
				}
			},
			async getProcessCategory() {
				let data = await getProcessStatus()
				this.approveStatus = data.data
				//console.log(data)
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.popup-content {
		.header {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			position: relative;

			.title {
				flex: 1;
			}

			.close {
				width: 50rpx;
				text-align: right;
			}
		}

		.content {
			margin-top: 30rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;
			}

			.btn-group {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.u-input {
					height: 45rpx !important;
				}

				.u-button {
					margin-left: inherit;
					width: 41%;
					height: 55rpx;
					margin-bottom: 20rpx;
				}

				.active {
					color: #fff;
					border: 1px solid $main-color;
					background: #3c9cff;
				}
			}
		}

		.bottom-group {
			display: flex;
			justify-content: space-around;
			position: fixed;
			right: 0;
			width: 70vw;
			bottom: 30rpx;

			.u-button {
				width: 200rpx;
			}

			.active {
				background-color: $main-color;
				color: #fff;
				border: 1px solid $main-color;
			}
		}
	}
</style>
