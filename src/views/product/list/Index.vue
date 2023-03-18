<template>
  <div class="">
    <!-- 1、面包屑 -->
    <BreadCrumb></BreadCrumb>
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
      <!-- select可以使用selection-change替换，都是官方自带的事件。区别在于select多一个参数row，可以多获取点击的每行的数据 -->
      <el-table :data="tableData" stripe border style="width: 100%" header-cell-class-name="active-header" 
      cell-class-name="table-center" @select="selectHandle" @select-all="selectHandle"> 
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
        <el-table-column prop="title" label="商品名称">
          <template slot-scope="scope">
            <span style="color:blue;cursor: pointer;"  @click="handleLook(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
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
        <!-- 自带属性：show-overflow-tooltip: 当内容过长被隐藏时显示 tooltip -->
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
        <Pagination :total="total" :pageSize="pageSize" @changePage="changePage"></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/pagination/pagination.vue'
import moment from 'moment'
import { removeHTMLTag } from '@/utils/common.js'
import { mapMutations } from 'vuex'

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
      pageSize: 1,
      current: 1,
      ids: [],  //存储选中行的id
    };
  },
  methods: {
    moment,  //注册方法
    removeHTMLTag,
    ...mapMutations('product',['changeRowData','changeTitle','changeOperate']),
    // 进入添加商品页面
    toProductPage() {
      this.changeTitle('添加');
      this.changeOperate('添加');
      this.$router.push('/product/add-product');
    },
    //查看商品详情
    handleLook(index, row){
      this.changeRowData(row);
      this.changeTitle('详情');
      this.$router.push('/product/add-product');
    },
    //批量删除
    deleteAll() {
      // console.log('批量删除---ids---', this.ids);//[id1,id2,...,__ob__:Observer
      //传递的ids必须是字符串 
      let idStr = this.ids.join(',');
      // console.log(idStr);//id1,id2,...
      // element-ui自带的MessageBox 弹框
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //请求批量删除接口
        this.$api.batchDelete({ ids: idStr }).then(res => {
          console.log('批量删除-------', res.data);
          if (res.data.status === 200) {
            //删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //------批量删除-------
            //获取当前是否是最后一页的数据操作
            let maxPage = Math.ceil(this.total/this.pageSize);//获取当前的数据可以展示多少页码
            let len = this.ids.length;//获取选中的个数
            //分析：若批量删除的时候，删的位置在最后一页，则需要根据删除的个数与最后一页的条数的比较来判断
            //若删除个数==最后一页的条数，则选中高亮的页码-1，请求页码数据也就是高亮页码
            if(maxPage == this.current){//最后一页的批量删除操作
              let num = this.total%this.pageSize ==0?this.pageSize:this.total%this.pageSize;//获取最后一页的数据条数
              if(num===len){
                this.current = this.current-1 >0?this.current-1:1;
              }
            }
            this.projectList(this.current);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //查询
    onSubmit() {
      console.log("submit!", this.formInline.name);
      this.search(this.formInline.name);
    },
    //点击勾选选择框---返还选中id放进ids数组
    selectHandle(selection) {
      // console.log('select--------', selection);
      let arr = [];
      selection.forEach(ele => {
        arr.push(ele.id);
      });
      this.ids = arr;
    },
    //编辑操作
    handleEdit(index, row) {
      // console.log(index, row);
      //把当前行的数据row存储到vuex中之后，并跳转到添加商品界面并获取vuex行数据row
      this.changeRowData(row);
      this.changeTitle('编辑');
      this.changeOperate('保存');
      this.$router.push('/product/add-product');
    },
    //删除操作
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
    //失去焦点时返回第一页
    blur() {
      if (!this.formInline.name) {
        this.projectList(1);
      }
    },
    //获取产品列表数据
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
    //搜索接口
    async search(search) {
      if (!search) { return; }//点击空的查询按钮
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
    //删除接口
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
    //分页传过来的页码
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