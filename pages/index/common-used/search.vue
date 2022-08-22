<template>
	<view class="search p20">
		<u-search :showAction="false" clearabled v-model="keyword" actionText="搜索" @clear="keyword=''" @input="search">
		</u-search>
		<template v-if="keyword==''">
			<view class="find" v-if="history.length > 0">
				<view class="title">
					<view class="title">
						最近搜索
					</view>
					<view class="icon" @click="delHistory">
						<u-icon name="trash" size="20" color="#aaa"></u-icon>
					</view>
				</view>
				<view class="content">
					<view v-for="item in history" @click="find(item)">{{item}}</view>
				</view>
			</view>
			<view class="find">
				<view class="title">猜你想找</view>
				<view class="content">
					<view v-for="item in wantFind" @click="find(item)">{{item}}</view>
				</view>
			</view>
		</template>
		<view class="searchList">
			<u-row v-for="(item,index) in tmpList" @click="toPage(item.url)" class="row-item">
				<u-col span="3" class="imgbox">
					<view>
						<image :src="item.icon"></image>
					</view>
				</u-col>
				<u-col span="9">
					<view class="text">{{item.title}}</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import menu from './menu.js'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				keyword: '',
				history:[],
				menu,
				wantFind: ['日志', '工时', '审批'], //猜你想搜
				purList: [],
				tmpList: []
			}
		},
		onLoad() {
			const list = []
			//结构只拿出list
			this.menu.forEach(item => {
				[...item.list].forEach(item2 => {
					this.purList.push(item2)
				})
			})
			const history = localCache.getCache('historyIndexFind') || []
			this.history = history
			//this.tmpList = this.purList
		},
		methods: {
			search() {
				if (this.keyword) {
					this.tmpList = this.purList.filter(item => item.title.indexOf(this.keyword) != -1)
					this.tmpList = this.arrSet(this.tmpList, 'title')
					this.tmpList.forEach(item=>{
						this.setHistory(item.title)
					})
				} else {
					this.tmpList = []
				}

			},
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			arrSet(Arr, id) { //数组去重、、
				var obj = {};
				const arrays = Arr.reduce((setArr, item) => {
					obj[item[id]] ? '' : obj[item[id]] = true && setArr.push(item);
					return setArr;
				}, []);
				return arrays;
			},
			find(title){
				this.setHistory(title)
				this.keyword = title
			},
			setHistory(e){
				const history = localCache.getCache('historyIndexFind') || []
				if(history.indexOf(e) == -1){
					history.push(e)
					localCache.setCache('historyIndexFind',history)
				}
			},
			delHistory(){
				localCache.deleteCache('historyIndexFind')
				this.history = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		margin-top: 20rpx;

		.searchList {
			margin-top: 30rpx;

			.row-item {
				border-bottom: 1px solid #eee;
				padding-bottom: 10rpx;
				margin-bottom: 10rpx;

				.imgbox {
					text-align: center !important;

					image {
						width: 70rpx;
						height: 70rpx;
						margin-top: 10rpx;
					}
				}

				.text {
					font-size: 32rpx;
					color: #333;
				}
			}
		}
	}

	.find {
		margin-top: 45rpx;

		.title {
			display: flex;
			justify-content: space-between;
			.icon{
				margin-top: 8rpx;
			}
		}
		.content {
			display: flex;
			margin-top: 25rpx;
			flex-wrap: wrap;
			view {
				font-size: 28rpx;
				background-color: #ddd;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
