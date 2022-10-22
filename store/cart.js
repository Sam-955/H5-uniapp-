export default{
	namespaced:true,
	state: () => ({
	  // 购物车的数组，用来存储购物车中每个商品的信息对象
	  // 每个商品的信息对象，都包含如下 6 个属性：
	  // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
	  cart: JSON.parse(uni.getStorageSync('cart') || '[]')  // 这个道理就和 获取token值一样
	}),
	actions:{
		// 传递过来的goods是商品对象
	},
    mutations:{
		addGoodsNum(state,goods){
                  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
                  if (!findResult) {
                 state.cart.push(goods)
                   } else {
                 findResult.goods_count++
		         console.log("findeResult",findResult.goods_count)
               }
			   // 调用commit 方法，调用m_cart 命名空间下的saveToStorage 方法
               this.commit('m_cart/saveToStorage')
       },
	   // 将购物车中的信息持久化存储
	   saveToStorage(state){
		   // console.log('state本地化',state.cart)
		   uni.setStorageSync('cart',JSON.stringify(state.cart))
		  
	   },
	   
	   updateGoodsState(state,goods){
		  
		   const findResult=state.cart.filter(item=>item.goods_id===goods.goods_id)
		   // console.log('findResult',findResult)
		   if(findResult){
			  findResult[0].goods_state=!goods.goods_state 
			 this.commit('m_cart/saveToStorage')
		   }
	   },
	   changeGoodsNum(state,goods){
		   console.log("goods",goods)
		   const findResult=state.cart.find(item=>item.goods_id===goods.goods_id)
		   // console.log("findResult",findResult)
		   if(findResult){
		   	    findResult.goods_count=goods.goods_count
		   		this.commit('m_cart/saveToStorage')
		    }
	   },
	   deleteGoodsById(state,goods_id){
		   state.cart=state.cart.filter(item=>item.goods_id!==goods_id)
		   this.commit('m_cart/saveToStorage')
	   }
	
	},
	getters:{
		// 计算商品的总数量
	  total(state){
		  let c=0
		  state.cart.forEach(goods=>{
			  c+=goods.goods_count
		  })
		  return c
	  },
	  getGoodsNums(state){
		 return  state.cart.length
	  }
		  
	  
	}
}