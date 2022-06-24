<template>
  <div class="outerbox" v-if="model">
    <div class="vedio" v-html="model.body"></div>
    <div class="content">
      <div class="center">
        <img :src="model.icon" alt="" />
        <div class="videoInfo">
          <p>
            {{ model.title }}
          </p>
          <div>
            <span>投稿：{{ model.contribute }}</span>
            <span>粉丝：{{ model.fans }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="vedio-title">
          <img class="icon" src="@/assets/image/videoContHear.png" />
          <span>猜你喜欢</span>
          <vedioList :allVideosData="allVideosData"></vedioList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入视频列表
import vedioList from "@/components/VedioList";

export default {
  name: "Vedio",
  props: ["id"],
  components: {
    vedioList,
  },
  data() {
    return {
      model: {},
      allVideosData: [],
    };
  },
  methods: {
    // 根据id获取相应视频所有信息
    async getVedioById() {
      const { data } = await this.$http.get(`/vedios/${this.id}`);
      this.model = data;
      // console.log(this.model);
    },
    // 获取所有视频信息出去本页的id
    async getVedioexceptId() {
      const { data } = await this.$http.get(`/vedios/allVideos/${this.id}`);
      this.allVideosData = data;
      // console.log(this.allVideosData);
    },
  },
  created() {
    // 获取当前id所对应的视频内容
    this.getVedioById();
    // 获取所有视频信息出去本页的id
    this.getVedioexceptId();
  },
};
</script>
<style lang="less">
iframe {
  width: 100%;
  height: auto;
}
</style>
<style lang="less" scoped>
.outerbox {
  background-color: #fff;
  .content {
    padding: 0 0.7692rem;
    .center {
      display: flex;
      img {
        height: 5.3846rem;
        border-radius: 0.7692rem 0 0 0.7692rem;
      }
      .videoInfo {
        flex: 1;
        font-size: 0.9231rem;
        padding: 0.3846rem 1.5385rem;
        border: 1px solid rgb(222, 222, 222);
        border-radius: 0 0.7692rem 0.7692rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        span:nth-child(1) {
          margin-right: 0.7692rem;
        }
      }
    }
  }
  .bottom {
    margin-top: 1.5385rem;
    .vedio-title {
      .icon {
        margin-right: 0.1538rem;
        width: 1.0769rem;
      }
    }
  }
}
</style>