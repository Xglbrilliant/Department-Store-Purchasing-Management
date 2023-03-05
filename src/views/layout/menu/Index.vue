<template>
  <div>
    <!-- router属性表示开启路由跳转，将index变成path，default-active="/"表示默认某个页面开启 -->
    <!-- 动态绑定default-active使得无论点击哪个导航都会有高亮展示 -->
    <!-- :default-active="$route.path"中$route.path会获得url上的地址 -->
    <el-menu :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">万民百货采购管理系统</span>
      </el-menu-item>

      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">
            <i class="el-icon-grape"></i>
            <span>产品列表</span>
          </el-menu-item>
          <el-menu-item index="/product/category">
            <i class="el-icon-tickets"></i>
            <span>产品分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-position"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/collect">
            <i class="el-icon-s-grid"></i>
            <span>订单汇总</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/order/contract">
            <i class="el-icon-s-grid"></i>
            <span>订单审核</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-s-grid"></i>
            <span>订单列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/advert-list">
            <i class="el-icon-grape"></i>
            <span>广告列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: ["isCollapse"],
  components: {},
  data() {
    return {
      // isCollapse:false
      active: ''
    };
  },
  created() {
    // console.log('menu', this.$route);
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu
    } else {
      this.active = this.$route.path
    }
  },
  watch: {
    $route(to, from) {
      // console.log('watch', to);
      let { meta, path } = to;
      // console.log(meta);
      // console.log(name);
      if(meta.activeMenu) {
        this.active = meta.activeMenu;
      }else {
        this.active = path;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.el-menu {
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}
// 不折叠时宽度为200
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>