<template>
	<div v-if="check">
		<div class="input_type">
			<input v-model="SMS.phone" type="text" class="input_type_0" placeholder="手机号" />
			<span class="str_span">
				<input :disabled="!SMS.sendFlg" @click="sendSmsCode()" :class="SMS.sendFlg?'get_str':'get_str sendClose'" :value="SMS.timeText" type="button" />
			</span>
		</div>
		<div class="input_type">
			<input v-model="SMS.smsCode" type="text" class="input_type_1" placeholder="验证码" />
		</div>
		<div class="input_type">
			<span class="loginLoading" v-if="loginFlg"></span>
			<input type="button" value="登录" @click="checkSms()" :disabled="loginFlg" class="login_btn" />
		</div>
	</div>
</template>
<script>
	import HttpService from '../service/httpService.js'
	import { Toast } from 'mint-ui';
	export default {
		props: ['MSG','check'],
		data: function() {
			return {
				loginFlg: false,
				SMS:{
					phone: "15910309242",
					smsCode: "",
					smsSendCode: "",
					sendFlg: true,
					submitFlg: false,
					currentTime: 60,
					timeText: "发送验证码",
				}
			}
		},
		mounted: function() {
           
		},
		methods: {
			//发送短信
			sendSmsCode: function() {
				if(this.SMS.phone && this.checkPhone()) {
					this.settime();
					this.makeSmsCode();
					HttpService.sendSms(this.SMS.phone, this.SMS.smsSendCode).then(data => {
						if(data != null && data.ret == "0") {
							Toast('短信已发送!');
						} else {
							this.SMS.currentTime = 0;
							Toast('发送短信失败，稍后重试！');
						}
					}).catch(error => {
						this.SMS.currentTime = 0;
						Toast('发送短信异常，稍后重试！');
					});
				} else {
					Toast('请输入正确的手机号！');
				}
			},
			//校验短信
			checkSms: function() {
				if(this.checkLogin()) {
					this.loginFlg = true;
					if(this.SMS.smsSendCode != this.SMS.smsCode) {
						this.setMobilePhone();
					}else{
						this.loginFlg = false;
						Toast('请输入正确的验证码！');
					}
				}
			},
			//上报手机号
			setMobilePhone: function() {
				HttpService.repPhone(this.SMS.phone, this.MSG).then(data => {
					if(data != null && data.ret == "0") {
						this.$emit('smsMsg', {
							checkFlg: true
						})
					} else {
						Toast('短信校验失败,稍后重试!');
					}
				})
			},
			//生成短信码
			makeSmsCode: function() {
				var code = "";
				for(var i = 0; i < 4; i++) {
					code += Math.floor(Math.random() * 10)
				}
				this.SMS.smsSendCode = code;
			},
			//校验手机号
			checkPhone: function() {
				var pattern = /^1[3-9]\d{9}$/;
				return pattern.test(this.SMS.phone);
			},
			//校验登录
			checkLogin: function() {
				if(!this.SMS.phone || !this.checkPhone()) {
					Toast('请输入正确的手机号！');
					return false;
				}
				if(!this.SMS.smsCode) {
					Toast('请输入验证码！');
					return false;
				}
				return true;
			},
			//短信倒计时
			settime: function() {
				var that = this;
				if(that.SMS.currentTime == 0) {
					that.SMS.sendFlg = true;
					that.SMS.timeText = "继续发送"
					that.SMS.currentTime = 60;
					return;
				} else {
					that.SMS.sendFlg = false;
					that.SMS.timeText = that.SMS.currentTime + "s后重发";
					that.SMS.currentTime--;
				}
				setTimeout(() => {
					that.settime();
				}, 1000)
			},
		}
	}
</script>
<style>
	.logo{height: 1.5625rem;width: 10rem;text-align: center;padding: 0.46875rem 0;}
	.logo_img{display: inline-block;width: 1.5625rem;height: 1.5625rem;}
	.input_type{display: block;width: 7.8125rem;height: 1.03125rem;margin: 0 1.09375rem 0.5625rem 1.09375rem;position: relative;}
	.input_type:last-of-type{padding-bottom: 0.5625rem;margin-bottom: 0;}
	.str_span{display: block;width: 2.34375rem;height: 1.03125rem;position: absolute;right: 0;top:0;}
	.get_str{display: block;border: none; background: transparent; width: 2.34375rem;height: 1.03125rem;line-height: 1.03125rem;padding: 0;font-size: 0.34375rem;color: #fff;}
	.sendClose{color: #f7f7f7;border-color: #ccc;background-color: #968787;}
	.input_type_0{display: block;color: #fff;font-size: 0.375rem; width: 5rem;height: 0.5625rem; line-height: 0.5625rem; padding: 0.23437rem 2.34375rem 0.23437rem 0.46875rem;background: url(../images/login_wifi/dp/input_type_0.png) no-repeat;background-size: 7.8125rem 1.03125rem;border: none;}
	.input_type_1{display: block;color: #fff;font-size: 0.375rem;width: 5rem;height: 0.5625rem; line-height: 0.5625rem; padding: 0.23437rem 2.34375rem 0.23437rem 0.46875rem;background: url(../images/login_wifi/dp/input_type_1.png) no-repeat;background-size: 7.8125rem 1.03125rem;border: none;}
	.input_type>input::-webkit-input-placeholder { /* WebKit browsers */ 
	color: #fff; 
	} 
	.input_type>input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
	color: #fff; 
	} 
	.input_type>input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
	color: #fff; 
	} 
	.input_type>input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
	color: #fff;
	} 
	.input_type>.str_span>input:focus{outline: 0;}
	.input_type>.str_span>inputinput[disabled]{-webkit-appearance: none;outline:none;background-color: transparent;border: none;opacity:1;}
	.login_btn{display: block;width: 7.8125rem;font-size: 0.375rem; text-align: center;line-height: 1.03125rem;color: #fff; height: 1.03125rem;background: url(../images/login_wifi/dp/login_btn.png) no-repeat;background-size: 7.8125rem 1.03125rem;border: none;}
	.loginLoading{
		position: absolute;
	    left: 2.8rem;
	    top: .2rem;
	    height: .6rem;
	    width: .6rem;
	    background: url(../images/login_wifi/loading.png) center center no-repeat;
	    background-size: .6rem;
	    -webkit-transition: -webkit-transform 2s ease-out;
		-moz-transition: -moz-transform 2s ease-out;
		-o-transition: -o-transform 2s ease-out;
		-ms-transition: -ms-transform 2s ease-out;
		transition:transform 2s ease-out;
		-webkit-animation:1s ease-in 0s normal none infinite rotate;
		animation: 1s ease-in 0s normal none infinite rotate;
	}
</style>