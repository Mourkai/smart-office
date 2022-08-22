<template>
	<view>
		<view class="content">
			<view class="pro-title">
				附件
			</view>
			<view class="file-item" v-for="(item,index) in files">
				<view class="icon">
					<u-icon name="file-text-fill" color="#3A95E9" size="18"></u-icon>
				</view>
				<view class="file-name" v-text="item.name+'.'+item.ext"></view>
				<view class="see">
					<u-button type="primary" @click="openDoc(item.url)" shape="circle" text="查看"></u-button>
				</view>
			</view>
			<view class="content-item" v-if="!files">
				<view class="title">无</view>
			</view>
		</view>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {}
		},
		props: {
			files: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			openDoc(url) {
				//测试http://192.168.1.109:8012/picturesPreview?url=
				const src = 'http://182.48.110.151:5888/preview/onlinePreview?url='+encodeURIComponent(btoa(url))
				uni.navigateTo({
					url:'/pages/common/fileView?url='+src
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
