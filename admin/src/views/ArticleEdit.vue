<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="articleFormrules"
      ref="articleForm"
    >
      <el-form-item label="所属分类">
        <el-select
          v-model="model.categories"
          placeholder="请选择"
          style="width: 30%"
          multiple
          filterable
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "ArticleEdit",
  props: ["id"],
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        categories: "",
        title: "",
      },
      categories: [],
      // 表单验证部分
      articleFormrules: {
        title: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 文本编辑器处理
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      const url = res.data.url;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    // 点击保存按钮触发
    save() {
      this.$refs.articleForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请输入合法的信息");
        } else {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/articles/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/articles", this.model);
            console.log(res);
          }
          this.$router.push("/articles/list");
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
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = { ...this.model, ...res.data };
      console.log(this.model);
    },
    async getParentData() {
      const res = await this.$http.get("rest/categories");
      // console.log(res);
      const data = res.data.filter((item) => {
        if (item.category === "二" && item.parent.name === "新闻分类")
          return true;
      });
      // console.log(data);
      this.categories = { ...this.categories, ...data };
      // console.log(this.parents);
    },
  },
  created() {
    // 有id时才会执行，因为有id证明是点击编辑按钮才进入的该页面，无id是点击新建文章进入的该页面
    this.id && this.getName();
    this.getParentData();
  },
};
</script>
