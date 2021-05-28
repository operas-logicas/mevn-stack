import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import './assets/css/style.css'


Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(BootstrapVue)

Vue.filter(
  'makeItNice',
  date => moment.utc(date).format('MMM DD, YYYY')
)

new Vue({
  router,
  store,
  render: h => h(App)
})
  .$mount('#app')
