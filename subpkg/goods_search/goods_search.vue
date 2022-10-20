<template>
<view class="container">
	   <uni-search-bar  @input='input' :focus="focus" :radius="100"  :placeholder="placeholder"  cancelButton='none' >
		   <!-- 如果要用防抖的话 就不能用 v-model -->
	   	</uni-search-bar>
		
		<view style="padding-left:10px;padding-right:10px">
			
		<!-- 动态渲染建议列表 -->
		<view  v-if="searchResults.length>0"  class="suggestList">
			<view class="suggestItem" @click='gotoDetail(item.goods_id)'  v-for="(item,index) in searchResults" :key="item.goods_id">
				<uni-icons type="search" size="16" ></uni-icons>
				{{` `+` `+item.goods_name}}
			</view>
		</view>
	     <!-- 搜索历史标签栏 -->
	    <view v-else>
			<view style="height:30px;line-height:30px;margin-bottom:5px">
				<text style="margin-right:10px">搜索历史</text>
				<uni-icons type="trash" size='17' @click="clearSearchHistory()"></uni-icons>
			</view>
			<view>
				<uni-tag style="padding:0 10px"  type="success" :text="item" v-for="(item,index) in historyList" :key="index" ></uni-tag>
		    </view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				focus:true,
				timer:null,
				interValTimer:null,
				placeholder:'hello world',
				index:1,
				toggleRecommend:['蔬菜','水果','海鲜','干货'],
				searchResults:[],
				historyList:['电视','海鲜'],
			};
		},
		methods:{
			input(e){
                   // 输入框的防抖处理,只取最后一次的赋值
			 clearTimeout(this.timer)
			 let that =this
			 this.timer=setTimeout(()=>{
			     // this 就是component这个对象 所以不用this 重新赋值到 that
				 this.searchValue=e
				 this.getSearchList(e)
			 },500)
			},
			async getSearchList(e){
				
				if(this.searchValue ==''){
				   this.searchResults=[]
				   return 
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{'query':this.searchValue})
			    if(res.meta.status!=200) {
					this.searchResults=[]
					return uni.$showMsg()
				}
				this.searchResults=res.message
				
			},
			gotoDetail(goods_id){
				this.addSearchValue(this.searchValue)
				uni.navigateTo({url:"/subpkg/goods_detail/goods_detail?goods_id="+goods_id})
				
			},
			handleTag(e){
				console.log(e)
			},
			addSearchValue(value){
				// 检查有没有重复
				console.log('11111')
				if(this.historyList.indexOf(value) != -1){
					console.log('11111')
					this.historyList.splice(this.historyList.indexOf(value),1)
				}
				// 加入搜索历史数组
				this.historyList.unshift(value)
				// 将其持久化存储到本地
				uni.setStorageSync('historyList',JSON.stringify(this.historyList))
				
			},
			clearSearchHistory(){
				this.historyList=[]
				// 这里不能用wx.clearStorage（wx.clearStorageSync) 因为可能会将所有的本地存储偶读清理干净
				uni.setStorageSync('historyList','[]')
			},
		    
		},
		onLoad(){
			this.historyList=JSON.parse(uni.getStorageSync("historyList") || [])
		}
		,
		onShow(){
			
			this.interValTimer=setInterval(()=>{
				this.placeholder=this.toggleRecommend[this.index%this.toggleRecommend.length-1]
				this.index+=1
				if(this.index%6===0){
					this.index=1
				}
			},3000)
		},
		onHide(){
			clearTimeout(this.interValTimer)
		}
	}
</script>

<style lang="scss">
	.container{
		position:sticky;
		top:0;
		z-index:100;
		.suggestList{
			 // display:flex;
			.suggestItem{
				line-height: 40px;
				height: 40px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				border-bottom: 1px solid lightgray;
				padding-left:10px;
			}
		}
	}
	

</style>
