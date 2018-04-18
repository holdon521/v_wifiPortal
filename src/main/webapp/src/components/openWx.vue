<template>
	<div></div>
</template>
<script>
	import HttpService from '../service/httpService.js'
	import { Toast } from 'mint-ui';
	export default {
		props: ['wxUrl'],
		data: function() {
			return {

			}
		},
		mounted: function() {
			this.GotoRedirect();
			window.jsonpCallback = this.jsonpCallback;
		},
		methods: {
			GotoRedirect: function() {
				let script = document.createElement('script');
				script.setAttribute('src', this.wxUrl);
				document.getElementsByTagName('head')[0].appendChild(script);
			},
			jsonpCallback: function(result) {
				if(result && result.success) {
					let ua = navigator.userAgent;
					if(ua.indexOf("iPhone") != -1 || ua.indexOf("iPod") != -1 || ua.indexOf("iPad") != -1) { //iPhone             
						document.location = result.data;
					} else {
						let iframe = document.createElement("iframe");
					    iframe.style.cssText = "display:none;width:0px;height:0px;";
					    document.body.appendChild(iframe);
						let callTime = new Date().getTime();
						iframe.src = result.data;
						setTimeout(() => {
							this.errorJump(callTime,result.data);
						}, 3000);
					}
				} else if(result && !result.success) {
					Toast('获取微信scheme失败!');
				}
			},
			errorJump: function(callTime,wxurl) {
				var now = new Date().getTime();
				if((now - callTime) > 4*1000){
					return;
				}
				alert('该浏览器不支持自动跳转微信请手动打开微信\n如果已跳转请忽略此提示');
				window.location = wxurl;
			}
		}
	}
</script>
<style>
	.adBoot {
		position: fixed;
		z-index: 10;
	}
	
	.wrap_wx {
		width: 10rem;
		background-color: #fff;
		margin: 0 auto;
	}
	
	i.ad_end_times {
		position: absolute;
		width: 2.5rem;
		height: .8rem;
		line-height: .8rem;
		right: .3rem;
		top: .4rem;
		font-size: .375rem;
		text-align: center;
		color: #585757;
		border-radius: .4rem;
		background-color: #FFFFFF;
	}
	
	.ad_end_times img {
		width: .6rem;
		height: .6rem;
	}
	
	.ad_end_times .adImg {
		display: block;
		width: .6rem;
		height: .6rem;
		margin-top: .1rem;
		margin-left: .3rem;
	}
	
	.ad_end_times .adFont {
		float: right;
		display: block;
		margin-top: -.7rem;
		margin-right: .3rem;
	}
</style>