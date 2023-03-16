<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="nav">
        <div class="title">产品类型列表</div>
        <div class="tree">
          <TreeProduct @sendTreeData="sendTreeData"></TreeProduct>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="wrapper">
        <div class="my-title">商品{{title}}</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属分类" prop="category">
            <span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint" size="small"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <UploadImg @sendImg="sendImg" ref="uploadImg" :fileList="fileList"></UploadImg>
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <WangEditor @sendWangEditor="sendWangEditor" ref="wangEditor"></WangEditor>
          </el-form-item>
          <el-form-item label="首页轮播推进" prop="isShow">
            <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否推荐商品" prop="isShow">
            <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否上架商品" prop="isShow">
            <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button v-show="title != '详情'" type="primary" @click="submitForm('ruleForm')">{{ operate }}</el-button>
            <el-button v-show="title != '详情'" @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="closePage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import TreeProduct from "./TreeProduct.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";

export default {
  components: {
    TreeProduct,
    UploadImg,
    WangEditor,
  },
  computed: {
    ...mapState("product", ["rowData", "title", "operate"]),
  },
  data() {
    const validatePass = (rule, value, callback) => {
      let pass = /^\+?[1-9]\d*$/;
      if(value === '') {
          callback(new Error('数量不能为空!'))
      }else if(!pass.test(value)) {
          callback(new Error('数量必须为正整数!'))
      }else {
          callback()
      }
    };
    return {
      fileList: [], //图片容器集合
      ruleForm: {
        //表单数据
        id: "",
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        image: [],
        descs: "",
        category: "",
        cid: "",
        isShow: true,
      },
      rules: {
        //表单验证规则
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        num: [{ required: true, trigger: "blur", validator: validatePass }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        category: [
          {
            required: true,
            message: "请选择商品类目",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点击取消按钮->返回商品列表页面
    closePage() {
      this.$router.push("/product/list");
    },
    //获取tree点击的数据
    sendTreeData(val) {
      //存储接受的tree的数据 val={id:,cid:,name:''}
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },
    //接受上传的图片路径
    sendImg(val) {
      // console.log('val-----',val);
      this.ruleForm.image.push(val);
    },
    //获取富文本编译器的数据
    sendWangEditor(val) {
      // console.log("---商品描述--", val);
      this.ruleForm.descs = val;
    },
    //添加/修改商品提交事件
    submitForm(formName) {
      //this.$refs.ruleForm
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("添加商品", this.ruleForm);
          //接口：title, image, sellPoint, price, cid, category, num, descs  解构赋值 
          let {id,title,image,sellPoint,price,cid,category,num,descs} = this.ruleForm;
          //image是数组类型--->使用JSON.stringify()方法转字符串(接口要求)
          // this.insertTbItem({title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs});
          if (this.title == "添加") {
            this.insertTbItem({title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs});
          } else {
            this.updateTbItem({id,title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加商品
    async insertTbItem(params) {
      let res = await this.$api.insertTbItem(params);
      console.log("添加商品--------", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，添加商品成功",
          type: "success",
        });
        //添加商品成功后跳转路由返回到商品列表页面
        this.$router.push("/product/list");
      }
    },
    //修改商品
    async updateTbItem(params) {
      let res = await this.$api.updateTbItem(params);
      console.log("修改", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，修改商品成功",
          type: "success",
        });
        this.$router.push("/product/list");
      }
    },
    //重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      // this.$refs.uploadImg.clear();  //清空图片列表
      // this.$refs.wangEditor.editor.clear();  //清空文本编辑内容方法一：（clear是wangEditor自带的方法）
      // this.$refs.wangEditor.html='';  //清空文本编辑内容方法二：设置文本内容为空
      if (this.title == "添加") {
        this.$refs[formName].resetFields();
        this.$refs.uploadImg.clear();
        this.$refs.wangEditor.editor.clear();
      } else {
        //编辑界面--点击重置--
        //思路：1. 恢复之前的默认的值  2. 默认值来自vuex  rowData-注意-界面修改的数据不能是rowData
        // console.log("编辑界面---this.ruleForm---", this.ruleForm);
        // console.log("编辑界面---this.rowData---", this.rowData);
        let rowData = JSON.parse(JSON.stringify(this.rowData));//深拷贝，不修改Vuex中的原数据
        this.ruleForm = rowData;
        this.ruleForm.isShow = true;
        let imgs = rowData.image; //字符串类型---需要转数组格式
        let arr = JSON.parse(imgs); //转数组
        // console.log("---arr---", arr);
        this.ruleForm.image = arr;
        // console.log('arr---', arr);
        this.fileList = [];
        arr.forEach((ele) => {
          this.fileList.push({ name: "", url: ele });
        });
        this.$nextTick(() => {
          this.$refs.wangEditor.html = rowData.descs;
        });
      }
    },
  },
  mounted() {
    // console.log('title',this.title);
    if(this.title === "编辑"  || this.title === "详情") {
      this.ruleForm = JSON.parse(JSON.stringify(this.rowData));
      //下方三个控制按钮展示
      this.ruleForm.isShow = true;
      //编辑界面图片显示
      // console.log(this.$refs.uploadImg);
      let imgs = this.ruleForm.image;//字符串类型---需要转数组格式
      let arr = JSON.parse(imgs);//转数组
      this.ruleForm.image = arr;
      // console.log(arr);
      arr.forEach(ele => {
        this.fileList.push({ name: '', url: ele });//fileList 回显图片--传递给UploadImg组件
      });
      //富文本内容显示
      // console.log(this.$refs.wangEditor);
      //this.$nextTick() 等待DOM加载完毕执行 延迟加载
      this.$nextTick(() => {
        this.$refs.wangEditor.html = this.rowData.descs;
      })
    }
  }
};
</script>

<style lang="less" scoped>
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
    background: #ddd;
    padding: 14px;
    color: #333;
    font-weight: bold;
  }

  .demo-ruleForm {
    padding: 20px;
  }
}
</style>