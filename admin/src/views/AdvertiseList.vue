<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editAd(scope.row)"
            >编辑</el-button
          >
          <el-button type="primary" size="small" @click="deleteAd(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdvertiseList",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    // 获取文章列表数据
    async getData() {
      const res = await this.$http.get("rest/advertises");
      this.items = res.data;
    },
    // 点击删除按钮触发
    async deleteAd(row) {
      const confirmResult = await this.$confirm(`是否确定要删除广告?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);

      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const res = await this.$http.delete(`rest/advertises/${row._id}`);
        //  删除后更新列表
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
    // 点击编辑按钮触发
    editAd(row) {
      this.$router.push(`/advertises/edit/${row._id}`);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>