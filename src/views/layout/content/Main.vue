<template>
  <!-- 1. 顶部区域 -->
  <div class="header">
    <el-row>
    <el-col :span="4">
      <span v-if="!props.isCollapse" class="iconfont icon-right-indent" @click="changeOpen"></span>
      <span v-else class="iconfont icon-left-indent" @click="changeOpen"></span>
    </el-col>
    <el-col :span="20">
    <div class="right">
    22
    </div></el-col>
  </el-row>
  </div>

  <!-- 2. 路由出口 -->
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script setup>
const props = defineProps(['isCollapse'])
const emit = defineEmits(['changeCollapse'])

//点击折叠效果 -- 修改父组件变量  isCollapse 
const changeOpen=()=>{
  emit('changeCollapse')
}
</script>

<style lang="scss" scoped>
.header{
  background: #1e78bf;
  height: 50px;
  line-height: 50px;

  color: #fff;
  .iconfont{
    font-size: 22px;
    cursor: pointer;
  }
  .right{
    text-align: right;
    padding-right:20px;
  }
}

.wrapper{
  padding:10px;
}
</style>