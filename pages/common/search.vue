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
	import {project,area} from '@/pages/common/data.js'
	export default {
		data() {
			return {
				list:[],
				tmpList: [],
				type:'',
				keyword: '',
				project,
				area
			}
		},
		async onLoad({type}) {
			this.type = type
			let data = []
			if(type=='area'){
				data = this.area.map(item=>{
					return {
						title:item.cityName,
						keyword:item.commonName,
						desc:item.commonName,
						...item
					}
				})
			}
			if(type=='project'){
				let project = this.project
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
