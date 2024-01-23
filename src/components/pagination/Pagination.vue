<template>
   
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
   
</template>

<script setup>
import { ref,toRefs,reactive } from 'vue'
 
//接受父组件传递的动态数据
const props = defineProps({
    pageSize:{
        type:Number,
        default:1
    },
    total:{
        type:Number,
        default:10
    }
})
const emit = defineEmits(['getCurrentPage'])
const { total,pageSize} = toRefs(props);
// console.log(total);

const currentPage = ref(1)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

//点击分页触发事件------------------------------------
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  emit('getCurrentPage',val)
}

</script>

<style>

</style>