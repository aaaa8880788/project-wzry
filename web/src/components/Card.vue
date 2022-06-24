<template>
  <div class="card">
    <!-- 上半部分 -->
    <div class="top">
      <div class="nav">
        <div class="left">
          <i :class="`icon-${icon} iconfont`"></i>
          <div class="title">{{ title }}</div>
        </div>
        <div class="right">
          <i class="iconfont icon-menu"></i>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "icon"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 1.1538rem;
  background-color: white;
  padding: 1.5385rem;
  .top {
    padding-bottom: 1.5385rem;
    .nav {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        i {
          font-weight: 700;
          font-size: 1.0769rem;
        }
        .title {
          margin-left: 0.3846rem;
          font-size: 1.2308rem;
        }
      }
    }
  }
}
.activeTitle {
  border-bottom: 3px solid #db9e3f;
  color: #db9e3f;
}
</style>