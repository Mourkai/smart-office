<template>
	<view class="details">
		<view class="header">
			<view class="avatar">
				<view class="name-img">
					<Avatar :name="name" :sex="sex" size="120rpx" fontSize="30rpx" />
				</view>
			</view>
			<view class="name">
				<view class="text" v-text="name"></view>
				<view class="icon">
					<u-icon :name="sexIcon" :color="sexColor"></u-icon>
				</view>
			</view>
		</view>

		<view class="info">
			<view class="info-item">
				<view class="title">
					手机号
				</view>
				<view class="content" @click="show = true">
					<view class="text" v-text="tel"></view>
					<view class="icon">
						<u-icon name="phone" size="26" color="#3196FA"></u-icon>
					</view>
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					邮箱
				</view>
				<view class="content">
					<view class="text" v-text="email"></view>
				</view>
			</view>
		</view>

		<view class="info">
			<view class="info-item">
				<view class="title">
					部门
				</view>
				<view class="content" @click="toDep">
					<view class="text" v-text="dep"></view>
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					直属主管
				</view>
				<view class="content" @click="toLeader">
					<view class="text" v-text="leader"></view>
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					职位
				</view>
				<view class="content">
					<view class="text" v-text="position"></view>
				</view>
			</view>
		</view>
		<u-action-sheet :actions="list" @close="show=false" @select="selectClick" closeOnClickAction cancelText="取消"
			:show="show">
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/api/system.js'
	import uniCopy from '@/components/xb-copy/uni-copy.js'
	import Avatar from '@/components/avatar/avatar.vue'
	export default {
		data() {
			return {
				name: '',
				tel: '',
				email: '',
				leaderId: '',
				orgId: '',
				dep: '',
				color: '',
				leader: '',
				sexIcon: '',
				sex:0,
				sexColor: '',
				position: '',
				list: [{
						name: '呼叫'
					},
					{
						name: '复制'
					}
				],
				show: false
			}
		},
		async onLoad({
			userId,
			color
		}) {
			this.color = color
			const {
				data
			} = await getUserInfo(userId)
			this.name = data.employeeBaseDto.name
			this.leader = data.sysWorkInfoDto.leaderName
			this.leaderId = data.sysWorkInfoDto.leaderId
			this.position = data.sysWorkInfoDto.postName
			this.dep = data.sysWorkInfoDto.orgName
			this.orgId = data.sysWorkInfoDto.orgId
			this.tel = data.sysUserDto.phonenumber
			this.sex = data.sysUserDto.sex
			this.email = data.sysUserDto.email || '暂无'
			if (data.sysUserDto.sex == 0) {
				this.sexIcon = 'man'
				this.sexColor = '#3c9cff'
			} else {
				this.sexIcon = 'woman'
				this.sexColor = 'pink'
			}
		},
		components:{
			Avatar
		},
		methods: {
			makePhone() {
				this.show = true
			},
			toLeader() {
				if (this.leaderId && this.leader != this.name) {
					uni.navigateTo({
						url: `/pages/contacts/details?userId=${this.leaderId}&color=#3c9cff`
					})
				}
			},
			toDep() {
				if (this.orgId) {
					uni.navigateTo({
						url: `/pages/contacts/dep?orgId=${this.orgId}`
					})
				}
			},
			selectClick({
				name
			}) {
				if (name == "呼叫") {
					uni.makePhoneCall({
						phoneNumber: this.tel
					});
				} else {
					uniCopy({
						content:this.tel,
						success: (res) => {
							uni.showToast({
								title: '复制成功',
								icon: 'none'
							})
						},
						error: (e) => {
							uni.showToast({
								title: e,
								icon: 'none',
								duration: 3000,
							})
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40rpx 0;

		.name {
			font-size: 35rpx;
			position: relative;
			margin-top: 15rpx;
			color: #666;

			.icon {
				position: absolute;
				right: -40rpx;
				bottom: 5rpx;
				top: 8rpx
			}
		}

		.avatar {
			.name-img {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 45rpx;
				color: #fff;
			}
		}
	}

	.info {
		background-color: #fff;
		border-top: 10rpx solid #f2f2f2;

		.info-item {
			font-size: 30rpx;
			color: #666666;
			border-bottom: 2rpx solid #F2F2F2;
			padding: 20rpx;

			.content {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>
