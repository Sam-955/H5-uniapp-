import {mapGetters} from 'vuex'
export default{
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		total:{
			handler(newVal){
				this.setBadge()
			}
		}
	}
	methods:{
	    setBadge(){
			  // console.log('this.total',this.total)
			  uni.setTabBarBadge({index:2,text:this.total+'' })
			 },

	},
	onLoad(){
		this.setBadge()
	},
}
