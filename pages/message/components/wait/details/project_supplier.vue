<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">供应商名称</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">供应商编码</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">社会统一信用代码</view>
				<view class="desc" v-text="data.creditCode"></view>
			</view>
			<view class="content-item">
				<view class="title">纳税人识别号</view>
				<view class="desc" v-text="data.idNumber"></view>
			</view>
			<view class="content-item">
				<view class="title">企业性质</view>
				<view class="desc" v-text="data.nature"></view>
			</view>
			<view class="content-item">
				<view class="title">经营范围</view>
				<view class="desc" v-text="data.ranges"></view>
			</view>
			<view class="content-item">
				<view class="title">企业电话</view>
				<view class="desc" v-text="data.borrowDate"></view>
			</view>
			<view class="content-item">
				<view class="title">公司地址</view>
				<view class="desc" v-text="data.address"></view>
			</view>
			<view class="content-item">
				<view class="title">客户联系人</view>
				<view class="desc" v-text="data.customer"></view>
			</view>
			<view class="content-item">
				<view class="title">联系方式</view>
				<view class="desc" v-text="data.phone"></view>
			</view>
			<view class="content-item">
				<view class="title">开户银行</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">银行账号</view>
				<view class="desc" v-text="data.bankAccount"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		supplierInfo
	} from '@/api/system.js'
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
		async mounted() {
			let {
				data
			} = await supplierInfo(this.id)
			//console.log(data);
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";

	.content .content-item .title {
		min-width: 250rpx;
	}
</style>
