<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="adFormrules"
      ref="adForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="primary"
          size="small"
          round
          style="margin-bottom: 2rem"
          @click="addAdvertise"
        >
          <i class="el-icon-plus" style="margin-right: 0.2rem"></i>
          添加广告
        </el-button>
        <el-row v-for="(item, index) in model.items" :key="index">
          <el-col :span="10">
            <!-- <el-form-item

              label="跳转链接(URL)"
              style="margin-top: 1rem; margin-buttom: 1rem"
            >
              <el-input v-model="item.url"></el-input>
            </el-form-item> -->
            <el-form-item label="所属英雄">
              <el-select
                v-model="item.hero"
                placeholder="请选择"
                style="width: 100%"
                filterable
                clearable
              >
                <el-option
                  v-for="hero in items"
                  :key="hero._id"
                  :label="hero.name"
                  :value="hero._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属文章" style="margin-top: 0.3846rem">
              <el-select
                v-model="item.article"
                placeholder="请选择"
                style="width: 100%"
                filterable
                clearable
              >
                <el-option
                  v-for="article in articles"
                  :key="article._id"
                  :label="article.title"
                  :value="article._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-top: 1rem; margin-buttom: 1rem">
              <el-button type="danger" @click="remove(index)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdvertiseEdit",
  props: ["id"],
  data() {
    return {
      model: {
        name: "",
        items: [],
      },
      // 英雄列表数据
      items: [],
      // 文章列表数据
      articles: [],
      // 表单验证部分
      adFormrules: {
        name: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    save() {
      this.$refs.adForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请输入合法的信息");
        } else {
          let res;
          if (this.id) {
            res = await this.$http.put(
              `rest/advertises/${this.id}`,
              this.model
            );
          } else {
            res = await this.$http.post("rest/advertises", this.model);
          }
          this.$router.push("/advertises/list");
          this.$message({
            type: "success",
            message: "保存成功！",
          });
        }
      });
    },
    // 根据id获取详情信息
    async getInfo() {
      const res = await this.$http.get(`rest/advertises/${this.id}`);
      this.model = { ...this.model, ...res.data };
      // console.log(this.model);
    },
    // 点击添加广告按钮触发
    addAdvertise() {
      this.model.items.push({});
    },
    // 点击删除按钮触发
    async remove(index) {
      const confirmResult = await this.$confirm(
        `是否确定要删除该广告?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        this.model.items.splice(index, 1);
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
    // 获取英雄列表数据
    async getHeroData() {
      const res = await this.$http.get("rest/heros");
      this.items = res.data;
      // console.log(this.items);
    },
    // 获取文章列表数据
    async getArticleData() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
      console.log(this.articles);
    },
  },
  created() {
    this.id && this.getInfo();
    this.getHeroData();
    this.getArticleData();
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
  min-width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
}
.avatar {
  min-width: 6rem;
  height: 6rem;
  display: block;
}
</style>