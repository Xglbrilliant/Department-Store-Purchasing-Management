<template>
    <el-dialog :title="info.title"   v-model="dialogVisible" width="30%" :before-close="handleClose">
        <strong>请输入类目名称：</strong>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitHandle">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script setup>
import { inject, ref,toRefs } from "vue";
import { ElMessage } from 'element-plus'
const api = inject('$api')
const props = defineProps(['info', 'type'])
const emit = defineEmits(['updateViews'])
const { info, type } = toRefs(props);
const dialogVisible = ref(false)
const input = ref('')

const handleClose = (done) => {
    dialogVisible.value = false
}
//显示弹框
const isShow=()=>{
    dialogVisible.value = true
    console.log('dialogVisible.value----',dialogVisible.value);
}
//弹框---确定---
const submitHandle = () => {
    //新增分类---1. 点击获取输入的值 2. 隐藏弹框 3.更新视图
    console.log('type----',type.value,info.value);
    if (type.value == 1) {
        console.log('二级新增', input.value);
        insertItemCategory({ cid: info.value.cid, name: input.value })
    } else if (type.value == 2) {//修改
        console.log('---修改', input.value);
        updateCategory({ id: info.value.id, name: input.value })
    } else {//一级新增
        insertCategory({ name: input.value })
    }
}
//一级新增---------------------------------------
const insertCategory = async (params) => {
    let res = await api.insertCategory(params)
    console.log('一级新增----', res.data);
    if (res.data.status == 200) {
        ElMessage({
              showClose: true,
              message: '恭喜你，新增成功',
              type: 'success',
            })
        //隐藏弹框
        dialogVisible.value = false;
        emit('updateViews')
    }
}
//修改类目名称---id name-----------------------
const updateCategory = async (params) => {
    let res = await api.updateCategory(params)
    console.log('修改----', res.data);
    if (res.data.status == 200) {
        ElMessage({
              showClose: true,
              message: '恭喜你，修改成功',
              type: 'success',
            })
        //隐藏弹框
        dialogVisible.value = false;
        //更新视图---父组件视图 方法：1
        emit('updateViews')
    }
}
//新增类目---------------------------------------------
const insertItemCategory = async (params) => {
    let res = await api.insertItemCategory(params)
    console.log('新增----', res.data);
    if (res.data.status == 200) {
        ElMessage({
              showClose: true,
              message: '恭喜你，新增成功',
              type: 'success',
            })
        //隐藏弹框
        dialogVisible.value = false;
        //更新视图---父组件视图 方法：1
        emit('updateViews')
        //this.$parent.itemCategory()   //方法2：获取父组件实例--调用更新方法
    }
}

defineExpose({
    dialogVisible,
    isShow,
    input
})
</script>

<style></style>