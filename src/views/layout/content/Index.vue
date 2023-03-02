<template>
  <div>
    <!-- 顶部 -->
    <div class="header">
      <!-- 左侧折叠 -->
      <div class="open">
        <span v-if="!isCollapse" class="iconfont icon-right-indent" @click="changMenu"></span>
        <span v-else class="iconfont icon-left-indent" @click="changMenu"></span>
      </div>
    </div>
    <!-- 内容 -->
    <router-view></router-view>
  </div>
</template>
<script>
// import { mapMutations } from 'vuex'

export default {
  props: ['isCollapse'],  //父传子props  layout/Index.vue->menu/Index.vue和content/Index.vue
  components: {
    
  },
  data() {
    return {

    };
  },
  methods: {
    // ...mapMutations('menu',['removeMenuList']),
    changMenu() {
      this.$emit('changeShow')  //子传父自定义事件  content/Index.vue->layout/Index.vue
    },
  },
};
</script>
<style lang='less' scoped>
.header {
  background: #1e78bf;
  height: 50px;
  color: #fff;
  line-height: 50px;
  display: flex;
  .open {
    // flex: 1;

    .iconfont {
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>