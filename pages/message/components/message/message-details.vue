<template>
	<view>
		<view class="tips color_fff size_12 align_c" :class="{ 'show':params.loading }" @tap="getHistoryMsg">{{params.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<detailsCom v-for="item in data" :data="item" :type="item.msgType" :id="`msg-${item.id}`" @toDetails="toDetails"></detailsCom>
			</view>
		</view>
		<u-empty v-if="data.length==0" icon="/static/public/no-data.png" />
	</view>
</template>

<script>
	import {group,notice} from '@/api/msg.js'
	import detailsCom from './details-com.vue'
	export default {
		data() {
			return {
				talkList:[],
				content:'',
				data:[],
				type:'',
				params:{
					groupId:'',
					pageSize:30,
					pageNum:1,
					flag:true,	// 请求开关
					loading:true,	// 加载中
					loadText:'正在获取消息'
				},
				total:1
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.getHistoryMsg();
			});
		},
		onPageScroll(e){
			if(e.scrollTop<5){
				this.getHistoryMsg();
			}
		},
		components:{
			detailsCom
		},
		onLoad({flagId,type}) {
			this.type = type
			this.params.groupId = flagId
		},
		methods: {
			async loadData(){
				// uni.showLoading({
				// 	title: '加载中',
				// 	mask:true
				// });
				let data = []
				if(this.type == 3){
					const groupData = await group(this.params)
					data = groupData.data
				}else{
					const noticeData = await notice({...this.params,msgType:this.type})
					data = noticeData.data
				}
				let reverseData = []
				if(data.rows){
					reverseData = data.rows.map((item,index)=>{
						if(data.rows[index+1] && item.sendDateLabel === data.rows[index+1].sendDateLabel){
							item.sendDateLabel = false
						}
						return item
					})
					this.total = data.total
				}
				return reverseData
			},
			toDetails(data){
				if(data.whetherDelete){
					uni.showToast({
						title:"该信息已删除",
						icon:"none"
					})
					return;
				}
				let url = ''
				switch(this.type){
					case '1'://普通消息
					url = `/pages/index/notice?url=${data.content}&contentType=${data.contentType}&title=${data.title}&date=${data.sendDate}`;
					break;
					case '2'://待办
					url = `/pages/index/personnel/result/details?id=${data.busId}&programmeId=${data.busId1}`;
					break;
					case '3'://群组
					const localDate = data.busDate.substr(0,10)
					url = `/pages/index/other/comment/comment?id=${data.busId}&groupId=${data.groupId}&localDate=${localDate}&commentId=${data.busId1}`;
					break;
					case '5'://公告通知
					url = `/pages/index/notice?url=${data.content}&contentType=${data.contentType}&title=${data.title}&date=${data.sendDate}`;
					break;
					default:
					url = '/pages/index/no-page'
				}
				uni.navigateTo({url})
			},
			// 获取历史消息
			getHistoryMsg(){
				if(!this.params.flag){
					return;
				}
				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async ()=>{
					this.params.flag = false;
					this.hideLoadTips();
					let data = await this.loadData();
					if(data.length === 0){
						this.params.flag = false;
						this.params.loading = false
						uni.hideLoading()
						return;
					}
					// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
					let selector = '';
					let isFirst = false
					if(this.params.pageNum>1){
						// 非第一页，则取历史消息数据的第一条信息元素
						selector = `#msg-${this.data[0].id}`;
					}else{
						isFirst = true;
						// 第一页，则取当前消息数据的最后一条信息元素
						selector = `#msg-${data[data.length-1].id}`;
					}
					// 将获取到的消息数据合并到消息数组中
					this.data = [...data,...this.data];
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(()=>{
						// 设置当前滚动的位置
						this.setPageScrollTo(selector,isFirst);
						this.hideLoadTips(true);
						if(data.length < this.params.rows){
							// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							// 可在此处编写无更多消息数据时的逻辑
						}else{
							this.params.pageNum ++;
							// 延迟 200ms ，以保证设置窗口滚动已完成
							setTimeout(()=>{
								this.params.flag = true;
							},200)
						}
					})
				}
				get();
			},
			hideLoadTips(flag){
				if(flag){
					this.params.loadText = '消息获取成功';
					setTimeout(()=>{
						this.params.loading = false;
					},300);
				}else{
					this.params.loading = true;
					this.params.loadText = '正在获取消息';
				}
			},
			// 设置页面滚动位置
			setPageScrollTo(selector,isFirst){
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					if(isFirst){
						//第一次加载。到最下面
						uni.pageScrollTo({
						    scrollTop:10000,
						    duration: 0
						});
						//uni.hideLoading()
					}else{
						this.$nextTick(()=>{
							uni.pageScrollTo({
							    scrollTop:res.top -30,	// -30 为多显示出大半个消息的高度，示意上面还有信息。
							    duration:0
							});
							//uni.hideLoading()
						})
					}
				}).exec();
			}
		}
	}
</script>

<style lang="scss">
	page{
		//		background-color: #f3f3f3
		background-color: #f3f3f3;
		font-size: 28rpx;
	}
	.talk-list{
		padding-bottom: 200rpx;
	}
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top:var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		text-align: center;
		&.show{
			transform:translateY(0);
		}
	}
</style>