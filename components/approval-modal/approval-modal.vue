<template>
	<view class="modal">
		<u-modal :show="show" showCancelButton buttonReverse closeOnClickOverlay @cancel="cancelModal"
			@close="cancelModal" @confirm="confirm" :title="data.name">
			<scroll-view scroll-y="true" style="max-height:80vh;">
				<view style="width:80vw;">
					<view class="modal-content">
						<LineProcess v-if="isBack" :data="backProcess" @groupChange="groupChange" isBack></LineProcess>
						<view class="search" v-if="data.isSearch">
							<view class="title">
								<text style="color: red;">*</text> {{data.searchTitle}}
							</view>
							<view class="input" style="flex: 1;" @click="showTxl">
								<u-search placeholder="请选择" v-model="userName" disabled height="25" :showAction="false"></u-search>
							</view>
						</view>
						<view class="desc">
							<view class="title">
								<text style="color: red;">*</text> {{data.textareaTitle}}
							</view>
							<view class="input">
								<u--textarea v-model="reason" placeholder="请输入内容"></u--textarea>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</u-modal>
	</view>
</template>
<script>
	import {compleAct} from '@/api/process.js'
	import LineProcess from '@/components/line-process/line-process.vue'
	export default {
		data() {
			return {
				userName:'',
				userId:'',
				isBack:false,
				reason:'',
				actId:'',
				actName:'',
				backProcess:[]//退回节点
			};
		},
		props:{
			show:{
				type:Boolean,
				default:false
			},
			data:{
				type:Object,
				default:()=>{}
			}
		},
		async mounted() {
			this.$EventBus.$on('changeChoose', e => {
				if(e.length == 1){
					this.userId = e[0].id
					this.userName = e[0].name
				}else if(e.length > 1){
					this.userName = `${e.length}个用户`
					this.userId = e.map(item=>item.id)
				}else{
					this.userId = ''
					this.userName = ''
				}
			})
			
			if(this.data.name == '退回'){
				this.isBack = true
				const {data} = await compleAct(this.data.id)
				this.backProcess =[]
				data.map(item => {
					item.approveList.map(item2 => {
						item2.reason = null
						item2.actName = null
						item2.actId = item.actId
						this.backProcess.push(item2)
					})
				})
			}
		},
		components:{
			LineProcess	
		},
		methods: {
			showTxl() {
				let limit = 1
				if(this.data.name == '转发'){
					limit = 999//如果是转发的话，可以无限选择
				}
				uni.navigateTo({
					url: `/pages/contacts/choose?limit=${limit}&appUserIds=${this.userId}`
				})
			},
			groupChange(e){
				this.actId = e.actId
				this.actName = e.title
			},
			confirm(){
				if(this.data.isSearch && !this.userId){
					uni.$u.toast("请选择人员")
					return false
				}
				if(!this.reason){
					uni.$u.toast("内容不能为空")
					return false
				}
				if(this.isBack && !this.actId){
					uni.$u.toast("请选择退回节点")
					return false
				}
				let data = {userId:this.userId,reason:this.reason}
				if(this.data.name == '退回'){
					data = {...data,actId:this.actId,actName:this.actName}
				}
				this.$emit('confirm',data)
			},
			cancelModal() {
				this.$emit('close')
			}
		},
	};
</script>
<style lang="scss" scoped>
	.modal-content {
		padding: 0;
		font-size:15px;

		.search {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.title {
				margin-right: 10rpx;
			}
		}
		.desc{
			width: 100%;
			.title{
				margin-bottom: 10rpx;
			}
			.input{
				box-sizing: border-box;
			}
		}
	}

	/deep/.u-modal__content {
		flex-direction:column;
		padding: 20rpx !important;
	}
	/deep/.u-modal__title{
		padding-top: 10px !important;
		font-size: 15px !important;
		font-weight: normal;
	}
	.bottom-bar{
		display: flex;margin-top: 20px;
		.btn{
			flex: 1;text-align: center;color: #606266;
		}
		.success{
			color: #2979ff;
		}
	}
</style>
