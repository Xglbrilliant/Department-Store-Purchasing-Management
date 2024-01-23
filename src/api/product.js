/* 
产品管理界面 接口
*/
import request from "@/utils/request";

//定义接口
export const host = "http://localhost:6688"; //代理请求

const projectList = "/api/goods/projectList"; //商品列表 page 页码
const search = "/api/goods/search"; //参数：search
const deleteItemById = "/api/goods/deleteItemById"; //删除id
const selectItemCategoryByParentId =
  "/api/goods/itemCategory/selectItemCategoryByParentId"; //产品类目 type

//上传图片
export const uploadUrl = "/api//upload";
const addgoods = "/api/goods/item/insertTbItem"; //添加商品
const updateTbItem = "/api/goods/item/updateTbItem"; //商品编辑

//产品分类
const itemCategory = "/api/itemCategory"; //商品分类
const insertItemCategory = "/api/itemCategory/insertItemCategory"; //新增子类目录名称 cid name
const deleteContentCategoryById = "/api/content/deleteContentCategoryById"; //删除类名 id
const updateCategory = "/api/itemCategory/updateCategory"; //修改类目 id name
const insertCategory = "/api/itemCategory/insertCategory"; //新增一级分类名称 name

//定义方法
export default {
  projectList(params) {
    return request.get(projectList, { params });
  },
  search(params) {
    return request.get(search, { params });
  },
  deleteItemById(params) {
    return request.get(deleteItemById, { params });
  },

  selectItemCategoryByParentId(params) {
    return request.get(selectItemCategoryByParentId, { params });
  },
  addGoods(params) {
    return request.get(addgoods, { params });
  },
  updateTbItem(params) {
    return request.get(updateTbItem, { params });
  },
  /* 
     产品列表分类
    */
  itemCategory() {
    return request.get(itemCategory);
  },
  /* 
    新增子级类目
    params={cid name}
  */
  insertItemCategory(params) {
    return request.get(insertItemCategory, { params });
  },
  /* 
      修改类目
      {id,name}
    */
  updateCategory(params) {
    return request.get(updateCategory, { params });
  },

  /* 
      删除类目
      {id}
      */
  deleteContentCategoryById(params) {
    return request.get(deleteContentCategoryById, { params });
  },
  /* 
      一级类目新增
      {name}
       */
  insertCategory(params) {
    return request.get(insertCategory, { params });
  },
};
