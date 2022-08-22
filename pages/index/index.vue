<template>
	<view class="home">
		<view class="fixed-header">
			<CustomHeader ref="cheader" isSearch />
		</view>
		<view class="fixed-body">
			<u-swiper :list="bannerList" indicatorMode='dot' autoplay radius='7' :height="swiperHeight" indicator></u-swiper>
			<view class="notice" v-if="notice">
				<u-notice-bar :text="notice" @click="toPage(noticeUrl)" bgColor="#fff"></u-notice-bar>
			</view>
			<u-collapse v-model="activeName" v-for="(item,index) in menu" :key="item.name" accordion>
				<u-collapse-item :title="item.name" name='open' :duration="0">
					<view class="flexbox">
						<view class="menu-item" v-for="(item2,index2) in item.list" :key="item2.title"
							@click="toPage(item2.url)">
							<u-badge v-show="item2.isDot" isDot absolute :offset="['3px','22%']" style="z-index:1;"></u-badge>
							<u-badge v-show="item2.badge" :value="item2.badge" absolute :offset="['3px','16%']" style="z-index:1;"></u-badge>
							<image :src="item2.icon"></image>
							<view class="text">{{item2.title}}</view>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	import CustomHeader from '@/components/custom-header/custom-header.vue'
	import menu from './menu.js'
	import localCache from '@/util/cache.js'
	import {
		getAppUserList
	} from '@/api/system.js'
	import {
		count,
		getNumByType,
		indexNotice
	} from '@/api/msg.js'
	import {
		isHaveEvaluationUnconfirmed
	} from '@/api/hr.js'
	export default {
		data() {
			return {
				activeName: 'open', //展开name为open的折叠板11
				notice: '',
				noticeUrl: '',
				bannerList: [
					'/static/public/banner1.jpg',
					'/static/public/banner2.jpg',
					'/static/public/banner3.jpg'
				],
				platform: '',
				swiperHeight:'130',
				menu
			}
		},
		components: {
			CustomHeader
		},
		async onLoad() {
			const {data} = await indexNotice()
			this.notice = data.title
			const url = `/pages/index/notice?url=${data.content}&contentType=${data.contentType}&title=${data.title}&date=${data.sendDate}`;
			this.noticeUrl = url
		},
		async onShow() {
			//判断是否有待确认绩效
			isHaveEvaluationUnconfirmed().then(res=>{
				const resultData = !!res.data
				this.setMenu(0,4,resultData)
				this.setMenu(3,5,resultData)
			})
			
			//获取每日一评数量
			getNumByType(3).then(({data})=>{
				let isDot = false;
				let badge = 0
				if(data){
					if(data.whetherNewMsg){
						isDot = true
					}
					if(data.relatedToMeNum > 0){
						isDot = false
						badge = data.relatedToMeNum
					}
					this.setMenu(0,3,isDot,badge)
					this.setMenu(6,0,isDot,badge)
				}
			})
			if (this.$refs.cheader) {
				this.$refs.cheader.updateHeader()
			}
			const {
				data
			} = await count()
			if (data > 0) {
				uni.setTabBarBadge({
					index: 0,
					text: data.toString()
				})
			} else {
				uni.removeTabBarBadge({
					index: 0
				})
			}
			uni.getSystemInfo({
				success: (e) => {
					if(e.safeArea.width < 350){
						this.swiperHeight = 100
					}
				}
			})
		},
		methods: {
			back() {},
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			setMenu(menuIndex,listIndex,isDot,badge){
				if(isDot){
					this.$set(this.menu[menuIndex].list,listIndex,{...this.menu[menuIndex].list[listIndex],isDot:true})
				}else{
					this.$set(this.menu[menuIndex].list,listIndex,{...this.menu[menuIndex].list[listIndex],isDot:false})
				}
				if(badge){
					this.$set(this.menu[menuIndex].list,listIndex,{...this.menu[menuIndex].list[listIndex],badge})
				}else{
					this.$set(this.menu[menuIndex].list,listIndex,{...this.menu[menuIndex].list[listIndex],badge:0})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx 100rpx 20rpx;
	}

	.fixed-header {
		position: fixed;
		width: 100%;
		background-color: #fff;
		z-index: 9;
		top: 0;
		left: 0;
	}

	.fixed-body {
		position: absolute;
		width: 100%;
		top: 290rpx;
		padding-bottom: 200rpx;
	}

	.home {
		position: relative;

		.u-swiper {
			overflow: hidden;
			uni-image {
				height: 260px;
			}
		}

		.notice {
			background-color: #fff;
			width: 100%;
			overflow: hidden;
			height: 70rpx;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
			display: flex;
			line-height: 70rpx;
			align-items: center;

			.volume {
				width: 40rpx;
				height: 40rpx;
				margin-left: 30rpx;
				border-radius: 10rpx;
				//background-color: #FF943E;
			}

			.text {
				font-size: 28rpx;
				margin-left: 10rpx;
				display: flex;
				color: #666666;
			}

			.u-notice-bar {
				padding: 0 0 0 20rpx;

				/deep/.u-notice__content__text {
					padding-left: 80rpx;
				}
			}
		}

		.u-collapse-item {
			margin-top: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			height: auto;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

			.flexbox {
				display: flex;
				flex-wrap: wrap;
				.menu-item {
					display: flex;
					flex-direction: column;
					text-align: center;
					width: 25%;
					margin-bottom: 25rpx;
					font-size: 22rpx;
					position: relative;
					image {
						width: 56px;
						margin: 0 auto 10rpx auto;
						height: 56px;
					}
				}
			}
		}

		/deep/.u-line {
			border: 1px solid transparent !important;
		}

		/deep/.u-collapse-item__content__text {
			padding: 0 10rpx 24rpx 0;
		}

		/deep/.u-cell__body {
			padding: 20rpx 30rpx 20rpx 30rpx;
		}

		/deep/.u-collapse-item__content__text {
			padding: 0 4px 0 0;
		}

		/deep/.uicon-volume-fill {
			line-height: 40rpx !important;
		}

		// /deep/.u-swiper__wrapper,.u-swiper,/deep/.u-swiper__wrapper__item__wrapper__image{
		// 	height: 260px !important;
		// }
	}
</style>
