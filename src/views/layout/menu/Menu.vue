<template>
    <el-menu active-text-color="#ffd04b" background-color="#112f50" class="el-menu-vertical-demo"
        :default-active="$route.meta.activeMenu || $route.path" router  :collapse="props.isCollapse"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <el-menu-item>
            <template #title>
            <span>采购后台管理系统</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/">
            <el-icon><icon-menu /></el-icon>
            <template #title>
                <span>首页</span>
            </template>
        </el-menu-item>
        <el-sub-menu index="/product">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>产品管理</span>
            </template>
                <el-menu-item index="/product/list">产品列表</el-menu-item>
                <el-menu-item index="/product/category">产品分类</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/order">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>订单管理</span>
            </template>
                <el-menu-item index="/order/order-list">订单列表</el-menu-item>
                <el-menu-item index="/order/collect">汇总清单</el-menu-item>
                <el-menu-item index="1-2">订单审核</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>广告管理</span>
            </template>
                <el-menu-item index="1-1">广告列表</el-menu-item>
                <el-menu-item index="1-2">广告分类</el-menu-item>
        </el-sub-menu>

      
    </el-menu>
</template>

<script setup>
import {Document, Menu as IconMenu, Location, Setting} from '@element-plus/icons-vue'

const props = defineProps(['isCollapse'])

const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}


</script>

<style scoped>
.el-menu{
    border-right: none;
}
.el-menu .is-active {
    background: #1e78bf !important;
    color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>