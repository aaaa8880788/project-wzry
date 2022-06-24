<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 4rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row._id)"
            >编辑</el-button
          >
          <el-button type="primary" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    // 获取分类列表数据
    async getData() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    // 点击编辑按钮触发函数
    edit(id) {
      this.$router.push(`/items/edit/${id}`);
    },
    // 点击删除按钮触发函数
    async remove(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除物品:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const res = await this.$http.delete(`rest/items/${row._id}`);
        // 删除后，更新列表
        this.getData();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      } else {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>