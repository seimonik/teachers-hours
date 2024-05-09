<template>
  <el-card style="max-width: 480px" shadow="never">
    <template #header>
      <div class="card-header">
        <span>Расчеты</span>
      </div>
    </template>
    <div v-for="file in files" :key="file.id">
      <el-link type="primary">{{ file.name }}</el-link>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import store from "@/store";
import { IGetTeacher } from "@/types/interfaces/teacher";
import { FilesListProps } from "@/types/props";
import { toRefs } from "vue";

const props = defineProps<FilesListProps>();
const { files } = toRefs(props);
</script>
