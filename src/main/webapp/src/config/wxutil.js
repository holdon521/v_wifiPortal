/* 微信连Wi-Fi协议3.1供运营商portal呼起微信浏览器使用
----开发认证流程所需参数----
	门店名称 : 北京创维海通数字技术有限公司(总公司)
	ssid : xx
	shopId : yy
	appId : zz
	secretKey : aa
----复用demo代码说明----
	若认证Portal页直接使用此Demo源代码，请注意填写代码中的以下参数（由您的网络环境动态获取）：
	extend
	timestamp
	authUrl
	mac
	bssid
	sign
	其中sign签名请在后台完成，例如：
	var toSign = appId + extend + timestamp + shopId + authUrl + mac + ssid + bssid + secretKey;
	var sign= md5(toSign);
----参考文档----
	http://mp.weixin.qq.com/wiki/10/0ef643c7147fdf689e0a780d8c08ab96.html
*/
var loadIframe = null;
var noResponse = null;
var callUpTimestamp = 0;
var wxurl=null;

export const errorJump = () =>{
	 var now = new Date().getTime();
	 if((now - callUpTimestamp) > 4*1000){
		 return;
	 }
	 window.location = wxurl;
	 //alert('该浏览器不支持自动跳转微信请手动打开微信\n如果已跳转请忽略此提示');
}
 
export const createIframe = () =>{
	 var iframe = document.createElement("iframe");
     iframe.style.cssText = "display:none;width:0px;height:0px;";
     document.body.appendChild(iframe);
     loadIframe = iframe;
}
//注册回调函数
export const jsonpCallback = (result) =>{
 	try {
 		alert(result.success)
 		if(result && result.success){
 			wxurl=result.data;
 		    var ua=navigator.userAgent;              
 			if (ua.indexOf("iPhone") != -1 ||ua.indexOf("iPod")!=-1||ua.indexOf("iPad") != -1) {   //iPhone             
 				document.location = result.data;
 			}else{			
 			    createIframe();
 			    callUpTimestamp = new Date().getTime();
 			    loadIframe.src=result.data;
 				noResponse = setTimeout(function(){
 					errorJump();
 		      	},3000);
 			}
 		}else if(result && !result.success){
 			alert(result.data);
 		}
 	} catch (e) {
 	}
 	
 }
