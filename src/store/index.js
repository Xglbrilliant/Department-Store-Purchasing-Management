import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product.js'
import createPersistedstate   from 'vuex-persistedstate'
import login from './modules/login.js'
import menu from './modules/menu.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false,//默认菜单栏不折叠
  },
  getters: {
  },
  mutations: {
    changeIsCollapse(state,bool){
      state.isCollapse = bool;
    }
  },
  actions: {
  },
  modules: {
    product,
    login,
    menu
  },
  //plugins:[] vuex插件-持久化 数组语法 多个插件名称
  plugins:[
    createPersistedstate({
      key:'info',//存储vuex数据的任意键名--本地存储里面 localStorage 
      paths:['product','login'],//存储的模块名称一级全局state数据  不写默认存储所有内容
    }),
  ]
})
