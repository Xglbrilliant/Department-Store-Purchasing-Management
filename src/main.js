import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'
import './permission'
import api from './api'
Vue.prototype.$api = api;

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel);
import  Breadcrumb  from '@/components/BreadCrumb/breadcrumb.vue'
Vue.component('BreadCrumb', Breadcrumb);
import i18n from './lang'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app') 
