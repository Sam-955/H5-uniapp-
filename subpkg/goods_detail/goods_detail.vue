<template>
	<view>
	    <swiper style="height:750rpx" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item  style="width:100%;height:100%" v-for="(item,index) in goods_info.pics" :key="index" @click='previewImage(index)'>
				<image style="width:100%;height:100%" :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 产品介绍 -->
		<view class="goodsIntro">
			<view class='price'>￥{{goods_info.goods_price||800  | tofixed}}</view>
		    <view class="textIntro" >
				<view class="left">
					{{goods_info.goods_name}}
				</view>
				<view class="right">
					<uni-icons type="star" size="23"></uni-icons><br>
					<text>收藏</text>
				</view>
			</view>
			<view style="font-size:14px;color:lightblack">快递：免运费</view>
		</view>
		<!-- 产品详情图 -->
		<view class="goodsImg">
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		
		<view class="cart">
			<view class="gotoTop" v-if="showGotoTop" @click="gotoTop">
				<uni-icons type='top' size='20'></uni-icons><br/>
				<text>顶部</text>
			</view>
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
				@buttonClick="buttonClick" ></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showGotoTop:false,
				options: [{
									icon: 'chat',
									text: '客服'
								}, {
									icon: 'shop',
									text: '店铺',
									info: 2,
								}
						],
								 
				customButtonGroup: [{
										text: '加入购物车',
										backgroundColor: '#ff0000',
										color: '#fff'
									},
									{
										text: '立即购买',
										backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
										color: '#fff'
									}
								],
				goods_info:{},
		           }
		       },
		methods: {
			async getGoodsDetail(goods_id){
				if(goods_id==''){
					return
				}
				const{data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				
			    if(res.meta.status!==200)return uni.$showMsg()
				console.log('res.message',res.message)
				this.goods_info=res.message
			},
			previewImage(current){
			  
				// 要有一个装有图图像url的数组 (这里就可以区别下 filter 和 map 和 foreach区别，)
				const urls =this.goods_info.pics.map((item,index)=>{
					return item.pics_big
				})
				// 调用 uni.previewImage
				uni.previewImage({
					current,
					urls
				})
			},
				onClick(e) {
							uni.showToast({
								title: `点击${e.content.text}`,
								icon: 'none'
							})
				},
				buttonClick(e) {
							console.log(e)
							this.options[2].info++
				},
		         gotoTop(){
					 // 回到顶部
				  uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 1000,
                    })
				  
		        },
			
		},
		onLoad(options){
			const goods_id=options.goods_id
			
			this.getGoodsDetail(goods_id)
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
	    onPageScroll(e) {
	    	// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		     this.showGotoTop=e.scrollTop>700?true:false;
	    	
	    },
		
	}
</script>

<style lang="scss">
    .goodsIntro{
		box-sizing:border-box;
		padding:20px 10px ;
		.price{
			font-size:25px;
			color:red;
			margin-bottom:15px;
		       };
		.textIntro{
			display:flex;
			margin-bottom:10px;
			.left{
				padding-right:10px;
				flex:1;
				border-right:1px solid lightgray;
				font-size:16px;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				white-space:normal;
				
			};
			.right{
				width:80px;
				text-align:center;
				
			}
			
	    }	
    }
	.cart{
		    height: 60px;
		    position: sticky;
		    left: 0;
		    bottom: 0;
		    background-color: white;
			
			.gotoTop{
			   text-align:center;
			   position:absolute;
			   display:inline-block;
			   top:-40px;
			   right:10px;
			   background-color: rgba(255,255,255,0.3);
			   font-size: 10px;
			   width: 40px;
			   height: 40px;
			   border-radius: 40px;
			   color:lightgray
			      
			}
	}
</style>
