<template>
	<view class="comment">
		<view class="in-title" :style="{'padding-top':(barHeight+10)+'px'}">
			<view class="title">
				{{title}}
			</view>
			<view class="secend-title">
				<view class="s-title">
					工作日志
				</view>
				<view class="s-time" v-text="dailyRecordDto.fillDate"></view>
			</view>
			<view class="avatar">
				<Avatar :name="dailyRecordDto.userName" :sex='sex' size="70px" fontSize="17px"></Avatar>
			</view>
			<view class="radius"></view>
		</view>
		<view class="container">
			<view class="content">
				<u-tabs :list="list1" v-if="data.length==2" @click="tabClick"></u-tabs>
				<view class="in-content">
					<view class="content-item">
						<h5 class="title">
							项目名称
						</h5>
						<view class="desc" v-text="data[topCurrent].projectName"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							项目编码
						</h5>
						<view class="desc" v-text="data[topCurrent].projectCode"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							流程编码
						</h5>
						<view class="desc" v-text="data[topCurrent].instanceNo"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							工时类型
						</h5>
						<view v-if="data.length == 1">
							<div class="desc">
								上午：{{data[topCurrent].amWorkType}}
							</div>
							<div class="desc">
								下午：{{data[topCurrent].pmWorkType}}
							</div>
						</view>
						<view class="desc" v-if="data.length == 2 && topCurrent==0">
							{{data[topCurrent].amWorkType}}
						</view>
						<view class="desc" v-if="data.length == 2 && topCurrent==1">
							{{data[topCurrent].pmWorkType}}
						</view>
					</view>
					<view class="content-item">
						<h5 class="title">
							工作城市
						</h5>
						<view class="desc" v-text="data[topCurrent].city"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							工作地点
						</h5>
						<view class="desc" v-text="data[topCurrent].address"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							今日完成
						</h5>
						<view class="desc" v-html="data[topCurrent].todayReport"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							明日计划
						</h5>
						<view class="desc" v-html="data[topCurrent].nextDayPlan"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							工作备忘
						</h5>
						<view class="desc" v-html="data[topCurrent].memo"></view>
					</view>
					<view class="content-item">
						<h5 class="title">
							工作建议
						</h5>
						<view class="desc" v-html="data[topCurrent].suggest"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="comment-view">
			<hb-comment ref="hbComment" @add="add" @del="del" @focusOn="focusOn" :deleteTip="'确认删除？'"
				:cmData="commentData" v-if="commentData" :commentId="commentId" :atList="[users]" @position="toArea"></hb-comment>
		</view>
	</view>
</template>

