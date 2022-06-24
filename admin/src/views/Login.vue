<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- 这里是简体表单的submit时间,prevent是阻止默认行为,,submit默认行为是跳转 -->
      <!-- native表示监听这个表单里面的原生事件 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reguser">注册</el-button>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.model.username === "" || this.model.password === "") {
        return this.$message({
          type: "error",
          message: "用户名或密码不能为空！",
        });
      }
      const { data } = await this.$http.post("login", this.model);
      if (!data.status) {
        this.$message({
          type: "error",
          message: data.message,
        });
      } else {
        this.$message({
          type: "success",
          message: data.message,
        });
        localStorage.token = data.token;
        localStorage.username = this.model.username;
        this.$router.replace("/");
      }
    },
    async reguser() {
      if (this.model.username === "" || this.model.password === "") {
        return this.$message({
          type: "error",
          message: "用户名或密码不能为空！",
        });
      }
      const { data } = await this.$http.post("/reguser", this.model);
      if (!data.status) {
        return this.$message({
          type: "error",
          message: data.message,
        });
      }
      this.$message({
        type: "success",
        message: data.message,
      });
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 30rem;
  text-align: center;
  margin: 10rem auto;
  font-weight: 700;
  font-size: 2rem;
}
.el-form-item__content button {
  margin: 0 10px;
}
</style>