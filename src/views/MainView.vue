<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout">
    <el-container>
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
