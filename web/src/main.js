import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

import http from './http'
import vuetify from './plugins/vuetify';
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
