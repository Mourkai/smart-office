<template>
	<view class="right">
		<u-popup :show="show" mode="right" :customStyle="{width:'70vw'}" @close="closeRight">
			<view class="popup-content p20">
				<view class="header"></view>
				<!-- <view class="content">
					<view class="btn-group">
						<u-button shape="circle" v-for="(item,index) in tab" :text="item.name"
							:type="formData.type == item.type ? 'primary':'info'" @click="tabClick(index,item.type)" />
					</view>
				</view> -->

				<view class="content">
					<view class="title">
						审批状态
					</view>
					<view class="btn-group">
						<u-button shape="circle" v-for="(item,index) in approveStatus" :text="item.dictLabel"
							:class="{'active': formData.status ===  item.dictValue}" @click="approve(item.dictValue)">
						</u-button>
					</view>
				</view>
				<RightTimeRange title="申请时间" :currentBtn="formData.currentBtn" :end="formData.proposerDateEnd"
					:start="formData.proposerDateStart" @setTime="setTime"></RightTimeRange>
				<view class="bottom-group">
					<u-button shape="circle" @click="reset">重置</u-button>
					<u-button type="primary" @click="submit" shape="circle">确定</u-button>
				</view>
			</view>
		</u-popup>
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
	} from '../daily/config/daily.js'
	export default {
		name: 'right',
		data() {
			return {
				rightBtn,
				tab: [{
						type: 10,
						name: '全部'
					},
					{
						type: 7,
						name: '待提交'
					},
					{
						type: 3,
						name: '被退回'
					},
					{
						type: 8,
						name: '已发起'
					}
				],
				formData: {
					type: 10,
					status: '',
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999
				},
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
		mounted(){
			this.getProcessStatus()
			this.formData = {...this.searchData,currentBtn:999}
			uni.hideLoading()
		},
		components: {
			RightTimeRange
		},
		methods: {
			closeRight() {
				this.$emit('closeRight')
			},
			tabClick(index, value) {
				this.formData.type = value
			},
			submit() {
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
			approve(index) {
				this.formData.status = index
			},
			async getProcessStatus() {
				let data = await getProcessStatus()
				this.approveStatus = data.data
			},

		},
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
			margin-top: 10rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;
			}

			.btn-group {
				display: flex;
				flex-wrap: wrap;

				.u-button {
					width: 45%;
					height: 55rpx;
					margin-bottom: 20rpx;
					margin-left: inherit;
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
