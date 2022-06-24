<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}分类</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="categoryFormrules"
      ref="categoryForm"
    >
      <el-form-item label="上级分类">
        <el-select
          v-model="model.parent"
          placeholder="请选择"
          style="width: 30%"
          clearable
        >
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="model.name" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="分类级别" prop="category">
        <el-select
          v-model="model.category"
          placeholder="请选择"
          style="width: 30%"
        >
          <el-option
            v-for="(item, index) in ['一', '二', '三']"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  props: ["id"],
  data() {
    return {
      model: {
        name: "",
        category: "",
      },
      parents: [],
      // 表单验证部分
      categoryFormrules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        category: [
          { required: true, message: "请选择分类级别", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 点击保存按钮触发
    save() {
      this.$refs.categoryForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请输入合法的用户信息");
        } else {
          let res;
          if (this.id) {
            res = await this.$http.put(
              `rest/categories/${this.id}`,
              this.model
            );
          } else {
            res = await this.$http.post("rest/categories", this.model);
          }
          this.$router.push("/categories/list");
          this.$message({
            type: "success",
            message: "保存成功！",
          });
        }
      });
    },
    // 根据id获取name信息
    async getName() {
      // console.log(this.id);
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
    async getParentData() {
      const res = await this.$http.get("rest/categories");
      // console.log(res);
      const data = res.data.filter((item) => {
        if (item.category === "一" || item.category === "二") return true;
      });
      // console.log(data);
      this.parents = { ...this.parents, ...data };
      // console.log(this.parents);
    },
  },
  created() {
    // 有id时才会执行，因为有id证明是点击编辑按钮才进入的该页面，无id是点击新建分类进入的该页面
    this.id && this.getName();
    this.getParentData();
  },
};
</script>
