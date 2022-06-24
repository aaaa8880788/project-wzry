import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式
import '@/assets/css/global.less'
// 引入字体图标样式
import '@/assets/iconfont/iconfont.css'
// 引入axios
import axios from 'axios'

Vue.config.productionTip = false


// 全局注册卡片组件
import Card from '@/components/Card.vue'
Vue.component('m-card', Card)

// 全局注册列表卡片组件
import ListCard from '@/components/ListCard.vue'
Vue.component('m-list-card', ListCard)

// 全局引用并使用轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 全局注册HeroCard组件
import HeroCard from "@/components/HeroCard";
Vue.component('m-hero-card', HeroCard)

// 挂载http网络请求
Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:3000/web/api'
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})

// import dayjs from "dayjs";

// // 定义全局时间处理过滤器
// Vue.filter('date', (val, b) => {
//   let data = dayjs(val).format(b);
//   return data;
// })

import { date } from './filter/dataFilter'
Vue.filter('date', date)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
