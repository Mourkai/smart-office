<template>
	<view>
		<view class="content">
			<view class="pro-title">
				项目信息
			</view>
			<view class="content-item">
				<view class="title">流程编码</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.projectManagerName"></view>
			</view>
			<view class="content-item">
				<view class="title">所属部门</view>
				<view class="desc" v-text="data.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">部门负责人</view>
				<view class="desc" v-text="data.leaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">所属业务线</view>
				<view class="desc" v-text="data.businessLineName"></view>
			</view>
			<view class="content-item" v-if="showLevel">
				<view class="title">项目等级</view>
				<view class="desc" v-text="data.levelString"></view>
			</view>
			<view class="content-item" v-if="showType">
				<view class="title">项目类型</view>
				<view class="desc" v-text="data.typeString"></view>
			</view>
			<view class="content-item" v-if="showPrice">
				<view class="title">预计合同金额</view>
				<view class="desc" v-text="data.price"></view>
			</view>
			<view class="content-item" v-if="showContractType">
				<view class="title">合同类型</view>
				<view class="desc" v-text="data.contractTypeString"></view>
			</view>
			<view class="content-item" v-if="showCreateDate">
				<view class="title">立项日期</view>
				<view class="desc" v-text="data.createDate"></view>
			</view>
			<view class="content-item" v-if="showCycle">
				<view class="title">项目周期</view>
				<view class="desc" v-text="data.formalProjectDto.startDate+' ~ '+data.formalProjectDto.endDate"></view>
			</view>
			<view class="content-item" v-if="showCustomer">
				<view class="title">委托方</view>
				<view class="desc" v-text="data.customerName"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProjectInfo,
		getProjectLevelEnum,
		getProjectTypeEnum
	} from '@/api/project'
	export default {
		data() {
			return {
				data:{
					instanceNo:'',
					name:'',
					formalProjectDto:{}
				}
			}
		},
		props: {
			id: {
				type:String,
				default: ""
			},
			showLevel: {
				type:Boolean,
				default: false
			},
			showType: {
				type:Boolean,
				default: false
			},
			showContractType: {
				type:Boolean,
				default: false
			},
			showPrice: {
				type:Boolean,
				default: false
			},
			showCreateDate: {
				type:Boolean,
				default: false
			},
			showCycle: {
				type:Boolean,
				default: false
			},
			showCustomer: {
				type:Boolean,
				default: false
			}
		},
		watch:{
			async id(){
				const {data} = await getProjectInfo(this.id)
				if(this.showLevel && data.level){
					const r1 = await getProjectLevelEnum()//获取项目等级
					const r1Data = r1.data.find(item=>item.value == data.level)
					data.level = r1Data.label
				}
				if(this.showType){
					const r2 = await getProjectTypeEnum()//获取项目类型
					const r2Data = r2.data.find(item=>data.type  == item.value)
					data.type = r2Data.label
				}
				this.data = data
				this.$emit('handleData',data)
			}
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
	}
</style>
