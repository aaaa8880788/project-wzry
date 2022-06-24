<template>
  <div>
    <div class="top-box">
      <slot></slot>
    </div>
    <div class="bottom-box">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroCard",
};
</script>

<style lang="less" scoped>
.top-box {
  display: flex;
  margin-bottom: 0.7692rem;
  img {
    width: 1.1538rem;
    height: 1.1538rem;
    margin: auto 0;
  }
  span {
    margin-left: 0.7692rem;
    font-size: 1.2308rem;
    font-weight: 700;
  }
}
</style>