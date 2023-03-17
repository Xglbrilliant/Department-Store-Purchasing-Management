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
            //新增分类---1. 点击获取输入的值 2. 隐藏弹框 3.更新视图
            if(this.type == 1) {
                // console.log('新增');
                this.insertItemCategory({cid: this.info.cid, name: this.input});
            }else if(this.type == 2){
                // console.log('修改');
                this.updateCategory({id: this.info.id, name: this.input});
            }else {
                this.insertCategory({name: this.input});
            }
        },
        handleClose() {
            this.dialogVisible = false;
        },
        //子级类目新增
        async insertItemCategory(parms) {
            let res = await this.$api.insertItemCategory(parms);
            // console.log(res.data);
            if(res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
                this.dialogVisible = false;  //隐藏弹框
                this.$emit('updateViews');  //刷新的方法一：自定义事件让父组件更新视图
                // this.$parent.itemCategory();  //刷新的方法二：直接获取父组件实例（this.$parent）并调用其中的请求数据方法itemCategory
            }
        },
        //修改类目名称
        async updateCategory(parms) {
            let res = await this.$api.updateCategory(parms);
            console.log(res.data);
            if(res.data.status == 200) {
                this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                });
                this.dialogVisible = false;
                this.$emit('updateViews');
            }
        },
        //一级类目新增
        async insertCategory(parms) {
            let res = await this.$api.insertCategory(parms);
            if(res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
                this.dialogVisible = false;
                this.$emit('updateViews');
            }
        }
    }
}
</script>