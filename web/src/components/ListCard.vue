<template>
  <m-card :title="title" :icon="icon">
    <slot></slot>
    <div class="bottom">
      <div class="bottom-title">
        <div v-for="(item, i) in categories" :key="i">
          <div
            :class="{ activeTitle: currentAcitve === i }"
            @click="titleChange(i)"
            style="padding-bottom: 0.1875rem"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="bottom-swiper">
        <div class="swiper">
          <swiper
            ref="vanSwipe"
            :options="options"
            @slide-change="onChange"
            v-if="categories.length"
          >
            <swiper-slide v-for="(category, i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
  name: "ListCard",
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 当前活动标题
      currentAcitve: 0,
      // 轮播图配置项
      options: {
        autoHeight: true,
        loop: true,
      },
    };
  },
  methods: {
    // 点击标题切换高亮时触发
    titleChange(i) {
      this.$refs.vanSwipe.swiper.slideTo(i + 1);
    },
    // 滑动轮播图时触发
    onChange() {
      this.currentAcitve = this.$refs.vanSwipe.swiper.realIndex;
    },
  },
};
</script>

<style lang="less" scoped>
// 新闻资讯标题栏目样式
.bottom {
  margin-top: 1.5385rem;
  border-top: 0.0769rem solid rgb(234, 237, 239);
  .bottom-title {
    padding: 1.1538rem 0;
    display: flex;
    justify-content: space-between;
  }
}
// 轮播图样式
.my-swipe .van-swipe-item {
  font-size: 1.1538rem;
}
.swiper {
  img {
    width: 100%;
    // height: 100%;
  }
}
</style>