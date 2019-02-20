// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './lib/rem.js'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

if( process.env.NODE_ENV == 'development' ){
  require('@/lib/vconsole.js')
}
// require('@/lib/vconsole.js')

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
