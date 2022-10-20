<template>
	<view>
		<my-search> </my-search>
		<view  class='container'>
			 <scroll-view scroll-y="true" class="left" :style="{height:`${wh}px`}" >
				   <view :class="['left-scroll-view-item',index==activeId?'active':'']" @click="tapCate(index,item)" v-for="(item,index) in cateList" :key="item.cat_id">{{item.cat_name}}</view>
			 </scroll-view>
			 
			 <scroll-view scroll-y="true" class="right" :style="{height:`${wh}px`}" :scroll-top="scrollTop">
				 <block v-for="(item2,index) in cateList2Level" class="level2" :key="item2.cat_id">
					 <view class="level2title">
						 {{item2.cat_name}}
					 </view>
					 
                     <view class='level3'>
						 <navigator v-for="(item3,index3) in item2.children" :key="item3.cat_id" class="subContent"
						 :url="'/subpkg/goods_list/goods_list?cid=' + item3.cat_id"
						 >
						      <image :src="item3.cat_icon" class="icon"></image>
							   <view style="width:100%;text-align:center">{{item3.cat_name}}</view>
						 </navigator>
					 </view>
					 
				 </block>
			 </scroll-view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
			wh:0,
			cateList:[],
		    activeId:0,
			cateList2Level:[],
			scrollTop:0
			}
		},
		methods: {
			async getCateList(){
				const {data:res } = await uni.$http.get("/api/public/v1/categories")
				if(res.meta.status !== 200)uni.$showMsg()
				this.cateList=res.message
				this.cateList2Level=res.message[0].children
				
			},
			tapCate(index,item){
				this.activeId=index
                this.cateList2Level=item.children
			    this.scrollTop=this.scrollTop===0?1:0
			}
		},
		onLoad(){
			console.log("1231465")
			const sysInfo=uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight-50
			this.getCateList()
		}
	}
</script>

<style lang="scss">
     .container{
		 display:flex;
		 justify-content:space-between;
		 .left{
			 width:120px;
			 height:300px;
		    .left-scroll-view-item{
			 			 height:60px;
			 			 line-height:60px;
			 			 text-align:center;
			 			 background-color:#f8f8f8;
			 			 font-size:16px;
			    &.active{ 
			 			 background-color:white;
			 			 position:relative;
			 			    &::before{
			 				display:block;
			 				content:'';
			 				width:3px;
			 				height:30px;
			 				position:absolute;
			 				background-color:#c00000;
			 				top:50%;
			 				left:0;
			 				transform:translateY(-50%) 
			               }	
		        }
		     }
         }
		
		 .right{
			flex:1;
			height:300px;
		    .level2title{
				text-align:center;
				line-height:50px;
				padding:10px 0;
			}
		    .level3{
				display:flex;
				flex-direction:row;
				flex-wrap:wrap;
				width:100%;
				.subContent{
					width:33%;
					.icon{
						width:60px;
						height:60px;
					}
				}
			}
	     }
	}
	
	    
</style>
