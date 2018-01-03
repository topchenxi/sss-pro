// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import ElementUI from 'element-ui'
import Filter from './mixin/filters'

Vue.mixin(Filter)
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter(routerConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
