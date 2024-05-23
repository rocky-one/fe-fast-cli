<template>
  <div class="demo-app">
    <van-button
      type="primary"
      size="small"
      @click="onGoPage('/')">Home</van-button>
    <van-button
      type="primary"
      size="small"
      @click="onGoPage('/about')">About</van-button>
    <router-view />
  </div>
</template>
<script setup>
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
const onGoPage = (path) => {
  router.push({ path, query: { name: 'xxx' } });
};
</script>

<style lang="scss" scoped>
.demo-app {
  padding: 10px;
  button {
    margin-left: 4px;
  }
}

</style>
