<template>
	<view class="home">
		<view class="header p20">
			<view class="title">版本发布通知</view>
			<view class="time">2022-09-08</view>
		</view>
		<view class="content p20">
			<view>中证网讯（记者程竹）8月26日，记者独家获悉，银保监会近日发布《关于发布信息系统升级变更风险提示的通知》（下称《通知》）。《通知》指出，近期，部分商业银行发生多起信息系统升级变更导致的信息科技事件，反映出这些机构在信息系统开发测试、运维管理等方面还存在风险管理不到位的突出问题。

　　《通知》要求，各银保监局，各政策性银行、大型银行、股份制银行、外资银行、直销银行、金融资产管理公司、金融资产投资公司、理财公司，各保险集团(控股)公司、保险公司、保险资产管理公司要加强对此类问题的管理。

　　《通知》对三起事件做出有关风险提示：

　　事件一：某商业银行开展网联支付系统数据库升级改造，将原MySQL数据库替换为Oracle数据库，在系统升级完毕正式对外提供服务后，网联支付系统出现交易成功但绑定银行账户未成功扣款的情况。待该行技术人员发现时，网联支付业务已发生差错业务9000多笔，涉及金额数百万元。

　　事件二：某商业银行在交警罚没款收缴系统投产变更时，计划在中间业务平台上线新系统，并同时在综合前置系统下线老系统。由于系统下线脚本存在缺漏，运维人员在新系统上线后未及时停用老系统的划款定时任务，综合前置系统与中间业务平台上的划款定时任务同时运行，导致该行代收交警罚没款专用账户重复上划代收资金100余万元。</view>
		</view>
	</view>
</template>

<script>
	import { myRequest } from '@/util/api.js'
	export default {
		data() {
			return {
				content:"",
				title:'通知公告',
				date:'--',
			}
		},
		async onLoad({contentType,url,title,date}) {
			//contentType目前只有8(富文本)，等有其他的再做判断
			this.date = date
			this.title = title
			const data = await myRequest({
					url,
					method:'GET',
					loading:true
			})
			this.content = data.data.replaceAll("<img","<img style='max-width:100%'")
		}
	}
</script>

<style lang="scss">
	.header{
		border-bottom: 1px solid #ddd;
		.title{
			font-size: 19px;
			color: #333;
			margin-bottom: 5px;
		}
		.time{
			color: #999;
		}
	}
	.content{
		max-width: 100vw;
		overflow: hidden;
		font-size: 15px;
		color: #333;
		line-height: 28px;
	}
	image{
		max-width: 100px!important;
	}
</style>
