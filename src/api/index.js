//公共的请求方法
import base from "./base";
import axios from "@/utils/request";
import {login,permission} from './login/login'
import product from './product'
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
  // 产品信息接口---
  ...product,
  
  // // 产品列表 Page
  // projectList(params) {
  //   return axios.get(base.projectList, { params });
  // },

  // // 搜索接口 params={search=xxx}
  // search(params) {
  //   return axios.get(base.search, { params });
  // },

  // // 删除接口 params={search=xxx}
  // deleteItemById(params) {
  //   return axios.get(base.deleteItemById, { params });
  // },

  // //商品类目  params={type: cid}
  // selectItemCategoryByParentId(params) {
  //   return axios.get(base.selectItemCategoryByParentId, { params });
  // },

  // //添加商品  parms={title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
  // insertTbItem(params) {
  //   return axios.get(base.insertTbItem, { params });
  // },

  // //批量删除  {ids:字符串--id}
  // batchDelete(params) {
  //   return axios.get(base.batchDelete, { params });
  // },

  // //修改商品  parms={id, title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
  // updateTbItem(params) {
  //   return axios.get(base.updateTbItem, { params });
  // },

  // //产品列表分类
  // itemCategory() {
  //   return axios.get(base.itemCategory);
  // },

  // //新增子级类目名称  parms={cid, name}
  // insertItemCategory(params) {
  //   return axios.get(base.insertItemCategory, { params });
  // },

  // //删除类目  parms={id}
  // deleteContentCategoryById(params) {
  //   return axios.get(base.deleteContentCategoryById, { params });
  // },

  // //修改类目名称  parms={id, name}
  // updateCategory(params) {
  //   return axios.get(base.updateCategory, { params });
  // },

  // //新增一级分类名称  parms={name}
  // insertCategory(params) {
  //   return axios.get(base.insertCategory, { params });
  // },


  /*  订单列表 */
  orderList(params) {
    return axios.get(base.orderList, { params });
  },
  /* 
    订单汇总---ids=''
    */
  changeStatus(params) {
    return axios.get(base.changeStatus, { params });
  },
  /* 
    汇总清单
    {page}
     */
  collect(params) {
    return axios.get(base.collect, { params });
  },
  /* 
      撤销汇总
      {id}
    */
  cancel(params) {
    return axios.get(base.cancel, { params });
  },
  /* 
      订单详情
      {id}
    */
  getDetail(params) {
    return axios.get(base.detail, { params });
  },
  //登录
  // login,params={user: '',pwd: ''}
  // login(params) {
  //   return axios.post(base.login, params);//get传参要加大括号，post则不需要
  // },
  // /* 
  //     用户权限--返回导航内容
  //     params={token:''}
  //   */
  // permission(params) {
  //   return axios.get(base.permission, { params });
  // },
  //登录
  login,


};
//单个导出
// export function permission(params){
//   return axios.get(base.permission,{
//     params
//   })
// }
export { permission }

//导出对象 api身上挂载了很多方法
export default api;
