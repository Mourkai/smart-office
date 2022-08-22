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
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">开票编码</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">开票申请人</view>
				<view class="desc" v-text="data.personName"></view>
			</view>
			<view class="content-item">
				<view class="title">开票金额</view>
				<view class="desc" v-text="data.invoicingPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">预计收款日期</view>
				<view class="desc" v-text="data.estimateDate"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				合同信息
			</view>
			<view class="content-item">
				<view class="title">合同名称</view>
				<view class="desc" v-text="data.contractName"></view>
			</view>
			<view class="content-item">
				<view class="title">合同编码</view>
				<view class="desc" v-text="data.contractCode"></view>
			</view>
			<view class="content-item">
				<view class="title">合同签订日期</view>
				<view class="desc" v-text="contract.signDate"></view>
			</view>
			<view class="content-item">
				<view class="title">合同金额</view>
				<view class="desc" v-text="contract.amount"></view>
			</view>
			<view class="content-item">
				<view class="title">累计开票金额</view>
				<view class="desc" v-text="contract.totalOpenPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">累计收款金额</view>
				<view class="desc" v-text="contract.totalGetPrice"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				客户信息
			</view>
			<view class="content-item">
				<view class="title">客户</view>
				<view class="desc" v-text="contract.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">统一社会信用代码</view>
				<view class="desc" v-text="contract.sysCustomerInfoDto.creditCode"></view>
			</view>
			<view class="content-item">
				<view class="title">纳税人识别号</view>
				<view class="desc" v-text="contract.sysCustomerInfoDto.idNumber"></view>
			</view>
			<view class="content-item">
				<view class="title">开户银行</view>
				<view class="desc" v-text="contract.sysCustomerInfoDto.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">银行账号</view>
				<view class="desc" v-text="contract.sysCustomerInfoDto.bankAccount"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">累计收款金额</view>
				<view class="desc" v-text="data.totalGetPrice"></view>
			</view> -->
		</view>
		<view class="content" v-for="(item,index) in data.projectInvoicingDetailList">
			<view class="pro-title">
				开票明细
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc">{{item.projectName}}</view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc">{{item.code}}</view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc">{{item.projectManagerName}}</view>
			</view>
			<view class="content-item">
				<view class="title">金额</view>
				<view class="desc">{{item.projectPrice}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		invoiceRequisition,
		getSignContractDetail
	} from '@/api/project.js'
	export default {
		data() {
			return {
				data:{
					contract:{},
					projectContractInfoDto:{
						sysCustomerInfoDto:{}
					}
				}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {data} = await invoiceRequisition(this.id)
			
			let contract = await getSignContractDetail(data.contractId)
			
			this.data = data
			this.contract = contract.data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title {
		min-width: 260rpx;
	}
</style>