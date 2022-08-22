<script>
	import localCache from '@/util/cache.js'
	import {
		getAuthToken,
		pushToSingle
	} from '@/api/msg.js'
	import sha256_digest from '@/static/js/sha256_digest.js'
	export default {
		onLaunch: async function() {
			this.$store.dispatch('updateVersion',false)
			const userInfo = localCache.getCache('userInfo')
			if (!userInfo) {
				uni.redirectTo({
					url: 'pages/user/login'
				})
			}
		},
		onHide: function() {
			console.log('App Hide') 
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-shipin:before {
		content: "\f0024";
	}

	.icon-tupian:before {
		content: "\e650";
	}

	.icon-guanyuwomen:before {
		content: "\e608";
	}

	.icon-ziyuan:before {
		content: "\e60d";
	}

	.gomeImgLoad {
		width: 750rpx;
		height: auto;
	}
</style>
