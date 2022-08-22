<template>
	<view class="search ">
		<u-sticky style="padding: 0 20rpx;">
			<view style="background-color: #fff;width: 100%;padding:25rpx 0;">
				<u-search :showAction="false" clearabled v-model="keyword" actionText="搜索" @clear="keyword=''" @input="search" />
			</view>
		</u-sticky>
		<view class="searchList p20">
			<view class="item" v-for="(item,index) in tmpList" @click="choose(item)">
				<view class="title" v-text="item.title"></view>
				<view class="desc" v-text="item.desc"></view>
			</view>
			<u-empty v-show="tmpList.length == 0" icon="/static/public/no-data.png" />
		</view>
	</view>
</template>

<script>
	import {
		areaCommon
	} from '@/api/system.js'
	
	import {
		getProject
	} from '@/api/project'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				list:[],
				tmpList: [],
				type:'',
				keyword: ''
			}
		},
		async onLoad({type}) {
			this.type = type
			let data = []
			if(type=='area'){
				let area = localCache.getCache('cityList')
				if(!area){
					area = await areaCommon()
				}
				data = area.map(item=>{
					return {
						title:item.cityName,
						keyword:item.commonName,
						desc:item.commonName,
						...item
					}
				})
			}
			if(type=='project'){
				let project = localCache.getCache('projectList')
				if(!project){
					project = await getProject({notOver:true})
				}
				data = project.map(item=>{
					return {
						title:item.name,
						keyword:item.name+item.code,
						desc:item.code,
						...item
					}
				})
			}
			this.list = data
			this.tmpList = data
		},
		methods: {
			search() {
				if (this.keyword) {
					this.tmpList = this.list.filter(item=>item.keyword.indexOf(this.keyword)!==-1)
				} else {
					this.tmpList = this.list
				}
			},
			choose(data) {
				const re = {
					type:this.type,
					data
				}
				this.$EventBus.$emit("changeProjectOrArea", re);
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		.searchList {
			.item {
				border-bottom: 1px solid #eee;
				padding:20rpx 0;
				margin-bottom: 10rpx;
				.title {
					font-size: 32rpx;
					color: #333;
					margin-bottom: 5rpx;
				}
				.desc{
					font-size: 29rpx;
					color: #aaa;
				}
			}
		}
	}
</style>
