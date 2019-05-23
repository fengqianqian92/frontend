import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import routers from './router/index.js'
import App from './App'
import store from './store/index.js'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(elementUI)

const router = new VueRouter({
  routes:routers
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
