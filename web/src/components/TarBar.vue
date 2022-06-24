<template>
  <div class="topbar">
    <div class="left-1">
      <slot name="left-1"></slot>
    </div>
    <div class="left-2">
      <slot name="left-2"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TarBar",
};
</script>

<style lang="less" scoped>
.topbar {
  // height: 3.5rem;
  position: fixed;
  // position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(23, 24, 35);
  z-index: 999;
  padding: 0.5385rem 1.1538rem;
  display: flex;
  // background: url("~@/assets/image/index.png") no-repeat 0 87.195%;
  // background-size: inherit;
  align-items: center;
}

.left-2 {
  margin-left: 0.7692rem;
  flex: 1;
}
</style>