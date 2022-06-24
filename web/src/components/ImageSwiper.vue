<template>
  <div class="swiper">
    <swiper
      class="my-swipe"
      ref="vanSwipe"
      :options="options"
      v-if="swiperImgage.length"
    >
      <swiper-slide v-for="(item, index) in swiperImgage" :key="index">
        <router-link
          tag="a"
          href="javascript:;"
          :to="`/${fromType}/${item.hero || item.article}`"
        >
          <img :src="item.image" />
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "ImageSwiper",
  props: {
    swiperImgage: {
      type: Array,
    },
    fromType: {
      type: String,
    },
  },
  data() {
    return {
      // 轮播图数据
      options: {
        loop: true,
        autoplay: {
          //swiper手动滑动之后自动轮播失效的解决方法,包括触碰，拖动，点击pagination,重新启动自动播放
          disableOnInteraction: false,
          // 自动播放时间：毫秒
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.swiper {
  img {
    width: 100%;
    // height: 100%;
  }
}
</style>