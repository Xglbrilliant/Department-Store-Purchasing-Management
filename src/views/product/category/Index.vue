<template>
  <div class="category">
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button  type="warning" style="margin-bottom:20px;">新增一级导航类目</el-button>
        <!-- tree内容结构 -->
        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
          :render-content="renderContent" :props="defaultProps"></el-tree>
      </div>
    </div>
    <!-- 弹框 -->
    <Dialog :info="info" ref="child"></Dialog>
    <!-- <Dialog :info="info" ref="child" :type="type" @updateViews="itemCategory"></Dialog> -->
  </div>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  components: {
    Dialog
  },
  data() {
    return {
      info: '标题',
      type: 1,//1 新增 2 修改 3 一级分类
      data: [{
        id: 1,
        name: '一级 1',
        children: [{
          id: 4,
          name: '二级 1-1'
        }]
      }, {
        id: 2,
        name: '一级 2'
      }],
      defaultProps: {
        label: 'name'
      }
    }
  },
  created() {
    this.itemCategory();
  },
  methods: {
    //新增 1. 显示弹框  2. 传递title动态
    append(data) {
      // console.log(this.$refs.child.dialogVisible);
      this.$refs.child.dialogVisible = true;
      // console.log(data);
      this.info = {
        title: `新增${data.name}子级分类`,
      };
    },
    //删除
    remove() {

    },
    //修改
    update(node, data) {
      this.$refs.child.dialogVisible = true;
      // console.log(data);
      this.info = {
        title: `修改${data.name}分类名称`,
      };
    },
    // 树节点的内容区的渲染 Function	Function(h, { node, data, store }
    renderContent(h, { node, data, store }) {
      // console.log('render--',node,data);
      //render语法
      return (
        <span class="custom-tree-node">
          <span class='name'>{node.label}</span>
          {
            node.level == 1 ? <span>
              <el-button class='mini' on-click={() => this.append(data)} icon="el-icon-plus">新增</el-button>
              <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
              <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
            </span> : <span>
              <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
              <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
            </span>
          }
        </span>
      );
    },
    //请求tree数据
    async itemCategory() {
      let res = await this.$api.itemCategory();
      // console.log(res.data.result);
      let data = res.data.result;
      //获取一级目录oneArr
      let oneArr = [],otherArr = [];
      data.forEach(ele => {
        if(ele.type == 1) {
          ele.children = [];//给每个一级数据添加children属性（为空数组用来存储children）
          oneArr.push(ele);
        }else {
          otherArr.push(ele);
        }
      });
      //把二级信息加到对应一级信息的children数组中
      oneArr.forEach(item => {
        //item.cid是一级信息标识
        otherArr.forEach(ele => {
          if(ele.type == item.cid) {
            item.children.push(ele);//添加子目录信息到对应的一级信息的children数组内
          }
        })
      })
      this.data = oneArr;
    }
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;


    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }


}
</style>