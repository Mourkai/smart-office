<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号：</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">客户名称：</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">客户编码：</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">社会信用代码：</view>
				<view class="desc" v-text="data.creditCode"></view>
			</view>
			<view class="content-item">
				<view class="title">纳税人识别号：</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">客户企业性质：</view>
				<view v-for="(item,index) in typeList" :key="index">
					<view class="desc" v-text="item.value == data.nature ? item.label:''"></view>
				</view>
			</view>
			<view class="content-item">
				<view class="title">客户企业类型：</view>
				<view class="desc" v-text="data.enterpriseType"></view>
			</view>
			<view class="content-item">
				<view class="title">经营范围：</view>
				<view class="desc" v-text="data.ranges"></view>
			</view>
			<view class="content-item">
				<view class="title">企业电话：</view>
				<view class="desc" v-text="data.mobile"></view>
			</view>
			<view class="content-item">
				<view class="title">公司地址：</view>
				<view class="desc" v-text="data.address"></view>
			</view>
			<view class="content-item">
				<view class="title">客户联系人：</view>
				<view class="desc" v-text="data.customer"></view>
			</view>
			<view class="content-item">
				<view class="title">联系方式：</view>
				<view class="desc" v-text="data.phone"></view>
			</view>
			<view class="content-item">
				<view class="title">开户银行：</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">银行账号：</view>
				<view class="desc" v-text="data.bankAccount"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				部门信息
			</view>
			<view v-for="item in data.customerDepartmentList" :key="item.id">
				<view class="content-item">
					<view class="title">部门名称：</view>
					<view class="desc" v-text="item.name"></view>
				</view>
				<view class="content-item">
					<view class="title">主要业务领域：</view>
					<view class="desc" v-text="item.businessArea"></view>
				</view>
				<view class="content-item">
					<view class="title">部门负责人：</view>
					<view class="desc" v-text="item.deptLeader"></view>
				</view>
				<view class="content-item">
					<view class="title">负责人联系方式：</view>
					<view class="desc" v-text="item.leaderPhone"></view>
				</view>
				
				<view v-for="(_item,index) in item.customerDepartmentContextList" :key="_item.id">
					<view class="content-item">
						<view class="title" v-text="'主要负责人' + (Number(index)+1) + '：'"></view>
						<view class="desc" v-text="_item.mainLeader"></view>
					</view>
					<view class="content-item">
						<view class="title">联系方式：</view>
						<view class="desc" v-text="_item.phone"></view>
					</view>
					<view class="content-item">
						<view class="title">部门职位：</view>
						<view class="desc" v-text="_item.post"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCustomerInfo,
		getCustomerNatureEnum
	} from '@/api/system.js'
	export default {
		data() {
			return {
				showFile: false,
				data:{},
				typeList:[]
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let typeList = await getCustomerNatureEnum()
			this.typeList = typeList.data
			let {data} = await getCustomerInfo(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 230rpx;
	}
</style>
