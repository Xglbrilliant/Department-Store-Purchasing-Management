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
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/product/Index.vue'),
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/product/list/Index.vue')
          },
          {
            path: 'category',  //加/跳转时会从站点的根目录开始寻找，而不加/则会从当前路径开始寻找
            name: 'category',
            component: () => import('@/views/product/category/Index.vue')
          },
          {
            path: 'add-product',  //商品添加-编辑-查看
            name: 'ProductPage',
            component: () => import('@/views/product/list/AddProduct.vue'),
            meta: {  //配置高亮标识
              activeMenu: '/product/list'
            }
          },
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/Index.vue'),
        children: [
          {
            path: 'collect',
            name: 'collect',
            component: () => import('@/views/order/collect/Index.vue')
          },
          {
            path: 'contract',
            name: 'contract',
            component: () => import('@/views/order/contract/Index.vue')
          },
          {
            path: 'order-list',
            name: 'orderList',
            component: () => import('@/views/order/list/Index.vue')
          },
        ]
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/Index.vue'),
        children: [
          {
            path: 'advert-list',
            name: 'advertList',
            component: () => import('@/views/advert/list/Index.vue')
          },
        ]
      },
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
