<template>
	<view class="details">
		<uni-nav-bar dark fixed safeAreaInsetTop @clickLeft="goback" background-color="#fff" color="#25292C" status-bar
			left-icon="left">
			<view class="nav-center" @click="groupShow = true">
				<view style="margin-right: 10rpx;">{{title}}</view>
				<u-icon name="arrow-down-fill" color="#25292C" size="14"></u-icon>
			</view>
			<block slot="right" v-if="ImIAdmin">
				<u-icon name="plus" @click="addGroupUserFunc" color="#25292C" size="17" style="margin-right: 10rpx;">
				</u-icon>
			</block>
		</uni-nav-bar>
		<view class="p20 top-time">
			<renCalendar @onDisabled="disableDateFunc" @onDayClick="dayClick" headerBar :open="false" disabledAfter />
		</view>
		<view v-if="data.length > 0" style="background-color:#f6f6f6">
			<view class="p20">
				<uni-swipe-action>
					<uni-swipe-action-item class="item-item" :right-options="ImIAdmin ? item.options:[]" v-for="(item,index) in data" @click="e=>clickRight(e,item)">
						<view style="padding: 30rpx;height: 50px;">
							<u-row @click="toDetails(item)">
								<u-col span="2">
									<Avatar :sex="item.sex"></Avatar>
								</u-col>
								<u-col span="7">
									<view class="title">
										<view class="name" v-text="item.userName"></view>
										<view class="tag">
											<view class="normal" v-text="item.postName"></view>
											<view class="admin" v-if="item.isAdmin">管理员</view>
										</view>
									</view>
									<view class="desc" v-text="item.orgName"></view>
								</u-col>
								<u-col span="3" class="status-box" v-if="item.openDaily">
									<view class="status-text">
										<view class="success" v-if="item.fillOrNot == '已填报'">已填报</view>
										<view class="danger" v-if="item.fillOrNot == '未填报'">未填报</view>
									</view>
									<view class="status-num">
										<view class="bottom-item" :style="item.newMsgToMe >= 100 ? {'width':'35px'}:{}" v-if="item.openDaily" @click="toDetails(item)">
											<u-icon name="chat" color="#91939F" size="25"></u-icon>
											<u-badge max="99" v-if="!item.newMsgAtMe && item.newMsg" :isDot="true" />
											<u-badge max="99" v-else :value="item.newMsgAtMe ? item.newMsgAtMe:0" />
										</view>
										<view class="text">
											{{item.totalMsgCount ? item.totalMsgCount:0}}
										</view>
									</view>
								</u-col>
							</u-row>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<u-empty icon="/static/public/no-data.png" v-else />
		<u-picker :show="groupShow" :columns="groupList" cancelText="取消" @confirm="groupConfirm"
			@cancel="groupShow = false" @close="groupShow = false" :defaultIndex="[defaultIndex]" closeOnClickOverlay
			keyName="label" />
	</view>
</template>

