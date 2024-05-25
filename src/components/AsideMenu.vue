<template>
  <div id="aside-menu-block">
    <el-menu
      default-active="documents"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <li class="el-menu-item">
        <img :src="logo" style="width: 50px; height: 50px" />
        <p style="font-size: 18px; font-weight: bold">СГУ Учёт</p>
      </li>
      <el-menu-item index="documents">
        <el-icon><Edit /></el-icon>
        <span>Документы</span>
      </el-menu-item>
      <el-menu-item index="teachers">
        <el-icon><User /></el-icon>
        <span>Преподаватели</span>
      </el-menu-item>
      <el-menu-item index="administration">
        <el-icon><Service /></el-icon>
        <span>Администрирование</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Edit, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import logo from "@/assets/sgulogo.png";

const router = useRouter();

const handleSelect = (key) => {
  router.push({ name: key });
};
</script>

<style lang="scss">
#aside-menu-block {
  .el-menu {
    border-right: none;
    background: var(--el-color-primary-light-8);
  }
  p {
    margin-left: 10px;
  }
}
</style>
