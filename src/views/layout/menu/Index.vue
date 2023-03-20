<template>
  <div>
    <!-- router属性表示开启路由跳转，将index变成path，default-active="/"表示默认某个页面开启 -->
    <!-- 动态绑定default-active使得无论点击哪个导航都会有高亮展示 -->
    <!-- :default-active="$route.path"中$route.path会获得url上的地址 -->
    <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="#112f50"
      text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <el-menu-item>
        <span slot="title">万民百货采购管理系统</span>
      </el-menu-item>

      <el-menu-item index="home" @click="toPage('home')" >
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{ $t('menu.home') }}</span>
      </el-menu-item>
      <!-- 动态菜单导航渲染组件 -->
      <MenuList :dyMenuList="dyMenuList"></MenuList>
      <!-- <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>{{ $t('menu.product') }}</span>
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
          <span>{{ $t('menu.order') }}</span>
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
          <span>{{ $t('menu.advert') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/advert-list">
            <i class="el-icon-grape"></i>
            <span>广告列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/system">
        <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t('menu.system')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/role">
            <i class="el-icon-setting"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system/department">
            <i class="el-icon-setting"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>
<script>
import MenuList from './MenuList.vue'
import { mapState } from 'vuex'
export default {
  props: ["isCollapse"],
  components: {
    MenuList
  },
  computed: {
    ...mapState('menu', ['dyMenuList']),
  },
  data() {
    return {
      // isCollapse:false
      active: ''
    };
  },
  methods: {
    toPage(name){
      this.$router.push({
        name
      })
    }
  },
  created() {
    // console.log('menu', this.$route);
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu;
    } else {
      // this.active = this.$route.path;
      this.active = this.$route.name;
    }
    // console.log('动态菜单导航目录', this.dyMenuList);
  },
  watch: {
    $route(to, from) {
      // console.log('watch', to);
      // let { meta, path } = to;
      let { meta, name } = to;
      // console.log(meta);
      // console.log(name);
      if(meta.activeMenu) {
        this.active = meta.activeMenu;
      }else {
        // this.active = path;
        this.active = name;
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