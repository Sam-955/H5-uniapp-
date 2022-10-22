<template>
	<view v-if="cart.lenght>0">
		<!-- 地址栏 -->
		<my-address></my-address>
		<!-- <view style='display:flex;justify-content:center;align-items:center;height:100px;border-bottom:1px solid lightgray'>
			<button type="primary" 
			style="color: white;
                width: 170px;
                height: 40px;
                font-size: 16px"
				>请选择收货地址+</button>
		</view> -->
		<!-- 商品item 栏 -->
		<view>
			<view style="border-bottom:1px solid #efefef;height:40px;line-height:40px;padding-left:10px;font-size:16px">
				<uni-icons type="cart" size="25" style="margin-right:10px"></uni-icons>购物车
			</view>
			<uni-swipe-action>
			  <block  v-for="(item,index) in cart" :key="item.goods_id">
			    <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
			    <uni-swipe-action-item  :show="true" :right-options="options" @click="swipeActionClickHandler(item)">
			      <my-goods :goods_info="item" @radio-change="radioChange" :showNum='true' @changeGoodsNums='changeGoodsNums' :showRadio='true'></my-goods>
			    </uni-swipe-action-item>
			  </block>
			</uni-swipe-action>
			
		</view>
		<!-- 选择结算栏 -->
		<my-settle></my-settle>
	</view>
	<view v-else class='empty-cart'>
		 <image src="/static/cart_empty@2x.png" class="empty-img"></image>
		    <text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import {mapGetters, mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				options1:[
					{
					    text: '删除',
					    style: {
					        backgroundColor: '#007aff'
					    }
					}
				],
				 options:[
				        {
				            text: '删除',
				            style: {
				                backgroundColor: '#007aff'
				            }
				        }
				      ]
			}
		},
		methods: {
			...mapMutations('m_cart',['updateGoodsState','changeGoodsNum','deleteGoodsById']),
			swipeActionClickHandler(item){
				
				this.deleteGoodsById(item.goods_id)
			},
			show(){
				uni.setTabBarBadge({index:2,text:this.total+''})
			},
			radioChange(goods){
				
				// 修改购物车里面的数据状态(需要到vuex中进行修改)
			   this.updateGoodsState(goods)
				// 同同时将存储在本地的购物车商品状态进行修改
			},
			changeGoodsNums(goods){
				// console.log('goodsgoods',goods)
				this.changeGoodsNum(goods)
			}
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		}
	}
</script>

<style lang="scss">
	
	.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}

	
	.content-box {
			flex: 1;
			/* #ifdef APP-NVUE */
			justify-content: center;
			/* #endif */
			height: 44px;
			line-height: 44px;
			padding: 0 15px;
			position: relative;
			background-color: #fff;
			border-bottom-color: #f5f5f5;
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
	
		.content-text {
			font-size: 15px;
		}

</style>
