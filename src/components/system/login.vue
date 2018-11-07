<template>
	<div class="system-login">
		<h4 class="title">
			LOGIN
			<span>
				用户登录
			</span>
		</h4>
		<div class="form">
			<div class="form-group">
				<span class="loginLabel">用户名:</span>
				<input type="text" class="form-control" 
					 placeholder="用户名" @keyup.enter="loginConfirm"
					v-model="loginParam.username">
			</div>
			<div class="form-group">
				<span class="loginLabel">密码:</span>
				<input type="password" class="form-control" 
					placeholder="密码" @keyup.enter="loginConfirm"
					v-model="loginParam.password">
			</div>
			<button type="button" 
				class="btn btn-default" v-on:click="loginConfirm">登录</button>
			<button type="button" 
				class="btn btn-default" v-on:click="userMsgClear">重置</button>
		</div>
		<span class="version-msg">
			版本号：2018(dev)
		</span>
	</div>
</template>

<script>
/*
跨域问题总结：客户端http://localhost:8080,服务端：http://127.0.0.1:3000
1，res.header("Access-Control-Allow-Origin","*");
	浏览器每一个请求会发两次，第一次type为OPTIONS,测试服务能不能响应该域请求，
	返回ok为通过，第二次请求就可以获取到数据
2，res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	设置服务能够响应OPTIONS的请求
3，跨域不会携带cookie问题，将access_token放在headers里传过去
	headers: {
		'access_token': $.cookie('access_token')
	},
4，服务端设置接收请求头允许access_token
	res.header("Access-Control-Allow-Headers", "access_token,Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
5，a连接下载excel不会携带headers问题（但是会携带http://127.0.0.1:3000的cookie，所以可以用下边3.1解决）
	服务器对此请求不检测access_token


3.1，跨域不携带cookie问题
	xhrFields:{
		withCredentials: true,
	},
	此时服务端"Access-Control-Allow-Origin"的值不可以是‘*’，只能添加白名单
	服务点还需设置res.header("Access-Control-Allow-Credentials","true");
	但此时携带的cookies是http://127.0.0.1:3000域名下的cookie还需要在登录成功时服务端保存cookie
	res.cookie("access_token", result[0].token, {maxAge: 1000*60*60*24*30,httpOnly: true});
	a链接是可以携带cookie的，而且正好是http://127.0.0.1:3000的cookie，问题4也就解决了
 */
	import jquerycookie from 'jquery.cookie'
	export default {
		name: 'login',
		data() {
			return {
				loginParam:{username:'',password:''},
			}
		},
		methods: {
			loginConfirm:function(){
				var that=this;
				this.yxRequest(
					'post',
					"/sys/login",
					this.loginParam,
					function(result) {
						console.log('登录成功，存cookie')
						that.yxToastr.success('登录成功');
						//文件列表根目录是用户名
						that.$store.commit('fileListRootUrl', {
							url:result.data.UserName,
						})
						that.setLocalStorage('userInfo',JSON.stringify(result.data));
						
						
						$.cookie("access_token",result.data.token,{  expires :7 ,path :' / '});
						setTimeout(function(){
							//that.$router.push({path:'/myapp/systemManage/userManage/0'})
							that.$router.push({path:'/myapp/applicationPlatform/batteryMonitorSys/collectorSelect/1'})
						},2000)
					},
					function(result) {
						that.yxToastr.error('登录失败:'+result.msg);
						console.log('err:',result);
				})
			},
			userMsgClear:function(){
				this.loginParam={username:'',password:''};
			},
		},
	}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
.system-login{
	width: 50%;
	min-width:550px;
	margin: auto;
	height: 50%;
    margin-top: 10%;
	background: @active-color;
	position:relative;
	.title{
	    text-align: left;
	    padding: 8px;
	    font-size: 84px;
	    font-weight: 900;
	    color: lighten(@active-color,30);
		>span{
		    display: inline-block;
		    font-size: 16px;
		    color: #fff;
		    margin-left: 110px;
		}
	}
	>.form{
		width: 80%;
	    margin: auto;
	    padding: 12px 0;
	    background: lighten(@active-color,50%);
	}
	.form-group{
		
		>.loginLabel{
			display: inline-block;
			width: 60px;
		}
		input{
			display:inline-block;
		    width: 40%;
		}
	}
	.version-msg{
		position: absolute;
    	bottom: -30px;
    	color:@active-color;
	}
}
</style>