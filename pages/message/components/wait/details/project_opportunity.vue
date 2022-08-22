<template>
	<view>
		<view class="content">
			<view class="pro-title">
				商机信息
			</view>
			<view class="content-item">
				<view class="title">流程编码</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">商机编号</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">商机名称</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">商机状态</view>
				<view class="desc" v-text="status[data.status]"></view>
			</view>
			<view class="content-item">
				<view class="title">负责人</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">相关人</view>
				<view class="desc" v-text="data.relatedPersonName"></view>
			</view>
			<view class="content-item">
				<view class="title">客户名称</view>
				<view class="desc" v-text="data.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">客户联系人</view>
				<view class="desc" v-text="customer"></view>
			</view>
			<view class="content-item">
				<view class="title">当前阶段</view>
				<view class="desc" v-text="stage[data.stage]"></view>
			</view>
			<view class="content-item">
				<view class="title">商机所属部门</view>
				<view class="desc" v-text="data.customerDeptName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目类型</view>
				<view class="desc" v-text="type[data.type]"></view>
			</view>
			<view class="content-item">
				<view class="title">预估金额</view>
				<view class="desc" v-text="data.price+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">预计成单率</view>
				<view class="desc" v-text="data.buddagePercentage+' %'"></view>
			</view>
			<view class="content-item">
				<view class="title">主要竞争对手</view>
				<view class="desc" v-text="data.competitor"></view>
			</view>
			<view class="content-item">
				<view class="title">商机主要内容</view>
				<view class="desc" v-text="data.content"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		businessOpportunity,
		customernameData
	} from "@/api/project.js"
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {
				},
				customer:"",
				type: ['', '咨询', '实施', '运维', '研发', '硬件', '集成', '其他'], //项目类型
				status: ['', '跟踪中', '招标中', '已关闭'], //商机状态
				stage: ['', '初步沟通', '意向需求', '关键人认同', '商务谈判', '签约', '丢失'] //商机状态
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			files
		},
		async mounted() {
			let {
				data
			} = await businessOpportunity(this.id)
			this.data = data

			customernameData({
				id:this.data.customerId
			}).then(({data})=>{
				this.customer = data[0].customer
			})
		}
	}
</script>
<style lang="scss" scoped>
	@import "../config/details.scss";

	.content .content-item .title {
		min-width: 210rpx;
	}
</style>
