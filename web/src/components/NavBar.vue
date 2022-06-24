<template>
  <div class="nav">
    <div v-for="(item, index) in title" :key="index" @click="btnClick(index)">
      <span :class="{ 'hight-light': index === activeIndex }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["title"],
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    // 点击按钮触发函数
    btnClick(i) {
      this.activeIndex = i;
      if (i === 0 && this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: 3rem;
  line-height: 3rem;
  font-size: 1.0769rem;
  color: white;
  display: flex;
  background-color: #db9e3f;
  div {
    flex: 1;
    text-align: center;
  }
}

.hight-light {
  border-bottom: 3px solid white;
  padding-bottom: 0.0769rem;
}
</style>