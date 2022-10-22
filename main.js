import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {$http} from "@escook/request-miniprogram"
import store from "@/store/store"
Vue.config.productionTip = false
App.mpType = 'app'

uni.$http=$http
uni.$showMsg=function(title="数据加载失败",duration=1000){
	uni.showToast({
		duration,
		title,
		icon:'none'
	})
}
$http.baseUrl='https://www.uinav.com'

$http.beforeRequest=function(option){
	uni.showLoading({
		"title":"数据加载中....."
	})
}
$http.afterRequest=function(){
	uni.hideLoading()
}
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif
