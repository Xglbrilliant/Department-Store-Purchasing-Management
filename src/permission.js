/*  路由守卫
  routes = [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ]; */
//配置路由全局前置守卫导航
import router from "@/router";
import store from "@/store";
import { resetRouter } from "@/router";
router.beforeEach((to, from, next) => {
  // console.log("路由守卫", to); //{to.matched: []}
  //1、首先 判断进入的路由界面是否需要登录  不需要登录直接进入
  if (to.matched.length == 0 || to.matched.some((ele) => ele.meta.isLogin)) {
    if (store.state.login.userinfo.token) {//2、判断是否登录
      //3、判断当前存储的vuex里面是否已经有动态导航了.如果没有菜单导航则需要获取菜单导航
      if (store.state.menu.dyMenuList.length != 0) {//有导航
        next();
      }else {
        store.dispatch("menu/getMenuList").then((mybaseRoutes) => {
          // console.log("没有导航----获取导航", mybaseRoutes);
          resetRouter(); //添加路由之前 清空路由实例内容
          mybaseRoutes.forEach((ele) => {//把导航菜单追加到路由实例上
            router.addRoute(ele);
          });
        });
        next();
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

