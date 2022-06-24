<template>
  <div>
    <!-- 最顶部Bar部分 -->
    <TarBar class="tar-bar">
      <template #left-1>
        <div class="left-1"><img src="@/assets/image/logo.png" /></div>
      </template>
      <template #left-2>
        <div class="left-2">
          <div class="topTitle">王者荣耀</div>
          <div class="bottomTitle">团队成就更多</div>
        </div>
      </template>
      <template #right>
        <div class="right">
          <a href="javascript:;"></a>
        </div>
      </template>
    </TarBar>
    <!-- 因为tarbar用了定位不占位置，所有要一个占位盒子填上方便部剧 -->
    <div class="useless-box"></div>
    <!-- 顶部导航栏部分 -->
    <NavBar :title="['首页', '攻略中心', '赛事中心', 'IP新游']" class="nav-bar">
    </NavBar>
    <router-view :key="$route.path" class="main"></router-view>
  </div>
</template>

<script>
import TarBar from "@/components/TarBar";
import NavBar from "@/components/NavBar";
export default {
  name: "Main",
  components: {
    NavBar,
    TarBar,
  },
};
</script>

<style lang="less" scoped>
// 占位盒子样式
.useless-box {
  height: 3.5rem;
}

// left-1盒子部分
.left-1 {
  img {
    width: 2.4rem;
    height: 2.4rem;
  }
}
// left-2盒子部分
.left-2 {
  .topTitle {
    color: white;
  }
  .bottomTitle {
    color: #666;
  }
}
.right {
  a {
    display: block;
    background: url("~@/assets/image/index.png") no-repeat -59px -309px;
    background-size: 28.8462rem 35rem;
    width: 4.6154rem;
    height: 1.8462rem;
  }
}
</style>

