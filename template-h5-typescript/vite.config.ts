import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import postCssPxToViewport from 'postcss-px-to-viewport';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/index.scss" as *;'
        }
      },
      postcss: {
        plugins: [
          postCssPxToViewport({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 2,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['ignore-'],
            minPixelValue: 0.5,
            mediaQuery: true,
            replace: true,
            landscape: false
          })
        ]
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver()]
      })
    ]
  };
});
