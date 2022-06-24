<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="adminFormrules"
      ref="adminForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="model.username"
          style="width: 30rem"
          :disabled="id ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item :label="id ? '旧密码' : '密码'" prop="password">
        <el-input
          v-model="model.password"
          show-password
          style="width: 30rem"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password" v-if="id">
        <el-input
          v-model="password.newPassword"
          show-password
          style="width: 30rem"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminEdit",
  props: ["id"],
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      password: {
        oldPassword: "",
        newPassword: "",
      },
      // 表单验证部分
      adminFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 点击保存按钮触发
    save() {
      this.$refs.adminForm.validate(async (valid) => {
        // 如果校验不成功
        if (!valid) {
          this.$message.error("用户名或密码不可为空");
        } else {
          let res;
          // 判断是否有id存在，如果存在，就是点了编辑按钮进来的该页面
          if (this.id) {
            const userInfo = { ...this.model, ...this.password };
            // console.log(userInfo);
            // 判断旧密码与新密码是否一致
            if (userInfo.password === userInfo.newPassword) {
              this.$message({
                type: "error",
                message: "旧密码与新密码不能一致，请重新输入！",
              });
            } else {
              res = await this.$http.put(`userInfo/${this.id}`, userInfo);
              if (res.data.success === false) {
                return this.$message({
                  type: "error",
                  message: res.data.message,
                });
              }
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.$router.push("/admins/list");
            }
          } else {
            res = await this.$http.post("reguser", this.model);
            // console.log(res);
            // 判断用户名是否已经存在
            if (res.data.keyPattern) {
              this.$message({
                type: "error",
                message: "用户名已存在，请重新输入",
              });
            } else {
              this.$message({
                type: "success",
                message: "保存成功！",
              });
              this.$router.push("/admins/list");
            }
          }
        }
      });
    },
    // 3.根据id获取用户信息模块
    async getUserInfoById() {
      const res = await this.$http.get(`userInfo/${this.id}`);
      // console.log(res);
      this.model.username = res.data.username;
      this.password.oldPassword = res.data.password;
    },
  },
  created() {
    this.id && this.getUserInfoById();
  },
};
</script>

<style>
</style>