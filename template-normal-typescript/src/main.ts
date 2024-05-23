import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const render = () => {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.mount('#app');
  return app;
};

render();
