<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form
      label-width="120px"
      :model="model"
      :rules="heroFormrules"
      ref="heroForm"
    >
      <el-tabs value="first" type="border-card" style="margin-top: 2rem">
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="英雄名称" prop="name">
            <el-input v-model="model.name" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label="英雄称号" prop="title">
            <el-input v-model="model.title" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label="英雄类型" prop="categories">
            <el-select
              v-model="model.categories"
              multiple
              filterable
              placeholder="请选择"
              style="width: 30%"
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              show-score
              :max="10"
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skills"
              show-score
              :max="10"
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="model.scores.attack"
              show-score
              :max="10"
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              show-score
              :max="10"
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select
              v-model="model.items1"
              multiple
              placeholder="请选择"
              style="width: 100%"
              filterable
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select
              v-model="model.items2"
              multiple
              placeholder="请选择"
              style="width: 100%"
              filterable
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="铭文推荐">
            <el-select
              v-model="model.mingwens"
              multiple
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="mingwen in mingwens"
                :key="mingwen._id"
                :label="mingwen.name"
                :value="mingwen._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTip"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTip"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTip"></el-input>
          </el-form-item>

          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄背景">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterBannerUpload"
            >
              <img v-if="model.banner" :src="model.banner" class="banner" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="second">
          <el-button
            type="primary"
            style="margin-bottom: 2rem"
            @click="addSkills"
            ><i class="el-icon-plus" style="margin-right: 1rem"></i
            >添加技能</el-button
          >
          <el-row v-for="(item, index) in model.skills" :key="index">
            <el-col :span="16">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.cd"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.descripton" type="textarea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteBtn(index, 'skills')"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="third">
          <el-button
            type="primary"
            style="margin-bottom: 2rem"
            @click="addPartners"
            ><i class="el-icon-plus" style="margin-right: 1rem"></i
            >添加英雄</el-button
          >
          <el-row v-for="(item, index) in model.partners" :key="index">
            <el-col :span="16">
              <el-form-item label="英雄">
                <el-select
                  v-model="item.hero"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="hero in heros"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="英雄关系">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="英雄描述">
                <el-input v-model="item.descripton"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="danger" @click="deleteBtn(index, 'partners')"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="加点建议" name="forth">
          <el-form-item label="主升技能名称">
            <el-input v-model="model.skilladvice.skill1.name"></el-input>
          </el-form-item>
          <el-form-item label="主升技能图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => (model.skilladvice.skill1.icon = res.url)"
            >
              <img
                v-if="model.skilladvice.skill1.icon"
                :src="model.skilladvice.skill1.icon"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="副升技能名称">
            <el-input v-model="model.skilladvice.skill2.name"></el-input>
          </el-form-item>
          <el-form-item label="副升技能图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => (model.skilladvice.skill2.icon = res.url)"
            >
              <img
                v-if="model.skilladvice.skill2.icon"
                :src="model.skilladvice.skill2.icon"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="召唤师技能名称">
            <el-input v-model="model.skilladvice.superskill1.name"></el-input>
          </el-form-item>
          <el-form-item label="召唤师技能图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="
                (res) => (model.skilladvice.superskill1.icon = res.url)
              "
            >
              <img
                v-if="model.skilladvice.superskill1.icon"
                :src="model.skilladvice.superskill1.icon"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="save" style="margin-top: 2rem"
        >保存</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "HeroEdit",
  props: ["id"],
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        banner: "",
        title: "",
        categories: [],
        mingwens: [],
        scores: {},
        skills: [],
        partners: [],
        skilladvice: {
          skill1: {
            name: "",
            icon: "",
          },
          skill2: {
            name: "",
            icon: "",
          },
          superskill1: {
            name: "",
            icon: "",
          },
          superskill2: {
            name: "",
            icon: "",
          },
        },
      },
      // 表单验证规则
      heroFormrules: {
        name: [{ required: true, message: "请输入英雄名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入英雄称号", trigger: "blur" }],
        avatar: [
          { required: true, message: "请上传英雄头像", trigger: "blur" },
        ],
        categories: [
          { required: true, message: "请选择英雄类型", trigger: "change" },
        ],
      },
      // 分类列表数据
      categories: [],
      // 物品列表数据
      items: [],
      // 铭文列表数据
      mingwens: [],
      // 英雄列表数据
      heros: [],
    };
  },
  methods: {
    // 上传完图片后响应的函数
    afterAvatarUpload(res) {
      // console.log(res);
      this.model.avatar = res.url;
      // console.log(this.model);
    },
    afterBannerUpload(res) {
      this.model.banner = res.url;
    },
    // 保存按钮响应后触发的函数
    async save() {
      this.$refs.heroForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请输入必填信息");
        } else {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/heros/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/heros", this.model);
          }

          this.$router.push("/heros/list");
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
      const res = await this.$http.get(`rest/heros/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
    // 获取分类数据
    async getCategories() {
      const res = await this.$http.get(`rest/categories`);
      // console.log(res);
      const data = res.data.filter((item) => {
        if (item.category === "三" && item.parent.name === "英雄") return true;
      });
      this.categories = data;
    },
    // 获取物品数据
    async getItems() {
      const res = await this.$http.get(`rest/items`);
      // console.log(res);
      this.items = res.data;
    },
    // 获取铭文数据
    async getMingwens() {
      const res = await this.$http.get(`rest/mingwens`);
      this.mingwens = res.data;
    },
    // 获取英雄数据
    async getHeroes() {
      const res = await this.$http.get(`rest/heros`);
      this.heros = res.data;
    },
    // 点击添加技能按钮触发
    addSkills() {
      this.model.skills.push({});
    },
    // 点击添加英雄按钮触发
    addPartners() {
      this.model.partners.push({});
      // console.log(this.model.partners);
    },
    // 点击删除按钮触发
    async deleteBtn(index, str) {
      const confirmResult = await this.$confirm(
        `是否确定要删除该技能?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        this.model[str].splice(index, 1);
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
    // 有id时才会执行，因为有id证明是点击编辑按钮才进入的该页面，无id是点击新建分类进入的该页面
    this.id && this.getName();
    this.getCategories();
    this.getItems();
    this.getMingwens();
    this.getHeroes();
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
  width: 6rem;
  height: 6rem;
  display: block;
}
.banner {
  height: 6rem;
  display: block;
}
</style>