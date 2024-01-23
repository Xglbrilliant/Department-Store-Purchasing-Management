import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/Index.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'

//产品列表
const Product = ()=>import('../views/product/Index.vue')
const List = ()=>import('../views/product/list/List.vue')
const Category = ()=>import('../views/product/category/Category.vue')
const AddProduct = ()=>import('../views/product/addProduct/AddProduct.vue')

//订单管理
const Order = ()=>import('../views/order/Index.vue')
const OrderList = ()=>import('../views/order/list/List.vue')
const Collect = ()=>import('../views/order/collect/Collect.vue')
const Contract = ()=>import('../views/order/contract/Contract.vue')


const routes = [
 {
  path:'/',
  name:'layout',
  component:Layout,
  meta:{
    title:'首页'
  },
  children:[
    {
      path:'/',
      name:'home',
      component:Home,
      meta:{
        title:'首页'
      }
    },
    {
      path:'/product',
      name:'product',
      component:Product,
      meta:{
        title:'产品管理'
      },
      children:[
        {
          path:'list',
          name:'list',
          component:List,
          meta:{
            title:'产品列表'
          } 
        },
        {
          path:'category',
          name:'category',
          component:Category,
          meta:{
            title:'产品分类'
          } 
        },
        {
          path:'addProduct',
          name:'addProduct',
          component:AddProduct,
          meta:{
            activeMenu:'/product/list',
            title:'产品操作'
          }
        }
      ]
    },
    {
      path:'/order',
      name:'order',
      component:Order,
      meta:{
        title:'订单管理'
      },
      children:[
        {
          path:'order-list',
          name:'order-list',
          component:OrderList ,
          meta:{
            title:'订单列表'
          }
        },
        {
          path:'collect',
          name:'collect',
          component:Collect,
          meta:{
            title:'订单汇总'
          } 
        },
        {
          // /contract
          path:'contract',
          name:'contract',
          component:Contract,
          meta:{
            title:'订单审核'
          } 
        }
      ]
    },
  ]
 },
 {
  path:'/login',
  name:'login',
  component:Login
 }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
