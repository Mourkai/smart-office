<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				风险信息
			</view>
			<view class="content-item">
				<view class="title">发生的概率：</view>
				<view class="desc" v-text="data.probability"></view>
			</view>
			<view class="content-item">
				<view class="title">产生的影响：</view>
				<view class="desc" v-text="data.impact"></view>
			</view>
			<view class="content-item">
				<view class="title">优先级：</view>
				<view class="desc" v-text="data.priority"></view>
			</view>
			<view class="content-item">
				<view class="title">责任人：</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">风险描述：</view>
				<view class="desc" v-text="data.description"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				实施进展
			</view>
			<view class="content-item">
				<view class="title">状态：</view>
				<view class="desc" v-text="data.status"></view>
			</view>
			<view class="content-item">
				<view class="title">计划解决日期：</view>
				<view class="desc" v-text="data.planResolveDate"></view>
			</view>
			<view class="content-item">
				<view class="title">实际解决日期：</view>
				<view class="desc" v-text="data.actualResolveDate"></view>
			</view>
			<view class="content-item">
				<view class="title">应对措施：</view>
				<view class="desc" v-text="data.solution"></view>
			</view>
			<view class="content-item">
				<view class="title">实施时机：</view>
				<view class="desc" v-text="data.timing"></view>
			</view>
		</view>
		<!-- //附件信息 -->
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		projectRiskRegister,
		getRiskProbabilityEnumMap,
		getRiskInfluenceEnumMap,
		getRiskStatusEnumMap
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			projectInfo,
			files
		},
		async mounted() {
			let {
				data
			} = await projectRiskRegister(this.id)
			
			const status = await getRiskProbabilityEnumMap()
			const statusData = status.data.find(item=>item.value == data.probability)
			const statusData2 = status.data.find(item=>item.value == data.priority)
			data.probability = statusData.label
			data.priority = statusData2.label
			
			const influence = await getRiskInfluenceEnumMap()
			const influenceData = influence.data.find(item=>item.value == data.impact)
			data.impact = influenceData.label

			const riskStatus = await getRiskStatusEnumMap()
			const riskStatusData = riskStatus.data.find(item=>item.value == data.status)
			data.status = riskStatusData.label

			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 20rpx;
		overflow: hidden;
		border-bottom: 1px dotted #D7D7D7;

		.pro-title {
			margin: 12rpx 0 20rpx 0;
			font-size: 32rpx;
		}

		.content-item {
			margin-bottom: 30rpx;
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

		.file-item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.icon {
				width: 50rpx;
				height: 50rpx;
				padding-top: 17rpx;
			}

			.file-name {
				flex: 1;
				color: #333;
				line-height: 60rpx;
				font-size: 30rpx;
			}

			.see {
				width: 100rpx;
				margin-right: 20rpx;

				.u-button {
					height: 50rpx;
				}
			}
		}
	}
</style>
