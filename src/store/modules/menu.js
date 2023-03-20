/* 动态的路由导航 */
//导入请求的接口方法
import {permission} from '@/api/index'
//导入前端定义好的完整的路由信息
import { menu } from '@/router/menu'
//导入路由 和基本的路由信息
import router,{baseRoutes} from '@/router/index'
export default {
    namespaced: true,
    state: {
        //定义动态导航容器->存储动态导航
        dyMenuList:[],
    },
    mutations: {
      //设置菜单导航
      setMenuList(state,payload){
        state.dyMenuList = payload;
      },
      //清空菜单导航
      removeMenuList(state){
        state.dyMenuList=[];
      }
    },
    actions:{
        //请求动态菜单导航信息的接口方法------token
       async getMenuList({commit,rootState}){
          // console.log('rootState.login.userinfo.token',rootState.login.userinfo.token);
          let res = await permission({token:rootState.login.userinfo.token})
          console.log('后端返回的导航菜单内容:----',res.data.data);
          console.log('前端定义的导航菜单内容-----',menu);
        }
    }
  };
