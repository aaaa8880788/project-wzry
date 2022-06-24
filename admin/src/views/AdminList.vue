<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="userData">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
  name: "AdminList",
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    // 获取用户列表数据
    async getUserData() {
      const res = await this.$http.get("/userInfo");
      // console.log(res);
      this.userData = res.data;
    },
    // 点击编辑按钮触发
    edit(id) {
      this.$router.push(`/admins/edit/${id}`);
    },
    // 点击删除按钮触发
    async remove(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除该用户:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const res = await this.$http.delete(`userInfo/${row._id}`);
        // 删除后，更新列表
        this.getUserData();
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
    this.getUserData();
  },
};
</script>

<style>
</style>