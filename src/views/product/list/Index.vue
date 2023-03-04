<template>
  <div class="">
    <!-- 1、面包屑 -->

    <!-- 2、产品搜索 -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.user" size="small" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 3、产品的添加与删除 -->
      <div class="group">
        <el-button size="small" type="warning" icon="el-icon-plus">添加商品</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
      </div>
    </div>
    <!-- 4、产品列表 -->
    <div class="content">
      123
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        date: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.formInline);
    },
  },
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
}
</style>