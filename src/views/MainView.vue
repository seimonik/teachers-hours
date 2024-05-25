<template>
  <div class="common-layout">
    <el-container class="layout-container-demo" style="height: 98vh">
      <el-aside width="250px">
        <AsideMenu />
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script setup>
import AsideMenu from "../components/AsideMenu.vue";
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
</style>
