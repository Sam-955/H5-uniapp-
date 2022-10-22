<template>
		<view class="bottom">
			<view class="left">
				<radio :checked="ifFullCheck" color="#C00000" @click='changeAllState'></radio>
				全选
			</view >
			<view class='middle'>
				合计:<text style="color:red">￥{{sumPrice}}</text>
			</view>
			<view class="right">
		        <text style="" @click="payment">结算({{checkedCount}})</text>
			</view>
		</view>

</template>

<script>
	import {mapState,mapMutations,mapGetters} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
			};
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapState('m_user',['token']),
			...mapGetters('m_user',['addstr']),
			...mapGetters('m_cart',['total','checkedCount','sumPrice']),
			ifFullCheck(){
				return this.total===this.checkedCount
			}
			
		},
		methods:{
			...mapMutations('m_cart',["changeAllGoodsState"]),
			changeAllState(){
				this.changeAllGoodsState(!this.ifFullCheck)
			},
			payment(){
				
				if(!this.token)return uni.$showMsg('请先登录')
				
				if(!this.checkedCount)return uni.$showMsg('请选择要结算的商品')
				if(!this.addstr)return uni.$showMsg('请选择收货地址')
			}
		},
		
		onLoad(){
			console.log("checkAll--",checkAll)
		},
		
	}
</script>

<style lang="scss">
	.bottom{
		height:60px;
		display:flex;
		position:sticky;
		bottom:0;
		left:0;
		background-color:white;
		z-index:100;
		margin-left:10px;
		.left{
			width:250rpx;
			line-height:60px;
			height:60px;
		}
		.middle{
		 	line-height:60px;
			height:60px;
			width:300rpx;
		};
		.right{
			width:200rpx;
			background:red;
			color:white;
			text-align:center;
			heigth:60px;
			line-height:60px
		}
	}
</style>
