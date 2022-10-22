<template>
	<view class="item" >
		<!-- 左边图片 -->
		<view class="left">
			<radio :checked="goods_info.goods_state"   v-if="showRadio" @click="changeState"color="#C00000"></radio>
			<image class='img' :src="goods_info.goods_small_logo || default_image " style="width:100%;height:100%"></image>
		</view>
		<view class="right">
	      <!-- 上下结构 -->
			<view style="font-size:14px" class='intro'>
				{{goods_info.goods_name}}
			</view>
			<!-- 右边文字+价格 -->
			<view style='display:flex;justify-content:space-between' >
				<!-- 这里需要用计算属性 -->
				<text style="color:red;font-size:18px;">￥{{goods_info.goods_price | tofixed }}</text>
				<uni-number-box v-if='showNum' :min='1' :value="goods_info.goods_count" @change='changeNum'></uni-number-box>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		props:{goods_info:{type:Object,default:{}},showRadio:{type:Boolean,default:false},showNum:{type:Boolean,default:false}},
		name:"my-goods",
		data() {
			return {
				default_image:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		methods:{
			changeState(){
				
				this.$emit('radio-change', {
				      // 商品的 Id
				      goods_id: this.goods_info.goods_id,
				      // 商品最新的勾选状态
				      goods_state: this.goods_info.goods_state
				    })
				
			},
			changeNum(e){
				this.$emit("changeGoodsNums",{
					goods_id: this.goods_info.goods_id,
					goods_count: e
				})
			},
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
	}
</script>

<style lang="scss">
.item{
	   width:100%;
	   padding:10px 10px;
	   display:flex;
	   border-bottom:1px solid #f0f0f0;
	   box-sizing:border-box;
	   .left{
		   margin-right:5px;
		   display:flex;
		   justify-content:space-between;
		   align-items:center;
		   width:120px;
		   .img{
			  width:100px;
			  height:100px;  
		   }
		   
	   };
	   .right{
		   display:flex;
		   flex:1;
		   flex-direction:column;
		   justify-content:space-between;
		   padding-left:10px;
		   .intro{
			    text-flow: ellipsis;
			   height:60px;
			   display: -webkit-box;  
			   white-space:normal;
			   overflow:hidden;
			   -webkit-line-clamp:3;
			   -webkit-box-orient: vertical;
		   }
		   
	   }
   }
</style>
