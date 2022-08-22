<template>
	<view class="list-item" @click="clickItem(data)">
		<u-row>
			<u-col span="8">
				<view class="title" v-text="data.title"></view>
				<view class="desc">考评人员：{{data.person}}</view>
				<view class="desc">提交时间：{{data.submitTime}}</view>
				<view class="desc" v-if="data.confirmTime">确认时间：{{data.confirmTime}}</view>
			</u-col>
			<u-col span="4">
				<view class="level">
					<image src="/static/menu/result/sji.png" v-if="data.status == 'S'" mode=""></image>
					<image src="/static/menu/result/aji.png" v-if="data.status == 'A'" mode=""></image>
					<image src="/static/menu/result/bji.png" v-if="data.status == 'B'" mode=""></image>
					<image src="/static/menu/result/cji.png" v-if="data.status == 'C'" mode=""></image>
					<image src="/static/menu/result/dji.png" v-if="data.status == 'D'" mode=""></image>
					<image src="/static/menu/result/daiqueren.png" v-if="data.status == 6" mode=""></image>
					<image src="/static/menu/result/shensuzhong.png" v-if="data.status == 1" mode=""></image>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name: 'result',
		data() {
			return {}
		},
		props:{
			data:{
				type:Object,
				default:()=>{}
			}
		},
		methods:{
			clickItem(e){
				this.$emit('click',e)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.list-item{
		background-color:#fff;
		border-radius:8px;
		padding:5px 15px;
		.title{
			color: #25292C;
			font-size: 18px;
			line-height:35px;
		}
		.desc{
			color: #959597;
			font-size: 14px;
			line-height: 25px;
		}
		.level{
			text-align: right;
		}
		.level image{
			width:90px;
			height:90px;
		}
	}
</style>
