import httpRequest from "../service/httpRequest.js"
import { CONSTANTS } from './config.js'
import { UrlVal } from '../config/util.js'
let checkTime = 2; //ios弹框嗅探次数
let cnetTime = 4; //检测网络次数

class DEVICE {
	//初始化url参数
	initParams() {
		switch(CONSTANTS.deviceType) {
			case 'dp':
				return {
					ssid: UrlVal('ssid'),
					userip: UrlVal('gateway'),
					apmac: UrlVal('apmac'),
					userurl: UrlVal('userurl'),
					usermac: UrlVal('clientmac')
				}
				break;
			default:
				return {}
		}
	};
	login(msg) {
		let param = JSON.stringify({
			"passtime": "5", //认证有效时间（分钟）
			"cmdkey": 110,
			"sn": "123456789112233445566",
			"idletime": "10", //空闲超时时间（分钟）
			"authtype": "1020002", //认证类型，1020002微信认证，1020004短信认证
			"mac": msg.apmac, //ap mac地址
			"clientmac": msg.usermac, //终端mac地址
			"authaccount": msg.usermac, //认证账号
			"reserve": "auth"
		});
		return new Promise((resolve, reject) => {
			httpRequest.httpJsonp("http://" + msg.userip + ":18000?query_string=" + param).then(data => {
				this.xiuNet();
				resolve(data);
			}).catch(error => {
				resolve(error);
			});
		});
	};
	netWork() {
		return new Promise((resolve, reject) => {
			let url = "";
			if(cnetTime > 2) {
				url = "http://jktv.tv/shphone/ver.txt";
			} else if(cnetTime == 1) {
				url = "http://apps.bdimg.com/libs/accounting.js/0.3.2/accounting.min.js";
			} else {
				url = "http://cdn.staticfile.org/Cookies.js/1.2.1/cookies.min.js";
			}
			httpRequest.httpGetRequest(url).then(data => {
				console.info("1" + data)
				resolve(data);
			}).catch(error => {
				console.info("2" + error)
				if(error.readyState == 4 && error.status == 200) {
					resolve(true);
				} else {
					if(cnetTime > 1) {
						cnetTime--;
						setTimeout(() => {
							this.netWork()
						}, 1000);
					} else {
						resolve(false);
					}
				}
			});
		});
	};
	xiuNet() {
		var iframe = document.createElement("iframe");
		iframe.style.cssText = "display:none;width:0px;height:0px;";
		document.body.appendChild(iframe);
		var ua = navigator.userAgent;
		if(ua.indexOf("iPhone") != -1 || ua.indexOf("iPod") != -1 ||
			ua.indexOf("iPad") != -1) {
			iframe.src = "http://skyworth-hightong.com/";
			iframe.width = "1";
			iframe.height = "1";
			console.info("嗅探网络----");
			if(checkTime > 1) {
				checkTime--;
				setTimeout(() => {
					this.xiuNet()
				}, 1000);
			}
		}
	};
}
export default new DEVICE