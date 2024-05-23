import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Demo from '../views/demo/index.vue';
import NoFound from '../views/no-found/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo
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
