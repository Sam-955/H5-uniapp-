<template>
	<view >
		<view class="item" v-for="(item,index) in goodsList" :key="item.cat_id"  @click="gotoGoodsDetail(item.cat_id)" >
			<!-- 左边图片 -->
			<view class="left">
				<image :src="item.goods_small_logo" style="width:100%;height:100%"></image>
			</view>
			<view class="right">
	          <!-- 上下结构 -->
				<view style="font-size:14px">
					{{item.goods_name}}
				</view>
				<view style="color:red;font-size:18px">
					<!-- 这里需要用计算属性 -->
					￥{{item.goods_price | tofixed }}
				</view>
			</view>
			<!-- 右边文字+价格 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品查询参数
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
				},
				goodsList:[],
				total:0,
				// 节流阀，防止再请求的时候再去请求
				waitLoading:true,
				
			};
		},
		onLoad(option){
			// option 的参数是 navigateTo传过来的值
			console.log(option)
			this.queryObj.query=option.query || ''
			this.queryObj.cid=option.cid || ''
			this.getGoodsList()
		},
		onReachBottom(){
			this.queryObj.pagenum+=1
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(){
				if(this.waitLoading){
					console.log("111")
					this.waitLoading=false
					const{data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
					this.waitLoading=true
					if(res.meta.status!==200)return uni.$showMsg()
					console.log('res---',res)
					 // 这里需要注意的是 向下拉的时候 获取的是第二页的数据
					 // 然后需要将第二页的数据拼接到旧的数组里面
					this.goodsList=this.goodsList.concat(res.message.goods)
					this.total=res.message.total
				}
				
			},
			gotoGoodsDetail(cat_id){
				uni.navigateTo({url:"/subpkg/goods_detail/goods_detail?goods_id="+cat_id})
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
		
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
		   margin-rigth:10px;
		   width:100px;
		   height:100px
	   };
	   .right{
		   display:flex;
		   flex:1;
		   flex-direction:column;
		   justify-content:space-between;
		   padding-left:10px;
		   
	   }
   }

</style>
