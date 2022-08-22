<template>
	<view class="home">
		<view class="header p20">
			<view class="title">{{title}}</view>
			<view class="time">{{date}}</view>
		</view>
		<view class="content p20">
			<view v-html="content"></view>
		</view>
	</view>
</template>

<script>
	import { myRequest } from '@/util/api.js'
	export default {
		data() {
			return {
				content:"",
				title:'通知公告',
				date:'--',
			}
		},
		async onLoad({contentType,url,title,date}) {
			//contentType目前只有8(富文本)，等有其他的再做判断
			this.date = date
			this.title = title
			const data = await myRequest({
					url,
					method:'GET',
					loading:true
			})
			this.content = data.data.replaceAll("<img","<img style='max-width:100%'")
		}
	}
</script>

<style lang="scss">
	.header{
		border-bottom: 1px solid #ddd;
		.title{
			font-size: 19px;
			color: #333;
			margin-bottom: 5px;
		}
		.time{
			color: #999;
		}
	}
	.content{
		max-width: 100vw;
		overflow: hidden;
		font-size: 15px;
		color: #333;
		line-height: 28px;
	}
	image{
		max-width: 100px!important;
	}
</style>
