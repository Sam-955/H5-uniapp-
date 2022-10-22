export default{
	namespaced:true,
	state:{
		address:JSON.parse(uni.setStorageSync('address') || "{}"),
	    toke:'',
		userInfo:JSON.parse(uni.setStorageSync('userInfo') || "{}")
		},
	actions:{
	},
	mutations:{
		updateAddress(state,address){
			state.address=address
		},
		saveAddress(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserInfo(state,userinfo){
			state.userInfo=userinfo
			this.commit("m_user/saveUserInfo")
		},
		saveUserInfo(state){
			uni.setStorageSync('userInfo',state.userInfo)
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName +state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}