<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button type="warning" style="margin-bottom:20px;" @click="addCategory">新增一级导航类目</el-button>
        <el-tree :data="data.result" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
         :props="defaultProps">
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <!-- <span class='name'>{node.label}</span>
              {
                node.level == 1 ? <span>
                  <el-button class='mini' size="small" onClick={() => append(data)} ><el-icon><Plus /></el-icon>新增</el-button>
                  <el-button class='mini' size="small" onClick={() => update(node, data)} ><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
                </span> : <span>
                  <el-button class='mini' size="small" onClick={() => update(node, data)}><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
                </span>
              } -->
              <span class='name'>{{node.label}}</span>
              <template v-if="node.level == 1">
                <span>
                  <el-button class='mini' size="small" @click="append(data)"><el-icon><Plus /></el-icon>新增</el-button>
                  <el-button class='mini' size="small" @click="update(node, data)" ><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" @click="remove(node, data)"><el-icon><Delete /></el-icon>删除</el-button>
                </span>
              </template>
              <template v-else>
                <span>
                  <el-button class='mini' size="small" @click="update(node, data)" ><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" @click="remove(node, data)"><el-icon><Delete /></el-icon>删除</el-button>
                </span>
              </template>
            </span>
          </template>
        </el-tree>
      </div>


    </div>

    <!-- 弹框 -->
    <Dialog :info="info" ref="child" :type="type" @updateViews="itemCategory"></Dialog>

  </div>
</template>

<script setup>
import { inject, onMounted, reactive, ref } from "vue";

import {
  Plus,
  Delete,
  EditPen,
} from '@element-plus/icons-vue'
import Dialog from './Dialog.vue'
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage, ElMessageBox } from 'element-plus'
const api = inject('$api')

const info = ref('标题')
const type = ref(1);//1 新增 2 修改 3 一级分类
const child = ref(null)
const data = reactive({
  result:[
    {
      id: 1,
      name: '一级 1',
      children: [{
        id: 4,
        name: '二级 1-1'
      }]
    }, {
      id: 2,
      name: '一级 2'
    }
  ]
})
const defaultProps = reactive({
  label: 'name'
})

// itemCategory()
//新增一级目录分类---------------------
const addCategory = () => {
  child.value.dialogVisible = true;
  info.value = {
    title: `新增一级分类`,
  };
  type.value = 3;
  child.value.input = '';
}
//新增 1. 显示弹框  2. 传递title动态  3. 修改type值 标识操作新增-修改 4. cid参数
const append = (data) => {
  console.log('新增-------------', data, child.value.dialogVisible);
  child.value.dialogVisible = true;
  // child.value.isShow()
  info.value = {
    title: `新增【${data.name}】子级分类`,
    cid: data.cid
  };
  type.value = 1;
  child.value.input = '';
}
//删除  1. 弹框提示信息  2. 确定删除--请求接口  3. 更新视图
const remove = (node, data) => {
  ElMessageBox.confirm(
    '你确定删除当前行的数据，确认删除是不可逆的操作?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      //删除操作---操作数据库的接口--------------------------
      //执行删除接口-------------------------
      api.deleteContentCategoryById({ id: data.id })
        .then(res => {
          console.log('-删除---', res.data);
          if (res.data.status == 200) {
            ElMessage({
              showClose: true,
              message: '恭喜你，删除成功',
              type: 'success',
            })
            itemCategory();
            //强制刷新视图
            
          }
        })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}
//修改 1. 显示弹框   2. 传递title动态  3. 修改type值 标识操作新增-修改 4.把当前的名称传递给input  5. id参数
const update = (node, data) => {
  console.log('修改--------------', data.name);
  child.value.dialogVisible = true;
  info.value = {
    title: `修改【${data.name}】名称`,
    id: data.id
  };
  type.value = 2;
  child.value.input = data.name;

}
// 树节点的内容区的渲染 Function	Function(h, { node, data, store }-------------
// const renderContent = (h, { node, data, store }) => {
//   // console.log('render--',node,data);
//   //语法：h('标签',{配置项 class id},内容)
//   return (
//     <span class="custom-tree-node">
//       <span class='name'>{node.label}</span>
//       {
//         node.level == 1 ? <span>
//           <el-button class='mini' size="small" onClick={() => append(data)} ><el-icon><Plus /></el-icon>新增</el-button>
//           <el-button class='mini' size="small" onClick={() => update(node, data)} ><el-icon><EditPen /></el-icon>修改</el-button>
//           <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
//         </span> : <span>
//           <el-button class='mini' size="small" onClick={() => update(node, data)}><el-icon><EditPen /></el-icon>修改</el-button>
//           <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
//         </span>
//       }
//     </span>
//   );
// }

//请求tree数据-----------------------
const itemCategory = async () => {
  console.log('请求tree数据--------------------');
  let res = await api.itemCategory()
  console.log('res--data', res.data.result)
  let arr = res.data.result;
  //获取一级目录
  let oneArr = [], otherArr = [];
  arr.forEach(ele => {
    if (ele.type == 1) {
      ele.children = []
      oneArr.push(ele)
    } else {
      otherArr.push(ele)
    }
  })
  console.log(oneArr, otherArr);
  //继续遍历数组--获取数据结构---------
  oneArr.forEach(item => {
    //item.cid  一级信息标识
    otherArr.forEach(ele => {
      if (ele.type === item.cid) {
        item.children.push(ele)
      }
    })

  })
  console.log('分类列表-=------------------',oneArr);
  // Object.assign(data, oneArr)
  // data.value = oneArr
  data.result = oneArr
}

onMounted(() => {
  itemCategory()
})

</script>

<style lang="scss" scoped>
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


    ::v-deep .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    ::v-deep .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  ::v-deep .name {
    width: 300px;
    display: inline-block;
  }


}
</style>