<script>
	import projectDaily from '@/pages/message/components/wait/details/project_daily.vue'
	import Avatar from '@/components/avatar/avatar.vue'
	import {
		cd
	} from './config/oa.js'
	import {
		getProject,
		getWorkType,
		getDaily,//日报日志
		dailyRecordComment,
		dailyRecordCommentList,
		dailyRemoveComment
	} from '@/api/project.js'
	import localCache from '@/util/cache.js'
	import {
		areaCommon,
		groupInfo
	} from '@/api/system.js'
	export default {
		name: 'comment',
		data() {
			return {
				data: [{
					instanceNo:'',
					fillDate:'',
				}],
				id: '',
				commentId: '',
				sex:0,
				groupId: '',
				title: '工作日志',
				barHeight: 0,
				commentData: {},
				userInfo: {},
				dailyRecordDto:{},
				commentParam:{
					groupId:'',
					recordId:'',
					pageNum:1,
					pageSize:100
				},
				topCurrent:0,
				users:[],
				list1: [{
					name: '上午'
				}, {
					name: '下午'
				}]
			}
		},
		components: {
			projectDaily,
			Avatar
		},
		methods: {
			getTree(data) {
				let result = [];
				let map = {};
				data.forEach(item => {
					map[item.id] = item;
				});
				data.forEach(item => {
					if(item.senderId == this.userInfo.userId){
						item.owner= true
					}
					if(item.isDelete == 1){
						let aa = ''
						item.content = "[该评论已删除]"
						item.owner= false
					}
					let parent = map[item.parentId];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						result.push(item);
					}
				});
				return result;
			},
			tabClick(e){
				this.topCurrent = e.index
			},
			focusOn(e){
			},
			del(e){
				dailyRemoveComment(e).then(res=>{
					this.loadComment(false)
				})
			},
			async add(e){
				let atId = ''
				if(e.atId.length > 0){
					const atarr = []
					e.atId.map(item=>{
						atarr.push(item.id)
					})
					atId = atarr.join(",")
				}
				const data = {
					atId,
					content:e.content,
					type:e.type,
					replyId:e.replyId,
					parentId:e.pId ? e.pId:0,
					receiverId:this.dailyRecordDto.userId,
					recordId:this.id,
					groupId:this.groupId
				}
				const re = await dailyRecordComment(data)
				if(re.data){
					this.loadComment(false)
					this.$refs.hbComment.submit = false
					this.$refs.hbComment.commentReq.content = ""
					this.$refs.hbComment.content = ""
				}
			},
			async loadComment(showNotice){
				const commentListData = await dailyRecordCommentList(this.commentParam)
				//数据预处理
				let cd = commentListData.data.rows
				this.commentData = {
						"commentSize": commentListData.data.rows.length,
						"myInfo":this.userInfo,
						"commentId":this.commentId,
						"comment": this.getTree(cd)
				}
				if(showNotice !== false){
					setTimeout(()=>{
						if(this.commentId){
							this.$refs.hbComment.toPosition(this.commentId)
						}
					},100)
				}
			},
			toArea(data){
				uni.createSelectorQuery().select('.comment').boundingClientRect(res => {
					uni.pageScrollTo({
						scrollTop: data.top - res.top,
						duration: 300
					});
					this.$refs.hbComment.noticeSt = true
					setTimeout(()=>{
						this.$refs.hbComment.noticeSt = false
					},2000)
				}).exec()
			}
		},
		async onLoad({
			id,
			groupId,
			commentId,
			sex,
			localDate
		}) {
			uni.getSystemInfo({
				success: (e) => {
					this.barHeight = e.statusBarHeight
				}
			})
			this.id = id
			this.groupId = groupId
			this.commentId = commentId
			this.commentParam.groupId = groupId
			this.commentParam.recordId = id
			this.sex = sex
			const userInfo = localCache.getCache('userInfo')
			this.userInfo = userInfo
			let groupData = await groupInfo({
				id:groupId,
				localDate
			})
			const outMeArr = groupData.data.users.filter(item=>item.userId !== userInfo.userId)
			this.users = [{id:'all',userName:'all'}]
			this.users = this.users.concat(outMeArr)
			let project = localCache.getCache('projectList');
			if (!project) {
				const {
					data
				} = await getProject()
				project = data.rows
			}
			const wt = await getWorkType()
			const workType = wt.data
			const re = await getDaily(this.id)
			const dailyRecordDto = re.data
			const dailyRecordDetailsDtoList = dailyRecordDto.dailyRecordDetailsDtoList
			this.title = dailyRecordDto.userName+"日志"
			uni.setNavigationBarTitle({
				title:this.title
			});
			this.dailyRecordDto = dailyRecordDto
			let city = ''
			const area = await areaCommon()
			if (dailyRecordDetailsDtoList[0].amPmFlag === "P" && dailyRecordDetailsDtoList[1].amPmFlag === "A") {
				const pm = dailyRecordDetailsDtoList[0]
				const am = dailyRecordDetailsDtoList[1]
				dailyRecordDetailsDtoList = [am, pm]
			}
			this.data = dailyRecordDetailsDtoList.map((listItem, listIndex) => {
				listItem.fillDate = dailyRecordDto.fillDate
				area.data.rows && area.data.rows.map(item => {
					if (listItem.commonAreaId == item.id || listItem.commonAreaId == item.cityId) {
						city = item.commonName
					}
				})
				if (listItem.todayReport && listItem.todayReport.indexOf('\\n')) {
					listItem.todayReport = listItem.todayReport.replace(/\n/g, '<br>')
				}
				if (listItem.nextDayPlan && listItem.nextDayPlan.indexOf('\\n')) {
					listItem.nextDayPlan = listItem.nextDayPlan.replace(/\n/g, '<br>')
				}
				if (listItem.memo && listItem.memo.indexOf('\\n')) {
					listItem.memo = listItem.memo.replace(/\n/g, '<br>')
				}
				const amWorkType = workType.find(wtItem => wtItem.value == dailyRecordDto.amWorkType)
				const pmWorkType = workType.find(wtItem => wtItem.value == dailyRecordDto.pmWorkType)
				return {
					...listItem,
					amWorkType: amWorkType.label,
					pmWorkType: pmWorkType.label,
					city
				}
			})
			this.loadComment()
		}
	}
</script>
<style lang="scss" scoped>
	.comment{
		padding-bottom: 100px;
	}
	.in-title {
		width: 100%;
		height: 200px;
		padding-top: 100rpx;
		background: url(../../../../static/public/detailsBg.png) no-repeat;
		background-size: cover;
		position: relative;

		.title {
			text-align: center;
			font-size: 16px;
			color: #fff;
			text-shadow: 1px 1px #aaa;
		}
		.secend-title{
			color: #fff;
			line-height: 35px;
			font-size: 33rpx;
			padding: 15% 0 0 5%;
			.s-title{
				font-size: 20px;
			}
		}

		.avatar {
			position: absolute;
			right: 30px;
			bottom: -30px;
			border: 2px solid #fff;
			border-radius: 50%;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
			z-index: 9;
		}

		.radius {
			background-color: #fff;
			width: 100%;
			height:10px;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			position: absolute;
			bottom: -1px;
		}
	}

	.container {
		background-color: #fff;

		.content {
			.in-content {
				padding: 10rpx 30rpx 30rpx 30rpx;

				.content-item {
					margin-bottom: 20px;
					.title {
						font-size: 15px;
						line-height: 70rpx;
						color: #1F2329;
						font-weight: 500;
					}
					.desc {
						font-size: 14px;
						color: #666666;
					}
				}
			}
		}
	}
	.comment-view{
		border-top: 5px solid #F6F6F6;
		padding: 0 20rpx 20rpx 20rpx;
	}
</style>
