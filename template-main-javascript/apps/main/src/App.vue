<template>
  <div class="app">
    <div class="left">
      <div>主应用</div>
      <br />
      <router-link to="/app1">App1</router-link>
      <br />
      <router-link to="/app2">App2</router-link>
      <br />
      <router-link to="/all">All</router-link>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script setup>

</script>

<style lang="scss" scoped>
.app {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 160px;
    padding: 10px;
    border-right: 1px solid #ccc;
  }
  .right {
    width: 100%;
  }
}
</style>