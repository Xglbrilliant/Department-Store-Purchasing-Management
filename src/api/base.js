//接口地址
//环境变量
// let api = process.env.VUE_APP_BASE_URL;// /api
const base ={
    //首页
    totalInfo:'/api/home/dataCount',//首页统计数据
    orderinfo:"/api/home/orderinfo",//订单数据
    format:"/api/home/format",//折线数据
    //产品管理
    projectList: "/api/goods/projectList",//产品列表
    search: "/api/goods/search",//搜索接口
    deleteItemById: "/api/goods/deleteItemById",//删除商品操作
    selectItemCategoryByParentId: "/api/goods/itemCategory/selectItemCategoryByParentId",//商品类目
    uploadUrl: "/api/upload",//图片上传接口
    insertTbItem: "/api/goods/item/insertTbItem",//添加商品
    batchDelete: "/api/goods/batchDelete",//批量删除
    updateTbItem: "/api/goods/item/updateTbItem",//修改商品
    //产品分类
    itemCategory: "/api/itemCategory",//产品类别
    insertItemCategory: "/api/itemCategory/insertItemCategory", //新增子类目录名称 cid name
    deleteContentCategoryById: "/api/content/deleteContentCategoryById", //删除类名 id
    updateCategory: "/api/itemCategory/updateCategory", //修改类目 id name
    insertCategory: "/api/itemCategory/insertCategory", //新增一级分类名称 name
    //订单管理
    orderList:"/api/order/list",//订单列表 page
    changeStatus:"/api/order/changeStatus",//订单汇总 
    collect:"/api/order/collect",//汇总清单列表 page
    cancel:'/api/order/cancel',//撤销汇总 id
    detail:"/api/order/list/detail",//订单详情  id
    //登录
    login: "/api/login", //登录接口 user pwd---post
    permission: "/api/permission", //用户权限 token


    //打包
    // totalInfo:api+'/home/dataCount',//首页统计数据
    // orderinfo:api+"/home/orderinfo",//订单数据
    // format:api+"/home/format",//折线数据

    // //订单管理
    // orderList:"/api/order/list",//订单列表 page
    // changeStatus:"/api/order/changeStatus",//订单汇总 
    // collect:"/api/order/collect",//汇总清单列表 page
    // cancel:'/api/order/cancel',//撤销汇总 id
    // detail:"/api/order/list/detail",//订单详情  id
    
}

//单一导出
export const host='http://localhost:7788';

// 导出图片上传的url地址
export const uploadUrl='/api/upload';

export default base
