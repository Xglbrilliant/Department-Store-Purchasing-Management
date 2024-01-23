<template>
    <Breadcrumb></Breadcrumb>
    <el-row :gutter="20">
        <el-col :span="4">
            <div class="nav">
                <div class="title">产品类型列表</div>

                <div class="tree">
                    <TreeProduct @getTreeData="getTreeData"></TreeProduct>
                </div>
            </div>
        </el-col>
        <el-col :span="20">
            <div class="wrapper">
                <div class="my-title">商品{{ store.title }}</div>
                <el-form :model="myForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属分类" prop="category">
                        <span>{{ myForm.category }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="myForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="myForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="num">
                        <el-input v-model="myForm.num"></el-input>
                    </el-form-item>
                    <el-form-item label="商品卖点" prop="sellPoint">
                        <el-input v-model="myForm.sellPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="image">
                        <UploadImg @sendImgUrl="sendImgUrl" :fileList="fileList" ref="upload"></UploadImg>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="descs">
                        <WangEditor @sendWangEditor="sendWangEditor" ref="wangEditor"></WangEditor>
                    </el-form-item>
                    <el-form-item label="首页轮播推进" prop="isShow">
                        <el-switch v-model="myForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否推荐商品" prop="isShow">
                        <el-switch v-model="myForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否上架商品" prop="isShow">
                        <el-switch v-model="myForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>

                    <el-form-item>
                        <el-button v-if="store.title!='详情'" type="primary" @click="submitForm(ruleForm)">保存</el-button>
                        <el-button v-if="store.title!='详情'" @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="closePage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { inject, onMounted, reactive, ref, toRefs, nextTick } from "vue";
import TreeProduct from './TreeProduct.vue'
import UploadImg from './UploadImg.vue'
import WangEditor from './WangEditor.vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import useGoodsStore from '@/store/GoodsInfo'
import { cloneDeep } from 'lodash'
//获取仓库的方法 --- 
const store = useGoodsStore();
const { rowData } = store;
console.log('store', store);
const api = inject('$api')
const fileList = ref([])
const wangEditor = ref(null);
const upload = ref(null);
const ruleForm = ref(null)
// const ruleFormRef=ref(null)
//表单数据
let myForm = reactive({
    id: '',
    title: '',
    num: '',
    price: '',
    sellPoint: '',
    image: [],
    descs: '',
    category: '',
    cid: '',
    isShow: true,
})
//表单验证规则
const rules = reactive({
    title: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    num: [
        { required: true, message: '请输入商品数量', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' },
    ],
    category: [{
        required: true, message: '请选择商品类目'
    }]
})

//接受tree数据---------------
const getTreeData = (val) => {
    console.log('val', val);
    myForm.cid = val.cid;
    myForm.category = val.name;
}

//接受upload图片上传数据
const sendImgUrl = (val) => {
    myForm.image.push(val)
}

//接受wangEditor数据
const sendWangEditor = (val) => {
    // console.log('val----',val);
    myForm.descs = val;
}

//点击保存按钮--触发的事件--------------
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log('titletitletitle---');
            //添加商品 title, image, sellPoint, price, cid, category, num, descs, paramsInfo 
            let { id, title, image, sellPoint, price, cid, category, num, descs } = myForm;
            if (store.title == '添加') {
                let res = await api.addGoods({
                    title, image: JSON.stringify(image), sellPoint, price, cid, category, num, descs
                })
                console.log('添加商品', res.data);
                if (res.data.status == 200) {
                    ElMessage({
                        message: '添加商品成功',
                        type: 'success',
                    })
                    //跳转路由
                    router.push('/product/list')
                }
            } else {
                //编辑
                let res = await api.updateTbItem({
                    id, title, image: JSON.stringify(image), sellPoint, price, cid, category, num, descs
                })
                if (res.data.status == 200) {
                    ElMessage({
                        message: '编辑商品成功',
                        type: 'success',
                    })
                    //跳转路由
                    router.push('/product/list')
                }
            }


        } else {
            console.log('error submit!', fields)
        }
    })
}



//监听 title变量修改------ 
//获取当前的rowData数据 必须是编辑界面
if (store.title == '编辑' || store.title=='详情' ) {
    console.log('========', myForm, rowData);
    Object.assign(myForm, rowData)
    console.log('myform--------', myForm);
    let arr = JSON.parse(rowData.image)
    myForm.image = arr;
    //回片回显---需要一个数组容器装图片 --发送给子组件uploadImg
    let img = [];//fileList=[{name:'',url:''}]
    arr.forEach(ele => {
        let obj = {}
        obj.url = ele;
        img.push(obj)
    });
    fileList.value = img;
    //wangEditor 
    //打印输出：wangEditor--- RefImpl {_ e: Proxy[[Prototype]]: Object null
    // console.log('wangEditor---',wangEditor,wangEditor.value);
    //延迟加载
    nextTick(() => {
        console.log('wangEditor---', wangEditor, wangEditor.value);
        wangEditor.value.setWangHtml(myForm.descs);

    })
}


//重置按钮---
const resetForm = () => {
    if (store.title == '添加') {
        ruleForm.value.resetFields();
        //图片列表
        fileList.value=[];
        //wangEditor 
        wangEditor.value.clearHtml();
        // this.$refs.wangEditor.editor.clear();//方法2 调用自身的清空方法
    } else {
        //编辑 
        //编辑界面--点击重置--------------
        //思路：1. 恢复之前的默认的值  2. 默认值来自pinia  rowData-注意-界面修改的数据不能是rowData
        console.log('编辑界面-----', myForm);
        console.log('编辑界面--rowData---', rowData);
        let rowData2 = JSON.parse(JSON.stringify(rowData))
        Object.assign(myForm,rowData2)
        ruleForm.isShow = true;
        let imgs = rowData2.image;//字符串类型---需要转数组格式 
        let arr = JSON.parse(imgs);//转数组
        console.log('---arr---', arr);
        ruleForm.image = arr;
        // console.log('arr---', arr);
        fileList.value = [];
        arr.forEach(ele => {
            fileList.value.push({ name: '', url: ele });//fileList 回显图片--传递给UploadImg组件
        });
        nextTick(() => {
            wangEditor.value.setWangHtml(myForm.descs);
        })
    }
}

//取消
const closePage = () => {
    router.push('/product/list')
}

</script>

<style lang="scss" scoped>
.nav {
    height: 600px;
    background: #fff;

    .title {
        background: skyblue;
        padding: 20px;
        color: #fff;
    }

    .tree {
        padding: 20px;
    }
}

.wrapper {
    // height: 800px;
    background: #fff;

    .my-title {
        background: #eee;
        padding: 14px;
        color: #333;
        font-weight: bold;
    }

    .demo-ruleForm {
        padding: 20px;
    }
}
</style>