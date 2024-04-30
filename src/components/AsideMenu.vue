<template>
  <el-menu
    default-active="documents"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-menu-item index="documents">
      <el-icon><Edit /></el-icon>
      <span>Документы</span>
    </el-menu-item>
    <el-menu-item index="about">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="home">
      <el-icon><document /></el-icon>
      <span>Расчет часов</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { Edit } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
// const menuItems = [
//   {
//     index: "documents",
//     menuItemClass: "",
//     spanClass: "menu-label",
//     text: "Документы",
//     icon: Edit,
//   },
// ];

const handleSelect = (key) => {
  router.push({ name: key });
};
</script>
