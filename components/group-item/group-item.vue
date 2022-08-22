<template>
	<view class="group-item p20" @click="handleClick(data)" @longpress="handleLongPress(data)">
		<view class="avatar">
			<u--image :src="data.avatar" v-if="data.avatar" width="50px" height="50px" />
			<view class="avatar-text" v-else>
				<Avatar :name="data.title" size="100rpx" />
			</view>
			<view v-if="data.isAdmin" class="admin">
				管理员
			</view>
			<u-badge bgColor="#FF4957" max="99" absolute :offset="data.isDot?[2,0]:[0,0]" :isDot="data.isDot" style="max-width:15px;" :value="data.num" />
		</view>
		<view class="desc">
			<view class="top-title">
				<view class="title" v-text="data.title"></view>
				<view class="position" v-if="data.position" v-text="data.position"></view>
			</view>
			<view class="text">
				<view v-text="data.desc"></view>
			</view>
		</view>
		<view class="right-text">
			<slot>
				<view class="time" v-text="data.time"></view>
			</slot>
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/avatar/avatar.vue'
	export default {
		name: 'group-item',
		data() {
			return {}
		},
		props: {
			data: {
				type: Object,
				default: () => {}
			}
		},
		components:{
			Avatar
		},
		mounted() {
			if(this.data && this.data.title && this.data.title.length > 15){
				this.data.title = this.data.title.substr(0,15)+'...'
			}
		},
		methods: {
			handleClick(data) {
				this.$emit('handleClick', data)
			},
			handleLongPress(data) {
				this.$emit('handleLongPress', data)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.group-item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 150rpx;
		border-bottom: 1px solid #eaeaea;

		.avatar {
			width: 50px;
			position: relative;
		}

		.desc {
			width:73vw;
			display: flex;
			flex-direction: column;
			line-height: 50rpx;
			margin-top: 5px;
			padding-left: 15rpx;
			.top-title {
				display: flex;
				.title {
					font-size: 30rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.position {
					font-size: 22rpx;
					border: 1px solid #3196FA;
					color: #3196FA;
					margin-left: 10rpx;
					border-radius: 5px;
					padding: 0 5px;
					height: 20px;
					line-height: 20px;
					margin-top: 4px;
				}
			}

			.text {
				font-size: 27rpx;
			}
		}

		.right-text {
			height: 100%;
			width: 100%;
			.time {
				text-align: right;
				font-size: 25rpx;
				color: #AAAAAA;
				margin:12rpx 0 26rpx 0
			}
		}

		.text {
			flex: 1;
			font-size: 28rpx;
			color: #666666;

			view {
				width: 60vw;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.admin {
		background-color: #F3C050;
		color: #fff;
		width: 100upx;
		font-size: 22rpx;
		text-align: center;
		position: absolute;
		bottom: 0;
		left:7vw;
		border-radius: 10px;
		transform: translate(-50%);
	}
</style>
