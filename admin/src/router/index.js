import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)




const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/Login.vue')

  },
  {
    path: '/',
    redirect: '/admins/list',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/CategoryEdit.vue'),
        props: true
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/CategoryList.vue')
      },


      {
        path: '/items/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/ItemEdit.vue')
      },
      {
        path: '/items/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/ItemEdit.vue'),
        props: true
      },
      {
        path: '/items/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/ItemList.vue')
      },

      {
        path: '/mingwens/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/MingwenEdit.vue')
      },
      {
        path: '/mingwens/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/MingwenEdit.vue'),
        props: true
      },
      {
        path: '/mingwens/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/MingwenList.vue')
      },

      {
        path: '/heros/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/HeroEdit.vue')
      },
      {
        path: '/heros/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/HeroEdit.vue'),
        props: true
      },
      {
        path: '/heros/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/HeroList.vue')
      },


      {
        path: '/articles/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/ArticleEdit.vue')
      },
      {
        path: '/articles/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/ArticleEdit.vue'),
        props: true
      },
      {
        path: '/articles/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/ArticleList.vue')
      },

      {
        path: '/advertises/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/AdvertiseEdit.vue')
      },
      {
        path: '/advertises/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/AdvertiseEdit.vue'),
        props: true
      },
      {
        path: '/advertises/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/AdvertiseList.vue')
      },

      {
        path: '/admins/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/AdminEdit.vue')
      },
      {
        path: '/admins/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/AdminEdit.vue'),
        props: true
      },
      {
        path: '/admins/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/AdminList.vue')
      },

      {
        path: '/vedios/create',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/VedioEdit.vue')
      },
      {
        path: '/vedios/edit/:id',
        component: () => import(/* webpackChunkName: "CategoryEdit" */ '@/views/VedioEdit.vue'),
        props: true
      },
      {
        path: '/vedios/list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/VedioList.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to  将要访问的路径
// from  代表从那个路径跳转而来
// next  是一个函数代表放行
// next的两种方式
// 1. next()  直接放行
// 2. next('/XXXXX')  强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr || tokenStr === 'undefined') {
    next('/login')
  } else {
    next()
  }
})


export default router
