<template>
  <div class="wujie-container">
    <wujie-vue
      class="app1"
      width="48%"
      height="96%"
      :name="appHost.app1.name"
      :url="appHost.app1.url"
      :sync="true">
    </wujie-vue>
    <wujie-vue
      class="app2"
      width="48%"
      height="96%"
      :name="appHost.app2.name"
      :url="appHost.app2.url"
      :sync="true">
    </wujie-vue>
  </div>
</template>

<script lang="ts" setup>
import WujieVue from 'wujie-vue3';
import { appHost } from '@/config';
</script>

<style lang="scss" scoped>
.wujie-container {
  width: 100%;  
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 1%;
  .app1 {
    border: 1px dashed #ccc;
  }
  .app2 {
    border: 1px dashed #ccc;
  }
}
</style>