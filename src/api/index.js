//公共的请求方法
import base from "./base";
import axios from "@/utils/request";
// import {login,permission} from './login/login'
// import product from './product'
const api = {
  /* 首页数据统计 */
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  /*  首页订单数据 */
  orderinfo() {
    return axios.get(base.orderinfo);
  },
  /*  图表数据 */
  format() {
    return axios.get(base.format);
  },
  //产品信息接口---
  // ...product,
  
  // 产品列表 Page
  projectList(params) {
    return axios.get(base.projectList, { params });
  },

  // 搜索接口 params={search=xxx}
  search(params) {
    return axios.get(base.search, { params });
  },

  // 删除接口 params={search=xxx}
  deleteItemById(params) {
    return axios.get(base.deleteItemById, { params });
  },

  //商品类目  params={type: cid}
  selectItemCategoryByParentId(params) {
    return axios.get(base.selectItemCategoryByParentId, { params });
  },

  //添加商品  parms={title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
  insertTbItem(params) {
    return axios.get(base.insertTbItem, { params });
  },

  //批量删除  {ids:字符串--id}
  batchDelete(params) {
    return axios.get(base.batchDelete, { params });
  },

  //修改商品  parms={id, title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
  updateTbItem(params) {
    return axios.get(base.updateTbItem, { params });
  },

  //产品列表分类
  itemCategory() {
    return axios.get(base.itemCategory);
  }


  // /* 
  //   订单列表
  // */
  //   orderList(params) {
  //     return axios.get(base.orderList, { params });
  //   },
  // /* 
  //   订单汇总---ids=''
  //   */
  // changeStatus(params) {
  //   return axios.get(base.changeStatus, { params });
  // },
  // /* 
  //   汇总清单
  //   {page}
  //    */
  // collect(params) {
  //   return axios.get(base.collect, { params });
  // },
  // /* 
  //     撤销汇总
  //     {id}
  //   */
  // cancel(params) {
  //   return axios.get(base.cancel, { params });
  // },
  // /* 
  //     订单详情
  //     {id}
  //   */
  // getDetail(params) {
  //   return axios.get(base.detail, { params });
  // },
  //登录
  // login,



};
//单个导出
// export function permission(params){
//   return axios.get(base.permission,{
//     params
//   })
// }
// export { permission }

//vue组件实例：this.$api.permission()
//导出对象 api身上挂载了很多方法
export default api;
