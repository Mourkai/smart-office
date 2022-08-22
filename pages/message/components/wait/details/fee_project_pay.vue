<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				付款信息
			</view>
			<view class="content-item">
				<view class="title">付款科目</view>
				<view class="desc" v-text="getType(data.payType)"></view>
			</view>
			<view class="content-item">
				<view class="title">付款金额</view>
				<view class="desc" v-text="data.payPrice"></view>
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
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		projectPay,
		getPayTypeEnum
	} from '@/api/fee.js'
	import projectInfo from './projectInfo.vue'
	export default {
		data() {
			return {
				data:{},
				type:[]
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
			let {data} = await projectPay(this.id)
			const r1 = await getPayTypeEnum()
			this.type = r1.data
			this.data = data
		},
		methods:{
			getType(type){
				let str = ''
				this.type.map(item=>{
					if(item.value == type){
						str = item.label
					}
				})
				return str
			}
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
