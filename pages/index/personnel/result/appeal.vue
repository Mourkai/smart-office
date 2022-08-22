<template>
	<view class="details">
		<view>
			<view class="title p20">
				申诉理由
			</view>
			<u--textarea v-model="reason" height="200" maxlength="9999" placeholder="请输入内容" border="bottom"></u--textarea>
		</view>
		<view class="botbtn">
			<u-button type="primary" text="确定" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		appealEvaluation
	} from '@/api/hr.js'
	export default {
		data() {
			return {
				id: '',
				reason: '',
			};
		},
		onLoad(data) {
			this.id = data.id
		},
		methods:{
			submit(){
				appealEvaluation({
					id:this.id,
					reason:this.reason
				}).then(res=>{
					if(res.data){
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.title{
		background-color: #fff;
	}
	.botbtn{
		position: fixed;bottom: 0;width: 100%;box-sizing: border-box;padding:10px 15px 20px 15px;background-color: #fff;
		border: 1px solid #fff;
		box-shadow:0px -2px 6px 0px rgba(0,0,0,0.0600);
	}
</style>
