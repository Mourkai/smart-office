<template>
	<view class="forget">
		<u--form :model="info" :rules="rules" errorType="toast" ref="user">
			<u-form-item prop="password">
				<u--input placeholder="请输入新的登录密码" border="bottom" type="password" fontSize="13" v-model="info.password"
					clearable></u--input>
			</u-form-item>
			<u-form-item prop="repassword">
				<u--input placeholder="请再次输入登录密码" border="bottom" type="password" fontSize="13"
					v-model="info.repassword" clearable></u--input>
			</u-form-item>
		</u--form>
		<u-button shape="circle" @click="toNextStep" type="primary" text="下一步"></u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		resetLoginPassword
	} from '@/api/user.js'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				info: {
					password: '',
					repassword: '',
					token:''//临时token
				},
				rules: {
					'password': {
						type: 'string',
						required: true,
						message: '请填写密码'
					},
					'repassword': [{
							type: 'string',
							required: true,
							message: '请再次填写密码'
						},
						{
							validator: (rule, value, callback) => {
								if (value !== this.info.password) {
									return false
								}
							},
							message: '两次密码不一致',
						}
					]
				}
			}
		},
		onLoad(option){
			this.token = localCache.getCache('tmpToken')
			if(option.tmpToken !== this.token){
				uni.$u.toast("请先完成验证")
				setTimeout(()=>{
					uni.navigateTo({
						url:'forget'
					})
				},500)
			}
		},
		methods: {
			toNextStep() {
				this.$refs.user.validate().then(async (res) => {
					const now = Date.parse(new Date());
					const exptime = localCache.getCache('tmpTokenExpr');
					if(now >= exptime){
						uni.$u.toast("token已过期，请返回重试")
						setTimeout(()=>{
							uni.navigateTo({
								url:'forget'
							})
						},500)
					}
					const data = {
						"password": this.info.password,
						"token":this.token
					}
					const result = await resetLoginPassword(data)
					uni.$u.toast("修改成功")
					localCache.clearCache()
					setTimeout(()=>{
						uni.navigateTo({
							url:'login'
						})
					},500)
				}).catch(errors => {
					if(errors[0]){
						uni.$u.toast(errors[0].message)
					}else{
						uni.$u.toast("请稍后重试")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.forget {
		padding: 50rpx;

		/deep/.u-border-bottom {
			border: 0;
			border-bottom: 1px solid #eee !important;
		}

		/deep/.u-input {
			margin-top: 50rpx;
		}

		.u-button {
			width: 70%;
			height: 80rpx;
			margin-top: 130rpx;
		}
	}
</style>
