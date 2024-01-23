<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn.mjs';
 import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {reactive} from 'vue'
const { locale } = reactive({
  locale: zhCn,
});

</script>

<style lang="scss">
.el-overlay.is-message-box .el-overlay-message-box{
  z-index: 99;
}
</style>
