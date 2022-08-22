<template>
	<view :class="'login '+ padClass">
		<u--form :model="info" :rules="rules" errorType="toast" ref="user">
			<view class="login-item">
				<view class="icon">
					<u-icon name="account-fill" color="#264C9A" size="30"></u-icon>
				</view>
				<u-form-item class="input" prop="username">
					<input placeholder="请输入您的账号" autocomplete="off" @confirm="toLogin()" v-model="info.username" class="custom-input">
				</u-form-item>
			</view>
			<view class="login-item password-item">
				<view class="icon">
					<u-icon name="lock-fill" color="#264C9A" size="30"></u-icon>
				</view>
				<u-form-item class="input" prop="password">
					<input :type="passwordType" placeholder="请输入您的密码" @confirm="toLogin()" v-model="info.password" class="custom-input">
				</u-form-item>
				<view class="eye" @click="isShowPassword = !isShowPassword">
					<u-icon name="eye-off" v-show="!isShowPassword" color="#264C9A" size="30"></u-icon>
					<u-icon name="eye" v-show="isShowPassword" color="#264C9A" size="30"></u-icon>
				</view>
			</view>
			<view class="operation">
				<u-checkbox-group placement="column" v-model="info.remember">
					<u-checkbox shape="circle" labelColor="#999" size="15" name="1" labelSize="13" label="记住密码" />
				</u-checkbox-group>
				<view @click="forget">
					忘记密码
				</view>
			</view>
			<u-button color="#264C9A" @click="toLogin()" shape="circle" text="登录"></u-button>
			<u-toast ref="uToast"></u-toast>
		</u--form>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				isShowPassword: false,
				passwordType: 'password',
				padClass:'pad55',
				info: {
					username: '',
					password: '',
					remember:[]
				},
				rules: {
					'username': {
						type: 'string',
						required: true,
						message: '请填写账号',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		methods: {
			toLogin() {
				this.$refs.user.validate().then(res => {
					const data = {
						loginType: "2",
						...this.info
					}
					this.$store.dispatch('accountLogin', data)
				}).catch(errors => {
					if(errors[0]){
						uni.$u.toast(errors[0].message)
					}else{
						uni.$u.toast("请稍后重试")
					}
				})
			},
			forget() {
				uni.navigateTo({
					url: '/pages/user/forget'
				})
			}
		},
		onLoad() {
			const userRemember = localCache.getCache('userRemember')
			if(userRemember){
				this.info = {...userRemember}
			}
			uni.getSystemInfo({
				success:(r)=>{
					if(r.windowWidth>1000){
						this.padClass = 'pad75'
					}
				}
			})
		},
		watch: {
			isShowPassword(value) {
				if (value) {
					this.passwordType = 'text'
				} else {
					this.passwordType = 'password'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pad55{
		padding-top: 55vh!important;
	}
	.pad75{
		padding-top: 75vh!important;
	}
	.login {
		background: url(@/static/public/login-bg.png) no-repeat;
		background-size: cover;
		padding: 50rpx;
		.login-item {
			display: flex;
			align-items: center;

			.icon {
				width: 50rpx;
				height: 50rpx;
			}

			.input {
				flex: 1;
				margin-left: 10rpx;

				.custom-input {
					width: 100%;
					border: none;
					outline: none; // 去除选中状态边框
					border-bottom: 1px solid #eee;
					padding: 15rpx;
					font-size: 28rpx;
				}

				/deep/.u-border-bottom {
					border-bottom: 1px solid #eee !important;
				}
			}
		}

		.password-item {
			margin-top: 20rpx;

			.password-input::-webkit-input-placeholder {
				color: #c0c4cc;
				font-size: 28rpx;
			}
		}

		.operation {
			color: #999999;
			margin-top: 30rpx;
			display: flex;
			font-size: 13px;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 70rpx;
		}
	}
</style>
