<template>
  <div id="files-list">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>Расчеты</span>
        </div>
      </template>
      <span v-if="files.length == 0">Нет файлов расчетов</span>
      <div v-for="file in files" :key="file.id">
        <el-link
          target="_self"
          href="#"
          type="primary"
          @click="downloadDocument(file)"
          >{{ file.name }}</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { downloadFile } from "@/service/downloadFile";
import store from "@/store";
import { IDocument } from "@/types/interfaces/document";
import { FilesListProps } from "@/types/props";
import { toRefs } from "vue";

const props = defineProps<FilesListProps>();
const { files } = toRefs(props);

const downloadDocument = async (document: IDocument) => {
  await store
    .dispatch("teachersHoursApi/DownloadFile", document.id)
    .then((response) => {
      downloadFile(response.data, document.name);
    });
};
</script>
