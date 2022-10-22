<template>
	<view>
		<view class="login-container">
		    <!-- 提示登录的图标 -->
		    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		    <!-- 登录按钮 -->
		    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		    <!-- 登录提示 -->
		    <view class="tips-text">登录后尽享更多权益</view>
		  </view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			getUserInfo(e){
				console.log('e---',e)
				if(e.detail.errMsg==='getUserInfo:fail auth deny') return uni.$showMsg("请您授权登录呀")
		         console.log(e.detail.userInfo)
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
				
			},
			...mapMutations('m_user',['updateUserInfo']),
			async getToken(info){
				const [err,res]=await uni.login().catch(err=>err)
				if(err || res.errMsg !=="login:ok")return uni.$showMsg('登录失败了啦')
				// 整理参数
				const query={
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature,
				}
				// 换取token
				const {data:loginResult}=await uni.$http.post('/api/public/v1/user/wxlogin',query)
				console.log('loginResult',loginResult)
				if(loginResult.meta.status!==200)return uni.$showMsg('哦豁！！！登录失败了啊',4000)
				uni.$showMsg('YES！ 登录成功 陈不易，嘿嘿')
			}
		},
		
	}
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #007AFF;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
