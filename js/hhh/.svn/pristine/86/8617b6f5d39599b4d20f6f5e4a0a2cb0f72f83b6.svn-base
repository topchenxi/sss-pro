import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Element from 'element-ui'
import { route } from './routeConfig.js'
import NProgress from 'nprogress' // 页面顶部进度条
import 'nprogress/nprogress.css'
import store from './vuex'
import Mixin from 'common/mixin'
Vue.use(VueRouter)
Vue.use(Element)
Vue.mixin(Mixin)
const router = new VueRouter(route)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(transition => {
  NProgress.done()
})
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
