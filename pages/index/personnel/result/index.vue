<template>
	<view class="result bp100">
		<view class="list p20">
			<listItem v-for="(item,index) in list" :data="item" @click="toDetails(item)"></listItem>
		</view>
		<u-empty v-show="list.length == 0" icon="/static/public/no-data.png" />
		<u-picker :show="showLevel" :columns="levelList" closeOnClickOverlay keyName="label" @close="showLevel = false"
			@cancel="showLevel = false" @confirm="confirmLevel" />
	</view>
</template>
<script>
	import listItem from './listItem.vue'
	import {
		tabList
	} from './config/oa.js'
	import {
		evaluationList,
		getCoefficientLevelEnum
	} from '@/api/hr.js'
	import localCache from '@/util/cache.js'
	
	export default {
		name: 'result',
		data() {
			return {
				showLevel: false,
				tabList,
				level: '',
				levelList: [],
				param:{
					pageNum:0,
					pageSize:10,
					evaluatedUserId:'',
					level:''
				},
				list: []
			}
		},
		onLoad() {
			const userInfo = localCache.getCache('userInfo')
			this.param.evaluatedUserId = userInfo.userId
			getCoefficientLevelEnum().then(({data})=>{
				this.levelList = [data]
			})
			this.userInfo = localCache.getCache('userInfo')
			this.param.evaluatedUserId = this.userInfo.userId
			this.loadData()
		},
		onNavigationBarButtonTap(e) {
			this.showLevel = true
		},
		components: {
			listItem,
		},
		onPullDownRefresh() {
			this.param.pageNum = 0;
			this.param.level = '';
			this.list = []
			this.loadData(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.loadData()
		},
		methods: {
			setLevel(level,id){
				const data = this.list.find(item=>item.id == id)
				data.status = level
			},
			confirmLevel(e) {
				const level = e.value[0].value
				this.showLevel = false
				this.param.level = level
				this.param.pageNum = 0
				this.list = []
				this.loadData()
			},
			toDetails(item){
				uni.navigateTo({
					url:'./details?id='+item.id+'&programmeId='+item.programmeId
				})
			},
			search(e) {
				this.loadData()
			},
			async loadData(callback) {
				++this.param.pageNum;
				const {data} = await evaluationList(this.param)
				if(data.total<=0){
					callback && callback()
					return;
				}
				data.rows.forEach(item=>{
					let time = '暂无'
					let status = ''
					let confirmTime = ''
					if(item.time){
						time = item.time.substr(0,7)+'月绩效'
					}
					if(item.pass == 1 || item.pass==6){
						status = item.pass
					}else if(item.pass == 2 && item.isAppeal==1){
						status = item.levelString
						time = time+'(申诉成功)'
					}else{
						status = item.levelString
						confirmTime = item.confirmTime
					}
					this.list.push({
						id:item.id,
						programmeId:item.programmeId,
						title:time,
						status:status,
						person:item.evaluationUserName,
						submitTime:item.submitTime,
						confirmTime
					})
				})
				callback && callback()
			}
		}
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: #F6F6F6;
	}
	.result {
		background-color: #F6F6F6;
		height: 100vh;
		padding-top: 30px;
	}
	.list {
		background-color: #F6F6F6;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.list-item{
		margin-bottom: 15px;
	}
</style>
