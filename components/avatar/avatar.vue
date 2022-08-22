<template>
	<view>
		<!-- <view class="icon" :style="{'width':size,'height':size,'font-size':fontSize}">
			{{name.substring(name.length-2,name.length)}}
		</view>
		 0==男  1==女
		 -->
		<u--image :showLoading="true" v-if="sex == 0" src="/static/public/men.png" :width="size" :height="size"></u--image>
		<u--image :showLoading="true" v-if="sex == 1" src="/static/public/women.png" :width="size" :height="size"></u--image>
	</view>
</template>

<script>
	export default {
		name:"avatar",
		props:{
			name:{
				type:String,
				default:"空"
			},
			size:{
				type:String,
				default:"100rpx"
			},
			fontSize:{
				type:String,
				default:"85%"
			},
			sex:{
				type:Number | String,
				default:0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
		.icon {
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #3196FA;
		}
</style>
