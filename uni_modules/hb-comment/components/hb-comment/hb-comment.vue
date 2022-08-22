<template>
	<view class="hb-comment">
		<!-- 阅读数下边那条线-end -->
		<!-- 评论主体-start -->
		<view class="comment-list" v-if="commentData.comment && commentData.comment.length != 0">
			<!-- 评论主体-顶部数量及发表评论按钮-start -->
			<view class="comment-num">
				<view>共 {{commentData.commentSize}} 条评论</view>
				<!-- <view class="add-btn">
					<button type="primary" size="mini" @click="commentInput">发表评论</button>
				</view> -->
			</view>
			<!-- 评论主体-顶部数量及发表评论按钮-end -->
			<!-- 评论列表-start -->
			<view class="comment-box" :id="'f'+item.id" v-for="(item, index) in commentData.comment">
				<view class="comment-box-item">
					<view class="avatar-text" @click="toDetails(item)">
						<Avatar :name="item.senderName" :sex="item.sex" size="60rpx" fontSize="13px" />
					</view>
					<view class="comment-main">
						<!-- 父评论体-start -->
						<view class="comment-main-top">
							<view class="nick-name-box" style="width: 100%;">
								<!-- <view class="comLogo com1" v-if="index == 0">沙发</view>
								<view class="comLogo com2" v-if="index == 1">板凳</view>
								<view class="comLogo com3" v-if="index == 2">地板</view>
								<view class="comLogo com4" v-if="index > 2">{{index + 1}}楼</view> -->
								<view class="nick-name">{{item.senderName}}</view>
								<view class="comment-time">{{item.createTime}}</view>
								<view v-if="item.owner" @click="confirmDelete(item.id)">
									<u-icon name="trash" color="#8F959E" size="17"></u-icon>
								</view>
							</view>
						</view>
						<view class="comment-main-content" :style="item.id==commentData.commentId&&noticeSt?'color:#f9ae3d;transition: all 1s;':''" @click="reply(item.senderName,item,item.id,false)">
							{{item.content.length > 60 ? item.content.slice(0, 59) : item.content}}
							<span v-if="item.content.length > 60">
								{{item.hasShowMore ? item.content.slice(59) : '...'}}
								<span class="foot-btn" @click.stop="showMore(item.id)">
									{{item.hasShowMore ? '收起' : '展开'}}
								</span>
							</span>
						</view>
						<!-- 父评论体-end -->
						<!-- 子评论列表-start -->
						<view class="comment-sub-box">
							<view class="comment-sub-item" :id="'f'+each.id" v-for="each in item.children">
								<view class="avatar-text" @click="toDetails(each)">
									<Avatar :name="each.senderName" :sex="each.sex" size="60rpx" fontSize="12px" />
								</view>
								<view class="comment-main">
									<view class="sub-comment-main-top">
										<view class="nick-name">{{each.senderName}}</view>
										<view class="comment-time">{{each.createTime}}</view>
										<view v-if="each.owner" @click="confirmDelete(each.id)">
											<u-icon name="trash" color="#8F959E" size="17"></u-icon>
										</view>
									</view>
									<view class="reply-content" v-if="each.type == 3">
										回复 {{getReplyString(each,item.children)}}
									</view>
									<view class="comment-main-content" :style="each.id==commentData.commentId&&noticeSt?'color:#f9ae3d;transition: all 1s;':''" @click="reply(item.senderName,each,item.id,true)">
										{{each.content.length > 60 ? each.content.slice(0, 59) : each.content}}
										<span v-if="each.content.length > 60">
											{{each.hasShowMore ? each.content.slice(59) : '...'}}
											<span class="foot-btn" @click.stop="showMore(each.id)">
												{{each.hasShowMore ? '收起' : '展开'}}
											</span>
										</span>
									</view>
								</view>
							</view>
						</view>
						<!-- 子评论列表-end -->
					</view>
				</view>
			</view>
			<!-- 评论列表-end -->
		</view>
		<!-- 评论主体-end -->
		<!-- 无评论-start -->
		<view class="comment-none" v-else>
			暂无评论，<span @click="commentInput" style="color: #007AFF;">去评论</span>
		</view>
		<!-- 无评论-end -->
		<!-- 新增评论-start -->
		<view class="comment-submit-box" v-if="submit" @click="closeInput">
			<!-- 下边的click.stop.prevent用于让上边的click不传下去，以防点到下边的空白处触发closeInput方法 -->
			<view class="comment-add" @click.stop.prevent="stopPrevent" :style="'bottom:' + KeyboardHeight + 'px'">
				<view class="comment-submit">
					<view class="btn-click cancel" @click="closeInput">取消</view>
					<view>
						<view class="replayTag" v-show="showTag">
							<view>回复在 {{pUser}} 的评论下</view>
							<view @click="tagClose" class="replyTagClose">×</view>
						</view>
					</view>
					<view>
						<view class="btn-click" @click="add">发布</view>
					</view>
				</view>
				<textarea class="textarea" v-model="content" :disabled="disabled" :placeholder="placeholder" @input="handleInput" @blur="blur" @focus="focusOn" :focus="focus" maxlength="800">
				</textarea>
			</view>
		</view>
		<!-- 新增评论-end -->
		<view class="sayWords">
			<view class="word" @click="commentInput(false)">
				说点什么...
			</view>
		</view>
		<u-picker :show="showAtList" :columns="atList" keyName="userName" @confirm="atconfirm" @close="hideAtList" @cancel="hideAtList"></u-picker>
	</view>
