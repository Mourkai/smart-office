<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.createByName"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.createDate"></view>
			</view>
		</view>
		<projectInfo :id="data.id" showLevel showType></projectInfo>
		<view class="content" v-for="item in data.addPersonRecordDtoList" :key="item.id">
			<view class="pro-title">
				调入信息
			</view>
			<view class="content-item">
				<view class="title">调入原因：</view>
				<view class="desc" v-text="item.reason"></view>
			</view>
			<view class="content-item">
				<view class="title">员工姓名：</view>
				<view class="desc" v-text="item.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">预计工作时间：</view>
				<view class="desc" v-text="item.startDate + '--' + item.endDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目职责：</view>
				<view class="desc" v-text="item.responsibilities"></view>
			</view>
			<view class="content-item">
				<view class="title">工作地点：</view>
				<view class="desc" v-text="item.address"></view>
			</view>
		</view>
		<!-- //附件信息 -->
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		getAddPersonRecord
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data:{}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
			projectInfo,
			files
		},
		async mounted() {
			let {data} = await getAddPersonRecord({relationshipId:this.id})
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
