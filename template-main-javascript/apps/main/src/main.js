import { createApp } from 'vue';
import WujieVue from 'wujie-vue3';
import router from './router';
import App from './App.vue';
import { appHost } from '@/config';
import '@/styles/global.scss';

const { setupApp } = WujieVue;

window.microGlobalStore = {};

const plugins = [
  {
    // 解决子应用element plus :root样式不生效问题
    patchElementHook(element, iframeWindow) {
      if (element.nodeName === 'STYLE') {
        element.insertAdjacentElement = function (_position, ele) {
          iframeWindow.document.head.appendChild(ele);
        };
      }
    }
  }
];

setupApp({
  name: appHost.app1.name,
  url: appHost.app1.url,
  attrs: {},
  exec: true,
  alive: false,
  props: {},
  plugins,
  beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e)
});

setupApp({
  name: appHost.app2.name,
  url: appHost.app2.url,
  attrs: {},
  exec: true,
  alive: false,
  props: {},
  plugins,
  beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e)
});

createApp(App).use(WujieVue).use(router).mount('#mainAppRoot');