</template>

<script>
	import Avatar from '@/components/avatar/avatar.vue'
	export default {
		name: 'hb-comment',
		props: {
			cmData: {
				type: Object,
				default: () => {
					return null;
				}
			},
			deleteTip: {
				type: String,
				default: () => {
					return '操作不可逆，如果评论下有子评论，也将被一并删除，确认？';
				}
			},
			atList:{
				type: Array,
				default: () => []
			}
		},
		components:{
			Avatar
		},
		watch: {
			cmData: {
				handler: function(newVal, oldVal) {
					this.init(newVal);
				},
				immediate: true
			},
			content(newVal, oldVal) {
				this.commentReq.atId.forEach((item,index)=>{
					if(newVal.indexOf('@'+item.userName) === -1){
						this.commentReq.atId.splice(index,1)
					}
				})
				this.commentReq.content = newVal
			}
		},
		//atid 存有{name:"@张三",id:'1111'},每次输入判断字符串中还有没有这个name，没有了，就删除atid里的数据
		data() {
			return {
				"emptyAvatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABF5JREFUWEfFl11oHFUUx//nbmKwxdJ9qFL7YPEhRJC2gljjF60WG0WsoNkWfSnZ7Jy7FVPF0AoKpmBFqyIG3Jk7G1iIQXHbBz+KbbGtRfBbMe2LseKjiVDoiqIhwZ0jV3fb3cnM7kQCuU+7M+ec/+9+nHPPEJZ50DLrY1EApVJp9fz8/BYRuZ2INgDYWJvAWRE5R0RnZmZmPh4ZGZlPOrFEAMVi8e4gCPYSUZ+IXGGFgiCYIaJpKyQi1yql1orIFgAXARxRSvm5XO67diBtAYwxRQCDAE4RUUkpdWxwcNCKLBiu665TSj0kIpqIbgTgMzO3gmgJYIz5CMB9AIaZ+bXGQMVi8RoRuZeI/lZKHc1ms3/U34+Pj6+cnZ3dC+AggGPMfH8cRCyAMUZqThlmPlwPUCgU0qlUyq7Kww1BrbjHzPsahYwx/QDK9hkzR2pFPjTGnAWwIexkjOkRkRIR3Rozo5Miskdr/VMIxE7mHDPXD+2l1wsA6nseBMHmfD7/dSjQOwB2tTlYC/bddd1blFJfARhj5lyjfxNA7bSfitpz3/d3iYgFaDuUUjeHM8AY8zSAV5VS9+RyudP1IE0Axpj3Aaxk5m1hFc/zPiWiO9uq/2dwiJn3h22NMScB/MnMOxYAjI6Orurq6rpgU0hrXYpw/hFAd0KAD5n5wbCt7/t7ROT1ubm5NUNDQ7/b95dWwHXd7Uqp452dnVcPDAxciACwDlclAbAFynGcdRGr2EtEnwdB0JfP5080ARhjDhLRbY7jbI0SMcZUAKxOAgDgN2ZOx8SxGfEiMz/bBOD7/lgQBCu01o/GOH4PYFNCgElmvinK1vf9X2xxchzHVtfLW2CMOQpgipmHYwBeBtBUaOJgRKSgtX48Js63AH5l5geaADzPe1cpddFxnHyM42YAXyZYAXt+epn557iVFJHzWuudYYDnlFJ9juPcESfi+35JRHa3gdjPzIfibIwxNtPe0Fq/EAZ4hIhcZl4T5+y67nql1CcA1kfZENFnrSZQ6ycqItKvtT4SBthIRJMdHR092WzW5nzk8H1/WEReiQHY4TjOB3G+nuf9qyEim7TW9r65fAjL5fKVlUrlPICXmPnNFquwWym1oFBZ+yAItubz+TMtAJ4gon3pdLo7k8nMNgHYP7ZeE5EWkbuYeaYx0NjY2HXValUDeApAV4zIJIADzPxe+H2hULg+lUp9U6sBl3qLprugXC6nKpXKF0R02nGcZ2wQ3/e3ichOEckQ0aoEWQDbsgF4a3p6eqLeH3qeN0FE3el0ujeTyVTrcaKuY1uIjIg8CaCfiLYnEW1hY4WPi8gEgMeY+e1G27iGxHYxtptZynGYmTPhgK1asqWEiBRfcAjDdMaYpYCIFW8LUMuM54nIsb3/YvbDXskiYtuzA6382n4X1CDWAnCSgNSFa98ETakcWbwWMytjzAoAPUEQ3JBKpXrs75r/VLVanVJK/VC7Uf9KGjfRCiQN9n/slh3gHz9i4jC+FVL5AAAAAElFTkSuQmCC",
				"commentData": null,
				"placeholder": "请输入评论",
				"commentReq": {
					"atId":[],
					"pId": null, // 评论父id
					"type": 1,//1评论 2回复
					"replyId": "",//回复的id
					"content": null // 评论内容
				},
				"content":"",
				"pUser": null, // 标签-回复人
				"showTag": false, // 标签展示与否
				"focus": false, // 输入框自动聚焦
				"submit": false, // 弹出评论
				"KeyboardHeight": 0 ,// 键盘高度
				showAtList:false,
				oldContentLength:0,
				insertAtDataIndex:0,
				noticeSt:false,
				disabled:false
			};
		},
		mounted:()=>{
			uni.onKeyboardHeightChange(res => {
				this.KeyboardHeight = res.height;
			})
		},
		methods: {
			toPosition(id){
				uni.createSelectorQuery().select('#f'+id).boundingClientRect(data => {
					this.$emit('position',data)
				}).exec()
			},
			// 初始化评论
			init(cmData) {
				this.commentData = cmData;
			},
			handleInput(e){
				const nowInputChar = e.detail.value.charAt(e.detail.cursor-1)
				if(this.oldContentLength < e.detail.value.length){
					if(nowInputChar === "@"){
						this.showAtList = true
						this.disabled = true
						this.insertAtDataIndex = e.detail.cursor
					}
				}
				this.oldContentLength = e.detail.value.length
			},
			atconfirm(e){
				this.hideAtList()
				const value = e.value[0]
				this.content = this.insertStr(this.content,this.insertAtDataIndex,value.userName)
				const isRepeat = this.commentReq.atId.findIndex(item=>item.id === value.id)
				if(isRepeat == -1 && value.userName != 'all'){
					this.commentReq.atId.push({
						id:value.userId,
						userName:value.userName
					})
				}
				if(value.userName === 'all'){
					this.commentReq.atId = []
				}
			},
			hideAtList(){
				this.showAtList = false
				this.disabled = false
			},
			// 没用的方法，但不要删
			stopPrevent() {},
			// 回复评论
			reply(pUser, reUser, pId,isReply) {
				this.commentReq.replyId = reUser.id
				this.pUser = pUser;
				this.commentReq.pId = pId;
				if (reUser && isReply) {
					this.commentReq.type = 3
				} else {
					this.commentReq.type = 2
					this.content = '';
				}
				this.showTag = true;
				this.commentInput();
			},
			// 删除评论前确认
			confirmDelete(commentId) {
				var that = this;
				uni.showModal({
					title: '警告',
					content: that.deleteTip,
					confirmText: '确认删除',
					success: function(res) {
						if (res.confirm) {
							that.$emit('del', commentId);
						}
					}
				});
			},
			// 新增评论
			add() {
				if (this.commentReq.content == null || this.commentReq.content.length < 2) {
					uni.showToast({
						title: '评论内容过短',
						icon: 'none'
					})
					return
				}
				this.oldContentLength = 0
				this.$emit('add', this.commentReq);
			},
			getReplyString(item,list){
				let str = ""
				const reItem = list.find(item2=>item2.id == item.replyId)
				if(reItem){
					return reItem.senderName+"："+reItem.content
				}else{
					return "暂无"
				}
			},
			// 点赞评论
			like(commentId) {
				this.$emit('like', commentId);
			},
			// 新增完成
			addComplete() {
				this.commentReq.content = null;
				this.tagClose();
				this.closeInput();
			},
			// 点赞完成-本地修改点赞结果
			likeComplete(commentId) {
				for (var i in this.commentData.comment) {
					if (this.commentData.comment[i].id == commentId) {
						this.commentData.comment[i].hasLike ? this.commentData.comment[i].likeNum-- : this.commentData
							.comment[i].likeNum++;
						this.commentData.comment[i].hasLike = !this.commentData.comment[i].hasLike;
						return
					}
					for (var j in this.commentData.comment[i].children) {
						if (this.commentData.comment[i].children[j].id == commentId) {
							this.commentData.comment[i].children[j].hasLike ? this.commentData.comment[i].children[j]
								.likeNum-- : this.commentData.comment[i].children[j].likeNum++;
							this.commentData.comment[i].children[j].hasLike = !this.commentData.comment[i].children[j]
								.hasLike;
							return
						}
					}
				}
			},
			// 删除完成-本地删除评论
			deleteComplete(commentId) {
				for (var i in this.commentData.comment) {
					for (var j in this.commentData.comment[i].children) {
						if (this.commentData.comment[i].children[j].id == commentId) {
							this.commentData.comment[i].children.splice(Number(j), 1);
							return
						}
					}
					if (this.commentData.comment[i].id == commentId) {
						this.commentData.comment.splice(Number(i), 1);
						return
					}
				}
			},
			// 展开评论
			showMore(commentId) {
				for (var i in this.commentData.comment) {
					if (this.commentData.comment[i].id == commentId) {
						this.commentData.comment[i].hasShowMore = !this.commentData.comment[i].hasShowMore;
						this.$forceUpdate();
						return
					}
					for (var j in this.commentData.comment[i].children) {
						if (this.commentData.comment[i].children[j].id == commentId) {
							this.commentData.comment[i].children[j].hasShowMore = !this.commentData.comment[i].children[j]
								.hasShowMore;
							this.$forceUpdate();
							return
						}
					}
				}
			},
			// 输入框失去焦点
			blur() {
				this.focus = false;
			},
			// 输入框聚焦
			focusOn(e) {
				this.$emit('focusOn');
			},
			// 标签关闭
			tagClose() {
				this.showTag = false;
				this.pUser = null;
				this.commentReq.pId = null;
			},
			// 输入评论
			commentInput(tag) {
				if(tag === false){
					this.showTag = false
					this.commentReq.atId = []
					this.commentReq.pId = null
					this.commentReq.type = 1
					this.commentReq.replyId = ""
				}
				// TODO 调起键盘方法
				this.submit = true;
				setTimeout(() => {
					this.focus = true;
				}, 50)
			},
			// 关闭输入评论
			closeInput() {
				if(!!this.commentReq.content){
					uni.showModal({
						title: '警告',
						content: "评论内容将清空",
						confirmText: '确认',
						success:(res)=>{
							if(res.confirm){
								this.focus = false;
								this.submit = false;
								this.content = ""
								this.commentReq = {
									"atId":[],
									"pId": null, // 评论父id
									"type": 1,//1评论 2回复
									"replyId": "",//回复的id
									"content": null // 评论内容
								}
							}
						}
					});
				}else{
					this.focus = false;
					this.submit = false;
				}
			},
			toDetails(data){
				uni.navigateTo({
					url: '/pages/contacts/details?userId='+data.senderId
				})
			},
			insertStr(str1, n, str2){
			    var s1 = '';
			    var s2 = '';
			    if(str1.length<n){
			        return str1 + str2;
			    }else{
			        s1 = str1.substring(0, n);
			        s2 = str1.substring(n, str1.length);
			        return s1 + str2 + s2;
			    }
			}
		}
	};
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	.hb-comment {
		padding: 10rpx;
		margin-bottom: 50px;
	}

	.top-read {
		font-size: 28rpx;
		padding-left: 10rpx;
		color: #999999;
	}

	.seg_line_box {
		display: flex;
		height: 5rpx;
		justify-content: space-between;
		margin: 5rpx 0;
	}

	.seg_line {
		width: 45%;
		border-bottom: 1rpx solid #e1e1e1;
	}

	.seg_dot {
		width: 8%;
		border-bottom: 5rpx dotted #dbdbdb;
	}

	.comment-num {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.comment-box {
		padding: 10rpx 0;
	}

	.comment-box-item {
		display: flex;
	}

	.comment-main {
		flex:1;
		padding-left: 20rpx;
		margin-bottom: 5px;
	}

	.comment-main-top {
		width: 600rpx;
		padding-top: 6rpx;
		display: flex;
		justify-content: space-between;
	}

	.sub-comment-main-top {
		width: 510rpx;
		padding-top: 6rpx;
		display: flex;
		justify-content: space-between;
	}

	.avatar {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.nick-name-box {
		display: flex;
		align-items: center;
	}

	.comLogo {
		margin-right: 18rpx;
		font-size: 22rpx;
		border-radius: 10rpx;
		padding: 5rpx 15rpx;
		color: #FFFFFF;
	}

	.com1 {
		background-color: #d218b1;
	}

	.com2 {
		background-color: #f19c0b;
	}

	.com3 {
		background-color: #c8da85;
	}

	.com4 {
		background-color: #bfd0da;
	}

	.nick-name {
		color: #1f2f3d;
		font-size: 15px;
	}

	.isLike {
		font-size: 28rpx;
		padding-right: 10rpx;
		color: #2d8cf0;
	}

	.notLike {
		font-size: 28rpx;
		padding-right: 10rpx;
		color: #999999;
	}

	.comment-main-content {
		padding: 10rpx 10rpx 10rpx 0;
		font-size: 14px;
		color: #1F2329;
		transition: all .5s;
	}

	.comment-main-foot {
		display: flex;
		font-size: 22rpx;
		.foot-time{
			color: #8F959E;
			font-size: 13px;
		}
	}

	.replayTag {
		color: #909399;
		margin-bottom: 5px;
		border: 1px solid #c8c9cc;
		background-color: #f4f4f5;
		border-radius: 3px;
		display: flex;
		justify-content: space-between;
		align-items: center; 
		font-size: 10px;
		padding: 5px 10px;
	}

	.replyTagClose {
		font-size: 20px;
		line-height: 12px;
		padding: 0 0 2px 5px;
	}

	.foot-btn {
		padding-left: 10rpx;
		color: #007AFF;
	}

	.comment-sub-box {
		padding: 20rpx 0;
	}

	.comment-sub-item {
		display: flex;
	}

	.comment-none {
		padding: 20rpx;
		width: 100%;
		text-align: center;
		color: #999999;
	}

	.comment-submit-box {
		position: fixed;
		display: flex;
		align-items: flex-end;
		z-index: 9;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.5);
		width: 100%;
	}

	.comment-add {
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		padding: 5rpx;
		border: 1px solid #ddd;
		transition: .3s;
		-webkit-transition: .3s;
	}

	.btn-click {
		color: #007AFF;
		font-size: 28rpx;
		padding: 10rpx;
	}

	.cancel {
		color: #606266;
	}

	.textarea {
		height: 150px;
		padding: 16rpx;
		width: 100%;
	}

	.comment-submit {
		padding: 5rpx 20rpx 0 20rpx;
		border-bottom: 1px dashed #ddd;
		width: calc(100% - 40rpx);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.avatar-text {
		width:60rpx;
		height:60rpx;
		font-size: 22rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #3196FA;
		margin: 0 auto;
	}
	.sayWords{
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 1px solid #ddd;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		width: 100%;
		padding:11px 11px 23px 11px;
		.word{
			width: 100%;
			    height: 40px;
			    background-color: #f2f2f2;
			    /* padding: 7px; */
			    color: #909399;
			    border-radius: 10px;
			    font-size: 14px;
			    line-height: 40px;
			    padding-left: 10px;
		}
	}
	.atUsers{
		width: 100%;
		background-color: #ddd;
		padding: 20rpx;
	}
	.reply-content{
		width:262px;
		font-size:13px;
		border-left: 3px solid #DDE0E3;
		padding-left:5px;
		margin-top:5px;
		color: #8F959E;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow:hidden;
	}
	.comment-time{
		font-size:13px; color:#8F959E;flex: 1;margin-left:6px;
	}
</style>
