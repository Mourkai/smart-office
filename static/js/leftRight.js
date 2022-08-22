const mixin = {
	data() {
		return {
			touchStartX: 0, // 触屏起始点x  
			touchStartY: 0, // 触屏起始点y 
		}
	},
	methods: {
		/**
		 * 触摸开始  
		 **/
		touchStart(e) {
			this.touchStartX = e.touches[0].clientX;
			this.touchStartY = e.touches[0].clientY;
		},
		/**  
		 * 触摸结束  
		 **/
		touchEnd(e) {
			let deltaX = e.changedTouches[0].clientX - this.touchStartX;
			let deltaY = e.changedTouches[0].clientY - this.touchStartY;
			if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX >= 0 && this.currentIndex > 0) {
						this.currentIndex = this.currentIndex - 1
				} else {
					if(this.currentIndex < this.tab.length){
						this.currentIndex = this.currentIndex + 1
					}
				}
			}
		}
	}
}

export default mixin
