<template>
	<view class="message">
		<view class="search">
			<u-search :showAction="false" clearabled shape="square" v-model="keyWord" bgColor="#F5F6F8" style="width: 90%;" actionText="搜索"
				@clear="keyWord=''" />
		</view>
		<view class="scroll">
			<view v-if="data.length > 0">
				<groupItem v-for="(item,index) in data" :data="item" @handleClick="toDetails" />
			</view>
			<u-empty icon="/static/public/no-data.png" v-else />
		</view>
	</view>
</template>

<script>
	import groupItem from '@/components/group-item/group-item.vue'
	import { groupInfoList } from '@/api/system.js'
	import localCache from '@/util/cache.js'
	export default {
		name: 'message',
		components: {
			groupItem
		},
		data() {
			return {
				keyWord:'',
				param:{
					pageNum:0,
					pageSize:20,
					userId:'',
					name:''
				},
				data: [],
				isOver:false
			}
		},
		watch:{
			async keyWord(name){
				this.param.pageNum=0
				this.param.pageSize=999
				this.param.name=name
				this.data = []
				this.loadData()
			}
		},
		onShow() {
			const userInfo = localCache.getCache('userInfo')
			this.param.userId = userInfo.userId
			this.loadData()
		},
		onPullDownRefresh() {
			this.param.pageNum = 0;
			this.param.name = '';
			this.data = []
			this.keyWord = ''
			this.loadData(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.loadData()
		},
		methods: {
			clickRight(e, id) {
				if (e.index === 1) {
					const delIndex = this.data.find(item => item.id == id)
					this.data.splice(delIndex, 1)
				}
			},
			toDetails(e) {
				uni.navigateTo({
					url: './details?id='+e.id
				})
			},
			async loadData(fn){
				++this.param.pageNum
				const {data} = await groupInfoList(this.param)
				if(data.total<=0){
					return;
				}
				data.rows.forEach(item=>{
					let isDot = false
					let num = 0;
					if(!item.newMsgAtMe && item.newMsg){
						isDot = true
					}else if(item.newMsgAtMe){
						num = item.newMsgAtMe
					}
					this.data.push({
						id: item.id,
						title:item.name,
						desc: item.users.length+'人',
						avatar:'/static/public/group-icon.png',
						time:item.lastDate,
						isDot,
						num	
					})
				})
				fn && fn()
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		position: fixed;
		z-index: 9;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		padding:25rpx 0;
		margin-bottom: 20rpx;
		border-bottom: 8px solid #F6F6F6;
		.s-input {
			height: 70rpx;
		}
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
