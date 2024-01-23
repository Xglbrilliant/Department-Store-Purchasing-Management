<template>
  <div class="menu"><Menu :isCollapse="isCollapse"></Menu></div>
  <div class="content" :class="{isClose:isCollapse}"><Main :isCollapse="isCollapse" @changeCollapse="changeCollapse"></Main></div>
</template>

<script setup>
import Menu from './menu/Menu.vue'
import Main from './content/Main.vue'
import {ref} from 'vue'

const isCollapse = ref(false)

const changeCollapse=()=>{
  isCollapse.value = !isCollapse.value;
}
</script>

<style lang="scss" scoped>
.menu{
    // width: 200px;
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    background: #112f50;
}
.content{
    padding-left:200px;
}
.isClose{
  padding-left:64px;
}
</style>