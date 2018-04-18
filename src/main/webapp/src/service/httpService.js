import httpRequest from "./httpRequest.js"
import { URL, CONSTANTS, CODE } from "../config/config.js"
import { encodeBase64, encodePwd, decodePwd } from '../config/util.js'
import { SignTime } from '../config/util.js'

class HttpService {
	//发送短信
	sendSms(phone, code) {
		return httpRequest.httpPostRequest(URL.smsApi + "/sendAuthCode", {
			"sign": CONSTANTS.signVersion + encodePwd(SignTime()),
			"mobile": encodeBase64(phone),
			"code": code
		})
	}
	repMsg(info) {
		return httpRequest.httpPostRequest(URL.wifiAuth + "/reportMessage", {
			'info': encodePwd(JSON.stringify({
				"userip": info.userip,
				"usermac": info.usermac,
				"apmac": info.apmac,
				"apname": info.apname,
				"ssid": info.ssid
			}))
		})
	}
	getWxInfo(info) {
		return httpRequest.httpPostRequest(URL.wifiAuth + "/getWxInfo", {
			'info': encodePwd(JSON.stringify({
				"businesskey": info.businesskey,
				"orderNumber": info.orderNumber,
				"usermac": info.usermac,
				"apmac": info.apmac
			}))
		})
	}
	getWxScheme(url) {
		return new Promise((resolve, reject) => {
			httpRequest.httpJsonp(url).then(data => {
				resolve(data);
			}).catch(error => {
				reject(error);
			});
		});
	}
	repResult(info, code, mag) {
		return httpRequest.httpPostRequest(URL.wifiAuth + "/reportResult", {
			'info': encodePwd(JSON.stringify({
				"businesskey": info.businesskey,
				"orderNumber": info.orderNumber,
				"type": "0",
				"status": "0",
				"usermac": info.usermac,
				"apmac": info.apmac
			}))
		})
	}
	repError(code, info, msg) {
		httpRequest.httpPostRequest(URL.wifiAuth + "/reportError", {
			'info': encodePwd(JSON.stringify({
				"businesskey": info.businesskey,
				"usermac": info.usermac,
				"code": code,
				"msg": msg,
				"apmac": info.apmac
			}))
		}).then(data => {}).catch(error => {});
	}
	repPhone(phone, info) {
		return httpRequest.httpPostRequest(URL.wifiAuth + "/setMobilePhone", {
			'info': encodePwd(JSON.stringify({
				"businesskey": info.businesskey,
				"usermac": info.usermac,
				"apmac": info.apmac,
				"mobilePhone": phone
			}))
		});
	}
}

export default new HttpService