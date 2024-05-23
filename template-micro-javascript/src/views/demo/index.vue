<template>
  <div class="demo">
    <h1>Demo</h1>

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
    <div class="button">
      <el-button>
        Button样式覆盖
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { request } from '@/common/request';

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
  // 使用var和scss变量
  .text {
    color: var(--base-font-color);
    font-size: var(--base-font-size);
  }
  // 局部样式覆盖
  .button :deep(.el-button) {
    border: 1px solid rgb(82, 212, 123);
    background: #8dbf93;
    margin-top: 4px;
  }
}
</style>

