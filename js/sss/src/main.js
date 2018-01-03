import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Element from 'element-ui'
import { route } from './routerConfig.js'
import Mixin from 'common/mixin'
Vue.use(Element)
Vue.use(VueRouter)
/* import WxLogin from './views/common/wxLogin/WxLogin.vue'
*/

// If using Webpack 2, you can also do:
// const Foo = resolve => System.import('./Foo.vue').then(resolve)
Vue.mixin(Mixin)
const router = new VueRouter(route)
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
