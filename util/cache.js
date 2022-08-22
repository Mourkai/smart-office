class localCache {
	setCache(key, value) {
		uni.setStorageSync(key, JSON.stringify(value));
	}

	getCache(key) {
		const value = uni.getStorageSync(key);
		if (value) {
			return JSON.parse(value)
		}else{
			return undefined
		}
	}
	deleteCache(key) {
		uni.removeStorageSync(key);
	}

	clearCache() {
		uni.clearStorage();
	}
}

export default new localCache()