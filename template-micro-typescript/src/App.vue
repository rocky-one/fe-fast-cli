<template>
  <div class="app app-theme-default">
    <div class="left">
      <el-button @click="onGoPage('/')">Home</el-button>
      <p></p>
      <el-button @click="onGoPage('/demo')">Demo</el-button>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
const onGoPage = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 120px;
    padding: 0 10px;
  }
  .right {
    width: 100%;
  }
}

</style>
