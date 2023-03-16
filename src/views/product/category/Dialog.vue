<template>
    <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose">
        <strong>请输入类目名称：</strong>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitHandle">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['info', 'type'],
    data() {
        return {
            dialogVisible: false,
            input: ''
        }
    },
    methods: {
        submitHandle() {

        },
        handleClose() {

        }
    }
}
</script>