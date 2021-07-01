import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import "./assets/styles.scss";

Vue.config.productionTip = false

axios.defaults.baseURL= 'http://localhost:62357/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
