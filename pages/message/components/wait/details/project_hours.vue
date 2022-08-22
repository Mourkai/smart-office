<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">工时周期</view>
				<view class="desc" v-text="data.fillStartDate+' ~ '+ data.fillEndDate"></view>
			</view>
		</view>
		<view class="content" v-for="(item,index) in projectList" v-show="item.code !== null">
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="item.code"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="item.name"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="item.manager"></view>
			</view>
			<view class="content-item">
				<view class="bottomText" >出勤<view class="bottomDay">{{item.workDay}} 天</view></view>
				<!-- <view style="margin: 0 auto; color: #3196FA;" >事假<view style="margin-left: 15rpx; display: inline-block;">{{item.travelAllowance}}天</view></view> -->
			</view>
		</view>
		<view class="table-content p20">
			<table class="work-table" cellspacing="0" cellpadding="0">
				<tr>
					<th>日期</th>
					<th>工时类型</th>
					<th>工作时长<br>(小时)</th>
					<th>是否有出差<br>补贴</th>
				</tr>
				<tr v-for="(item,index) in data.workingHourRecordDtoList" v-show="item.workType !== null">
					<td v-text="item.fillDate+(item.morning==1?'上午':'下午')"></td>
					<td v-text="workType[item.workType]"></td>
					<td v-text="item.manHourLength"></td>
					<td v-text="travelAllowance[item.travelAllowance]"></td>
				</tr>
			</table>
		</view>
	</view>
</template>
<script>
	import {
		getWorkingHour,
		getWorkType
	} from '@/api/project.js'
	export default {
		data() {
			return {
				travelAllowance:['','是','否'],
				workType:[''],
				data:{},
				projectList:[]
			};
		},
		async mounted() {
			const workType = await getWorkType()
			workType.data.map(item=>{
				this.workType.push(item.label)
			})
			let workingHour = await getWorkingHour(this.id)
			this.data = workingHour.data
			const prolist = this.arrSet(this.data.workingHourRecordDtoList,'code')
			this.projectList = prolist.map(item=>{
				const total = this.data.workingHourRecordDtoList.filter(item2=>item.code==item2.code)
				item.name=item.projectName
				item.manager = item.projectManagerName
				item.workDay = total.length/2
				return item
			})
		},
		props:{
		   content:{
			   type:Object,
			   default:()=>{}
		   },
		  id: {
		  	type: String,
		  	default: ""
		  }
		},
		methods: {
			arrSet(Arr, id) {
				var obj = {};
				const arrays = Arr.reduce((setArr, item) => {
					obj[item[id]] ? '' : obj[item[id]] = true && setArr.push(item);
					return setArr;
				}, []);
				return arrays;
			}
		},
	};
</script>
<style lang="scss" scoped>
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
			.bottomText{
				margin: 0 auto; color: #3196FA;
			}
			.bottomDay{
				margin-left: 15rpx; display: inline-block;
			}
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

