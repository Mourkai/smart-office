<template>
	<view class="notice-item">
		<view class="time" v-if="data.sendDateLabel">
			<u-divider :text="data.sendDateLabel"></u-divider>
		</view>
		<view class="content p20">
			<view class="avatar">
				<u--image :src="avatarImage[type]" width="35px" height="35px"/>
			</view>
			<view class="right-block" v-if="data.whetherRelatedToMe">
				<view class="name">
					{{data.typeLabel}}
				</view>
				<view class="desc">
					<template v-if="data.whetherDelete">
						<view class="desc-text p20">[{{data.sendUserName}}删除了该评论]</view>
					</template>
					<template v-else>
						<view class="atme">
							{{data.sendUserName}}{{data.statusLabel}}
						</view>
						<view class="desc-text atdesc">
							{{data.content}}
						</view>
					</template>
					<view class="seeDetails" @click="toDetails(data)">
						查看详情
					</view>
				</view>
			</view>
			<view v-else class="right-block">
				<view class="name">
					{{data.typeLabel}}
				</view>
				<view class="desc">
					<view class="desc-text p20" v-if="data.whetherDelete">
						[{{data.sendUserName}}删除了该评论]
					</view>
					<view v-else class="desc-text p20">
						{{data.title}}
					</view>
					<view class="seeDetails" @click="toDetails(data)">
						查看详情
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarImage:[
					'',
					'/static/public/xiaoxitongzhi.png',//消息通知
					'/static/public/daibantongzhi.png',//待办
					'/static/public/group-icon.png',//群组
					'',
					'/static/public/gonggaotongzhi.png',//公告通知
				]
			}
		},
		props:{
			data:{
				type:Object,
				default:()=>{}
			},
			type:{
				type:String | Number,
				default:3
			}
		},
		methods: {
			toDetails(data){
				this.$emit('toDetails',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-item{
		.time{
			width: 400rpx;
			margin: 50rpx auto 0 auto;
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			color: #666666;
			font-size: 25rpx;
		}
		.content{
			display: flex;
			.right-block{
				margin-left:20rpx;
				display: flex;
				flex-direction: column;
				color: #333333;
				.name{
					background-color: #eaeffa;
					border-top-left-radius: 8px;
					border-top-right-radius: 8px;
					padding: 7px 7px 7px 12px;
					color: #2A66F2;
					font-size: 15px;
				}
				.desc{
					min-width: 200px;
					background-color: #fff;
					border-bottom-left-radius: 8px;
					border-bottom-right-radius: 8px;
					box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
					.atme{
						color: #3196FA;
						padding: 12px 0 0 12px;
					}
					.atdesc{
						padding:4px 0 8px 12px;
					}
				}
				
			}
		}
	}
	.seeDetails{
		padding: 6px 0;
		text-align: center;
		border-top:1rpx solid #E4E4E4;
		color: #2A66F2;
		font-size: 26rpx;
	}
</style>