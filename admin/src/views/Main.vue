<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >

          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">铭文</template>
            <el-menu-item index="/mingwens/create">新建铭文</el-menu-item>
            <el-menu-item index="/mingwens/list">铭文列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/vedios/create">新建视频</el-menu-item>
            <el-menu-item index="/vedios/list">视频列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group>
            <template slot="title">广告</template>
            <el-menu-item index="/advertises/create">新建广告</el-menu-item>
            <el-menu-item index="/advertises/list">广告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>系统设置</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admins/create">新建管理员</el-menu-item>
            <el-menu-item index="/admins/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 25px"></i>
          <el-dropdown-menu slot="dropdown" class="tologin">
            <div @click="toLogin">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="user">{{ getUsername }}</span>
      </el-header>

      <el-main>
        <!-- Key的作用是区分显示的路由,因为新建分类和编辑分类是同一个页面,不加key,路由区分不出来,从编辑页面到新建页面会出现数据还会存在的bug, -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: "Main",
  methods: {
    toLogin() {
      window.localStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
  computed: {
    getUsername() {
      return window.localStorage.getItem("username");
    },
  },
};
</script>
<style >
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-icon-setting {
  font-size: 25px;
  text-align: center;
}

.user {
  font-size: 30px;
}

.el-aside {
  color: #333;
}

.el-dropdown:hover {
  cursor: pointer !important;
}
</style>
