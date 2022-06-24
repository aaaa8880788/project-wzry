<template>
  <div class="swiper">
    <van-swipe
      ref="swiper"
      class="my-swipe"
      indicator-color="white"
      :show-indicators="false"
      @change="onChange"
    >
      <van-swipe-item>
        <div class="newsitem">
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="newsitem">
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
          <a href="">
            <div><span>热门</span></div>
            <span>元歌皮肤设计大赛精彩创意赏析第五期</span>
            <span>01/07</span>
          </a>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "ImageSwiper",
  props: ["activeIndex"],
  data() {
    return {
      NewsData: [],
    };
  },
  methods: {
    // 轮播图自动播放触发事件
    onChange(index) {
      this.$emit("activeIndexChange", index);
    },
    // 轮播图跳转指定也是事件
    ChangeSwiper(e) {
      this.$refs.swiper.swipeTo(e);
    },
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  font-size: 1.1538rem;
}
.swiper {
  img {
    width: 100%;
    // height: 100%;
  }
}
.newsitem {
  a {
    padding: 0.3846rem 0;
    display: flex;
    align-items: center;
    span:nth-child(1) {
      padding: 0.0769rem;
      margin-right: 0.3846rem;
      font-size: 0.9231rem;
      color: red;
      border: 0.0769rem solid red;
      border-radius: 0.3846rem;
    }
    span:nth-child(2) {
      flex: 1;
      color: #222;
    }
  }
}
</style>