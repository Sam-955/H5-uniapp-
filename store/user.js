export default{
	namespaced:true,
	state:()=>({address:JSON.parse(uni.setStorageSync('address') || "{}")}),
	actions:{
		
	},
	mutations:{
		updateAddress(state,address){
			state.address=address
		},
		saveAddress(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName +state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}