<template>
	<view class="details">
		<WorkHoursItem :data="itemContent" />
		<WorkHoursTable :data="tableContent" />
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
		margin: 20rpx;
		overflow: hidden;
		border-bottom: 1px dotted #D7D7D7;

		.content-item {
			margin-bottom: 23rpx;
			font-size: 30rpx;
			display: flex;

			.title {
				min-width: 170rpx;
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

		.day-item {
			display: flex;
			color: #3196FA;
			font-size: 29rpx;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 20%;
			margin-bottom: 23rpx;

			view {
				width: 50%;
				text-align: center;
			}
		}
	}
	.step-line {
		border-bottom: 1px solid #ddd;
		margin-bottom: 40rpx;
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

	.table-content {
		.table-header {
			background-color: #D6EAFE;
			color: #3196FA;
			font-size: 28rpx;
			padding: 15rpx;
			position: relative;

			.icon {
				position: absolute;
			}

			.text {
				text-align: center;
			}
		}

		.work-table {
			border: solid #ddd;
			border-width: 1px 0px 0px 1px;
			width: 100%;
			border-top: none;
			text-align: center;
			th {
				font-weight: 500;
				padding:20rpx 8rpx;
				font-size:25rpx;
				border: solid #ddd;
				border-width: 0px 1px 1px 0px;
			}
			tr:hover{
				background-color: #eee;
			}
			td {
				padding: 19rpx 15rpx;
				font-size: 28rpx;
				border: solid #ddd;
				border-width: 0px 1px 1px 0px;
			}
		}
	}
	.btn{
		.u-button{
			width: 50%;
		}
	}
</style>