<script>
	import renCalendar from '@/components/ren-calendar/ren-calendar.vue'
	import Avatar from '@/components/avatar/avatar.vue'
	import groupItem from '@/components/group-item/group-item.vue'
	import {
		groupInfo,
		groupInfoList,
		deleteGroupUser,
		changeUserStatus,
		addGroupUser
	} from '@/api/system.js'
	import {
		clearGroupDot
	} from '@/api/msg.js'
	import DateUtil from '@/util/date.js'
	import localCache from '@/util/cache.js'
	export default {
		name: 'add',
		data() {
			return {
				groupShow: false,
				groupList: [],
				id: '',
				localDate: '',
				userInfo: '',
				groupLeaderId: '',
				ImIAdmin: false,
				isOffBus: true,
				defaultIndex: 0,
				title: '群组信息',
				param: {},
				data: []
			}
		},
		components: {
			renCalendar,
			Avatar,
			groupItem
		},
		onLoad({
			id
		}) {
			// // #ifdef APP-PLUS
			// var webView = this.$mp.page.$getAppWebview();
			// // 修改buttons
			// webView.setTitleNViewButtonStyle(0, {});
			// // #endif
			this.id = id
			this.localDate = DateUtil.getNowDay()
			this.userInfo = localCache.getCache('userInfo')
			this.$EventBus.$on('changeChoose', e => {
				this.isOffBus = true
				if (e.length > 0) {
					const data = {
						id: this.id,
						users: []
					}
					let isChooseAdmin = false
					data.users = e.map(item => {
						if(this.groupLeaderId === item.id){
							isChooseAdmin = true
						}
						return {
							userId: item.id
						}
					})
					if(!isChooseAdmin){
						data.users.push({
							userId:this.groupLeaderId
						})
					}
					addGroupUser(data).then(re => {
						if(re.code == 500){
							uni.showToast({
								title:re.msg,
								icon: 'none'
							})
						}
					})
				}
			})
		},
		async onShow() {
			const {
				data
			} = await groupInfoList({
				userId: this.userInfo.userId
			})
			const g = data.rows.map((item, index) => {
				if (this.id == item.id) {
					this.defaultIndex = index
				}
				return {
					label: item.name,
					id: item.id
				}
			})
			this.groupList = [g]
			this.loadData()
		},
		deactivated() {
			if(this.isOffBus){
				this.$EventBus.$off('changeChoose')
			}
		},
		onUnload(){
			if(this.isOffBus){
				this.$EventBus.$off('changeChoose')
			}
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
			dayClick(e) {
				this.localDate = e.date
				this.loadData()
			},
			addGroupUserFunc() {
				this.isOffBus = false
				const userarr = []
				this.data.forEach(item =>{
					if(item.userId != this.groupLeaderId){
						userarr.push(item.userId)
					}
				})
				const ids = userarr.join(',');
				uni.navigateTo({
					url: '/pages/contacts/choose?limit=999&appUserIds=' + ids
				})
			},
			setting(item) {
				let status = item.openDaily == 1 ? '关闭' : '开放'
				const st = item.openDaily == 1 ? 0 : 1
				uni.showModal({
					title: '提示',
					content: '是否' + status + item.userName + '在本群的日志？',
					success: (res) => {
						if (res.confirm) {
							changeUserStatus({
								userId: item.id,
								status: st
							}).then(e => {
								const index = this.data.findIndex(item2 => item2.id == item.id)
								this.data[index].openDaily = st
							})
						}
					}
				});
				const text = st == 1 ? '关闭' : '开放'
				this.$set(item.options,0,{...item.options[0],text:text+'日志'})
			},
			remove(data) {
				if (data.isAdmin) {
					uni.showToast({
						title: '禁止删除',
						icon: 'none'
					})
				} else {
					uni.showModal({
						title: '',
						content: '是否删除该成员？',
						success: (res) => {
							if (res.confirm) {
								deleteGroupUser({
									groupId: data.groupId,
									userId: data.userId
								}).then(e => {
									if (e.data) {
										this.data = this.data.filter(item => item.id !== data.id)
									}
								})
							}
						}
					});
				}
			},
			async loadData() {
				const {
					data
				} = await groupInfo({
					id: this.id,
					localDate: this.localDate
				})
				//判断我是不是管理员
				if (this.userInfo.userId == data.leader) {
					this.ImIAdmin = true
				}
				this.groupLeaderId = data.leader
				this.data = []
				data.users.forEach(item => {
					let isAdmin = false
					if (item.userId === data.leader) {
						isAdmin = true
					}
					const openDailyText = item.openDaily == 1 ? '关闭' : '开放'
					item.options = [
						{text: openDailyText+'日志',style: {backgroundColor: '#f78c4d',fontSize:"13px"}}, 
						{text: '删除',style: {backgroundColor: '#f85158',fontSize:"13px"}},
					]
					if(item.userId){
						this.data.push({
							...item,
							isAdmin
						})
					}
				})
				this.title = data.name
			},
			disableDateFunc() {
				uni.showToast({
					title: '未来日期不可选择',
					icon: 'none'
				})
			},
			toDetails(e) {
				//判断newMsg true 或者 newMsgAtme 为 真
				if(e.newMsg || e.newMsgAtMe){
					clearGroupDot({
						groupId:e.groupId,
						dailyId:e.dailyRecordId
					})
				}
				if (e.openDaily !== 1) {
					uni.showToast({
						title: '日志未开放',
						icon: 'none'
					})
				} else if (e.fillOrNot == '未填报') {
					uni.showToast({
						title: this.localDate + '日志未填报',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url:`./comment?id=${e.dailyRecordId}&groupId=${e.groupId}&localDate=${this.localDate}&sex=${e.sex}`
					})
				}
			},
			lp() {
				this.lpShow = true
			},
			groupChange(e) {
				console.log(e);
			},
			groupConfirm(e) {
				this.groupShow = false
				if (this.id == e.value[0].id) return;
				uni.navigateTo({
					url: './details?id=' + e.value[0].id
				})
			},
			clickRight(e,data) {
				if(e.index === 0){
					this.setting(data)
				}else{
					this.remove(data)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.details {
		background-color: #F6F6F6;
		height: 100vh;
	}
	.top-time {
		border-radius: 20rpx;
	}
	.item-item {
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		position: relative;

		.title {
			display: flex;

			.name {
				font-size: 30rpx;
			}

			.tag {
				display: flex;
				margin-left: 20rpx;
				margin-top: 2rpx;

				view {
					border-radius: 5rpx;
					color: #fff;
					line-height: 40rpx;
					padding: 0 10rpx;
					height: 40rpx;
					font-size: 23rpx;
					margin-right: 7rpx;
				}

				.normal {
					background-color: #2A66F2;
				}

				.admin {
					background-color: #EF8D44;
				}
			}
		}

		.desc {
			color: #959597;
			margin-top: 15rpx;
			font-size: 25rpx;
		}
	}

	.status {
		font-size: 24rpx;
		text-align: right;
	}

	.success {
		font-size: 24rpx;
		color: #09C8AB;
		text-align: right;
	}

	.danger {
		font-size: 24rpx;
		color: #DF4B3C;
		text-align: right;
	}

	/deep/.uni-btn-icon {
		display: none !important;
	}

	.nav-center {
		text-align: center;
		width: 100%;
		line-height: 44px;
		font-size: 16px;
		display: flex;
		justify-content: center;
	}

	.status-box {
		display: flex;
		align-items: flex-start;

		.status-text {
			position: absolute;
			right: 10px;
			top: 17px;
		}

		.status-num {
			position: absolute;
			bottom:8px;
			right:11px;
			display: flex;
			.bottom-item {
				margin: 0 auto;
				position: relative;
				display: flex;
				margin-right: 15px;
				.u-badge {
					position: absolute;
					background-color: #EE5054;
					left: 15px;
				}
			}
			.text {
				font-size: 26rpx;
				color: #91939F;
				margin-top:4px;
			}
		}
	}
</style>
