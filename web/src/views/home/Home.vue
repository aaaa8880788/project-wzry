<template>
  <div class="home">
    <!-- 轮播图部分 -->
    <ImageSwiper
      :swiperImgage="TopAdviseImage"
      fromType="articles"
    ></ImageSwiper>
    <!-- 中间详情信息部分 -->
    <DetailData></DetailData>
    <!-- 新闻资讯部分 -->
    <m-list-card title="新闻资讯" icon="cc-menu-circle" :categories="newsCats">
      <template #items="{ category }">
        <div class="newsitem">
          <router-link
            v-for="(item, index) in category.newsList"
            :key="index"
            :to="`/articles/${item._id}`"
          >
            <div>
              <span>{{ item.categoryName }}</span>
            </div>
            <span>{{ item.title }}</span>
            <span>{{ item.updatedAt | date("MM/DD") }}</span>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- 英雄列表部分 -->
    <m-list-card title="英雄列表" icon="detail-hero" :categories="heroesCats">
      <ImageSwiper
        :swiperImgage="HeroListAdviseImage"
        fromType="heroes"
      ></ImageSwiper>
      <template #items="{ category }">
        <div class="heroesitem">
          <router-link
            :to="`/heroes/${item._id}`"
            href="javascript:;"
            v-for="(item, index) in category.heroList"
            :key="index"
          >
            <img :src="item.avatar" :alt="item.name" :title="item.name" />
            <div>
              <span>{{ item.name }}</span>
            </div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- 精彩视频部分 -->
    <m-list-card title="精彩视频" icon="vedio" :categories="vediosCats">
      <template #items="{ category }">
        <div class="vediositem">
          <router-link
            :to="`/vedios/${item._id}`"
            v-for="(item, index) in category.vedios"
            :key="index"
            class="allvedios"
          >
            <div class="vediosImage">
              <img :src="item.icon" alt="" />
            </div>
            <p>{{ item.title }}</p>
            <div class="vediosbottom">
              <div>
                <i class="iconfont icon-vedio"></i>
                <span>{{ item.number }}</span>
              </div>
              <div>
                <span>{{ item.updatedAt | date("MM-DD") }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
// 导入中间详情信息部分组件
import DetailData from "@/views/home/homeChildren/DetailData";

// 导入轮播图部分
import ImageSwiper from "@/components/ImageSwiper";

export default {
  name: "Home",
  components: {
    DetailData,
    ImageSwiper,
  },
  data() {
    return {
      // 顶部导航栏下面的轮播图数据
      TopAdviseImage: [],
      // 首页英雄列表广告轮播图数据
      HeroListAdviseImage: [],
      // 新闻资讯内容
      newsCats: [],
      // 英雄列表内容
      heroesCats: [],
      // 精彩视频数据
      vediosCats: [],
    };
  },
  methods: {
    // 获取新闻列表数据
    async getNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = JSON.parse(JSON.stringify(res.data));
      // console.log(this.newsCats);
    },
    // 获取英雄列表数据
    async getHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.heroesCats = JSON.parse(JSON.stringify(res.data));
    },
    // 获取首页顶部广告数据
    async getHomeTopAdvise() {
      const res = await this.$http.get("advertises/list/首页顶部广告");
      // console.log(res.data);
      [this.TopAdviseImage] = JSON.parse(
        JSON.stringify(res.data.map((el) => el.items))
      );
    },
    // 获取首页英雄列表广告数据
    async getHomeHeroListAdvise() {
      const res = await this.$http.get("advertises/list/首页英雄列表广告");
      [this.HeroListAdviseImage] = JSON.parse(
        JSON.stringify(res.data.map((el) => el.items))
      );
      // console.log(this.HeroListAdviseImage);
    },
    // 获取英雄列表数据
    async getVediosCats() {
      const res = await this.$http.get("vedios/list");
      this.vediosCats = JSON.parse(JSON.stringify(res.data));
    },
  },
  created() {
    alert("英雄只录入了司马懿、暃、云瑛、金蝉，其他是没数据的！");
    this.getNewsCats();
    this.getHeroesCats();
    this.getVediosCats();
    this.getHomeTopAdvise();
    this.getHomeHeroListAdvise();
  },
};
</script>

<style lang="less" scoped>
// 新闻资讯下面的新闻详情轮播图部分样式
.newsitem {
  a {
    padding: 0.3846rem 0;
    display: flex;
    align-items: center;
    span:nth-child(1) {
      padding: 0.0769rem;
      margin-left: 0.0385rem;
      margin-right: 0.3846rem;
      font-size: 0.9231rem;
      color: red;
      border: 0.0769rem solid red;
      border-radius: 0.3846rem;
    }
    span:nth-child(2) {
      flex: 1;
      color: #222;
      padding: 0 1.5385rem 0 0;
      // 超出一行的文字部分用...显示
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
// 英雄列表下面的英雄图片轮播图部分样式
.heroesitem {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 -0.625rem;
  a {
    width: 20%;
    color: #222;
    padding: 0 0.625rem;
    img {
      border-radius: 0.3125rem;
      width: 100%;
    }
    div {
      margin: 0.3125rem 0;
    }
  }
}
// 精彩视频部分
.vediositem {
  display: flex;
  flex-wrap: wrap;
  .allvedios {
    color: #222;
    width: 48%;
    margin-bottom: 0.7692rem;
    p {
      margin: 0.5385rem 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .vediosImage {
      img {
        width: 100%;
      }
    }
    .vediosbottom {
      display: flex;
      justify-content: space-between;
      i {
        display: inline-block;
        font-size: 1rem;
        margin-right: 0.3846rem;
      }
    }
  }
  .allvedios:nth-child(odd) {
    margin-right: 4%;
  }
}
</style>