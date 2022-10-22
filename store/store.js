import Vue from'vue'
import Vuex from "vuex"
import moduleCart from "./cart.js"
import moduleUser from "./user.js"
// 在Vue实例中注册 Vuex
Vue.use(Vuex)

const store=new Vuex.Store({
	modules:{
       m_cart:moduleCart,
	   m_user:moduleUser,
	}
	
})
export default store