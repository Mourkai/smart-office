<template>
	<view class="forget">
		<u--form :model="info" :rules="rules" errorType="toast" ref="user">
			<u-form-item prop="tel">
				<u--input placeholder="请输入手机号" border="bottom" fontSize="13" v-model="info.tel" clearable></u--input>
			</u-form-item>
			<u-form-item prop="idNum6">
				<u--input placeholder="请输入身份证后六位" border="bottom" fontSize="13" v-model="info.idNum6" clearable>
				</u--input>
			</u-form-item>
		</u--form>
		<u-button shape="circle" @click="toNextStep" type="primary" text="下一步"></u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		retrievePwdToken
	} from '@/api/user.js'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				info: {
					tel: '',
					idNum6: ''
				},
				rules: {
					'tel': {
						type: 'string',
						required: true,
						message: '请输入手机号'
					},
					'idNum6': {
						type: 'string',
						required: true,
						message: '请输入身份证后六位'
					}
				}
			}
		},
		methods: {
			toNextStep() {
				this.$refs.user.validate().then(async (res) => {
					const now = Date.parse(new Date());
					const result = await retrievePwdToken(this.info)
					localCache.setCache('tmpToken', result.data)
					localCache.setCache('tmpTokenExpr', now+180000)
					uni.navigateTo({
						url: 'forget2?tmpToken='+result.data
					})
				}).catch(errors => {
					if (errors[0]) {
						uni.$u.toast(errors[0].message)
					} else {
						uni.$u.toast("请稍后重试")
					}
				})
				// uni.navigateTo({
				// 	url: 'forget2'
				// })
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
