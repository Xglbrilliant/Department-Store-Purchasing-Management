<template>
  <div class="">
    <!-- 1、面包屑 -->

    <!-- 2、产品搜索 -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name" @blur="blur" size="small" placeholder="产品名称" ></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="formInline.date" size="small"
              type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 3、产品的添加与删除 -->
      <div class="group">
        <el-button size="small" type="warning" icon="el-icon-plus" @click="toProductPage">添加商品</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteAll">批量删除</el-button>
      </div>
    </div>
    <!-- 4、产品列表 -->
    <div class="content">
      <el-table :data="tableData" stripe border style="width: 100%"
        header-cell-class-name="active-header" cell-class-name="table-center">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="category" label="商品类目"></el-table-column>
        <!-- 方法一：在视图上对添加时间处理 -->
        <el-table-column label="添加时间" width="200">
          <template slot-scope="scope">
            {{ moment(scope.row.create_time).format('YY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <!-- 方法二：在methods中对添加时间进行处理 -->
        <!-- <el-table-column prop="create_time" label="添加时间" width="200"></el-table-column> -->
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
        <!-- show-overflow-tooltip: 当内容过长被隐藏时显示 tooltip -->
        <el-table-column label="商品描述" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ removeHTMLTag(scope.row.descs) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <!-- 利用官方给定的用template包裹的slot-scope="scope"可以拿到该行的所有数据并进行更改 -->
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagination">
        <Pagination :total="total" :pageSize="pageSize" @changePage="changePage">
        </Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/pagination/pagination.vue'
import moment from 'moment'
import { removeHTMLTag } from '@/utils/common.js'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        name: "",
        date: "",
      },
      tableData: [],
      total: 10,
      pageSize: 1
    };
  },
  methods: {
    moment,
    removeHTMLTag,
    // 添加商品
    toProductPage() {
      this.$router.push('/product/add-product');
    },
    deleteAll() {

    },
    onSubmit() {
      console.log("submit!", this.formInline.name);
      this.search(this.formInline.name);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('您将删除这个商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除这个数据-请求后台接口----同步数据库
        this.deleteItemById(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    blur() {
      if (!this.formInline.name) {
        this.projectList(1);
      }
    },
    async projectList(page) {
      let res = await this.$api.projectList({ page });
      // console.log('产品列表数据', res.data);
      this.tableData = res.data.data;
      // console.log(this.tableData);
      // let arr = res.data.data;
      // arr.forEach(item => {
      //   item.create_time = moment(item.create_time).format('YY-MM-DD HH:mm:ss');
      // });
      // this.tableData = arr;
      // console.log(arr);
      // console.log(this.tableData);
      // console.log(arr === this.tableData);
      this.total = res.data.total
      this.pageSize = res.data.pageSize;
    },
    async search(search) {
      if (!search) { return; }
      let res = await this.$api.search({ search })
      // console.log('搜索数据', res.data);
      if (res.data.status === 200) {
        this.tableData = res.data.result;
        //分页处理
        this.total = res.data.result.length;
        this.pageSize = res.data.result.length;
      } else {
        this.tableData = []
        this.total = this.tableData.length;
        this.pageSize = 1;
      }
    },
    async deleteItemById(id) {
      let res = await this.$api.deleteItemById({ id })
      // console.log('删除', res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        //重新渲染视图
        //删除视图---如果当前是最后一页的最后一条数据-删除后--获取上一页的数据 
        //判断 this.total总数目   
        if (this.total % this.pageSize === 1) {
          this.current = this.current - 1 > 0 ? this.current - 1 : 1;//最好>1 
        }
        this.projectList(this.current);
      }
    },
    changePage(val) {
      // console.log('第'+ val + '页');
      this.current = val;  //删除中间页的数据时保存当前的页码使得剩余的数据不被第一页的数据所覆盖
      this.projectList(val);
    }
  },
  created() {
    this.projectList();
  }
};
</script>
<style lang='less' scoped>
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
  /deep/ .active-header {
    color: #333;
    text-align: center;
  }
  /deep/ .table-center {
    text-align: center;
  }
  .pagination {
    padding: 10px;
  }
}
</style>