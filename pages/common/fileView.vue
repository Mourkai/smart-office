<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="src" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				webviewStyles: {
					progress: {
						color: '#19be6b'
					}
				}
			}
		},
		onLoad({
			url
		}) {
			this.src = url
		}
	}
</script>

<style>
</style>
