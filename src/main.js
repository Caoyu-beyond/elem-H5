import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

import '@/common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);


// 定义路由
const routes = [
  { path: '/', name: 'goods', redirect: '/goods' },
  { path: '/goods', name: 'goods', component: goods },
  { path: '/ratings', name: 'ratings', component: ratings },
  { path: '/seller', name: 'seller', component: seller }
]

// 创建router实例
const router = new VueRouter({
  routes,
  linkActiveClass : 'active'
});

// 创建和挂在根实例
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
});
