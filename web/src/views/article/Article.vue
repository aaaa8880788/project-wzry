<template>
  <div class="page-article" v-if="model">
    <div class="bar-article">
      <div class="left">
        <img src="@/assets/image/backBg.png" @click="$router.go(-1)" />
        <span>{{ model.title }}</span>
      </div>
      <div class="right">{{ model.updatedAt | date() }}</div>
    </div>
    <div class="content-article">
      <div v-html="model.body"></div>
    </div>
  </div>
</template>

<script>
// 导入处理日期插件
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    },
  },
  name: "Article",
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async getArticleData() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = JSON.parse(JSON.stringify(res.data));
      // console.log(this.model);
    },
  },
  created() {
    this.getArticleData();
  },
};
</script>

<style lang="less" scoped>
.bar-article {
  border-bottom: 0.0769rem solid #9fa0a0;
  padding: 0.7692rem;
  display: flex;
  .left {
    color: #4394e4;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    img {
      width: 0.6154rem;

      margin-right: 0.7692rem;
    }
  }
  .right {
    color: #9fa0a0;
    font-size: 0.9231rem;
    margin-left: 1.5385rem;
  }
}
</style>
<style lang="less">
.content-article {
  padding: 1.1538rem;
  img {
    margin: 0.7692rem 0;
    width: 100%;
    height: auto;
  }
  iframe {
    width: 100%;
    height: auto;
  }
  // video {
  //   width: 100%;
  // }
  // .mod_player_section {
  //   width: 100%;
  // }
  // .txp_player_inframe {
  //   width: 100%;
  // }
}
</style>