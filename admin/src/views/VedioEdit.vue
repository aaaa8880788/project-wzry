<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}视频</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="articleFormrules"
      ref="articleForm"
    >
      <el-row>
        <el-col :span="15">
          <el-form-item label="所属分类" style="width: 76.9231rem">
            <el-select
              v-model="model.categories"
              placeholder="请选择"
              style="width: 30%"
              multiple
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属名称" style="width: 76.9231rem">
            <el-input v-model="model.name" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label="播放量" style="width: 76.9231rem">
            <el-input
              v-model="model.number"
              style="width: 30%"
              type="Number"
            ></el-input>
          </el-form-item>
          <el-form-item label="投稿" style="width: 76.9231rem">
            <el-input
              v-model="model.contribute"
              style="width: 30%"
              type="Number"
            ></el-input>
          </el-form-item>
          <el-form-item label="粉丝" style="width: 76.9231rem">
            <el-input
              v-model="model.fans"
              style="width: 30%"
              type="Number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="视频图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => (model.icon = res.url)"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
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
  name: "VedioEdit",
  props: ["id"],
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        categories: "",
        icon: "",
        name: "",
        title: "",
        number: "",
        body: "",
      },
      categories: [],
      // 表单验证部分
      articleFormrules: {
        title: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 上传图片处理
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
            res = await this.$http.put(`rest/vedios/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/vedios", this.model);
            // console.log(res);
          }
          this.$router.push("/vedios/list");
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
      const res = await this.$http.get(`rest/vedios/${this.id}`);
      // console.log(res);
      this.model = { ...this.model, ...res.data };
      // console.log(this.model);
    },
    async getParentData() {
      const res = await this.$http.get("rest/categories");
      // console.log(res);
      const data = res.data.filter((item) => {
        if (item.category === "二" && item.parent.name === "视频分类")
          return true;
      });
      // console.log(data);
      this.categories = { ...this.categories, ...data };
      // console.log(this.categories);
    },
  },
  created() {
    // 有id时才会执行，因为有id证明是点击编辑按钮才进入的该页面，无id是点击新建文章进入的该页面
    this.id && this.getName();
    this.getParentData();
  },
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
}
.avatar {
  /* width: 6rem; */
  height: 6rem;
  display: block;
}
</style>