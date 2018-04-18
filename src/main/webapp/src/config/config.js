export const HTTP_TIMEOUT='5000';
export const CONSTANTS={
    deviceType:"dp",
    signVersion:"01",
    aesKey:"Skyworth@@Hitune",
    product:true,
    debug:false
};
export const URL = {
	imgFrontUrl:"http://182.92.66.64",
	smsApi: "http://192.168.3.27:38080/sh-sms-api",
	wifiAuth: CONSTANTS.product
	?"http://123.57.37.43:8081/merchant"
	:"http://192.168.3.54:8080/wifimerchant"
};
export const CODE={
    repMsg_fail:"1-9",
    repMsg_error:"1-8",
    getWx_fail:"2-9",
    getWx_error:"2-8",
    login_fail:"3-9",
    login_error:"3-8"
};

