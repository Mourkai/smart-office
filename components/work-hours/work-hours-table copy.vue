<template>
	<view>
		<view class="table-content p20">
			<view class="table-header">
				<view class="icon">
					<u-icon name="calendar-fill" size="20" color="#3196FA"></u-icon>
				</view>
				<view class="text">
					2022年11月1日-2022年11月30日
				</view>
			</view>
			<table class="work-table" cellspacing="0" cellpadding="0">
				<tr>
					<th>日期</th>
					<th>工时类型</th>
					<th>工作时长<br>(小时)</th>
					<th>是否有出差<br>补贴</th>
				</tr>
				<tr>
					<td>11/1日上午</td>
					<td>出勤</td>
					<td>3</td>
					<td>否</td>
				</tr>
				<tr>
					<td>11/1日下午</td>
					<td>出勤</td>
					<td>5</td>
					<td>否</td>
				</tr>
				<tr>
					<td>11/2日上午</td>
					<td>出勤</td>
					<td>3</td>
					<td>否</td>
				</tr>
				<tr>
					<td>11/2日下午</td>
					<td>出勤</td>
					<td>5</td>
					<td>是</td>
				</tr>
			</table>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
			};
		},
		components: {
		},
		methods: {
		},
	};
</script>
<style lang="scss" scoped>
	.details {
		box-sizing: border-box;
		padding-bottom: 50rpx;
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
				padding: 20rpx 8rpx;
				font-size: 25rpx;
				border: solid #ddd;
				border-width: 0px 1px 1px 0px;
			}

			tr:hover {
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
</style>
