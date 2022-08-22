<template>
	<view>
		<!-- 	<view class="search">
			<view class="close">
				<u-button @click="confirm" type="primary">确定</u-button>
				<u-button @click="close">关闭</u-button>
			</view>
			<u-search :showAction="false" clearabled v-model="keyWord" style="width: 90%;" actionText="搜索" @clear="keyWord=''" @input="search" /> 
		</view> -->
		<view>
			<u-checkbox-group placement="column">
				<view v-for="(item,index) in tmp">
					<view class="info" @click="checkthis(item)">
						<view>
							<u-checkbox size="15" :name="item.id" :checked="item.isChecked" @change="checkthis(item)"
								:key="item.id" shape="circle" />
						</view>
						<view class="icon">
							<Avatar :name="item['name']" :sex="item.sex" size="100rpx" />
						</view>
						<view class="item">
							<text class="name" v-text="item.name"></text>
							<text class="post" v-text="item.orgName"></text>
						</view>
					</view>
				</view>
				<u-empty v-if="isOver" icon="/static/public/no-data.png" />
			</u-checkbox-group>
		</view>

		<view class="bottom-bar">
			<view class="title">
				已选择{{chooseItem.length}}人
			</view>
			<view class="names-desc" @click="showChooseFunc">
				<text v-for="(item,index) in chooseItem">
					{{item.name}}
					<text v-if="(index+1) < chooseItem.length">、</text>
				</text>
			</view>
			<view class="up-icon" @click="showChooseFunc">
				<u-icon name="arrow-up" color="#3196FA" labelColor="#3196FA" size="16"></u-icon>
			</view>
			<view class="bar-btn">
				<u-button type="primary" shape="circle" @click="confirm" :text="`确定(${chooseItem.length}/${total})`">
				</u-button>
			</view>
		</view>
		<uni-popup ref="popup" type="top" background-color="#fff">
			<view style="height: 95vh;margin-top: 10px;">
				<view class="showChoose">
					<u-row class="title" style="position: absolute;top: 0;width: 100%;z-index: 9;background-color: #fff;">
						<u-col span="2">
							<view @click="closeChooseFunc">返回</view>
						</u-col>
						<u-col span="8">
							<view class="name">已选择({{disLength}})</view>
						</u-col>
						<u-col span="2">
							<view @click="sureChoose">确定</view>
						</u-col>
					</u-row>
					<u-checkbox-group placement="column">
						<scroll-view scroll-y="true" style="height:90vh; position: relative;margin-top: 44px;">
							<view v-for="(item,index) in chooseItemTmp">
								<view class="info" @click="disthis(item)">
									<view>
										<u-checkbox size="15" :name="item.id" :checked="item.isChecked" @change="disthis(item)"
											:key="item.id" shape="circle" />
									</view>
									<view class="icon">
										<Avatar :name="item['name']" size="100rpx" />
									</view>
									<view class="item">
										<text class="name" v-text="item.name"></text>
										<text class="post" v-text="item.orgName"></text>
									</view>
								</view>
							</view>
						</scroll-view>
					</u-checkbox-group>
					<u-empty v-if="chooseItemTmp.length === 0" icon="/static/public/no-data.png" />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	import Avatar from '@/components/avatar/avatar.vue'
	import {
		mixin
	} from "./config/mixin.js";
	import {
		getAppUserList
	} from '@/api/system.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				choose: [],
				chooseItem: [],
				chooseItemTmp: [],
				disLength: 0,
				showChoose: false,
				limit: 0
			}
		},
		async onLoad({
			appUserIds,
			limit
		}) {
			this.defaultIds = appUserIds.split(',')
			this.limit = parseInt(limit) || 0
			if (this.defaultIds) {
				const {
					data
				} = await getAppUserList({
					userIds: this.defaultIds,
					pageNum: 1,
					pageSize: 999
				})
				this.chooseItem = data.rows
			}
		},
		components: {
			Avatar
		},
		methods: {
			checkthis(item) {
				let index = this.choose.indexOf(item.id);
				this.$nextTick(() => {
					if (index > -1) {
						this.choose.splice(index, 1);
						this.chooseItem.splice(index, 1)
						item.isChecked = false
					} else {
						this.choose.unshift(item.id)
						this.chooseItem.unshift(item)
						item.isChecked = true
					}
				})
			},
			showChooseFunc(){
				this.$refs.popup.open('bottom')
				uni.showLoading({
					title: '加载中'
				})
				this.chooseItemTmp = this.chooseItem.map(item=>{
					return {
						...item,
						isChecked:true
					}
				})
				this.disLength = this.chooseItemTmp.length
				uni.hideLoading()
			},
			closeChooseFunc() {
				this.$refs.popup.close()
			},
			disthis(item){
				item.isChecked = !item.isChecked
				if(item.isChecked){
					this.disLength++
				}else{
					this.disLength--
				}
			},
			sureChoose(){
				this.$refs.popup.close()
				const falseList = []
				this.chooseItem = this.chooseItemTmp.filter(item=>{
					if(!item.isChecked){
						falseList.push(item.id)
					}
					return item.isChecked===true;
				})
				this.tmp.forEach(item=>{
					if(item.isChecked && falseList.indexOf(item.id) !== -1){
						item.isChecked = false
					}
				})
			},
			async confirm() {
				if (this.chooseItem.length <= 0) {
					uni.$u.toast(`请选择至少1个`)
					return;
				}
				if (this.chooseItem.length > this.limit) {
					uni.$u.toast(`最多只能选择${this.limit}个`)
					return;
				}
				if (this.chooseItem.length > 0) {
					const userIds = this.chooseItem.map(item=>item.id)
					const result = await getAppUserList({
						userIds
					})
					this.$EventBus.$emit("changeChoose", result.data.rows);
				}
				uni.navigateBack()
			},
			onReachBottom() {
				this.reachBottom()
			},
			onPullDownRefresh() {
				this.pullDownRefresh()
			},
			close() {
				uni.navigateBack()
			},
			changeCheck(e) {
				const lastId = e[e.length - 1]
				let index = this.choose.indexOf(lastId);
				const item = this.tmp.filter(item => item.id == lastId)
				this.$nextTick(() => {
					if (index > -1) {
						this.choose.splice(index, 1);
						this.chooseItem.splice(index, 1)
						item.isChecked = true
					} else {
						this.choose.push(lastId)
						this.chooseItem.push(item[0])
						item.isChecked = false
					}
				})

			}
		},
	};
