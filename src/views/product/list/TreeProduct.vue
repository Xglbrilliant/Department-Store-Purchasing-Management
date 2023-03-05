<template>
  <div class="">
    <el-tree :props="props" :load="loadNode" lazy @node-click="clickHandle">
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      //   treeData: [],
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        //请求--------
        this.$api
          .selectItemCategoryByParentId({ type: node.data.cid })
          .then((res) => {
            if (res.data.status == 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
    //点击tree的节点触发的事件--------------------
    clickHandle(data, node) {
    //   console.log('data',data,'node',node);
      this.$emit("sendTreeData", data);
    },
  },
};
</script>
<style lang='less'>
</style>