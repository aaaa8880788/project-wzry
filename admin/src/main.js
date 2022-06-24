import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 挂载网络请求模块
import http from './http';
Vue.prototype.$http = http

// 定义全局混入，用来给上传图片接口加请求头
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `${window.localStorage.getItem('token') || ''}`
      }
    }
  }
})


Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
