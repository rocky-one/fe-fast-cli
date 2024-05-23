import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import App1 from '@/views/micro-app/app1.vue';
import App2 from '@/views/micro-app/app2.vue';
import All from '@/views/micro-app/all.vue';
import NoFound from '@/views/no-found/index.vue';
import { appHost } from '@/config';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/app1',
      name: appHost.app1.name,
      component: App1
    },
    {
      path: '/app2',
      name: appHost.app2.name,
      component: App2
    },
    {
      path: '/all',
      name: 'All',
      component: All
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NoFound
    }
  ]
});

// router.beforeEach((to, from) => {
//   // ...
//   return true;
// });

export default router;
