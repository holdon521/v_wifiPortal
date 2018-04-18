<template>
	<div class="main_spread">
		<detection v-if="adInfo" :adInfo="adInfo" v-on:bootMsg="handlebootMsg"></detection>
		<div v-if="showMain" class="main_wrap">
			<div class="center_wrap">
				<img class="banner_img" src="../images/login_wifi/dp/banner.jpg" width="100%" height="100%" />
			</div>
			<div class="logo">
				<img class="logo_img" src="../images/login_wifi/dp/logo.png" height="100%" />
			</div>
			<mt-button v-if="!checkPhone" type="primary" size="normal" @click="wxCheck()">微信认证</mt-button>
			<sms-check v-if="checkPhone" :MSG="MSG" :check="checkPhone" v-on:smsMsg="handleSmsCheck"></sms-check>
			<open-wx ref="openWx" v-if="wxUrl" :wxUrl="wxUrl"></open-wx>
			<div class="footer_wrap">
				<img class="footer_img" src="../images/login_wifi/dp/foot.jpg" width="100%" height="100%" />
			</div>
		</div>
		<a :href="safariUrl" class="safariA"><button id="saBtn" type="button"></button></a>
	</div>
</template>
<script>
	import detection from '../components/detection'
	import smsCheck from '../components/smsCheck'
	import openWx from '../components/openWx'
	import DEVICE from '../config/wifiDevice.js'
	import HttpService from '../service/httpService.js'
	import { CODE,CONSTANTS } from '../config/config.js'
	import { decodePwd,isTanIos11 } from '../config/util.js'
	import { Indicator,Toast,MessageBox} from 'mint-ui'
	import '../style/cxui.css'
	export default {
		data() {
			return {
				adInfo: null,
				checkPhone: false,
				showMain: false,
				whiteFlg: false,
				expireFlg: false,
				forbidFlg: false,
				toSafari: false,
				repCode: null,
				wxUrl: null,
				safariUrl: "",
				MSG: {}
			}
		},
		beforeCreate: function() {
			Indicator.open();
		},
		mounted: function() {
			this.init();
		},
		components: {
			detection,
			smsCheck,
			openWx
		},
		methods: {
			init: function() {
				this.toSafari = isTanIos11();
				this.MSG = DEVICE.initParams();
				HttpService.repMsg(this.MSG).then(data => {//上报流水
					if(data.ret != "-1" && this.toSafari) {//检测为ios11弹框，提示跳转Safari
						this.safariShow();
					}else if(data.ret == "0") {
					} else if(data.ret == "1") {
						this.whiteFlg = true; //白名单用户
					} else if(data.ret == "2") {
						this.expireFlg = true; //放行有效期内
					} else if(data.ret == "-1") {
						this.checkPhone = true; //校验手机号
					} else if(data.ret == "-6") {
						this.forbidFlg = true; //限制使用
					} else {
						this.repCode = CODE.repMsg_fail;
					}
					let info = JSON.parse(data.msg ? decodePwd(data.msg) : null);
					if(info){
						this.MSG.businesskey = info.businesskey ? info.businesskey : "";
						this.adInfo = info.templateInfo ? info.templateInfo : "";
					}
				}).catch(error => {
					this.repCode = CODE.repMsg_error;
				});
			},
			//微信认证
			wxCheck: function() {
				Indicator.open({
					text: '唤起微信...',
					spinnerType: 'double-bounce'
				});
				HttpService.getWxInfo(this.MSG).then(wxData => {//获取微信串
					if(wxData.ret == "0") {
						this.MSG.orderNumber = wxData.orderNumber;
						DEVICE.login(this.MSG).then(data => {//AC放行
							if(data.result=="KO"){
								this.repCode = CODE.login_fail;
								return;
							}
							HttpService.repResult(this.MSG).then(data => {});//上报放行结果
							this.wxUrl =  decodePwd(wxData.redirecturl);//开始拉微信
						}).catch(error => {
							if(CONSTANTS.debug){
								this.wxUrl =  decodePwd(wxData.redirecturl);//开始拉微信
							}else{
								this.repCode = CODE.login_error;
							}
						});
					} else {
						this.repCode = CODE.getWx_fail;
					}
				}).catch(error => {
					this.repCode = CODE.getWx_error;
				});
			},
			//ios11 跳转到Safari
			safariShow: function(){
				DEVICE.login(this.MSG).then(data => {//AC放行
					MessageBox({
					  title: '温馨提示',
					  closeOnClickModal:false,
					  confirmButtonText:'打开safari',
					  message: 'IOS11用户需要打开safari进行上网认证,如不能自动跳转,请点击下方按钮'
					}).then(action => {
					  this.goSafari();
					});
					setTimeout(() => {
						this.goSafari();
					}, 5000);
				});	
			},
			//AC放行
			login: function(route){
				DEVICE.login(this.MSG).then(data => {
					this.$router.push({name:route});
				});
			},
			//前往Safari
			goSafari: function(){
				Indicator.open();
				this.safariUrl = window.location.href;
				document.getElementById("saBtn").click();
			},
			//检测页子组件 消息通知
			handlebootMsg: function(msg) {
				if(msg.imgLoaded) {
					Indicator.close();
				}
				if(!msg.adFlg) {
					this.showMain = true;
					Indicator.close();
				}
			},
			//短信验证子组件 消息通知
			handleSmsCheck: function(msg) {
				if(msg.checkFlg) {
					if(this.toSafari){
						this.safariShow();
					}else{
						this.wxCheck();
					}
				}
			}
		},
		watch: {
			//上报异常数据
			repCode: function(n, o) {
				if(n) {
					Indicator.close();
					if(!CONSTANTS.debug){
						this.$router.push({name:"/error",params:{code:n}});
						HttpService.repError(n,this.MSG);
					}
				}
			},
			//白名单用户
			whiteFlg: function(n, o) {
				if(n) {
					this.login("/vip");
				}
			},
			//放行有效期内
			expireFlg: function(n, o) {
				if(n) {
					this.login("/vip");
				}
			},
			//禁止访问
			forbidFlg: function(n, o) {
				if(n) {
					this.login("/often");
				}
			}
		}
	}
</script>
<style>
	.main_spread,
	.main_wrap {
		width: 10rem;
		margin: 0 auto;
		margin-top: 0px;
		padding-top: 0px;
	}
	.safariA{
		display: none;
	}
</style>