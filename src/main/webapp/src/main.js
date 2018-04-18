import './config/flexible.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button} from 'mint-ui'
Vue.config.productionTip = false

Vue.component(Button.name, Button);
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
