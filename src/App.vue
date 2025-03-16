<!-- src/App.vue -->
<template>
  <!-- 路由出口：匹配的组件会在这里渲染 -->
  <router-view></router-view>
</template>

<script setup>
// 不需要在这里直接引入 Login 组件
// 路由会自动处理组件渲染
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>