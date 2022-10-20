<template>
	<view class="container" :style="{'background-color':bgc}" >
	     <view class="search" @click="handleSearch" :style="{'border-radius':bdr+'px'}">
			 <uni-icons type="map" size="20"></uni-icons>
			 <text style='font-size:20px;font-weight:400'>{{placehold}}</text>
		 </view>
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placehold:'搜索',
			    searchRecommend:['海鲜','核酸检测','新冠阳性'],
				time:null
			}
		},
		props:{
			bgc:{
				type:'String',
				value:'#007AFF'
			},
			bdr:{
				type:'Number',
				value:20
			}
		},
		methods: {
			handleSearch(){
				// 这里看是什么操作，如果需要父组件来处理就
				// 需要用 this.$emit("绑定的事件名")传递处理
				// 如果子组件自己处理就写处理函数 
				this.$emit("search")
			},
			// togglePlacehold(){
			// 	console.log('123')
			// 	let index=1
			// 	let that=this
			// 	this.timer=setInterval(()=>{
			// 		that.placehold=that.searchRecommend[index%that.searchRecommend.length-1]
			// 		index+=1
			// 	},1000)
			// } 
		},
		// unShow(){
		// 	togglePlacehold()
		// },
		// unHide(){
		// 	clearInterval(this.timer)
		// }
	}
</script>

<style lang="scss">
	.container{
		width:100%;
		height:50px;
		background-color:#007AFF;
		padding:10px 15px;
		.search{
			width:93%;
			height:50px;
			line-height:50px;
			text-align:center;
			background-color:white;
			border-radius:20px;
			
		}
		
	}
   

</style>
