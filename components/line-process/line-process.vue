<template>
	<view class="process">
		<view class="step-line">
			<u-radio-group v-model="chooseBackPoint" placement="column" @change="groupChange">
				<view class="line-item" v-for="(item,index) in data" :key="item.time">
					<view v-show="isBack">
						<u-radio :customStyle="{marginTop: '18px'}" size="15" :name="index"/>
					</view>
					<view class="avatar success">
						<u--image v-if="item.approvalUserSex === 1" src="/static/public/women.png" shape="circle" width="50px" height="50px"></u--image>
						<u--image v-else src="/static/public/men.png" shape="circle" width="50px" height="50px"></u--image>
						<u-icon :name="color[item.operType].icon" :color="color[item.operType].color" class="ok" size="16"></u-icon>
					</view>
					<view class="line-content">
						<view class="title">
							<view class="tips" v-text="item.approvalUserName"></view>
							<view class="actName" v-text="item.actName"></view>
							<view class="time" v-text="item.approvalTime"></view>
						</view>
						<view class="line-desc">
							<view class="decs-title" :style="{color:color[item.operType].color}" v-text="item.operTypeLabel"></view>
							<view class="decs-content" v-show="item.reason">
								原因：{{item.reason}}</view>
							<!-- <view v-if="item.leader" class="leader-list">
								<view v-for="(item2,index2) in item.leader">
									<image :src="item2.avatar" shape="circle" width="20px" height="20px"/>
									{{item2.name}}
								</view>
							</view> -->
						</view>
					</view>
				</view>
				<u-empty v-if="data.length == 0" icon="/static/public/no-data.png" />
			</u-radio-group>
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		name: 'line-process',
		data() {
			return {
				chooseBackPoint:'',
				color:[
					{},
					{icon:'more-circle-fill',color:'#EF8D44'},//1 审批中
					{icon:'checkmark-circle-fill',color:'#09C8AB'},//2 批准
					{icon:'close-circle-fill',color:'#DF4B3C'},//3 拒绝
					{icon:'error-circle-fill',color:'#DF4B3C'},//4 退回
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'checkmark-circle-fill',color:'#09C8AB'},//8 已提交
					{icon:'clock-fill',color:'#EF8D44'},//9 待提交
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'',color:''},
					{icon:'',color:''}
				]
			}
		},
		props: {
			data:{
				type:Array,
				default: () => []
			},
			isBack:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			groupChange(e){
				this.$emit('groupChange',this.data[e])
			},
		},
	};
</script>
<style lang="scss" scoped>
	.step-line {
		.line-item {
			min-height: 180rpx;
			margin-left: 10rpx;
			display: flex;
			.avatar {
				width:60px;
				position: relative;
			}
			.avatar::after {
				content: "";
				position: absolute;
				min-height:70%;
				left: 23px;
				margin-top: 10rpx;
				width: 4rpx;
				background-color: #BFBFBF;
				border-radius: 5rpx;
			}

			.success::after {
				background-color: #3196FA;
			}

			.danger::after {
				background-color: red;
			}

			.success {
				position: relative;

				.ok {
					background-color: #fff;
					border-radius: 30rpx;
					border: 1px solid #fff;
					right:15%;
					top:33px;
					position: absolute;
				}
			}

			.danger::after {
				background-color: red;
			}

			.line-content {
				flex: 1;
				margin-left:3px;

				.title {
					display: flex;
					flex: 1;
					padding-top:5px;
					.tips {
						font-size:17px;
					}
					.actName {
						font-size: 14px;
						line-height: 25px;
						margin: 0 5px;
						color: #959597;
					}
					.time {
						flex: 1;
						text-align: right;
						font-size: 24rpx;
						color: #666666;
						line-height: 25px;
					}
				}

				.line-desc {
					font-size: 28rpx;
					color: #666666;
					margin-top:3px;
					.decs-content{
						min-width: 100px;
						display: inline-block;
						background-color: #F5F6F8;
						padding:7px;
						border-radius: 7px;
						margin:13px 0 20px 0;
						color: #666666;
					}
					.leader-list {
						display: flex;
						font-size: 20rpx;
						align-items: center;
						margin-top: 20rpx;
						view {
							margin-right: 10rpx;
							text-align: center;
							display: flex;
							flex-direction: column;
							align-items: center;
							line-height: 50rpx;
						}
					}
				}
			}
		}

		.line-item:last-child {
			height: 120rpx;
		}

		.line-item:last-child .avatar::after {
			content: none;
		}
	}
</style>
