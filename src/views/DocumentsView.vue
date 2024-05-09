<template>
  <div id="documents" class="d-grid gap-4">
    <el-collapse>
      <el-collapse-item title="Фильтры" name="docmentFilters">
      </el-collapse-item>
    </el-collapse>
    <el-card shadow="never">
      <div class="left-align-button">
        <el-button color="#626aef" @click="dialogVisible = true"
          >Загрузить</el-button
        >
      </div>
    </el-card>

    <div class="documents-table">
      <el-table :data="documentsTable" style="width: 100%">
        <el-table-column prop="name" label="Название" />
        <el-table-column prop="documentType" label="Тип документа" width="250">
          <template #default="{ row }">
            <el-tag :type="getDocumentTypeTag(row.documentType)">
              {{ getDocumentType(row.documentType) }}</el-tag
            ></template
          ></el-table-column
        >
        <el-table-column prop="createdAt" label="Дата создания" width="250">
          <template #default="{ row }">
            {{ getFormattedDate(row.createdAt) }}</template
          >
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Загрузка документа"
      width="600"
      destroy-on-close
      center
    >
      <SaveFile
        @form-closed="handleCloseDialog"
        @update-documents-list="reloadDocumentsList"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SaveFile from "@/components/documents/SaveFile.vue";
import store from "@/store";
import { getFormattedDate } from "@/service/formatDate";

const dialogVisible = ref(false);

interface IDocument {
  name: string;
  createdAt: string;
  documentType: string;
}
const documentsTable = ref<IDocument[]>();

const getDocuments = async () => {
  await store
    .dispatch("teachersHoursApi/GetFiles", { params: null })
    .then((response) => {
      documentsTable.value = response.data;
    })
    .catch((error) => console.log(error));
};
getDocuments();

const reloadDocumentsList = () => {
  getDocuments();
};

const handleCloseDialog = () => {
  dialogVisible.value = false;
};

const getDocumentType = (type: string) => {
  switch (type) {
    case "Ordinary":
      return "Обычный";
    case "Request":
      return "Заявка";
    case "Calculation":
      return "Расчет";
    default:
      return "Обычный";
  }
};
const getDocumentTypeTag = (type: string) => {
  switch (type) {
    case "Ordinary":
      return "info";
    case "Request":
      return "success";
    case "Calculation":
      return "primary";
    default:
      return "info";
  }
};
</script>

<style lang="scss">
.documents-table {
  .el-table th {
    color: #19191a;
    text-align: center;
    background-color: #f6f6f8;
  }

  .el-table td {
    text-align: center;
  }
}
#documents {
  .left-align-button {
    text-align: left;
  }
  .el-collapse {
    margin-bottom: 20px;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
