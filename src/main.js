import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import routers from './router/index.js'
import App from './App'
import store from './store/index.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios);
Vue.use(Vuex);

const router = new VueRouter({
  routes:routers
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
