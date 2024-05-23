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

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = render();
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  window.__WUJIE.mount();
} else {
  render();
}
