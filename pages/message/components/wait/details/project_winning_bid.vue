<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.createByName"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.createTime"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				中标信息
			</view>
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">投标编码</view>
				<view class="desc" v-text="data.biddingInfoDto.code"></view>
			</view>
			<view class="content-item">
				<view class="title">中标类型</view>
				<view class="desc" v-text="data.biddingInfoDto.typeName"></view>
			</view>
			<view class="content-item">
				<view class="title">中标通知书编号</view>
				<view class="desc" v-text="data.noticeCode"></view>
			</view>
			<view class="content-item">
				<view class="title">中标额度</view>
				<view class="desc" v-text="data.biddingPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">要求合同签订期限</view>
				<view class="desc" v-text="data.limitDate"></view>
			</view>
		</view>
		<!-- <view class="content">
			<view class="pro-title">
				项目信息
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.biddingInfoDto.name"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.biddingInfoDto.code"></view>
			</view>
			<view class="content-item">
				<view class="title">所属部门</view>
				<view class="desc" v-text="data.biddingInfoDto.projectInfoDto.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">部门负责人</view>
				<view class="desc" v-text="data.biddingInfoDto.projectInfoDto.leaderName"></view>
			</view>
		</view> -->
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		noticeAward,
	} from '@/api/project.js'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {
					biddingInfoDto: {}
				}
			}
		},
		components:{
		   files	
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {
				data
			} = await noticeAward(this.id)
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";

	/deep/.content .content-item .title {
		min-width: 260rpx;
	}
</style>
