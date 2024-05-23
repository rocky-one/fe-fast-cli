import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import About from '@/views/about/index.vue';
import NoFound from '@/views/no-found/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: NoFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  // ...
  return true;
});

export default router;
