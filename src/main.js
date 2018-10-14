import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.filter('toCurrency', function (value) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
