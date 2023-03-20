import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home.vue'

//解决点击跳转同一个路径时会报错：在VueRouter上配置路由跳转，注意加在use之前
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter)
//路由信息 this.$route.matched=[{一级路由信息},{二级路由信息},...{当前路由信息}] 
export const baseRoutes = [
  {
    path: '/',
    component: () => import('@/views/layout/Index.vue'),
    meta: {
      title: '万民百货管理系统',
      isLogin:true,//是否需要登录
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,  //首页展示所以不使用懒加载或异步组件
        meta: {
          title: '首页',
        }
      },
    ]
  },
]
export const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/layout/Index.vue'),
  //   meta: {
  //     title: '万民百货管理系统',
  //     isLogin:true,//是否需要登录
  //   },
  //   children: [
  //     {
  //       path: '/',
  //       name: 'home',
  //       component: Home,  //首页展示所以不使用懒加载或异步组件
  //       meta: {
  //         title: '首页',
  //       }
  //     },
      // {
      //   path: '/product',
      //   name: 'product',
      //   component: () => import('@/views/product/Index.vue'),
      //   redirect: '/product/list',//点击面包屑跳转时重定向
      //   meta: {
      //     title: '产品管理',
      //   },
      //   children: [
      //     {
      //       path: 'list',
      //       name: 'list',
      //       component: () => import('@/views/product/list/Index.vue'),
      //       meta: {
      //         title: '产品列表',
      //       },
      //     },
      //     {
      //       path: 'category',  //加/跳转时会从站点的根目录开始寻找，而不加/则会从当前路径开始寻找
      //       name: 'category',
      //       component: () => import('@/views/product/category/Index.vue'),
      //       meta: {
      //         title: '产品分类',
      //       },
      //     },
      //     {
      //       path: 'add-product',  //商品添加-编辑-查看
      //       name: 'ProductPage',
      //       component: () => import('@/views/product/list/AddProduct.vue'),
      //       meta: {  //配置高亮标识
      //         activeMenu: '/product/list',
      //         title: '商品信息编辑'
      //       }
      //     },
      //   ]
      // },
      // {
      //   path: '/order',
      //   name: 'order',
      //   component: () => import('@/views/order/Index.vue'),
      //   redirect: '/order/collect',
      //   meta: {
      //     title: '订单管理',
      //   },
      //   children: [
      //     {
      //       path: 'collect',
      //       name: 'collect',
      //       component: () => import('@/views/order/collect/Index.vue'),
      //       meta: {
      //         title: '订单汇总',
      //       },
      //     },
      //     {
      //       path: 'contract',
      //       name: 'contract',
      //       component: () => import('@/views/order/contract/Index.vue'),
      //       meta: {
      //         title: '订单审核',
      //       },
      //     },
      //     {
      //       path: 'order-list',
      //       name: 'orderList',
      //       component: () => import('@/views/order/list/Index.vue'),
      //       meta: {
      //         title: '订单列表',
      //       },
      //     },
      //   ]
      // },
      // {
      //   path: '/advert',
      //   name: 'advert',
      //   component: () => import('@/views/advert/Index.vue'),
      //   // redirect: '/advert/list',
      //   meta: {
      //     title: '广告管理',
      //   },
      //   children: [
      //     {
      //       path: 'advert-list',
      //       name: 'advertList',
      //       component: () => import('@/views/advert/list/Index.vue'),
      //       meta: {
      //         title: '广告列表',
      //       },
      //     },
      //   ]
      // },
      // { 
      //   path:'/system',
      //   name:'system',
      //   component: () => import('@/views/SystemMange/Index.vue'),
      //   redirect:'/system/role',
      //   meta:{
      //     title:"系统管理",
      //   },
      //   children:[
      //     {
      //       path:'role',
      //       name:'role',
      //       component: () => import('@/views/SystemMange/role/Index.vue'),
      //       meta:{
      //         title:"角色管理",
      //       },
      //     },
      //     {
      //       path:'department',
      //       name:'department',
      //       component: () => import('@/views/SystemMange/department/Index.vue'),
      //       meta:{
      //         title:"部门管理",
      //       },
      //     }
      //   ]
    
      // },
    // ]
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue')
  },
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

/* 
解决：退出登录再登录后 控制台路由命名重复警告问题
  发现自己的name并没有重名,那么一般是后台动态路由导致的报错警告。
  动态路由一般来说是通过后端接口返回拿到数据，然后在路由守卫router.beforeEach 中进行添加。
  addRoutes 方法仅仅是帮我们注入新的路由，并没有剔除其它路由。
*/

const createRouter  =() => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

// import store from '@/store'
// // 配置路由全局前置守卫导航
// router.beforeEach((to, from, next) => {
//   // 判断进入的路由界面是否需要登录，若不需要则直接接进入
//   if(to.matched.some(ele => ele.meta.isLogin)) {//需要登录
//     console.log('为什么可以看见？');
//     // 判断是否已经登录（即token是否存在）
//     if(store.state.login.userinfo.token) {
//       next()
//     }else {
//       next('/login')
//     }
//   }else {
//     next()
//   }
// })

export default router
