<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated"  @onChange="handleChange" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const emit = defineEmits(['sendWangEditor'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref('default') // 或 'simple'

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
const toolbarConfig = {//菜单栏配置
    //toolbarKeys-重新配置工具栏，显示哪些菜单，以及菜单的排序、分组
    toolbarKeys: [
        'headerSelect', 'bold', 'underline', 'italic', 'color', 'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'uploadImage', 'insertLink', 'insertTable', 'codeBlock', 'divider',
    ],
    //隐藏的菜单栏
    // excludeKeys:['headerSelect', 'blockquote', '|', 'bold', 'underline','group-justify']
}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
//编辑器修改--获取输入的值--------------
const handleChange=()=>{
    // console.log(valueHtml.value);
    // emit('sendWangEditor',valueHtml.value)
    emit('sendWangEditor',valueHtml.value)
}

//清空定义方法
const clearHtml=(val)=>{
    console.log('----------------------------');
    valueHtml.value=''
}

//设置内容
const setWangHtml=(val)=>{
    valueHtml.value = val
}

//暴露出去
defineExpose({
    clearHtml,
    setWangHtml
})


</script>

<style></style>