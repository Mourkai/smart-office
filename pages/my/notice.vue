<template>
	<view class="notice">
		<u-cell-group>
			<u-cell
			    size="large"
			    title="允许通知"
			    value="已关闭"
			    label="更改通知状态，请在本机的“设置”—“通知”功能中， 找到应用程序进行更改。"
			></u-cell>
			<view class="content">
				<u-cell title="声音" :arrow="false">
					<view slot="right-icon">
						<u-switch v-model="value" @change="change"></u-switch>
					</view>
				</u-cell>
				<u-cell title="振动">
					<view slot="right-icon">
						<u-switch v-model="value2" @change="change"></u-switch>
					</view>
				</u-cell>
			</view>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: 'my',
		data() {
			return {
				value:true,
				value2:false,
			}
		},
		onLoad() {},
		components: {

		},
		methods: {
			logout() {
				this.$store.dispatch('logout')
			},
			change(e) {
			},
		}
	}
</script>
<style lang="scss" scoped>
	page{
		position: relative;
		height: 100%;
	}
	.content{
		border-top: 10rpx solid #f2f2f2;
		/deep/.u-cell__title-text{
			font-size: 30rpx;
		}
	}
	.btn{
		position: fixed;
		bottom: 150rpx;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60%;
	}
	.u-cell-group{
		.u-slot-title{
			display: flex;
			align-items: center;
			.text{
				margin-left: 20rpx;
				.name{
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.dep{
					font-size: 28rpx;
					color: #999;
				}
			}
		}
		/deep/.u-cell__body{
			align-items: flex-start;
			.u-cell__value--large{
				color: red;
			}
		}
	}
</style>
