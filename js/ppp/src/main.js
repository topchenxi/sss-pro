// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import Filter from './mixin/filters.js'
import ECharts from 'vue-echarts/components/ECharts.vue'
import FastClick from 'fastclick'
// import AutoSize from 'autosize'
window.addEventListener(
    'load',
    function () {
        FastClick.attach(document.body)
    },
    false
)
// Vue.use(AutoSize)
Vue.use(ECharts)
Vue.component('chart', ECharts)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.mixin(Filter)

const router = new VueRouter(routerConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
