import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css'
import './assets/css/iconfont.css'
import './assets/css/base.css'
import piniapluginpersistedstate from 'pinia-plugin-persistedstate'
//全局导入element-plus
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
//怎么按需修改中文
// import locale from "element-plus/lib/locale/lang/zh-cn";//需要新加的代码

// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import {reactive} from 'vue'
// const { locale } = reactive({
//   locale: zhCn,
// });

import api from '@/api'
import Breadcrumb from './components/Breadcrumb/Breadcrumb.vue'
const app = createApp(App);
const pinia = createPinia()
pinia.use(piniapluginpersistedstate);
// app.use(ElementPlus, {locale});//需要改变的地方，加入locale
app.component('Breadcrumb',Breadcrumb)
app.config.globalProperties.$api = api;

app.provide('$api',api)
app.use(pinia)
// app.use(ElementPlus);
app.use(router).mount("#app");

