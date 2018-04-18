import axios from 'axios'
import jsonp from 'jsonp'
import {HTTP_TIMEOUT,URL} from '../config/config.js'
import {encodePwd} from '../config/util.js'

class HttpRequest{
    constructor(url){}
    httpGetRequest(url,paramer,header){
        this.httpType = "get";
        return this.httpPostRequest(url,paramer,header);
    }
    httpPostRequest(paramurl,paramer){
        var config = {
             url: paramurl,
             method: this.httpType==undefined?"post":"get",
             data:paramer,
             timeout: HTTP_TIMEOUT,
             responseType: 'json',
        };
        var data = new Promise((resolve, reject) => {  
            axios.request(config)
            .then((response) => {
            	resolve(response['data'])
            }).catch(function (error) {
                reject(error);
            });
        });
        return data;
    }
    httpJsonp(url,param){
        var data = new Promise((resolve, reject) => {  
            jsonp(url,{
            	timeout: HTTP_TIMEOUT,
            	name:"cb"
            }, (err, data) => {
			  if (err) {
			    console.info(err.message);
			    reject(err);
			  } else {
			  	console.error(data);
			    resolve(data)
			  }
			});
		});
        return data;
    }
}
export default new HttpRequest