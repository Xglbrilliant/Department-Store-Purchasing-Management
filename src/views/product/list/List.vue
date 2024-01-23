<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <div class="header">
      <div class="form">
        <p>{{ formInline.name }}</p>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="myForm">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="formInline.name" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间" prop="date">
            <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
            <el-button type="primary" @click="toBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <!-- <el-button  type="warning"><el-icon><Plus /></el-icon> 添加商品</el-button> -->
         <el-button type="warning" :icon="Plus" @click="toAddProduct"> 
          添加商品
        </el-button>
        <el-button type="danger" :icon="Delete">批量删除</el-button>
      </div>
    </div>

    <!-- 2. 产品列表 -->
    <div class="content">
      <el-table size="large" :data="tableData" style="width: 100%;" border header-cell-class-name="active-header"
        cell-class-name="table-center">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" width="120">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="120" show-overflow-tooltip>
          <template #default="scope">
            <span style="color:blue;cursor: pointer;" @click="handleDetail(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="140">
        </el-table-column>
        <el-table-column label="添加时间" prop="create_time">
          <template #default="scope">
            <span>{{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商品描述" show-overflow-tooltip prop="descs">
          <template #default="scope">
            <span>{{ removeHTMLTag(scope.row.descs) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="page">

        <Pagination :pageSize="pageSize" :total="total" @getCurrentPage="getCurrentPage"></Pagination>

      </div>
    </div>

  </div>
</template>

<script setup>
import {
  Plus,
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref, getCurrentInstance, inject, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import { removeHTMLTag } from '@/utils/common'
import Pagination from '@/components/pagination/Pagination.vue'
import router from '@/router'
import useGoodsStore from '@/store/GoodsInfo'
//获取仓库的方法 --- 
const store = useGoodsStore();
console.log('store',store);

//搜索框数组对象
// const formInline = ref({ name: '', date: '' })
const formInline = reactive({
  name: '',
  date: ''
})
//表格容器
const tableData = ref([])
//定义分页数据---------
const pageSize = ref(1);
const total = ref(10)
const myForm = ref(null)
const currentPage = ref(1)
//方法1： 获取公共的全局的接口api 
// const app = getCurrentInstance()
// console.log('app',app);
// console.log(app.appContext.config.globalProperties);

//方法2： inject  注入一个由祖先组件或整个应用 (通过 app.provide()) 提供的值。
const api = inject('$api')
console.log('api---', api);
//点击添加商品--------------------------------
const toAddProduct=()=>{
  router.push('/product/addProduct')
  store.setRowData({
    title:'添加',
    rowData:{}
  })
}
//点击商品名称--查看详情-------------------------
const handleDetail=(index, row)=>{
  router.push('/product/addProduct')
  //pinia 存储数据 当前行的数据 --- 
  store.setRowData({
    title:'详情',
    rowData:row
  })
}
//编辑按钮--------------------------------------------
const handleEdit = (index, row) => {
  console.log(index, row)
  //跳转到添加界面---商品添加-编辑-查看详情同一个网页
  router.push('/product/addProduct')
  //pinia 存储数据 当前行的数据 --- 
  store.setRowData({
    title:'编辑',
    rowData:row
  })
  console.log('store----',store);
}
//删除按钮-----------------------------------------------
const handleDelete = (index, row) => {
  console.log(index, row)
  console.log('ElMessageBox', ElMessageBox);

  ElMessageBox.confirm(
    '你确定删除当前行的数据，确认删除是不可逆的操作?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      //删除操作---操作数据库的接口--------------------------
      let res = await api.deleteItemById({ id: row.id })
      console.log(res.data);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        //删除成功--更新当前的视图
        //判断当前的数据是否是当前的页面的最后一条数据--- 
        if(total.value% pageSize.value ==1){
          currentPage.value = currentPage.value -1 > 0?currentPage.value -1:1;
        }
        getList(currentPage.value);
      }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}
//获取页码数--点击----------------------------------------------
const getCurrentPage = (val) => {
  console.log(val);
  //存储当前的页码---目的：删除的时候 需要获取当前的页码数据----
  currentPage.value = val;
  getList(val)
}
//返回---获取第一页的数据-----------------------
const toBack = () => {
  //清空搜索表单 1. 手动清空表单对象数据 初始化  2. resetFields	重置该表单项，将其值重置为初始值，并移除校验结果
  //清空表单数据：如果定义的是reactive响应式的变量 需要打点出属性 单独清空 不能使用 resetFields();
  formInline.name = '';
  formInline.date = '';

  //清空表单数据：如果定义的是ref响应式的变量 使用 resetFields();
  // myForm.value.resetFields();

  getList();
}


//查询功能----------------------------------------------
const toSearch = async () => {
  //1.获取输入的值  2. 请求对应的后台接口
  let res = await api.search({ search: formInline.name })
  console.log('搜索的数据----', res.data);
  if (res.data.status === 200) {
    tableData.value = res.data.result;
    total.value = Math.ceil(res.data.result.length / pageSize.value);
  } else {
    tableData.value = [];
    total.value = 0;
    pageSize.value = 0;
  }


}






//定义请求列表数据--------------------------------、
const getList = async (page) => {
  let res = await api.projectList({ page })
  console.log('产品列表', res.data);
  if (res.data.status == 200) {
    tableData.value = res.data.data;
    total.value = res.data.total;
    pageSize.value = res.data.pageSize
  }
}

onMounted(() => {
  getList()

  let ss = document.querySelector('el-overlay-message-box')
  console.log(ss, 'ssss');

})

</script>

<style lang="scss" scoped>
.page {
  padding: 10px;
}

.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;

  .el-form-item {
    margin-bottom: 16px;
  }

  .group {
    border: 1px solid #eee;
    padding: 8px;
  }
}

.content {
  background: #fff;

  // position: relative;
  // z-index: 0;
  ::v-deep .active-header {
    color: #333;
    text-align: center;
  }

  ::v-deep .table-center {
    text-align: center;
  }

  .pagination {
    padding: 10px;
  }


}
</style>
