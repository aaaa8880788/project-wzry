<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}物品</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="itemFormrules"
      ref="itemForm"
    >
      <el-form-item label="物品名称" prop="name">
        <el-input v-model="model.name" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="物品图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "itemEdit",
  props: ["id"],
  data() {
    return {
      model: { name: "", icon: "" },
      // 表单验证部分
      itemFormrules: {
        name: [{ required: true, message: "请输入物品名称", trigger: "blur" }],
        icon: [{ required: true, message: "请上传物品图片", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 上传完图片后响应的函数
    afterUpload(res) {
      // console.log(res);
      // 这个是vue提供的给对象加键值对，如果用下面那种响应不了页面变化
      this.$set(this.model, "icon", res.url);
      // this.model.icon = res.url;
    },
    // 保存按钮响应后触发的函数
    save() {
      this.$refs.itemForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请输入合法的信息");
        } else {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/items/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/items", this.model);
          }

          this.$router.push("/items/list");
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
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
  },
  created() {
    // 有id时才会执行，因为有id证明是点击编辑按钮才进入的该页面，无id是点击新建分类进入的该页面
    this.id && this.getName();
  },
};
</script>

<style>
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
  width: 6rem;
  height: 6rem;
  display: block;
}
</style>