<template>
	<view class="details">
		<WorkHoursItem :data="itemContent" />
		<WorkHoursTable :data="tableContent" />
		<view class="step-title p20">流程</view>
		<view class="step-line p20">
			<LineProcess :data="process"></LineProcess>
		</view>
		<view class="btn-group">
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="批准"></u-button>
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="拒绝"></u-button>
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="加签"></u-button>
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="转发"></u-button>
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="转办"></u-button>
			<u-button type="primary" size="small" shape="circle" @click="openModel" text="退回"></u-button>
		</view>
		<u-modal :show="showModal" showCancelButton buttonReverse closeOnClickOverlay @cancel="cancelModal"
			@close="cancelModal" :title="modalTitle">
			<view class="modal-content">
				<view class="search">
					<view class="title">
						<text style="color: red;">*</text> 转发对象
					</view>
					<view class="input">
						<u-search placeholder="请选择" height="25" :showAction="false"></u-search>
					</view>
				</view>
				<view class="desc">
					<view class="title">
						<text style="color: red;">*</text> 意见
					</view>
					<view class="input">
						<u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import LineProcess from '@/components/line-process/line-process.vue'
	import WorkHoursItem from '@/components/work-hours/work-hours-item.vue'
	import WorkHoursTable from '@/components/work-hours/work-hours-table.vue'
	import {
		process,
		itemContent,
		tableContent
	} from './config/workHours.js'
	export default {
		data() {
			return {
				value1: '很好',
				process,
				itemContent,
				tableContent,
				showModal: false,
				showFile: false,
				modalTitle: '',
				fileData: [{
						name: '文件名称.doc',
						type: 'file'
					},
					{
						name: '文件名称.png',
						type: 'img'
					},
				]
			};
		},
		components: {
			LineProcess,
			WorkHoursItem,
			WorkHoursTable
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
	.step-line {
		border-bottom: 1px solid #ddd;
		margin-bottom: 40rpx;
	}
	.btn-group {
		.u-button {
			width: 23%;
			height: 70rpx;
			margin: 30rpx 20rpx
		}

		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.modal-content {
		padding: 0;
		font-size: 30rpx;

		.search {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.title {
				margin-right: 10rpx;
			}
		}
	}

	/deep/.u-modal__content {
		padding: 20rpx !important;
	}
</style>
