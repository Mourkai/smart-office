<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">投标编码</view>
				<view class="desc" v-text="data.biddingId"></view>
			</view>
			<view class="content-item">
				<view class="title">中标通知书编号</view>
				<view class="desc" v-text="data.noticeCode"></view>
			</view>
			<view class="content-item">
				<view class="title">合同名称</view>
				<view class="desc" v-text="data.contractName"></view>
			</view>
			<view class="content-item">
				<view class="title">合同编号</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">合同类型</view>
				<view class="desc" v-text="data.typeName"></view>
			</view>
			<view class="content-item">
				<view class="title">合同金额</view>
				<view class="desc" v-text="data.amount + '元'"></view>
			</view>
			<view class="content-item">
				<view class="title">不含税金额</view>
				<view class="desc" v-text="data.withoutTaxAmount + '元'"></view>
			</view>
			<view class="content-item">
				<view class="title">甲方</view>
				<view class="desc" v-text="data.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">乙方</view>
				<view class="desc" v-text="data.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">丙方</view>
				<view class="desc" v-text="data.thirdPart"></view>
			</view>
			<view class="content-item">
				<view class="title">甲方付款方式</view>
				<view class="desc" v-text="data.payMethods"></view>
			</view>
			<view class="content-item">
				<view class="title">合同签订日期</view>
				<view class="desc" v-text="data.signDate"></view>
			</view>
			<view class="content-item">
				<view class="title">特殊条款</view>
				<view class="desc" v-text="data.specialProvisions"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				项目明细
			</view>
			<view v-for="item in data.projectContractDetailDtoList" :key="item.id">
				<view class="content-item">
					<view class="title">项目名称</view>
					<view class="desc" v-text="item.projectName"></view>
				</view>
				<view class="content-item">
					<view class="title">项目编号</view>
					<view class="desc" v-text="item.projectCode"></view>
				</view>
				<view class="content-item">
					<view class="title">合同业务类型</view>
					<view v-for="_item in typeList" :key="_item.id">
						<view class="desc" v-text="_item.id == item.typeId ? _item.name:''"></view>
					</view>
				</view>
				<view class="content-item">
					<view class="title">金额</view>
					<view class="desc" v-text="item.amount"></view>
				</view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		getSignContractDetail
	} from '@/api/project.js'
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
		components:{
		   files
		},
		async mounted() {
			let {
				data
			} = await getSignContractDetail(this.id)
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";

	.content .content-item .title {
		min-width: 230rpx;
	}
</style>