</script>

<style lang="scss" scoped>
	page {
		box-sizing: border-box;
		overflow: hidden;
	}

	.search {
		position: fixed;
		z-index: 9;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		padding-top: 30rpx;
		margin-bottom: 20rpx;

		.close {
			display: flex;
			width: 100%;
			height: 80rpx;
			justify-content: space-around;

			.u-button {
				width: 30%;
				height: 60rpx;
			}
		}

		.title {
			display: flex;
			text-align: left;
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx;
			overflow: hidden;

			.dep {
				color: #666;
				padding: 20rpx 30rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
			}

			.icon {
				width: 10%;
			}
		}
	}

	.s-input {
		width: 90%;
		height: 75rpx;
		background: url('data:image/png;base64,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') 20upx center no-repeat #fff;
		background-size: 40upx;
		text-indent: 80upx;
		border-radius: 40rpx;
		border: 1px solid $main-color;
		font-size: 30rpx;
	}

	.p {
		top: 0;
		left: 0;
		background: #f4f4f4;
		font-size: 28upx;
		margin-bottom: 10upx;
		text-indent: 40upx;
		font-weight: bold;
	}

	.info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 4rpx;
		padding: 20upx 25upx;
		color: #444444;
		font-size: 32rpx;
		background: #fff;

		.post {
			font-size: 30rpx;
			color: #666666;
		}
	}

	.icon {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #fff;
	}

	.item {
		height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
	}

	.scroll {
		position: absolute;
		left: 0;
		top: 130rpx;
		right: 0;
		background-color: #fff;
		padding-bottom: 250rpx;
	}

	.bottom-bar {
		box-sizing: border-box;
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 30rpx 30rpx 40rpx 30rpx;
		border-top: 2rpx solid #E4E4E4;
		font-size: 27rpx;

		.title {
			width: 20%;
			line-height: 60rpx;
			white-space: nowrap;
			overflow: hidden;
		}

		.names-desc {
			flex: 1;
			line-height: 60rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.up-icon {
			width: 5%;
			margin: 18rpx 10rpx 0 10rpx;
		}

		.avatar-group {
			display: flex;
			flex: 1;

			.avatar-group-item {
				font-size: 25rpx;
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 10rpx;
				background-color: #3196FA;
				padding: 5rpx;
				color: #fff;
				margin: 0 5rpx;
			}
		}

		.bar-btn {
			width: 30%;
		}
	}

	.showChoose {
		height: 100vh;
		.title{
			background-color: #fff;
			border-bottom: 1px solid #eee;
			height: 44px;
			line-height: 44px;
			.name{
				font-size: 30rpx;
			}
			*{
				text-align: center;
			}
		}
	}
</style>
