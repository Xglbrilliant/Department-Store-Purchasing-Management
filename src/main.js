import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'
import api from './api'
Vue.prototype.$api = api;
Vue.config.productionTip = false
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel);
import  Breadcrumb  from '@/components/BreadCrumb/breadcrumb.vue'
Vue.component('BreadCrumb', Breadcrumb);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
