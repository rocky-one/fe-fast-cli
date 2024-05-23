<template>
  <div class="demo">
    <h1>Demo</h1>

    <!-- 主题 -->
    <hr>
    <h3>主题切换</h3>
    <div>
      <span>切换：</span>
      <el-radio-group v-model="themeValue" @change="onThemeChange">
        <el-radio value="app-theme-light" size="large">light</el-radio>
        <el-radio value="app-theme-dark" size="large">dark</el-radio>
      </el-radio-group>
    </div>
    <div class="theme">
      <div>我是主题效果</div>
    </div>

    <!-- css和scss变量使用 见下面css -->
    <hr>
    <h3>css和scss变量使用</h3>
    <div class="text">我是文本</div>

    <!-- icon使用，前缀(i-ep) + iconName -->
    <hr>
    <h3>icon使用</h3>
    <div>
      <i-ep-add-location />
      <i-ep-aim width="30px" height="30px" />
      <el-icon size="30">
        <i-ep-apple />
      </el-icon>
    </div>

    <!-- 局部覆盖element样式 -->
    <hr>
    <h3>局部覆盖element样式</h3>
    <!-- 这里覆盖element scss变量，查看 src/styles/theme/light.scss -->
    <el-button type="primary">
      Button样式覆盖1
    </el-button>
    <!-- 这里局部覆盖，见下面css -->
    <div class="button">
      <el-button>
        Button样式覆盖2
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { request } from '@/common/request';
import { changeCustomTheme, changeElementTheme } from '@/common/theme';

const themeValue = ref('app-theme-light');

const onThemeChange = (theme: string) => {
  changeCustomTheme(theme, document.querySelector('.app-container')!, 'app-theme-');
  changeElementTheme(theme === 'app-theme-dark' ? 'dark' : '', document.documentElement!);
};

onMounted(async () => {
  await request.get('/posts', {}, {
    loadingOptions: {
      target: document.body
    }
  });
});

</script>

<style lang="scss" scoped>
.demo {
  padding: 10px 20px;
  hr {
    margin-top: 40px;
  }
  // 主题
  .theme {
    width: 300px;
    text-align: center;
    padding: 20px;
    background: var(--base-background-color);
    color:  var(--base-font-color);
    border: 1px solid var(--base-border-color);
  }
  // 使用var和scss变量
  .text {
    color: var(--base-font-color);
    font-size: var(--base-font-size);
  }
  // 局部样式覆盖2
  .button :deep(.el-button) {
    border: 1px solid rgb(82, 212, 123);
    background: #8dbf93;
    margin-top: 4px;
  }
}
</style>

