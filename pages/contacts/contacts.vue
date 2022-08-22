<template>
	<view>
		<view class="search">
			<!-- <u-search :showAction="false" clearabled v-model="keyWord" style="width: 90%;" actionText="搜索" @clear="keyWord=''" @input="search" /> -->
			<view class="title">
				<view class="dep" v-text="orgName" @click="toDep"></view>
			</view>
		</view>
		<view class="scroll">
			<view v-for="(item,index) in tmp">
				<view class="info" @click="toDetails(item.id,item.color)">
					<view class="icon">
						<view class="icon">
							<Avatar :name="item['name']" :sex="item.sex" size="100rpx"></Avatar>
						</view>
					</view>
					<view class="item">
						<text class="name" v-text="item.name"></text>
						<text class="post" v-text="item.orgName"></text>
					</view>
				</view>
			</view>
			<u-divider v-if="isBottom" :text="total+'位联系人'"></u-divider>
			<u-empty v-if="isOver" icon="/static/public/no-data.png" />
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/avatar/avatar.vue'
	import {
		getAppUserList
	} from '@/api/system.js'
	import {mixin} from "./config/mixin.js";
	export default {
		mixins:[mixin],
		data() {
			return {
				
			}
		},
		components:{
			Avatar
		},
		methods: {
			toDetails(userId,color) {
				uni.navigateTo({
					url: `/pages/contacts/details?userId=${userId}&color=${color}`
				})
			},
			toDep(){
				uni.navigateTo({
					url:'dep'
				})
			},
			close() {
				this.$emit('close')
			},
			onReachBottom() {
				this.reachBottom()
			},
			onPullDownRefresh() {
				this.pullDownRefresh()
			}
		},
	};
</script>

<style lang="scss" scoped>
	page {
		box-sizing: border-box;
		overflow: hidden;
	}

	.search {
		position: fixed;
		z-index: 9;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		padding-top: 20rpx;
		margin-bottom: 20rpx;
.s-input{
			height: 70rpx;
		}
		.close {
			display: flex;
			width: 100%;
			height: 80rpx;
			justify-content: space-around;

			.u-button {
				width: 30%;
				height: 60rpx;
			}
		}

		.title {
			display: flex;
			text-align: left;
			width: 100%;
			box-sizing: border-box;
			padding:2rpx 10rpx;
			overflow: hidden;
			font-size: 30rpx;

			.dep {
				color: #666;
				padding: 20rpx 30rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
			}

			.icon {
				width: 10%;
			}
		}
	}

	.s-input {
		width: 90%;
		height: 75rpx;
		background: url('data:image/png;base64,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') 20upx center no-repeat #fff;
		background-size: 40upx;
		text-indent: 80upx;
		border-radius: 40rpx;
		border: 1px solid $main-color;
		font-size: 30rpx;
	}


	.info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 4rpx;
		padding: 20upx 25upx;
		color: #444444;
		font-size: 32rpx;
		background: #fff;

		.post {
			font-size: 30rpx;
			color: #666666;
		}
	}

	.icon {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #fff;
	}

	.item {
		height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
	}

	.scroll {
		position: absolute;
		left: 0;
		top: 130rpx;
		right: 0;
		background-color: #fff;
		padding-bottom: 150rpx;
	}
</style>
