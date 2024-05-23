<template>
  <wujie-vue
    width="100%"
    height="100%"
    :name="appHost.app2.name"
    :url="appHost.app2.url"
    :sync="true">
  </wujie-vue>
</template>

<script lang="ts" setup>
import WujieVue from 'wujie-vue3';
import { appHost } from '@/config';

</script>

<style lang="scss" scoped></style>