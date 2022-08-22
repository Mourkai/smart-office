<template>
	<view class="message">
		<uni-swipe-action v-if="data.length > 0">
			<!-- 基础用法 -->
			<uni-swipe-action-item :right-options="getOptions(item)" v-for="(item,index) in data"
				@click="e=>clickRight(e,item)">
				<groupItem :data="item" @handleClick="toDetails(item)" />
			</uni-swipe-action-item>
		</uni-swipe-action>
		<u-empty icon="/static/public/no-data.png" v-else />
	</view>
</template>

<script>
	import groupItem from '@/components/group-item/group-item.vue'
	import {
		index,
		del,
		count,
		clearDot
	} from '@/api/msg.js'
	export default {
		name: 'message',
		components: {
			groupItem
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				count:0,
				data: []
			}
		},
		mounted() {
			this.$EventBus.$on('socketMessage', item => {
				this.loadData();
				// uni.setNavigationBarTitle({
				// 	title: "收取中..."
				// })
				// const index = this.data.findIndex(item2=>item2.id==item.id)
				// const newData = this.pushData(item)
				// if(index !== -1){
				// 	this.data.splice(index,1)
				// }
				// this.data.unshift(newData)
				// const count = ++this.count
				// uni.setTabBarBadge({
				// 	index: 0,
				// 	text: count.toString()
				// })
				// uni.setNavigationBarTitle({
				// 	title: "消息" + count
				// })
			})
			this.loadData();
		},
		methods: {
			getOptions(item){
				if(item.title == '待办通知'){
					return []
				}
				return this.options
			},
			pushData(item){
				let isDot = false
				if (item.whetherNewMsg) {
					isDot = true
				}
				if (item.type === 3 && item.relatedToMeNum > 0) { //群组
					isDot = false
				}
				if (item.type !== 3) {
					isDot = false
					//item.content = item.customTypeLabel + "：" + item.content
					item.content = item.content
				}
				let avatar = ''
				switch(item.type){
					case 5:
					avatar = '/static/public/gonggaotongzhi.png';break;//type 3 公告通知
					case 2:
					avatar = '/static/public/daibantongzhi.png';break;//type 2 待办
					case 1:
					avatar = '/static/public/xiaoxitongzhi.png';break;//type 3 通知
					default:
					avatar = '/static/public/group-icon.png';//type 1 群组
				}
				return {
					id: item.id,
					flagId: item.flagId,
					title: item.title,
					avatar,
					desc: item.content,
					time: item.sendDateLabel,
					isDot,
					type:item.type,
					num: item.relatedToMeNum,
				}
			},
			async loadData(fn) {
				uni.setNavigationBarTitle({
					title: "收取中..."
				})
				const {
					data
				} = await index()
				if (data) {
					const list = data.map(item => {
						return this.pushData(item)
					})
					fn && fn()
					this.data = list
					this.setCount()
				}else{
					fn && fn()
				}
			},
			async clickRight(e, pData) {
				if (e.index === 0) {
					const delIndex = this.data.find(item => item.id == pData.id)
					this.data.splice(delIndex, 1)
					await del(pData.id)
					this.setCount()
				}
			},
			toDetails(e) {
				if ((e.isDot || e.num) && e.type != 2) {
					clearDot(e.id)
					e.num = ''
					e.isDot = false
				}
				uni.navigateTo({
					url: '/pages/message/components/message/message-details?flagId=' + e.flagId+'&type='+e.type
				})
			},
			async setCount() {
				let c = '';
				let {
					data
				} = await count()
				if (data && data > 0) {
					c = ` (${data})`
				}
				this.count = data
				uni.setNavigationBarTitle({
					title: "消息" + c
				})
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
			},
			pullDown() {
				uni.setNavigationBarTitle({
					title: "收取中..."
				})
				this.loadData(() => {
					uni.stopPullDownRefresh()
				});
			}
		}
	}
</script>
<style lang="scss" scoped></style>
