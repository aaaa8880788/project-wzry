import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue')
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: () => import(/* webpackChunkName: "Home" */ '../views/article/Article.vue'),
        props: true
      },
      {
        path: '/vedios/:id',
        name: 'Vedio',
        component: () => import(/* webpackChunkName: "Home" */ '../views/vedio/Vedio.vue'),
        props: true
      },
    ]
  },
  {
    path: '/heroes/:id',
    name: 'Hero',
    component: () => import(/* webpackChunkName: "Home" */ '../views/hero/Hero.vue'),
    props: true
  },
]


const router = new VueRouter({
  routes
})

// 路由跳转后回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})



export default router
