<template>
  <div v-if="allVideosData.length">
    <router-link
      tag="div"
      :to="`/vedios/${item._id}`"
      v-for="(item, index) in allVideosData"
      :key="index"
      class="allvedios"
    >
      <div class="vediosImage">
        <img :src="item.icon" />
      </div>
      <div class="vedioscontent">
        <p>{{ item.title }}</p>
        <div>
          <span>
            <i class="iconfont icon-vedio"></i>
            {{ item.number }}
          </span>
          <span>{{ item.updatedAt | date() }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
// 导入处理日期插件
import dayjs from "dayjs";

export default {
  filters: {
    date(val, b) {
      let data = dayjs(val).format("YYYY-MM-DD");
      if (b === "-") {
        data = data.split("/").join("-");
      }
      return data;
    },
  },
  name: "VedioList",
  props: ["allVideosData"],
};
</script>

<style lang="less" scoped>
.allvedios {
  border-bottom: 0.0769rem solid rgba(218, 218, 218, 0.517);
  padding: 0.7692rem 0;
  display: flex;
  .vediosImage {
    img {
      height: 6.1538rem;
      width: auto;
      border-radius: 0.3846rem;
    }
  }
  .vedioscontent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.3846rem 0.7692rem;
    p:nth-child(1) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    div {
      color: rgb(167, 167, 171);
      display: flex;
      span:nth-child(1) {
        flex: 1;
      }
      i {
        font-size: 1rem;
      }
    }
  }
}
</style>