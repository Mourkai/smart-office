<template>
	<view>
		<view class="table-content p20">
			<table class="work-table" cellspacing="0" cellpadding="0">
				<tr>
					<th>日期</th>
					<th>工时类型</th>
					<th>工作时长<br>(小时)</th>
					<th>是否有出差<br>补贴</th>
				</tr>
				<tr v-for="(item,index) in data">
					<td v-text="item[0]"></td>
					<td v-text="item[1]"></td>
					<td v-text="item[2]"></td>
					<td v-text="item[3]"></td>
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
		props:{
			data:{
				type:Object,
				default:()=>[]
			}
		},
		components: {
		},
		methods: {
		},
	}
</script>
<style lang="scss" scoped>
	.details {
		box-sizing: border-box;
		padding-bottom: 50rpx;
	}

	.table-content {
		.work-table {
			border: solid #ddd;
			border-width: 1px 0px 0px 1px;
			width: 100%;
			text-align: center;
			color: #666666;
			th {
				font-weight: 300;
				padding: 8rpx;
				font-size: 25rpx;
				border:1px solid #ddd;
				color: #fff;
				background-color: $main-color;
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
