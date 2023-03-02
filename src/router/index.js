import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/Index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: Home  //首页展示所以不使用懒加载或异步组件
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
