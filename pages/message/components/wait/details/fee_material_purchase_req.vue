<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				申购信息
			</view>
			<view class="content-item">
				<view class="title">申购总额</view>
				<view class="desc" v-text="data.totalFee"></view>
			</view>
			<view class="content-item">
				<view class="title">申购事由</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户名称</view>
				<view class="desc" v-text="data.getAccountName"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户</view>
				<view class="desc" v-text="data.getAccount"></view>
			</view>
			<view class="content-item">
				<view class="title">账户开户行</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.projectMaterialRecordDtoList">
			<view class="pro-title">
				申购明细
			</view>
			<view class="content-item">
				<view class="title">名称</view>
				<view class="desc" v-text="item.name"></view>
			</view>
			<view class="content-item">
				<view class="title">规格</view>
				<view class="desc" v-text="item.specifications"></view>
			</view>
			<view class="content-item">
				<view class="title">预估单价</view>
				<view class="desc" v-text="item.fee"></view>
			</view>
			<view class="content-item">
				<view class="title">数量</view>
				<view class="desc" v-text="item.number"></view>
			</view>
			<view class="content-item">
				<view class="title">合计金额</view>
				<view class="desc" v-text="item.totalFee"></view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		projectMaterial
	} from '@/api/fee.js'
	import projectInfo from './projectInfo.vue'
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
			projectInfo
		},
		async mounted() {
			let {data} = await projectMaterial(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 210rpx;
	}
	/deep/.content .content-item .title{
		min-width: 210rpx;
	}
</style>
