<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">合同名称</view>
				<view class="desc" v-text="data.projectContractPaymentInfoDto.name"></view>
			</view>
			<view class="content-item">
				<view class="title">合同编号</view>
				<view class="desc" v-text="data.projectContractPaymentInfoDto.code"></view>
			</view>
			<view class="content-item">
				<view class="title">合同金额</view>
				<view class="desc" v-text="data.projectContractPaymentInfoDto.amount"></view>
			</view>
			<view class="content-item">
				<view class="title">本次付款金额</view>
				<view class="desc" v-text="data.payPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">未付款金额</view>
				<view class="desc" v-text="data.projectContractPaymentInfoDto.unpaidAmount"></view>
			</view>
			<view class="content-item">
				<view class="title">已付款金额</view>
				<view class="desc" v-text="data.projectContractPaymentInfoDto.paidAmount"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">审批中付款金额</view>
				<view class="desc" v-text="data.remark"></view>
			</view> -->
		</view>
		<view class="content">
			<view class="pro-title">
				付款信息
			</view>
			<view class="content-item">
				<view class="title">乙方开户行</view>
				<view class="desc" v-text="data.customerBank"></view>
			</view>
			<view class="content-item">
				<view class="title">乙方账户名称</view>
				<view class="desc" v-text="data.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">乙方收款账号</view>
				<view class="desc" v-text="data.customerAccountNumber"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				项目信息 
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectCode"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectManagerName"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		getById
	} from '@/api/project.js'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {
					projectContractPaymentDetailDto:{},
				},
				showFile: false
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
		   files	
		},
		async mounted() {
			let {
				data
			} = await getById(this.id)
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 210rpx;
	}
</style>
