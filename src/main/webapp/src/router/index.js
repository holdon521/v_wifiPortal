import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import error from '@/pages/error'
import often from '@/pages/often'
import vip from '@/pages/vip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/index',
      component: index
    },
    {
      path: '/error/:code',
      name: '/error',
      component: error
    },
    {
      path: '/often',
      name: '/often',
      component: often
    },
    {
      path: '/vip',
      name: '/vip',
      component: vip
    }
  ]
})
