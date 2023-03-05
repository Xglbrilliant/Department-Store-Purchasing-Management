<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="nav">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <TreeProduct></TreeProduct>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="wrapper">
          <div class="my-title">添加商品</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TreeProduct from '@/views/product/list/TreeProduct.vue'

export default {
  components: {
    TreeProduct
  }
};
</script>
<style lang='less' scoped>
.nav {
  height: 600px;
  background: #fff;
  .title {
    background: skyblue;
    padding: 16px;
    color: #fff;
  }
  .tree {
    padding: 20px;
  }
}
.wrapper {
  height: 800px;
  background: #fff;
  .my-title {
    background: #ddd;
    font-weight: bold;
    padding: 12px;
    color: #333;
  }
  .demo-ruleForm {
    padding: 20px;
  }
}
</style>